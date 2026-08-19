import "server-only";

/**
 * Spec 8.5: logs must never contain raw tokens, complete token URLs, SMTP
 * secrets, raw form bodies or full email addresses.
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const head = local.slice(0, 1);
  return `${head}${"*".repeat(Math.max(local.length - 1, 1))}@${domain}`;
}

type Level = "info" | "warn" | "error";

export function log(level: Level, event: string, fields: Record<string, unknown> = {}) {
  const safe: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (/token|secret|password|authorization/i.test(key)) continue;
    safe[key] = typeof value === "string" && value.includes("@") ? maskEmail(value) : value;
  }
  const line = JSON.stringify({ ts: new Date().toISOString(), level, event, ...safe });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}
