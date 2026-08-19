import "server-only";
import { execute, query } from "./db";
import { rateLimitKey } from "./tokens";
import { log } from "./logging";

type Rule = { bucket: string; limit: number; windowMinutes: number };

/**
 * Spec 8.5: limits apply per IP and per normalized email, with a global
 * circuit breaker on email generation. Buckets are stored as salted hashes,
 * so the table never holds an IP address or an email address.
 */
export const RULES = {
  templateRequestIp: { bucket: "template:ip", limit: 8, windowMinutes: 60 },
  templateRequestEmail: { bucket: "template:email", limit: 4, windowMinutes: 60 },
  enquiryIp: { bucket: "enquiry:ip", limit: 5, windowMinutes: 60 },
  enquiryEmail: { bucket: "enquiry:email", limit: 3, windowMinutes: 60 },
  briefingIp: { bucket: "briefing:ip", limit: 5, windowMinutes: 60 },
  /** Circuit breaker across every email-generating action. */
  globalEmail: { bucket: "email:global", limit: 200, windowMinutes: 60 },
} satisfies Record<string, Rule>;

async function count(rule: Rule, keyHash: string): Promise<number> {
  const rows = await query<{ c: number }[]>(
    `SELECT COUNT(*) AS c FROM rate_limit_events
      WHERE bucket = ? AND key_hash = ? AND created_at > (NOW() - INTERVAL ? MINUTE)`,
    [rule.bucket, keyHash, rule.windowMinutes],
  );
  return Number(rows[0]?.c ?? 0);
}

/** Records the attempt and reports whether it is within the limit. */
export async function consume(rule: Rule, value: string): Promise<boolean> {
  const keyHash = rateLimitKey(rule.bucket, value);
  const used = await count(rule, keyHash);
  await execute(`INSERT INTO rate_limit_events (bucket, key_hash) VALUES (?, ?)`, [
    rule.bucket,
    keyHash,
  ]);
  const allowed = used < rule.limit;
  if (!allowed) log("warn", "rate_limit_exceeded", { bucket: rule.bucket });
  return allowed;
}

/** Best-effort housekeeping so the table does not grow without bound. */
export async function pruneRateLimitEvents() {
  await execute(`DELETE FROM rate_limit_events WHERE created_at < (NOW() - INTERVAL 2 DAY)`);
}

/**
 * Trusts only the first hop of X-Forwarded-For, and falls back to a constant
 * so a missing header cannot bypass the per-IP rule by looking unique.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
