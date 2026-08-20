import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA } from "@/components/blocks";
import { EmailGateForm } from "@/components/email-gate-form";
import {
  AbsenceList,
  DefinitionList,
  Heading,
  Lede,
  LocaleLink,
  PresenceList,
  Section,
  SectionLabel,
} from "@/components/primitives";
import { getContent, getPractice } from "@/content";
import { ar } from "@/content/ar";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { formatBytes, templateFileMeta } from "@/lib/template-meta";

const COPY: Record<
  Locale,
  { inspects: string; complete: string; notProve: string; details: string; gate: string; routes: string; ctaTitle: string; ctaBody: string; unavailableTitle: string }
> = {
  ar: {
    inspects: "ما الذي تفحصه",
    complete: "ما الذي تُكمله بنفسك",
    notProve: "ما لا تُشخّصه ولا تُثبته",
    details: "تفاصيل الملف",
    gate: "اطلب الأداة",
    routes: "الحالة والعرض المرتبطان",
    ctaTitle: "الأداة تُظهر الفجوة. المكالمة تحدد ما يليها.",
    ctaBody: "إن كانت الحالة قائمة الآن، ابدأ بمكالمة ملاءمة بدل ملء الأداة بمفردك.",
    unavailableTitle: "غير متاحة للتحميل الآن",
  },
  en: {
    inspects: "What it inspects",
    complete: "What you complete",
    notProve: "What it does not diagnose or prove",
    details: "File details",
    gate: "Request the template",
    routes: "Related situation and offer",
    ctaTitle: "The instrument shows the gap. The call decides what follows.",
    ctaBody: "If the situation is live now, start with a fit call rather than completing it alone.",
    unavailableTitle: "Not available for download",
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    ar.templates
      // The Agent-to-Owner Blueprint has no English page at all (spec 2.2).
      .filter((template) => locale === "ar" || template.id !== "agent-to-owner-blueprint")
      .map((template) => ({ locale, template: template.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; template: string }>;
}): Promise<Metadata> {
  const { locale, template: slug } = await params;
  if (!isLocale(locale)) return {};
  const template = getContent(locale).templates.find((t) => t.slug === slug);
  if (!template) return {};
  return pageMetadata({
    locale,
    path: `/templates/${slug}/`,
    title: template.name,
    description: template.situation,
  });
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ locale: string; template: string }>;
}) {
  const { locale: raw, template: slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  const template = c.templates.find((x) => x.slug === slug);
  if (!template) notFound();
  if (locale === "en" && template.id === "agent-to-owner-blueprint") notFound();

  const trigger = c.triggers.find((x) => x.id === template.triggerId)!;
  const practice = getPractice(locale, template.practiceId)!;
  const offer = practice.offers.find((o) => o.anchor === template.offerAnchor)!;
  const meta = templateFileMeta(template.id, locale);
  const gateOpen = template.fileAvailable && meta?.status === "available";

  return (
    <>
      <HeroStatement
        locale={locale}
        eyebrow={locale === "ar" ? "الأدوات" : "Templates"}
        title={template.name}
        lede={template.situation}
      >
        <p
          className="text-lg text-neutral-600"
          lang={locale === "ar" ? "en" : "ar"}
          dir={locale === "ar" ? "ltr" : "rtl"}
        >
          {template.altName}
        </p>
      </HeroStatement>

      <Section id="use">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionLabel index={1}>{t.complete}</SectionLabel>
            <PresenceList items={template.youComplete} />
          </div>
          <div>
            <SectionLabel index={2}>{t.notProve}</SectionLabel>
            <AbsenceList items={template.itDoesNotProve} />
          </div>
        </div>
      </Section>

      {/* Structured preview. The HTML source is never linked, and no direct
          asset URL appears anywhere in this page (spec 4.2, 7.2). */}
      <Section id="preview" tone="quiet">
        <SectionLabel index={3}>{t.inspects}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {trigger.title}
        </Heading>
        <ol className="mt-8 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
          {template.youComplete.map((field, i) => (
            <li key={field} className="bg-neutral-0 p-5">
              <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-blue-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-medium">{field}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="details">
        <SectionLabel index={4}>{t.details}</SectionLabel>
        <div className="max-w-[46rem]">
          <DefinitionList
            items={[
              { term: c.ui.formatLabel, description: meta?.format ?? "PDF" },
              {
                term: c.ui.sizeLabel,
                description: meta ? formatBytes(meta.bytes, locale) : "—",
              },
              {
                term: c.ui.languageLabel,
                description: locale === "ar" ? "العربية" : "English",
              },
              { term: c.ui.versionLabel, description: template.version },
              { term: c.ui.provenanceLabel, description: template.provenance },
            ]}
          />
        </div>
      </Section>

      <Section id="gate" tone="quiet">
        <SectionLabel index={5}>{gateOpen ? t.gate : t.unavailableTitle}</SectionLabel>
        {gateOpen ? (
          <div className="max-w-[46rem] bg-neutral-0 p-6 md:p-8">
            <Heading level={2} className="text-xl">
              {c.ui.templateGateTitle}
            </Heading>
            <div className="mt-6">
              <EmailGateForm
                locale={locale}
                templateId={template.id}
                context={{ source: "template-detail", trigger: trigger.id, practice: practice.id }}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-[46rem] border-s-2 border-neutral-950 bg-neutral-0 p-6">
            <p className="text-neutral-700">
              {template.releaseBlocked ??
                template.unavailableReason ??
                meta?.heldReason ??
                c.ui.templateArabicOnly}
            </p>
          </div>
        )}
      </Section>

      <Section id="routes">
        <SectionLabel index={6}>{t.routes}</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-neutral-200 p-6">
            <p className="text-sm font-semibold text-neutral-600">{c.ui.relatedTriggers}</p>
            <p className="mt-2">
              <LocaleLink
                locale={locale}
                href={`/when-to-involve-us/${trigger.slug}/`}
                className="text-lg font-medium text-blue-600 underline underline-offset-4"
              >
                {trigger.title}
              </LocaleLink>
            </p>
            <p className="mt-2 text-neutral-700">{trigger.cardLine}</p>
          </div>
          <div className="border border-neutral-200 p-6">
            <p className="text-sm font-semibold text-neutral-600">{c.ui.relatedOffer}</p>
            <p className="mt-2">
              <LocaleLink
                locale={locale}
                href={`/practices/${practice.slug}/#${offer.anchor}`}
                className="text-lg font-medium text-blue-600 underline underline-offset-4"
              >
                {offer.name}
              </LocaleLink>
            </p>
            <p className="mt-2 text-neutral-700">{offer.fit}</p>
          </div>
        </div>
        <Lede className="mt-8">{template.provenance}</Lede>
      </Section>

      <Section id="request" tone="quiet">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href={`/request-a-call/?source=template&template=${template.id}&trigger=${trigger.id}&practice=${practice.id}&offer=${offer.id}`}
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
