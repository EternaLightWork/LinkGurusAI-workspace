import { NextResponse } from "next/server";
import { execute, query } from "@/lib/db";
import { log } from "@/lib/logging";
import { hashToken } from "@/lib/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Spec 8.4: no login required and idempotent. The response is generic so an
 * unknown token cannot be used to probe whether an address is subscribed.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { token?: string } | null;
  const token = body?.token;
  if (!token || token.length > 128) {
    return NextResponse.json({ status: "done" });
  }

  const rows = await query<{ contact_id: number; locale: string }[]>(
    `SELECT contact_id, locale FROM subscriptions WHERE manage_hash = ? LIMIT 1`,
    [hashToken(token, "briefing-manage")],
  );
  const subscription = rows[0];

  if (subscription) {
    await execute(
      `UPDATE subscriptions
          SET status = 'unsubscribed', unsubscribed_at = NOW()
        WHERE contact_id = ? AND status <> 'unsubscribed'`,
      [subscription.contact_id],
    );
    await execute(
      `INSERT INTO consent_events (contact_id, purpose, action, policy_version, locale)
       VALUES (?, 'briefings', 'withdrawn', 'draft-2026-08-19', ?)`,
      [subscription.contact_id, subscription.locale],
    );
    await execute(
      `INSERT INTO email_jobs (type, contact_id, locale, payload_json)
       VALUES ('unsubscribe-confirmed', ?, ?, JSON_OBJECT())`,
      [subscription.contact_id, subscription.locale],
    );
    log("info", "briefing_unsubscribed", { locale: subscription.locale });
  }

  return NextResponse.json({ status: "done" });
}
