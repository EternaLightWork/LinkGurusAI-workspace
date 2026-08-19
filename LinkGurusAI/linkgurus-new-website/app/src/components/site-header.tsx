"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getContent } from "@/content";
import { LOCALE_NAME, localeHref, otherLocale, type Locale } from "@/lib/i18n";
import { LocaleLink } from "./primitives";

/**
 * Spec 3.1. Order is declared once and mirrors automatically: the DOM order
 * is the reading order in both directions, and RTL mirroring comes from
 * `dir` plus logical properties rather than a reversed array.
 */
export function SiteHeader({
  locale,
  counterpartAvailable,
  currentPath,
}: {
  locale: Locale;
  counterpartAvailable: boolean;
  currentPath: string;
}) {
  const c = getContent(locale);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  // Sticky only after the hero leaves the viewport (spec 3.1).
  useEffect(() => {
    const sentinel = document.getElementById("lg-header-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Focus trap, Escape close and focus restoration for the mobile panel.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const selector =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>(selector));
    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const other = otherLocale(locale);
  const counterpartHref = localeHref(other, currentPath);

  return (
    <>
      <a href="#main" className="lg-skip-link bg-neutral-950 px-4 py-3 text-neutral-0">
        {c.nav.skipToContent}
      </a>

      <header
        className={`sticky top-0 z-50 bg-neutral-0 ${stuck ? "border-b border-neutral-200" : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-6 px-6 py-4 md:px-10">
          <LocaleLink locale={locale} href="/" className="shrink-0" aria-label={c.meta.siteName}>
            <Image
              src={locale === "ar" ? "/logos/linkgurus-wordmark-ar-trimmed.svg" : "/logos/linkgurus-wordmark-en-trimmed.svg"}
              alt={c.meta.siteName}
              width={106}
              height={40}
              priority
              className="h-9 w-auto md:h-10"
            />
          </LocaleLink>

          <nav aria-label={c.meta.siteName} className="ms-auto hidden lg:block">
            <ul className="flex items-center gap-7">
              {c.nav.primary.map((item) => {
                const isCurrent = currentPath.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <LocaleLink
                      locale={locale}
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center text-base ${
                        isCurrent
                          ? "font-semibold text-neutral-950 underline decoration-blue-500 decoration-2 underline-offset-8"
                          : "text-neutral-700 hover:text-neutral-950"
                      }`}
                    >
                      {item.label}
                    </LocaleLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-3 lg:ms-0">
            <LocaleLink
              locale={locale}
              href="/request-a-call/"
              className="hidden min-h-11 items-center rounded-xs bg-blue-500 px-4 text-base font-semibold text-neutral-0 hover:bg-blue-600 md:inline-flex"
            >
              {c.nav.cta}
            </LocaleLink>

            <LanguageToggle
              available={counterpartAvailable}
              href={counterpartHref}
              label={LOCALE_NAME[other]}
              lang={other}
              unavailableNote={c.ui.counterpartUnavailable}
            />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="lg-mobile-nav"
              className="inline-flex h-11 w-11 items-center justify-center border border-neutral-300 lg:hidden"
            >
              <span className="sr-only">{c.nav.menuLabel}</span>
              <Image src="/icons/navigation/linkgurus-icon-navigation-menu.svg" alt="" width={20} height={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div id="lg-header-sentinel" aria-hidden="true" className="h-px" />

      {open && (
        <div
          ref={panelRef}
          id="lg-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={c.meta.siteName}
          className="fixed inset-0 z-60 flex flex-col bg-neutral-0"
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <span className="text-base font-semibold">{c.meta.siteName}</span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              className="inline-flex h-11 w-11 items-center justify-center border border-neutral-300"
            >
              <span className="sr-only">{c.nav.closeLabel}</span>
              <Image src="/icons/navigation/linkgurus-icon-navigation-close.svg" alt="" width={20} height={20} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="divide-y divide-neutral-200">
              {c.nav.primary.map((item) => (
                <li key={item.href}>
                  <LocaleLink
                    locale={locale}
                    href={item.href}
                    className="flex min-h-14 items-center text-lg font-medium"
                  >
                    {item.label}
                  </LocaleLink>
                </li>
              ))}
              <li>
                <LocaleLink
                  locale={locale}
                  href="/templates/"
                  className="flex min-h-14 items-center text-lg font-medium"
                >
                  {locale === "ar" ? "الأدوات" : "Templates"}
                </LocaleLink>
              </li>
            </ul>

            <div className="mt-8 space-y-4">
              <LocaleLink
                locale={locale}
                href="/request-a-call/"
                className="flex min-h-12 items-center justify-center rounded-xs bg-blue-500 px-5 font-semibold text-neutral-0"
              >
                {c.nav.cta}
              </LocaleLink>
              <LanguageToggle
                available={counterpartAvailable}
                href={counterpartHref}
                label={LOCALE_NAME[other]}
                lang={other}
                unavailableNote={c.ui.counterpartUnavailable}
                block
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/**
 * Spec 3.3: when no counterpart exists the toggle is disabled and explained.
 * It must never send the visitor to the other language's homepage.
 */
function LanguageToggle({
  available,
  href,
  label,
  lang,
  unavailableNote,
  block = false,
}: {
  available: boolean;
  href: string;
  label: string;
  lang: Locale;
  unavailableNote: string;
  block?: boolean;
}) {
  const shape = block
    ? "flex min-h-12 w-full items-center justify-center"
    : "inline-flex min-h-11 items-center px-3";

  if (!available) {
    return (
      <span className={`${shape} border border-neutral-200 text-base text-neutral-500`} lang={lang}>
        <span aria-hidden="true">{label}</span>
        <span className="sr-only">{unavailableNote}</span>
      </span>
    );
  }

  return (
    <a href={href} lang={lang} hrefLang={lang} className={`${shape} border border-neutral-300 text-base text-neutral-950 hover:border-neutral-950`}>
      {label}
    </a>
  );
}
