import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HeroStatement } from "@/components/blocks";
import { RequestCallForm } from "@/components/request-call-form";
import { AbsenceList, Lede, PresenceList, Section, SectionLabel } from "@/components/primitives";
import { OpenDecision } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; expectLabel: string; expect: string[]; notLabel: string; not: string[]; formLabel: string; slaOpen: string }> = {
  ar: {
    title: "اطلب مكالمة ملاءمة.",
    lede: "مكالمة واحدة تحدد الحالة والنتيجة المطلوبة وصاحب القرار وخط الأساس المتاح، ثم نقترح المسار أو نعتذر بوضوح.",
    expectLabel: "ما الذي يحدث بعد الإرسال",
    expect: [
      "نراجع الحالة التي وصفتها مقابل ما نستطيع إثباته.",
      "نقترح عرض المدخل المناسب، أو نقول إن لينك جوروز ليست الجهة المناسبة.",
      "لا نطلب معلومات تجارية سرية في هذه المرحلة.",
    ],
    notLabel: "ما لا نعد به",
    not: [
      "لا نعد بقبول كل طلب.",
      "لا نلتزم بمدة رد قبل اعتماد سياسة تشغيلية.",
      "لا نُصدر عرض سعر قبل مكالمة ملاءمة.",
    ],
    formLabel: "بيانات الطلب",
    slaOpen:
      "مسؤول الرد، وجهة الاستقبال، ومدة الرد المتوقعة، ورابط الحجز، ومزوّد الحماية من الإرسال الآلي — لم تُعتمد بعد. لا يُعرض وعد بمدة رد قبل اعتمادها.",
  },
  en: {
    title: "Request a fit call.",
    lede: "One call establishes the situation, the intended result, who holds the decision and what baseline exists. We then propose a route — or say plainly that we are not it.",
    expectLabel: "What happens after you send this",
    expect: [
      "We review the situation you described against what we can actually evidence.",
      "We propose the right entry offer, or say that Linkgurus is not the right firm.",
      "We do not ask for commercially sensitive information at this stage.",
    ],
    notLabel: "What we do not promise",
    not: [
      "We do not promise to accept every request.",
      "We do not commit to a response time before an operational policy is approved.",
      "We do not quote a price before a fit call.",
    ],
    formLabel: "Request details",
    slaOpen:
      "Response owner, destination inbox, expected response time, scheduling link and spam-protection provider are not yet approved. No response-time promise is shown until they are.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/request-a-call/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function RequestCallPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} eyebrow={c.nav.cta} title={t.title} lede={t.lede} />

      <Section id="expect">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionLabel index={1}>{t.expectLabel}</SectionLabel>
            <PresenceList items={t.expect} />
          </div>
          <div>
            <SectionLabel index={2}>{t.notLabel}</SectionLabel>
            <AbsenceList items={t.not} />
          </div>
        </div>
        <div className="mt-10 max-w-[62ch]">
          <OpenDecision locale={locale}>{t.slaOpen}</OpenDecision>
        </div>
      </Section>

      <Section id="form" tone="quiet">
        <SectionLabel index={3}>{t.formLabel}</SectionLabel>
        <div className="max-w-[52rem] bg-neutral-0 p-6 md:p-8">
          <Suspense fallback={<p className="text-neutral-600">{c.ui.submitting}</p>}>
            <RequestCallForm locale={locale} />
          </Suspense>
        </div>
        <Lede className="mt-8">{c.ui.prices}</Lede>
      </Section>
    </>
  );
}
