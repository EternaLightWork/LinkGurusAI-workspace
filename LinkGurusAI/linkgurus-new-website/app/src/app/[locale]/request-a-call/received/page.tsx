import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement } from "@/components/blocks";
import { ButtonLink, LocaleLink, PresenceList, Section, SectionLabel } from "@/components/primitives";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; nextLabel: string; next: string[]; readLabel: string }> = {
  ar: {
    title: "وصلنا طلبك.",
    lede: "سنراجع الحالة التي وصفتها. لا نلتزم بقبول كل طلب، وسنقول ذلك بوضوح إن لم نكن الجهة المناسبة.",
    nextLabel: "الخطوة التالية",
    next: [
      "نراجع الحالة مقابل ما نستطيع إثباته اليوم.",
      "إن كان هناك مسار مناسب، نقترح عرض المدخل ونطاقه.",
      "إن لم يكن، نقول ذلك ونقترح ما هو أقرب.",
    ],
    readLabel: "بينما تنتظر",
  },
  en: {
    title: "We received your request.",
    lede: "We will review the situation you described. We do not accept every request, and we will say so plainly if we are not the right firm.",
    nextLabel: "What happens next",
    next: [
      "We review the situation against what we can evidence today.",
      "If there is a fit, we propose the entry offer and its scope.",
      "If there is not, we say so and point to what is closer.",
    ],
    readLabel: "While you wait",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/request-a-call/received/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function RequestReceivedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} title={t.title} lede={t.lede} />
      <Section id="next">
        <SectionLabel index={1}>{t.nextLabel}</SectionLabel>
        <div className="max-w-[62ch]">
          <PresenceList items={t.next} />
        </div>
      </Section>
      <Section id="read" tone="quiet">
        <SectionLabel index={2}>{t.readLabel}</SectionLabel>
        <ul className="space-y-3">
          <li>
            <LocaleLink locale={locale} href="/approach-and-proof/what-counts-as-proof/" className="text-blue-600 underline underline-offset-4">
              {locale === "ar" ? "ما الذي يُعدّ دليلاً" : "What counts as proof"}
            </LocaleLink>
          </li>
          <li>
            <LocaleLink locale={locale} href="/approach-and-proof/how-we-work/" className="text-blue-600 underline underline-offset-4">
              {locale === "ar" ? "كيف نعمل" : "How we work"}
            </LocaleLink>
          </li>
          <li>
            <LocaleLink locale={locale} href="/templates/" className="text-blue-600 underline underline-offset-4">
              {locale === "ar" ? "الأدوات" : "Templates"}
            </LocaleLink>
          </li>
        </ul>
        <p className="mt-8">
          <ButtonLink locale={locale} href="/" tone="secondary">
            {locale === "ar" ? "عد إلى الصفحة الرئيسية" : "Back to home"}
          </ButtonLink>
        </p>
      </Section>
    </>
  );
}
