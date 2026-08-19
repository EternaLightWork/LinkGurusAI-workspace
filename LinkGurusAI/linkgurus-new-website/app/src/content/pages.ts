import type { Locale } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";
import { ar } from "./ar";
import { en } from "./en";
import type { PageRecord } from "./types";

/**
 * Spec 3.3 requires counterpart mapping to be explicit content data, not
 * string replacement at request time. Every published route is declared here
 * once, with the locales it actually exists in. A page absent from a locale's
 * list renders a disabled, explained toggle rather than dropping the visitor
 * on that language's homepage.
 */
type PageDef = Omit<PageRecord, "locale" | "counterpartId"> & {
  /** Locales in which this route exists. Defaults to both. */
  locales?: Locale[];
};

const REVIEWED = "2026-08-19";

const base = {
  voiceOwner: "linkgurus" as const,
  lastReviewedAt: REVIEWED,
  proofRequirement: null,
};

const staticPages: PageDef[] = [
  { ...base, id: "home", path: "/", status: "editorial-review", evidenceStatus: "fact" },
  {
    ...base,
    id: "triggers-hub",
    path: "/when-to-involve-us/",
    status: "editorial-review",
    evidenceStatus: "fact",
  },
  {
    ...base,
    id: "practices-hub",
    path: "/practices/",
    status: "editorial-review",
    evidenceStatus: "fact",
  },
  {
    ...base,
    id: "approach-hub",
    path: "/approach-and-proof/",
    status: "editorial-review",
    evidenceStatus: "fact",
  },
  {
    ...base,
    id: "how-we-work",
    path: "/approach-and-proof/how-we-work/",
    status: "editorial-review",
    evidenceStatus: "fact",
  },
  {
    ...base,
    id: "what-counts-as-proof",
    path: "/approach-and-proof/what-counts-as-proof/",
    status: "editorial-review",
    evidenceStatus: "fact",
  },
  {
    ...base,
    id: "founder-experience",
    path: "/approach-and-proof/founder-experience/",
    status: "draft",
    voiceOwner: "kholoud",
    evidenceStatus: "unknown",
    proofRequirement:
      "Public wording, dates, scope, ownership and permission for every named employer or client engagement must be verified before this page launches.",
  },
  {
    ...base,
    id: "insights-hub",
    path: "/insights/",
    status: "editorial-review",
    evidenceStatus: "fact",
  },
  {
    ...base,
    id: "templates-hub",
    path: "/templates/",
    status: "editorial-review",
    evidenceStatus: "fact",
  },
  {
    ...base,
    id: "about",
    path: "/about/",
    status: "draft",
    evidenceStatus: "unknown",
    proofRequirement:
      "Legal entity, contracting geography, physical location, delivery team model and verified founder biography are outstanding.",
  },
  {
    ...base,
    id: "request-a-call",
    path: "/request-a-call/",
    status: "editorial-review",
    evidenceStatus: "fact",
  },
  {
    ...base,
    id: "request-a-call-received",
    path: "/request-a-call/received/",
    status: "editorial-review",
    evidenceStatus: "fact",
    noindex: true,
  },
  {
    ...base,
    id: "briefings",
    path: "/briefings/",
    status: "draft",
    evidenceStatus: "unknown",
    proofRequirement:
      "Sender identity, frequency, editorial owner, SMTP provider and retention policy are outstanding.",
  },
  {
    ...base,
    id: "briefings-confirmed",
    path: "/briefings/confirmed/",
    status: "draft",
    evidenceStatus: "fact",
    noindex: true,
  },
  {
    ...base,
    id: "briefings-unsubscribe",
    path: "/briefings/unsubscribe/",
    status: "draft",
    evidenceStatus: "fact",
    noindex: true,
  },
  {
    ...base,
    id: "template-request-received",
    path: "/template-request-received/",
    status: "editorial-review",
    evidenceStatus: "fact",
    noindex: true,
  },
  {
    ...base,
    id: "privacy",
    path: "/privacy/",
    status: "draft",
    evidenceStatus: "unknown",
    proofRequirement: "Legal review of the implemented data flows is required before launch.",
  },
  {
    ...base,
    id: "terms",
    path: "/terms/",
    status: "draft",
    evidenceStatus: "unknown",
    proofRequirement: "Legal review is required before launch.",
  },
  {
    ...base,
    id: "accessibility",
    path: "/accessibility/",
    status: "draft",
    evidenceStatus: "unknown",
    proofRequirement:
      "The statement may only report behaviour that manual accessibility QA has actually tested.",
  },
];

const triggerPages: PageDef[] = ar.triggers.map((t) => ({
  ...base,
  id: `trigger:${t.id}`,
  path: `/when-to-involve-us/${t.slug}/`,
  status: "editorial-review",
  evidenceStatus: t.proofBoundary.state,
  proofRequirement: t.proofBoundary.note,
}));

const practicePages: PageDef[] = ar.practices.map((p) => ({
  ...base,
  id: `practice:${p.id}`,
  path: `/practices/${p.slug}/`,
  status: "editorial-review",
  evidenceStatus: "fact",
}));

const topicPages: PageDef[] = ar.topics.map((t) => ({
  ...base,
  id: `topic:${t.id}`,
  path: `/insights/${t.slug}/`,
  status: "editorial-review",
  evidenceStatus: "inference",
  proofRequirement: t.evidenceNote,
}));

/**
 * A template detail route exists in a locale only when that locale has a
 * page to show. The Agent-to-Owner Blueprint has no English page at all:
 * spec 2.2 marks it "not created until EN exists", so an English visitor is
 * told the counterpart is unavailable rather than shown an empty gate.
 */
const templatePages: PageDef[] = ar.templates.map((t) => {
  const enTemplate = en.templates.find((x) => x.id === t.id);
  const enPageExists = t.id !== "agent-to-owner-blueprint";
  return {
    ...base,
    id: `template:${t.id}`,
    path: `/templates/${t.slug}/`,
    status: t.releaseBlocked || enTemplate?.releaseBlocked ? "proof-gated" : "editorial-review",
    evidenceStatus: "fact",
    proofRequirement: t.releaseBlocked ?? null,
    locales: enPageExists ? undefined : ["ar"],
  };
});

const defs: PageDef[] = [
  ...staticPages,
  ...triggerPages,
  ...practicePages,
  ...topicPages,
  ...templatePages,
];

export const PAGES: PageRecord[] = defs.flatMap(({ locales, ...def }) => {
  const active = locales ?? [...LOCALES];
  return active.map<PageRecord>((locale) => ({
    ...def,
    locale,
    /**
     * A counterpart exists only when the other locale publishes the same id.
     * hreflang is emitted for those pairs only (spec 2.1, 8.7).
     */
    counterpartId: active.length === LOCALES.length ? def.id : null,
  }));
});

export function findPage(locale: Locale, path: string): PageRecord | undefined {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
  return PAGES.find((p) => p.locale === locale && p.path === normalized);
}

export function hasCounterpart(locale: Locale, path: string): boolean {
  const page = findPage(locale, path);
  return Boolean(page?.counterpartId);
}

/** Indexable published URLs only (spec 8.7). */
export function indexablePages(): PageRecord[] {
  return PAGES.filter((p) => !p.noindex && p.status !== "proof-gated");
}
