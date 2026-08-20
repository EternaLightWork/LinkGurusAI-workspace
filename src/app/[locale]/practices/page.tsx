import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA, MethodStrip, PracticeStream } from "@/components/blocks";
import {
  Heading,
  Lede,
  LocaleLink,
  RuledStatement,
  Section,
  SectionLabel,
} from "@/components/primitives";
import { AvailabilityLegend } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<
  Locale,
  {
    title: string;
    lede: string;
    streamsLabel: string;
    legendLabel: string;
    outcomesLabel: string;
    outcomesTitle: string;
    outcomes: { outcome: string; practice: string; href: string }[];
    portfolioLabel: string;
    portfolioTitle: string;
    portfolioBody: string;
    methodLabel: string;
    methodTitle: string;
    methodBody: string;
    ctaTitle: string;
    ctaBody: string;
  }
> = {
  ar: {
    title: "ثلاثة أبواب عملية إلى نظام واحد للتصميم المؤسسي.",
    lede: "الممارسات الثلاث ليست ثلاث شركات. هي ثلاثة مداخل إلى الكفاءة نفسها: مَن يقرر، وماذا يبقى.",
    streamsLabel: "الممارسات",
    legendLabel: "حالة الإتاحة",
    outcomesLabel: "النتائج التنفيذية",
    outcomesTitle: "كل نتيجة تنفيذية تقود إلى ممارسة واحدة.",
    outcomes: [
      { outcome: "احسم أي تحدٍّ للذكاء الاصطناعي يستحق التمويل.", practice: "المختبر", href: "/practices/the-lab/" },
      { outcome: "أظهِر شرط الصلاحية الذي يوقف القرار.", practice: "البنية والتصميم المؤسسي", href: "/practices/organization-design/" },
      { outcome: "اعرف لماذا لم يُفرج استثمار حيّ عن قيمته.", practice: "نموذج التشغيل الذكي", href: "/practices/operating-model/" },
    ],
    portfolioLabel: "قراءة المحفظة",
    portfolioTitle: "ثلاث ممارسات، وثلاث درجات في كل ممارسة.",
    portfolioBody:
      "كل ممارسة تحتوي مدخلاً وعرضاً رئيسياً وعرض توسّع. المدخل منتج مدفوع قائم بذاته لا مكالمة نطاق مجانية، والتوسّع لا يُباع قبل خط أساس مُنفَّذ. حالة كل عرض معلنة على صفحة ممارسته.",
    methodLabel: "المنهج وشرط الاكتمال",
    methodTitle: "مسار ٦A، وملاءمة الذكاء هي المرحلة الثالثة دائماً.",
    methodBody:
      "٦A هو مسار التسليم للمشروعات المؤسسية الكبيرة، ويقوده تجارياً «إرساء النموذج المؤسسي». ليس ممارسة رابعة ولا عرضاً عاشراً.",
    ctaTitle: "أي باب يناسب حالتك؟",
    ctaBody: "إن لم تكن متأكداً، ابدأ من الحالة الظاهرة عندك بدل المحفظة.",
  },
  en: {
    title: "Three practical doors into one organization-design system.",
    lede: "The three practices are not three firms. They are three entrances to the same competence: who decides, and what holds.",
    streamsLabel: "Practices",
    legendLabel: "Availability",
    outcomesLabel: "Executive outcomes",
    outcomesTitle: "Each executive outcome leads to one practice.",
    outcomes: [
      { outcome: "Decide which AI challenge is worth funding.", practice: "The Lab", href: "/practices/the-lab/" },
      { outcome: "Expose the authority condition blocking a decision.", practice: "Organization Design", href: "/practices/organization-design/" },
      { outcome: "Find why a live investment has not released value.", practice: "The Operating Model", href: "/practices/operating-model/" },
    ],
    portfolioLabel: "Reading the portfolio",
    portfolioTitle: "Three practices, three tiers in each.",
    portfolioBody:
      "Every practice holds an entry, a flagship and a scale offer. The entry offer is a real paid product, not a free scoping call, and a scale offer is never sold before an installed baseline exists. Each offer states its own status on its practice page.",
    methodLabel: "Method and completion",
    methodTitle: "The 6A path, with AI Fit always at stage three.",
    methodBody:
      "6A is the delivery path for large enterprise engagements and is commercially led by The Install. It is not a fourth practice and not a tenth offer.",
    ctaTitle: "Which door fits your situation?",
    ctaBody: "If you are not sure, start from the condition you can see rather than from the portfolio.",
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
    path: "/practices/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function PracticesHubPage({
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
        variant="practice"
        eyebrow={c.nav.primary[1].label}
        title={c.meta.masterPromise}
        lede={t.lede}
      />

      <Section id="streams">
        <SectionLabel index={1}>{t.streamsLabel}</SectionLabel>
        <ul className="grid gap-6 md:grid-cols-3">
          {c.practices.map((practice) => (
            <PracticeStream key={practice.id} locale={locale} practice={practice} showOffers />
          ))}
        </ul>
        <div className="mt-10">
          <AvailabilityLegend locale={locale} />
        </div>
      </Section>

      <Section id="outcomes" tone="quiet">
        <SectionLabel index={2}>{t.outcomesLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.outcomesTitle}
        </Heading>
        <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
          {t.outcomes.map((row) => (
            <li key={row.href} className="grid gap-2 py-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
              <p className="text-lg font-medium">{row.outcome}</p>
              <LocaleLink
                locale={locale}
                href={row.href}
                className="text-blue-600 underline underline-offset-4 hover:text-blue-700"
              >
                {row.practice}
              </LocaleLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="portfolio">
        <SectionLabel index={3}>{t.portfolioLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.portfolioTitle}
        </Heading>
        <Lede className="mt-5">{t.portfolioBody}</Lede>
        <p className="mt-6 text-sm text-neutral-600">{c.ui.prices}</p>
      </Section>

      <Section id="method" tone="quiet">
        <SectionLabel index={4}>{t.methodLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.methodTitle}
        </Heading>
        <Lede className="mt-5">{t.methodBody}</Lede>
        <div className="mt-10">
          <MethodStrip locale={locale} stages={c.method} />
        </div>
        <div className="mt-10">
          <RuledStatement accent="amber">{c.meta.t7Promise}</RuledStatement>
        </div>
      </Section>

      <Section id="request">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=practices-hub"
          label={c.ui.requestCall}
          secondary={{ href: "/when-to-involve-us/", label: c.ui.backToTriggers }}
        />
      </Section>
    </>
  );
}
