import type { MetadataRoute } from "next";
import { indexablePages } from "@/content/pages";
import { localeHref, otherLocale } from "@/lib/i18n";
import { baseUrl } from "@/lib/seo";

/**
 * Only indexable published URLs, with reciprocal alternates for complete
 * pairs. `x-default` is omitted: spec 9.4 leaves it undecided.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl();
  return indexablePages().map((page) => {
    const url = `${base}${localeHref(page.locale, page.path)}`;
    const other = otherLocale(page.locale);
    return {
      url,
      lastModified: new Date(page.lastReviewedAt),
      changeFrequency: "monthly" as const,
      priority: page.path === "/" ? 1 : 0.7,
      alternates: page.counterpartId
        ? { languages: { [other]: `${base}${localeHref(other, page.path)}` } }
        : undefined,
    };
  });
}
