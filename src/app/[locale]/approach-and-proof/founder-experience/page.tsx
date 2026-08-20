import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA, TopicCard } from "@/components/blocks";
import { AbsenceList, Lede, PresenceList, Section, SectionLabel } from "@/components/primitives";
import { OpenDecision, ProofBoundary } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<
  Locale,
  { title: string; lede: string; roleLabel: string; role: string[]; separationLabel: string; separation: string[]; boundaryLabel: string; openBody: string; insightsLabel: string; ctaTitle: string; ctaBody: string }
> = {
  ar: {
    title: "خبرة المؤسِّس داخل لينك جوروز، وحدودها المعلنة.",
    lede: "تنتقل المصداقية التشغيلية إلى الشركة بصياغة محدودة ومُتحقَّق منها فقط. عمل جهات سابقة لا يتحوّل إلى دليل على لينك جوروز.",
    roleLabel: "دور المؤسِّس داخل الشركة",
    role: [
      "يقود التصميم والتسليم في العروض القائمة اليوم.",
      "يملك المعيار التحريري ومعيار الدليل على هذا الموقع.",
      "يحدد أي حالة يجوز نشرها ومتى.",
    ],
    separationLabel: "الفصل بين تاريخ المؤسِّس وتسليم الشركة",
    separation: [
      "لا تُعرض مشاريع جهات عمل سابقة كحالات لينك جوروز.",
      "لا تُنسب نتائج مؤسسات أخرى إلى الشركة.",
      "لا يُذكر اسم جهة أو عميل قبل التحقق والإذن.",
    ],
    boundaryLabel: "حدّ الممارسة الحالي",
    openBody:
      "صياغة السيرة العامة، والتواريخ، والنطاق، والملكية، والإذن لكل جهة عمل أو عميل يُذكر بالاسم — لم تُتحقّق بعد. لا تُنشر هذه الصفحة للجمهور قبل اكتمال التحقق.",
    insightsLabel: "ما كتبه المؤسِّس",
    ctaTitle: "اطلب مكالمة مع خلود.",
    ctaBody: "نحدد الحالة والنتيجة المطلوبة وصاحب القرار، ثم نقترح المسار المناسب.",
  },
  en: {
    title: "The founder's experience inside Linkgurus, and its stated limits.",
    lede: "Operating credibility transfers to the firm only through bounded, verified wording. Work owned by previous employers does not become Linkgurus proof.",
    roleLabel: "The founder's role in the firm",
    role: [
      "Leads design and delivery on the offers that are live today.",
      "Owns the editorial standard and the proof standard on this site.",
      "Decides which case may be published, and when.",
    ],
    separationLabel: "Separating founder history from firm delivery",
    separation: [
      "Previous-employer projects are never presented as Linkgurus cases.",
      "Results owned by other organizations are not attributed to the firm.",
      "No employer or client is named before verification and permission.",
    ],
    boundaryLabel: "The current practice boundary",
    openBody:
      "The public biography wording, dates, scope, ownership and permission for every named employer or client are not yet verified. This page does not go public until that verification is complete.",
    insightsLabel: "Written by the founder",
    ctaTitle: "Request a call with Kholoud.",
    ctaBody: "We establish the situation, the intended result and who holds the decision, then propose the right route.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/approach-and-proof/founder-experience/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function FounderExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} eyebrow={c.nav.primary[2].label} title={t.title} lede={t.lede} />

      <Section id="role">
        <SectionLabel index={1}>{t.roleLabel}</SectionLabel>
        <div className="max-w-[62ch]">
          <PresenceList items={t.role} />
        </div>
      </Section>

      {/* Spec 5.11 is [OPEN]: nothing about prior employers is asserted here. */}
      <Section id="verified" tone="quiet">
        <SectionLabel index={2}>{locale === "ar" ? "بيانات الخبرة" : "Experience statements"}</SectionLabel>
        <div className="max-w-[62ch] space-y-6">
          <OpenDecision locale={locale}>{t.openBody}</OpenDecision>
          <ProofBoundary
            locale={locale}
            state="unknown"
            note={
              locale === "ar"
                ? "لا يُنشر على هذه الصفحة أي اسم جهة عمل أو عميل أو نتيجة قبل التحقق من الصياغة والتاريخ والنطاق والملكية والإذن."
                : "No employer, client or outcome is published on this page before its wording, dates, scope, ownership and permission are verified."
            }
          />
        </div>
      </Section>

      <Section id="separation">
        <SectionLabel index={3}>{t.separationLabel}</SectionLabel>
        <div className="max-w-[62ch]">
          <AbsenceList items={t.separation} />
        </div>
      </Section>

      <Section id="boundary" tone="quiet">
        <SectionLabel index={4}>{t.boundaryLabel}</SectionLabel>
        <Lede>{c.ui.boundaryBody}</Lede>
      </Section>

      <Section id="insights">
        <SectionLabel index={5}>{t.insightsLabel}</SectionLabel>
        <ul className="grid gap-6 md:grid-cols-2">
          {c.topics.map((topic) => (
            <TopicCard key={topic.id} locale={locale} topic={topic} />
          ))}
        </ul>
      </Section>

      <Section id="request" tone="quiet">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=founder-experience"
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
