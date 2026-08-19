import "server-only";

/**
 * Server-only configuration access. Nothing here may be imported from a
 * client component: every value is a secret or a server path (spec 8.5).
 */
function optional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function required(name: string): string {
  const value = optional(name);
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. See .env.example; no default is invented.`,
    );
  }
  return value;
}

export const env = {
  baseUrl: () => (optional("APP_BASE_URL") ?? "http://localhost:3000").replace(/\/$/, ""),

  db: () => ({
    host: required("DATABASE_HOST"),
    port: Number(optional("DATABASE_PORT") ?? 3306),
    database: required("DATABASE_NAME"),
    user: required("DATABASE_USER"),
    password: required("DATABASE_PASSWORD"),
  }),

  smtp: () => {
    const host = optional("SMTP_HOST");
    const from = optional("EMAIL_FROM");
    // Sender identity is an [OPEN] founder decision (spec 7.5). Until it is
    // configured the worker runs in dry-run instead of inventing a sender.
    if (!host || !from) return null;
    return {
      host,
      port: Number(optional("SMTP_PORT") ?? 587),
      secure: optional("SMTP_SECURE") === "true",
      user: optional("SMTP_USER"),
      password: optional("SMTP_PASSWORD"),
      from,
      replyTo: optional("EMAIL_REPLY_TO"),
    };
  },

  internalLeadRecipient: () => optional("INTERNAL_LEAD_RECIPIENT"),
  privateTemplateDir: () => optional("PRIVATE_TEMPLATE_DIR") ?? "./private-storage/templates",
  downloadTokenPepper: () => required("DOWNLOAD_TOKEN_PEPPER"),
  cronSecret: () => required("CRON_SECRET"),
  rateLimitSalt: () => required("RATE_LIMIT_SALT"),
};

/** 72 hours (spec 7.4) — a product decision, changeable in configuration. */
export const DOWNLOAD_TOKEN_TTL_HOURS = 72;
export const CONFIRM_TOKEN_TTL_HOURS = 168;
