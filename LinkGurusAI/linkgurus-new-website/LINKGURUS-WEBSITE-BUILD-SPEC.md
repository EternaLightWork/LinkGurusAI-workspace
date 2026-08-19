# Linkgurus Website Build Specification

**Document type:** Information architecture, content architecture, and technical handoff  
**Status:** Build baseline, with explicit release gates  
**Prepared:** 19 August 2026  
**Default language:** Arabic  
**English route prefix:** `/en/`  
**Deployment target:** Hostinger Business Web Hosting  
**Source boundary:** A coding agent should work only from this directory and this document.

> ⚠️ **Whole-document uncertainty disclaimer:** All approved decisions are tagged `[FACT]`. Recommendations that are specific enough to build but were not explicitly approved by the founder are tagged `[RECOMMENDATION]`. Missing legal, operational, content, proof, sender, and deployment inputs are tagged `[OPEN]`. No `[OPEN]` item may be silently converted into public copy or production configuration.

## 0. How to use this file

### 0.1 Instruction priority

If sources conflict, use this order:

1. This build specification, after founder approval.
2. `BRAND_BUNDLE.md`.
3. The locked decisions represented by the final brand hierarchy, copied into this specification.
4. `brand-design-system/Linkgurus-Design-System.html`.
5. The template files under `assets/templates/`.
6. Earlier research and exploratory documents only as provenance, never as current public copy.

### 0.2 Status legend

| Tag | Meaning | Build treatment |
|---|---|---|
| `[FACT]` | Explicitly decided in a controlling local source or supplied by Kholoud | Implement as written |
| `[RECOMMENDATION]` | Build decision proposed here to remove technical ambiguity | Implement unless Kholoud overrides |
| `[DRAFT COPY]` | Working copy assembled from approved messages | Show in prototype, require editorial approval before launch |
| `[OPEN]` | Required input is missing | Build placeholder or configuration gate, do not invent |
| `[PROOF-GATED]` | Claim or page cannot publish until evidence requirements are met | Keep unpublished and `noindex` |
| `[SCALE-GATED]` | Offer requires an installed baseline before it can be sold | Explain prerequisite, do not show as generally available |

### 0.3 Build boundary

- `[FACT]` Linkgurus implements the organization around AI: challenge and value framing, roles, authority, workflows, human ownership, controls, change, adoption, and business accountability.
- `[FACT]` The client IT function or technology partner owns technology architecture, build, integration, security, deployment, and technical operations.
- `[FACT]` The site launches as a beta practice system. It must not imply that all nine offers have equal delivery history.
- `[FACT]` Seven internal territory codes remain represented in the portfolio logic, but they are not public navigation and must not be exposed as seven services.
- `[FACT]` T7 is public only as one completion promise: `لا يكتمل التصميم المؤسسي إلا بالتطبيق وإدارة التغيير.` It is not a competing visible framework.
- `[FACT]` 6A is the delivery philosophy: `Awaken · Assess · AI Fit · Anchor · Align · Ascend`. AI Fit is stage three.

## 1. Source validation and conflict resolution

### 1.1 Controlling decisions

| Decision | Final treatment |
|---|---|
| Corporate brand | `[FACT]` Linkgurus / لينك جوروز |
| Corporate line | `[FACT]` `Who decides, and what holds.` / `«مَن يقرر… وماذا يبقى»` |
| Category descriptor | `[FACT]` Challenge framing, organization design, and human-AI agent operating models. Arabic requires the approved equivalent already in `BRAND_BUNDLE.md`. |
| Master commercial promise | `[FACT]` Frame the AI challenge worth solving. Redesign the organization around it. Put the new way of working into operation. |
| Practices | `[FACT]` The Lab / المختبر, Restructuring & Org. Design / البنية والتصميم المؤسسي, The Operating Model / نموذج التشغيل الذكي |
| Portfolio | `[FACT]` Three practices, each with Entry, Flagship, and Scale offers, nine offers total |
| Initial paid entry priorities | `[FACT]` مجلس القرار, القيمة المعلّقة, خارطة الصلاحيات |
| Initial public proof posture | `[FACT]` No case study or testimonial publishes until its evidence and permission record is reconciled |
| Language architecture | `[FACT]` Arabic at root, English counterpart under `/en/` |
| Primary conversion | `[FACT]` One context-preserving Request a Call flow |
| Lower-readiness conversion | `[FACT]` Briefings subscription, separate from high-intent enquiry |
| Template acquisition | `[FACT, current request]` Every template file is email-gated and sent by email after submission |

### 1.2 Conflict log

| Conflict | Resolution |
|---|---|
| The 19 August pre-build report says `NO-GO`; the later final hierarchy says `approved for website build`. | `[FACT]` The later locked hierarchy explicitly supersedes the earlier blocker language. Build may proceed using the resolved boundary and hierarchy. |
| Earlier documents lead with facilitated decision design; the locked hierarchy leads with AI challenge framing plus organizational implementation. | `[FACT]` Use the locked master promise and three executive outcomes. Facilitation is a mechanism, not the corporate category. |
| Earlier 6A variants treat AI Fit as conditional or external. | `[FACT]` AI Fit is the third of six locked stages. |
| Earlier T7 material presents a five-field visible framework. | `[FACT]` Public T7 is one completion-standard sentence. Five-field records may remain inside delivery artifacts. |
| Template funnel research labels Decision in View as ungated. | `[FACT, current request]` Gate every actual template file. Descriptive preview content remains public. |
| Existing IA has no template library route. | `[RECOMMENDATION]` Add `/templates/` as a top-level content utility, linked contextually from trigger, practice, and insight pages. Do not add it to the main desktop navigation in v1. |
| Existing proof inventory and founder statements about past cases are not reconciled. | `[PROOF-GATED]` Keep case studies unpublished. Founder history may use only verified, bounded wording. |
| English template naming includes `Challenge Framing Canva`, while current architecture uses `Decision in View` and `Challenge Framing Council`. | `[OPEN]` Regenerate the English PDF title and metadata before public release. Do not publish the typo or old name as final. |

## 2. Full sitemap

### 2.1 Route rules

- `[FACT]` Arabic pages use root routes and `lang="ar" dir="rtl"`.
- `[FACT]` English counterparts use identical slugs under `/en/` and `lang="en" dir="ltr"`.
- `[FACT]` The language toggle changes only the locale prefix and retains the current page, anchor, and allowed context parameters.
- `[FACT]` Do not redirect by IP or geography.
- `[RECOMMENDATION]` Redirect a first-time browser by neither language nor cookie. Open Arabic by default. Remember an explicit language switch for later navigation without changing indexed URLs.
- `[FACT]` Add `hreflang` only when both pages contain substantive, independently drafted content.

### 2.2 Page tree with Arabic and English paths

```text
Arabic default                                      English counterpart
/                                                   /en/
├── when-to-involve-us/                             ├── /en/when-to-involve-us/
│   ├── ai-investment-decision/                     │   ├── ai-investment-decision/
│   ├── investment-went-live-work-did-not-change/   │   ├── investment-went-live-work-did-not-change/
│   ├── growth-made-authority-unclear/               │   ├── growth-made-authority-unclear/
│   ├── ai-agents-without-clear-accountability/     │   ├── ai-agents-without-clear-accountability/
│   └── approved-design-not-enacted/                │   └── approved-design-not-enacted/
├── practices/                                      ├── /en/practices/
│   ├── the-lab/                                    │   ├── the-lab/
│   │   ├── #decision-council                       │   │   ├── #decision-council
│   │   ├── #decision-lab                           │   │   ├── #decision-lab
│   │   └── #your-lab                               │   │   └── #your-lab
│   ├── organization-design/                        │   ├── organization-design/
│   │   ├── #authority-map                          │   │   ├── #authority-map
│   │   ├── #the-install                            │   │   ├── #the-install
│   │   └── #standing-review                        │   │   └── #standing-review
│   └── operating-model/                            │   └── operating-model/
│       ├── #value-on-hold                          │       ├── #value-on-hold
│       ├── #ai-operating-model                     │       ├── #ai-operating-model
│       └── #accountability-review                  │       └── #accountability-review
├── approach-and-proof/                             ├── /en/approach-and-proof/
│   ├── how-we-work/                                │   ├── how-we-work/
│   ├── what-counts-as-proof/                       │   ├── what-counts-as-proof/
│   ├── founder-experience/                         │   ├── founder-experience/
│   └── case-studies/ [PROOF-GATED]                 │   └── case-studies/ [PROOF-GATED]
│       └── [case-slug]/ [PROOF-GATED]              │       └── [case-slug]/ [PROOF-GATED]
├── insights/                                       ├── /en/insights/
│   ├── authority-and-organization-design/          │   ├── authority-and-organization-design/
│   ├── ai-investment-decisions/                    │   ├── ai-investment-decisions/
│   ├── adoption-and-value-realization/             │   ├── adoption-and-value-realization/
│   ├── ai-agents-and-accountability/               │   ├── ai-agents-and-accountability/
│   └── [article-slug]/                             │   └── [article-slug]/
├── templates/                                      ├── /en/templates/
│   ├── decision-to-hold-map/                       │   ├── decision-to-hold-map/
│   ├── decision-in-view/                           │   ├── decision-in-view/
│   ├── challenge-to-decision-board/                │   ├── challenge-to-decision-board/
│   ├── decision-delay-trace/                       │   ├── decision-delay-trace/
│   ├── value-collision-map/                        │   ├── value-collision-map/
│   └── agent-to-owner-blueprint/ [AR ONLY]         │   └── [NOT CREATED UNTIL EN EXISTS]
├── about/                                          ├── /en/about/
├── request-a-call/                                 ├── /en/request-a-call/
│   └── received/                                   │   └── received/
├── briefings/                                      ├── /en/briefings/
│   ├── confirmed/                                  │   ├── confirmed/
│   └── unsubscribe/                                │   └── unsubscribe/
├── template-request-received/                      ├── /en/template-request-received/
├── download/[opaque-token]/ [NOINDEX]              ├── /en/download/[opaque-token]/ [NOINDEX]
├── privacy/                                        ├── /en/privacy/
├── terms/                                          ├── /en/terms/
├── accessibility/                                  ├── /en/accessibility/
└── 404                                             └── /en/404
```

### 2.3 Routes deliberately excluded

- No nine separate offer pages in v1. Offers remain anchored sections on practice pages.
- No team page until a real delivery bench can be named.
- No careers page until recruitment is active.
- No course, shop, cart, or consumer training route.
- No public client logo wall or testimonial carousel.
- No public case-study index until at least one permissioned case satisfies the proof standard.
- No public territory pages for T1 to T7.

## 3. Global navigation and structure

### 3.1 Header

**Desktop order in English, LTR:**

1. Wordmark, links to `/en/`.
2. When to involve us.
3. Practices.
4. Approach & proof.
5. Insights.
6. About.
7. `Request a call` primary CTA.
8. `العربية` counterpart toggle.

**Desktop order in Arabic, RTL:**

1. Arabic wordmark on the inline-start side, links to `/`.
2. متى تستعين بنا.
3. الممارسات.
4. منهجنا والدليل.
5. الرؤى.
6. عن لينك جوروز.
7. `اطلب مكالمة` primary CTA.
8. `English` counterpart toggle.

`[OPEN]` Arabic navigation labels above are structurally required but require final native editorial approval. Do not treat them as approved merely because they appear here.

**Behavior:**

- Wordmark returns home. Do not include a `Home` navigation item.
- Sticky only after the hero leaves the viewport.
- Mobile uses a full-height panel with focus trapping, Escape close, visible close control, and preserved language toggle.
- `Templates` is linked in the footer and surfaced contextually, not placed in primary navigation in v1.
- Use the supplied menu, close, chevron, arrow, external-link, and download SVGs. Do not substitute an icon font.

### 3.2 Footer

Footer columns, mirrored by locale:

1. Corporate line and category descriptor.
2. Trigger links.
3. Practice links.
4. Templates and insights.
5. Approach, proof, founder experience, and About.
6. Request a Call, Briefings, Privacy, Terms, Accessibility, language toggle.

`[OPEN]` Add only verified legal entity name, registration jurisdiction, business address, email address, and copyright holder.

### 3.3 Language toggle

- Counterpart route mapping is explicit content data, not string replacement at runtime.
- Preserve the anchor when the counterpart contains the same offer anchor.
- Preserve only allowlisted context parameters: `source`, `trigger`, `practice`, `offer`, `template`, and `article`.
- If no counterpart exists, show the unavailable language as disabled with a plain explanation. Do not send the user to that language homepage.
- Each version is self-canonical. Arabic and English counterparts are related with reciprocal `hreflang="ar"` and `hreflang="en"` only when both are substantive.

### 3.4 Full RTL mirroring

Arabic is not an English layout with aligned text changed.

- Set `dir="rtl"` on the document root, not isolated text containers.
- Mirror grid and flex flow, navigation order, breadcrumb sequence, step connectors, pagination arrows, timeline direction, form label alignment, drawers, and asymmetric spacing.
- Use CSS logical properties: `margin-inline`, `padding-inline`, `inset-inline`, `border-inline`, `text-align: start`, and `float: inline-start` where available.
- Supply explicit LTR and RTL arrow/chevron assets. Do not rotate semantic icons that are not directional.
- Keep email addresses, URLs, phone numbers, code, dates where required, and Latin product names in isolated `dir="ltr"` spans inside Arabic content.
- Mixed-language headings must be visually tested. Do not use letterspacing on Arabic.
- Arabic line-height must allow diacritics and generally needs more vertical space than English.
- Hero and card compositions mirror, including media position and visual reading path.

### 3.5 Responsive and accessibility baseline

- `[RECOMMENDATION]` Target WCAG 2.2 Level AA and verify the complete page, including forms, messages, overlays, and downloads.
- Keyboard order follows the visual order in both directions.
- Visible focus is mandatory on all interactive controls.
- Minimum touch target: 44 by 44 CSS pixels.
- Respect `prefers-reduced-motion`.
- No meaning may rely on color alone. Use the existing presence, absence, rule, hatch, and enclosure grammar.
- All PDF links identify format and file size before request.
- Form errors appear beside the field and in an error summary, and are announced to assistive technology.
- Do not publish an Accessibility claim until the built site has been manually tested.

## 4. Visual and component contract

### 4.1 Controlling design source

Use `brand-design-system/Linkgurus-Design-System.html` as the detailed source of truth.

Core tokens:

```css
--color-signal-blue: #005CFF;
--color-signal-amber: #FBB400;
--color-ink: #080808;
--font-arabic: "Almarai", sans-serif;
--font-latin: "Instrument Sans", sans-serif;
```

- Flat geometry only.
- No gradients, shadows, glow, glass effects, neural nodes, brains, circuits, particles, generic AI imagery, stock handshakes, or synthetic client scenes.
- Do not invent photographs as proof.
- Use diagrams, decision traces, authority thresholds, workflow collisions, named-owner fields, and real template previews.
- Status is shown by labels plus presence/absence, never traffic-light colors.

### 4.2 Required components

| Component | Variants | Required behavior |
|---|---|---|
| `SiteHeader` | AR, EN, desktop, mobile | Mirrored layout, current-page toggle |
| `SiteFooter` | AR, EN | Legal placeholders remain hidden until configured |
| `HeroStatement` | home, trigger, practice, utility | One H1, no rotating slogans |
| `TriggerCard` | five situations | Whole card link, named next route |
| `PracticeStream` | Lab, Org Design, Operating Model | Uses supplied stream SVG |
| `OfferTier` | Entry, Flagship, Scale | Status, fit, scope, exclusions, completion condition |
| `AvailabilityBadge` | Available now, Paid beta, Proof-gated, Scale-gated | Text plus non-color visual state |
| `ProofBoundary` | fact, inference, unknown, proof-gated | Visible claim state |
| `MethodStage` | six 6A stages | AI Fit is always stage three |
| `TemplatePreview` | available, language-incomplete, release-blocked | No direct asset URL in page source |
| `EmailGateForm` | template delivery | Separate resource request and marketing consent |
| `RequestCallForm` | high intent | Carries source context |
| `BriefingForm` | lower readiness | Double opt-in flow |
| `InlineCTA` | contextual | One next step, no generic repeated banner |
| `ArticleCard` | four topics | Date, evidence state, author, locale |
| `CaseStudyCard` | proof-gated | Not rendered when no eligible case exists |

## 5. Page-by-page specifications

### 5.1 Home, `/` and `/en/`

**Purpose:** Explain the corporate promise, let the visitor recognize one of three executive outcomes, then route to the relevant trigger or entry offer.

**Blocks, in order:**

1. Header.
2. Hero with corporate line, master promise, category descriptor, operating boundary, and one CTA to the trigger selector.
3. Three executive outcomes:
   - Decide the AI challenge worth funding.
   - Find why a live AI or digital investment has not released value.
   - Expose the authority condition blocking an AI or growth decision.
4. Agentic Organization master visual, strategy to value to structure/governance to human-agent workflow to controls to customer value to review.
5. Three practices, one-line role each, no nine-card grid above the fold.
6. 6A method strip with AI Fit fixed at stage three.
7. T7 completion promise as one sentence.
8. Business implementation versus technology implementation responsibility split.
9. Honest beta and proof status panel.
10. Contextual template preview based on selected outcome, no download before email gate.
11. Founder-to-firm block with bounded, verified wording only.
12. Final CTA to Request a Call and secondary link to Briefings.
13. Footer.

**Approved hero copy:**

- AR: `نُحدّد تحدّي الذكاء الاصطناعي الذي يستحق الحل، ونعيد تصميم المنظمة بما يلزم لتحقيقه، ثم نُدخل طريقة العمل الجديدة إلى الواقع.`
- EN: `Frame the AI challenge worth solving. Redesign the organization around it. Put the new way of working into operation.`

**Proof restriction:** No logos, metrics, client claims, or testimonial UI.

### 5.2 When to involve us hub

**Purpose:** Situation-first routing without asking visitors to understand the portfolio.

**Blocks:**

1. Hero: choose the condition visible in the business now.
2. Five trigger cards.
3. Small explanation of how a trigger routes into a practice.
4. Three first-month outcome comparison rows.
5. Boundary statement.
6. Request a Call CTA.

Each card stores `trigger` and passes it through every downstream CTA.

### 5.3 Trigger pages

All trigger pages use this block order:

1. Buyer situation in plain, face-preserving language.
2. Observable signals, never a self-scoring maturity quiz.
3. What is at risk if the condition remains.
4. What Linkgurus can establish in the entry engagement.
5. What Linkgurus does not do.
6. Matching template preview plus email gate.
7. Matching practice and entry offer.
8. Proof boundary.
9. Request a Call CTA with context.

| Route | Primary buyer | Core message | Template | Offer route | Status |
|---|---|---|---|---|---|
| `ai-investment-decision` | CEO, CSO, transformation leader, CFO | Several AI bets exist but no defensible Now, Later, or No decision | Decision in View | The Lab, `#decision-council` | Paid beta |
| `investment-went-live-work-did-not-change` | COO, transformation director, CFO, CHRO, CIO | Technology is live but roles, handoffs, authority, measures, or value did not move | Value Collision Map | Operating Model, `#value-on-hold` | Available beta |
| `growth-made-authority-unclear` | Founder, CEO, board, CHRO | Decisions return upward, wait, or cross functions without a holder | Decision Delay Trace | Org Design, `#authority-map` | Available beta |
| `ai-agents-without-clear-accountability` | COO, CHRO, CIO, risk | Agent output exists without clear human ownership, boundary, escalation, or evidence | Agent-to-Owner Blueprint | Operating Model, nearest evidenced route is `#value-on-hold` | Point of view, flagship proof-gated |
| `approved-design-not-enacted` | CEO, board, implementation-burned buyer | An approved design is not operating in roles, authority, workflow, or measures | Decision-to-Hold Map | How We Work, then qualified practice | Proof-gated claim |

### 5.4 Practices hub

**Purpose:** Explain three practical doors into one organization-design system.

**Blocks:**

1. Master promise.
2. Three practice streams.
3. Availability legend.
4. Three executive outcomes mapped to the practices.
5. Portfolio master preview, not nine equal sales invitations.
6. 6A and T7 relationship.
7. Request a Call.

### 5.5 The Lab, `/practices/the-lab/`

**Purpose:** Make one consequential challenge explicit and decide what is worth funding, what stops, who decides, and what evidence reopens the decision.

**Blocks:**

1. Practice role and qualifying triggers.
2. Entry, `مجلس القرار / Challenge Framing Council`: fit, inputs, one-day format plus pre-work, outputs, exclusions, paid-beta status, completion condition.
3. Decision in View gated template.
4. Flagship, `مختبر القرار / The Decision Lab`: purpose, required entry conditions, outputs, proof-gated status.
5. Challenge-to-Decision Board gated template.
6. Scale, `مختبركم / Your Lab`: prerequisite, transfer model, scale-gated status.
7. Related triggers and insights.
8. Contextual Request a Call.

`[OPEN]` Approved public beta fee and payment rule.

### 5.6 Organization Design, `/practices/organization-design/`

**Purpose:** Redesign authority, roles, job architecture, decisions, and change so the strategy can operate.

**Blocks:**

1. Practice role and buyer situations.
2. Entry, `خارطة الصلاحيات / Where Decisions Stop`: trace 2 to 3 material decisions, baseline latency, formal versus actual holder, missing thresholds.
3. Decision Delay Trace gated template.
4. Flagship, `إرساء النموذج المؤسسي / The Install`: authority baseline, role and decision architecture, job architecture, enactment register, operating evidence pack.
5. Completion condition: at least two material authority thresholds moved, used in live decisions, and observed against baseline.
6. Scale, `فحص الصلاحيات الدوري / Standing Review`: only after installed baseline and first hold check.
7. Related triggers and proof standard.
8. Contextual Request a Call.

Do not publish price anchors. Prices remain proposal-only.

### 5.7 The Operating Model, `/practices/operating-model/`

**Purpose:** Put AI into real work by defining workflow, authority boundary, named human owner, controls, escalation, adoption, and business accountability.

**Blocks:**

1. Practice role and business/technology boundary.
2. Entry, `القيمة المعلّقة / Value on Hold`: live workflow, intended result, collision map, value proxy, baseline, smallest organizational change.
3. Value Collision Map gated template.
4. Flagship, `نموذج تشغيل وكلاء الذكاء الاصطناعي / AI Operating Model`: designed organizational model, roles, boundaries, controls, human ownership, change and accountability. Mark `[PROOF-GATED]`.
5. Agent-to-Owner Blueprint gated template. Arabic only until English is independently drafted.
6. Scale, `سجل المسؤولية / Accountability Review`: only for an installed agent estate and versioned baseline. Mark `[SCALE-GATED]`.
7. Related triggers and insights.
8. Contextual Request a Call.

Never imply Linkgurus builds, integrates, secures, deploys, or operates the technology.

### 5.8 Approach & proof hub

**Purpose:** Answer how work moves and what evidence supports each claim.

**Blocks:**

1. Six-stage 6A path.
2. T7 completion promise.
3. Responsibility split.
4. Proof standard.
5. Founder experience with explicit limits.
6. Case-study area only if eligible cases exist.
7. Request a Call.

### 5.9 How we work

**Blocks:**

1. `Awaken`: establish mandate, result, scope, decision authority.
2. `Assess`: baseline roles, authority, workflow, information, measures, and change readiness.
3. `AI Fit`: Now, Later, or No based on result, workflow, value, data/access viability, human owner, boundary control, and change capacity.
4. `Anchor`: target roles, authority, operating principles, measures, escalation.
5. `Align`: enact roles, authority, controls, capability, communications, and change.
6. `Ascend`: live use, stabilization, correction, versioned baseline, and review.
7. Completion promise and responsibility split.
8. Request a fit call.

### 5.10 What counts as proof

Publish this standard before any case studies:

1. Buyer situation and measured before-state.
2. Exact offer and scope.
3. Role, authority, workflow, or decision change.
4. Evidence of use in live operation.
5. Hold observation at an appropriate review point.
6. Client-approved result and permission state.
7. Causal limits, including what Linkgurus did not cause.
8. Exact offer or principle validated.

An approved design, delivered report, participant count, satisfaction quote, unnamed anecdote, or market trend is not sufficient firm proof.

### 5.11 Founder experience

**Purpose:** Transfer legitimate operator credibility without converting employer-owned work into Linkgurus case proof.

**Blocks:**

1. Founder role within Linkgurus.
2. Verified experience statements only.
3. Clear distinction between founder history and Linkgurus delivery.
4. Current practice boundary.
5. Authored insights.
6. Request a Call.

`[OPEN]` Verify public wording, dates, scope, ownership, and permission for all named employer or client experiences before this page launches.

### 5.12 Case studies index and detail

- Keep routes absent from navigation and sitemap until at least one case is eligible.
- Empty states must not simulate evidence.
- Each case follows the eight-part proof standard.
- Every claim stores `evidence_status`, `permission_status`, `offer_validated`, `review_date`, and `causal_limits`.

### 5.13 Insights hub, topic pages, and article

**Hub blocks:** featured evidence-led article, four topics, template routes, briefing signup, contextual call CTA.

**Topics:** authority and organization design, AI investment decisions, adoption and value realization, AI agents and accountability.

**Article template:**

1. One named trigger.
2. One argument.
3. Fact, inference, hypothesis, and unknown separation.
4. Dated sources.
5. Practical implication.
6. One relevant template.
7. One relevant trigger or entry-offer CTA.
8. Author and review date.

Do not use invented scenarios that read like client cases.

### 5.14 Templates hub

**Purpose:** Let a visitor understand the use of each instrument before exchanging an email address.

**Blocks:**

1. What these templates are and are not.
2. Trigger-based filter.
3. Available templates.
4. Language and release status.
5. Privacy and email-delivery explanation.
6. Briefings opt-in as a separate optional control.

Every template detail page contains:

1. Template name in the current language.
2. Situation it helps inspect.
3. What the user completes.
4. What it does not diagnose or prove.
5. Accessible preview image or structured preview.
6. Format, size, language, and version.
7. Email gate form.
8. Relevant trigger and entry offer.
9. Version and provenance note.

### 5.15 Template delivery result pages

**`template-request-received`:** Same response for new and existing emails. State that an email will be sent if the address can receive mail. Do not reveal whether the email already exists.

**`download/[opaque-token]`:** Validate token server-side, stream the selected file, set `Content-Disposition: attachment`, then invalidate the token after first successful use. Expired or used tokens show a safe request-again route. Page is `noindex`, `nofollow`, with `Referrer-Policy: no-referrer`.

### 5.16 About

**Blocks:**

1. Corporate promise and category.
2. Purpose, Integrity, Wealth.
3. Mission and vision.
4. Three practices.
5. Founder relationship to the firm.
6. Business/technology boundary.
7. Private-sector GCC focus only if final entity and geography wording are verified.
8. Request a Call.

`[OPEN]` Legal entity, contracting geography, physical location, delivery team model, and verified founder biography.

### 5.17 Request a Call

**Required fields:** name, work email, organization, role, country, live trigger, decision date or event, short context, preferred language, privacy acknowledgement.

**Optional fields:** phone, selected practice/offer, referral source.

**Hidden context:** `source`, `trigger`, `practice`, `offer`, `template`, `article`, initial landing page, UTM allowlist.

**Behavior:**

- Validate server-side.
- Store one lead record and one enquiry event.
- Send acknowledgement to the visitor and notification to the response owner.
- Do not promise acceptance or a response time until an operational SLA is approved.
- Success page explains the next step and links back to relevant content.

`[OPEN]` Response owner, destination inbox or CRM, SLA, scheduling link, spam protection provider, legal basis, retention period.

### 5.18 Briefings

- Separate from a template request and from Request a Call.
- Require explicit unchecked marketing consent.
- Use double opt-in before marking the subscriber active.
- Store language and topic preferences.
- Every email includes unsubscribe.

`[OPEN]` Sender identity, frequency, editorial owner, topics, SMTP provider, privacy wording, retention policy.

### 5.19 Privacy, Terms, Accessibility, and 404

- Privacy must reflect the implemented data flows, processors, analytics, email delivery, forms, retention, and rights route. `[OPEN, legal review required]`
- Terms must define informational use, engagement by contract, download license, IP boundaries, and exclusions. `[OPEN, legal review required]`
- Accessibility must report tested behavior only. `[OPEN until QA]`
- 404 provides routes to trigger hub, practices, templates, and Home in the active language.

## 6. Bilingual content requirements

### 6.1 Independent voice, equivalent function

- `[FACT, current request]` Arabic and English are independently voiced, not sentence-by-sentence translations.
- Both versions must perform the same user task, preserve the same offer boundary, status, proof condition, form semantics, and next route.
- Arabic is authored first for core pages. English is a separate institutional counterpart.
- Do not publish a counterpart containing machine translation or placeholder prose merely to complete `hreflang`.
- Each locale has its own title, description, H1, body, CTA wording, alt text, validation messages, email subject/body, and PDF where applicable.

### 6.2 Content pair model

Each page record requires:

```yaml
id: stable-page-id
locale: ar | en
path: /...
counterpart_id: stable-page-id
status: draft | editorial-review | approved | proof-gated | published
voice_owner: linkgurus | kholoud
evidence_status: fact | inference | hypothesis | unknown
proof_requirement: null | short description
last_reviewed_at: ISO-8601 date
```

### 6.3 Known Arabic drafting gates

- Final native review of the category descriptor in commercial context.
- Final Arabic header and footer labels.
- Arabic About page and verified biography.
- Arabic legal pages.
- Arabic form consent, errors, and transactional email copy.
- Arabic accessibility statement after testing.
- Arabic agent/accountability terminology in buyer language.

### 6.4 Known English drafting gates

- English Agent-to-Owner Blueprint file and detail page.
- Corrected English Decision in View PDF title and metadata.
- English legal pages.
- English founder biography after verification.
- Independent English email delivery and consent copy.

## 7. Template registry and gated-delivery rules

### 7.1 Current artifact status

| Template family | Route | AR file | EN file | Release status | Primary route |
|---|---|---|---|---|---|
| Decision-to-Hold Map | `decision-to-hold-map` | One bilingual/mixed PDF | Same file | `[OPEN]` Confirm whether public lead magnet or internal portfolio map | Approved design not enacted |
| Decision in View / ورقة الحسم | `decision-in-view` | Present | Present | `[OPEN]` Correct English title/metadata, then publish both | AI investment decision |
| Challenge-to-Decision Board | `challenge-to-decision-board` | Present | Present | Asset-complete, editorial signoff required | Decision Lab |
| Decision Delay Trace, simplified | `decision-delay-trace` | Present | Present | Asset-complete, editorial signoff required | Growth made authority unclear |
| Decision Delay Trace, detailed | Same family, alternate version | Present | Missing | Hold detailed version from English route | Organization Design entry |
| Value Collision Map | `value-collision-map` | Present | Present | Asset-complete, editorial signoff required | Investment live, work unchanged |
| Agent-to-Owner Blueprint | `agent-to-owner-blueprint` | Present | Missing | Arabic route may publish only after explicit approval; no English counterpart | Agents without accountability |
| Decision Cadence Kit | Not created | Missing | Missing | `[OPEN]` Designed in research only, do not list as downloadable | Your Lab |
| Authority-in-Practice Blueprint | Not created | Missing | Missing | `[OPEN]` Designed in research only, do not list as downloadable | The Install |
| Authority Drift Ledger | Not created | Missing | Missing | `[OPEN]` Designed in research only, do not list as downloadable | Standing Review |
| Live Accountability Register | Not created | Missing | Missing | `[OPEN]` Designed in research only, do not list as downloadable | Accountability Review |

### 7.2 File location contract

- Public previews may be derived from the HTML sources under `assets/templates/`.
- Downloadable PDFs must be copied at deploy time into private server storage, not emitted into a public static directory.
- Database records reference an internal storage key, never a user-supplied filesystem path.
- No public page, HTML source, XML sitemap, JSON payload, or client bundle exposes the private file path.

### 7.3 Email gate form

**Required:** email, selected template ID, selected language, privacy acknowledgement.  
**Optional:** first name, organization, role.  
**Separate optional control:** unchecked consent to receive Linkgurus Briefings.

The requested file email is not treated as proof of ongoing marketing consent. `[OPEN]` Final legal wording and lawful basis require counsel review for the relevant jurisdictions.

### 7.4 Delivery sequence

```text
Template detail page
  -> POST /api/template-requests
  -> validate, normalize, rate-limit, and store request
  -> enqueue requested-resource email
  -> optionally enqueue separate briefing-confirmation email
  -> return generic success response
  -> worker sends email containing opaque short-lived download link
  -> GET /download/[token]
  -> validate hash, expiry, template, locale, and unused state
  -> stream PDF
  -> mark token used after successful response
```

`[RECOMMENDATION]` Use a 72-hour expiry for requested-resource links. The value is a product decision, not a compliance fact, and may be changed in configuration.

### 7.5 Transactional emails

Each locale requires:

1. Requested-template email: resource name, why it was requested, secure download button, expiry, request-again link, privacy link.
2. Briefings confirmation email, only when optional consent is selected.
3. Briefings confirmed email.
4. Unsubscribe confirmation.
5. Request a Call acknowledgement.
6. Internal Request a Call notification.
7. Delivery failure alert to the site operator.

`[OPEN]` Sender name, sender address, reply-to address, logo usage, footer entity data, physical mailing address where required, SMTP provider, bounce handling, and internal alert destination.

## 8. Technical implementation handoff

### 8.1 Reference architecture

`[RECOMMENDATION]` Use this baseline unless the coding agent documents an equivalent Hostinger-compatible replacement:

- Next.js with App Router, TypeScript, and server rendering where form/API behavior is required.
- Content stored as version-controlled Arabic and English MDX or structured TypeScript data.
- MySQL database on Hostinger.
- `mysql2` or an ORM that supports Hostinger MySQL without a long-running migration service.
- SMTP through a configured authenticated provider. Do not depend on PHP `mail()` or unauthenticated server sendmail.
- Nodemailer or equivalent SMTP client.
- A database-backed email job table plus a protected scheduled worker endpoint.
- Private filesystem storage for downloadable PDFs, with the directory supplied through an environment variable.
- GitHub integration or ZIP deployment through Hostinger's Node.js Web App deployment flow.

Hostinger currently documents Node.js web apps on Business hosting and supports Next.js. Hostinger also documents a built-in server-mail limit of 10 messages per minute and 100 per day, and recommends SMTP as the alternative. Verify the exact purchased plan version and current limits in hPanel before deployment.

### 8.2 Environment variables

```text
APP_BASE_URL=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=
EMAIL_REPLY_TO=
INTERNAL_LEAD_RECIPIENT=
PRIVATE_TEMPLATE_DIR=
DOWNLOAD_TOKEN_PEPPER=
CRON_SECRET=
RATE_LIMIT_SALT=
ANALYTICS_ID=                 # optional, leave unset until approved
CAPTCHA_SITE_KEY=             # optional, provider undecided
CAPTCHA_SECRET_KEY=           # optional, provider undecided
```

No secret may enter source control or a client-side environment variable.

### 8.3 Database model

| Table | Key fields | Purpose |
|---|---|---|
| `templates` | `id`, `slug`, `practice`, `tier`, `status`, `version` | Stable template registry |
| `template_files` | `id`, `template_id`, `locale`, `storage_key`, `mime_type`, `byte_size`, `checksum`, `status` | Language-specific private files |
| `contacts` | `id`, `email_normalized`, `email_original`, `first_name`, `organization`, `role`, timestamps | Deduplicated contact record |
| `template_requests` | `id`, `contact_id`, `template_file_id`, `source_context_json`, `privacy_version`, timestamp | Resource-request event |
| `download_tokens` | `id`, `request_id`, `token_hash`, `expires_at`, `used_at`, timestamp | Single-use file access |
| `consent_events` | `id`, `contact_id`, `purpose`, `action`, `policy_version`, `locale`, timestamp | Append-only consent audit |
| `subscriptions` | `contact_id`, `status`, `locale`, `topics_json`, `confirmed_at`, `unsubscribed_at` | Briefings state |
| `email_jobs` | `id`, `type`, `contact_id`, `payload_json`, `status`, `attempts`, `next_attempt_at` | Retryable queue |
| `email_deliveries` | `id`, `job_id`, `provider_message_id`, `status`, `error_code`, timestamps | Delivery audit without email body |
| `enquiries` | `id`, `contact_id`, qualification fields, `source_context_json`, `status`, timestamp | Request a Call records |

`[OPEN]` Data retention, deletion workflow, export workflow, administrator roles, and backup policy.

### 8.4 API contract

| Method and route | Input | Output | Controls |
|---|---|---|---|
| `POST /api/template-requests` | email, template, locale, consent flags, context | Generic accepted response | Server validation, per-IP and per-email rate limit, honeypot, optional risk CAPTCHA |
| `GET /download/[token]` | opaque token | PDF stream or safe expired state | Hashed token, expiry, single use, no caching, no referrer |
| `POST /api/briefings/confirm` | opaque token | Confirmation result | Hashed, expiring, single-use token |
| `POST /api/briefings/unsubscribe` | opaque token | Generic result | No login required, idempotent |
| `POST /api/enquiries` | qualified-call form and context | Generic accepted response | Validation, rate limit, spam controls |
| `POST /api/internal/email-worker` | `Authorization: Bearer CRON_SECRET` | Batch result | Non-public, constant-time secret compare, bounded batch |

Never reveal whether an email address already exists. Never log full download tokens, complete token URLs, SMTP secrets, or raw form bodies.

### 8.5 Security requirements

- HTTPS only in production.
- Cryptographically random opaque tokens, at least 32 bytes before encoding.
- Store only a keyed hash of each token.
- Tokens are scoped to one file, one locale, one purpose, one expiry, and one use.
- Fixed trusted `APP_BASE_URL` when creating links. Do not construct email links from an untrusted Host header.
- Parameterized database queries.
- Strict allowlists for template ID, locale, source fields, and redirects.
- Rate limits apply per IP and per normalized email, with a global circuit breaker for email generation.
- Risk-based CAPTCHA only after suspicious behavior, not as the default first barrier.
- Security headers: CSP, HSTS after HTTPS is stable, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` globally and `no-referrer` on token pages, frame restrictions, and a narrow permissions policy.
- PDF response: `Content-Type: application/pdf`, safe fixed filename from registry, `Content-Disposition: attachment`, `Cache-Control: private, no-store`.
- Mask or pseudonymize email addresses in application logs.
- Record consent changes and security events, not message bodies or secrets.

### 8.6 Email worker behavior

- Claim jobs atomically.
- Use bounded batches and exponential retry.
- Do not retry permanent recipient errors indefinitely.
- Create a replacement download token only when retrying before any successful delivery.
- Record provider message ID and status.
- Alert the operator after final failure.
- `[OPEN]` Bounce and complaint webhook behavior depends on the selected SMTP provider.

### 8.7 SEO and indexing

- One self-canonical URL per locale.
- Reciprocal `hreflang` for complete pairs only.
- `x-default` points to Arabic home only if this is approved as the unmatched-language fallback. `[OPEN]`
- Do not index form-success, confirmation, unsubscribe-result, download-token, preview-source, or gated case pages.
- XML sitemap contains only indexable published URLs.
- Structured data: `Organization`, `WebSite`, `BreadcrumbList`, and `Article` only where fields are factual.
- Do not add aggregate ratings, reviews, client logos, service prices, or unsupported award schema.

### 8.8 Analytics events

Track events without sending raw email, name, company, form text, or tokens:

```text
trigger_selected
practice_viewed
offer_anchor_viewed
template_gate_viewed
template_request_submitted
template_email_queued
template_download_completed
briefing_optin_started
briefing_optin_confirmed
request_call_started
request_call_submitted
language_switched
```

`[OPEN]` Analytics provider, consent mechanism, event retention, and reporting owner.

## 9. Content and release gates

### 9.1 Required before prototype

- Use supplied fonts, logos, icons, and copied template sources.
- Build route skeletons and component states.
- Use approved master promise, three outcomes, practice names, offer names, 6A, T7, and boundary language.
- Render `[OPEN]` content as labeled prototype placeholders.

### 9.2 Required before staging

- Arabic and English content records exist independently for every staged route.
- Email provider and sender identity configured.
- MySQL schema migrated.
- Private file storage configured.
- Template file checksums verified.
- Form destinations and response ownership configured.
- Native Arabic editorial review completed for staged copy.
- English editorial review completed independently.

### 9.3 Required before public launch

- Legal review of Privacy, Terms, consent, retention, and download license.
- Accessibility QA against WCAG 2.2 AA target, including RTL, keyboard, focus, forms, error states, and PDFs.
- Security review of tokens, rate limiting, logging, SMTP, database access, and private storage.
- No empty case-study routes or simulated proof.
- No unverified founder, employer, client, outcome, or delivery-capacity claim.
- All published template language pairs pass title, metadata, file, and rendering checks.
- Email delivery, retry, bounce path, and unsubscribe tested end to end.
- Hostinger plan limits verified in the actual hPanel account.

### 9.4 Founder decisions still required

1. Public status of the Decision-to-Hold Map, lead magnet or internal portfolio artifact.
2. Whether the Arabic-only Agent-to-Owner Blueprint may publish before English exists.
3. Approved beta fee and payment rule for مجلس القرار.
4. Sender name, sender email, reply-to, and SMTP provider.
5. Legal entity and footer data.
6. Response owner, destination, and SLA for Request a Call.
7. Privacy, retention, consent, analytics, and cookie decisions after legal review.
8. Verified founder biography and allowed employer/client references.
9. Which case files and permissions can enter the proof ledger.
10. Whether `x-default` should point to Arabic home.

## 10. Coding-agent acceptance tests

### 10.1 Routing and language

- Every published Arabic page has the intended English counterpart or a deliberate unavailable state.
- Toggle retains page and equivalent offer anchor.
- No automatic geo redirect.
- Arabic document direction is RTL and layout is fully mirrored.
- Canonical and `hreflang` tags are reciprocal and valid.

### 10.2 Content integrity

- No nine-offer grid appears as nine equal first-screen invitations.
- No territory code appears in buyer-facing navigation.
- AI Fit is stage three everywhere.
- T7 is one public promise line, not a competing diagram.
- Business and technology implementation responsibilities are never conflated.
- Proof-gated and scale-gated offers are visibly labeled.
- No empty case-study, testimonial, logo-wall, or metric component ships.

### 10.3 Template gate

- Direct static PDF URL is unavailable.
- Valid request creates one request event and one email job.
- Repeated request returns the same generic success response.
- Email contains a secure link, not an attachment.
- Token is random, hashed at rest, file-scoped, expiring, and single-use.
- Used or expired token cannot download again.
- Arabic request receives Arabic email and Arabic file.
- English request receives English email and English file.
- Language-incomplete templates do not pretend to have a counterpart.
- Optional briefings consent does not block the requested file.

### 10.4 Forms and accessibility

- Forms work by keyboard and screen reader in AR and EN.
- Errors are localized and announced.
- Focus is visible and never trapped outside an intentional modal or mobile menu.
- Touch targets meet the stated minimum.
- Reduced-motion preference is honored.
- Color is never the only status signal.

### 10.5 Operations

- Secrets are server-only.
- Failed email jobs retry and finally alert an operator.
- Logs exclude raw tokens, raw form bodies, secrets, and full email addresses.
- Backup and restore are tested after retention policy approval.
- Actual Hostinger resource and email limits are recorded in deployment notes.

## 11. Working-folder asset map

The future coding agent should use only these sources:

```text
linkgurus-new-website-codex/
├── LINKGURUS-WEBSITE-BUILD-SPEC.md        this file, controlling handoff
├── BRAND_BUNDLE.md                        approved brand, IA, copy, proof detail
├── brand-design-system/
│   ├── Linkgurus-Design-System.html       visual source of truth
│   ├── fonts/                             Almarai and Instrument Sans
│   └── logos/                             Arabic, English, avatar SVGs
└── assets/
    ├── icons/
    │   ├── navigation/                    directional and utility UI icons
    │   ├── portfolio-families/            practice and offer icon families
    │   ├── process/                       method/process icons
    │   ├── territories/                   internal coverage, not public nav
    │   └── decision-heads/                experimental, not approved for core UI
    └── templates/
        ├── master/
        ├── the-lab/
        ├── organization-design/
        └── operating-model/
```

Do not scan the project root for copy during implementation. If a required decision is not in this file or `BRAND_BUNDLE.md`, mark it `[OPEN]` and request approval.

## 12. Original project inventory and decision contribution

The source inventory at synthesis start contained 158 files: 31 Markdown, 17 HTML, 11 PDF, 49 SVG, 30 TTF, 3 TXT, 2 PNG, and 15 `.DS_Store` files.

### 12.1 Top-level controlling files

| File | Decision contribution |
|---|---|
| `LINKGURUS-BRAND-HIERARCHY-FINAL.html` | Latest locked hierarchy, implementation boundary, master promise, 6A, T7, three practices, nine offers, beta posture |
| `LINKGURUS-FIRST-MONTH-BUYER-OUTCOMES.md` | Three executive outcomes, first paid entry, qualification, boundary language, initial content routes |
| `LINKGURUS-AGENTIC-ORGANIZATION-MASTER-VISUAL.html` | Master system visual for agentic organization and responsibility boundary |
| `LINKGURUS_REPOSITIONING_PREBUILD_GATE_2026-08-19.html` | Earlier blocker analysis and open questions, superseded where the later hierarchy resolves them |

### 12.2 Website handoff files present before this synthesis

| File group | Decision contribution |
|---|---|
| `LinkGurusAI/linkgurus-new-website-codex/BRAND_BUNDLE.md` | Consolidated brand, verbal system, visual tokens, sitemap, page brief, conversion rules, proof gates |
| `brand-design-system/Linkgurus-Design-System.html` | Controlling visual tokens, typography, logo, component and image rules |
| `brand-design-system/logos/LinkGuru-avatar.svg` | Avatar mark asset, no IA decision |
| `brand-design-system/logos/english-new-linkgurus-logo.svg` | English wordmark asset |
| `brand-design-system/logos/لينك-جوروز.svg` | Arabic wordmark asset |
| `assets/icons/decision-heads/README.md` | Marks decision-head family as experimental |
| Six `assets/icons/decision-heads/*.svg` files | Experimental framing, synthesis, decision, alignment, enactment, accountability motifs, not approved core UI |
| Nine `assets/icons/navigation/*.svg` files | Menu, close, search, download, external link, and explicit LTR/RTL directional assets |
| `assets/icons/portfolio-families/README.md` | Shared three-practice icon grammar |
| Eighteen `assets/icons/portfolio-families/**/*.svg` files | Three practice streams, nine offer icons, and six preview assets |
| Six `assets/icons/process/*.svg` files | Workshop, sprint, roadmap, decision, alignment, validation process motifs |
| Seven `assets/icons/territories/*.svg` files | T1 to T7 internal coverage, not public navigation |
| Four Almarai `.ttf` files plus `OFL.txt` | Arabic font assets and license, no IA decision |
| Twenty-six Instrument Sans `.ttf` files, including two variable fonts, plus `OFL.txt` and `README.txt` | Latin font assets and license, no IA decision |

### 12.3 Research files

| File | Decision contribution and current status |
|---|---|
| `Linkgurus-6A-philosophy-portfolio-and-website-recommendation.md` | 6A placement and website recommendation, superseded where final six-stage sequence differs |
| `Phase0-Strategic-Research-Brief-Linkgurus-Repositioning-pre-discovery.md` | Initial evidence, buyer, market, demand, capability, and business-model questions, discovery only |
| `Phase1-1-linkgurus-strategic-asset-audit-v2.md` | Ownership and proof classification across founder, personal, firm, and AI assets |
| `Phase1-2-linkgurus-founder-unfair-advantage-map.md` | Founder capability, proof gaps, strongest candidate advantages |
| `Phase2-1-Market-Scan-MENA-Advisory-Landscape.md` | External category and procurement context, not firm proof |
| `Phase2-2linkgurus-category-landscape-map.md` | Category scoring and whitespace, exploratory |
| `Phase3-1-linkgurus-situation-segments.md` | Situation segments and buyer prioritization |
| `Phase3-2-linkgurus-jtbd-analysis.md` | Buyer jobs and triggers feeding trigger-led IA |
| `Phase4-1-linkgurus-voc-language-scan.md` | Buyer language and trigger phrases, externally sourced and not final copy by itself |
| `Phase5-1-linkgurus-competitive-landscape.md` | Competitive patterns and category language to avoid |
| `Phase5-2-linkgurus-positioning-map.md` | Arabic-native and delivery-position mapping, exploratory |
| `Phase6-linkgurus-problem-shortlist.md` | Ranked problems informing five trigger routes |
| `Phase7-linkgurus-strategic-whitespace.md` | Candidate strategic spaces, superseded by final territory decision |
| `Phase8-1-linkgurus-strategic-territories.md` | Seven territory definitions retained internally |
| `Phase8-2-linkgurus-service-portfolio.md` | Three practices, nine offers, tiers, early names and pricing, later files control final status and wording |
| `Phase9-linkgurus-name-and-verbal-identity.md` | Name, tone, messaging, tagline exploration; final bundle controls selected lines |
| `Phase10-linkgurus-arabic-messaging-architecture.md` | Arabic register, glossary, messaging pillars, native-review gaps |
| `Phase11-linkgurus-white-paper-evidence-stress-test.md` | Evidence limits and external research boundaries |
| `Phase12-linkgurus-launch-roadmap.md` | Earlier launch and flagship plan, superseded by stress-tested alternative and final hierarchy |
| `Phase12-alternative-launch-roadmap-stress-tested.md` | Proof-before-scale correction and sequencing, controlling where not superseded |
| `Phase12-alternative-launch-roadmap-stress-tested.html` | Visual rendering of the same stress-tested roadmap, no additional decision |
| `Phase13-linkgurus-visual-identity-brief.md` | Visual tokens and constraints, final design-system HTML controls implementation |
| `Phase14-linkgurus-information-architecture-content-plan.md` | Core route tree, page briefs, cross-links, conversion paths, proof gaps |
| `Questions_answered.md` | No substantive headings or controlling IA decision found |
| `instructions.md` | Research process and evidence discipline, not public content |
| `linkgurus_philosphy.png` | Visual philosophy artifact, inspect as provenance only; final master visual controls public use |

### 12.4 Template-library source files

| File | Decision contribution |
|---|---|
| `Linkgurus-Templates/LINKGURUS-TEMPLATE-LIBRARY-RESEARCH-SYNTHESIS.md` | Master template, nine offer briefs, funnel mapping, bilingual design rules, provenance, status gaps |
| `Linkgurus-Templates/LINKGURUS-TEMPLATE-LIBRARY-CONVERSATION.md` | Process transcript and approval history, not a build source after this handoff |
| `Linkgurus-Templates/LINKGURUS-TEMPLATE-LIBRARY-VISUAL.html` | Visual library representation, useful for template previews and naming cross-check |

### 12.5 Original template output files

| Files | Decision contribution |
|---|---|
| `output/Portfolio Master/Decision-to-Hold-Map-Handoff.md`, `decision-to-hold-map.html`, `LinkGurus-Decision-to-Hold-Map.pdf`, `linkgurus-portfolio.png` | Master portfolio/template anatomy and rendered assets |
| `output/The Lab/Entry/decision-in-view-ar.html`, `decision-in-view-en.html`, `LinkGurus-Waraqat-Alhasm-Arabic-v3.pdf`, `LinkGurus-Challenge-Framing-Canva-English.pdf` | Decision in View Arabic/English sources and PDFs, English title requires correction |
| `output/The Lab/Flagship/challenge-to-decision-board-ar.html`, `challenge-to-decision-board-en.html`, and matching Arabic/English PDFs | Challenge-to-Decision Board pair |
| `output/Restructuring & Org Design/Entry/decision-delay-trace-ar.html` and `LinkGurus-Decision-Delay-Trace-Arabic.pdf` | Detailed Arabic Decision Delay Trace, English missing |
| `output/Restructuring & Org Design/Entry/decision-delay-trace-simple-ar.html`, `decision-delay-trace-simple-en.html`, and matching simplified PDFs | Bilingual simplified Decision Delay Trace pair |
| `output/Operating Model/Entry/value-collision-map-ar.html`, `value-collision-map-en.html`, and matching PDFs | Bilingual Value Collision Map pair |
| `output/Operating Model/Flagship/agent-to-owner-blueprint-ar.html` and Arabic PDF | Arabic Agent-to-Owner Blueprint, English missing |

### 12.6 Non-source files

The following fifteen `.DS_Store` files are Finder metadata and contain no IA, content, visual, or build decision:

```text
.DS_Store
LinkGurusAI/.DS_Store
LinkGurusAI/linkgurus-new-website-codex/.DS_Store
LinkGurusAI/linkgurus-new-website-codex/assets/.DS_Store
LinkGurusAI/linkgurus-new-website-codex/assets/icons/.DS_Store
LinkGurusAI/linkgurus-new-website-codex/assets/icons/portfolio-families/.DS_Store
LinkGurusAI/linkgurus-new-website-codex/assets/icons/portfolio-families/01-the-lab/.DS_Store
LinkGurusAI/linkgurus-new-website-codex/assets/icons/portfolio-families/02-restructuring-org-design/.DS_Store
LinkGurusAI/linkgurus-new-website-codex/assets/icons/portfolio-families/03-operating-model/.DS_Store
LinkGurusAI/linkgurus-new-website-codex/brand-design-system/.DS_Store
LinkGurusAI/linkgurus-research-codex/.DS_Store
Linkgurus-Templates/.DS_Store
Linkgurus-Templates/output/.DS_Store
Linkgurus-Templates/output/Operating Model/.DS_Store
Linkgurus-Templates/output/Portfolio Master/.DS_Store
```

## 13. External technical references

- Hostinger, Node.js Web App deployment and supported frameworks: <https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/>
- Hostinger, hosting parameters and server-based email limits: <https://www.hostinger.com/support/6976044-parameters-and-limits-of-hosting-plans-in-hostinger/>
- W3C, Web Content Accessibility Guidelines 2.2: <https://www.w3.org/TR/WCAG22/>
- Google Search Central, localized page variants and reciprocal `hreflang`: <https://developers.google.com/search/docs/specialty/international/localized-versions>
- OWASP, email validation and verification: <https://cheatsheetseries.owasp.org/cheatsheets/Email_Validation_and_Verification_Cheat_Sheet.html>
- OWASP, secure expiring single-use URL token pattern: <https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html>
- OWASP, logging and sensitive-data handling: <https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html>

## 14. Definition of done

This handoff is complete when the receiving tool can:

1. Render the full Arabic-first and English-counterpart sitemap.
2. Visualize every page in the stated block order.
3. Preserve the locked brand hierarchy and commercial boundary.
4. Mirror the full interface for RTL.
5. Route visitors from trigger to practice to offer status to exact proof boundary to one qualified call flow.
6. Present template previews, collect email, send the requested language file securely, and separate optional marketing consent.
7. Refuse to invent missing proof, legal text, biography, fees, sender details, language files, or operational configuration.
8. Build and deploy on a verified Hostinger Business-compatible Node.js and MySQL setup.

No additional project-root research is required for implementation. Every unresolved dependency is listed above as `[OPEN]`.
