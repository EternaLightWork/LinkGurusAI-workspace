# Linkgurus — Information Architecture & Content Plan

## 0. Reference & methodology analysis

Both requested sites were inspected directly on 16 August 2026. The Design Sprint Academy findings are deliberately critical and concern navigation, flow, and conversion—not the visual polish already assessed in Phase 11.

| Source | Finding | Implication for Linkgurus's sitemap |
|---|---|---|
| [Design Sprint Academy — home](https://www.designsprint.academy/) | The top navigation is not excessive by count, but it is conceptually mixed: `AI Lab`, `Services`, `Toolkits`, `Blog`, `Book a call`, and a persistent cart combine enterprise consulting, corporate training, individual toolkits, editorial content, booking, and commerce. | Keep one commercial model in the primary journey: professional-services enquiry. No cart, tickets, toolkit shop, public-cohort promotion, or e-commerce chrome. Lead capture and one request-call flow are the only transactions. |
| [Design Sprint Academy — home](https://www.designsprint.academy/) | One offer, `AI Lab`, is elevated into the top navigation while sibling offers sit under `Services`. The hierarchy does not explain why that offer deserves privileged status. | The Linkgurus top level contains the three peer practices together. A lead flagship may be emphasized within content, but no single offer becomes a competing top-level category. |
| [Design Sprint Academy — services](https://www.designsprint.academy/services) | Services are organized first by provider category—AI Services versus Innovation & Product Services—and then by five method/product names. A visitor arriving with a symptom must diagnose which supplier category and method apply. | Add a trigger-led route before the practice route: “When to involve us.” Visitors self-select by what has happened—authority bottleneck, unrealized investment value, unresolved AI bets—not by knowing Linkgurus terminology. |
| [Design Sprint Academy — AI Problem Framing](https://www.designsprint.academy/ai-problem-framing) | One offer page contains three different purchases: expert facilitation, internal corporate training, and a public Berlin cohort. These modes have different buyers, budgets, proof needs, and CTAs. | Each Linkgurus practice page shows one ordered ladder—entry → flagship → scale—and explicitly says when each step applies. Scale offers are contextual follow-ons, not alternative cold purchases. |
| [Design Sprint Academy — AI Problem Framing](https://www.designsprint.academy/ai-problem-framing) | The offer page routes to several different Calendly destinations plus ticket purchase. The user must choose both the service and the booking mechanism. | Use one request-call route across the site. Preserve the referring trigger/practice/offer in the form, then show one calendar step after qualification. The buyer chooses a problem, not a booking system. |
| [Design Sprint Academy — home](https://www.designsprint.academy/) | “Request the training catalog” and “Request the facilitation guide” resolve to `#` in the inspected page state, while bottom “Book a call” goes to a contact page and the header “Book a call” goes to Calendly. The next step is inconsistent and, in two cases, non-functional. | Every CTA must have one defined destination and expected outcome. No dead anchors, faux downloads, or CTA label reused for different flows. Automated link and form checks become a launch acceptance criterion later. |
| [Design Sprint Academy — contact](https://www.designsprint.academy/contact) | The generic contact form asks for name, email, company, title, and an open message but loses the visitor's prior service context. | The Linkgurus request form carries source context automatically and asks only questions needed to route the conversation: trigger, role, organization, geography, and timing. Do not make the buyer restate the site path in a blank message. |
| [Design Sprint Academy — services](https://www.designsprint.academy/services) | Generic scale proof (“800+ teams,” “17 industries”) sits on the services page, while specific case studies appear elsewhere. The proof path is not attached to the offer decision at the point of doubt. | Attach the most relevant proof object directly to each trigger and practice page. If Linkgurus lacks that proof, state the gap internally and do not substitute unrelated logos or macro statistics. |
| [Design Sprint Academy — home](https://www.designsprint.academy/) | The homepage sequence repeatedly changes audience: enterprise facilitation/training → five services → founder story → public cohorts → case studies → articles → newsletter. Each block is individually clear; the total journey changes commercial altitude several times. | The Linkgurus homepage stays at CEO/board/COO/Transformation altitude. The personal Arabic OD course and practitioner audience remain outside the corporate sitemap per D1. Insights support the buyer journey rather than creating a separate consumer funnel. |
| [Creative Glue Lab case study](https://www.creativegluelab.com/work/design-sprint-academy-website-design-and-implementation) | Their process began with a scoping session to align goals and understand what had to evolve; the stated business task was clearer B2B service presentation and a clarified value proposition. | Borrow **Strategy & Scoping** as the first gate: fix buyer set, trigger set, practice/offer hierarchy, proof rules, availability rules, conversion events, bilingual governance, and exclusions before page creation. This document performs that gate. |
| [Creative Glue Lab case study](https://www.creativegluelab.com/work/design-sprint-academy-website-design-and-implementation) | Their next step was **Information Architecture**: restructure the site and simplify the way services are presented before visual work. | Borrow IA as a full content model, not merely a navigation list: page hierarchy, trigger-to-practice routes, offer ladders, proof objects, contextual cross-links, language counterparts, and conversion states are specified below. |
| [Creative Glue Lab case study](https://www.creativegluelab.com/work/design-sprint-academy-website-design-and-implementation) | **UI & Visual Direction** followed the strategic and structural decisions. | This phase hands the future design phase content priorities, status states, and page relationships only. It does not prescribe layout, components, or page-level visual treatment. The existing Linkgurus brand system governs those later decisions. |
| [Creative Glue Lab case study](https://www.creativegluelab.com/work/design-sprint-academy-website-design-and-implementation) | Their remaining deliverables were Webflow development, CMS/e-commerce setup, testing, launch, and support. | Explicitly out of scope here. Linkgurus is hand-coded, has no CMS or commerce, and should not inherit vendor/platform deliverables from the reference methodology. |

### What Linkgurus should deliberately do differently

1. Organize entry by buyer trigger, then practice, then offer—not by method name first.
2. Keep the three practices at one hierarchy level and the nine offers inside three visible ladders.
3. Make proof status and offer availability explicit; do not make a designed portfolio look like nine established products.
4. Use one context-preserving request-call flow and one optional lead-capture flow.
5. Keep practitioner training, public cohorts, toolkits, tickets, cart, and the personal Arabic OD course outside the corporate buyer journey.
6. Put relevant proof beside the decision it supports; never use macro research or unrelated founder experience as offer proof.
7. Give every article and LinkedIn landing page a next step tied to its trigger, not a generic “explore services” route.

### Method and status notes

**Prepared:** 16 August 2026  
**Scope:** Greenfield rebuild of `linkgurus.net`; information architecture and content strategy only. No visual layouts, wireframes, page copy, CMS, Webflow, e-commerce, or implementation specification.

**Evidence base read for this phase.** The full project strategy sequence, founder answers, service-portfolio decisions, Arabic messaging architecture, launch/evidence stress tests, design-system artifact, and the white-paper intake record covering all 28 supplied PDFs. The three final practices and all nine offers in Phase 8.2 were treated as binding inputs. Binary font, image, logo, and PDF assets were inventoried; their relevant conclusions come through the brand system and Phase 11 evidence intake rather than being treated as new strategic evidence.

**Evidence discipline.** External research can establish that a buyer problem exists. It does not prove that Linkgurus has solved it, that the proposed format is buyable, or that the proposed recurring model works. Proof gaps are marked **GAP** rather than filled with placeholder claims.

**Status convention used below.**

- **Available now** — a bounded first purchase the site may invite, subject to qualification.
- **Proof-gated** — visible as part of the portfolio and point of view, but not presented as equally established or universally available.
- **Scale-gated** — available only after the underlying entry/flagship work has created a baseline.
- **Publication-gated** — page should not be published until the named evidence exists; no empty case-study pages.

> **Founder approval required:** this visibility convention implements the stress-tested Phase 12 recommendation to preserve all nine offers without presenting all nine as equally evidenced or buyable. It is a limited interpretation of D7, not a change to the portfolio.

---

# 1. Site structure decision

## 1.1 Recommendation

**Build one bilingual site with two equivalent route trees, Arabic as the source language and default experience, and an EN/AR counterpart toggle on every equivalent page.**

This is not a thin Arabic site with an English brochure attached, and it is not two independently governed sites. It is one information architecture, one offer/status source, one proof ledger, and two deliberately localized page versions.

### Why this fits the chosen territory and buyers

1. **The target buyers are GCC decision-makers, not a language segment.** Phase 3's relevant buyers are CEOs, owners, boards, COOs, CHROs, strategy heads, and transformation directors in situations such as founder bottlenecks, stalled authority, unresolved AI investment choices, unrealized value after a major investment, and unclear accountability around agents. Arabic is delivery reality; Phase 8 directive D4 says it is not a positioning label.
2. **Arabic carries the strongest verbal system.** The corporate line and Pillars 2 and 3 do work the English cannot reproduce. Phase 10 requires contemporary business MSA as the written default and English to be derived, not to drive the Arabic.
3. **English still matters to the buying committee.** GCC boards, procurement teams, multinational executives, and cross-border stakeholders may review the firm in English even when the consequential conversation happens in Arabic. A thin English profile would weaken institutional credibility at exactly the point the buyer circulates the site internally.
4. **The three-practice territory is one system.** A single architecture protects the relationship among The Lab, Organization Design, and The Operating Model, with implementation/change management as the proof spine. Separate sites would drift into different portfolios and proof claims.
5. **The open G28 issue argues for controlled parity.** Boardroom-standard Arabic and English remains ambiguous in the record. One governed bilingual system makes that gap visible and reviewable; two independent sites would hide it until claims diverge.

## 1.2 Options considered

| Option | Benefit | Practical cost / risk | Decision |
|---|---|---|---|
| **One bilingual site, Arabic source/default, equivalent English routes** | One brand and portfolio; strongest Arabic system leads; English serves procurement and mixed-language committees; shared SEO authority and proof status. | Requires true RTL support, disciplined localization, and counterpart governance. Slightly more build effort than one-language hardcoding. | **Recommend.** |
| **Fully separate parallel sites** | Maximum autonomy per language and market. | Duplicates navigation, proof, offer status, analytics, legal pages, and maintenance; splits SEO authority; almost guarantees drift without a CMS/editorial team. | Reject for a founder-led, hand-coded firm. |
| **Arabic-primary site with only a thin English secondary profile** | Lowest bilingual content burden; aligns with Arabic-first positioning. | English reviewers cannot validate scope, method, exclusions, or evidence; makes the firm look local-content-led rather than institutionally bilingual; creates an inferior buyer path for multinational stakeholders. | Reject as the permanent architecture. A temporary holding page is acceptable only before the full site is ready. |

## 1.3 Route, RTL, and SEO implications

1. **URL model:** Arabic occupies the root (`/`, `/practices/...`); English equivalents live under `/en/...`. Every bilingual pair has a stable shared content ID. Do not create separate domains.
2. **Language toggle:** switches to the current page's counterpart, not the other-language homepage. If no counterpart exists, the toggle explains that instead of silently redirecting.
3. **Direction:** Arabic documents use `lang="ar" dir="rtl"`; English uses `lang="en" dir="ltr"`. Navigation order, breadcrumbs, directional icons, form progression, tables, and mixed-script strings must be direction-aware—not merely text-aligned.
4. **Design-system constraints carried forward:** use logical properties, Western digits inside Arabic business content, no Arabic letterspacing/italics, and the Arabic wordmark never alone above the fold; it travels with «مَن يقرر… وماذا يبقى» and the three category labels where the lockup appears.
5. **Search indexing:** self-referencing canonical URL per language; reciprocal `hreflang="ar"` and `hreflang="en"`; `x-default` points to the Arabic root experience. No automatic geo/IP redirect.
6. **Localized search intent:** Arabic titles, headings, and metadata are authored from the Phase 10 glossary and buyer vocabulary, not translated from English keywords. English and Arabic may emphasize different query language while remaining equivalent in decision purpose.
7. **Structured data:** Organization, Service, Article, BreadcrumbList, and Person where factually supportable. Do not emit Review, AggregateRating, client-count, or award schema without real evidence.
8. **Editorial parity:** all core buyer, practice, method, proof, About, request, and legal pages ship in both languages. An insight may launch in one language first; `hreflang` is added only when a substantively equivalent version exists.

## 1.4 Content maintenance without a CMS

**Recommend a structured-content hybrid, not fully hardcoded page copy.**

| Content type | Maintenance form | Why |
|---|---|---|
| Navigation, practice names, offer names, offer tier, availability, CTA target, and proof status | One structured data file (JSON, YAML, or typed data module) keyed by stable IDs | These facts repeat across home, trigger pages, practice pages, forms, and both languages. One source prevents contradictory names/statuses. |
| Page narratives, insight articles, founder story, method, and case studies | Markdown/MDX files in parallel `ar` and `en` folders with front matter | A future Claude Code session can edit prose without touching page components; version history remains readable. |
| Proof objects | A small proof ledger with fields for claim, evidence type, client permission, offer validated, date checked, languages, and publication status | Prevents macro research, employment history, testimonials, and offer proof from being conflated. Enables publication gates. |
| Reusable interface wording | Localized dictionary files | Keeps form labels, validation, language names, and status vocabulary consistent across RTL/LTR. |
| Layout and components | Code | Structure and behavior belong in the build, not inside editable content files. |

**Trade-off.** Fully hardcoded pages are marginally simpler for the first build but make every bilingual update a code edit and increase drift risk. Structured files add modest setup and validation work now, but materially reduce future maintenance cost, allow safer Claude Code edits, and make offer/proof status auditable. For this site, the status and evidence discipline justify the extra setup.

**Minimum validation later:** fail the build when a core page lacks a required counterpart, an offer has conflicting status, a CTA has no destination, or a published proof object lacks permission/evidence metadata.

---

# 2. Full sitemap

## 2.1 Primary navigation

The wordmark returns home; do not spend a nav item on “Home.” Recommended primary navigation in both languages:

1. **When to involve us** — trigger-led buyer entry.
2. **Practices** — the three-practice architecture, always shown together.
3. **Approach & proof** — method, evidence standard, founder credential, and cases when available.
4. **Insights** — organized by buyer problem, not by generic media type.
5. **About** — founder-anchored firm and explicit scope.
6. **Primary CTA: Request a call** — one flow only.
7. **EN / AR** — counterpart toggle, visually separate from the nav taxonomy.

## 2.2 Hierarchical sitemap

### A. Home

- `/` — Arabic home
- `/en/` — English counterpart

**Core sections:** corporate line and three-category lockup → buyer-trigger selector → one competence/three practices → T7 application-and-change proof standard → relevant evidence/founder credential → insight routes → request call.

### B. When to involve us — trigger-led path

- `/when-to-involve-us/` — trigger hub
  - `/when-to-involve-us/growth-made-authority-unclear/` — growth/founder bottleneck; decisions repeatedly return to one person
  - `/when-to-involve-us/ai-investment-decision/` — AI bets compete for funding; no stop/keep/scale decision
  - `/when-to-involve-us/investment-went-live-work-did-not-change/` — a large investment or new way of working launched; value remains unrealized
  - `/when-to-involve-us/ai-agents-without-clear-accountability/` — agents enter work without clear human ownership and decision boundaries
  - `/when-to-involve-us/approved-design-not-enacted/` — a structure/design was approved but not applied or did not hold

Each page routes to one recommended practice/entry offer and one relevant proof object. These are not five new services.

### C. Practices — provider architecture

- `/practices/` — one competence, three practices, status legend
  - `/practices/the-lab/` — **المختبر / The Lab**
    - `#decision-council` — **مجلس القرار / Challenge Framing Workshop** — Available now; paid test of standalone decision work
    - `#decision-lab` — **مختبر القرار / The Decision Lab** — Proof-gated flagship
    - `#your-lab` — **مختبركم / Your Lab** — Scale-gated; existing-client capability transfer and review
  - `/practices/organization-design/` — **البنية والتصميم المؤسسي / Restructuring & Org. Design**
    - `#authority-map` — **خارطة الصلاحيات / Where Decisions Stop** — Available now; flagship baseline
    - `#authority-delegation` — **إرساء النموذج المؤسسي / The Install** — First full flagship; qualification and proof-building path
    - `#periodic-authority-review` — **فحص الصلاحيات الدوري / Standing Review** — Scale-gated behind an installed baseline
  - `/practices/operating-model/` — **نموذج التشغيل الذكي / The Operating Model**
    - `#suspended-value` — **القيمة المعلّقة / Value on Hold** — Available now; bring forward per Phase 11/12 stress test
    - `#ai-agent-operating-model` — **نموذج تشغيل وكلاء الذكاء الاصطناعي / AI Operating Model** — Point of view now; proof-gated sale
    - `#accountability-register` — **سجل المسؤولية / Accountability Review** — Scale-gated behind an AI operating-model baseline

**IA decision:** offers remain anchored sections on practice pages for v1, not nine primary standalone pages. This lets every offer have a direct shareable URL while preserving the ladder and preventing the DSA-style “choose among products and buying modes” problem. A standalone offer page is created later only when search demand, proof depth, or campaign needs justify it.

### D. Approach & proof

- `/approach-and-proof/` — hub
  - `/approach-and-proof/how-we-work/` — baseline → decision/design → enactment/change → hold/review
  - `/approach-and-proof/what-counts-as-proof/` — T7 evidence standard; market-need evidence versus Linkgurus approach proof
  - `/approach-and-proof/founder-experience/` — verified founder credential story, employer experience bounded accurately
  - `/approach-and-proof/case-studies/` — **Publication-gated** index; publish only with real cases
    - `/approach-and-proof/case-studies/[case-slug]/` — case template: before → intervention → operating change → observed use → hold check → scope/limits

### E. Insights

- `/insights/` — hub
  - `/insights/authority-and-organization-design/`
  - `/insights/ai-investment-decisions/`
  - `/insights/adoption-and-value-realization/`
  - `/insights/ai-agents-and-accountability/`
  - `/insights/[article-slug]/` — article template

Each article belongs to one buyer trigger and has one contextual next step. “Blog” is avoided as the primary label because the content's role is decision support and demand testing, not publishing volume.

### F. Company

- `/about/` — Linkgurus, Kholoud Rashdan, what the firm does/does not do, delivery model, geographies

No generic team page until a real bench exists. No careers page until the firm is genuinely recruiting.

### G. Transactional flows

- `/request-a-call/` — one qualification form, preserving referring context
  - `/request-a-call/received/` — acknowledgement and calendar step
- `/briefings/` — low-friction lead capture for executive notes/briefings
  - `/briefings/confirmed/` — confirmation and relevant reading

No shop, cart, checkout, public course enrollment, public cohort booking, or multiple service-specific calendars.

### H. Utility/footer pages

- `/privacy/`
- `/terms/`
- `/accessibility/`
- `/404/`

Add a cookie policy/consent layer only if non-essential cookies or marketing tracking are actually installed. XML sitemap, robots rules, feeds, and redirects are implementation artifacts rather than content pages.

## 2.3 Required cross-link rules

1. Every trigger page links to exactly one primary practice and one relevant entry offer anchor.
2. Every practice page links back to the trigger situations it is for; no practice sits as an abstract capability page.
3. Every proof object declares which offer/principle it validates. A Decision Council case cannot be used as proof of the Install or AI Operating Model.
4. Every insight article links to one trigger page or one entry-offer anchor—not the generic practices hub.
5. Every request-call CTA passes trigger/practice/offer/article context to the form.
6. Proof-gated offers route unqualified interest to the nearest evidenced entry offer; they do not dead-end and do not pretend to be established.
7. Scale-gated offers explain the prerequisite baseline and route new visitors to that prerequisite.
8. Prices remain proposal-only; the site explains scope, fit, completion conditions, exclusions, and availability instead.

---

# 3. Page-by-page brief

**Persona shorthand from Phase 3:**

- **CEO/owner/board — growth/authority:** scale-up or private firm that outgrew its structure; founder bottleneck; buyer can move authority.
- **CEO/board — implementation-burned:** paid for a design/restructure that did not enact.
- **CSO/Transformation head — AI choices:** must decide which AI bets to fund, sequence, stop, or defend.
- **COO/Transformation director — adoption/value:** a major investment launched without changing work or realizing value.
- **COO/CHRO + CIO/risk — agent accountability:** agents are entering production without role, authority, escalation, and ownership clarity.
- **Secondary CHRO/OD sponsor:** can sponsor role/job-architecture work but is not sufficient without CEO authority for enactment.

| Page | Purpose | Persona | Key Message(s) | Proof Needed | CTA | Arabic Notes |
|---|---|---|---|---|---|---|
| **Home** `/` | Move a qualified executive from “What is Linkgurus?” to one recognizable trigger and a credible next route. | All primary personas; CEO/owner/board first. | Pillar 1: one competence, three rooms; corporate line; Pillar 5: design is incomplete without application/change. Three practices stay together. | **GAP:** at least one permissioned, offer-specific proof artifact. Until then use a bounded founder credential and the proof standard, not logos. No case studies/testimonials/metrics confirmed in Phase 1. | Choose the situation that fits; then Request a call. | Arabic is the source. Wordmark never stands alone; preserve fatha in مَن. Lead with symptom/decision language, not “consulting services.” English is derived, not mirrored sentence-for-sentence. |
| **When to involve us — hub** | Let buyers self-identify by trigger without knowing practice or offer names. | All primary personas. | Phase 4 symptom language: time, repeated decisions, unrealized value, unclear ownership, approved-but-unapplied design. | External research may evidence problem prevalence; it must be labeled as problem evidence, not Linkgurus proof. | Select one trigger. | Use R2 MSA and agentless, face-preserving constructions. Avoid diagnostic jargon in headings. |
| **Growth made authority unclear** | Move a founder/CEO from normalized bottleneck to recognizing an authority/structure purchase. | CEO/owner/board — growth/authority; secondary CHRO. | Pillar 3: work delegated without authority; authority before more hiring; Pillar 5 enactment. | **GAP:** verified scale-up/authority case. Geidea experience is employer-scoped and its transformation scope remains unverified; not a portable case study. | View `خارطة الصلاحيات`, then Request a call. | Do not frame the founder as the failure. Use “the company outgrew what one person can run alone.” Avoid leading with إعادة الهيكلة. |
| **AI investment decision** | Turn AI-budget pressure into a bounded decision path rather than generic AI strategy browsing. | CSO/Transformation head — AI choices; CEO/CFO economic buyer. | Pillar 2: a decision, not a report; funding sequence includes what stops; named owner and reversal conditions. | **GAP:** no public standalone decision-work case. Four workshops + ~10 planning sessions occurred in one project; no facilitation/DQ certification or public record. Macro pilot-failure data proves the problem only. | View `مجلس القرار` / `مختبر القرار`; Request a call for a live decision. | Use «قرارٌ… لا تقرير» with tanwīn in display use. Use مجلس/جلسة, not ورشة عمل/تيسير. Use يتوقف and “redirect spend,” not kill/failure language. |
| **Investment went live; work did not change** | Reframe a visible adoption/value gap without forcing the sponsor to admit the original initiative failed. | COO/Transformation director — adoption/value; CFO; CHRO/CIO influencers. | Recover value already paid for; the system/new process may work while roles, handoffs, and authority did not change; Pillars 4 and 5. | **GAP:** verified enterprise-transformation scope and one Linkgurus Value on Hold case. SAP/Geidea history is the credibility bridge but remains unverified and employer-scoped. | View `القيمة المعلّقة`; Request a call. | State the forward gap, not “why it failed.” Avoid التحول الرقمي and literal “AI transformation.” Use «النظام يعمل… والعمل لم يتغيّر» logic without blaming staff. |
| **AI agents without clear accountability** | Help an early adopter recognize the organizational accountability boundary and route to an evidenced first step. | COO/CHRO + CIO/risk — agent accountability. | Pillar 4: every result has a named human owner; agent inventory, authority boundary, escalation, evidence trail; point of view before sales claim. | **MAJOR GAP:** zero Linkgurus agentic-AI delivery, assurance, risk, or audit proof. External WEF/Deloitte evidence supports need/principles only. AI Operating Model remains proof-gated until verified transformation scope + one Value on Hold delivery + defined assurance boundary. | Read the point of view; discuss `القيمة المعلّقة` if a live operating collision exists. | Use «لكل نتيجة… مسؤولٌ بالاسم». Do not force a direct noun for accountability; do not use مالك. Keep وكلاء الذكاء الاصطناعي consistent and flag native-review risk. No technical/security-audit language. |
| **Approved design not enacted** | Let a consulting-fatigued CEO recognize Linkgurus's proof standard without positioning the firm as a cleanup vendor. | CEO/board — implementation-burned. | Pillar 5 and T7 spine: application/change management define completion; measure changed authority and observed use, not approved artifacts. | **GAP:** no Linkgurus case proving enactment/hold. Founder implementation-failure diagnosis is self-reported and undocumented as a repeatable instrument. | See how proof is defined; Request a call if authority to enact exists. | إعادة الهيكلة is allowed only in the buyer's completed past tense. Use face-preserving, agentless language; do not attack the previous firm or promise guarantees/contingent fees. |
| **Practices — hub** | Explain why three practices are one firm and guide a buyer to the correct ladder. | All primary personas; procurement/board reviewers. | Pillar 1; same competence—roles, job architecture, authority, accountability—funded by different triggers. Availability is honest. | Needs a clear evidence/status matrix. **GAP:** no practice has full firm-level proof across its entire ladder. | Choose a practice or return to triggers. | Show the three final Arabic labels together: المختبر · البنية والتصميم المؤسسي · نموذج التشغيل الذكي. Arabic labels are structural; paired nouns are content vocabulary, not nav replacements. |
| **The Lab** `/practices/the-lab/` | Move a buyer from a live stuck decision to the correct entry/flagship/scale step without mixing public training or consumer offers. | CSO/Transformation head — AI choices; CEO/CFO. | Pillar 2; decision record; stop/keep/scale; team capability only after method has worked in a live case; Pillar 6 review cycle. | **GAP:** standalone purchase proof, decision-hold evidence at 30/60/90 days, client permission, final owned method/canvas provenance. No facilitation certification. | Primary: discuss `مجلس القرار`. Secondary: read a relevant case when one exists. | Practice label المختبر; offers always written in full. Use مجلس/جلسة. Do not claim Arabic demand or call Arabic a differentiator. Keep face-preserving grammar around stopping investment. |
| **Organization Design** `/practices/organization-design/` | Establish the clearest flagship ladder: map authority → transfer it → inspect it, with enactment in scope. | CEO/owner/board — growth/authority; secondary CHRO. | Pillar 3, Pillar 5, Pillar 6; job architecture, spans/layers, roles, decision authority; total rewards excluded. | **GAP:** one full-price Linkgurus path from `خارطة` to enacted `تفويض`, with changed thresholds used live and a hold check. No firm-level case exists. Founder depth is employer-scoped. | Discuss `خارطة الصلاحيات`; qualified path to `إرساء النموذج المؤسسي`. | Do not lead with إعادة الهيكلة. Use البنية, الصلاحيات, بنية الوظائف, and settled «نطاقات وحجم الإشراف». The scale offer may use completed-past restructuring language. |
| **The Operating Model** `/practices/operating-model/` | Separate the evidenced Value on Hold entry need from the proof-gated agentic flagship and its later review. | COO/Transformation director; COO/CHRO + CIO/risk. | Recover suspended value; AI enters work gradually; every result has a named owner; monitoring follows an installed baseline. | **GAP:** verified SAP/enterprise-transformation scope; one full-price `القيمة المعلّقة` case; one agentic operating-model case; assurance boundary; recurring-review evidence. | Discuss `القيمة المعلّقة`; read the agent-accountability point of view. | Use final category/offer family exactly. Avoid “AI transformation,” AI hype, technical-implementation claims, and punitive accountability nouns. Keep results/ownership language plain. |
| **Approach & proof — hub** | Answer “How do you work, and why should I believe it?” before asking for contact. | All primary personas; procurement/board. | Market need ≠ approach proof; implementation is the evidence rail; founder-led delivery and explicit exclusions. | Requires a claim/evidence inventory and status ownership. **GAP:** most claims currently rely on founder statement or external trend research. | Choose Method, Proof Standard, Founder Experience, or a real case. | Contemporary MSA; do not import English methodology nouns where Phase 10 prescribes a sentence. Keep formal register only for the T7 maxim. |
| **How we work** | Explain the repeatable engagement logic without revealing unverified IP or ending at a design artifact. | CEO/COO/Transformation; procurement. | Baseline → decision/design → enactment/change → observed use → review; facilitation is a delivery mechanism, not the product. | **GAP:** final documented method/canvas and provenance/usage rights; proof another person can execute it; quality-assurance process. | Request a fit call. | Use التطبيق وإدارة التغيير, not a literal one-word “execution.” Use نقل الممارسة rather than NGO-coded بناء القدرات where possible. |
| **What counts as proof** | Set a higher standard than testimonials and protect every later claim. | CEO/board; skeptical/burned buyers; procurement. | Before-state, changed role/authority/workflow, live use, 30/60/90-day hold, limits; external trend evidence is not case evidence. | This page can publish before cases because it is a standard, but it needs approved measurement templates. **GAP:** no completed Linkgurus case yet meets the standard. | Review available evidence or Request a call. | Use T7 line in R1/R2. Do not translate accountability into مساءلة/محاسبة. No red/blame framing; describe presence/absence and observed use. |
| **Founder experience** | Transfer legitimate credibility from Kholoud to the firm without implying employer work was Linkgurus work. | All executive personas; referral visitors. | Founder-led firm; 20+ years inside operating companies; org design/change/enterprise transformation; operator perspective, bounded accurately. | **BLOCKING GAP:** verify Geidea/SAP scope, ARASCO scope, dates, role, and permitted wording; quantify and confirm GISCON outcome. 30+ projects are employer-owned and not portable as firm cases. Certifications remain unverified unless records are provided. | Request a call with Kholoud. | Founder name spelling must be confirmed in Arabic. Use first person/founder anchoring for warmth, not Egyptian dialect. No unsupported “trusted by,” client counts, or badges. |
| **Case studies — index** **Publication-gated** | Let buyers choose proof by trigger/practice and compare what changed operationally. | All primary personas. | Evidence organized by problem and offer validated, not industry-logo display. | **ABSENT per Phase 1:** no written/published case studies, testimonials, named references, or permissioned metrics. Do not publish an empty index or placeholders. | Read a case; contextual Request a call. | Arabic case is authored for the buyer's decision logic, not translated from an English narrative. Use exact approved terms and face-preserving client language. |
| **Case study template** `[case-slug]` **Publication-gated** | Move a skeptical buyer from claim to credible, bounded evidence. | Persona matching the case trigger. | Before → why current approach was insufficient → Linkgurus scope → operating change → observed use → hold → limitations. | Client permission; baseline; outcome data; what Linkgurus did/did not cause; which offer/principle the case validates. **No current case is confirmed ready.** | View matching practice/entry offer; Request a call. | Lead with the situation, not praise. Preserve client face and confidentiality. Do not substitute participant counts or satisfaction quotes for operating evidence. |
| **Insights — hub** | Turn founder-led thinking into a navigable decision-support library and a route to relevant entry offers. | All primary personas; cold LinkedIn visitors. | Four problem domains aligned to the sitemap and content tests; evidence discipline visible. | Editorial byline, source register, reviewed Arabic terminology. Existing public content volume/quality was not inventoried as a firm asset in Phase 1; publications were recorded absent. | Choose a topic or subscribe to briefings. | Arabic originals in R2 MSA. Do not publish Linkgurus corporate content in Egyptian dialect. “Insights” sections use buyer questions, not English-derived tags. |
| **Authority & Organization Design topic** | Build discoverability and trust around the strongest founder capability and first full flagship path. | CEO/owner/board; CHRO/OD sponsor. | Decision latency, founder bottlenecks, authority thresholds, structure enactment, drift. | Verified founder experience plus eventually authority cases. Until then label examples/frameworks as method, not client outcomes. | Read trigger page or `خارطة الصلاحيات`. | Use live vocabulary تأخر القرارات · غموض المسؤوليات · عدم وضوح السلطات. Do not front-load إعادة الهيكلة. |
| **AI Investment Decisions topic** | Test whether the audience contains budget holders with an alignment/defensibility gap. | CSO/Transformation head; CEO/CFO. | Framing, allocation, sequencing, stopping weak bets, decision ownership; distinguish knowledge versus alignment gap. | External research can support portfolio waste; **GAP:** Linkgurus standalone category and Arabic-room effect remain unvalidated. | AI-investment trigger page; `مجلس القرار`; subscribe. | Use decision/investment vocabulary, not “design sprint.” Do not claim the Arabic category is empty or proven. |
| **Adoption & Value Realization topic** | Bring the portfolio's strongest externally supported entry need forward and connect it to founder experience. | COO/Transformation director; CFO/CHRO/CIO. | Investment value remains suspended when roles/workflows/authority do not change; application/change, not more announcements. | Verify enterprise-transformation story; produce one `القيمة المعلّقة` case. Macro research is need evidence only. | Adoption trigger page; `القيمة المعلّقة`. | Avoid التحول الرقمي, “failure,” and staff-blame language. Use value already paid for and work not changing. |
| **AI Agents & Accountability topic** | Claim a carefully bounded point of view while commercial proof is built. | COO/CHRO + CIO/risk. | Agent inventory, human owner, decision boundary, override/escalation, evidence trail; no technical assurance claims. | External WEF/Deloitte control principles; **GAP:** zero Linkgurus agentic delivery. Native review of key terminology needed. | Agent-accountability trigger; Value on Hold as nearest evidenced entry. | Use وكلاء الذكاء الاصطناعي consistently; accountability carried by a sentence. Avoid “AI-powered,” “future of work,” and direct security/audit entitlement. |
| **Insight article template** | Move a cold reader from one useful argument to the next appropriate decision step. | One named persona per article. | One trigger, one argument, evidence type labeled, one implication, one next route. | Sources with dates/incentives; clear FACT/INFERENCE/HYPOTHESIS separation where material. No fabricated examples. | One contextual trigger/offer CTA; optional briefing signup. | Arabic authored first. Avoid translationese (`يتم` + verbal noun, بما في ذلك) and keep terms consistent with the glossary. English may be structurally different. |
| **About** | Make the founder-to-firm relationship, scope, delivery model, and boundaries legible. | Referral visitors; executives; procurement. | Linkgurus is founder-led; one competence/three practices; founder is credibility source; no false bench; private-sector GCC focus; Egypt not positioned as listed market. | Verified founder facts, entity details, delivery capacity, geography/legal wording. **GAP:** no real team bench and G28 bilingual boardroom standard unresolved. | View Founder Experience or Request a call. | Founder anchoring in the first clause. Wordmark accompanied by corporate line. No generic mission/vision or void legacy service lines. |
| **Request a call** | Convert qualified interest into one routed conversation without service/calendar confusion. | All primary personas; economic buyer preferred. | One route; the form is a fit/routing step, not free consulting. Preserve source context. | Privacy basis, form destination, response owner/SLA, booking provider, spam protection. No proof claim needed. | Submit request. | Use respectful plural forms (`فريقكم`, `مؤسستكم`), R2/R3 MSA, no written dialect. Mirror form order and mixed LTR fields correctly. Ask trigger in buyer language, not practice jargon. |
| **Request received** | Set expectations and allow the qualified visitor to book without another route choice. | Submitted leads. | What happens next, expected response, calendar if appropriate, relevant reading based on submitted trigger. | Operational response process must exist. | Book a time or read relevant proof/insight. | Same courtesy register. Confirmation should not imply acceptance before review. |
| **Briefings / lead capture** | Capture lower-readiness executive interest without turning the site into a newsletter-first funnel. | Cold LinkedIn visitors; future buyers; influencers. | Practical notes across the four problem domains; founder-led; no consumer course crossover. | Consent language, sender identity, frequency, unsubscribe flow; audience tagging by topic. Existing 2,500-person list composition is unverified and cannot be cited as proof. | Subscribe. | R2 MSA, Arabic source. Keep the form secondary on commercial pages; do not copy DSA's repeated newsletter interruption. |
| **Briefings confirmed** | Confirm consent and route the subscriber to the relevant topic. | New subscribers. | Subscription state and topic-based reading. | Email system and consent record. | Read topic or Request a call later. | Clear confirmation in MSA; do not cross-promote the personal OD course from the corporate flow. |
| **Privacy** | Explain data collection for forms, analytics, newsletter, and scheduling. | All visitors; procurement/legal. | Factual handling, processors, retention, rights, contact. | Legal review and actual vendor/data-flow inventory. | Manage contact/privacy request. | Professionally localized legal Arabic; do not translate vendor/legal names. Match actual Arabic/English data handling exactly. |
| **Terms** | Define site use, intellectual-property boundaries, and no-advice limitations. | All visitors. | Content is informational; engagements require contract; method/IP ownership stated only where verified. | Legal review; final method provenance. | Contact for clarification. | Formal MSA. Avoid claiming exclusive IP before the final canvas/method provenance is documented. |
| **Accessibility** | State accessibility intent and provide a route to report a barrier. | All visitors. | Bilingual/RTL accessibility, keyboard/focus, text alternatives, reduced motion. | Must reflect the tested build, not aspiration. | Report a barrier. | Arabic is a first-class test surface, including diacritics and mixed-direction text. |
| **404** | Recover visitors into the buyer journey instead of a dead end. | Any visitor. | Page unavailable; choose trigger, practice, insight, or request route. | Working search/navigation links; no proof needed. | Go to trigger hub or Home. | Native Arabic error message and RTL-safe paths; do not default Arabic errors to English. |

## 3.1 Proof gaps that affect the entire content plan

These are content-production gates, not design gaps:

1. **No written/published case studies, testimonials, named references, verified client metrics, speaking record, publications, or independently verified certifications were confirmed in Phase 1.**
2. **The two lifetime Linkgurus clients do not establish firm proof:** both bought Kholoud, not the firm, at minimum charge.
3. **Founder experience is strong but bounded:** 30+ projects were inside employment and are not portable as Linkgurus case studies without permission.
4. **GISCON is the only named engagement in the record; its outcome is blank.**
5. **Geidea/SAP and ARASCO scope is unverified.** This blocks the public founder credential story at the required level of precision.
6. **Decision-work evidence is n=1 project:** four decision workshops and roughly ten planning sessions, with no facilitation/decision-quality certification or public record.
7. **AI-agent operating-model delivery evidence is zero.** External research validates the problem and selected principles, not Linkgurus delivery.
8. **Recurring review economics are designed, not evidenced.** No client renewal or repeat review validates `مختبركم`, `فحص الصلاحيات الدوري`, or `سجل المسؤولية` as recurring offers.
9. **Method/canvas documentation and provenance must be supplied.** D8 says it was being finalized; the final owned artifact, third-party IP boundaries, and QA/delegation standard are not present in the reviewed files.
10. **Arabic buyer wording is not verified.** The project found strong supply-side vocabulary but essentially no unambiguous raw Arabic buyer voice for the decision-design category.

---

# 4. Conversion path map

## 4.1 Journey A — authority/scale-up buyer

**Cold or referred CEO → trigger recognition → bounded diagnostic → flagship proof → qualified call**

1. Founder LinkedIn post or warm referral on decision latency/founder bottleneck.
2. `/when-to-involve-us/growth-made-authority-unclear/`
3. `/practices/organization-design/#authority-map`
4. Relevant authority case study **when available**, otherwise `/approach-and-proof/what-counts-as-proof/` plus verified `/founder-experience/`.
5. `/request-a-call/` with trigger=`growth-authority`, offer=`authority-map`, and source content preserved.
6. Qualification → call → `خارطة الصلاحيات`; conversion to `إرساء النموذج المؤسسي` only if the diagnostic finds a real authority problem.

**Decision progression:** normalized symptom → structural consequence → low-risk measured baseline → evidence of enactment → conversation.

**Structural gap that would break it:** without a trigger page, the cold buyer lands on “Organization Design” jargon; without an authority-specific proof object, the path jumps from claim to form; without context preservation, the buyer must repeat the diagnosis. The proposed sitemap closes the first and third gaps. The proof object remains a **content gap** until a full authority path is delivered and permissioned.

## 4.2 Journey B — unrealized investment value / operating-model buyer

**Cold AI/adoption reader → value-recognition page → evidenced entry offer → founder credential/case → qualified call**

1. Search or LinkedIn article on AI adoption, stalled value, or work not changing.
2. `/when-to-involve-us/investment-went-live-work-did-not-change/`
3. `/practices/operating-model/#suspended-value`
4. Verified enterprise-transformation story and, later, a Value on Hold case.
5. `/request-a-call/` with trigger=`unrealized-value`, offer=`suspended-value`.
6. Qualification → `القيمة المعلّقة`; only after an evidenced Value on Hold delivery may the buyer be routed toward the proof-gated AI Operating Model where fit is real.

**Decision progression:** “the initiative did not fail” → “the organization still has to change” → bounded collision/value diagnosis → proof of relevant operator experience → conversation.

**Structural gap that would break it:** if the site jumps directly from AI thought leadership to the highest-priced AI Operating Model, it repeats the highest-price/thinnest-proof inversion and loses trust. The Value on Hold page/section is the necessary bridge. Its supporting founder story and case are currently blocked by unverified SAP scope and zero Linkgurus Value on Hold cases.

## 4.3 Journey C — AI investment decision buyer

**Cold content visitor → live-decision trigger → paid test → case evidence → call**

1. Founder article on too many AI bets, competing proposals, or pilots that should stop.
2. `/when-to-involve-us/ai-investment-decision/`
3. `/practices/the-lab/#decision-council`
4. A Decision Council case showing the decision, named owner, reversal conditions, and 30/60/90-day hold **when one exists**.
5. `/request-a-call/` with the live decision category preserved.
6. Qualification → `مجلس القرار`; `مختبر القرار` only after a genuine portfolio-allocation trigger and paid standalone decision proof.

**Decision progression:** AI pressure → alignment/defensibility gap → one decision as a paid bounded test → evidence that it held → larger portfolio decision work.

**Structural gap that would break it:** a generic “Services” page would make the buyer choose among Lab, training, and operating-model terms; a generic case from Organization Design would falsely imply the Lab is proven. The proposed trigger/practice/proof tagging prevents both. The actual Lab proof remains absent and must not be replaced with DSA cases, macro pilot statistics, or workshop attendance.

## 4.4 Portfolio-wide conversion controls

1. **One CTA system:** all high-intent routes end at the same request flow; content context changes, the booking system does not.
2. **Two conversion levels only:** subscribe to briefings for lower readiness; request a call for active triggers.
3. **No lead magnet masquerading as proof:** a methodology note may capture leads, but it cannot stand in for a case.
4. **No dead-end gated offers:** proof-gated AI work routes to Value on Hold; scale-gated reviews route to the baseline offer.
5. **Measure paths by qualified conversations and transactions, not page engagement.** Phase 7 predicts AI content may earn attention while authority work earns buying conversations.
6. **Tag every enquiry:** source, persona/title, geography, trigger, practice/offer, knowledge-versus-alignment gap, next step, and outcome. This turns the site into the evidence ledger Phase 12 requires.

## 4.5 Questions for Kholoud before content production

The IA can proceed, but these answers determine which proof and status pages may publish:

1. **Since Phase 1, has any new proof been created?** Please identify any client-approved case study, testimonial, logo permission, verified outcome/metric, reference, speaking engagement, publication, or independently verifiable certification. None should be assumed from silence.
2. **Can GISCON's outcome be quantified and client-confirmed?** What wording and naming permission exists?
3. **Can the Geidea/SAP and ARASCO scope be verified?** Which decisions, duration, role, and outcomes may be stated publicly, and by whom can they be confirmed?
4. **Is the final Linkgurus method/canvas complete?** Please supply the owned artifact, provenance/third-party licence boundaries, and any QA or delegation standard.
5. **Do you approve the public visibility convention**—Available now / Proof-gated / Scale-gated—so all nine offers remain in the architecture without appearing equally established?
6. **Please confirm the Arabic spelling of the founder's name** and resolve G28: are Arabic and English both at boardroom delivery and collateral standard?
7. **Which call and email systems will receive site enquiries?** This affects privacy, consent, response expectations, and whether the form-to-calendar sequence is operationally real.

---

## Final IA decision

The rebuilt site should not behave like a catalogue of consulting services. It should behave like a decision path:

**Trigger → relevant practice → correct offer tier → proof of that exact claim → one qualified-call route.**

The Arabic experience is the source, the English experience is an equivalent institutional counterpart, and the content system keeps portfolio status and proof claims synchronized across both.
