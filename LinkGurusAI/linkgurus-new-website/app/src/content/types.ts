import type { Locale } from "@/lib/i18n";

/** Spec 6.2 content pair model. Every page record carries this envelope. */
export type EditorialStatus =
  | "draft"
  | "editorial-review"
  | "approved"
  | "proof-gated"
  | "published";

export type EvidenceStatus = "fact" | "inference" | "hypothesis" | "unknown";

export type PageRecord = {
  id: string;
  locale: Locale;
  path: string;
  counterpartId: string | null;
  status: EditorialStatus;
  voiceOwner: "linkgurus" | "kholoud";
  evidenceStatus: EvidenceStatus;
  proofRequirement: string | null;
  lastReviewedAt: string;
  /** Excluded from sitemap and given a noindex robots directive. */
  noindex?: boolean;
};

/** Spec 4.2 AvailabilityBadge. Never encoded by colour alone. */
export type Availability =
  | "available-now"
  | "paid-beta"
  | "proof-gated"
  | "scale-gated"
  | "point-of-view";

export type PracticeId = "the-lab" | "organization-design" | "operating-model";
export type OfferTier = "entry" | "flagship" | "scale";

export type TriggerId =
  | "ai-investment-decision"
  | "investment-went-live-work-did-not-change"
  | "growth-made-authority-unclear"
  | "ai-agents-without-clear-accountability"
  | "approved-design-not-enacted";

export type TemplateId =
  | "decision-to-hold-map"
  | "decision-in-view"
  | "challenge-to-decision-board"
  | "decision-delay-trace"
  | "value-collision-map"
  | "agent-to-owner-blueprint";

export type InsightTopicId =
  | "authority-and-organization-design"
  | "ai-investment-decisions"
  | "adoption-and-value-realization"
  | "ai-agents-and-accountability";

export type Offer = {
  id: string;
  anchor: string;
  tier: OfferTier;
  name: string;
  /** The counterpart-language name, shown as a bilingual sub-label. */
  altName: string;
  availability: Availability;
  fit: string;
  scope: string[];
  exclusions: string[];
  completionCondition: string;
  duration: string;
  /** Prerequisite offer anchor for scale-gated tiers (spec cross-link rule 7). */
  prerequisite?: { label: string; anchor: string };
  templateId?: TemplateId;
};

export type Practice = {
  id: PracticeId;
  slug: string;
  name: string;
  altName: string;
  line: string;
  lineTranslation: string;
  role: string;
  buyer: string;
  purpose: string;
  offers: Offer[];
  triggers: TriggerId[];
  topics: InsightTopicId[];
};

export type Trigger = {
  id: TriggerId;
  slug: string;
  title: string;
  cardLine: string;
  buyer: string;
  situation: string[];
  signals: string[];
  atRisk: string[];
  weEstablish: string[];
  weDoNot: string[];
  templateId: TemplateId;
  practiceId: PracticeId;
  offerAnchor: string;
  availability: Availability;
  proofBoundary: { state: EvidenceStatus; note: string };
};

export type TemplateRecord = {
  id: TemplateId;
  slug: string;
  name: string;
  altName: string;
  /** Situation the instrument helps inspect. */
  situation: string;
  youComplete: string[];
  itDoesNotProve: string[];
  version: string;
  provenance: string;
  triggerId: TriggerId;
  practiceId: PracticeId;
  offerAnchor: string;
  /** False when this locale has no independently drafted file (spec 7.1). */
  fileAvailable: boolean;
  /** Why the file is unavailable in this locale, shown instead of a gate. */
  unavailableReason?: string;
  releaseBlocked?: string;
};

export type MethodStage = {
  id: string;
  index: number;
  name: string;
  altName: string;
  line: string;
  body: string;
};

export type InsightTopic = {
  id: InsightTopicId;
  slug: string;
  title: string;
  summary: string;
  evidenceNote: string;
  triggerId: TriggerId;
  templateId?: TemplateId;
};

export type NavItem = { label: string; href: string };

export type SiteContent = {
  locale: Locale;
  meta: {
    siteName: string;
    corporateLine: string;
    corporateLineTranslation: string;
    categoryDescriptor: string;
    masterPromise: string;
    pointOfView: string;
    campaignLine: string;
    t7Promise: string;
  };
  nav: {
    primary: NavItem[];
    cta: string;
    toggleLabel: string;
    menuLabel: string;
    closeLabel: string;
    skipToContent: string;
  };
  footer: {
    columns: { title: string; items: NavItem[] }[];
    legalPending: string;
    copyright: (year: number) => string;
  };
  ui: Record<string, string>;
  practices: Practice[];
  triggers: Trigger[];
  templates: TemplateRecord[];
  method: MethodStage[];
  topics: InsightTopic[];
};
