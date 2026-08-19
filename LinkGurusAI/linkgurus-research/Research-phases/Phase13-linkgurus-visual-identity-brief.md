# Visual Identity Brief — Linkgurus

## Phase 11. Build-ready brief for the Arabic-first greenfield site. Revised 16 August 2026.

Scope: **Linkgurus corporate brand only.** Hand-coded build — no CMS, no Webflow, no e-commerce, no paid platform dependency. Companion visual: `Phase11-2-linkgurus-identity-directions.html`.

---

## 1. Decided

| Item | Decision |
|---|---|
| **Arabic typeface** | **Almarai** — SIL OFL, self-hostable |
| **Latin typeface** | **Instrument Sans** — SIL OFL, self-hostable |
| **Legacy amber `#FFB400`** | **Retired.** Belongs to the previous palette; carried by nothing in the repositioning |
| **Legacy wordmark** | **Retired.** Rounded lowercase contradicts the founder-selected voice (precise and senior, never playful) |
| **Existing hexagonal knot** | **Not reused.** Reads *network* — the horizontal signal P9 §1.2 identifies as the wrong business for this vertical territory |
| **Dark mode** | Out of scope for v1 |
| **Numerals** | Western digits (0–9), including inside Arabic text — procurement convention |
| **Colour direction** | **D24, 16 August 2026 — Direction 1 · Signal.** White ground, `#005CFF` accent. Founder decision. Directions 2 (Deep Field) and 3 (Graphite) are **retired**, not deleted — recorded in §3.5, dormant, not to be re-proposed |

---

## 2. Typography

**Almarai + Instrument Sans.** Chosen on metrics, not preference: normalised to 1000 units/em, Almarai's x-height is 514 and cap 716 (ratio **0.718**); Instrument Sans is 510 / 720 (ratio **0.708**). Within 4 units on both measures — the two scripts hold the same optical size at the same `font-size`, removing per-size tuning. Almarai carries full tashkīl coverage (all 8 marks, U+064B–U+0652), which D22 requires.

```css
:root{
  --lg-font-ar:    "Almarai", system-ui, sans-serif;
  --lg-font-latin: "Instrument Sans", system-ui, sans-serif;
  --lg-lh-ar:      1.9;   /* Arabic body */
  --lg-lh-latin:   1.6;   /* Latin body  */
  --lg-ar-scale:   1.08;  /* Arabic optical uplift at the same step */
  --lg-w-body:     400;
  --lg-w-strong:   700;   /* Almarai ships 300/400/700/800 — no synthesis */
}

[dir="rtl"], :lang(ar){
  font-family: var(--lg-font-ar);
  line-height: var(--lg-lh-ar);
  font-size: calc(1em * var(--lg-ar-scale));
  letter-spacing: 0 !important;  /* connected script — tracking breaks the joins */
  font-synthesis: none;          /* no faux bold, no faux italic */
}

.lg-tashkeel{ color: var(--lg-ink); background: var(--lg-bg); }  /* see §3 rule 4 */
.lg-figures{ font-variant-numeric: tabular-nums; }
```

**Binding rules**

1. **Never letterspace Arabic.** Latin display may take negative tracking; Arabic may not.
2. **No italic, no faux bold.** Emphasis comes from weight, colour or a rule — never slant.
3. **No `text-transform: uppercase`** on bilingual lines. Arabic has no case.
4. **Logical properties only** — `margin-inline-start`, not `margin-left`. One physical property silently breaks RTL.
5. **Subset must retain U+064B–U+0652.** Naive subsetters drop the tashkīl block and silently kill D22. Use `pyftsubset` or `glyphhanger`; self-host WOFF2, no CDN call.
6. **Test the lockup first**, at 16 / 32 / 96px — لينك جوروز · «مَن يقرر… وماذا يبقى» · the three category labels. This is the acceptance test, not a later check.

---

## 3. Colour — Signal, expanded

**Decided (D24): Direction 1 · Signal.** White ground, `#005CFF` accent, `#080808` ink. What follows is that palette expanded from eight tokens into a build-ready system: two primitive ramps, a semantic layer over them, and interaction states. Components reference the semantic aliases only and never a raw hex or a primitive step.

### 3.1 Primitives — two ramps, no third hue

The whole system is **one blue and one neutral**. Every value below is either from your extracted palette (marked ●) or interpolated between those anchors. Contrast figures are measured, not estimated.

**Neutral ramp** — the ground, the ink, and everything structural.

| Step | Hex | on `#FFFFFF` | Role |
|---|---|---|---|
| `--lg-n-0` | `#FFFFFF` ● | — | Page ground |
| `--lg-n-25` | `#FAFAFB` | 1.04 | Barely-there band, alternating rows |
| `--lg-n-50` | `#F4F5F6` ● | 1.09 | Card and section surface |
| `--lg-n-100` | `#EAEBEC` | 1.19 | Pressed surface, table header fill |
| `--lg-n-200` | `#DDDDDD` ● | 1.36 | Default border, hairline rule |
| `--lg-n-300` | `#C6C7C8` | 1.69 | Strong border, input border, diagram stroke |
| `--lg-n-400` | `#A0A1A2` | 2.59 | Disabled border, empty-state stroke |
| `--lg-n-500` | `#7B7C7D` | 4.18 | Disabled label — never body copy |
| `--lg-n-600` | `#585858` ● | 7.11 AAA | Muted ink, captions, table meta |
| `--lg-n-700` | `#3B3B3C` | 11.19 | Secondary heading ink |
| `--lg-n-800` | `#242425` | 15.51 | Reserved |
| `--lg-n-900` | `#131314` | 18.57 | Reserved |
| `--lg-n-950` | `#080808` ● | 20.03 AAA | Primary ink — **the only ink for tashkīl** |

**Blue ramp** — anchored on your three extracted blues; the rest is interpolation, not invention.

| Step | Hex | on `#FFFFFF` | white on it | Role |
|---|---|---|---|---|
| `--lg-b-50` | `#F2F3FF` ● | 1.10 | — | Tint block, quiet callout, selected row |
| `--lg-b-100` | `#DEE7FF` | 1.24 | — | Text selection, chart fill lightest |
| `--lg-b-200` | `#B9CEFF` | 1.57 | — | Chart fill, diagram wash |
| `--lg-b-300` | `#84ACFF` | 2.25 | — | Chart fill, non-semantic only |
| `--lg-b-400` | `#3D85FF` | 3.50 | 3.50 | Large-scale graphic fill ≥24px, rule |
| `--lg-b-500` | `#005CFF` ● | 5.28 AA | 5.28 AA | **Accent.** Mark, fills, display text ≥24px |
| `--lg-b-600` | `#0047C4` ● | 7.78 AAA | 7.78 AAA | **Accent-deep.** Links, body-size accent, hover fill |
| `--lg-b-700` | `#003693` | 10.77 | 10.77 | Active/pressed fill, visited link |
| `--lg-b-800` | `#002A73` | 13.30 | 13.30 | Deepest structural blue, diagram key line |
| `--lg-b-900` | `#001C4D` | 16.49 | 16.49 | Reserved — near-ink blue |

### 3.2 Semantic layer — the only names a component may use

```css
:root{
  /* ground & surface */
  --lg-bg:            var(--lg-n-0);
  --lg-surface:       var(--lg-n-50);
  --lg-surface-sunk:  var(--lg-n-25);
  --lg-surface-press: var(--lg-n-100);
  --lg-tint:          var(--lg-b-50);      /* the one blue ground */

  /* ink */
  --lg-ink:           var(--lg-n-950);     /* body, headings, tashkīl */
  --lg-ink-secondary: var(--lg-n-700);
  --lg-ink-muted:     var(--lg-n-600);     /* 7.11 — still AAA */
  --lg-ink-disabled:  var(--lg-n-500);
  --lg-ink-on-accent: var(--lg-n-0);

  /* line */
  --lg-border:        var(--lg-n-200);
  --lg-border-strong: var(--lg-n-300);
  --lg-rule-accent:   var(--lg-b-500);     /* the named rule, ~2% of surface */

  /* accent */
  --lg-accent:        var(--lg-b-500);
  --lg-accent-deep:   var(--lg-b-600);
  --lg-accent-press:  var(--lg-b-700);

  /* interaction */
  --lg-link:          var(--lg-b-600);
  --lg-link-hover:    var(--lg-b-700);
  --lg-link-visited:  var(--lg-b-800);
  --lg-focus:         var(--lg-b-600);     /* 7.78 on bg, 7.13 on surface */
  --lg-selection-bg:  var(--lg-b-100);
  --lg-selection-ink: var(--lg-n-950);

  /* interface-critical — §3.4 governs where this may appear */
  --lg-critical:      #A32013;             /* 7.57 on bg */
  --lg-critical-deep: #7E1810;             /* 10.37 on bg */
  --lg-critical-tint: #FDF0EE;
}
```

**Component state matrix** — derived, not decided per component.

| Element | Rest | Hover | Active | Focus | Disabled |
|---|---|---|---|---|---|
| Primary button | `b-500` fill / white | `b-600` | `b-700` | ring `--lg-focus` | `n-100` fill / `n-500` |
| Secondary button | `bg` / `n-300` border / ink | `n-50` fill | `n-100` fill | ring | `n-25` / `n-400` border |
| Text link | `b-600` underlined | `b-700` | `b-700` | ring | `n-500`, no underline |
| Input | `bg` / `n-300` border | `n-600` border | — | ring + `b-600` border | `n-25` / `n-400` |
| Table row | `bg` | `n-25` | — | ring | — |
| Selected row | `b-50` fill + `b-500` inline-start rule 2px | — | — | — | — |

### 3.3 Non-colour encoding — the diagnostic constraint

§5 forbids red as a failure state in client-facing diagnostics: status colour converts the agentless «يتوقف» back into blame. That removes the entire red/amber/green vocabulary from exactly the surfaces that most want it — authority-threshold tables, RACI grids, the decision-rights map. The replacement is **presence and absence**, not hue:

| Meaning | Encoding | Never |
|---|---|---|
| Owned / held | `--lg-ink` label + solid `n-300` cell border | Green |
| Named but unassigned | Empty cell, `n-200` border, no fill, no glyph | Amber |
| Absent | `n-400` 1px diagonal hatch on `n-0`, label in `n-600` | Red |
| The one thing being pointed at | `--lg-rule-accent` 2px inline-start rule + `b-50` fill | Red, badge, exclamation |

Sequential data (spans, layers, headcount) uses the blue ramp `b-200 → b-800` as a **lightness sequence**, which survives every form of colour-vision deficiency because it is one hue. Categorical series alternate blue and neutral (`b-600`, `n-600`, `b-300`, `n-400`) and must also carry a label or a fill pattern — never colour alone.

### 3.4 Binding rules

1. `--lg-accent` (`b-500`) is for marks, rules, fills and display text **≥24px**. `--lg-accent-deep` (`b-600`) is the only accent allowed on body copy and links.
2. `--lg-bg` against `--lg-surface` is **1.09** — adjacent surfaces, not a text pair. Separate them with `--lg-border`, never by contrast alone.
3. **Any text carrying tashkīl uses `--lg-ink` on `--lg-bg` only.** Diacritics are 1–2px marks; WCAG's 4.5:1 threshold was calibrated for Latin stems, so a pairing that passes the audit can still render vowelled Arabic unreadable. No accent, no muted ink, no tint ground, no reversed treatment — at any size. This binds the corporate line «مَن يقرر… وماذا يبقى» and the T7 spine, both of which are set with tashkīl (D22).
4. **Focus is a double ring**: 2px `--lg-focus` + 2px `--lg-bg` offset, so it reads on white, on `b-50`, and on a filled `b-500` button without a per-context override. Never `outline: none`.
5. **Blue coverage is rationed to roughly 10% of any viewport.** Signal's whole character is high-contrast blue-on-white; blue used as a general surface fill turns it into a SaaS marketing page and gives up the seniority the voice requires.
6. `--lg-critical` is for **interface failure only** — a form that did not submit, a file that did not upload. It is **forbidden in every client-facing diagnostic, report, table or diagram**, at any size. If a designer reaches for it to mark an organizational finding, the answer is §3.3.
7. No gradient, no shadow, no glow, at any step of either ramp. Depth is a border. This also holds the line against the AI-visual clichés in §5.

### 3.5 Retired — recorded, dormant, not re-proposed

**Direction 2 · Deep Field** (ink ground `#08090B`, blue lifted to `#4D86FF`) and **Direction 3 · Graphite** (near-monochrome, rationed vermilion `#C4361B`) are retired by D24. Retained here as record per the D9 convention; not to be re-proposed or re-argued.

**One consequence of D24 carries forward, stated once.** `#005CFF` sits at **ΔE 2.18** from McKinsey's `#2251FF` and **ΔE 4.01** from Design Sprint Academy's `#1551EA`. Deep Field existed to escape that collision by changing ground; keeping Signal keeps the collision. It is not fatal, and it is now a **design constraint rather than an open question**: hue no longer differentiates this brand, so differentiation has to be carried entirely by the things Signal does not share with those firms — the Arabic-first lockup where Arabic is the source and Latin the derivative (§4), the Almarai/Instrument Sans pairing, the empty-proof layout discipline (§5), and the absence of the consulting-visual vocabulary. **INFERENCE, high confidence:** a viewer who has seen a McKinsey page will not consciously register the blue as borrowed, but the burden of distinctiveness now sits entirely on structure and typography. Build accordingly.

---

## 4. Logo — three territories

The mark is redrawn, not inherited. Deliver **SVG with live paths, a tight viewBox, and a single colour inheriting `currentColor`**, with light- and dark-ground variants defined from the start.

| | Territory | Modern in what way | Flips between scripts? |
|---|---|---|---|
| **I** | **The Letterform** «الحرف» — mark built from Arabic letterforms, Latin derived from it | Regionally current; the Vision-era Saudi identity language | **No** — moves side |
| **II** | **The Threshold** «حدود القرار» — two planes meeting at a defined edge | Reductive-geometric | **Yes** — a threshold carries direction |
| **III** | **The Register** «السجل» — rules where exactly one is named | Information-structural | **No** — re-composed around the reading entry |

**Territory I is the recommendation.** It makes the Arabic-first decision visible rather than merely operational, and it inverts the usual order: the Arabic becomes the source and the Latin the derivative, which is the only structure that matches an Arabic-first company. Draw the monogram from a **Kufic skeleton** — flat terminals, geometric joints, one stroke weight — reduced far enough to function as a shape rather than as reading. Candidate sources: the ق of قرار, the ص of صلاحيات. Failure mode: staying too literal, where a recognisable letter reads as an initial and lands back on the founder rather than the firm.

### 4.1 The Arabic lockup is not the Latin one mirrored

1. **No cap height.** Arabic has no case and no cap line, so the mark cannot align to the Arabic wordmark the way it aligns to the Latin. Align to the dominant horizontal stroke.
2. **No uppercase.** Latin buys authority with capitals; Arabic cannot. Authority comes from weight, width and calligraphic register — Kufic reads structural, Naskh bookish, Thuluth ceremonial.
3. **No letterspacing.** The equivalent operation is controlled elongation (kashida), which has its own rules and cannot be done by eye.
4. **Irregular bounding box.** «لينك جوروز» carries the deep descender ج alongside the ascenders ل and ك, so the Arabic wordmark is taller and less rectangular than the Latin. Budget 15–20% more vertical room; do not shrink the Arabic to fit the Latin's box.
5. **Arabic sets optically darker.** Connected strokes put more ink on the page — draw the Arabic about a half-weight lighter to match the Latin's colour.
6. **Mirror only what carries direction.** Forms with implied motion must flip; forms with fixed identity must not. Forms carrying emphasis are re-composed around the reading entry point, not flipped.

**Name-specific:** «لينك جوروز» is a phonetic transliteration carrying no meaning in Arabic (P9 §1.2), so the Arabic wordmark cannot lean on recognition — it must work as a shape. It is drawn in the same skeleton as the mark, never set in a font.

**Binding (P9 §5.6):** the wordmark never appears alone on an Arabic page above the fold. The corporate line «مَن يقرر… وماذا يبقى» always accompanies it, carrying the meaning the name does not. Set the fatha on مَن; set the tanwīn on قرارٌ (D22).

---

## 5. Do not

- **AI-visual clichés** — neural nodes, glowing brains, circuit motifs, particle fields, and blue-to-purple gradients in every form. The 42%-of-AI-initiatives-scrapped finding makes AI-adjacent enthusiasm an objection trigger, not a credibility signal.
- **Consulting clichés** — lightbulbs, jigsaws, chess pieces, summits, arrows-through-targets, handshake stock.
- **Implied social proof** — no logo wall, no "trusted by", no client counts, no testimonials, no badges. None exist (Block G29). The layout slots where proof normally sits are structurally empty; fill them with the thinking itself — a diagram, an authority-threshold table, a worked example.
- **AI-generated people, rooms or work.** A synthetic photo of a workshop that never happened *is* placeholder proof, and this firm sells named accountability.
- **Red as a failure state** in any client-facing diagnostic. Status colour converts the agentless «يتوقف» back into blame. Show deficit as absence, in neutral ink.
- **Motion on load, and gradients.** Motion is feedback to a user action only, ≤150ms, respecting `prefers-reduced-motion`. Surfaces stay flat and matte.
- **Anything from designsprint.academy** — `#1551EA`, DM Sans + Bai Jamjuree, the repeated circled-arrow icon, `border-radius: 20px` as a house texture, the cart chrome, the "Better decisions" verbal family.

---

## 6. Open

1. ~~**Colour direction**~~ — **closed by D24, 16 August 2026.** Direction 1 · Signal, expanded in §3.
2. **Logo territory** — I, II or III, then a design pass. The only open item in this file.

---

## 7. Companion

`Phase11-1-linkgurus-design-system-prompt.md` — the pasteable build prompt that turns §2 and §3 into a working token file, component set and live specimen. It is generated *from* this brief; if the two disagree, this file governs.
