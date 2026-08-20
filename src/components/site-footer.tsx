import Image from "next/image";
import { getContent } from "@/content";
import { LOCALE_NAME, localeHref, otherLocale, type Locale } from "@/lib/i18n";
import { Container, LocaleLink } from "./primitives";

export function SiteFooter({
  locale,
  counterpartAvailable,
  currentPath,
}: {
  locale: Locale;
  counterpartAvailable: boolean;
  currentPath: string;
}) {
  const c = getContent(locale);
  const other = otherLocale(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-25">
      <Container width="wide">
        <div className="py-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div>
              <Image
                src={locale === "ar" ? "/logos/linkgurus-wordmark-ar-trimmed.svg" : "/logos/linkgurus-wordmark-en-trimmed.svg"}
                alt={c.meta.siteName}
                width={106}
                height={40}
                className="h-10 w-auto"
              />
              <p className="mt-5 max-w-[38ch] text-lg font-semibold">{c.meta.corporateLine}</p>
              <p className="mt-3 max-w-[42ch] text-neutral-600">{c.meta.categoryDescriptor}</p>
            </div>

            <nav aria-label={locale === "ar" ? "روابط الموقع" : "Site links"}>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {c.footer.columns.map((column) => (
                  <div key={column.title}>
                    <h2 className="mb-3 text-sm font-semibold tracking-[0.06em] text-neutral-950 uppercase rtl:tracking-normal">
                      {column.title}
                    </h2>
                    <ul className="space-y-2">
                      {column.items.map((item) => (
                        <li key={item.href}>
                          <LocaleLink
                            locale={locale}
                            href={item.href}
                            className="inline-block py-1 text-neutral-700 hover:text-blue-600 hover:underline"
                          >
                            {item.label}
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          <div className="mt-12 border-t border-neutral-200 pt-6">
            {/* Spec 3.2: no legal entity data is invented. The gap is stated. */}
            <p className="max-w-[70ch] text-sm text-neutral-600">{c.footer.legalPending}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-neutral-600">{c.footer.copyright(year)}</p>
              {counterpartAvailable ? (
                <a
                  href={localeHref(other, currentPath)}
                  lang={other}
                  hrefLang={other}
                  className="inline-flex min-h-11 items-center border border-neutral-300 px-3 text-base hover:border-neutral-950"
                >
                  {LOCALE_NAME[other]}
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center border border-neutral-200 px-3 text-base text-neutral-500">
                  <span aria-hidden="true" lang={other}>
                    {LOCALE_NAME[other]}
                  </span>
                  <span className="sr-only">{c.ui.counterpartUnavailable}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
