import { headers } from "next/headers";
import { Container, Heading, Lede, LocaleLink } from "@/components/primitives";
import { getContent } from "@/content";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { PATH_HEADER } from "@/middleware";

/**
 * The 404 recovers into the trigger hub, practices, templates and home in the
 * active language (spec 5.19). The locale is inferred from the requested path
 * because a not-found render has no route params.
 */
export default async function NotFound() {
  const headerList = await headers();
  const referer = headerList.get("referer") ?? "";
  const locale: Locale =
    headerList.get(PATH_HEADER) === null && referer.includes("/en/") ? "en" : DEFAULT_LOCALE;
  const c = getContent(locale);

  const routes = [
    { href: "/when-to-involve-us/", label: c.nav.primary[0].label },
    { href: "/practices/", label: c.nav.primary[1].label },
    { href: "/templates/", label: locale === "ar" ? "الأدوات" : "Templates" },
    { href: "/", label: locale === "ar" ? "الصفحة الرئيسية" : "Home" },
  ];

  return (
    <Container>
      <div className="py-24">
        <p className="mb-5 text-sm font-medium tracking-[0.08em] text-neutral-600 uppercase rtl:tracking-normal">
          404
        </p>
        <Heading level={1}>{c.ui.pageNotFoundTitle}</Heading>
        <Lede className="mt-5">{c.ui.pageNotFoundBody}</Lede>
        <ul className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
          {routes.map((route) => (
            <li key={route.href}>
              <LocaleLink
                locale={locale}
                href={route.href}
                className="flex min-h-14 items-center text-lg text-blue-600 underline underline-offset-4"
              >
                {route.label}
              </LocaleLink>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
