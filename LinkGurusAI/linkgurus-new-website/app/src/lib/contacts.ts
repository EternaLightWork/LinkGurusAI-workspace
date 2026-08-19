import "server-only";
import type { PoolConnection } from "mysql2/promise";
import type { Locale } from "./i18n";
import { PRIVACY_POLICY_VERSION, normalizeEmail } from "./validation";

/**
 * Upserts a contact and returns its id. Optional fields only ever fill a gap:
 * a later blank submission must not erase a name the visitor already gave.
 */
export async function upsertContact(
  conn: PoolConnection,
  input: {
    email: string;
    firstName?: string;
    organization?: string;
    role?: string;
  },
): Promise<number> {
  const normalized = normalizeEmail(input.email);
  await conn.execute(
    `INSERT INTO contacts (email_normalized, email_original, first_name, organization, role)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       first_name   = COALESCE(VALUES(first_name), first_name),
       organization = COALESCE(VALUES(organization), organization),
       role         = COALESCE(VALUES(role), role)`,
    [
      normalized,
      input.email.trim(),
      input.firstName || null,
      input.organization || null,
      input.role || null,
    ],
  );
  const [rows] = await conn.execute(
    `SELECT id FROM contacts WHERE email_normalized = ? LIMIT 1`,
    [normalized],
  );
  return (rows as { id: number }[])[0]!.id;
}

export async function recordConsent(
  conn: PoolConnection,
  args: { contactId: number; purpose: string; action: "granted" | "withdrawn"; locale: Locale },
) {
  await conn.execute(
    `INSERT INTO consent_events (contact_id, purpose, action, policy_version, locale)
     VALUES (?, ?, ?, ?, ?)`,
    [args.contactId, args.purpose, args.action, PRIVACY_POLICY_VERSION, args.locale],
  );
}

export async function enqueueEmail(
  conn: PoolConnection,
  args: { type: string; contactId: number | null; locale: Locale; payload: Record<string, unknown> },
) {
  const [result] = await conn.execute(
    `INSERT INTO email_jobs (type, contact_id, locale, payload_json) VALUES (?, ?, ?, ?)`,
    [args.type, args.contactId, args.locale, JSON.stringify(args.payload)],
  );
  return (result as { insertId: number }).insertId;
}
