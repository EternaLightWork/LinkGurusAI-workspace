import type { Locale } from "./i18n";
import type { TemplateId } from "@/content/types";

/**
 * The private-file registry (spec 7.2). `source` is the path inside the
 * repository asset folder; `storageKey` is the opaque key held in the
 * database and used by the download route. No public page, JSON payload or
 * client bundle ever references either value.
 *
 * `status: "held"` means the asset exists but is not releasable yet. A held
 * file is seeded so its provenance is recorded, but the gate refuses to
 * create a token for it.
 */
export type TemplateFileEntry = {
  templateId: TemplateId;
  locale: Locale;
  source: string;
  storageKey: string;
  /** Fixed, safe filename used in Content-Disposition (spec 8.5). */
  downloadName: string;
  status: "available" | "held";
  heldReason?: string;
};

export const TEMPLATE_FILES: TemplateFileEntry[] = [
  {
    templateId: "decision-in-view",
    locale: "ar",
    source: "the-lab/entry/decision-in-view-ar.pdf",
    storageKey: "the-lab/decision-in-view-ar.pdf",
    downloadName: "Linkgurus-Waraqat-Alhasm-AR.pdf",
    status: "available",
  },
  {
    templateId: "decision-in-view",
    locale: "en",
    source: "the-lab/entry/decision-in-view-en.pdf",
    storageKey: "the-lab/decision-in-view-en.pdf",
    downloadName: "Linkgurus-Decision-in-View-EN.pdf",
    status: "held",
    heldReason:
      "The English PDF still carries the superseded 'Challenge Framing Canva' title and metadata (spec 1.2). Regenerate under the approved name before release.",
  },
  {
    templateId: "challenge-to-decision-board",
    locale: "ar",
    source: "the-lab/flagship/challenge-to-decision-board-ar.pdf",
    storageKey: "the-lab/challenge-to-decision-board-ar.pdf",
    downloadName: "Linkgurus-Challenge-to-Decision-Board-AR.pdf",
    status: "available",
  },
  {
    templateId: "challenge-to-decision-board",
    locale: "en",
    source: "the-lab/flagship/challenge-to-decision-board-en.pdf",
    storageKey: "the-lab/challenge-to-decision-board-en.pdf",
    downloadName: "Linkgurus-Challenge-to-Decision-Board-EN.pdf",
    status: "available",
  },
  {
    templateId: "decision-delay-trace",
    locale: "ar",
    source: "organization-design/entry/decision-delay-trace-ar.pdf",
    storageKey: "organization-design/decision-delay-trace-ar.pdf",
    downloadName: "Linkgurus-Athar-Zaman-Alqarar-AR.pdf",
    status: "available",
  },
  {
    templateId: "decision-delay-trace",
    locale: "en",
    source: "organization-design/entry/decision-delay-trace-en.pdf",
    storageKey: "organization-design/decision-delay-trace-en.pdf",
    downloadName: "Linkgurus-Decision-Delay-Trace-EN.pdf",
    status: "available",
  },
  {
    templateId: "value-collision-map",
    locale: "ar",
    source: "operating-model/entry/value-collision-map-ar.pdf",
    storageKey: "operating-model/value-collision-map-ar.pdf",
    downloadName: "Linkgurus-Kharitat-Alqima-AR.pdf",
    status: "available",
  },
  {
    templateId: "value-collision-map",
    locale: "en",
    source: "operating-model/entry/value-collision-map-en.pdf",
    storageKey: "operating-model/value-collision-map-en.pdf",
    downloadName: "Linkgurus-Value-Collision-Map-EN.pdf",
    status: "available",
  },
  {
    // Arabic-only, published on explicit founder approval (spec 7.1).
    templateId: "agent-to-owner-blueprint",
    locale: "ar",
    source: "operating-model/flagship/agent-to-owner-blueprint-ar.pdf",
    storageKey: "operating-model/agent-to-owner-blueprint-ar.pdf",
    downloadName: "Linkgurus-Agent-to-Owner-Blueprint-AR.pdf",
    status: "available",
  },
  {
    templateId: "decision-to-hold-map",
    locale: "ar",
    source: "master/decision-to-hold-map.pdf",
    storageKey: "master/decision-to-hold-map.pdf",
    downloadName: "Linkgurus-Decision-to-Hold-Map.pdf",
    status: "held",
    heldReason:
      "Whether this map is a public lead magnet or an internal portfolio artifact is undecided (spec 7.1).",
  },
];

export function findTemplateFile(templateId: TemplateId, locale: Locale) {
  return TEMPLATE_FILES.find((f) => f.templateId === templateId && f.locale === locale);
}
