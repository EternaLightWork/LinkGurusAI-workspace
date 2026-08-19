import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { env } from "./env";
import { log } from "./logging";
import type { RenderedEmail } from "./emails";

let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;
  const smtp = env.smtp();
  if (!smtp) {
    transporter = null;
    return null;
  }
  transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.user ? { user: smtp.user, pass: smtp.password } : undefined,
    // Hostinger's built-in server mail is rate-limited and unauthenticated;
    // spec 8.1 requires an authenticated SMTP provider instead.
    pool: true,
    maxConnections: 1,
    maxMessages: 50,
  });
  return transporter;
}

export type SendResult =
  | { ok: true; messageId?: string; dryRun?: boolean }
  | { ok: false; permanent: boolean; code: string };

/**
 * Returns a dry-run result when sender identity is unconfigured, so staging
 * exercises the whole queue without sending mail from an invented address.
 */
export async function sendMail(to: string, email: RenderedEmail): Promise<SendResult> {
  const smtp = env.smtp();
  const transport = getTransporter();

  if (!smtp || !transport) {
    log("warn", "email_dry_run", { to, subject: email.subject });
    return { ok: true, dryRun: true };
  }

  try {
    const info = await transport.sendMail({
      from: smtp.from,
      replyTo: smtp.replyTo,
      to,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
    return { ok: true, messageId: info.messageId };
  } catch (error) {
    const err = error as { responseCode?: number; code?: string; message?: string };
    const code = String(err.responseCode ?? err.code ?? "unknown");
    // 5xx is a permanent recipient/content failure and must not be retried
    // indefinitely (spec 8.6).
    const permanent = typeof err.responseCode === "number" && err.responseCode >= 500;
    log("error", "email_send_failed", { code, permanent });
    return { ok: false, permanent, code };
  }
}
