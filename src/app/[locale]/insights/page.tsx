import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA, TopicCard } from "@/components/blocks";
import { BriefingForm } from "@/components/briefing-form";
import { Heading, Lede, LocaleLink, Section, SectionLabel } from "@/components/primitives";
import { ProofBoundary } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; topicsLabel: string; templatesLabel: string; templatesBody: string; briefingsLabel: string; briefingsBody: string; ctaTitle: string; ctaBody: string }> = {
  ar: {
    title: "أربعة موضوعات تدعم قراراً واحداً في كل مرة.",
    lede: "لا نكتب اتجاهات سوق. نكتب عن الشرط التنظيمي الذي يوقف قراراً محدداً، ونفصل الحقيقة عن الاستنتاج عن الفرضية.",
    topicsLabel: "الموضوعات",
    templatesLabel: "من القراءة إلى الأداة",
    templatesBody:
      "كل موضوع مرتبط بأداة فحص واحدة تُملأ على حالة حقيقية، وبمسار حالة واحد. لا تُقدَّم الأداة بوصفها دليلاً.",
    briefingsLabel: "النشرة التنفيذية",
    briefingsBody:
      "مستوى اهتمام أقل التزاماً من طلب المكالمة. الاشتراك بتأكيد مزدوج، وكل رسالة تحتوي رابط إلغاء.",
    ctaTitle: "الحالة قائمة الآن؟",
    ctaBody: "القراءة تفيد قبل القرار. إن كان القرار على الطاولة، ابدأ بمكالمة ملاءمة.",
  },
  en: {
    title: "Four topics that support one decision at a time.",
    lede: "We do not write market trends. We write about the organizational condition holding one specific decision, separating fact from inference from hypothesis.",
    topicsLabel: "Topics",
    templatesLabel: "From reading to instrument",
    templatesBody:
      "Each topic maps to one inspection instrument, completed against a real situation, and to one situation route. The instrument is never presented as proof.",
    briefingsLabel: "Briefings",
    briefingsBody:
      "A lower-commitment level of interest than a call request. Subscription is double opt-in, and every message carries an unsubscribe link.",
    ctaTitle: "Is the situation live now?",
    ctaBody: "Reading helps before the decision. If the decision is on the table, start with a fit call.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/insights/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function InsightsHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} eyebrow={c.nav.primary[3].label} title={t.title} lede={t.lede} />

      <Section id="topics">
        <SectionLabel index={1}>{t.topicsLabel}</SectionLabel>
        <ul className="grid gap-6 md:grid-cols-2">
          {c.topics.map((topic) => (
            <TopicCard key={topic.id} locale={locale} topic={topic} />
          ))}
        </ul>
      </Section>

      <Section id="templates" tone="quiet">
        <SectionLabel index={2}>{t.templatesLabel}</SectionLabel>
        <Lede>{t.templatesBody}</Lede>
        <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
          {c.topics.map((topic) => {
            const template = c.templates.find((x) => x.id === topic.templateId);
            if (!template) return null;
            return (
              <li key={topic.id} className="grid gap-2 py-4 md:grid-cols-2 md:gap-8">
                <span className="font-medium">{topic.title}</span>
                <LocaleLink
                  locale={locale}
                  href={`/templates/${template.slug}/?source=insights-hub&article=${topic.id}`}
                  className="text-blue-600 underline underline-offset-4"
                >
                  {template.name}
                </LocaleLink>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="briefings">
        <SectionLabel index={3}>{t.briefingsLabel}</SectionLabel>
        <Heading level={2} className="max-w-[26ch]">
          {t.briefingsLabel}
        </Heading>
        <Lede className="mt-5">{t.briefingsBody}</Lede>
        <div className="mt-8">
          <BriefingForm locale={locale} />
        </div>
      </Section>

      <Section id="evidence" tone="quiet">
        <div className="max-w-[62ch]">
          <ProofBoundary
            locale={locale}
            state="inference"
            note={
              locale === "ar"
                ? "المقالات تستند إلى بحث خارجي منشور وإلى منهج لينك جوروز. لا تُقدَّم أمثلتها بوصفها حالات عملاء."
                : "Articles draw on published external research and on Linkgurus method. Their examples are never presented as client cases."
            }
          />
        </div>
      </Section>

      <Section id="request">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=insights-hub"
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
