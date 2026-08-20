import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA, TemplatePreviewCard } from "@/components/blocks";
import { Lede, LocaleLink, Section, SectionLabel } from "@/components/primitives";
import { ProofBoundary } from "@/components/status";
import { getContent } from "@/content";
import { ar } from "@/content/ar";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { coverage: string; evidence: string; template: string; route: string; pending: string; ctaTitle: string }> = {
  ar: {
    coverage: "ما يغطيه هذا الموضوع",
    evidence: "حدود الدليل في هذا الموضوع",
    template: "الأداة المرتبطة",
    route: "الحالة المرتبطة",
    pending: "لم تُنشر بعد مقالات تحت هذا الموضوع. لا نعرض قائمة فارغة ولا عناوين مُصطنعة.",
    ctaTitle: "من القراءة إلى القرار.",
  },
  en: {
    coverage: "What this topic covers",
    evidence: "The evidence boundary on this topic",
    template: "Related instrument",
    route: "Related situation",
    pending: "No articles are published under this topic yet. We do not show an empty list or invented headlines.",
    ctaTitle: "From reading to a decision.",
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ar.topics.map((topic) => ({ locale, topic: topic.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic: slug } = await params;
  if (!isLocale(locale)) return {};
  const topic = getContent(locale).topics.find((t) => t.slug === slug);
  if (!topic) return {};
  return pageMetadata({
    locale,
    path: `/insights/${slug}/`,
    title: topic.title,
    description: topic.summary,
  });
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale: raw, topic: slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  const topic = c.topics.find((x) => x.slug === slug);
  if (!topic) notFound();

  const trigger = c.triggers.find((x) => x.id === topic.triggerId)!;
  const template = topic.templateId ? c.templates.find((x) => x.id === topic.templateId) : undefined;

  return (
    <>
      <HeroStatement locale={locale} eyebrow={c.nav.primary[3].label} title={topic.title} lede={topic.summary} />

      <Section id="coverage">
        <SectionLabel index={1}>{t.coverage}</SectionLabel>
        <Lede>{topic.summary}</Lede>
        {/* No article list is fabricated: the hub links only to what exists. */}
        <p className="mt-8 border-s-2 border-neutral-400 bg-neutral-25 p-5 text-neutral-700">{t.pending}</p>
      </Section>

      <Section id="evidence" tone="quiet">
        <SectionLabel index={2}>{t.evidence}</SectionLabel>
        <div className="max-w-[62ch]">
          <ProofBoundary locale={locale} state="inference" note={topic.evidenceNote} />
        </div>
      </Section>

      {template && (
        <Section id="template">
          <SectionLabel index={3}>{t.template}</SectionLabel>
          <div className="max-w-[46rem]">
            <TemplatePreviewCard locale={locale} template={template} />
          </div>
        </Section>
      )}

      <Section id="route" tone="quiet">
        <SectionLabel index={4}>{t.route}</SectionLabel>
        <p>
          <LocaleLink
            locale={locale}
            href={`/when-to-involve-us/${trigger.slug}/?source=insights&article=${topic.id}`}
            className="text-lg font-medium text-blue-600 underline underline-offset-4"
          >
            {trigger.title}
          </LocaleLink>
        </p>
        <p className="mt-2 max-w-[62ch] text-neutral-700">{trigger.cardLine}</p>
      </Section>

      <Section id="request">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          href={`/request-a-call/?source=insights&article=${topic.id}&trigger=${trigger.id}`}
          label={c.ui.requestCall}
          secondary={{ href: "/briefings/?source=insights", label: c.ui.briefingsSecondary }}
        />
      </Section>
    </>
  );
}
