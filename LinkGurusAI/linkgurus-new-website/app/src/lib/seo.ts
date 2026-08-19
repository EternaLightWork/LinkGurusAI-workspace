import type { Metadata } from "next";
import { findPage } from "@/content/pages";
import { localeHref, otherLocale, type Locale } from "./i18n";

export function baseUrl(): string {
  return (process.env.APP_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

/**
 * Spec 8.7: one self-canonical URL per locale; reciprocal hreflang only for
 * complete pairs; form-success, confirmation, unsubscribe, token and gated
 * routes are never indexed.
 *
 * `x-default` is deliberately absent — spec 9.4 lists it as an unresolved
 * founder decision, and emitting a guess would publish that decision.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const record = findPage(locale, path);
  const canonical = `${baseUrl()}${localeHref(locale, path)}`;
  const other = otherLocale(locale);

  const languages =
    record?.counterpartId && !record.noindex
      ? {
          [locale]: canonical,
          [other]: `${baseUrl()}${localeHref(other, path)}`,
        }
      : undefined;

  const noindex = record?.noindex || record?.status === "proof-gated";

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : undefined,
    openGraph: { title, description, url: canonical, locale, type: "website" },
  };
}
