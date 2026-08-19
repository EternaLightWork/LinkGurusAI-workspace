import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; gate: string; sections: LegalSection[] }> = {
  ar: {
    title: "إتاحة الوصول",
    lede: "لا نعلن مستوى مطابقة قبل اختبار يدوي على الموقع المبني.",
    gate: "لم يُجرَ بعد اختبار إتاحة الوصول اليدوي على هذا الموقع. لن يُعلن هنا أي ادعاء بالمطابقة قبل اكتمال الاختبار، شاملاً الاتجاه من اليمين إلى اليسار، ولوحة المفاتيح، ومؤشر التركيز، والنماذج، وحالات الخطأ، والملفات المرسلة.",
    sections: [
      {
        heading: "ما بُني بقصد",
        body: [
          "الهدف المعلن هو WCAG 2.2 مستوى AA.",
          "ترتيب لوحة المفاتيح يتبع الترتيب البصري في الاتجاهين، ومؤشر التركيز ظاهر على كل عنصر تفاعلي.",
          "الحد الأدنى لمساحة اللمس ٤٤ × ٤٤ بكسل، ويُحترم تفضيل تقليل الحركة.",
          "لا تُنقل أي حالة باللون وحده؛ تُستخدم التسميات والحضور والغياب والتظليل.",
          "أخطاء النماذج تظهر بجوار الحقل وفي ملخص أخطاء معلن لتقنيات الوصول.",
        ],
      },
      {
        heading: "ما لم يُختبر بعد",
        body: [
          "لم تُجرَ مراجعة يدوية بقارئ شاشة على العربية والإنجليزية، ولا اختبار للتشكيل والاتجاه المختلط، ولا اختبار لمسار التحميل من البريد.",
        ],
      },
      {
        heading: "الإبلاغ عن عائق",
        body: ["مسار الإبلاغ عن عائق سيُنشر هنا بعد اعتماد عنوان تواصل مُتحقَّق منه."],
      },
    ],
  },
  en: {
    title: "Accessibility",
    lede: "We do not claim a conformance level before manual testing against the built site.",
    gate: "Manual accessibility testing of this site has not been carried out. No conformance claim is published here until that testing is complete, including RTL, keyboard, focus, forms, error states and delivered files.",
    sections: [
      {
        heading: "What was built deliberately",
        body: [
          "The stated target is WCAG 2.2 Level AA.",
          "Keyboard order follows the visual order in both directions, and focus is visible on every interactive control.",
          "Touch targets meet a 44 × 44 pixel minimum, and the reduced-motion preference is honoured.",
          "No state is carried by colour alone; labels, presence, absence and hatching are used instead.",
          "Form errors appear beside the field and in an error summary announced to assistive technology.",
        ],
      },
      {
        heading: "What has not been tested",
        body: [
          "No manual screen-reader review in Arabic and English has been performed, nor testing of tashkil and mixed direction, nor the email-to-download path.",
        ],
      },
      {
        heading: "Reporting a barrier",
        body: ["A route for reporting a barrier will be published here once a verified contact address is approved."],
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, path: "/accessibility/", title: COPY[locale].title, description: COPY[locale].lede });
}

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = COPY[locale];
  return <LegalPage locale={locale} title={t.title} lede={t.lede} gateNote={t.gate} sections={t.sections} />;
}
