import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA, OfferTierBlock, TopicCard } from "@/components/blocks";
import {
  Heading,
  Lede,
  LocaleLink,
  RuledStatement,
  Section,
  SectionLabel,
} from "@/components/primitives";
import { AvailabilityLegend } from "@/components/status";
import { getContent, getTemplate } from "@/content";
import { ar } from "@/content/ar";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { offersLabel: string; triggersLabel: string; insightsLabel: string; boundaryLabel: string; ctaTitle: string; ctaBody: string }> = {
  ar: {
    offersLabel: "العروض الثلاثة",
    triggersLabel: "الحالات التي تخدمها هذه الممارسة",
    insightsLabel: "رؤى مرتبطة",
    boundaryLabel: "حدّ العمل",
    ctaTitle: "ناقش عرض المدخل",
    ctaBody: "مكالمة ملاءمة واحدة تحدد الحالة والنتيجة المطلوبة وصاحب القرار.",
  },
  en: {
    offersLabel: "The three offers",
    triggersLabel: "Situations this practice serves",
    insightsLabel: "Related insights",
    boundaryLabel: "Where our work stops",
    ctaTitle: "Discuss the entry offer",
    ctaBody: "One fit call establishes the situation, the intended result and who holds the decision.",
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    ar.practices.map((practice) => ({ locale, practice: practice.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; practice: string }>;
}): Promise<Metadata> {
  const { locale, practice: slug } = await params;
  if (!isLocale(locale)) return {};
  const practice = getContent(locale).practices.find((p) => p.slug === slug);
  if (!practice) return {};
  return pageMetadata({
    locale,
    path: `/practices/${slug}/`,
    title: practice.name,
    description: practice.role,
  });
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ locale: string; practice: string }>;
}) {
  const { locale: raw, practice: slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  const practice = c.practices.find((p) => p.slug === slug);
  if (!practice) notFound();

  const triggers = c.triggers.filter((x) => practice.triggers.includes(x.id));
  const topics = c.topics.filter((x) => practice.topics.includes(x.id));
  const entryOffer = practice.offers.find((o) => o.tier === "entry")!;

  return (
    <>
      <HeroStatement
        locale={locale}
        variant="practice"
        eyebrow={c.nav.primary[1].label}
        title={practice.name}
        lede={practice.purpose}
      >
        <div className="space-y-6">
          <RuledStatement>{practice.line}</RuledStatement>
          <p className="text-sm text-neutral-600">{practice.buyer}</p>
        </div>
      </HeroStatement>

      <Section id="role">
        <SectionLabel index={1}>{c.ui.relatedOffer}</SectionLabel>
        <Lede>{practice.role}</Lede>
        <div className="mt-8">
          <AvailabilityLegend locale={locale} />
        </div>
      </Section>

      <Section id="offers" tone="quiet">
        <SectionLabel index={2}>{t.offersLabel}</SectionLabel>
        <div className="space-y-16">
          {practice.offers.map((offer) => (
            <div key={offer.id} className="bg-neutral-0 p-6 md:p-8">
              <OfferTierBlock
                locale={locale}
                practice={practice}
                offer={offer}
                template={offer.templateId ? getTemplate(locale, offer.templateId) : undefined}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section id="triggers">
        <SectionLabel index={3}>{t.triggersLabel}</SectionLabel>
        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          {triggers.map((trigger) => (
            <li key={trigger.id} className="py-5">
              <LocaleLink
                locale={locale}
                href={`/when-to-involve-us/${trigger.slug}/`}
                className="text-lg font-medium text-neutral-950 hover:text-blue-600 hover:underline"
              >
                {trigger.title}
              </LocaleLink>
              <p className="mt-1 text-neutral-700">{trigger.cardLine}</p>
            </li>
          ))}
        </ul>
      </Section>

      {topics.length > 0 && (
        <Section id="insights" tone="quiet">
          <SectionLabel index={4}>{t.insightsLabel}</SectionLabel>
          <ul className="grid gap-6 md:grid-cols-2">
            {topics.map((topic) => (
              <TopicCard key={topic.id} locale={locale} topic={topic} />
            ))}
          </ul>
        </Section>
      )}

      <Section id="boundary">
        <SectionLabel index={5}>{t.boundaryLabel}</SectionLabel>
        <Lede>{c.ui.boundaryBody}</Lede>
        <div className="mt-8">
          <RuledStatement accent="amber">{c.meta.t7Promise}</RuledStatement>
        </div>
      </Section>

      <Section id="request" tone="quiet">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href={`/request-a-call/?source=practice&practice=${practice.id}&offer=${entryOffer.id}`}
          label={`${c.ui.requestCall} — ${entryOffer.name}`}
        />
      </Section>
    </>
  );
}
