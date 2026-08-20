import { statSync } from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n";
import { findTemplateFile } from "./template-files";
import type { TemplateId } from "@/content/types";

/**
 * Format and size are read from the template source, not from the private
 * storage directory — the detail page must render at build time on a machine
 * that has no staged private files, and the value it shows is the size of the
 * file the visitor will receive (spec 5.14, 3.5).
 *
 * The sources are gitignored, so a clean clone has none: size then falls back
 * to a dash rather than failing the build.
 */
export function templateFileMeta(templateId: TemplateId, locale: Locale) {
  const entry = findTemplateFile(templateId, locale);
  if (!entry) return null;
  const root = process.env.TEMPLATE_SOURCE_DIR ?? "LinkGurusAI/linkgurus-new-website/assets/templates";
  const source = path.resolve(process.cwd(), root, entry.source);
  try {
    const stats = statSync(source);
    return {
      format: "PDF",
      bytes: stats.size,
      status: entry.status,
      heldReason: entry.heldReason,
    };
  } catch {
    return { format: "PDF", bytes: 0, status: entry.status, heldReason: entry.heldReason };
  }
}

export function formatBytes(bytes: number, locale: Locale): string {
  if (bytes <= 0) return "—";
  const kb = bytes / 1024;
  if (kb < 1024) return locale === "ar" ? `${Math.round(kb)} كيلوبايت` : `${Math.round(kb)} KB`;
  const mb = kb / 1024;
  const value = mb.toFixed(1);
  return locale === "ar" ? `${value} ميغابايت` : `${value} MB`;
}
