export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

/**
 * Arabic sits at the root; English is prefixed. This is the only place the
 * prefix rule is expressed, so a locale added later changes one function.
 */
export function localeHref(locale: Locale, path: string): string {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
  if (locale === DEFAULT_LOCALE) return normalized;
  return normalized === "/" ? "/en/" : `/en${normalized}`;
}

/** Native name of a locale, used on the counterpart toggle. */
export const LOCALE_NAME: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export const HTML_LANG: Record<Locale, string> = { ar: "ar", en: "en" };
