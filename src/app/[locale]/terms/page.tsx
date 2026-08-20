import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; gate: string; sections: LegalSection[] }> = {
  ar: {
    title: "الشروط",
    lede: "تحدد هذه الصفحة حدود استخدام المحتوى والأدوات المنشورة هنا.",
    gate: "لم تكتمل بعد المراجعة القانونية للشروط ورخصة التحميل وحدود الملكية الفكرية. ما يلي وصف للنية، وليس نصاً تعاقدياً نهائياً.",
    sections: [
      {
        heading: "استخدام معلوماتي",
        body: [
          "محتوى هذا الموقع منشور لغرض معلوماتي. لا يُعدّ استشارة تنظيمية أو قانونية أو أمنية لحالة بعينها.",
        ],
      },
      {
        heading: "التعاقد بعقد مكتوب",
        body: [
          "لا ينشأ أي التزام بالتسليم إلا بعقد مكتوب. لا تُنشر الأسعار على الموقع، وتُحدَّد في عرض مكتوب بعد مكالمة ملاءمة.",
        ],
      },
      {
        heading: "رخصة الأدوات",
        body: [
          "الأدوات القابلة للتحميل تُمنح لاستخدام داخلي داخل منظمتك. لا تُعاد بيعها ولا تُنشر باسم جهة أخرى ولا تُعدّل لتقديمها كأداة طرف ثالث.",
        ],
      },
      {
        heading: "حدود الملكية",
        body: [
          "الأسماء والعلامات والأدوات والمنهج المنشور مملوكة للينك جوروز ما لم يُذكر خلاف ذلك.",
        ],
      },
    ],
  },
  en: {
    title: "Terms",
    lede: "This page sets the limits on how the content and instruments published here may be used.",
    gate: "Legal review of these terms, the download licence and the intellectual-property boundary is not complete. What follows describes intent and is not final contractual text.",
    sections: [
      {
        heading: "Informational use",
        body: [
          "The content of this site is published for information. It is not organizational, legal or security advice for a specific situation.",
        ],
      },
      {
        heading: "Engagement by written contract",
        body: [
          "No delivery obligation arises except under a written contract. Prices are not published on this site and are set in a written proposal after a fit call.",
        ],
      },
      {
        heading: "Template licence",
        body: [
          "Downloadable instruments are licensed for internal use inside your own organization. They may not be resold, republished under another name, or modified and presented as a third party's instrument.",
        ],
      },
      {
        heading: "Ownership boundary",
        body: [
          "Names, marks, instruments and published method are owned by Linkgurus unless stated otherwise.",
        ],
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, path: "/terms/", title: COPY[locale].title, description: COPY[locale].lede });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = COPY[locale];
  return <LegalPage locale={locale} title={t.title} lede={t.lede} gateNote={t.gate} sections={t.sections} />;
}
