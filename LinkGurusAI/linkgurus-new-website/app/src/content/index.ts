import type { Locale } from "@/lib/i18n";
import { ar } from "./ar";
import { en } from "./en";
import type {
  InsightTopicId,
  PracticeId,
  SiteContent,
  TemplateId,
  TriggerId,
} from "./types";

const CONTENT: Record<Locale, SiteContent> = { ar, en };

export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}

export function getPractice(locale: Locale, id: PracticeId) {
  return getContent(locale).practices.find((p) => p.id === id);
}

export function getTrigger(locale: Locale, id: TriggerId) {
  return getContent(locale).triggers.find((t) => t.id === id);
}

export function getTemplate(locale: Locale, id: TemplateId) {
  return getContent(locale).templates.find((t) => t.id === id);
}

export function getTopic(locale: Locale, id: InsightTopicId) {
  return getContent(locale).topics.find((t) => t.id === id);
}

export function getOffer(locale: Locale, practiceId: PracticeId, anchor: string) {
  return getPractice(locale, practiceId)?.offers.find((o) => o.anchor === anchor);
}

export * from "./types";
