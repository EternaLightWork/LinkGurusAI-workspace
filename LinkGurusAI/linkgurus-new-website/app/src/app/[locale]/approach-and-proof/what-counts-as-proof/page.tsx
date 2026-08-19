import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA } from "@/components/blocks";
import { AbsenceList, Heading, Lede, Section, SectionLabel } from "@/components/primitives";
import { ProofBoundary } from "@/components/status";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<
  Locale,
  { title: string; lede: string; standardLabel: string; standard: { head: string; body: string }[]; notLabel: string; not: string[]; ctaTitle: string; ctaBody: string }
> = {
  ar: {
    title: "معيار الدليل، منشور قبل أي حالة عميل.",
    lede: "ننشر المعيار أولاً حتى تحكم على أي حالة مستقبلية بالمقياس نفسه الذي نلتزم به.",
    standardLabel: "المعيار الثماني",
    standard: [
      { head: "حالة المشتري والوضع المقيس قبل العمل", body: "ما كان قائماً، وبأي رقم أو ملاحظة موثّقة، قبل تدخّلنا." },
      { head: "العرض ونطاقه بالضبط", body: "أي عرض بالاسم، وما شمله وما استُبعد منه." },
      { head: "التغيير في الدور أو الصلاحية أو مسار العمل أو القرار", body: "ما الذي تحرّك فعلياً في بنية العمل، لا في المستند." },
      { head: "دليل الاستخدام في التشغيل الحيّ", body: "أن التصميم استُخدم في قرارات حقيقية، بأثر يمكن الرجوع إليه." },
      { head: "ملاحظة الثبات عند نقطة مراجعة مناسبة", body: "أن ما تغيّر بقي قائماً بعد مدة معلنة، لا في يوم التسليم فقط." },
      { head: "نتيجة معتمدة من العميل وحالة الإذن", body: "أن العميل أقرّ النتيجة وأذن بنشرها بالصياغة المنشورة." },
      { head: "حدود السببية", body: "ما الذي لم تُسببه لينك جوروز، وما العوامل الأخرى التي أثّرت." },
      { head: "العرض أو المبدأ الذي تُثبته الحالة", body: "الحالة تُثبت شيئاً محدداً، لا الشركة كاملة." },
    ],
    notLabel: "ما لا يُعدّ دليلاً كافياً",
    not: [
      "تصميم معتمد لم يدخل التطبيق.",
      "تقرير مُسلَّم أو ورشة منعقدة.",
      "عدد مشاركين أو درجة رضا.",
      "رواية بلا اسم ولا إذن.",
      "اتجاه سوق أو بحث خارجي عن المشكلة.",
    ],
    ctaTitle: "اقرأ المعيار، ثم اسألنا عمّا نستطيع إثباته.",
    ctaBody: "نقول بوضوح أين يوجد دليل وأين لا يوجد.",
  },
  en: {
    title: "The proof standard, published before any client case.",
    lede: "We publish the standard first so you can judge any future case by the same measure we hold ourselves to.",
    standardLabel: "The eight-part standard",
    standard: [
      { head: "Buyer situation and measured before-state", body: "What was in place, with a documented figure or observation, before we were involved." },
      { head: "The exact offer and its scope", body: "Which offer by name, what it covered and what it excluded." },
      { head: "The change in role, authority, workflow or decision", body: "What actually moved in the structure of the work, not in the document." },
      { head: "Evidence of use in live operation", body: "That the design was used in real decisions, with a trail that can be revisited." },
      { head: "A hold observation at an appropriate review point", body: "That the change was still in place after a stated interval — not only on handover day." },
      { head: "Client-approved result and permission state", body: "That the client confirmed the result and permitted the exact published wording." },
      { head: "Causal limits", body: "What Linkgurus did not cause, and which other factors contributed." },
      { head: "The exact offer or principle validated", body: "A case proves something specific — never the firm as a whole." },
    ],
    notLabel: "What is not sufficient proof",
    not: [
      "An approved design that was never enacted.",
      "A delivered report or a workshop that ran.",
      "A participant count or a satisfaction score.",
      "An unnamed, unpermissioned anecdote.",
      "A market trend or external research about the problem.",
    ],
    ctaTitle: "Read the standard, then ask us what we can evidence.",
    ctaBody: "We will say plainly where proof exists and where it does not.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/approach-and-proof/what-counts-as-proof/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function ProofStandardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} eyebrow={c.nav.primary[2].label} title={t.title} lede={t.lede} />

      <Section id="standard">
        <SectionLabel index={1}>{t.standardLabel}</SectionLabel>
        <ol className="grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-2">
          {t.standard.map((item, i) => (
            <li key={item.head} className="bg-neutral-0 p-6">
              <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-blue-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Heading level={3} className="mt-2 text-lg">
                {item.head}
              </Heading>
              <p className="mt-2 text-neutral-700">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="not-proof" tone="quiet">
        <SectionLabel index={2}>{t.notLabel}</SectionLabel>
        <div className="max-w-[62ch]">
          <AbsenceList items={t.not} />
        </div>
      </Section>

      <Section id="today">
        <div className="max-w-[62ch]">
          <ProofBoundary
            locale={locale}
            state="unknown"
            note={
              locale === "ar"
                ? "عدد حالات لينك جوروز المستوفية لهذا المعيار اليوم: صفر. سيتغيّر هذا الرقم على هذه الصفحة أولاً."
                : "Linkgurus cases meeting this standard today: zero. That number will change on this page first."
            }
          />
        </div>
      </Section>

      <Section id="request" tone="quiet">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=proof-standard"
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
