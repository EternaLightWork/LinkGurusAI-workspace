import Image from "next/image";
import type { ReactNode } from "react";
import { getContent } from "@/content";
import type {
  MethodStage,
  Offer,
  Practice,
  TemplateRecord,
  Trigger,
  InsightTopic,
} from "@/content/types";
import type { Locale } from "@/lib/i18n";
import {
  AbsenceList,
  ButtonLink,
  Container,
  Heading,
  Lede,
  LocaleLink,
  PresenceList,
  RuledStatement,
  Section,
  SectionLabel,
} from "./primitives";
import { AvailabilityBadge, ProofBoundary } from "./status";

/** Spec 4.2 HeroStatement. One H1, no rotating slogans. */
export function HeroStatement({
  locale,
  eyebrow,
  title,
  lede,
  children,
  variant = "utility",
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  variant?: "home" | "trigger" | "practice" | "utility";
}) {
  const isHome = variant === "home";
  return (
    <div className="bg-neutral-0">
      <Container>
        <div className={isHome ? "pt-14 pb-16 md:pt-20 md:pb-24" : "pt-12 pb-12 md:pt-16 md:pb-16"}>
          {eyebrow && (
            <p className="mb-5 text-sm font-medium tracking-[0.08em] text-neutral-600 uppercase rtl:tracking-normal">
              {eyebrow}
            </p>
          )}
          <Heading
            level={1}
            className={isHome ? "max-w-[26ch] text-3xl md:text-[3.25rem]" : "max-w-[24ch]"}
          >
            {title}
          </Heading>
          {lede && <Lede className="mt-6">{lede}</Lede>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </div>
  );
}

/** Spec 4.2 TriggerCard. The whole card is the link, and it names its route. */
export function TriggerCard({
  locale,
  trigger,
  index,
}: {
  locale: Locale;
  trigger: Trigger;
  index: number;
}) {
  const c = getContent(locale);
  const practice = c.practices.find((p) => p.id === trigger.practiceId);
  return (
    <li className="group relative border border-neutral-200 bg-neutral-0 transition-colors hover:border-neutral-950">
      <div className="flex h-full flex-col gap-4 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-blue-600">
            {String(index).padStart(2, "0")}
          </span>
          <AvailabilityBadge locale={locale} availability={trigger.availability} />
        </div>
        <Heading level={3} className="text-xl">
          <LocaleLink
            locale={locale}
            href={`/when-to-involve-us/${trigger.slug}/`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {trigger.title}
          </LocaleLink>
        </Heading>
        <p className="text-neutral-700">{trigger.cardLine}</p>
        <p className="mt-auto pt-3 text-sm text-neutral-600">
          {c.ui.relatedOffer}:{" "}
          <span className="font-medium text-neutral-950">
            {practice?.offers.find((o) => o.anchor === trigger.offerAnchor)?.name}
          </span>
        </p>
      </div>
    </li>
  );
}

/** Spec 4.2 PracticeStream. Uses the supplied stream SVG per practice. */
const STREAM_ICON: Record<string, string> = {
  "the-lab": "/icons/portfolio/linkgurus-icon-portfolio-the-lab.svg",
  "organization-design": "/icons/portfolio/linkgurus-icon-portfolio-restructuring-org-design.svg",
  "operating-model": "/icons/portfolio/linkgurus-icon-portfolio-operating-model.svg",
};

export function PracticeStream({
  locale,
  practice,
  showOffers = false,
}: {
  locale: Locale;
  practice: Practice;
  showOffers?: boolean;
}) {
  const c = getContent(locale);
  return (
    <li className="border border-neutral-200 bg-neutral-0 p-6 md:p-7">
      <Image
        src={STREAM_ICON[practice.id]}
        alt=""
        aria-hidden="true"
        width={44}
        height={44}
        className="h-11 w-11"
      />
      <Heading level={3} className="mt-5 text-xl">
        <LocaleLink locale={locale} href={`/practices/${practice.slug}/`} className="hover:text-blue-600">
          {practice.name}
        </LocaleLink>
      </Heading>
      <p className="mt-1 text-sm text-neutral-600" lang={locale === "ar" ? "en" : "ar"} dir={locale === "ar" ? "ltr" : "rtl"}>
        {practice.altName}
      </p>
      <p className="mt-4 text-neutral-700">{practice.role}</p>
      <p className="mt-4 border-s-2 border-blue-500 ps-4 font-semibold">{practice.line}</p>
      {showOffers && (
        <ul className="mt-5 space-y-2">
          {practice.offers.map((offer) => (
            <li key={offer.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 pt-2">
              <LocaleLink
                locale={locale}
                href={`/practices/${practice.slug}/#${offer.anchor}`}
                className="text-neutral-950 hover:text-blue-600 hover:underline"
              >
                {offer.name}
              </LocaleLink>
              <AvailabilityBadge locale={locale} availability={offer.availability} />
            </li>
          ))}
        </ul>
      )}
      <p className="sr-only">{c.ui.relatedTriggers}</p>
    </li>
  );
}

/** Spec 4.2 OfferTier. Status, fit, scope, exclusions, completion condition. */
export function OfferTierBlock({
  locale,
  practice,
  offer,
  template,
}: {
  locale: Locale;
  practice: Practice;
  offer: Offer;
  template?: TemplateRecord;
}) {
  const c = getContent(locale);
  const tierLabel =
    offer.tier === "entry" ? c.ui.tierEntry : offer.tier === "flagship" ? c.ui.tierFlagship : c.ui.tierScale;

  return (
    <article id={offer.anchor} className="scroll-mt-28 border-t border-neutral-300 pt-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="border border-neutral-950 px-2.5 py-1 text-sm font-semibold tracking-[0.06em] uppercase rtl:tracking-normal">
          {tierLabel}
        </span>
        <AvailabilityBadge locale={locale} availability={offer.availability} />
      </div>

      <Heading level={2} className="mt-5">
        {offer.name}
      </Heading>
      <p
        className="mt-1 text-lg text-neutral-600"
        lang={locale === "ar" ? "en" : "ar"}
        dir={locale === "ar" ? "ltr" : "rtl"}
      >
        {offer.altName}
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold tracking-[0.06em] text-neutral-600 uppercase rtl:tracking-normal">
            {c.ui.fit}
          </h3>
          <p className="text-neutral-950">{offer.fit}</p>

          <h3 className="mt-6 mb-2 text-sm font-semibold tracking-[0.06em] text-neutral-600 uppercase rtl:tracking-normal">
            {c.ui.duration}
          </h3>
          <p className="text-neutral-950">{offer.duration}</p>

          {offer.prerequisite && (
            <>
              <h3 className="mt-6 mb-2 text-sm font-semibold tracking-[0.06em] text-neutral-600 uppercase rtl:tracking-normal">
                {c.ui.prerequisite}
              </h3>
              <p>
                <LocaleLink
                  locale={locale}
                  href={`/practices/${practice.slug}/#${offer.prerequisite.anchor}`}
                  className="text-blue-600 underline underline-offset-4"
                >
                  {offer.prerequisite.label}
                </LocaleLink>
              </p>
            </>
          )}
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold tracking-[0.06em] text-neutral-600 uppercase rtl:tracking-normal">
            {c.ui.scope}
          </h3>
          <PresenceList items={offer.scope} />

          <h3 className="mt-6 mb-2 text-sm font-semibold tracking-[0.06em] text-neutral-600 uppercase rtl:tracking-normal">
            {c.ui.exclusions}
          </h3>
          <AbsenceList items={offer.exclusions} />
        </div>
      </div>

      <div className="mt-8 border-s-2 border-amber-400 ps-5">
        <h3 className="mb-1 text-sm font-semibold tracking-[0.06em] text-neutral-600 uppercase rtl:tracking-normal">
          {c.ui.completionCondition}
        </h3>
        <p className="max-w-[62ch] font-medium">{offer.completionCondition}</p>
      </div>

      {template && (
        <div className="mt-8">
          <TemplatePreviewCard locale={locale} template={template} />
        </div>
      )}

      <p className="mt-8 text-sm text-neutral-600">{c.ui.prices}</p>
    </article>
  );
}

/** Spec 4.2 MethodStage. AI Fit is fixed at position three by the data. */
export function MethodStrip({ locale, stages }: { locale: Locale; stages: MethodStage[] }) {
  return (
    <ol className="grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3 lg:grid-cols-6">
      {stages.map((stage) => (
        <li key={stage.id} className="flex flex-col gap-2 bg-neutral-0 p-5">
          <span className="text-sm font-semibold tabular-nums text-blue-600">
            {String(stage.index).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-bold">{stage.name}</h3>
          <p
            className="text-sm text-neutral-600"
            lang={locale === "ar" ? "en" : "ar"}
            dir={locale === "ar" ? "ltr" : "rtl"}
          >
            {stage.altName}
          </p>
          <p className="mt-1 text-neutral-950">{stage.line}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Spec 4.2 TemplatePreview. Three states: available, language-incomplete and
 * release-blocked. No state exposes a direct asset URL in the page source.
 */
export function TemplatePreviewCard({
  locale,
  template,
  showLink = true,
}: {
  locale: Locale;
  template: TemplateRecord;
  showLink?: boolean;
}) {
  const c = getContent(locale);
  const blocked = template.releaseBlocked;
  const languageIncomplete = !template.fileAvailable && !blocked;

  return (
    <div className="border border-neutral-200 bg-neutral-25 p-6">
      <p className="text-sm font-semibold tracking-[0.06em] text-neutral-600 uppercase rtl:tracking-normal">
        {c.ui.relatedTemplate}
      </p>
      <Heading level={3} className="mt-2 text-xl">
        {showLink ? (
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
      <p className="mt-3 max-w-[60ch] text-neutral-700">{template.situation}</p>

      {blocked && (
        <p className="mt-4 border-s-2 border-neutral-950 bg-neutral-0 p-4 text-sm text-neutral-700">{blocked}</p>
      )}
      {languageIncomplete && (
        <p className="mt-4 border-s-2 border-neutral-400 bg-neutral-0 p-4 text-sm text-neutral-700">
          {template.unavailableReason ?? c.ui.templateArabicOnly}
        </p>
      )}
    </div>
  );
}

/** Spec 4.2 InlineCTA. One next step; never a repeated generic banner. */
export function InlineCTA({
  locale,
  title,
  body,
  href,
  label,
  secondary,
}: {
  locale: Locale;
  title: string;
  body?: string;
  href: string;
  label: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="border-t border-neutral-950 pt-8">
      <Heading level={2}>{title}</Heading>
      {body && <Lede className="mt-4">{body}</Lede>}
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <ButtonLink locale={locale} href={href}>
          {label}
        </ButtonLink>
        {secondary && (
          <ButtonLink locale={locale} href={secondary.href} tone="quiet">
            {secondary.label}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

/** Spec 4.2 ArticleCard, used for the four insight topics. */
export function TopicCard({ locale, topic }: { locale: Locale; topic: InsightTopic }) {
  const c = getContent(locale);
  const trigger = c.triggers.find((t) => t.id === topic.triggerId);
  return (
    <li className="group relative border border-neutral-200 bg-neutral-0 p-6 transition-colors hover:border-neutral-950">
      <Heading level={3} className="text-xl">
        <LocaleLink
          locale={locale}
          href={`/insights/${topic.slug}/`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {topic.title}
        </LocaleLink>
      </Heading>
      <p className="mt-3 text-neutral-700">{topic.summary}</p>
      {trigger && (
        <p className="mt-4 text-sm text-neutral-600">
          {c.ui.relatedTriggers}: <span className="text-neutral-950">{trigger.title}</span>
        </p>
      )}
    </li>
  );
}

export { ProofBoundary, Section, SectionLabel, Container, Heading, Lede, RuledStatement };
