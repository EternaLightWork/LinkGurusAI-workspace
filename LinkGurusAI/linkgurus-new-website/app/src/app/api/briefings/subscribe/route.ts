import { NextResponse } from "next/server";
import { withTransaction } from "@/lib/db";
import { enqueueEmail, recordConsent, upsertContact } from "@/lib/contacts";
import { log } from "@/lib/logging";
import { RULES, clientIp, consume } from "@/lib/rate-limit";
import { createOpaqueToken, hashToken } from "@/lib/tokens";
import { briefingSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function accepted() {
  return NextResponse.json({ status: "accepted" }, { status: 202 });
}

/**
 * Spec 5.18: double opt-in. A subscription is only ever created as `pending`
 * here; nothing becomes active without the confirmation link.
 */
export async function POST(request: Request) {
  let parsed;
  try {
    parsed = briefingSchema.safeParse(await request.json());
  } catch {
    return accepted();
  }
  if (!parsed.success || parsed.data.company_website) return accepted();

  const data = parsed.data;
  let ipOk: boolean;
  let globalOk: boolean;
  try {
    [ipOk, globalOk] = await Promise.all([
      consume(RULES.briefingIp, clientIp(request.headers)),
      consume(RULES.globalEmail, "all"),
    ]);
  } catch (error) {
    log("error", "rate_limit_unavailable", { message: (error as Error).message });
    return accepted();
  }
  if (!ipOk || !globalOk) return accepted();

  try {
    await withTransaction(async (conn) => {
      const contactId = await upsertContact(conn, {
        email: data.email,
        firstName: data.firstName,
      });
      await recordConsent(conn, {
        contactId,
        purpose: "briefings",
        action: "granted",
        locale: data.locale,
      });

      const token = createOpaqueToken();
      await conn.execute(
        `INSERT INTO subscriptions (contact_id, status, locale, confirm_hash, confirm_expires)
         VALUES (?, 'pending', ?, ?, (NOW() + INTERVAL 7 DAY))
         ON DUPLICATE KEY UPDATE
           status = IF(status = 'confirmed', 'confirmed', 'pending'),
           locale = VALUES(locale),
           confirm_hash = IF(status = 'confirmed', confirm_hash, VALUES(confirm_hash)),
           confirm_expires = IF(status = 'confirmed', confirm_expires, VALUES(confirm_expires))`,
        [contactId, data.locale, hashToken(token, "briefing-confirm")],
      );

      await enqueueEmail(conn, {
        type: "briefing-confirm",
        contactId,
        locale: data.locale,
        payload: { token },
      });
      log("info", "briefing_optin_started", { locale: data.locale });
    });
  } catch (error) {
    log("error", "briefing_subscribe_failed", { message: (error as Error).message });
  }

  return accepted();
}
