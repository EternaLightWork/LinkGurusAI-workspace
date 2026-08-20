import { NextResponse } from "next/server";
import { DOWNLOAD_TOKEN_TTL_HOURS } from "@/lib/env";
import { withTransaction } from "@/lib/db";
import { enqueueEmail, recordConsent, upsertContact } from "@/lib/contacts";
import { log } from "@/lib/logging";
import { RULES, clientIp, consume } from "@/lib/rate-limit";
import { createOpaqueToken, expiresAt, hashToken } from "@/lib/tokens";
import { templateRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Spec 7.4 / 8.4. The response is identical for a new address, an existing
 * address, a rate-limited caller and a held file, so nothing here reveals
 * whether an email is already known.
 */
function accepted() {
  return NextResponse.json({ status: "accepted" }, { status: 202 });
}

export async function POST(request: Request) {
  let parsed;
  try {
    parsed = templateRequestSchema.safeParse(await request.json());
  } catch {
    return accepted();
  }

  if (!parsed.success) {
    log("info", "template_request_rejected", { reason: "validation" });
    return accepted();
  }

  const data = parsed.data;

  // Honeypot: silently accepted, never processed.
  if (data.company_website) {
    log("info", "template_request_rejected", { reason: "honeypot" });
    return accepted();
  }

  const ip = clientIp(request.headers);
  let ipOk: boolean;
  let emailOk: boolean;
  let globalOk: boolean;
  try {
    [ipOk, emailOk, globalOk] = await Promise.all([
      consume(RULES.templateRequestIp, ip),
      consume(RULES.templateRequestEmail, data.email.toLowerCase()),
      consume(RULES.globalEmail, "all"),
    ]);
  } catch (error) {
    // The rate-limit store is the same database the request needs. If it is
    // unreachable, answer with the same generic response rather than a 500
    // that would distinguish this request from any other.
    log("error", "rate_limit_unavailable", { message: (error as Error).message });
    return accepted();
  }
  if (!ipOk || !emailOk || !globalOk) return accepted();

  try {
    await withTransaction(async (conn) => {
      // The file must exist for this exact template and locale, and must be
      // released. A held file yields the same generic response.
      const [fileRows] = await conn.execute(
        `SELECT id, status FROM template_files WHERE template_id = ? AND locale = ? LIMIT 1`,
        [data.templateId, data.locale],
      );
      const file = (fileRows as { id: number; status: string }[])[0];
      if (!file || file.status !== "available") {
        log("info", "template_request_unavailable", {
          templateId: data.templateId,
          locale: data.locale,
        });
        return;
      }

      const contactId = await upsertContact(conn, {
        email: data.email,
        firstName: data.firstName,
        organization: data.organization,
        role: data.role,
      });

      await recordConsent(conn, {
        contactId,
        purpose: "resource-request",
        action: "granted",
        locale: data.locale,
      });

      const [requestResult] = await conn.execute(
        `INSERT INTO template_requests
           (contact_id, template_file_id, source_context_json, privacy_version)
         VALUES (?, ?, ?, ?)`,
        [
          contactId,
          file.id,
          data.context ? JSON.stringify(data.context) : null,
          "draft-2026-08-19",
        ],
      );
      const requestId = (requestResult as { insertId: number }).insertId;

      const token = createOpaqueToken();
      await conn.execute(
        `INSERT INTO download_tokens (request_id, token_hash, expires_at) VALUES (?, ?, ?)`,
        [requestId, hashToken(token, "download"), expiresAt(DOWNLOAD_TOKEN_TTL_HOURS)],
      );

      // The raw token travels to the worker in the job payload and never
      // enters a log line or an application response.
      await enqueueEmail(conn, {
        type: "requested-template",
        contactId,
        locale: data.locale,
        payload: { requestId, templateId: data.templateId, token },
      });

      // The requested file is never conditional on marketing consent.
      if (data.briefingsOptIn) {
        await recordConsent(conn, {
          contactId,
          purpose: "briefings",
          action: "granted",
          locale: data.locale,
        });
        const confirmToken = createOpaqueToken();
        await conn.execute(
          `INSERT INTO subscriptions (contact_id, status, locale, confirm_hash, confirm_expires)
           VALUES (?, 'pending', ?, ?, (NOW() + INTERVAL 7 DAY))
           ON DUPLICATE KEY UPDATE
             status = IF(status = 'confirmed', 'confirmed', 'pending'),
             locale = VALUES(locale),
             confirm_hash = IF(status = 'confirmed', confirm_hash, VALUES(confirm_hash)),
             confirm_expires = IF(status = 'confirmed', confirm_expires, VALUES(confirm_expires))`,
          [contactId, data.locale, hashToken(confirmToken, "briefing-confirm")],
        );
        await enqueueEmail(conn, {
          type: "briefing-confirm",
          contactId,
          locale: data.locale,
          payload: { token: confirmToken },
        });
      }

      log("info", "template_request_accepted", {
        templateId: data.templateId,
        locale: data.locale,
        briefingsOptIn: data.briefingsOptIn,
      });
    });
  } catch (error) {
    log("error", "template_request_failed", { message: (error as Error).message });
  }

  return accepted();
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
