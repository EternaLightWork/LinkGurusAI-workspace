import { NextResponse } from "next/server";
import { getContent } from "@/content";
import type { TemplateId } from "@/content/types";
import { execute, query } from "@/lib/db";
import {
  briefingConfirmEmail,
  briefingConfirmedEmail,
  enquiryAcknowledgementEmail,
  internalEnquiryNotification,
  operatorFailureAlert,
  requestedTemplateEmail,
  unsubscribeConfirmedEmail,
  type RenderedEmail,
} from "@/lib/emails";
import { DOWNLOAD_TOKEN_TTL_HOURS, env } from "@/lib/env";
import { localeHref, type Locale } from "@/lib/i18n";
import { log } from "@/lib/logging";
import { sendMail } from "@/lib/mailer";
import { pruneRateLimitEvents } from "@/lib/rate-limit";
import { createOpaqueToken, expiresAt, hashToken, secretMatches } from "@/lib/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BATCH_SIZE = 10;
const MAX_ATTEMPTS = 5;

type Job = {
  id: number;
  type: string;
  contact_id: number | null;
  locale: Locale;
  payload_json: string | Record<string, unknown>;
  attempts: number;
};

function payloadOf(job: Job): Record<string, unknown> {
  return typeof job.payload_json === "string" ? JSON.parse(job.payload_json) : job.payload_json;
}

/** Exponential backoff in minutes: 1, 4, 9, 16… */
function backoffMinutes(attempts: number): number {
  return Math.min(attempts * attempts, 240);
}

async function recipientFor(contactId: number | null): Promise<string | null> {
  if (contactId === null) return env.internalLeadRecipient() ?? null;
  const rows = await query<{ email_original: string }[]>(
    `SELECT email_original FROM contacts WHERE id = ? LIMIT 1`,
    [contactId],
  );
  return rows[0]?.email_original ?? null;
}

/**
 * A download link is only ever minted from the trusted APP_BASE_URL — never
 * from a request Host header (spec 8.5).
 */
function absolute(locale: Locale, path: string): string {
  return `${env.baseUrl()}${localeHref(locale, path)}`;
}

async function renderJob(job: Job): Promise<RenderedEmail | null> {
  const payload = payloadOf(job);
  const locale = job.locale;

  switch (job.type) {
    case "requested-template": {
      const templateId = payload.templateId as TemplateId;
      const template = getContent(locale).templates.find((t) => t.id === templateId);
      if (!template) return null;
      let token = payload.token as string;

      /**
       * Spec 8.6: on a retry before any successful delivery, mint a
       * replacement token if the original has already expired, so a slow
       * queue never sends a dead link.
       */
      const rows = await query<{ id: number; expired: number; used: number }[]>(
        `SELECT id, (expires_at <= NOW()) AS expired, (used_at IS NOT NULL) AS used
           FROM download_tokens WHERE request_id = ? ORDER BY id DESC LIMIT 1`,
        [Number(payload.requestId)],
      );
      const existing = rows[0];
      if (existing && Number(existing.expired) === 1 && Number(existing.used) === 0) {
        token = createOpaqueToken();
        await execute(
          `UPDATE download_tokens SET token_hash = ?, expires_at = ? WHERE id = ?`,
          [hashToken(token, "download"), expiresAt(DOWNLOAD_TOKEN_TTL_HOURS), existing.id],
        );
      }

      return requestedTemplateEmail({
        locale,
        templateName: template.name,
        downloadUrl: `${absolute(locale, "/download")}${token}/`,
        requestAgainUrl: absolute(locale, `/templates/${template.slug}/`),
        privacyUrl: absolute(locale, "/privacy/"),
        expiryHours: DOWNLOAD_TOKEN_TTL_HOURS,
      });
    }

    case "briefing-confirm":
      return briefingConfirmEmail({
        locale,
        confirmUrl: `${absolute(locale, "/briefings/confirmed/")}?token=${payload.token}`,
        privacyUrl: absolute(locale, "/privacy/"),
      });

    case "briefing-confirmed":
      return briefingConfirmedEmail({
        locale,
        unsubscribeUrl: `${absolute(locale, "/briefings/unsubscribe/")}?token=${payload.manage}`,
      });

    case "unsubscribe-confirmed":
      return unsubscribeConfirmedEmail(locale);

    case "enquiry-acknowledgement":
      return enquiryAcknowledgementEmail(locale);

    case "enquiry-internal":
      return internalEnquiryNotification({
        enquiryId: Number(payload.enquiryId),
        maskedEmail: String(payload.maskedEmail),
        country: String(payload.country),
        triggerId: (payload.triggerId as string) ?? null,
        practiceId: (payload.practiceId as string) ?? null,
        offerId: (payload.offerId as string) ?? null,
      });

    case "operator-alert":
      return operatorFailureAlert({
        jobId: Number(payload.jobId),
        type: String(payload.jobType),
        error: String(payload.error),
      });

    default:
      return null;
  }
}

async function failJob(job: Job, code: string, permanent: boolean) {
  const attempts = job.attempts + 1;
  const exhausted = permanent || attempts >= MAX_ATTEMPTS;

  await execute(
    `UPDATE email_jobs
        SET status = ?, attempts = ?, last_error = ?, locked_at = NULL,
            claim_id = NULL, next_attempt_at = (NOW() + INTERVAL ? MINUTE)
      WHERE id = ?`,
    [exhausted ? "failed" : "pending", attempts, code.slice(0, 255), backoffMinutes(attempts), job.id],
  );
  await execute(
    `INSERT INTO email_deliveries (job_id, status, error_code) VALUES (?, 'failed', ?)`,
    [job.id, code.slice(0, 64)],
  );

  if (exhausted && job.type !== "operator-alert") {
    // Alert the operator once, and only after the final failure (spec 8.6).
    await execute(
      `INSERT INTO email_jobs (type, contact_id, locale, payload_json)
       VALUES ('operator-alert', NULL, 'en', JSON_OBJECT('jobId', ?, 'jobType', ?, 'error', ?))`,
      [job.id, job.type, code.slice(0, 200)],
    );
  }
}

/** Spec 8.4: non-public, constant-time secret compare, bounded batch. */
export async function POST(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";

  let expected: string;
  try {
    expected = env.cronSecret();
  } catch {
    return new NextResponse(null, { status: 503 });
  }
  if (!provided || !secretMatches(provided, expected)) {
    log("warn", "email_worker_unauthorized");
    return new NextResponse(null, { status: 401 });
  }

  // Claim atomically: the UPDATE is the lock, so a second worker running
  // concurrently cannot select the same rows.
  const claimId = createOpaqueToken().slice(0, 24);
  await execute(
    `UPDATE email_jobs
        SET status = 'claimed', locked_at = NOW(), claim_id = ?
      WHERE status = 'pending' AND next_attempt_at <= NOW()
      ORDER BY id ASC
      LIMIT ${BATCH_SIZE}`,
    [claimId],
  );

  const jobs = await query<Job[]>(
    `SELECT id, type, contact_id, locale, payload_json, attempts
       FROM email_jobs WHERE claim_id = ? AND status = 'claimed' ORDER BY id ASC`,
    [claimId],
  );

  let sent = 0;
  let failed = 0;

  for (const job of jobs) {
    try {
      const recipient = await recipientFor(job.contact_id);
      if (!recipient) {
        // No internal recipient configured is an [OPEN] decision, not a bug
        // in the message: fail it permanently and alert.
        await failJob(job, "no_recipient_configured", true);
        failed += 1;
        continue;
      }

      const email = await renderJob(job);
      if (!email) {
        await failJob(job, "unknown_job_type", true);
        failed += 1;
        continue;
      }

      const result = await sendMail(recipient, email);
      if (result.ok) {
        await execute(
          `UPDATE email_jobs
              SET status = 'sent', locked_at = NULL, claim_id = NULL, last_error = NULL
            WHERE id = ?`,
          [job.id],
        );
        await execute(
          `INSERT INTO email_deliveries (job_id, provider_message_id, status)
           VALUES (?, ?, ?)`,
          [job.id, result.messageId ?? null, result.dryRun ? "dry-run" : "sent"],
        );
        sent += 1;
      } else {
        await failJob(job, result.code, result.permanent);
        failed += 1;
      }
    } catch (error) {
      await failJob(job, (error as Error).message ?? "unhandled", false);
      failed += 1;
    }
  }

  await pruneRateLimitEvents().catch(() => undefined);

  log("info", "email_worker_batch", { claimed: jobs.length, sent, failed });
  return NextResponse.json({ claimed: jobs.length, sent, failed });
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
