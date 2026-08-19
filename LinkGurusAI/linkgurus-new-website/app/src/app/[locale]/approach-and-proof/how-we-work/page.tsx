import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA } from "@/components/blocks";
import { Heading, Lede, RuledStatement, Section, SectionLabel } from "@/components/primitives";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; stagesLabel: string; splitLabel: string; ctaTitle: string; ctaBody: string }> = {
  ar: {
    title: "خط أساس، ثم قرار وتصميم، ثم إدخال وتغيير، ثم استخدام مُلاحَظ، ثم مراجعة.",
    lede: "التيسير آلية داخل العمل، لا المنتج. المنتج هو أن تعمل المنظمة بطريقة جديدة ويبقى ذلك قائماً.",
    stagesLabel: "المراحل الست",
    splitLabel: "حدّ العمل",
    ctaTitle: "اطلب مكالمة ملاءمة.",
    ctaBody: "نحدد المرحلة التي تبدأ منها فعلاً، لا التي تبدو الأنسب على الورق.",
  },
  en: {
    title: "Baseline, then decision and design, then enactment and change, then observed use, then review.",
    lede: "Facilitation is a mechanism inside the work, not the product. The product is the organization working a new way, and that holding.",
    stagesLabel: "The six stages",
    splitLabel: "Where our work stops",
    ctaTitle: "Request a fit call.",
    ctaBody: "We establish the stage you actually start from, not the one that looks tidiest on paper.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/approach-and-proof/how-we-work/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function HowWeWorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} eyebrow={c.nav.primary[2].label} title={t.title} lede={t.lede} />

      <Section id="stages">
        <SectionLabel index={1}>{t.stagesLabel}</SectionLabel>
        <ol className="divide-y divide-neutral-200 border-y border-neutral-200">
          {c.method.map((stage) => (
            <li key={stage.id} id={stage.id} className="scroll-mt-28 grid gap-3 py-8 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10">
              <div>
                <span className="text-sm font-semibold tabular-nums text-blue-600">
                  {String(stage.index).padStart(2, "0")}
                </span>
                <Heading level={3} className="mt-1 text-xl">
                  {stage.name}
                </Heading>
                <p
                  className="text-sm text-neutral-600"
                  lang={locale === "ar" ? "en" : "ar"}
                  dir={locale === "ar" ? "ltr" : "rtl"}
                >
                  {stage.altName}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium">{stage.line}</p>
                <p className="mt-2 max-w-[62ch] text-neutral-700">{stage.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="completion" tone="quiet">
        <RuledStatement accent="amber">{c.meta.t7Promise}</RuledStatement>
      </Section>

      <Section id="split">
        <SectionLabel index={2}>{t.splitLabel}</SectionLabel>
        <Lede>{c.ui.boundaryBody}</Lede>
      </Section>

      <Section id="request" tone="quiet">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=how-we-work"
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
