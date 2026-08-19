import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA, TriggerCard } from "@/components/blocks";
import { Heading, Lede, Section, SectionLabel } from "@/components/primitives";
import { AvailabilityLegend } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<
  Locale,
  {
    title: string;
    lede: string;
    routingLabel: string;
    routingTitle: string;
    routingBody: string;
    outcomesLabel: string;
    outcomesTitle: string;
    outcomes: { window: string; entry: string; result: string }[];
    outcomeHeads: [string, string, string];
    boundaryLabel: string;
    ctaTitle: string;
    ctaBody: string;
  }
> = {
  ar: {
    title: "اختر الحالة الظاهرة في العمل الآن.",
    lede: "لا نطلب منك أن تفهم محفظة الخدمات أولاً. ابدأ من الوضع الذي تراه، ونحن نوجّهك إلى الممارسة والمدخل المناسبين.",
    routingLabel: "كيف يعمل التوجيه",
    routingTitle: "كل حالة تقود إلى ممارسة واحدة ومدخل واحد.",
    routingBody:
      "لا نعرض تسعة عروض متساوية. كل حالة على هذه الصفحة ترتبط بممارسة واحدة، وبعرض مدخل واحد، وبحالة إتاحة معلنة. إذا كان العرض الرئيسي موقوفاً على الدليل، نوجّهك إلى أقرب مسار مدعوم بالدليل بدل الوعد.",
    outcomesLabel: "الشهر الأول",
    outcomesTitle: "ما الذي يتغيّر فعلياً في أول شهر.",
    outcomeHeads: ["الحالة", "المدخل", "الناتج بعد أول شهر"],
    outcomes: [
      {
        window: "قرار الاستثمار في الذكاء الاصطناعي",
        entry: "مجلس القرار",
        result: "سجل قرار مكتوب بصلاحية مسمّاة، وقائمة بما يتوقف وما يُموَّل، وشرط معلن لإعادة الفتح.",
      },
      {
        window: "النمو جعل الصلاحيات غير واضحة",
        entry: "خارطة الصلاحيات",
        result: "خط أساس مقيس لزمن ٢–٣ قرارات مادية، وعتبات صلاحية مقترحة بأسماء أصحابها.",
      },
      {
        window: "الاستثمار دخل الخدمة والعمل لم يتغيّر",
        entry: "القيمة المعلّقة",
        result: "خارطة تصادم، ووكيل قيمة متفق عليه وخط أساسه، وأصغر تغيير تنظيمي يُفرج عن القيمة.",
      },
    ],
    boundaryLabel: "حدّ العمل",
    ctaTitle: "لم تجد حالتك بالضبط؟",
    ctaBody: "صف الوضع كما تراه في مكالمة ملاءمة واحدة. إن لم نكن الجهة المناسبة، نقول ذلك بوضوح.",
  },
  en: {
    title: "Choose the condition visible in the business now.",
    lede: "You do not have to understand the portfolio first. Start from the situation you can see, and we route you to the right practice and entry point.",
    routingLabel: "How routing works",
    routingTitle: "Each situation leads to one practice and one entry offer.",
    routingBody:
      "We do not present nine equal offers. Every situation on this page maps to one practice, one entry offer and a stated availability. Where a flagship is proof-gated, we route you to the nearest evidenced path instead of making a promise.",
    outcomesLabel: "First month",
    outcomesTitle: "What actually changes in the first month.",
    outcomeHeads: ["Situation", "Entry", "Result after the first month"],
    outcomes: [
      {
        window: "An AI investment decision",
        entry: "Challenge Framing Council",
        result:
          "A written decision record under a named authority, what stops and what is funded, and a stated condition for reopening it.",
      },
      {
        window: "Growth made authority unclear",
        entry: "Where Decisions Stop",
        result:
          "A measured baseline across 2–3 material decisions, and proposed authority thresholds with named holders.",
      },
      {
        window: "The investment went live; the work did not change",
        entry: "Value on Hold",
        result:
          "A collision map, an agreed value proxy with its baseline, and the smallest organizational change that releases value.",
      },
    ],
    boundaryLabel: "Where our work stops",
    ctaTitle: "None of these is quite it?",
    ctaBody:
      "Describe the situation as you see it in one fit call. If we are not the right firm, we will say so plainly.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/when-to-involve-us/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function TriggerHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement
        locale={locale}
        variant="trigger"
        eyebrow={c.nav.primary[0].label}
        title={t.title}
        lede={t.lede}
      />

      <Section id="situations">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.triggers.map((trigger, i) => (
            <TriggerCard key={trigger.id} locale={locale} trigger={trigger} index={i + 1} />
          ))}
        </ul>
        <div className="mt-10">
          <AvailabilityLegend locale={locale} />
        </div>
      </Section>

      <Section id="routing" tone="quiet">
        <SectionLabel index={1}>{t.routingLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.routingTitle}
        </Heading>
        <Lede className="mt-5">{t.routingBody}</Lede>
      </Section>

      <Section id="first-month">
        <SectionLabel index={2}>{t.outcomesLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.outcomesTitle}
        </Heading>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-start">
            <thead>
              <tr className="border-y border-neutral-300 bg-neutral-50">
                {t.outcomeHeads.map((head) => (
                  <th key={head} scope="col" className="p-4 text-start text-sm font-semibold text-neutral-700">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.outcomes.map((row) => (
                <tr key={row.window} className="border-b border-neutral-200 align-top">
                  <th scope="row" className="p-4 text-start font-semibold">
                    {row.window}
                  </th>
                  <td className="p-4">{row.entry}</td>
                  <td className="p-4 text-neutral-700">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="boundary" tone="quiet">
        <SectionLabel index={3}>{t.boundaryLabel}</SectionLabel>
        <Lede>{c.ui.boundaryBody}</Lede>
      </Section>

      <Section id="request">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=triggers-hub"
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
