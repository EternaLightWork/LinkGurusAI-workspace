import type { ReactNode } from "react";
import type { Availability, EvidenceStatus } from "@/content/types";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";

/**
 * Spec 4.2 AvailabilityBadge. Every state is carried by its label plus a
 * non-colour visual: a filled mark, an open mark, a hatched mark or a rule.
 * Colour is decoration here and never the only signal (spec 3.5, 10.2).
 */
const MARK: Record<Availability, string> = {
  "available-now": "bg-blue-500",
  "paid-beta": "bg-neutral-0 border border-blue-500 [background-image:repeating-linear-gradient(45deg,var(--color-blue-200)_0,var(--color-blue-200)_1px,transparent_1px,transparent_3px)]",
  "proof-gated": "bg-neutral-0 border border-neutral-500",
  "scale-gated":
    "bg-neutral-0 border border-neutral-500 [background-image:repeating-linear-gradient(45deg,var(--color-neutral-300)_0,var(--color-neutral-300)_1px,transparent_1px,transparent_3px)]",
  "point-of-view": "bg-neutral-0 border-blue-2 border-neutral-950",
};

export function AvailabilityBadge({
  locale,
  availability,
  className = "",
}: {
  locale: Locale;
  availability: Availability;
  className?: string;
}) {
  const label = getContent(locale).ui[`availability.${availability}`];
  return (
    <span
      className={`inline-flex items-center gap-2 border border-neutral-200 bg-neutral-0 px-2.5 py-1 text-sm font-medium text-neutral-700 ${className}`}
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${MARK[availability]}`} />
      {label}
    </span>
  );
}

export function AvailabilityLegend({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const states: Availability[] = [
    "available-now",
    "paid-beta",
    "proof-gated",
    "scale-gated",
    "point-of-view",
  ];
  return (
    <div className="border border-neutral-200 bg-neutral-25 p-5">
      <p className="mb-3 text-sm font-semibold text-neutral-700">{c.ui.availabilityLegend}</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {states.map((s) => (
          <li key={s}>
            <AvailabilityBadge locale={locale} availability={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Spec 4.2 ProofBoundary. Makes the claim state of a page explicit so no
 * inference is read as firm proof.
 */
export function ProofBoundary({
  locale,
  state,
  note,
  title,
}: {
  locale: Locale;
  state: EvidenceStatus;
  note: string;
  title?: string;
}) {
  const c = getContent(locale);
  return (
    <div className="border-s-2 border-neutral-950 bg-neutral-25 p-5 md:p-6">
      <p className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-sm font-semibold tracking-[0.06em] text-neutral-950 uppercase rtl:tracking-normal">
          {title ?? c.ui.proofBoundary}
        </span>
        <span className="border border-neutral-300 px-2 py-0.5 text-sm text-neutral-700">
          {c.ui[`evidence.${state}`]}
        </span>
      </p>
      <p className="max-w-[62ch] text-neutral-700">{note}</p>
    </div>
  );
}

/**
 * A labelled prototype placeholder for `[OPEN]` inputs (spec 9.1). It is
 * deliberately conspicuous: an unresolved decision must never be able to
 * pass as approved public copy.
 */
export function OpenDecision({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const c = getContent(locale);
  return (
    <div
      className="border border-dashed border-neutral-400 bg-[repeating-linear-gradient(45deg,var(--color-neutral-50)_0,var(--color-neutral-50)_6px,transparent_6px,transparent_12px)] p-5"
      data-editorial-state="open"
    >
      <p className="mb-2 text-sm font-semibold tracking-[0.06em] text-neutral-700 uppercase rtl:tracking-normal">
        {c.ui.openLabel}
      </p>
      <div className="max-w-[62ch] text-neutral-700">{children}</div>
    </div>
  );
}
