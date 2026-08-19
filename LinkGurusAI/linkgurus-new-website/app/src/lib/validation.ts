import { z } from "zod";
import { LOCALES } from "./i18n";
import { ar } from "@/content/ar";

const TEMPLATE_IDS = ar.templates.map((t) => t.id) as [string, ...string[]];
const TRIGGER_IDS = ar.triggers.map((t) => t.id) as [string, ...string[]];
const PRACTICE_IDS = ar.practices.map((p) => p.id) as [string, ...string[]];
const OFFER_IDS = ar.practices.flatMap((p) => p.offers.map((o) => o.id)) as [string, ...string[]];

/**
 * Spec 8.5 requires strict allowlists for template id, locale and every
 * source field. Anything not on a list is dropped rather than stored.
 */
export const sourceContextSchema = z
  .object({
    source: z.string().max(64).optional(),
    trigger: z.enum(TRIGGER_IDS).optional(),
    practice: z.enum(PRACTICE_IDS).optional(),
    offer: z.enum(OFFER_IDS).optional(),
    template: z.enum(TEMPLATE_IDS).optional(),
    article: z.string().max(96).optional(),
    landingPath: z.string().max(255).optional(),
    utm_source: z.string().max(64).optional(),
    utm_medium: z.string().max(64).optional(),
    utm_campaign: z.string().max(96).optional(),
  })
  .strict()
  .partial();

/**
 * Deliberately permissive on shape and strict on length, per the OWASP email
 * validation guidance: deliverability is proven by sending, not by a regex.
 */
const email = z
  .string()
  .trim()
  .min(6)
  .max(254)
  .refine((value) => /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value), {
    message: "invalid_email",
  });

export const templateRequestSchema = z.object({
  email,
  templateId: z.enum(TEMPLATE_IDS),
  locale: z.enum(LOCALES),
  privacyAcknowledged: z.literal(true),
  briefingsOptIn: z.boolean().default(false),
  firstName: z.string().trim().max(120).optional(),
  organization: z.string().trim().max(180).optional(),
  role: z.string().trim().max(120).optional(),
  /** Honeypot: a real visitor never fills this. */
  company_website: z.string().max(0).optional(),
  context: sourceContextSchema.optional(),
});

export const enquirySchema = z.object({
  email,
  name: z.string().trim().min(2).max(160),
  organization: z.string().trim().min(2).max(180),
  role: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(80),
  triggerId: z.enum(TRIGGER_IDS).optional(),
  decisionDate: z.string().trim().max(120).optional(),
  contextNote: z.string().trim().max(4000).optional(),
  preferredLanguage: z.enum(LOCALES),
  privacyAcknowledged: z.literal(true),
  phone: z.string().trim().max(48).optional(),
  practiceId: z.enum(PRACTICE_IDS).optional(),
  offerId: z.enum(OFFER_IDS).optional(),
  referralSource: z.string().trim().max(160).optional(),
  company_website: z.string().max(0).optional(),
  context: sourceContextSchema.optional(),
});

export const briefingSchema = z.object({
  email,
  locale: z.enum(LOCALES),
  marketingConsent: z.literal(true),
  privacyAcknowledged: z.literal(true),
  firstName: z.string().trim().max(120).optional(),
  company_website: z.string().max(0).optional(),
  context: sourceContextSchema.optional(),
});

/** RFC-ish normalization used only for deduplication and rate limiting. */
export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

/** Version stamped onto every consent event (spec 8.3). */
export const PRIVACY_POLICY_VERSION = "draft-2026-08-19";
