import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  HeroStatement,
  InlineCTA,
  OfferTierBlock,
  TemplatePreviewCard,
} from "@/components/blocks";
import {
  AbsenceList,
  ButtonLink,
  Heading,
  Lede,
  LocaleLink,
  PresenceList,
  Section,
  SectionLabel,
} from "@/components/primitives";
import { AvailabilityBadge, ProofBoundary } from "@/components/status";
import { getContent, getPractice, getTemplate } from "@/content";
import { ar } from "@/content/ar";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<
  Locale,
  { situation: string; signals: string; risk: string; establish: string; notDo: string; buyer: string; ctaTitle: string; ctaBody: string }
> = {
  ar: {
    situation: "الوضع كما هو",
    signals: "علامات ظاهرة",
    risk: "ما الذي يبقى على المحك",
    establish: "ما الذي نثبته في عرض المدخل",
    notDo: "ما لا نقوم به",
    buyer: "من يقرأ هذه الصفحة عادةً",
    ctaTitle: "هل هذه هي الحالة القائمة عندك؟",
    ctaBody: "مكالمة ملاءمة واحدة تحدد النتيجة المطلوبة وصاحب القرار وخط الأساس المتاح.",
  },
  en: {
    situation: "The situation",
    signals: "Observable signals",
    risk: "What is at risk",
    establish: "What we establish in the entry engagement",
    notDo: "What we do not do",
    buyer: "Who usually reads this page",
    ctaTitle: "Is this the condition you have?",
    ctaBody:
      "One fit call establishes the intended result, who holds the decision, and what baseline is available.",
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    ar.triggers.map((trigger) => ({ locale, trigger: trigger.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; trigger: string }>;
}): Promise<Metadata> {
  const { locale, trigger: slug } = await params;
  if (!isLocale(locale)) return {};
  const trigger = getContent(locale).triggers.find((t) => t.slug === slug);
  if (!trigger) return {};
  return pageMetadata({
    locale,
    path: `/when-to-involve-us/${slug}/`,
    title: trigger.title,
    description: trigger.cardLine,
  });
}

export default async function TriggerPage({
  params,
}: {
  params: Promise<{ locale: string; trigger: string }>;
}) {
  const { locale: raw, trigger: slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  const trigger = c.triggers.find((x) => x.slug === slug);
  if (!trigger) notFound();

  const practice = getPractice(locale, trigger.practiceId)!;
  const offer = practice.offers.find((o) => o.anchor === trigger.offerAnchor)!;
  const template = getTemplate(locale, trigger.templateId)!;

  // Every downstream CTA carries this trigger as context (spec 5.2).
  const context = `source=trigger&trigger=${trigger.id}&practice=${practice.id}&offer=${offer.id}`;

  return (
    <>
      <HeroStatement
        locale={locale}
        variant="trigger"
        eyebrow={c.nav.primary[0].label}
        title={trigger.title}
        lede={trigger.cardLine}
      >
        <div className="flex flex-wrap items-center gap-4">
          <AvailabilityBadge locale={locale} availability={trigger.availability} />
          <p className="text-sm text-neutral-600">
            {t.buyer}: <span className="text-neutral-950">{trigger.buyer}</span>
          </p>
        </div>
      </HeroStatement>

      <Section id="situation">
        <SectionLabel index={1}>{t.situation}</SectionLabel>
        <div className="max-w-[62ch] space-y-4 text-lg">
          {trigger.situation.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Section>

      <Section id="signals" tone="quiet">
        <SectionLabel index={2}>{t.signals}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {locale === "ar"
            ? "علامات يمكن ملاحظتها، لا اختبار نضج ذاتي."
            : "Signals you can observe — not a self-scoring maturity quiz."}
        </Heading>
        <div className="mt-8 max-w-[62ch]">
          <PresenceList items={trigger.signals} />
        </div>
      </Section>

      <Section id="risk">
        <SectionLabel index={3}>{t.risk}</SectionLabel>
        <div className="mt-2 max-w-[62ch]">
          <PresenceList items={trigger.atRisk} />
        </div>
      </Section>

      <Section id="what-we-establish" tone="quiet">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionLabel index={4}>{t.establish}</SectionLabel>
            <PresenceList items={trigger.weEstablish} />
          </div>
          <div>
            <SectionLabel index={5}>{t.notDo}</SectionLabel>
            <AbsenceList items={trigger.weDoNot} />
          </div>
        </div>
      </Section>

      <Section id="template">
        <SectionLabel index={6}>{c.ui.relatedTemplate}</SectionLabel>
        <div className="max-w-[46rem]">
          <TemplatePreviewCard locale={locale} template={template} />
          <p className="mt-4">
            <LocaleLink
              locale={locale}
              href={`/templates/${template.slug}/?${context}`}
              className="text-blue-600 underline underline-offset-4 hover:text-blue-700"
            >
              {locale === "ar" ? "اطّلع على الأداة واطلبها" : "See the template and request it"}
            </LocaleLink>
          </p>
        </div>
      </Section>

      <Section id="offer" tone="quiet">
        <SectionLabel index={7}>{c.ui.relatedOffer}</SectionLabel>
        <Heading level={2}>{practice.name}</Heading>
        <Lede className="mt-4">{practice.role}</Lede>
        <div className="mt-10 bg-neutral-0 p-6 md:p-8">
          <OfferTierBlock locale={locale} practice={practice} offer={offer} />
          <p className="mt-8">
            <ButtonLink
              locale={locale}
              href={`/practices/${practice.slug}/#${offer.anchor}`}
              tone="secondary"
            >
              {locale === "ar" ? "اقرأ الممارسة كاملة" : "Read the full practice"}
            </ButtonLink>
          </p>
        </div>
      </Section>

      <Section id="proof">
        <SectionLabel index={8}>{c.ui.proofBoundary}</SectionLabel>
        <div className="max-w-[62ch]">
          <ProofBoundary
            locale={locale}
            state={trigger.proofBoundary.state}
            note={trigger.proofBoundary.note}
          />
        </div>
      </Section>

      <Section id="request" tone="quiet">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href={`/request-a-call/?${context}`}
          label={c.ui.requestCallContext}
          secondary={{ href: "/when-to-involve-us/", label: c.ui.backToTriggers }}
        />
      </Section>
    </>
  );
}
