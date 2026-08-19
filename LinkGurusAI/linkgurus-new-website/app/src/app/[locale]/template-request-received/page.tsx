import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement } from "@/components/blocks";
import { ButtonLink, LocaleLink, PresenceList, Section, SectionLabel } from "@/components/primitives";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; nextLabel: string; next: string[] }> = {
  ar: {
    title: "استلمنا طلبك.",
    // Spec 5.15: identical wording for a new and an existing address.
    lede: "إن كان هذا العنوان قادراً على استقبال البريد، فسيصلك رابط تحميل آمن. الرابط صالح لمرة واحدة وينتهي خلال ٧٢ ساعة.",
    nextLabel: "ما الذي يحدث الآن",
    next: [
      "يصل الملف عبر رابط، لا كمرفق.",
      "الرابط لمرة واحدة، ولملف بلغة واحدة.",
      "إن انتهى الرابط، اطلب الأداة مرة أخرى من صفحتها.",
      "إن اخترت النشرة، ستصلك رسالة تأكيد منفصلة. الملف لا يتوقف عليها.",
    ],
  },
  en: {
    title: "Your request is in.",
    lede: "If that address can receive mail, a secure download link is on its way. The link works once and expires in 72 hours.",
    nextLabel: "What happens now",
    next: [
      "The file arrives as a link, not an attachment.",
      "The link is single-use and scoped to one language file.",
      "If it expires, request the template again from its page.",
      "If you opted into the Briefings, a separate confirmation email follows. The file does not depend on it.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/template-request-received/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function TemplateReceivedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} title={t.title} lede={t.lede} />
      <Section id="next">
        <SectionLabel index={1}>{t.nextLabel}</SectionLabel>
        <div className="max-w-[62ch]">
          <PresenceList items={t.next} />
        </div>
        <div className="mt-10 flex flex-wrap gap-5">
          <ButtonLink locale={locale} href="/templates/" tone="secondary">
            {locale === "ar" ? "عد إلى الأدوات" : "Back to templates"}
          </ButtonLink>
          <LocaleLink locale={locale} href="/privacy/" className="inline-flex min-h-11 items-center text-blue-600 underline underline-offset-4">
            {locale === "ar" ? "سياسة الخصوصية" : "Privacy notice"}
          </LocaleLink>
        </div>
      </Section>
    </>
  );
}
