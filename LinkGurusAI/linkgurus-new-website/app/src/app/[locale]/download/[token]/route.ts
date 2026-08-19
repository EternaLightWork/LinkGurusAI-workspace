import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { execute, query } from "@/lib/db";
import { env } from "@/lib/env";
import { isLocale } from "@/lib/i18n";
import { log } from "@/lib/logging";
import { hashToken } from "@/lib/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Never reveals whether a token existed, expired or was already used. */
function expired(locale: string) {
  const target = locale === "en" ? "/en/templates/" : "/templates/";
  return NextResponse.redirect(new URL(`${target}?state=link-expired`, env.baseUrl()), {
    status: 303,
    headers: {
      "Cache-Control": "private, no-store",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

/**
 * Spec 5.15 / 8.5. Validates the token server-side, streams the registered
 * file, and invalidates the token after the response is committed.
 *
 * The filesystem path is composed from the registry `storage_key` only. The
 * token never contributes to it, and the resolved path is re-checked against
 * the private root so a malformed key cannot escape the directory.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; token: string }> },
) {
  const { locale, token } = await params;
  if (!isLocale(locale)) return expired("ar");

  // Reject anything that is not a plausible base64url token before touching
  // the database.
  if (!token || token.length < 32 || token.length > 128 || !/^[A-Za-z0-9_-]+$/.test(token)) {
    return expired(locale);
  }

  type TokenRow = {
    token_id: number;
    storage_key: string;
    download_name: string;
    mime_type: string;
    byte_size: number;
    file_locale: string;
    file_status: string;
  };

  let rows: TokenRow[];
  try {
    rows = await query<TokenRow[]>(
      `SELECT dt.id AS token_id, tf.storage_key, tf.download_name, tf.mime_type,
              tf.byte_size, tf.locale AS file_locale, tf.status AS file_status
         FROM download_tokens dt
         JOIN template_requests tr ON tr.id = dt.request_id
         JOIN template_files tf   ON tf.id = tr.template_file_id
        WHERE dt.token_hash = ?
          AND dt.used_at IS NULL
          AND dt.expires_at > NOW()
        LIMIT 1`,
      [hashToken(token, "download")],
    );
  } catch (error) {
    // Degrade to the same safe state as an unknown token: a database outage
    // must not surface a stack trace or distinguish itself from a bad link.
    log("error", "download_lookup_failed", { message: (error as Error).message });
    return expired(locale);
  }

  const record = rows[0];
  // A token is scoped to one locale as well as one file: following an Arabic
  // link from the /en/ tree must not hand over the Arabic PDF.
  if (!record || record.file_status !== "available" || record.file_locale !== locale) {
    log("info", "download_rejected");
    return expired(locale);
  }

  const root = path.resolve(process.cwd(), env.privateTemplateDir());
  const filePath = path.resolve(root, record.storage_key);
  if (filePath !== root && !filePath.startsWith(root + path.sep)) {
    log("error", "download_path_escape", { storageKey: record.storage_key });
    return expired(locale);
  }

  try {
    await stat(filePath);
  } catch {
    log("error", "download_file_missing", { storageKey: record.storage_key });
    return expired(locale);
  }

  // Single use: burn the token before streaming, so a duplicated request
  // cannot race a second download through.
  try {
    const burn = await execute(
      `UPDATE download_tokens SET used_at = NOW() WHERE id = ? AND used_at IS NULL`,
      [record.token_id],
    );
    if (burn.affectedRows !== 1) return expired(locale);
  } catch (error) {
    log("error", "download_burn_failed", { message: (error as Error).message });
    return expired(locale);
  }

  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream<Uint8Array>;
  log("info", "template_download_completed", { locale, storageKey: record.storage_key });

  return new NextResponse(stream, {
    status: 200,
    headers: {
      "Content-Type": record.mime_type,
      "Content-Length": String(record.byte_size),
      // The filename is a fixed value from the registry, never user input.
      "Content-Disposition": `attachment; filename="${record.download_name}"`,
      "Cache-Control": "private, no-store",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
