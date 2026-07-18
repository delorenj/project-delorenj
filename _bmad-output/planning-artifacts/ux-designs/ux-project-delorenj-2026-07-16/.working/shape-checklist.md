# SHAPE + COMPLIANCE CHECKLIST — Cel-Shaded Portfolio (DESIGN.md + EXPERIENCE.md)

Consumed by two drafters and by reviewers. Every `[ ]` is a hard gate. **Both spines WIN on conflict with any mock, import, or component-library default.** Dark tokens are primary; light is the secondary set.

---

## A. DESIGN.md — Frontmatter (YAML, keys in this exact order)

```
[ ] name          string        — required, brand/system name
[ ] description   string        — one line: what this system is
[ ] colors        flat object   — kebab-case keys → hex strings ('#1A1B1F')
[ ] typography    nested object — role → { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } (any subset; `note:` allowed for platform-native)
[ ] rounded       object        — sm / DEFAULT / md / lg / xl / full (full = 9999px)
[ ] spacing       object        — numeric levels ('1','2'…) and/or named tokens (gutter, margin-mobile, editorial-gap)
[ ] components     object        — component-name → token object, values or {path.to.token} refs
```

Order is LOCKED. No extra top-level keys. Hex only in `colors` (no `rgb()`, no named CSS colors).

- [ ] **Light secondary set present**: every dark token has a `-light` suffixed sibling (`ink-primary` / `ink-primary-light`) OR a clearly-labeled separate block. Dark is the primary/unsuffixed set.
- [ ] **grit→neon ramp** encoded as six flat kebab tokens, ordered darkest-grit → brightest-neon (e.g. `ramp-grit-0` … `ramp-neon-5`), each with a `-light` sibling. All six bands non-empty and monotonic in the intended direction.
- [ ] **Cel-shade primitives are tokens, not prose-only**: toon ramp bands, `ink-outline` color/width, `halftone` dot color/scale exist as frontmatter tokens or `components` entries so the resolver can reach them.

---

## B. DESIGN.md — Body sections (order-locked when present)

```
[ ] 1. Brand & Style          — aesthetic posture / brand voice lives HERE (not in EXPERIENCE)
[ ] 2. Colors                 — per-color story incl. the six grit→neon bands' roles
[ ] 3. Typography             — type roles, ramp, rules
[ ] 4. Layout & Spacing       — scale narrative, grid, margins, gutters, breakpoints
[ ] 5. Elevation & Depth      — shadow/tonal-layering language
[ ] 6. Shapes                 — corner-radii logic
[ ] 7. World Render Language (Cel-Shade)   ← INVENTED, immediately after Shapes
[ ] 8. Components             — per-component visual specs
[ ] 9. Do's and Don'ts        — hard visual rules table
```

Omittable sections may be dropped, but present sections MUST appear in this order. The invented section sits at slot 7 (after Shapes, before Components).

- [ ] **World Render Language (Cel-Shade)** covers ALL of: the toon ramp (banding/threshold logic), the ink outline (weight, when it thickens), the halftone (where/scale), the six-band grit→neon ramp (reference each `{colors.ramp-*}` token), AND an explicit statement of how the **2D chrome dialect mirrors the 3D world** (same ramp, same ink, same halftone read at UI scale).

---

## C. EXPERIENCE.md — Sections (order-locked when present)

```
[ ] 1.  Foundation                                       — form-factor + UI-system note; "DESIGN.md is the visual reference"
[ ] 2.  The Two-Layer Contract (Spectacle ↔ Truth)       ← INVENTED (framing; right after Foundation)
[ ] 3.  Information Architecture
[ ] 4.  Voice and Tone                                   — MICROCOPY ONLY (brand voice lives in DESIGN.md Brand & Style)
[ ] 5.  Component Patterns                                — BEHAVIORAL only (visual specs live in DESIGN.md Components)
[ ] 6.  State Patterns
[ ] 7.  Interaction Primitives
[ ] 8.  World Navigation & Camera Interaction            ← INVENTED (after primitives)
[ ] 9.  Fidelity-Tier & Reduced-Motion Degradation Ladder ← INVENTED (before Accessibility Floor)
[ ] 10. Accessibility Floor                               — BEHAVIORAL (visual contrast lives in DESIGN.md)
[ ] 11. Responsive & Platform                            — TRIGGERED, include
[ ] 12. Inspiration & Anti-patterns                      — TRIGGERED, include
[ ] 13. Key Flows                                        — always last; named-protagonist journeys, each with a climax beat
```

- [ ] Voice and Tone contains NO aesthetic/brand-posture prose — only Do/Don't microcopy pairs.
- [ ] Component Patterns describe behavior/rules only — zero color/size/radius values (those are DESIGN.md).
- [ ] Accessibility Floor is behavioral (roles, focus order, reduced-motion, tap targets, live-regions) — no contrast ratios (those trace to DESIGN.md tokens).

---

## D. Cross-Reference Rule ({path.to.token})

- [ ] Every visual value EXPERIENCE.md leans on is named by `{path.to.token}` (e.g. `{colors.ramp-neon-5}`, `{typography.title.fontSize}`, `{rounded.md}`, `{spacing.gutter}`), never restated as a literal hex/px.
- [ ] Every `{path.to.token}` in EITHER file resolves to a real token that exists in DESIGN.md frontmatter following the YAML path. No dangling refs, no typos, no invented paths.
- [ ] Inside DESIGN.md `components`, refs point at `colors.*`, `typography.*`, `rounded.*`, or `spacing.*` — the resolver flattens at consumption; no circular refs.
- [ ] Where EXPERIENCE.md and a mock/import disagree, the spine's token/rule is authoritative — annotate "Spine wins on conflict" at composition-reference callouts.

---

## E. Taste-Design ANTI-SLOP Ban List (hard checks, both files)

```
[ ] FONT       — no Inter anywhere
[ ] FONT       — no generic serifs (Times / Georgia / Garamond); distinctive display/text faces only
[ ] COLOR      — never pure #000000 (use a near-black grit token)
[ ] COLOR      — at most ONE primary accent per theme; saturation discipline (neon reserved to the ramp's top band, not sprayed on chrome)
[ ] COLOR      — no neon outer-glow cliché (glow is not the depth device)
[ ] COPY       — no fabricated metrics/statistics/uptime/response-times; use [metric] placeholders when real data is absent
[ ] COPY       — no AI clichés: Elevate / Seamless / Unleash / Next-Gen (and kin)
[ ] COPY       — no "LABEL // YEAR" formatting
[ ] UI         — no emojis in the product UI
[ ] LAYOUT     — full-height uses min-h-[100dvh], never h-screen
[ ] MOTION     — animate transform / opacity only (no layout/color/filter animation on the hot path)
```

---

## F. Product-Specific Quality Gates (cel-shaded portfolio)

```
[ ] 1. CEL DIALECT UNITY — the same toon ramp + ink outline + halftone read at ALL THREE layers:
        3D world, 2D chrome, and the static/low-fi fallback. No layer drops the dialect.
[ ] 2. SIX-BAND RAMP COMPLETE — grit→neon covers all 6 bands (dark + light), monotonic, each band
        given a stated role in DESIGN.md Colors + World Render Language. No gaps, no 7th band.
[ ] 3. TRUTH LAYER STAYS SOBER — the "Truth" side of the two-layer contract is quiet and legible:
        high-contrast body text, no spectacle bleed, neon/halftone suppressed where content must be read.
[ ] 4. DEGRADATION LADDER PRESENT & COMPLETE — every fidelity tier from full-spectacle down through
        reduced-motion to fully static has a defined render; reduced-motion path never breaks the cel look.
[ ] 5. EVERY PERSONA HAS A CLIMAX — each Key Flow uses a NAMED protagonist and lands one explicit
        climax beat (the moment spectacle resolves into truth / the work is revealed).
[ ] 6. TWO-LAYER CONTRACT IN BOTH SPINES — DESIGN.md (World Render Language) and EXPERIENCE.md
        (The Two-Layer Contract section) describe Spectacle↔Truth consistently; neither contradicts the other.
[ ] 7. CHROME MIRRORS WORLD — DESIGN.md explicitly states, and Components demonstrate, that 2D UI
        chrome is derived from the 3D world dialect (shared ramp/ink/halftone tokens), not a separate style.
[ ] 8. CAMERA IS AN INTERACTION PRIMITIVE — World Navigation & Camera Interaction defines camera moves
        (transform/opacity only) with keyboard + pointer + reduced-motion equivalents, tied to the ladder in gate 4.
```

---

## G. Reviewer Fast-Fail Order

1. Frontmatter key order (Section A) → 2. Body section order, both files (B, C) → 3. `{path.to.token}` resolves (D) → 4. Ban list scan (E) → 5. Eight product gates (F). Any single failed `[ ]` blocks acceptance; fix in place, re-run from the failed step.