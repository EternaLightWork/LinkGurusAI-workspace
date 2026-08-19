import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement } from "@/components/blocks";
import { ButtonLink, LocaleLink, Section } from "@/components/primitives";
import { TokenAction } from "@/components/token-action";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; working: string; done: string; invalid: string; read: string }> = {
  ar: {
    title: "تأكيد الاشتراك",
    lede: "الاشتراك لا يبدأ قبل هذه الخطوة.",
    working: "جارٍ التأكيد…",
    done: "تم تأكيد اشتراكك. يمكنك إلغاؤه في أي وقت من أي رسالة.",
    invalid: "هذا الرابط غير صالح أو انتهت صلاحيته. يمكنك الاشتراك مرة أخرى من صفحة النشرة.",
    read: "اقرأ الموضوعات",
  },
  en: {
    title: "Confirm your subscription",
    lede: "The subscription does not start before this step.",
    working: "Confirming…",
    done: "Your subscription is confirmed. You can unsubscribe at any time from any message.",
    invalid: "That link is invalid or has expired. You can subscribe again from the Briefings page.",
    read: "Read the topics",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/briefings/confirmed/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function BriefingConfirmedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} title={t.title} lede={t.lede} />
      <Section id="result">
        <div className="max-w-[62ch] space-y-8">
          <TokenAction
            endpoint="/api/briefings/confirm/"
            labels={{ working: t.working, done: t.done, invalid: t.invalid }}
          />
          <div className="flex flex-wrap gap-5">
            <ButtonLink locale={locale} href="/insights/" tone="secondary">
              {t.read}
            </ButtonLink>
            <LocaleLink locale={locale} href="/briefings/" className="inline-flex min-h-11 items-center text-blue-600 underline underline-offset-4">
              {locale === "ar" ? "صفحة النشرة" : "Briefings page"}
            </LocaleLink>
          </div>
        </div>
      </Section>
    </>
  );
}
