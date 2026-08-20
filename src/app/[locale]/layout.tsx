import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getContent } from "@/content";
import { hasCounterpart } from "@/content/pages";
import { PATH_HEADER } from "@/middleware";
import { dirOf, isLocale, LOCALES, type Locale } from "@/lib/i18n";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale);
  return {
    metadataBase: new URL(process.env.APP_BASE_URL ?? "http://localhost:3000"),
    title: { default: c.meta.siteName, template: `%s — ${c.meta.siteName}` },
    description: c.meta.categoryDescriptor,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const headerList = await headers();
  const currentPath = headerList.get(PATH_HEADER) ?? "/";
  const counterpartAvailable = hasCounterpart(locale, currentPath);

  return (
    <html lang={locale} dir={dirOf(locale)}>
      <body>
        <SiteHeader
          locale={locale}
          counterpartAvailable={counterpartAvailable}
          currentPath={currentPath}
        />
        <main id="main">{children}</main>
        <SiteFooter
          locale={locale}
          counterpartAvailable={counterpartAvailable}
          currentPath={currentPath}
        />
      </body>
    </html>
  );
}
