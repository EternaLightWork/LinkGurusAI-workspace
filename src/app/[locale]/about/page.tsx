import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA, PracticeStream } from "@/components/blocks";
import { Heading, Lede, RuledStatement, Section, SectionLabel } from "@/components/primitives";
import { OpenDecision } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const VALUES: Record<Locale, { name: string; line: string; body: string }[]> = {
  ar: [
    {
      name: "الغاية",
      line: "نُظهر الجانب الخفي.",
      body: "نكشف القرارات غير المعلنة، والصلاحيات الفعلية، والتسليمات المتعثرة، والمفاضلات غير المنطوقة التي تشكّل النتائج، حتى تعمل المنظمة على ما يهم فعلاً.",
    },
    {
      name: "النزاهة",
      line: "نصمّم بعناية للمنظومة كاملة.",
      body: "نهتم بصدق بالناس والأعمال والمجتمع، ونسعى إلى تقدّم يصنع قيمة مشتركة من دون إخفاء مَن يتحمّل الكلفة أو المخاطر أو عبء التغيير.",
    },
    {
      name: "الثروة",
      line: "نحمي ما يجعل المنظمة قادرة على الاستمرار.",
      body: "تُعد العمليات المستقرة، والبيانات الموثوقة، وقائمة الأرباح المتماسكة، والأشخاص القادرين ثروة المنظمة الحقيقية، ونصمّم التغيير ليعزّزها لا ليستنزفها.",
    },
  ],
  en: [
    {
      name: "Purpose",
      line: "Bring the shadow side into view.",
      body: "We reveal the unwritten decisions, hidden authority, stalled handoffs and unspoken trade-offs that shape results, so the organization can work on the condition that actually matters.",
    },
    {
      name: "Integrity",
      line: "Design with care for the whole system.",
      body: "We care genuinely about people, the business and the community. We pursue progress that creates shared value without hiding who carries the cost, the risk or the change.",
    },
    {
      name: "Wealth",
      line: "Protect what makes the organization endure.",
      body: "We treat dependable processes, trustworthy data, a resilient P&L and capable people as the organization's true wealth, and redesign change so that wealth is strengthened, not spent carelessly.",
    },
  ],
};

const COPY: Record<Locale, { title: string; lede: string; valuesLabel: string; missionLabel: string; mission: string; visionLabel: string; vision: string; practicesLabel: string; founderLabel: string; founderBody: string; boundaryLabel: string; entityOpen: string; ctaTitle: string; ctaBody: string }> = {
  ar: {
    title: "شركة تصميم مؤسسي، تبدأ من القرار لا من الأداة.",
    lede: "لينك جوروز تجعل ما يختبئ داخل المنظمة مرئياً، وتعيد تصميمه حول القيمة.",
    valuesLabel: "الغاية والنزاهة والثروة",
    missionLabel: "الرسالة",
    mission:
      "نُظهر ما يختبئ داخل المنظمة، ونعيد تصميمه حول القيمة. تكشف لينك جوروز الظروف التنظيمية الخفية، وتُحدّد التحديات الجديرة بالحل، وتعيد تصميم الأدوار والصلاحيات ومسارات العمل ونماذج تشغيل الإنسان والذكاء الاصطناعي، حتى تحمي المؤسسات ثروتها الحقيقية وتحول التغيير إلى قيمة مشتركة.",
    visionLabel: "الرؤية",
    vision:
      "مؤسسات يظهر فيها ما يهم، ويعزّز تقدم المنظومة كاملة. نتطلع إلى مؤسسات يظهر فيها ما يهم، وتُسند القرارات إلى أصحاب واضحين، ويعمل فيها الإنسان والذكاء الاصطناعي داخل أنظمة مسؤولة، ويعزّز نموها أداء الأعمال والناس والمجتمع معاً.",
    practicesLabel: "الممارسات الثلاث",
    founderLabel: "علاقة المؤسِّس بالشركة",
    founderBody:
      "لينك جوروز شركة حديثة النشأة يقودها مؤسِّسها في التصميم والتسليم. لا نعلن فريق تسليم أوسع مما هو قائم فعلاً، ولا نضيف صفحة فريق قبل وجوده.",
    boundaryLabel: "حدّ العمل",
    entityOpen:
      "الكيان النظامي، وجغرافيا التعاقد، والموقع الفعلي، ونموذج فريق التسليم — لم تُعتمد بعد. لن تُنشر أي صياغة عنها قبل التحقق.",
    ctaTitle: "ابدأ محادثة مؤهَّلة.",
    ctaBody: "نحدد الحالة والنتيجة وصاحب القرار، ثم نقترح المسار أو نعتذر بوضوح.",
  },
  en: {
    title: "An organization-design firm that starts from the decision, not the tool.",
    lede: "Linkgurus makes the hidden organization visible, and redesigns it around value.",
    valuesLabel: "Purpose, Integrity, Wealth",
    missionLabel: "Mission",
    mission:
      "Make the hidden organization visible, and redesign it around value. Linkgurus brings hidden organizational conditions into view, frames the challenges worth solving, and redesigns roles, authority, workflows and human–AI operating models so organizations can protect their real wealth and turn change into shared value.",
    visionLabel: "Vision",
    vision:
      "Organizations where what matters is visible, and progress strengthens the whole system. We envision organizations where what matters is visible, decisions have clear ownership, people and AI work within accountable systems, and growth strengthens business performance, people and community together.",
    practicesLabel: "The three practices",
    founderLabel: "The founder's relationship to the firm",
    founderBody:
      "Linkgurus is a new firm, led in design and delivery by its founder. We do not claim a delivery bench larger than the one that exists, and we will not add a team page before there is a team.",
    boundaryLabel: "Where our work stops",
    entityOpen:
      "Legal entity, contracting geography, physical location and delivery-team model are not yet approved. No wording about them is published before verification.",
    ctaTitle: "Start a qualified conversation.",
    ctaBody: "We establish the situation, the result and who decides, then propose a route — or say plainly that we are not it.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/about/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} eyebrow={c.meta.corporateLine} title={t.title} lede={t.lede}>
        <RuledStatement>{c.meta.pointOfView}</RuledStatement>
      </HeroStatement>

      <Section id="values">
        <SectionLabel index={1}>{t.valuesLabel}</SectionLabel>
        <ul className="grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {VALUES[locale].map((value) => (
            <li key={value.name} className="bg-neutral-0 p-6">
              <Heading level={3} className="text-lg">
                {value.name}
              </Heading>
              <p className="mt-3 border-s-2 border-blue-500 ps-3 font-semibold">{value.line}</p>
              <p className="mt-3 text-neutral-700">{value.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="mission" tone="quiet">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionLabel index={2}>{t.missionLabel}</SectionLabel>
            <p className="max-w-[52ch] text-neutral-950">{t.mission}</p>
          </div>
          <div>
            <SectionLabel index={3}>{t.visionLabel}</SectionLabel>
            <p className="max-w-[52ch] text-neutral-950">{t.vision}</p>
          </div>
        </div>
      </Section>

      <Section id="practices">
        <SectionLabel index={4}>{t.practicesLabel}</SectionLabel>
        <ul className="grid gap-6 md:grid-cols-3">
          {c.practices.map((practice) => (
            <PracticeStream key={practice.id} locale={locale} practice={practice} />
          ))}
        </ul>
      </Section>

      <Section id="founder" tone="quiet">
        <SectionLabel index={5}>{t.founderLabel}</SectionLabel>
        <Lede>{t.founderBody}</Lede>
      </Section>

      <Section id="boundary">
        <SectionLabel index={6}>{t.boundaryLabel}</SectionLabel>
        <Lede>{c.ui.boundaryBody}</Lede>
        <div className="mt-8 max-w-[62ch]">
          {/* Spec 5.16 [OPEN]: entity and geography are not invented. */}
          <OpenDecision locale={locale}>{t.entityOpen}</OpenDecision>
        </div>
      </Section>

      <Section id="request" tone="quiet">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=about"
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
