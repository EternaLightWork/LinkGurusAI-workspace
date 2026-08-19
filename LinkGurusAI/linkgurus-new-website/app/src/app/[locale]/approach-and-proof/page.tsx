import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA, MethodStrip } from "@/components/blocks";
import {
  Heading,
  Lede,
  LocaleLink,
  PresenceList,
  RuledStatement,
  Section,
  SectionLabel,
} from "@/components/primitives";
import { OpenDecision, ProofBoundary } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<
  Locale,
  {
    title: string;
    lede: string;
    methodLabel: string;
    t7Label: string;
    splitLabel: string;
    standardLabel: string;
    standardTitle: string;
    standardBody: string;
    standardLink: string;
    founderLabel: string;
    founderBody: string;
    founderLink: string;
    casesLabel: string;
    casesTitle: string;
    casesBody: string;
    ctaTitle: string;
    ctaBody: string;
  }
> = {
  ar: {
    title: "كيف يتحرك العمل، ولماذا تصدّق كل ادعاء على حدة.",
    lede: "هذه الصفحة تجيب سؤالين: كيف نعمل، وما الذي يسند كل جملة نكتبها. الادعاء بلا دليل يُعلَن كذلك.",
    methodLabel: "مسار ٦A",
    t7Label: "شرط الاكتمال",
    splitLabel: "توزيع المسؤولية",
    standardLabel: "معيار الدليل",
    standardTitle: "ما الذي يُعدّ دليلاً على شركة، لا على مشروع.",
    standardBody:
      "تصميم معتمد، أو تقرير مُسلَّم، أو عدد مشاركين، أو اقتباس رضا، أو رواية بلا اسم، أو اتجاه سوق — لا شيء من ذلك دليل كافٍ على الشركة.",
    standardLink: "اقرأ المعيار الكامل",
    founderLabel: "خبرة المؤسِّس",
    founderBody:
      "خبرة المؤسِّس التشغيلية حقيقية، لكنها ليست حالة تسليم لينك جوروز. الفصل بين الاثنين معلن على صفحة مستقلة.",
    founderLink: "اقرأ حدود خبرة المؤسِّس",
    casesLabel: "حالات العملاء",
    casesTitle: "لا تُنشر حالة قبل أن تستوفي المعيار وإذن العميل.",
    casesBody:
      "لا يوجد اليوم أي حالة عميل تستوفي المعيار الثماني كاملاً. لهذا لا توجد صفحة حالات فارغة على هذا الموقع، ولا شعارات، ولا اقتباسات.",
    ctaTitle: "ناقش حالتك مع معيار الدليل أمامك.",
    ctaBody: "مكالمة ملاءمة واحدة تحدد ما يمكن إثباته وما لا يمكن.",
  },
  en: {
    title: "How the work moves, and why you should believe each claim.",
    lede: "This page answers two questions: how we work, and what supports each sentence we write. A claim without evidence is labelled as one.",
    methodLabel: "The 6A path",
    t7Label: "Completion condition",
    splitLabel: "Responsibility split",
    standardLabel: "Proof standard",
    standardTitle: "What counts as proof of a firm, not of a project.",
    standardBody:
      "An approved design, a delivered report, a participant count, a satisfaction quote, an unnamed anecdote or a market trend — none of these is sufficient firm proof.",
    standardLink: "Read the full standard",
    founderLabel: "Founder experience",
    founderBody:
      "The founder's operating experience is real, and it is not a Linkgurus delivery case. That separation is stated on its own page.",
    founderLink: "Read the limits on founder experience",
    casesLabel: "Case studies",
    casesTitle: "No case publishes until it meets the standard and carries permission.",
    casesBody:
      "No client case currently satisfies the full eight-part standard. That is why this site has no empty case-study section, no logo wall and no testimonials.",
    ctaTitle: "Discuss your situation with the proof standard in front of you.",
    ctaBody: "One fit call establishes what can be evidenced and what cannot.",
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
    path: "/approach-and-proof/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function ApproachHubPage({
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
        eyebrow={c.nav.primary[2].label}
        title={t.title}
        lede={t.lede}
      />

      <Section id="method">
        <SectionLabel index={1}>{t.methodLabel}</SectionLabel>
        <MethodStrip locale={locale} stages={c.method} />
        <p className="mt-6">
          <LocaleLink
            locale={locale}
            href="/approach-and-proof/how-we-work/"
            className="text-blue-600 underline underline-offset-4"
          >
            {locale === "ar" ? "كيف نعمل، مرحلة بمرحلة" : "How we work, stage by stage"}
          </LocaleLink>
        </p>
      </Section>

      <Section id="completion" tone="quiet">
        <SectionLabel index={2}>{t.t7Label}</SectionLabel>
        <RuledStatement accent="amber">{c.meta.t7Promise}</RuledStatement>
      </Section>

      <Section id="split">
        <SectionLabel index={3}>{t.splitLabel}</SectionLabel>
        <Lede>{c.ui.boundaryBody}</Lede>
      </Section>

      <Section id="standard" tone="quiet">
        <SectionLabel index={4}>{t.standardLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.standardTitle}
        </Heading>
        <Lede className="mt-5">{t.standardBody}</Lede>
        <p className="mt-6">
          <LocaleLink
            locale={locale}
            href="/approach-and-proof/what-counts-as-proof/"
            className="text-blue-600 underline underline-offset-4"
          >
            {t.standardLink}
          </LocaleLink>
        </p>
      </Section>

      <Section id="founder">
        <SectionLabel index={5}>{t.founderLabel}</SectionLabel>
        <Lede>{t.founderBody}</Lede>
        <div className="mt-6">
          <OpenDecision locale={locale}>
            {locale === "ar"
              ? "لم تُتحقّق بعد صياغة السيرة العامة ولا الجهات التي يجوز ذكرها بالاسم. تظهر صفحة خبرة المؤسِّس كنموذج أولي حتى ذلك الحين."
              : "The public biography wording and the employers that may be named are not yet verified. The founder-experience page renders as a prototype until they are."}
          </OpenDecision>
        </div>
        <p className="mt-6">
          <LocaleLink
            locale={locale}
            href="/approach-and-proof/founder-experience/"
            className="text-blue-600 underline underline-offset-4"
          >
            {t.founderLink}
          </LocaleLink>
        </p>
      </Section>

      {/* Spec 5.12: the case-study route stays absent until one case is
          eligible. No empty index and no simulated evidence ships. */}
      <Section id="cases" tone="quiet">
        <SectionLabel index={6}>{t.casesLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.casesTitle}
        </Heading>
        <Lede className="mt-5">{t.casesBody}</Lede>
        <div className="mt-8 max-w-[62ch]">
          <ProofBoundary
            locale={locale}
            state="unknown"
            note={
              locale === "ar"
                ? "عدد الحالات المستوفية للمعيار اليوم: صفر. هذه الصفحة تعلن ذلك بدل أن تعرض قسماً فارغاً."
                : "Cases meeting the standard today: zero. This page states that rather than showing an empty section."
            }
          />
        </div>
      </Section>

      <Section id="request">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=approach-hub"
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
