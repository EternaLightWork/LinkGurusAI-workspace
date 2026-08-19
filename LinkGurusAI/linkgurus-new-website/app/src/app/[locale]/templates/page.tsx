import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStatement, InlineCTA } from "@/components/blocks";
import {
  AbsenceList,
  Heading,
  Lede,
  LocaleLink,
  PresenceList,
  Section,
  SectionLabel,
} from "@/components/primitives";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const COPY: Record<
  Locale,
  {
    title: string;
    lede: string;
    areLabel: string;
    are: string[];
    areNot: string[];
    listLabel: string;
    privacyLabel: string;
    privacyBody: string;
    statusAvailable: string;
    statusIncomplete: string;
    statusBlocked: string;
    ctaTitle: string;
    ctaBody: string;
  }
> = {
  ar: {
    title: "أدوات تُستخدم داخل العمل، لا مواد تسويقية.",
    lede: "كل أداة هنا مأخوذة من تسليم حقيقي. اعرف ما تفحصه الأداة وما لا تُثبته قبل أن تترك بريدك.",
    areLabel: "ما هي وما ليست",
    are: [
      "أدوات فحص تُملأ على حالة واحدة حقيقية.",
      "مأخوذة من عرض مدخل أو عرض رئيسي قائم.",
      "تُرسل بالبريد عبر رابط آمن ينتهي خلال ٧٢ ساعة.",
    ],
    areNot: [
      "ليست تقييم نضج ولا اختباراً ذاتياً بدرجات.",
      "ليست دليلاً على نتيجة حققتها لينك جوروز.",
      "ليست بديلاً عن قياس خط أساس حقيقي.",
    ],
    listLabel: "الأدوات المتاحة",
    privacyLabel: "الخصوصية والإرسال",
    privacyBody:
      "نستخدم بريدك لإرسال الملف المطلوب فقط. الاشتراك في النشرة التنفيذية اختيار منفصل وغير محدد مسبقاً، ولا يؤثر على وصول الملف. رابط التحميل صالح لمرة واحدة.",
    statusAvailable: "متاحة بهذه اللغة",
    statusIncomplete: "غير مكتملة بهذه اللغة",
    statusBlocked: "موقوفة على قرار",
    ctaTitle: "الأداة نقطة بداية، لا تشخيص.",
    ctaBody: "إن كانت الحالة قائمة الآن، مكالمة ملاءمة واحدة أسرع من ملء أداة بمفردك.",
  },
  en: {
    title: "Instruments used inside delivery, not marketing collateral.",
    lede: "Each instrument here comes from real delivery. See what it inspects and what it does not prove before you leave an email address.",
    areLabel: "What these are and are not",
    are: [
      "Inspection instruments, completed against one real situation.",
      "Taken from a live entry or flagship offer.",
      "Sent by email through a secure link that expires in 72 hours.",
    ],
    areNot: [
      "Not a maturity assessment or a self-scoring quiz.",
      "Not proof of a result Linkgurus achieved.",
      "Not a substitute for a measured baseline.",
    ],
    listLabel: "Available templates",
    privacyLabel: "Privacy and delivery",
    privacyBody:
      "We use your address to send the requested file. The Briefings subscription is a separate, unchecked choice and does not affect delivery of the file. The download link works once.",
    statusAvailable: "Available in this language",
    statusIncomplete: "Not complete in this language",
    statusBlocked: "Held pending a decision",
    ctaTitle: "An instrument is a starting point, not a diagnosis.",
    ctaBody: "If the situation is live now, one fit call moves faster than completing an instrument alone.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/templates/",
    title: COPY[locale].title,
    description: COPY[locale].lede,
  });
}

export default async function TemplatesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const t = COPY[locale];

  return (
    <>
      <HeroStatement
        locale={locale}
        eyebrow={locale === "ar" ? "الأدوات" : "Templates"}
        title={t.title}
        lede={t.lede}
      />

      <Section id="what-these-are">
        <SectionLabel index={1}>{t.areLabel}</SectionLabel>
        <div className="grid gap-8 md:grid-cols-2">
          <PresenceList items={t.are} />
          <AbsenceList items={t.areNot} />
        </div>
      </Section>

      <Section id="library" tone="quiet">
        <SectionLabel index={2}>{t.listLabel}</SectionLabel>
        <ul className="space-y-px bg-neutral-200">
          {c.templates.map((template) => {
            const trigger = c.triggers.find((x) => x.id === template.triggerId);
            const status = template.releaseBlocked
              ? t.statusBlocked
              : template.fileAvailable
                ? t.statusAvailable
                : t.statusIncomplete;
            const linkable = !template.releaseBlocked || locale === "ar";

            return (
              <li key={template.id} className="bg-neutral-0 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-[52ch]">
                    <Heading level={3} className="text-xl">
                      {linkable ? (
                        <LocaleLink
                          locale={locale}
                          href={`/templates/${template.slug}/`}
                          className="hover:text-blue-600 hover:underline"
                        >
                          {template.name}
                        </LocaleLink>
                      ) : (
                        template.name
                      )}
                    </Heading>
                    <p className="mt-2 text-neutral-700">{template.situation}</p>
                    {trigger && (
                      <p className="mt-3 text-sm text-neutral-600">
                        {c.ui.relatedTriggers}:{" "}
                        <LocaleLink
                          locale={locale}
                          href={`/when-to-involve-us/${trigger.slug}/`}
                          className="text-blue-600 underline underline-offset-4"
                        >
                          {trigger.title}
                        </LocaleLink>
                      </p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 border px-2.5 py-1 text-sm ${
                      template.fileAvailable
                        ? "border-neutral-200 text-neutral-700"
                        : "border-neutral-300 text-neutral-600"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 shrink-0 ${
                        template.fileAvailable
                          ? "bg-blue-500"
                          : "border border-neutral-500 bg-[repeating-linear-gradient(45deg,var(--color-neutral-500)_0,var(--color-neutral-500)_1px,transparent_1px,transparent_2.5px)]"
                      }`}
                    />
                    {status}
                  </span>
                </div>
                {(template.releaseBlocked || template.unavailableReason) && (
                  <p className="mt-4 border-s-2 border-neutral-400 bg-neutral-25 p-4 text-sm text-neutral-700">
                    {template.releaseBlocked ?? template.unavailableReason}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="privacy">
        <SectionLabel index={3}>{t.privacyLabel}</SectionLabel>
        <Lede>{t.privacyBody}</Lede>
        <p className="mt-4">
          <LocaleLink
            locale={locale}
            href="/briefings/?source=templates-hub"
            className="text-blue-600 underline underline-offset-4"
          >
            {c.ui.briefingsSecondary}
          </LocaleLink>
        </p>
      </Section>

      <Section id="request" tone="quiet">
        <InlineCTA
          locale={locale}
          title={t.ctaTitle}
          body={t.ctaBody}
          href="/request-a-call/?source=templates-hub"
          label={c.ui.requestCall}
        />
      </Section>
    </>
  );
}
