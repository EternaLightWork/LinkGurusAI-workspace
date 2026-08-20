import type { SiteContent } from "./types";

/**
 * English is an institutional counterpart, independently drafted (spec 6.1).
 * It performs the same task as the Arabic page and preserves the same offer
 * boundary, status and proof condition — it is not a sentence-level
 * translation of `ar.ts`, and must not be regenerated from it.
 */
export const en: SiteContent = {
  locale: "en",

  meta: {
    siteName: "Linkgurus",
    corporateLine: "Who decides, and what holds.", // APPROVED
    corporateLineTranslation: "«مَن يقرر… وماذا يبقى»",
    categoryDescriptor:
      "Challenge framing, organization design, and human–AI agent operating models.",
    masterPromise:
      "Frame the AI challenge worth solving. Redesign the organization around it. Put the new way of working into operation.", // APPROVED
    pointOfView:
      "The AI tool is not the transformation. The organization that can use it, govern it, and turn it into value is.", // APPROVED
    campaignLine:
      "From the AI challenge worth funding to the operating model that makes it work.", // APPROVED
    t7Promise:
      "Organization design is not complete until it is applied and change is managed.", // APPROVED
  },

  nav: {
    primary: [
      { label: "When to involve us", href: "/when-to-involve-us/" },
      { label: "Practices", href: "/practices/" },
      { label: "Approach & proof", href: "/approach-and-proof/" },
      { label: "Insights", href: "/insights/" },
      { label: "About", href: "/about/" },
    ],
    cta: "Request a call",
    toggleLabel: "العربية",
    menuLabel: "Open menu",
    closeLabel: "Close menu",
    skipToContent: "Skip to content",
  },

  footer: {
    columns: [
      {
        title: "When to involve us",
        items: [
          { label: "An AI investment decision", href: "/when-to-involve-us/ai-investment-decision/" },
          { label: "The investment went live, the work did not change", href: "/when-to-involve-us/investment-went-live-work-did-not-change/" },
          { label: "Growth made authority unclear", href: "/when-to-involve-us/growth-made-authority-unclear/" },
          { label: "AI agents without clear accountability", href: "/when-to-involve-us/ai-agents-without-clear-accountability/" },
          { label: "An approved design is not enacted", href: "/when-to-involve-us/approved-design-not-enacted/" },
        ],
      },
      {
        title: "Practices",
        items: [
          { label: "The Lab", href: "/practices/the-lab/" },
          { label: "Organization Design", href: "/practices/organization-design/" },
          { label: "The Operating Model", href: "/practices/operating-model/" },
        ],
      },
      {
        title: "Templates & insights",
        items: [
          { label: "Templates", href: "/templates/" },
          { label: "Insights", href: "/insights/" },
          { label: "Authority & organization design", href: "/insights/authority-and-organization-design/" },
          { label: "AI investment decisions", href: "/insights/ai-investment-decisions/" },
        ],
      },
      {
        title: "Approach & proof",
        items: [
          { label: "Approach & proof", href: "/approach-and-proof/" },
          { label: "How we work", href: "/approach-and-proof/how-we-work/" },
          { label: "What counts as proof", href: "/approach-and-proof/what-counts-as-proof/" },
          { label: "Founder experience", href: "/approach-and-proof/founder-experience/" },
          { label: "About Linkgurus", href: "/about/" },
        ],
      },
      {
        title: "Contact",
        items: [
          { label: "Request a call", href: "/request-a-call/" },
          { label: "Briefings", href: "/briefings/" },
          { label: "Privacy", href: "/privacy/" },
          { label: "Terms", href: "/terms/" },
          { label: "Accessibility", href: "/accessibility/" },
        ],
      },
    ],
    legalPending:
      "Legal entity, registration jurisdiction and business address are not yet verified and will not be published until they are.",
    copyright: (year) => `© ${year} Linkgurus. All rights reserved.`,
  },

  ui: {
    availabilityLegend: "Availability",
    "availability.available-now": "Available now",
    "availability.paid-beta": "Paid beta",
    "availability.proof-gated": "Proof-gated",
    "availability.scale-gated": "Scale-gated",
    "availability.point-of-view": "Published point of view",
    "evidence.fact": "Verified fact",
    "evidence.inference": "Inference",
    "evidence.hypothesis": "Hypothesis",
    "evidence.unknown": "Unknown",
    tierEntry: "Entry",
    tierFlagship: "Flagship",
    tierScale: "Scale",
    fit: "When it fits",
    scope: "Scope and output",
    exclusions: "What it excludes",
    completionCondition: "Completion condition",
    duration: "Duration",
    prerequisite: "Prerequisite",
    proofBoundary: "Proof boundary",
    relatedTriggers: "Related situations",
    relatedTemplate: "Related template",
    relatedOffer: "Related offer",
    readMore: "Read more",
    backToTriggers: "Back to situations",
    requestCall: "Request a call",
    requestCallContext: "Request a call about this situation",
    briefingsSecondary: "Or subscribe to the Briefings",
    templateGateTitle: "Get this template by email",
    templateGateNote:
      "We send the file to your email through a secure link that expires in 72 hours. Requesting a file is not marketing consent.",
    emailLabel: "Work email",
    firstNameLabel: "First name (optional)",
    organizationLabel: "Organization (optional)",
    roleLabel: "Role (optional)",
    privacyAck: "I agree to my details being processed to send the requested file.",
    briefingsOptIn: "I would also like to receive the Linkgurus Briefings.",
    submitTemplate: "Send me the template",
    submitting: "Sending…",
    prices: "Prices are not published. They are set in a written proposal after a fit call.",
    boundaryTitle: "Where our work stops",
    boundaryBody:
      "Linkgurus designs the organization around AI: challenge and value framing, roles, authority, workflows, human ownership, controls, change, adoption and business accountability. Technology architecture, build, integration, security, deployment and technical operations are owned by the client's IT function or technology partner.",
    openLabel: "Decision required",
    draftLabel: "Draft — pending editorial review",
    proofGatedLabel: "Proof-gated",
    noticeTitle: "Note",
    formatLabel: "Format",
    sizeLabel: "Size",
    languageLabel: "Language",
    versionLabel: "Version",
    provenanceLabel: "Provenance",
    errorSummaryTitle: "The form could not be submitted",
    requiredField: "This field is required.",
    invalidEmail: "Enter a valid email address.",
    genericError: "We could not complete the request right now. Please try again shortly.",
    pageNotFoundTitle: "Page not found",
    pageNotFoundBody: "That address is not available. These are the nearest useful routes.",
    counterpartUnavailable:
      "There is no independently written Arabic counterpart for this page yet. We do not substitute machine translation for it.",
    templateArabicOnly:
      "This template exists in Arabic only. The English edition is written independently and has not been released.",
  },

  practices: [
    {
      id: "the-lab",
      slug: "the-lab",
      name: "The Lab",
      altName: "المختبر",
      line: "A decision, not a report.", // APPROVED
      lineTranslation: "«قرارٌ… لا تقرير»",
      role: "Makes one consequential challenge explicit, then decides what is worth funding, what stops, who decides, and what evidence reopens the decision.",
      buyer: "CEO, Chief Strategy Officer, transformation lead, CFO.",
      purpose:
        "When competing AI bets reach the leadership table without a decision that survives the board, the work starts by framing the challenge — not by ranking tools.",
      triggers: ["ai-investment-decision"],
      topics: ["ai-investment-decisions"],
      offers: [
        {
          id: "decision-council",
          anchor: "decision-council",
          tier: "entry",
          name: "Challenge Framing Council",
          altName: "مجلس القرار",
          availability: "paid-beta",
          fit: "Leadership is holding several AI or transformation bets and has no Now / Later / No decision it can defend to a board.",
          scope: [
            "One real challenge framed in the language of the business result, not the tool.",
            "A written decision record: what is funded, what stops, and in what order.",
            "The evidence gaps that keep the decision open.",
            "The named authority and the named owner of the result.",
            "The completion condition attached to the decision.",
          ],
          exclusions: [
            "Workflow redesign.",
            "Prototyping or technology selection.",
            "Capability transfer to the client team.",
          ],
          completionCondition:
            "Complete when a signed decision record exists with a named authority and a stated condition for reopening the decision.",
          duration: "One working day, plus pre-work.",
          templateId: "decision-in-view",
        },
        {
          id: "decision-lab",
          anchor: "decision-lab",
          tier: "flagship",
          name: "The Decision Lab",
          altName: "مختبر القرار",
          availability: "proof-gated",
          fit: "One consequential challenge exists, standalone decision work has already been purchased, and the owners of the work are genuinely available across consecutive days.",
          scope: [
            "Problem framing (1 day).",
            "Workflow sprint (2–4 days).",
            "Design sprint (2 days).",
            "A Stop / Keep / Scale decision with its completion-condition record.",
          ],
          exclusions: [
            "Technical build, integration or deployment.",
            "Security assurance or legal opinion.",
          ],
          completionCondition:
            "Complete when a Stop / Keep / Scale decision is issued under a named authority — not when a report is delivered.",
          duration: "5–7 working days.",
          templateId: "challenge-to-decision-board",
        },
        {
          id: "your-lab",
          anchor: "your-lab",
          tier: "scale",
          name: "Your Lab",
          altName: "مختبركم",
          availability: "scale-gated",
          fit: "After a delivered Decision Lab, when the organization wants its own team to run this work.",
          scope: [
            "A five-day bilingual employee program.",
            "Two supervised Labs: the first co-led, the second client-led and observed.",
            "Artifacts calibrated after each Lab.",
          ],
          exclusions: [
            "An externally accredited professional certification.",
            "Open-enrolment or consumer training.",
          ],
          completionCondition:
            "Qualification is granted only if both Labs meet the stated standard. Further supervision is scoped separately.",
          duration: "5-day program plus two supervised Labs.",
          prerequisite: { label: "The Decision Lab", anchor: "decision-lab" },
        },
      ],
    },
    {
      id: "organization-design",
      slug: "organization-design",
      name: "Organization Design",
      altName: "البنية والتصميم المؤسسي",
      line: "Work is delegated without delegating authority.", // APPROVED
      lineTranslation: "«تفويض العمل دون إرساء النموذج المؤسسي»",
      role: "Redesigns authority, roles, job architecture, decisions and change so the strategy can actually operate.",
      buyer: "Founder, CEO, board, CHRO as sponsor.",
      purpose:
        "When decisions return upward, wait, or cross functions without a holder, the condition is an authority structure — not a people problem.",
      triggers: ["growth-made-authority-unclear", "approved-design-not-enacted"],
      topics: ["authority-and-organization-design"],
      offers: [
        {
          id: "authority-map",
          anchor: "authority-map",
          tier: "entry",
          name: "Where Decisions Stop",
          altName: "خارطة الصلاحيات",
          availability: "available-now",
          fit: "The organization has grown, material decisions stall or return to one person, and nobody can say where authority actually sits.",
          scope: [
            "Trace 2–3 real material decisions from request to resolution.",
            "Baseline decision latency and handoff count.",
            "The formal authority holder against the actual one.",
            "The missing thresholds that keep decisions travelling upward.",
          ],
          exclusions: [
            "Salary scale or total-rewards design.",
            "Individual performance assessment or exit recommendations.",
          ],
          completionCondition:
            "Complete when a measured baseline exists alongside proposed authority thresholds with named holders.",
          duration: "One week.",
          templateId: "decision-delay-trace",
        },
        {
          id: "the-install",
          anchor: "the-install",
          tier: "flagship",
          name: "The Install",
          altName: "إرساء النموذج المؤسسي",
          availability: "proof-gated",
          fit: "The organization needs new job architecture, roles and decision rights — and needs them enacted in the work, not approved on paper.",
          scope: [
            "Job architecture, spans and layers.",
            "Role definitions, decision rights and authority thresholds.",
            "An enactment register.",
            "An operating evidence pack.",
          ],
          exclusions: [
            "Total-rewards or salary-scale design.",
            "Building, integrating, securing or operating systems.",
          ],
          completionCondition:
            "Complete when at least two material authority thresholds have moved, are used in live decisions, and are observed against the baseline.",
          duration: "10–14 weeks.",
        },
        {
          id: "standing-review",
          anchor: "standing-review",
          tier: "scale",
          name: "Standing Review",
          altName: "فحص الصلاحيات الدوري",
          availability: "scale-gated",
          fit: "After The Install and a completed first hold check.",
          scope: [
            "Review authority drift against the installed baseline.",
            "Issue corrections with named owners.",
          ],
          exclusions: ["A new full redesign inside the review cycle."],
          completionCondition:
            "A cycle is complete when drift is recorded and each correction is assigned to a named owner.",
          duration: "Semiannual cycle.",
          prerequisite: { label: "The Install", anchor: "the-install" },
        },
      ],
    },
    {
      id: "operating-model",
      slug: "operating-model",
      name: "The Operating Model",
      altName: "نموذج التشغيل الذكي",
      line: "Every result has an owner by name.", // APPROVED
      lineTranslation: "«لكل نتيجة… مسؤولٌ بالاسم»",
      role: "Puts AI into real work: the workflow, the authority boundary, the named human owner, the controls, escalation, adoption and business accountability.",
      buyer: "COO, transformation lead, CEO; CHRO, CIO and risk as influencers.",
      purpose:
        "An investment can go live without roles, handoffs or measures moving. The value stays on hold until the organization changes around the tool.",
      triggers: [
        "investment-went-live-work-did-not-change",
        "ai-agents-without-clear-accountability",
      ],
      topics: ["adoption-and-value-realization", "ai-agents-and-accountability"],
      offers: [
        {
          id: "value-on-hold",
          anchor: "value-on-hold",
          tier: "entry",
          name: "Value on Hold",
          altName: "القيمة المعلّقة",
          availability: "available-now",
          fit: "A digital or AI investment is live, the intended result has not moved, and nobody wants to call the initiative a failure.",
          scope: [
            "The live workflow and the result it was meant to produce.",
            "A map of where the new way of working collides with the actual organization.",
            "An agreed value proxy and its baseline.",
            "The smallest organizational change that releases value.",
          ],
          exclusions: [
            "System changes, integration work or data migration.",
            "Judging the technology product or the vendor.",
          ],
          completionCondition:
            "Complete when a value proxy and baseline are agreed and the required organizational change is assigned to a named owner.",
          duration: "Two weeks.",
          templateId: "value-collision-map",
        },
        {
          id: "ai-operating-model",
          anchor: "ai-operating-model",
          tier: "flagship",
          name: "AI Operating Model",
          altName: "نموذج تشغيل وكلاء الذكاء الاصطناعي",
          availability: "proof-gated",
          fit: "AI agents are entering the work and the organization needs a model that says who owns the result and where the authority boundary sits.",
          scope: [
            "An inventory of agents and the decisions they touch.",
            "Roles redesigned around the new work.",
            "A named human owner for every result.",
            "Authority boundaries, control points and escalation paths.",
            "A function-by-function entry sequence.",
          ],
          exclusions: [
            "Building, training, integrating or deploying agents.",
            "Security assurance, legal opinion or regulatory audit.",
          ],
          completionCondition:
            "Complete when the model operates on real agents, with named owners and controls that are actually used.",
          duration: "12–16 weeks.",
          templateId: "agent-to-owner-blueprint",
        },
        {
          id: "accountability-review",
          anchor: "accountability-review",
          tier: "scale",
          name: "Accountability Review",
          altName: "سجل المسؤولية",
          availability: "scale-gated",
          fit: "After an installed agent estate and a versioned baseline.",
          scope: [
            "Re-baseline agents and results.",
            "Review owners, permissions and controls.",
            "Accountability evidence for results.",
          ],
          exclusions: ["Independent technical, security or regulatory audit."],
          completionCondition:
            "A cycle is complete when a new versioned baseline exists with named owners and evidence of live use.",
          duration: "Quarterly cycle.",
          prerequisite: { label: "AI Operating Model", anchor: "ai-operating-model" },
        },
      ],
    },
  ],

  triggers: [
    {
      id: "ai-investment-decision",
      slug: "ai-investment-decision",
      title: "An AI investment decision",
      cardLine: "Several AI bets are on the table and no decision survives the board.",
      buyer: "CEO, Chief Strategy Officer, transformation lead, CFO.",
      situation: [
        "Several AI proposals have reached leadership from different parts of the business, each reasonable on its own.",
        "The budget is finite, and the comparison is being made on tools and vendors rather than on results.",
        "The decision keeps moving because nobody holds a basis they can defend.",
      ],
      signals: [
        "More than one AI initiative is live at once with no stated order.",
        "No written condition stops an initiative or reopens it.",
        "The debate is about technical capability rather than the business result.",
        "No single name holds the final decision in writing.",
      ],
      atRisk: [
        "Spend spread across parallel bets, none of which reaches value.",
        "Leadership credibility at the next funding round.",
        "A technical path locked in that is expensive to reverse.",
      ],
      weEstablish: [
        "One challenge framed in the language of the business result.",
        "A decision record: what is funded now, what waits, what stops.",
        "The evidence gaps that keep the decision open.",
        "The named authority and the condition that reopens the decision.",
      ],
      weDoNot: [
        "We do not select a vendor, platform or model.",
        "We do not build prototypes or perform integration.",
        "We do not give a security or legal opinion.",
      ],
      templateId: "decision-in-view",
      practiceId: "the-lab",
      offerAnchor: "decision-council",
      availability: "paid-beta",
      proofBoundary: {
        state: "inference",
        note: "External research documents waste in digital investment portfolios. Linkgurus has no published case for standalone decision work yet.",
      },
    },
    {
      id: "investment-went-live-work-did-not-change",
      slug: "investment-went-live-work-did-not-change",
      title: "The investment went live; the work did not change",
      cardLine: "The technology runs, but roles, handoffs and measures stayed where they were.",
      buyer: "COO, transformation director, CFO, CHRO, CIO.",
      situation: [
        "The project was delivered, the system runs, and usage is recorded.",
        "The result the investment was justified on has not moved in the numbers.",
        "Nobody wants to call the initiative a failure — and that description is not required.",
      ],
      signals: [
        "Roles and job descriptions did not change when the system went live.",
        "A manual parallel workflow continues alongside the new system.",
        "No measure or management report was updated to reflect the new way of working.",
        "There is no agreed value proxy to measure the effect against.",
      ],
      atRisk: [
        "Value already paid for stays on hold indefinitely.",
        "An initiative scales without effect, because stopping was never designed.",
        "Funders lose confidence in the next wave of investment.",
      ],
      weEstablish: [
        "A map of where the new way of working collides with the actual organization.",
        "An agreed value proxy and a measured baseline.",
        "The smallest change to roles, handoffs and authority that releases value.",
      ],
      weDoNot: [
        "We do not change the system, fix the integration or migrate data.",
        "We do not issue a verdict on the vendor or the product quality.",
      ],
      templateId: "value-collision-map",
      practiceId: "operating-model",
      offerAnchor: "value-on-hold",
      availability: "available-now",
      proofBoundary: {
        state: "inference",
        note: "The value-on-hold pattern is documented in published research. Linkgurus's own first Value on Hold case is not yet published.",
      },
    },
    {
      id: "growth-made-authority-unclear",
      slug: "growth-made-authority-unclear",
      title: "Growth made authority unclear",
      cardLine: "Decisions return upward, wait, or cross functions without a holder.",
      buyer: "Founder, CEO, board, CHRO.",
      situation: [
        "The organization grew faster than its structure, and the formal chart no longer describes how decisions are actually made.",
        "Day-to-day operating decisions still arrive at the founder or CEO.",
        "The condition is a set of missing authority thresholds, not a person creating a bottleneck.",
      ],
      signals: [
        "Repeated decisions travel upward with no stated reason.",
        "A single material decision passes through more than three handoffs before resolution.",
        "The formal authority holder differs from the actual one.",
        "No written value or impact threshold permits the decision at a lower level.",
      ],
      atRisk: [
        "Decisions slow further with every increment of growth.",
        "Senior people leave because real authority is never transferred.",
        "The strategy stalls because executing it needs a decision nobody owns.",
      ],
      weEstablish: [
        "A trace of 2–3 real material decisions and a baseline for their latency.",
        "The gap between formal and actual authority.",
        "The missing thresholds and who should hold them by name.",
      ],
      weDoNot: [
        "We do not design salary scales or total rewards.",
        "We do not assess individual performance or recommend exits.",
      ],
      templateId: "decision-delay-trace",
      practiceId: "organization-design",
      offerAnchor: "authority-map",
      availability: "available-now",
      proofBoundary: {
        state: "inference",
        note: "The founder's operating history is not a Linkgurus case. A permissioned authority case is still required.",
      },
    },
    {
      id: "ai-agents-without-clear-accountability",
      slug: "ai-agents-without-clear-accountability",
      title: "AI agents without clear accountability",
      cardLine: "Agent output exists; the owner of its result is not named.",
      buyer: "COO, CHRO, CIO, risk.",
      situation: [
        "AI agents have started producing decisions or output inside real work.",
        "No record states who owns each agent's result, where its boundary sits, or when a human takes over.",
        "The exposure shows up first in accountability, not in the technology.",
      ],
      signals: [
        "No stated inventory of operating agents and the decisions they touch.",
        "No named human owner for each result an agent produces.",
        "No written rule for escalation or manual override.",
        "No trail that can explain a decision an agent issued.",
      ],
      atRisk: [
        "A business result with no owner at the moment it is questioned.",
        "Agents scaling faster than the organization can govern them.",
        "Organizational exposure that surfaces late, in a review or audit.",
      ],
      weEstablish: [
        "A published point of view on agent inventory, owner, boundary, escalation and trail.",
        "A route for any live collision to the nearest evidenced entry offer: Value on Hold.",
      ],
      weDoNot: [
        "We do not build, train, integrate or deploy agents.",
        "We do not provide security assurance, regulatory audit or legal opinion.",
      ],
      templateId: "agent-to-owner-blueprint",
      practiceId: "operating-model",
      offerAnchor: "value-on-hold",
      availability: "point-of-view",
      proofBoundary: {
        state: "hypothesis",
        note: "Linkgurus has no completed agentic delivery. This position is published as a point of view and the flagship remains proof-gated.",
      },
    },
    {
      id: "approved-design-not-enacted",
      slug: "approved-design-not-enacted",
      title: "An approved design is not enacted",
      cardLine: "The design was approved, and it never appeared in roles, authority or measures.",
      buyer: "CEO, board, an implementation-burned buyer.",
      situation: [
        "A structure or operating model was formally approved.",
        "Months later, the work still runs the way it ran before.",
        "Nobody objects to the design, and nobody works to it.",
      ],
      signals: [
        "The new roles exist in the document and not in daily tasks.",
        "Decision rights did not change when the new structure was approved.",
        "No management measure was updated to reflect the approved design.",
        "No register shows what was enacted and what was not.",
      ],
      atRisk: [
        "Organizational capital spent on a design that does not operate.",
        "Confidence lost in any subsequent wave of change.",
        "The original problem persisting under a new name.",
      ],
      weEstablish: [
        "The proof standard we measure completion against, before any commitment.",
        "The difference between an approved design and one operating in live decisions.",
        "Qualification into the right practice, after reading the proof standard.",
      ],
      weDoNot: [
        "We do not position ourselves as the firm that fixes other consultants' work.",
        "We do not promise a result before a baseline is measured.",
      ],
      templateId: "decision-to-hold-map",
      practiceId: "organization-design",
      offerAnchor: "the-install",
      availability: "proof-gated",
      proofBoundary: {
        state: "unknown",
        note: "No Linkgurus case yet demonstrates enactment and hold. Read this page together with the proof standard before any commitment.",
      },
    },
  ],

  templates: [
    {
      id: "decision-in-view",
      slug: "decision-in-view",
      name: "Decision in View",
      altName: "ورقة الحسم",
      situation:
        "When AI proposals compete for leadership attention and there is no single basis to compare them.",
      youComplete: [
        "The challenge in the language of the business result, not the tool.",
        "What is funded now, what waits, and what stops.",
        "The missing evidence that keeps the decision open.",
        "The named authority and the condition that reopens the decision.",
      ],
      itDoesNotProve: [
        "It does not assess organizational AI readiness.",
        "It does not select a vendor or compare platforms.",
        "It does not replace a measured baseline.",
      ],
      version: "v3",
      provenance:
        "An internal instrument from the Challenge Framing Council, published in a standalone form.",
      triggerId: "ai-investment-decision",
      practiceId: "the-lab",
      offerAnchor: "decision-council",
      fileAvailable: false,
      releaseBlocked:
        "The English PDF still carries an incorrect title and metadata from an earlier naming round. It is held back until the file is regenerated under the approved name.",
    },
    {
      id: "decision-delay-trace",
      slug: "decision-delay-trace",
      name: "Decision Delay Trace",
      altName: "أثر زمن القرار",
      situation:
        "When material decisions are late or return upward, and the structural cause is not visible.",
      youComplete: [
        "One material decision traced from request to resolution.",
        "Every handoff, who holds it, and how long it waited.",
        "The formal authority holder against the actual one.",
        "The missing threshold that would have resolved it at a lower level.",
      ],
      itDoesNotProve: [
        "It does not measure individual performance.",
        "It does not prove the structure alone is wrong.",
        "It does not replace tracing more than one decision.",
      ],
      version: "Simplified edition",
      provenance:
        "The simplified edition of the Where Decisions Stop instrument. A detailed Arabic edition is used inside delivery.",
      triggerId: "growth-made-authority-unclear",
      practiceId: "organization-design",
      offerAnchor: "authority-map",
      fileAvailable: true,
    },
    {
      id: "value-collision-map",
      slug: "value-collision-map",
      name: "The Value Collision Map",
      altName: "خارطة أين تعلّقت القيمة",
      situation:
        "When an investment is live, the result has not moved, and you need to see where the new way of working collided with the organization.",
      youComplete: [
        "The live workflow and the result it was meant to produce.",
        "The collision points between the new method and existing roles.",
        "The value proxy and its baseline.",
        "The smallest organizational change that releases value.",
      ],
      itDoesNotProve: [
        "It does not assess system or vendor quality.",
        "It does not establish return on investment.",
        "It does not replace an agreed measured baseline.",
      ],
      version: "v1",
      provenance: "The entry instrument of The Operating Model practice.",
      triggerId: "investment-went-live-work-did-not-change",
      practiceId: "operating-model",
      offerAnchor: "value-on-hold",
      fileAvailable: true,
    },
    {
      id: "challenge-to-decision-board",
      slug: "challenge-to-decision-board",
      name: "Challenge-to-Decision Board",
      altName: "لوحة من التحدي إلى الحسم",
      situation:
        "When one challenge moves from framing through redesigned work to a Stop / Keep / Scale decision.",
      youComplete: [
        "The framed challenge and where its value comes from.",
        "The work redesigned around it.",
        "What was tested and what was not.",
        "A Stop / Keep / Scale decision with a named owner.",
      ],
      itDoesNotProve: [
        "It does not replace a real workflow sprint.",
        "It does not establish technical feasibility.",
      ],
      version: "v1",
      provenance: "The flagship instrument of The Decision Lab.",
      triggerId: "ai-investment-decision",
      practiceId: "the-lab",
      offerAnchor: "decision-lab",
      fileAvailable: true,
    },
    {
      id: "agent-to-owner-blueprint",
      slug: "agent-to-owner-blueprint",
      name: "Agent-to-Owner Blueprint",
      altName: "مخطط نتيجة الوكيل ومسؤولها",
      situation:
        "When an AI agent produces output inside real work with no named human owner of the result.",
      youComplete: [
        "An inventory of agents and the decisions they touch.",
        "The named human owner of each result.",
        "The authority boundary and control point.",
        "The escalation and override rule, and the reference trail.",
      ],
      itDoesNotProve: [
        "It is not a regulatory audit or a security assurance.",
        "It does not assess the agent's technical model.",
        "It does not establish compliance with any regulatory framework.",
      ],
      version: "v1",
      provenance: "The flagship instrument of the AI Operating Model.",
      triggerId: "ai-agents-without-clear-accountability",
      practiceId: "operating-model",
      offerAnchor: "ai-operating-model",
      fileAvailable: false,
      unavailableReason:
        "The Agent-to-Owner Blueprint exists in Arabic only. The English edition is written independently and has not been released.",
    },
    {
      id: "decision-to-hold-map",
      slug: "decision-to-hold-map",
      name: "Decision-to-Hold Map",
      altName: "خارطة «مَن يقرر… وماذا يبقى»",
      situation:
        "When you want to read the whole portfolio: who decides at each point, and what remains after the work ends.",
      youComplete: [
        "The decision point in each practice.",
        "What must remain after delivery.",
        "The completion condition attached to each point.",
      ],
      itDoesNotProve: ["It does not replace any single-situation entry instrument."],
      version: "v1",
      provenance: "The master portfolio map.",
      triggerId: "approved-design-not-enacted",
      practiceId: "organization-design",
      offerAnchor: "the-install",
      fileAvailable: false,
      releaseBlocked:
        "Whether this map is a public instrument or an internal portfolio document has not been decided. It is not offered for download until that decision is made.",
    },
  ],

  method: [
    {
      id: "awaken",
      index: 1,
      name: "Awaken",
      altName: "الكشف",
      line: "Establish where the work stops.",
      body: "Set the mandate, the intended result, the scope and the decision authority before any analysis begins.",
    },
    {
      id: "assess",
      index: 2,
      name: "Assess",
      altName: "خط الأساس",
      line: "Fix the baseline.",
      body: "Measure roles, authority, workflow, information, measures and change readiness as they actually are.",
    },
    {
      id: "ai-fit",
      index: 3,
      name: "AI Fit",
      altName: "ملاءمة الذكاء",
      line: "Does AI enter now?",
      body: "Now, Later or No — based on the result, the workflow, the value, data and access viability, the human owner, boundary control and change capacity. Always the third stage.",
    },
    {
      id: "anchor",
      index: 4,
      name: "Anchor",
      altName: "التثبيت",
      line: "Fix who decides and what changes.",
      body: "Set target roles, authority, operating principles, measures and escalation.",
    },
    {
      id: "align",
      index: 5,
      name: "Align",
      altName: "الإدخال",
      line: "Put the design into the work.",
      body: "Enact roles, authority, controls, capability, communications and change management in live operation.",
    },
    {
      id: "ascend",
      index: 6,
      name: "Ascend",
      altName: "الثبات",
      line: "Hold what was designed.",
      body: "Live use, then stabilization, then correction, then a versioned baseline, then review.",
    },
  ],

  topics: [
    {
      id: "authority-and-organization-design",
      slug: "authority-and-organization-design",
      title: "Authority & organization design",
      summary:
        "Decision latency, founder bottlenecks, authority thresholds, enactment, and drift after the design lands.",
      evidenceNote:
        "Frameworks and worked examples are published as method, not as client cases, until a permissioned case exists.",
      triggerId: "growth-made-authority-unclear",
      templateId: "decision-delay-trace",
    },
    {
      id: "ai-investment-decisions",
      slug: "ai-investment-decisions",
      title: "AI investment decisions",
      summary:
        "How a Now / Later / No decision on competing AI bets is made on a basis that can be defended.",
      evidenceNote:
        "External research supports portfolio waste. Standalone demand for Linkgurus decision work is not yet validated.",
      triggerId: "ai-investment-decision",
      templateId: "decision-in-view",
    },
    {
      id: "adoption-and-value-realization",
      slug: "adoption-and-value-realization",
      title: "Adoption & value realization",
      summary:
        "Why value stays on hold when roles, workflows and authority do not change around the investment.",
      evidenceNote:
        "The pattern is documented in external research. Linkgurus's own first Value on Hold case is not yet published.",
      triggerId: "investment-went-live-work-did-not-change",
      templateId: "value-collision-map",
    },
    {
      id: "ai-agents-and-accountability",
      slug: "ai-agents-and-accountability",
      title: "AI agents & accountability",
      summary:
        "Agent inventory, the named owner, the authority boundary, override and escalation, and the reference trail.",
      evidenceNote:
        "External principles and a published point of view only. Linkgurus has no completed agentic delivery.",
      triggerId: "ai-agents-without-clear-accountability",
      templateId: "agent-to-owner-blueprint",
    },
  ],
};
