import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AvailabilityLegend,
  OpenDecision,
  ProofBoundary,
} from "@/components/status";
import {
  HeroStatement,
  InlineCTA,
  MethodStrip,
  PracticeStream,
  TemplatePreviewCard,
  TriggerCard,
} from "@/components/blocks";
import { AgenticOrganizationVisual } from "@/components/master-visual";
import {
  ButtonLink,
  Heading,
  Lede,
  RuledStatement,
  Section,
  SectionLabel,
} from "@/components/primitives";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const OUTCOMES: Record<Locale, { title: string; body: string; href: string }[]> = {
  ar: [
    {
      title: "احسم أي تحدٍّ للذكاء الاصطناعي يستحق التمويل.",
      body: "رهانات متعددة أمام القيادة، وقرار واحد فقط يمكن الدفاع عنه أمام المجلس.",
      href: "/when-to-involve-us/ai-investment-decision/",
    },
    {
      title: "اعرف لماذا لم يُفرج استثمار حيّ عن قيمته.",
      body: "النظام يعمل، والنتيجة لم تتحرك، لأن الأدوار والتسليمات لم تتغيّر حوله.",
      href: "/when-to-involve-us/investment-went-live-work-did-not-change/",
    },
    {
      title: "أظهِر شرط الصلاحية الذي يوقف قرار النمو أو الذكاء الاصطناعي.",
      body: "قرارات تعود إلى الأعلى أو تنتظر، لأن العتبة التي تحسمها غير موجودة.",
      href: "/when-to-involve-us/growth-made-authority-unclear/",
    },
  ],
  en: [
    {
      title: "Decide which AI challenge is worth funding.",
      body: "Several bets in front of leadership, and one decision that survives the board.",
      href: "/when-to-involve-us/ai-investment-decision/",
    },
    {
      title: "Find why a live investment has not released value.",
      body: "The system runs and the result has not moved, because the work never changed around it.",
      href: "/when-to-involve-us/investment-went-live-work-did-not-change/",
    },
    {
      title: "Expose the authority condition blocking a growth or AI decision.",
      body: "Decisions return upward or wait, because the threshold that would settle them does not exist.",
      href: "/when-to-involve-us/growth-made-authority-unclear/",
    },
  ],
};

const COPY: Record<Locale, Record<string, string>> = {
  ar: {
    outcomesLabel: "ثلاث نتائج تنفيذية",
    outcomesTitle: "ابدأ من النتيجة التي تعرفها، لا من محفظة الخدمات.",
    visualLabel: "المنظمة حول الذكاء الاصطناعي",
    visualTitle: "من الاستراتيجية إلى قيمة تثبت في العمل الفعلي.",
    visualLede:
      "سلسلة واحدة تربط النتيجة التجارية بالبنية والحوكمة، ثم بعمل الإنسان والوكيل والضوابط، وصولاً إلى قيمة العميل ومراجعة الثبات.",
    practicesLabel: "ثلاث ممارسات",
    practicesTitle: "ثلاثة أبواب عملية إلى نظام واحد للتصميم المؤسسي.",
    methodLabel: "مسار التسليم",
    methodTitle: "ستّ مراحل، وملاءمة الذكاء هي الثالثة دائماً.",
    t7Label: "شرط الاكتمال",
    boundaryLabel: "حدّ العمل",
    statusLabel: "حالة الإطلاق",
    statusTitle: "نظام ممارسة في مرحلة بيتا، معلن كما هو.",
    statusBody:
      "لينك جوروز شركة حديثة النشأة. العروض التسعة ليست متساوية في تاريخ التسليم، وحالة كل عرض معلنة على صفحته. لا تُنشر حالة عميل ولا شهادة ولا شعار قبل استيفاء معيار الدليل وإذن العميل.",
    templateLabel: "أداة مرتبطة",
    templateTitle: "ابدأ من أداة واحدة تُستخدم داخل العمل الفعلي.",
    founderLabel: "من المؤسِّس إلى الشركة",
    founderTitle: "خبرة تشغيلية حقيقية، وحدود معلنة لما تُثبته.",
    ctaTitle: "لديك حالة قائمة الآن؟",
    ctaBody: "مكالمة ملاءمة واحدة تحدد الحالة والنتيجة المطلوبة وصاحب القرار، ثم نقترح المسار المناسب أو نعتذر بوضوح.",
  },
  en: {
    outcomesLabel: "Three executive outcomes",
    outcomesTitle: "Start from the outcome you recognize, not from a services portfolio.",
    visualLabel: "The organization around AI",
    visualTitle: "From strategy to value that holds in live operation.",
    visualLede:
      "One chain connecting the business result to structure and governance, then to human–agent work and controls, through to customer value and a hold review.",
    practicesLabel: "Three practices",
    practicesTitle: "Three practical doors into one organization-design system.",
    methodLabel: "Delivery path",
    methodTitle: "Six stages, and AI Fit is always the third.",
    t7Label: "Completion condition",
    boundaryLabel: "Where our work stops",
    statusLabel: "Launch status",
    statusTitle: "A practice system in beta, stated as it is.",
    statusBody:
      "Linkgurus is a new firm. The nine offers do not share the same delivery history, and each offer states its own status on its page. No client case, testimonial or logo is published until it meets the proof standard and carries client permission.",
    templateLabel: "A related instrument",
    templateTitle: "Start from one instrument that is used inside real delivery.",
    founderLabel: "Founder to firm",
    founderTitle: "Real operating experience, with stated limits on what it proves.",
    ctaTitle: "Is one of these live in your business now?",
    ctaBody:
      "One fit call establishes the situation, the intended result and who holds the decision. We then propose the right route — or say plainly that we are not it.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale);
  return pageMetadata({
    locale,
    path: "/",
    title: `${c.meta.siteName} — ${c.meta.corporateLine}`,
    description: c.meta.masterPromise,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];
  const entryTemplate = c.templates.find((x) => x.id === "value-collision-map")!;

  return (
    <>
      {/* 2 — Hero */}
      <HeroStatement
        locale={locale}
        variant="home"
        eyebrow={c.meta.corporateLine}
        title={c.meta.masterPromise}
        lede={c.meta.categoryDescriptor}
      >
        {/* The operating boundary sits in the hero, not three screens down:
            a buyer must know what we do not do before they read an offer. */}
        <p className="mb-8 max-w-[62ch] border-s-2 border-neutral-300 ps-5 text-neutral-600">
          {locale === "ar"
            ? "نصمّم المنظمة حول الذكاء الاصطناعي. بناء التقنية وتكاملها وتشغيلها يملكه شريكك التقني."
            : "We design the organization around AI. Building, integrating and operating the technology stays with your technology partner."}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <ButtonLink locale={locale} href="/when-to-involve-us/">
            {locale === "ar" ? "اختر الحالة القائمة عندك" : "Choose the situation you have"}
          </ButtonLink>
          <ButtonLink locale={locale} href="/practices/" tone="quiet">
            {locale === "ar" ? "اطّلع على الممارسات الثلاث" : "See the three practices"}
          </ButtonLink>
        </div>
      </HeroStatement>

      {/* 3 — Three executive outcomes */}
      <Section id="outcomes" tone="quiet">
        <SectionLabel index={1}>{t.outcomesLabel}</SectionLabel>
        <Heading level={2} className="max-w-[24ch]">
          {t.outcomesTitle}
        </Heading>
        <ul className="mt-10 grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {OUTCOMES[locale].map((outcome, i) => (
            <li key={outcome.href} className="group relative bg-neutral-0 p-6">
              <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-blue-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Heading level={3} className="mt-3 text-xl">
                <a
                  href={locale === "ar" ? outcome.href : `/en${outcome.href}`}
                  className="after:absolute after:inset-0 after:content-[''] group-hover:text-blue-600"
                >
                  {outcome.title}
                </a>
              </Heading>
              <p className="mt-3 text-neutral-700">{outcome.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4 — Agentic organization master visual */}
      <Section id="master-visual">
        <SectionLabel index={2}>{t.visualLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.visualTitle}
        </Heading>
        <Lede className="mt-5">{t.visualLede}</Lede>
        <div className="mt-10">
          <AgenticOrganizationVisual locale={locale} />
        </div>
      </Section>

      {/* 5 — Three practices */}
      <Section id="practices" tone="quiet">
        <SectionLabel index={3}>{t.practicesLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.practicesTitle}
        </Heading>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {c.practices.map((practice) => (
            <PracticeStream key={practice.id} locale={locale} practice={practice} />
          ))}
        </ul>
      </Section>

      {/* 6 — 6A method strip */}
      <Section id="method">
        <SectionLabel index={4}>{t.methodLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.methodTitle}
        </Heading>
        <div className="mt-10">
          <MethodStrip locale={locale} stages={c.method} />
        </div>
      </Section>

      {/* 7 — T7 completion promise, one sentence */}
      <Section id="completion" tone="quiet">
        <SectionLabel index={5}>{t.t7Label}</SectionLabel>
        <RuledStatement accent="amber">{c.meta.t7Promise}</RuledStatement>
      </Section>

      {/* 8 — Responsibility split */}
      <Section id="boundary">
        <SectionLabel index={6}>{t.boundaryLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {c.ui.boundaryTitle}
        </Heading>
        <Lede className="mt-5">{c.ui.boundaryBody}</Lede>
      </Section>

      {/* 9 — Honest beta and proof status */}
      <Section id="status" tone="quiet">
        <SectionLabel index={7}>{t.statusLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.statusTitle}
        </Heading>
        <Lede className="mt-5">{t.statusBody}</Lede>
        <div className="mt-8">
          <AvailabilityLegend locale={locale} />
        </div>
      </Section>

      {/* 10 — Contextual template preview, gated on its own page */}
      <Section id="template">
        <SectionLabel index={8}>{t.templateLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.templateTitle}
        </Heading>
        <div className="mt-8 max-w-[46rem]">
          <TemplatePreviewCard locale={locale} template={entryTemplate} />
        </div>
      </Section>

      {/* 11 — Founder to firm, bounded wording only */}
      <Section id="founder" tone="quiet">
        <SectionLabel index={9}>{t.founderLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.founderTitle}
        </Heading>
        <div className="mt-8 max-w-[46rem] space-y-6">
          <OpenDecision locale={locale}>
            {locale === "ar"
              ? "السيرة العامة للمؤسِّس، وأسماء جهات العمل السابقة، وحدود ما يجوز ذكره — لم تُتحقّق بعد. لا يُنشر أي ادعاء عن خبرة سابقة على هذه الصفحة قبل التحقق والإذن."
              : "The founder's public biography, the employers that may be named, and the limits of what may be said are not yet verified. No prior-experience claim is published here before verification and permission."}
          </OpenDecision>
          <ProofBoundary
            locale={locale}
            state="unknown"
            note={
              locale === "ar"
                ? "خبرة المؤسِّس لدى جهات عمل سابقة ليست حالة تسليم خاصة بلينك جوروز، ولا تُقدَّم بوصفها دليلاً على الشركة."
                : "The founder's work at previous employers is not a Linkgurus delivery case and is never presented as firm proof."
            }
          />
        </div>
      </Section>

      {/* 12 — Final CTA */}
      <Section id="request">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=home"
          label={c.ui.requestCall}
          secondary={{ href: "/briefings/?source=home", label: c.ui.briefingsSecondary }}
        />
      </Section>
    </>
  );
}
