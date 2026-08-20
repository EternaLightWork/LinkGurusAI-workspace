import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement } from "@/components/blocks";
import { ButtonLink, Section } from "@/components/primitives";
import { TokenAction } from "@/components/token-action";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<Locale, { title: string; lede: string; working: string; done: string; invalid: string }> = {
  ar: {
    title: "إلغاء الاشتراك",
    lede: "لا يتطلب تسجيل دخول.",
    working: "جارٍ التنفيذ…",
    done: "تم. لن تصلك رسائل النشرة بعد الآن.",
    invalid: "تم. إن كان هذا العنوان مشتركاً، فقد أُلغي اشتراكه.",
  },
  en: {
    title: "Unsubscribe",
    lede: "No sign-in required.",
    working: "Processing…",
    done: "Done. You will no longer receive the Briefings.",
    invalid: "Done. If that address was subscribed, it has been unsubscribed.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/briefings/unsubscribe/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function UnsubscribePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = COPY[locale];

  return (
    <>
      <HeroStatement locale={locale} title={t.title} lede={t.lede} />
      <Section id="result">
        <div className="max-w-[62ch] space-y-8">
          {/* Both outcomes read the same, so the page cannot be used to probe
              whether an address is on the list. */}
          <TokenAction
            endpoint="/api/briefings/unsubscribe/"
            labels={{ working: t.working, done: t.done, invalid: t.invalid }}
          />
          <ButtonLink locale={locale} href="/" tone="secondary">
            {locale === "ar" ? "عد إلى الصفحة الرئيسية" : "Back to home"}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
