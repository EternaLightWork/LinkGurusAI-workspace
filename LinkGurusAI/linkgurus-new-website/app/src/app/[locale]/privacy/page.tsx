import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; gate: string; sections: LegalSection[] }> = {
  ar: {
    title: "الخصوصية",
    lede: "هذه الصفحة تصف تدفقات البيانات المنفَّذة فعلاً في هذا الموقع.",
    gate: "لم تكتمل بعد المراجعة القانونية لسياسة الخصوصية، والأساس القانوني للمعالجة، ومدد الاحتفاظ، ومسار حقوق صاحب البيانات. ما يلي وصف تقني للتدفقات المنفَّذة، وليس نصاً قانونياً نهائياً.",
    sections: [
      {
        heading: "ما نجمعه",
        body: [
          "نموذج طلب الأداة: البريد الإلكتروني، ومعرّف الأداة، واللغة، وإقرار الخصوصية، وحقول اختيارية (الاسم الأول، المنظمة، الدور).",
          "نموذج طلب المكالمة: الاسم، وبريد العمل، والمنظمة، والدور، والدولة، والحالة، وسياق مختصر، ولغة التواصل، وحقول اختيارية.",
          "سياق المصدر من قائمة مسموح بها فقط: المصدر، والحالة، والممارسة، والعرض، والأداة، والمقال، وصفحة الدخول.",
        ],
      },
      {
        heading: "ما لا نجمعه",
        body: [
          "لا نخزّن عنوان IP الخام. تُستخدم قيمة مُجزّأة بملح سرّي لغرض تحديد المعدّل فقط.",
          "لا نسجّل نصوص النماذج الكاملة ولا الرموز في سجلات التطبيق. تُقنَّع عناوين البريد في السجلات.",
          "لا يوجد على هذا الموقع مزوّد تحليلات ولا ملفات تتبّع طرف ثالث حتى الآن.",
        ],
      },
      {
        heading: "لماذا نستخدمها",
        body: [
          "لإرسال الملف الذي طلبته عبر رابط آمن ينتهي خلال ٧٢ ساعة ويُستخدم مرة واحدة.",
          "للرد على طلب مكالمة الملاءمة.",
          "لإرسال النشرة التنفيذية إن اخترتها صراحةً بتأكيد مزدوج. طلب ملف ليس موافقة على التسويق.",
        ],
      },
      {
        heading: "سجل الموافقة",
        body: [
          "كل منح للموافقة أو سحب لها يُسجَّل بشكل مستقل مع إصدار السياسة واللغة والتاريخ، ولا يُعدَّل لاحقاً.",
        ],
      },
      {
        heading: "الاحتفاظ والحقوق",
        body: [
          "مدد الاحتفاظ ومسار الحذف والتصدير وأدوار الإدارة لم تُعتمد بعد، وستُنشر هنا بعد المراجعة القانونية.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy",
    lede: "This page describes the data flows this site actually implements.",
    gate: "Legal review of the privacy notice, the lawful basis for processing, retention periods and the data-subject rights route is not complete. What follows is a technical description of the implemented flows, not final legal text.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "Template request form: email address, template id, language, privacy acknowledgement, and optional first name, organization and role.",
          "Request a call form: name, work email, organization, role, country, situation, short context, preferred language, and optional fields.",
          "Source context from an allowlist only: source, trigger, practice, offer, template, article and landing page.",
        ],
      },
      {
        heading: "What we do not collect",
        body: [
          "We do not store a raw IP address. A salted hash is used solely for rate limiting.",
          "We do not log full form bodies or tokens in application logs. Email addresses in logs are masked.",
          "This site currently carries no analytics provider and no third-party tracking.",
        ],
      },
      {
        heading: "Why we use it",
        body: [
          "To send the file you requested through a secure, single-use link that expires in 72 hours.",
          "To respond to a fit-call request.",
          "To send the Briefings, if you explicitly opted in through double opt-in. Requesting a file is not marketing consent.",
        ],
      },
      {
        heading: "Consent record",
        body: [
          "Every grant and withdrawal of consent is recorded independently with the policy version, locale and timestamp, and is never edited afterwards.",
        ],
      },
      {
        heading: "Retention and rights",
        body: [
          "Retention periods, the deletion and export workflow and administrator roles are not yet approved and will be published here after legal review.",
        ],
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, path: "/privacy/", title: COPY[locale].title, description: COPY[locale].lede });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = COPY[locale];
  return <LegalPage locale={locale} title={t.title} lede={t.lede} gateNote={t.gate} sections={t.sections} />;
}
