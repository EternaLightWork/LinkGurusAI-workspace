import Link from "next/link";
import type { ReactNode } from "react";
import { localeHref, type Locale } from "@/lib/i18n";

export function Container({
  children,
  width = "default",
  className = "",
}: {
  children: ReactNode;
  width?: "default" | "narrow" | "wide";
  className?: string;
}) {
  const max =
    width === "narrow" ? "max-w-[64ch]" : width === "wide" ? "max-w-[1240px]" : "max-w-[1080px]";
  return <div className={`mx-auto w-full ${max} px-6 md:px-10 ${className}`}>{children}</div>;
}

/**
 * Sections carry their own top rule rather than bottom margins, so stacking
 * order never produces a double rule or an orphaned divider.
 */
export function Section({
  children,
  id,
  tone = "plain",
  ruled = true,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "plain" | "quiet" | "ink";
  ruled?: boolean;
  className?: string;
}) {
  const toneClass =
    tone === "quiet"
      ? "bg-neutral-25 text-neutral-950"
      : tone === "ink"
        ? "bg-neutral-950 text-neutral-0"
        : "bg-neutral-0 text-neutral-950";
  const rule = ruled && tone !== "ink" ? "border-t border-neutral-200" : "";
  return (
    <section id={id} className={`${toneClass} ${rule} scroll-mt-24 ${className}`}>
      <Container>
        <div className="py-16 md:py-24">{children}</div>
      </Container>
    </section>
  );
}

/** Small numbered eyebrow that gives long pages a readable spine. */
export function SectionLabel({ index, children }: { index?: number; children: ReactNode }) {
  return (
    <p className="mb-6 flex items-baseline gap-3 text-sm font-medium tracking-[0.08em] text-neutral-600 uppercase">
      {index !== undefined && (
        <span className="tabular-nums text-blue-600" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span className="rtl:tracking-normal">{children}</span>
    </p>
  );
}

export function Heading({
  level = 2,
  children,
  className = "",
  id,
}: {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const size =
    level === 1
      ? "text-3xl md:text-5xl font-bold"
      : level === 2
        ? "text-2xl md:text-3xl font-bold"
        : level === 3
          ? "text-xl md:text-2xl font-bold"
          : "text-lg font-semibold";
  // Tailwind's font-size utilities set their own line-height, which would
  // override the script-aware display leading defined in globals.css. Arabic
  // needs the looser value or ascenders and tashkil collide.
  const leading = "leading-[var(--lg-display-leading)]";
  return (
    <Tag id={id} className={`${size} ${leading} ${className}`}>
      {children}
    </Tag>
  );
}

export function Lede({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`max-w-[62ch] text-lg leading-[var(--lg-body-leading)] text-neutral-700 ${className}`}>
      {children}
    </p>
  );
}

/** A statement set off by an inline-start rule — the system's emphasis device. */
export function RuledStatement({
  children,
  accent = "blue",
}: {
  children: ReactNode;
  accent?: "blue" | "ink" | "amber";
}) {
  const border =
    accent === "amber" ? "border-amber-400" : accent === "ink" ? "border-neutral-950" : "border-blue-500";
  return (
    <div className={`border-s-2 ${border} ps-5 md:ps-6`}>
      <p className="max-w-[58ch] text-xl leading-snug font-semibold text-balance md:text-2xl">
        {children}
      </p>
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-neutral-200 ${className}`} />;
}

/** Locale-aware internal link. Never build a locale path by hand. */
export function LocaleLink({
  locale,
  href,
  children,
  className = "",
  ...rest
}: {
  locale: Locale;
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "locale">) {
  const [path, hash] = href.split("#");
  const target = `${localeHref(locale, path || "/")}${hash ? `#${hash}` : ""}`;
  return (
    <Link href={target} className={className} {...rest}>
      {children}
    </Link>
  );
}

type ButtonTone = "primary" | "secondary" | "quiet";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xs px-5 py-2.5 text-base font-semibold transition-colors";

const buttonTone: Record<ButtonTone, string> = {
  primary: "bg-blue-500 text-neutral-0 hover:bg-blue-600 active:bg-blue-700",
  secondary: "border border-neutral-300 bg-neutral-0 text-neutral-950 hover:border-neutral-950",
  quiet: "text-blue-600 underline underline-offset-4 hover:text-blue-700 px-0",
};

export function ButtonLink({
  locale,
  href,
  tone = "primary",
  children,
  className = "",
}: {
  locale: Locale;
  href: string;
  tone?: ButtonTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <LocaleLink
      locale={locale}
      href={href}
      className={`${buttonBase} ${buttonTone[tone]} ${className}`}
    >
      {children}
    </LocaleLink>
  );
}

export function Button({
  tone = "primary",
  className = "",
  children,
  ...rest
}: { tone?: ButtonTone } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${buttonBase} ${buttonTone[tone]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Latin-script runs inside Arabic prose must be isolated (spec 3.4). */
export function Ltr({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" className={className}>
      {children}
    </span>
  );
}

export function DefinitionList({
  items,
}: {
  items: { term: string; description: ReactNode }[];
}) {
  return (
    <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((item) => (
        <div key={item.term} className="grid gap-1 py-4 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-8">
          <dt className="text-sm font-semibold text-neutral-600">{item.term}</dt>
          <dd className="text-neutral-950">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Presence list — a filled square marks an item that is included. */
export function PresenceList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-2 w-2 shrink-0 bg-blue-500"
          />
          <span className="text-neutral-950">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Absence list — an open, hatched square. Exclusions are shown by absence and
 * outline, never by a red or amber status colour (spec 4.1).
 */
export function AbsenceList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-2 w-2 shrink-0 border border-neutral-500 bg-[repeating-linear-gradient(45deg,var(--color-neutral-500)_0,var(--color-neutral-500)_1px,transparent_1px,transparent_2.5px)]"
          />
          <span className="text-neutral-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}
