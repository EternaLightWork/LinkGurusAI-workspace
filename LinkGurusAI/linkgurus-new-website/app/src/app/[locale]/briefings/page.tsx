import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement } from "@/components/blocks";
import { BriefingForm } from "@/components/briefing-form";
import { AbsenceList, PresenceList, Section, SectionLabel } from "@/components/primitives";
import { OpenDecision } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; isLabel: string; is: string[]; isNotLabel: string; isNot: string[]; formLabel: string; open: string }> = {
  ar: {
    title: "النشرة التنفيذية.",
    lede: "مستوى اهتمام أقل التزاماً من طلب المكالمة. هذه ليست قناة تسويق أولى، ولا امتداداً لأي دورة تدريبية.",
    isLabel: "ما تحتويه",
    is: [
      "قراءة واحدة في كل مرة حول شرط تنظيمي يوقف قراراً.",
      "فصل معلن بين الحقيقة والاستنتاج والفرضية.",
      "إشارة إلى أداة فحص واحدة أو مسار حالة واحد.",
    ],
    isNotLabel: "ما لا تحتويه",
    isNot: [
      "لا أخبار ولا اتجاهات سوق عامة.",
      "لا حالات عملاء قبل استيفاء معيار الدليل.",
      "لا عروض بيع متكررة.",
    ],
    formLabel: "الاشتراك",
    open:
      "هوية المُرسل، وعنوان الرد، والتكرار، والمسؤول التحريري، ومزوّد البريد، وسياسة الاحتفاظ بالبيانات — لم تُعتمد بعد. لن تُرسل أي رسالة قبل اعتمادها.",
  },
  en: {
    title: "The Briefings.",
    lede: "A lower-commitment level of interest than a call request. This is not a newsletter-first funnel, and it is not an extension of any course.",
    isLabel: "What it contains",
    is: [
      "One reading at a time on an organizational condition that holds a decision.",
      "An explicit separation of fact, inference and hypothesis.",
      "A pointer to one inspection instrument or one situation route.",
    ],
    isNotLabel: "What it does not contain",
    isNot: [
      "No news and no general market trends.",
      "No client cases before they meet the proof standard.",
      "No repeated sales offers.",
    ],
    formLabel: "Subscribe",
    open:
      "Sender identity, reply-to address, frequency, editorial owner, SMTP provider and retention policy are not yet approved. No message is sent until they are.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/briefings/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function BriefingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} eyebrow={c.ui.briefingsSecondary} title={t.title} lede={t.lede} />
      <Section id="contents">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionLabel index={1}>{t.isLabel}</SectionLabel>
            <PresenceList items={t.is} />
          </div>
          <div>
            <SectionLabel index={2}>{t.isNotLabel}</SectionLabel>
            <AbsenceList items={t.isNot} />
          </div>
        </div>
      </Section>
      <Section id="subscribe" tone="quiet">
        <SectionLabel index={3}>{t.formLabel}</SectionLabel>
        <div className="max-w-[46rem] space-y-8">
          <OpenDecision locale={locale}>{t.open}</OpenDecision>
          <BriefingForm locale={locale} />
        </div>
      </Section>
    </>
  );
}
