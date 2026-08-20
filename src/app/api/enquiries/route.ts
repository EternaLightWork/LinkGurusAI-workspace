import { NextResponse } from "next/server";
import { withTransaction } from "@/lib/db";
import { enqueueEmail, recordConsent, upsertContact } from "@/lib/contacts";
import { log, maskEmail } from "@/lib/logging";
import { RULES, clientIp, consume } from "@/lib/rate-limit";
import { enquirySchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function accepted() {
  return NextResponse.json({ status: "accepted" }, { status: 202 });
}

/** Spec 5.17 / 8.4. Stores one lead record and one enquiry event. */
export async function POST(request: Request) {
  let parsed;
  try {
    parsed = enquirySchema.safeParse(await request.json());
  } catch {
    return accepted();
  }
  if (!parsed.success) {
    log("info", "enquiry_rejected", { reason: "validation" });
    return accepted();
  }

  const data = parsed.data;
  if (data.company_website) {
    log("info", "enquiry_rejected", { reason: "honeypot" });
    return accepted();
  }

  const ip = clientIp(request.headers);
  let ipOk: boolean;
  let emailOk: boolean;
  let globalOk: boolean;
  try {
    [ipOk, emailOk, globalOk] = await Promise.all([
      consume(RULES.enquiryIp, ip),
      consume(RULES.enquiryEmail, data.email.toLowerCase()),
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
      const contactId = await upsertContact(conn, {
        email: data.email,
        firstName: data.name,
        organization: data.organization,
        role: data.role,
      });

      await recordConsent(conn, {
        contactId,
        purpose: "enquiry",
        action: "granted",
        locale: data.preferredLanguage,
      });

      const [result] = await conn.execute(
        `INSERT INTO enquiries
           (contact_id, country, trigger_id, practice_id, offer_id, decision_date,
            context_note, preferred_language, phone, referral_source, source_context_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          contactId,
          data.country,
          data.triggerId ?? null,
          data.practiceId ?? null,
          data.offerId ?? null,
          data.decisionDate ?? null,
          data.contextNote ?? null,
          data.preferredLanguage,
          data.phone ?? null,
          data.referralSource ?? null,
          data.context ? JSON.stringify(data.context) : null,
        ],
      );
      const enquiryId = (result as { insertId: number }).insertId;

      await enqueueEmail(conn, {
        type: "enquiry-acknowledgement",
        contactId,
        locale: data.preferredLanguage,
        payload: { enquiryId },
      });

      await enqueueEmail(conn, {
        type: "enquiry-internal",
        contactId: null,
        locale: "en",
        payload: {
          enquiryId,
          maskedEmail: maskEmail(data.email),
          country: data.country,
          triggerId: data.triggerId ?? null,
          practiceId: data.practiceId ?? null,
          offerId: data.offerId ?? null,
        },
      });

      log("info", "enquiry_accepted", { enquiryId, triggerId: data.triggerId ?? null });
    });
  } catch (error) {
    log("error", "enquiry_failed", { message: (error as Error).message });
  }

  return accepted();
}
