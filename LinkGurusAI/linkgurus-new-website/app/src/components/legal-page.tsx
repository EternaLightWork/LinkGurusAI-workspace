import { HeroStatement } from "./blocks";
import { Heading, Section, SectionLabel } from "./primitives";
import { OpenDecision } from "./status";
import type { Locale } from "@/lib/i18n";

export type LegalSection = { heading: string; body: string[] };

/**
 * Shared shell for Privacy, Terms and Accessibility. Each of these pages is
 * `[OPEN]` pending legal review or QA (spec 5.19), so the shell renders the
 * gate first and labels the descriptive body as a prototype draft rather than
 * publishing unreviewed legal text as final.
 */
export function LegalPage({
  locale,
  title,
  lede,
  gateNote,
  sections,
}: {
  locale: Locale;
  title: string;
  lede: string;
  gateNote: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <HeroStatement locale={locale} title={title} lede={lede} />
      <Section id="gate">
        <div className="max-w-[62ch]">
          <OpenDecision locale={locale}>{gateNote}</OpenDecision>
        </div>
      </Section>
      <Section id="draft" tone="quiet">
        <SectionLabel>{locale === "ar" ? "مسودة وصفية" : "Descriptive draft"}</SectionLabel>
        <div className="max-w-[68ch] space-y-10">
          {sections.map((section, i) => (
            <div key={section.heading}>
              <Heading level={2} id={`section-${i + 1}`} className="text-xl">
                {section.heading}
              </Heading>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-neutral-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
