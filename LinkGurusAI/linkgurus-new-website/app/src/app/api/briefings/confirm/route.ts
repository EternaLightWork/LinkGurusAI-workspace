import { NextResponse } from "next/server";
import { execute, query } from "@/lib/db";
import { log } from "@/lib/logging";
import { hashToken } from "@/lib/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Spec 8.4: hashed, expiring, single-use token. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { token?: string } | null;
  const token = body?.token;
  if (!token || token.length > 128) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }

  const rows = await query<{ contact_id: number; locale: string; status: string }[]>(
    `SELECT contact_id, locale, status FROM subscriptions
      WHERE confirm_hash = ? AND confirm_expires > NOW() LIMIT 1`,
    [hashToken(token, "briefing-confirm")],
  );
  const subscription = rows[0];
  if (!subscription) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }

  // Idempotent: confirming twice is a success, not an error.
  if (subscription.status !== "confirmed") {
    const manageToken = hashToken(token, "briefing-manage");
    await execute(
      `UPDATE subscriptions
          SET status = 'confirmed', confirmed_at = NOW(), confirm_hash = NULL,
              confirm_expires = NULL, manage_hash = ?
        WHERE contact_id = ?`,
      [manageToken, subscription.contact_id],
    );
    await execute(
      `INSERT INTO email_jobs (type, contact_id, locale, payload_json)
       VALUES ('briefing-confirmed', ?, ?, JSON_OBJECT('manage', ?))`,
      [subscription.contact_id, subscription.locale, token],
    );
    log("info", "briefing_optin_confirmed", { locale: subscription.locale });
  }

  return NextResponse.json({ status: "confirmed" });
}
