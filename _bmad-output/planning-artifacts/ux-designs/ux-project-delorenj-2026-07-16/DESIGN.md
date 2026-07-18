---
name: Career Ascent
description: The cel-shaded, dark-anchored visual system for Career Ascent — a scroll-driven 3D "career world" where color earns altitude from radio-era grit to agentic-AI neon, spoken as one ink-outlined poster dialect across World, Chrome, and the Static Timeline.
status: final
updated: 2026-07-18
sources:
  - ../../prds/prd-project-delorenj-2026-07-15/prd.md
  - ../../prds/prd-project-delorenj-2026-07-15/addendum.md
  - ../../architecture/architecture-project-delorenj-2026-07-16/ARCHITECTURE-SPINE.md
# Frontmatter key order: doc-meta keys FIRST (name, description, status, updated, sources),
# then the token blocks in spec order (colors, typography, rounded, spacing, components).
# `status` and `updated` are intentionally top-level — the bmad-ux resume scanner reads them there.
colors:
  # ── CANVAS & SURFACES (dark = primary/baseline) ──────────────────────────
  # Chrome plates are OPAQUE — no alpha, no backdrop-blur. A transparent plate would
  # let the worst-case band bleed through and void every ≥4.5:1 text guarantee below.
  canvas: '#0B0F1A'            # deep-space navy-black; primary canvas (never #000)
  canvas-deep: '#05070D'       # deepest void; deep-space band backdrop only
  surface-plate: '#141B2A'     # cel plate for HUD / panels (lighter than canvas)
  surface-raised: '#1C2536'    # raised plate: loot callouts, waypoint markers
  surface-sunken: '#0E1420'    # sunken well: timeline-rail trough
  keyline: '#2A3446'           # DECORATIVE cool hairline — text-labeled plate edges only (identified by content)
  keyline-interactive: '#5E6B82' # INTERACTIVE boundary — ≥3:1 vs canvas (3.55:1) AND plate (3.20:1); button-ghost etc.
  # ── INK (outlines + text) — outline is NEVER pure black ──────────────────
  ink-outline: '#0A0E16'       # default cool near-black contour (chrome + world)
  ink-outline-warm: '#120D08'  # warm-black outline for ground / low bands
  ink-outline-cool: '#04121A'  # cool-black outline for orbit / deep-space bands
  ink-primary: '#EDF1F7'       # high-contrast off-white text (15.2:1 on plate, 16.9:1 on canvas)
  ink-secondary: '#B4C0D2'     # muted labels / secondary prose (9.4:1 plate, 8.4:1 raised)
  ink-tertiary: '#8A97AB'      # faint telemetry / rest-state labels (5.8:1 plate, 6.2:1 sunken)
  # ── HALFTONE / COMIC TEXTURE ─────────────────────────────────────────────
  halftone-dot: '#0A0E16'      # dot-screen + cross-hatch ink laid in shadow bands
  # ── ONE DISCIPLINED CHROME ACCENT (the connective "advancement" hue) ─────
  accent: '#12E0C8'            # signal-teal: focus core, active state, through-line, single CTA
  accent-press: '#0FB7A4'      # pressed/darker teal for active buttons
  # ── FOCUS RING (dual-backdrop concentric pair) ───────────────────────────
  focus-core: '#12E0C8'        # teal core stripe
  focus-halo-ink: '#05070D'    # dark ring — reads on bright-cloud backdrops
  focus-halo-paper: '#EDF1F7'  # light ring — reads on deep-space backdrops
  # ── SIX-BAND GRIT→NEON RAMP (base poster fills; chroma climbs monotonically) ──
  # Perceptual CIELCh chroma: 8.9 → 10.6 → 13.4 → 16.1 → 49.9 → 77.5 (floor → summit).
  ramp-grit-0: '#64564C'       # BAND 1 ground — desaturated matte rust/gunmetal (LOWEST chroma, warm hue)
  ramp-grit-1: '#5B6B7A'       # BAND 2 low-atmosphere — steel-slate (first gloss)
  ramp-lift-2: '#6E8296'       # BAND 3 clouds — luminous muted slate (header/atmosphere fill; never a reading-text bg)
  ramp-lift-3: '#3E6B72'       # BAND 4 stratosphere — desat-teal (chroma pivot)
  ramp-neon-4: '#12E0C8'       # BAND 5 orbit — plasma-teal (full neon arrival)
  ramp-neon-5: '#FF3D9A'       # BAND 6 deep-space — plasma-magenta (peak neon)
  # ── PER-BAND WORLD FILLS · SHADOW · DIEGETIC EMISSIVE (world-only accents) ─
  band-ground-fill: '#B07C42'      # ground light poster step (world-diegetic detail, not the ramp anchor)
  band-ground-shadow: '#4E3117'    # ground shadow band (cross-hatch)
  band-ground-dust: '#C2B9A7'      # ground neutral dust
  band-ground-emissive: '#7CF06E'  # phosphor green — the ONE glow down here
  band-low-fill: '#7E8E9C'
  band-low-shadow: '#33404B'
  band-low-emissive: '#2FBBD6'     # gloss cyan
  band-low-spark: '#F25C9C'        # jQuery-spark magenta
  band-clouds-fill: '#C7D6E2'      # pale sky
  band-clouds-shadow: '#46596B'
  band-clouds-emissive: '#43D6C4'  # Warby calibration cyan
  band-clouds-signage: '#FF8A3D'   # ClassPass storefront neon
  band-strato-fill: '#5C919A'
  band-strato-shadow: '#244249'
  band-strato-emissive: '#4FE3D2'  # constellation node cyan
  band-strato-line: '#6FD8FF'      # NON-SEMANTIC relationship-line filament texture (flat emissive, no bloom)
  band-orbit-fill: '#5FF0DE'
  band-orbit-shadow: '#0A8478'
  band-orbit-emissive: '#B9FFF4'   # retrieval-beam white-cyan
  band-deep-fill: '#FF77BC'
  band-deep-shadow: '#A31E5F'
  band-deep-emissive: '#B14BFF'    # gravity-field violet
  accent-gold: '#F2C24A'           # recurring "compliance / payments / structure" — WORLD only
  # ══════════════════════════════════════════════════════════════════════════
  # LIGHT SECONDARY SET (theme-awareness; every dark token has a -light sibling)
  # Finalized against the contrast gate: body/link tokens hold ≥4.5:1 on warm paper;
  # neon fills darkened; ground rust desaturated to keep the ramp monotonic.
  # ══════════════════════════════════════════════════════════════════════════
  canvas-light: '#F4F1EA'
  canvas-deep-light: '#E4DCCB'
  surface-plate-light: '#FBF8F1'
  surface-raised-light: '#FFFDF7'
  surface-sunken-light: '#E9E3D5'
  keyline-light: '#C9BFA9'
  keyline-interactive-light: '#6E7A8C'  # interactive boundary, light theme — ≥3:1 vs canvas-light (3.9:1) AND plate-light (4.1:1)
  ink-outline-light: '#14110B'
  ink-outline-warm-light: '#1A1207'
  ink-outline-cool-light: '#0C1319'
  ink-primary-light: '#141A24'
  ink-secondary-light: '#3D4656'
  ink-tertiary-light: '#5C6875'   # darkened one step → 5.0:1 on canvas-light (was #63707F @ 4.48:1 FAIL)
  halftone-dot-light: '#14110B'
  accent-light: '#097868'         # darkened link/CTA-ink → ≥4.5:1 on plate-light (5.1:1) AND canvas-light (4.8:1)
  accent-press-light: '#076152'
  focus-core-light: '#097868'
  focus-halo-ink-light: '#14110B'
  focus-halo-paper-light: '#FFFDF7'
  ramp-grit-0-light: '#675C54'    # desaturated matte rust (LOWEST chroma in light ramp: 6.9)
  ramp-grit-1-light: '#47576A'
  ramp-lift-2-light: '#51667C'
  ramp-lift-3-light: '#2C565D'
  ramp-neon-4-light: '#0E9E8C'
  ramp-neon-5-light: '#C21E6E'
  band-ground-fill-light: '#9A6A38'
  band-ground-shadow-light: '#4E3117'
  band-ground-dust-light: '#A99E86'
  band-ground-emissive-light: '#3E9E3A'
  band-low-fill-light: '#647382'
  band-low-shadow-light: '#33404B'
  band-low-emissive-light: '#1E8AA0'
  band-low-spark-light: '#C93F76'
  band-clouds-fill-light: '#9FB2C4'
  band-clouds-shadow-light: '#46596B'
  band-clouds-emissive-light: '#0E9E8C'
  band-clouds-signage-light: '#C96A22'
  band-strato-fill-light: '#3E6B72'
  band-strato-shadow-light: '#244249'
  band-strato-emissive-light: '#158F80'
  band-strato-line-light: '#2E7FA8'
  band-orbit-fill-light: '#0E9E8C'
  band-orbit-shadow-light: '#0A6A60'
  band-orbit-emissive-light: '#178C95'
  band-deep-fill-light: '#C21E6E'
  band-deep-shadow-light: '#8A1A52'
  band-deep-emissive-light: '#7A34C2'
  accent-gold-light: '#B8891F'
typography:
  display-hero:
    fontFamily: '"Bungee", "Rubik Mono One", system-ui, sans-serif'
    fontSize: 'clamp(2.5rem, 7vw, 6rem)'
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: '0.01em'
    note: 'Heavy comic-grotesk. Always inked (layered offset text-shadow). Hero name only. Candidate face Bungee (Rubik Mono One / distressed heavy grotesk as alternates). [NEEDS PROOF]: proof the hero name against the "confident senior, not carnival" bar before locking — personality only, not a contrast claim.'
  display-era:
    fontFamily: '"Bungee", "Rubik Mono One", system-ui, sans-serif'
    fontSize: 'clamp(1.75rem, 4vw, 3.25rem)'
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: '0.02em'
    note: 'Era titles; drops in as a loot card. Inked.'
  display-loot:
    fontFamily: '"Bungee", "Rubik Mono One", system-ui, sans-serif'
    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)'
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: '0.04em'
    note: 'Loot callout titles; set uppercase. Inked. The one playful voice.'
  title:
    fontFamily: '"Geist", "Satoshi", system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.01em'
  subtitle:
    fontFamily: '"Geist", "Satoshi", system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: '-0.005em'
  body-lg:
    fontFamily: '"Geist", "Satoshi", system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: '0em'
    note: 'Detail-Panel reading measure — the credibility surface.'
  body:
    fontFamily: '"Geist", "Satoshi", system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: '0em'
  body-sm:
    fontFamily: '"Geist", "Satoshi", system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: '0em'
  caption:
    fontFamily: '"Geist", "Satoshi", system-ui, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '0.01em'
  telemetry:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: '0.875rem'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '0.02em'
    note: 'HUD readouts, tech-node tags, coordinates.'
  telemetry-lg:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '0.01em'
    note: 'Big year / altitude gauge readout.'
  label:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: '0.6875rem'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '0.14em'
    note: 'Uppercase instrument labels; band + tech-node chips.'
  eyebrow:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: '0.75rem'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '0.12em'
    note: 'Uppercase band eyebrow above era titles.'
  ui-action:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: '0.875rem'
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: '0.08em'
    note: 'Button / toggle text; set uppercase.'
rounded:
  sm: '2px'
  DEFAULT: '4px'
  md: '6px'
  lg: '10px'
  xl: '16px'
  full: '9999px'
spacing:
  '0': '0'
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '5': '24px'
  '6': '32px'
  '7': '48px'
  '8': '64px'
  '9': '96px'
  gutter: '24px'
  margin-mobile: '16px'
  margin-desktop: '48px'
  editorial-gap: '96px'
  hud-pad: '12px'
  panel-pad: '24px'
  tap-target: '44px'          # comfort hit-area target (2.5.5 AAA / platform-HIG); reserved via transparent hit-slop
  ink-hair: '2px'
  ink: '3px'
  ink-bold: '4px'
  offset-shadow-sm: '3px'
  offset-shadow: '5px'
  offset-shadow-lg: '8px'
  halftone-scale: '4px'
  halftone-scale-coarse: '8px'
components:
  hud-telemetry:
    surface: '{colors.surface-plate}'
    border-color: '{colors.ink-outline-cool}'
    border-width: '{spacing.ink}'
    keyline: '{colors.keyline}'
    radius: '{rounded.DEFAULT}'
    shadow-offset: '{spacing.offset-shadow-sm}'
    shadow-color: '{colors.ink-outline-cool}'
    padding: '{spacing.hud-pad}'
    label-type: '{typography.label}'
    label-color: '{colors.ink-tertiary}'
    value-type: '{typography.telemetry}'
    value-color: '{colors.ink-primary}'
    readout-lg-type: '{typography.telemetry-lg}'
    accent: '{colors.accent}'
    halftone-color: '{colors.halftone-dot}'
    note: 'Instrument gauge, not a cockpit. OPAQUE cel plate so text holds ≥4.5:1 vs worst-case backdrop. label-color ink-tertiary on plate = 5.8:1. No blur, no glow, no smooth gradient. Persistent chrome → teal accent only.'
  detail-panel:
    surface: '{colors.surface-plate}'
    border-color: '{colors.ink-outline}'
    border-width: '{spacing.ink-bold}'
    keyline: '{colors.keyline}'
    radius: '{rounded.md}'
    shadow-offset: '{spacing.offset-shadow-lg}'
    shadow-color: '{colors.ink-outline}'
    padding: '{spacing.panel-pad}'
    heading-type: '{typography.title}'
    heading-color: '{colors.ink-primary}'
    body-type: '{typography.body-lg}'
    body-color: '{colors.ink-primary}'
    meta-type: '{typography.telemetry}'
    meta-color: '{colors.ink-secondary}'
    link-color: '{colors.accent}'
    link-underline: 'always'
    close-hit-area: '{spacing.tap-target}'
    tag-type: '{typography.label}'
    tag-surface: '{colors.surface-raised}'
    tag-color: '{colors.ink-secondary}'
    header-halftone: '{colors.halftone-dot}'
    note: 'The Truth-Layer reading surface — sober, high-contrast, quiet. Halftone limited to a header strip; neon suppressed. Inline text links carry an UNDERLINE by default (WCAG 1.4.1) — teal vs off-white hue is 1.48:1, so color alone is NEVER the link affordance. Close control reserves ≥44px hit area (transparent hit-slop). Persistent chrome → teal accent only.'
  timeline-rail:
    surface: '{colors.surface-sunken}'
    border-color: '{colors.ink-outline}'
    border-width: '{spacing.ink}'
    radius: '{rounded.sm}'
    year-type: '{typography.telemetry}'
    year-color: '{colors.ink-secondary}'
    tick-color: '{colors.ink-tertiary}'
    node-radius: '{rounded.full}'
    node-size: '{spacing.3}'
    node-border: '{colors.ink-outline}'
    hit-area: '{spacing.tap-target}'
    gap: '{spacing.4}'
    active-fill: '{colors.accent}'
    active-ink: '{colors.ink-outline-cool}'
    active-type: '{typography.telemetry}'
    note: 'Current-era highlight is a flat FILL swap + ink emphasis, never a glow. Reflects Career-Data order. The 12px visual node keeps its look but reserves a ≥44px transparent hit-slop (hit-area) decoupled from the mark.'
  waypoint-marker:
    fill: '{colors.surface-raised}'
    border-color: '{colors.ink-outline}'
    border-width: '{spacing.ink}'
    radius: '{rounded.full}'
    shadow-offset: '{spacing.offset-shadow-sm}'
    shadow-color: '{colors.ink-outline}'
    size: '{spacing.5}'
    hit-area: '{spacing.tap-target}'
    label-type: '{typography.label}'
    label-color: '{colors.ink-primary}'
    active-fill: '{colors.accent}'
    active-ink: '{colors.ink-outline-cool}'
    note: 'A selectable, real <button> equivalent. Selection = flat fill swap, not bloom. DOM-focus equivalent required (never raycast-only). The 24px visual dot reserves a ≥44px transparent hit-slop (hit-area).'
  static-timeline-card:
    surface: '{colors.surface-plate}'
    header-fill: '{colors.ramp-grit-0}'
    border-color: '{colors.ink-outline}'
    border-width: '{spacing.ink-bold}'
    radius: '{rounded.md}'
    shadow-offset: '{spacing.offset-shadow}'
    shadow-color: '{colors.ink-outline}'
    padding: '{spacing.panel-pad}'
    eyebrow-type: '{typography.eyebrow}'
    eyebrow-color: '{colors.ink-secondary}'
    title-type: '{typography.display-era}'
    title-color: '{colors.ink-primary}'
    title-ink-shadow: '{colors.ink-outline}'
    year-type: '{typography.telemetry}'
    year-color: '{colors.ink-secondary}'
    body-type: '{typography.body}'
    body-color: '{colors.ink-primary}'
    tag-type: '{typography.label}'
    tag-color: '{colors.ink-secondary}'
    header-halftone: '{colors.halftone-dot}'
    halftone-scale: '{spacing.halftone-scale}'
    note: 'Tier-0 pure-2D cel and the SEO / <noscript> / reduced-motion / no-WebGL reading surface. TRUTH LAYER STAYS SOBER (gate F3): the per-band ramp fill (`header-fill`) + halftone live in the HEADER/EYEBROW/ACCENT strip ONLY; the reading BODY sits on the band-INVARIANT `surface-plate` so contrast never depends on altitude (ink-primary on plate = 15.2:1, every band, both themes). Neon and halftone are SUPPRESSED wherever running prose is read. `header-fill` swaps per AltitudeBand from the ramp (ground default); `border-color` carries the altitude ink-temperature — ink-outline-warm (low bands) → ink-outline (mid) → ink-outline-cool (high bands). Same dialect as World + Chrome; SVG halftone is temporally static (PEAT-safe).'
  button-primary:
    surface: '{colors.accent}'
    surface-press: '{colors.accent-press}'
    text-color: '{colors.ink-outline-cool}'
    text-type: '{typography.ui-action}'
    border-color: '{colors.ink-outline}'
    border-width: '{spacing.ink}'
    radius: '{rounded.DEFAULT}'
    shadow-offset: '{spacing.offset-shadow}'
    shadow-offset-press: '{spacing.offset-shadow-sm}'
    shadow-color: '{colors.ink-outline}'
    padding-x: '{spacing.5}'
    padding-y: '{spacing.3}'
    note: 'The ONLY chrome element permitted the accent FILL (résumé download, primary CTA). High-luminance teal → dark ink text = 11.3:1. Flat fill only — NEVER paired with bloom/glow in chrome. Press collapses the offset shadow so the button physically presses down (transform only).'
  button-ghost:
    surface: 'transparent'
    surface-hover: '{colors.surface-plate}'
    text-color: '{colors.ink-primary}'
    text-type: '{typography.ui-action}'
    border-color: '{colors.keyline-interactive}'
    border-width: '{spacing.ink-hair}'
    radius: '{rounded.DEFAULT}'
    shadow-offset: '{spacing.offset-shadow-sm}'
    shadow-color: '{colors.ink-outline}'
    padding-x: '{spacing.4}'
    padding-y: '{spacing.2}'
    hit-area: '{spacing.tap-target}'
    note: 'Secondary actions: theme toggle, motion/pause toggle, repo link. Uses `keyline-interactive` (not decorative `keyline`) so the actionable boundary clears ≥3:1 vs BOTH canvas (3.55:1) and the plate hover (3.20:1) — a ghost button never reads as plain text. Reserves ≥44px hit area regardless of visual size.'
  focus-ring:
    core-color: '{colors.focus-core}'
    core-width: '{spacing.ink}'
    halo-inner: '{colors.focus-halo-ink}'
    halo-outer: '{colors.focus-halo-paper}'
    halo-width: '{spacing.ink-hair}'
    offset: '{spacing.1}'
    radius: '{rounded.md}'
    note: 'Concentric ink+paper double outline around a teal core → guarantees ≥3:1 on BOTH bright-cloud and deep-space backdrops. Renders ABOVE the canvas. Never color-only, never outline:none.'
  era-title-lockup:
    surface: '{colors.surface-plate}'
    eyebrow-type: '{typography.eyebrow}'
    eyebrow-color: '{colors.ink-secondary}'
    eyebrow-ink-shadow: '{colors.ink-outline}'
    title-type: '{typography.display-era}'
    title-color: '{colors.ink-primary}'
    ink-shadow-color: '{colors.ink-outline}'
    ink-shadow-offset: '{spacing.offset-shadow-sm}'
    year-type: '{typography.telemetry-lg}'
    year-color: '{colors.ink-secondary}'
    year-ink-shadow: '{colors.ink-outline}'
    rule-color: '{colors.accent}'
    halftone-color: '{colors.halftone-dot}'
    note: 'SPECTACLE-LAYER arrival flourish (not persistent instrument chrome). Mono band eyebrow + inked display era title + mono year. Eyebrow and year carry a plate (`surface`) OR a layered ink text-shadow so they never ride a bright/moving backdrop at ~1:1. `rule-color` defaults to teal; as a spectacle arrival flourish it MAY tint to the active band emissive on scroll — that band-emissive swap is a world-side behavior and does NOT count against the persistent-chrome one-accent rule.'
  loot-callout:
    surface: '{colors.surface-raised}'
    border-color: '{colors.ink-outline}'
    border-width: '{spacing.ink-bold}'
    radius: '{rounded.md}'
    shadow-offset: '{spacing.offset-shadow-lg}'
    shadow-color: '{colors.ink-outline}'
    title-type: '{typography.display-loot}'
    title-color: '{colors.ink-primary}'
    ink-shadow-color: '{colors.ink-outline}'
    body-type: '{typography.body-sm}'
    body-color: '{colors.ink-secondary}'
    accent-strip: '{colors.accent}'
    halftone-color: '{colors.halftone-dot}'
    halftone-scale: '{spacing.halftone-scale}'
    note: 'SPECTACLE-LAYER arrival flourish for era arrivals / notable artifacts (not persistent chrome). Raised surface; body ink-secondary on raised = 8.4:1 (never ink-tertiary on raised). `accent-strip` defaults to teal and MAY tint to the active band emissive as a world-side arrival flourish — this does not count against the persistent-chrome one-accent rule. Drop-in animates transform/opacity only — no strobe, no bloom flicker.'
---

<!-- STALE-BANNER v2026-07-18 -->
> ⚠️ **STILL CURRENT (visual identity) — 2026-07-18 pivot.** Post-2026-07-18 pivot to spectacle-first R3F, the cel visual system here **carries over intact**. Ignore any DOM / Static-Timeline / WCAG-gate framing in component notes — those surfaces changed; the *look* did not. Render target is now three.js/R3F (see `architecture-project-delorenj-2026-07-18`).


# Career Ascent — Design System

A cinematic, scroll-driven 3D "career world" rendered as **comic-book concept-art come to life**. The visitor pilots a rocket-camera up an altitude axis from radio-era ground (BAE, 2004) to deep-space agentic AI (Axioms of AI). This document is the single visual reference for both the **Spectacle Layer** (the WebGL world) and the **Content Truth Layer** (the SSR DOM a recruiter actually reads). One cel dialect; three surfaces; no layer sacrificed for another.

> **North star:** credibility over spectacle. The look must survive a skeptical Staff/Principal reviewer at content, performance, **and** source layers. DOM is truth; WebGL is a leaf enhancement island. Color earns altitude — it is not sprayed.

> **Reference mock:** [`mockups/key-screens.html`](./mockups/key-screens.html) renders this dialect in situ (HUD hero, band ramp, Detail Panel, Static-Timeline contrast fix; theme + motion toggles). Where the mock and this spine disagree, **the spine wins.**

---

## 1. Brand & Style

**Aesthetic posture: cel-shaded / toon-shaded, Borderlands lineage.** Hard-stepped ramp shading (flat poster fills, never smooth gradients), bold ink outlines on every form, halftone / cross-hatch texture inside shadow bands, comic grain. It should *feel like a video game* — and then prove itself like a résumé.

**The brand voice in visual terms is a contradiction held on purpose:** spectacle in the world, humility in the words. Display type shouts; body type quietly proves. The system is confident, senior, a little wry, never boastful — it lets the arc and the artifacts do the bragging.

**Brand adjectives:** cinematic, magnitude-conveying, gritty-to-neon, inked, poster-flat, high-contrast, restrained (one defended idea), unmistakably personal, credible-under-inspection.

**The Two-Layer Contract (visual framing — mirrored in EXPERIENCE.md §2).**
- **Spectacle Layer (WebGL world)** — full cel-shade, maximal, the hook. Structurally disposable: an `ssr:false` island mounted over already-SSR'd DOM. It never becomes LCP and never traps text.
- **Content Truth Layer (DOM = truth)** — real SSR HTML: résumé, project detail, outbound links, Detail Panels, the Static Timeline. Wears the **inked-instrument** chrome: legible, gridded, restrained density, but rendered in the cel dialect (bold outline, flat fill, halftone accents, hard offset shadows). **Sober where content must be read** — neon and halftone are suppressed on reading surfaces.

Neither layer wins by cannibalizing the other. The design *is* the restraint.

**Anti-references (explicitly avoid):** a generic template landing page; five giant scroll sections with empty gaps; a "shader-zoo" where every scene competes as a hero (full 3D is reserved for the two signature bookends — `ground` and `orbit`→`deep-space`); spectacle that sacrifices readability; smooth gradients, blurred shadows, airbrushed light; pure `#000000`; neon outer-glow as a depth device.

---

## 2. Colors

The canvas is **dark-anchored**: deep-space navy-black `{colors.canvas}` (`#0B0F1A`, never pure black). Cel fills and ink outlines pop hardest here. The chrome plate stays locked to this baseline while each band *tints the world atmosphere* around it. A full **light secondary set** ships for theme-awareness (`-light` siblings); the cel dialect itself — flat fills, ink borders, hard offset shadows, halftone — is theme-invariant. Only fill/atmosphere tokens swap.

**Chrome plates are opaque.** Every plate (`{colors.surface-plate}`, `{colors.surface-raised}`, `{colors.surface-sunken}`) is a solid fill with **no alpha and no backdrop-blur**. This is load-bearing: a translucent plate would let the worst-case band bleed through and void every ≥4.5:1 text guarantee below. Opacity is what makes the contrast floor *band-invariant*.

**Ink is never `#000000`.** The outline is a warm-or-cool near-black chosen per altitude: `{colors.ink-outline-warm}` low, the neutral `{colors.ink-outline}` default, `{colors.ink-outline-cool}` up top. This keeps the "inked comic" read without the deadness of pure black.

**One disciplined chrome accent.** `{colors.accent}` signal-teal is the *only* accent that **persistent instrument chrome** spends — on the focus core, active/current-era state, the through-line, and the single primary CTA. It is deliberately the **connective "advancement" hue**: teal seeds at Warby (calibration), strengthens through the stratosphere (nodes), peaks at orbit, and returns in deep-space as the duotone partner to magenta. Rendering the career through-line in teal makes the "it converged" moment a *color payoff*, not just geometry. Everything else saturated is diegetic — it lives in the world, keyed per band.

**The semantic through-line is a single hue.** The "it converged" argument — the career through-line and the relationship lines that carry meaning — renders in `{colors.accent}` teal and nothing else; one meaning, one hue, so the color payoff is undiluted. The bluer `{colors.band-strato-line}` `#6FD8FF` is reserved for **non-semantic filament texture** only (decorative constellation threading), never for the semantic through-line.

**Accent saturation — a documented exception.** `{colors.accent}` `#12E0C8` sits intentionally above the ≤80% saturation ceiling a calmer UI accent would obey, because a flat cel poster fill needs the punch to read as *paint*, not a tint. The exception is bounded: the accent appears only as a **flat fill / flat stroke** in chrome and is **never** paired with bloom or outer-glow there (the banned neon-as-depth device). High-saturation-as-flat-fill is sanctioned; high-saturation-as-glow is not.

**Persistent chrome vs spectacle flourishes.** The "exactly one chrome accent (teal)" discipline is scoped to **persistent instrument chrome** — HUD, Detail Panel, Timeline Rail, buttons, focus ring — which spend teal and only teal. `era-title-lockup` and `loot-callout` are classified as **spectacle-layer arrival flourishes**, not persistent chrome: they appear transiently on era arrival and may tint their rule / accent-strip to the active band emissive. That band-emissive tinting is a **world-side behavior** and does not erode the one-accent rule the instrument layer defends.

**Interactive vs decorative keylines.** `{colors.keyline}` `#2A3446` is a **decorative** hairline for text-labeled plate edges (identified by their content, so its ~1.5:1 non-text contrast is acceptable). `{colors.keyline-interactive}` `#5E6B82` is a distinct token for **interactive boundaries** whose affordance depends on the edge (e.g. `button-ghost`): it clears WCAG 1.4.11 non-text contrast ≥3:1 against **both** `{colors.canvas}` (3.55:1) and `{colors.surface-plate}` (3.20:1), so a ghost control never collapses into plain text.

### The six-band grit → neon ramp

The six ramp base fills climb **monotonically in perceptual chroma** with altitude — the chroma budget a band is allowed to spend grows as you rise: ground `8.9` → low-atmosphere `10.6` → clouds `13.4` → stratosphere `16.1` → orbit `49.9` → deep-space `77.5` (CIELCh). `AltitudeBand` is non-decreasing along the Career Sequence, and because the tokens are *picked* monotonically, the arc is genuinely guaranteed to climb as you scroll up. Each band base fill is a flat token; the world reads it, the chrome reads it, the Static Timeline reads it — one source, three surfaces (AD-1).

| Token | Band | Role — the feeling color carries |
|---|---|---|
| `{colors.ramp-grit-0}` `#64564C` | **ground** | Desaturated matte rust/gunmetal — the **lowest-chroma** fill of the six. Warm hue survives; vividness does not. "Color is scarce down here" is now literally true in the token, so the neon payoff later lands. Only glow permitted: phosphor green `{colors.band-ground-emissive}`. |
| `{colors.ramp-grit-1}` `#5B6B7A` | **low-atmosphere** | Steel-slate. Dust gives way to steel-and-glass sky; first gloss pops (`{colors.band-low-emissive}`, `{colors.band-low-spark}`). Still restrained. |
| `{colors.ramp-lift-2}` `#6E8296` | **clouds** | Luminous muted slate — a *lit* cloud deck, never white. Used as header/atmosphere fill only; running prose never rides it (see the Static Timeline plate rule). Three eras share the band: base holds, the accent carries the variety (`{colors.band-clouds-emissive}`, `{colors.band-clouds-signage}`). |
| `{colors.ramp-lift-3}` `#3E6B72` | **stratosphere** | Desaturated teal — the chroma pivot where color visibly *earns altitude*. Constellation nodes and relationship-line filaments first render here as **flat emissive color, without bloom**. |
| `{colors.ramp-neon-4}` `#12E0C8` | **orbit** | Plasma-teal. Full neon arrival. Max cel contrast: near-black void, hot teal fills, crisp ink. Selective bloom lives here (emissive + high luminance threshold, not global). |
| `{colors.ramp-neon-5}` `#FF3D9A` | **deep-space** | Plasma-magenta. Peak saturation on the fewest lit forms — darkest canvas, most chroma. Held in complementary duotone with orbit-teal: the finale reads as a **teal + magenta poster**. This is the visual climax; restraint everywhere except here. |

**Arc-integrity rules.**
- Ground rust reads via **warm hue at low chroma**, not colorfulness; it is the least-vivid fill so the summit neon has somewhere to climb to. Phosphor green at the bottom and teal/magenta at the top are the *only* saturated notes at their altitudes — no mid-band accent may out-shout the summit.
- `{colors.accent-gold}` is the recurring "compliance / payments / structure" motif (Splash → Justworks → orbit). It is **world-diegetic only**, never a chrome accent — so the "one primary accent per theme" discipline holds for the UI.
- The true summit neon (`ramp-neon-5` magenta) is reserved to the deep-space band and never appears in chrome.

**Contrast floor (verified).** All persistent chrome text holds **≥4.5:1** against the worst-case backdrop across the full ascent, delivered via the **opaque** cel plate (flat fill + ink border), and the guarantee is **band-invariant** because reading prose never rides a band fill (see §8 `static-timeline-card`). Verified pairings: `ink-primary` on `surface-plate` = 15.2:1, on `canvas` = 16.9:1; `ink-secondary` on `surface-plate` = 9.4:1, on `surface-raised` = 8.4:1; `ink-tertiary` on `surface-plate` = 5.8:1, on `surface-sunken` = 6.2:1; `button-primary` ink on accent = 11.3:1. Light theme: `ink-tertiary-light` on `canvas-light` = 5.0:1; `accent-light` link on `surface-plate-light` = 5.1:1, on `canvas-light` = 4.8:1. `ink-tertiary` is **forbidden on `surface-raised`** (use `ink-secondary` — 8.4:1). Where color would otherwise be the only text/link distinguisher, a non-color affordance is mandatory (see §8 `detail-panel`).

---

## 3. Typography

**Bold where it flexes, clean where it must be read.** Three families, three jobs.

- **Display — heavy comic-grotesk** (`{typography.display-hero}`, `{typography.display-era}`, `{typography.display-loot}`). Hero name, era titles, and loot callouts **only**. Candidate face **Bungee** (with Rubik Mono One / a distressed heavy grotesk as alternates). Display type is *always* inked: a layered offset `text-shadow` in `{colors.ink-outline}` gives the screen-printed comic edge. Era titles drop in like loot cards. The face choice is **[NEEDS PROOF]** — proof the hero NAME reads "confident senior poster," not "carnival signage," before locking, and keep a senior-reading heavy-grotesk alternate ready. This is a personality proof, not a contrast claim.
- **Body — Geist** (`{typography.body-lg}` / `{typography.body}` / `{typography.body-sm}`, plus `{typography.title}` / `{typography.subtitle}` for headings). Satoshi is the sanctioned alternate. Carries every Detail Panel, résumé line, essay, and link. Holds ≥4.5:1 by riding a sober opaque plate, never a band fill. **Panel and section headings use body-bold, not the display face** — display is reserved for spectacle voice.
- **Mono — JetBrains Mono** (`{typography.telemetry}`, `{typography.telemetry-lg}`, `{typography.label}`, `{typography.eyebrow}`, `{typography.ui-action}`). Years, altitude, coordinates, tech-node tags, HUD readouts, button text. Reinforces the inked-instrument chrome.

**Rules.**
- Never set reading body in the display face; never set a display headline in Geist.
- Display and loot titles set uppercase; mono labels/eyebrows/actions set uppercase with the letter-spacing in their tokens.
- The display "shout" and the body "proof" are the visual form of the tone contract.
- No `LABEL // YEAR` formatting; years are plain mono telemetry.

---

## 4. Layout & Spacing

A **4px base scale** (`{spacing.1}` … `{spacing.9}`) governs rhythm; named tokens carry intent (`{spacing.gutter}`, `{spacing.panel-pad}`, `{spacing.hud-pad}`, `{spacing.editorial-gap}`). The scale is tight and gridded — the chrome is an instrument, so density is restrained but deliberate, never loose or empty.

**Grid & margins.** Mobile margin `{spacing.margin-mobile}`; desktop margin `{spacing.margin-desktop}`; a `{spacing.gutter}` inter-column gutter. Chrome is corner-anchored over the canvas: HUD top-corner, Timeline Rail fixed to one vertical edge, Detail Panel a bounded reading column (max measure ~66ch) during the film "HOLD." The **Static Timeline** is a single editorial column with `{spacing.editorial-gap}` between era sections — the same `sequence.config` offsets that drive world waypoint altitudes (AD-6), so the 2D fallback and 3D world share one spatial rhythm.

**Touch & hit targets.** Interactive controls reserve a comfortable **`{spacing.tap-target}` (44px)** hit area via transparent hit-slop / `::before` padding, **decoupled from the visual mark** — a 12px rail node or a 24px waypoint dot keeps its drawn size while the tappable region grows to 44px. (Standards note: WCAG 2.5.8 AA sets a 24×24px floor; the 44px we adopt is the 2.5.5 AAA / platform-HIG *comfort* target, referenced as `{spacing.tap-target}` — never restated as a literal.) Applies to `timeline-rail` nodes, `waypoint-marker`, `button-ghost`, and close controls.

**Breakpoints** (prose, not tokens): compact < 640px, tablet 640–1024px, desktop > 1024px. The layout must **reflow to 400% zoom** without horizontal scroll (WCAG 1.4.10) and honor `forced-colors` / `prefers-contrast`.

**Full-height rule:** any full-viewport surface uses `min-h-[100dvh]`, **never** `h-screen`.

---

## 5. Elevation & Depth

**Depth is drawn, not blurred.** The entire system rejects Gaussian shadow and airbrushed light.

- **Hard offset shadows, zero blur.** Every card, panel, button, marker, and callout casts a solid-color offset shadow — `{spacing.offset-shadow-sm}` / `{spacing.offset-shadow}` / `{spacing.offset-shadow-lg}` in an ink color (`{colors.ink-outline}` family). Elevation = offset distance. On press, the offset *collapses* (the object presses toward the surface) — animated with `transform` only.
- **Tonal layering** carries in-plate depth: `{colors.surface-sunken}` → `{colors.surface-plate}` → `{colors.surface-raised}`. A `{colors.keyline}` hairline separates dark-on-dark plate edges where an ink border alone would vanish against `{colors.canvas}`; interactive edges use `{colors.keyline-interactive}` (§2).
- **In the world, depth is the toon ramp + parallax**, not shadow: 2–3 discrete tone steps per form, layered parallax strata, atmospheric fog stepping per band. Never a smooth blend.
- **Neon is not the depth device.** No outer-glow halos to fake elevation (banned). The one sanctioned emissive lighting is *selective bloom* in **orbit / deep-space only**, driven by emissive materials at a high luminance threshold — a light source in the fiction, not a UI shadow. Below orbit, emissive forms (stratosphere constellation nodes, relationship-line filaments) are **flat emissive color without bloom**: they read as paint, not as light.
- **Focus indicator sits above everything**, including the canvas (see `focus-ring` in §8).

**Pass-cost accounting (perf budget).** The drawn-depth signature is not free and is carried into `perf-budget.json`, not merely asserted: the baseline **inverted-hull outline counts as +1 draw call per outlined hero silhouette** against the ≤50 mobile / ≤100 desktop draw-call cap (AD-13), and instanced stars / particles / repeated tech-nodes get **no per-object hull**. The Tier-3 post chain (Sobel edge pass + halftone pass + grain pass + selective-bloom down-sample/threshold/blur/composite) is enumerated as a **max-simultaneous-full-screen-passes-per-tier** fill-rate line, so the CI budget gate (asserted on the resident-window sum, AD-14) covers the passes, not only geometry/texture bytes.

---

## 6. Shapes

Corners are **tight and boxy** — the poster/comic-panel read. `{rounded.sm}` (2px) and `{rounded.DEFAULT}` (4px) cover most chrome; `{rounded.md}` (6px) for panels and loot cards; `{rounded.lg}`/`{rounded.xl}` reserved for rare large containers. `{rounded.full}` is for genuinely round objects only — timeline-rail nodes, waypoint dots, the motion/theme toggle pill.

The **silhouette is defined by the ink outline, not the radius.** A cel form is legible because of its bold contour and flat fill; rounding stays minimal so corners read as drawn, hard, screen-printed. Soft, pill-heavy, "friendly SaaS" rounding would break the dialect.

---

## 7. World Render Language (Cel-Shade)

*One visual language, three surfaces — the 3D world, the 2D chrome, and the tier-0 Static Timeline read as the same object. This section defines the render dialect and how the chrome is derived from the world, not styled separately.*

### 7.1 Toon ramp (banding / threshold logic)
Hero surfaces use `MeshToonMaterial` with a stepped `gradientMap` of **2–3 discrete light bands** — flat poster fills, never smooth Lambert/PBR. The threshold placement is per band: the darkest step is where the halftone lives; the lightest step is the poster highlight (`band-*-fill` tokens). This is the identity floor — a material swap, cheaper than PBR, and it **survives quality shedding down to Tier 1**. In 2D the ramp becomes flat CSS fills read from the same `{colors.ramp-grit-0}` … `{colors.ramp-neon-5}` tokens.

### 7.2 Ink outline (weight, and when it thickens)
The signature that carries across **all three surfaces** is the **bold flat ink contour** — inverted-hull geometry in the world (`{spacing.ink}`-equivalent hull scale on hero silhouettes), solid `{spacing.ink-hair}`–`{spacing.ink-bold}` borders in chrome, and layered offset `text-shadow` on inked type. It is deliberately geometry/material, *not* a post-process pass, because the runtime monitor sheds postprocessing first (AD-13) and the brand's signature must not be the first casualty. The **variable-weight, slightly-imperfect line quality is a Tier-3, world-only enhancement** delivered by the **Sobel/edge-detect post-pass** on top — it is *not* claimed as the cross-surface signature (chrome and the Tier-0 timeline use uniform solid strokes; see §7.5). Outline thickens on hero forms and on selection/hover emphasis; instanced stars, particles, and repeated tech-nodes get **no per-object hull** (draw-call budget). Where the imperfection does appear, it is a **per-object spatial seed, never per-frame temporal noise** (flash-safety + demand-loop stability).

### 7.3 Halftone (where, and at what scale)
The darkest tone step of every band carries a **dot-screen / cross-hatch** — the "comic ink" tell. In-world: baked into the gradientMap/texture at the identity floor, with a full-density post-pass at Tier 3. In chrome: an inline SVG `<pattern>` in **header strips and shadow edges only** at `{spacing.halftone-scale}` (coarser `{spacing.halftone-scale-coarse}` when tiers drop), colored `{colors.halftone-dot}` — **never laid under running prose** (it would erode the reading contrast). **Halftone is spatially static or scroll-locked — never a per-frame shimmer** (PEAT hard gate: no flash > 3×/sec at large area / high luminance).

### 7.4 The six-band grit → neon ramp in the render
Atmosphere, poster fill, shadow-band, ink, and emissive are keyed per band and climb the arc:
`{colors.ramp-grit-0}` (ground desaturated matte rust, single phosphor note) → `{colors.ramp-grit-1}` (low steel-slate, first gloss) → `{colors.ramp-lift-2}` (clouds luminous slate) → `{colors.ramp-lift-3}` (stratosphere desat-teal, chroma pivot; relationship lines render as flat emissive, **no bloom**) → `{colors.ramp-neon-4}` (orbit plasma-teal, selective bloom) → `{colors.ramp-neon-5}` (deep-space plasma-magenta, teal-magenta duotone climax). Band-to-band transitions are **continuous but stepped/dithered** — a crossfade of parallax + fog + color-grade + particle density that reads as poster banding, **never** an airbrushed blend and **never** a hard cut.

### 7.5 Chrome mirrors world (explicit)
The 2D chrome is **derived from the 3D world dialect, not a parallel style.** The properties that carry across all three surfaces are the **toon fill + bold flat ink outline + hard offset shadow + halftone** — expressed cheaply in chrome: thick borders for the outline, flat fills for the toon ramp, hard offset shadows for depth, SVG `<pattern>` for halftone, layered `text-shadow` for inked type. (The variable-weight imperfect line is *not* one of these cross-surface properties — it is the Tier-3 world-only Sobel refinement per §7.2.) A HUD plate, a Detail Panel, and an orbit station are the same object at different scales. Every Component in §8 is built from these shared primitives.

### 7.6 Degradation of the cel look (Tier 3 → 0)
The dialect degrades **polish before identity** (maps onto AD-9 / AD-13; behavioral ladder in EXPERIENCE.md §9). The **tier table is the single source of truth** and the shed order is derived from it:
- **Tier 3:** toon ramp + inverted-hull + Sobel outline + full halftone + comic grain + selective bloom (orbit/deep-space) + full particles/parallax.
- **Tier 2:** drop comic grain first; reduce halftone density (coarser, baked-lean); bloom at ½–¼ res; particle caps step down. **Sobel persists through Tier 2** (inverted-hull + Sobel).
- **Tier 1:** drop the Sobel post-pass — **inverted-hull + toon ramp only**; halftone baked into the gradientMap; no bloom; minimal particles.
- **Tier 0:** no WebGL — the **Static Timeline** renders the whole language in pure 2D (thick CSS/SVG borders, flat poster fills from the ramp tokens, hard offset shadows, SVG halftone). Same brand, zero GPU.

Single shed order (one list, referenced by both this section and EXPERIENCE §9): **comic grain → halftone density → bloom → particle caps → Sobel outline → DPR → LOD.** Sobel is guaranteed through Tier 2 and is the *last* postprocessing casualty before the surface switch; inverted-hull + toon ramp are the **identity floor that is never on the shed list** — only a switch to Tier 0 removes them.

### 7.7 Reduced-Motion (orthogonal) and flash-safety
Reduced-Motion is a *motion* preference, orthogonal to fidelity: it suppresses camera flight, parallax, idle-drift, physics, and any animated halftone/grain, but the **cel aesthetic is never stripped**. Per AD-9 the concrete delivery is the tier-0 2D cel Static Timeline (which *is* the dialect rendered statically) — the spine forbids a mounted "still" canvas. **Flash-safety is a hard gate even in full-motion**, and every animated pass is accounted for:
- **Halftone** stays spatially static / scroll-locked (never per-frame).
- **Bloom / loot-beam / launch-ignition** ramp/ease and never strobe.
- **Comic grain** stays low-contrast.
- **The imperfect ink line** is a per-object spatial seed, not temporal noise.
- **The Sobel edge post-pass** is temporally stabilized under the waypoint-jump launch tween — edge-threshold hysteresis / TAA-style damping, **clamped or disabled during high-velocity launch segments** — because image-space edge detection can crawl/shimmer over a large area under fast camera motion (exactly the >3×/sec large-area high-contrast pattern PEAT flags). Sobel is named as a PEAT-verified path alongside bloom and halftone.

PEAT verifies the animated-cel path in CI.

---

## 8. Components

Every component below is the cel dialect at UI scale: flat fill, ink border, hard offset shadow, no blur, no smooth gradient. Tokens resolve to §2–§6. The Truth-Layer components (`detail-panel`, `static-timeline-card` body, `hud-telemetry` values) stay **sober and high-contrast** — spectacle does not bleed onto reading surfaces.

**`hud-telemetry`** — instrument gauge on an **opaque** cel plate (`{components.hud-telemetry.surface}` with `{components.hud-telemetry.border-color}` + small offset shadow). Mono readouts (`{typography.telemetry}` / `{typography.telemetry-lg}`), uppercase labels (`{typography.label}`) in `{colors.ink-tertiary}` (5.8:1 on plate), values in `{colors.ink-primary}`. Current-era emphasis uses a thin `{colors.accent}` mark — never a glow. Holds ≥4.5:1 over any band.

**`detail-panel`** — the film "HOLD" reading surface and the credibility payload. Bold ink border (`{spacing.ink-bold}`), large offset shadow, `{typography.title}` heading + `{typography.body-lg}` prose in `{colors.ink-primary}`, tech-node tags as `{typography.label}` chips. **Inline text links carry an underline by default** (`link-underline: always`) — teal `{colors.accent}` vs off-white `{colors.ink-primary}` is only ~1.48:1 of luminance difference, so per WCAG 1.4.1 (Level A) **color is never the sole link affordance**; the underline is the non-color cue. (Standalone/button-style links already bordered or on their own line are exempt.) Halftone confined to a header strip; the close control reserves a `{spacing.tap-target}` hit area. **Quiet by design.**

**`timeline-rail`** — vertical, gridded, monospaced years (`{typography.telemetry}`). Current era = flat **fill swap** to `{colors.accent}` + ink emphasis (`{components.timeline-rail.active-ink}`), never a glow. Round nodes (`{rounded.full}`) with ink borders; the 12px visual node reserves a `{spacing.tap-target}` (44px) transparent hit-slop decoupled from the mark. Reflects Career-Data order (AD-1).

**`waypoint-marker`** — a selectable in-world point that is a real focusable control. Round, ink-bordered, small offset shadow; selection = flat `{colors.accent}` fill swap. Must carry a DOM-focus equivalent (never raycast-only). The 24px visual dot reserves a `{spacing.tap-target}` (44px) hit area.

**`static-timeline-card`** — the tier-0 cel card and the SEO / `<noscript>` / reduced-motion / no-WebGL fallback surface, where a recruiter can read the entire career. **The Truth Layer stays sober (gate F3):** the per-band ramp fill (`header-fill`) and halftone are confined to a **header / eyebrow / accent strip**, and the reading **body sits on the band-invariant `{colors.surface-plate}`** — so contrast never depends on altitude (`ink-primary` on plate = 15.2:1 on *every* band, both themes) and no per-band "flip to ink" gymnastics are needed. **Neon and halftone are suppressed wherever running prose is read.** The band still speaks through the header-strip fill and through `border-color`, which carries the altitude **ink-temperature** — `ink-outline-warm` (low bands) → `ink-outline` (mid) → `ink-outline-cool` (high bands) — so the Tier-0 surface honors the same ink-temperature rule as the world. Inked `{typography.display-era}` title, mono year, `{typography.body}` prose. SVG halftone is temporally static.

**`button-primary`** — the single sanctioned accent moment (résumé download / primary CTA): `{colors.accent}` **flat fill**, dark ink text (`{colors.ink-outline-cool}`, 11.3:1), ink border, hard offset shadow that **collapses on press** (transform only). This is the *only* chrome element permitted the accent fill — and it is a flat fill, **never paired with bloom/glow**.

**`button-ghost`** — secondary actions (theme toggle, motion/pause toggle, repo link): transparent fill, `{colors.keyline-interactive}` boundary so the actionable edge clears ≥3:1 on both the dark canvas (3.55:1) and the plate hover (3.20:1) and never reads as plain text, mono uppercase label. Reserves a `{spacing.tap-target}` hit area. Persistent and keyboard-reachable.

**`focus-ring`** — dual-backdrop, design-critical. A teal `{colors.focus-core}` core wrapped by a concentric **ink `{colors.focus-halo-ink}` + paper `{colors.focus-halo-paper}`** double outline, so one ring always clears ≥3:1 whether the backdrop is bright-cloud or deep-space. Renders above the canvas. Never `outline:none`, never color-only.

**`era-title-lockup`** — a **spectacle-layer arrival flourish** (not persistent instrument chrome): mono band eyebrow (`{typography.eyebrow}`, `{colors.ink-secondary}`) → inked `{typography.display-era}` title with offset `text-shadow` → mono `{typography.telemetry-lg}` year. The eyebrow and year sit on a plate (`surface`) **or** carry a layered ink text-shadow so the informational bits never ride a bright/moving backdrop at ~1:1. Its `rule-color` defaults to teal and, as a spectacle arrival flourish, MAY tint to the active band emissive on scroll — a world-side behavior that does not count against the persistent-chrome one-accent rule.

**`loot-callout`** — a **spectacle-layer arrival flourish** and the one playful chrome moment: a Borderlands-style loot card for era arrivals / notable artifacts. Raised surface, bold ink border, large offset shadow, `{typography.display-loot}` inked title, halftone edge, body in `{colors.ink-secondary}` (8.4:1 on raised — **never `ink-tertiary` on raised**), a per-band `accent-strip` (defaults teal, may tint to the active band emissive as an arrival flourish). Playful but never at the cost of the panel's legibility discipline; drop-in animates transform/opacity only — no strobe, no bloom flicker.

---

## 9. Do's and Don'ts

| Do | Don't |
|---|---|
| Use flat poster fills with 2–3 discrete toon steps. | Use smooth CSS/GPU gradients or airbrushed lighting anywhere. |
| Cast hard offset shadows (`{spacing.offset-shadow}` in ink). | Use blurred / Gaussian drop shadows. |
| Outline in the ink family (`{colors.ink-outline}` warm/cool). | Use pure `#000000` for ink or `#000000` backgrounds (use `{colors.canvas}`). |
| Keep the world's inverted-hull + toon ramp as the identity floor. | Claim the variable-weight imperfect line as the cross-surface signature (it's Tier-3 world-only). |
| Set reading prose on a sober, **opaque** plate; keep the band ramp fill + halftone to a header/accent strip. | Ride body text on a per-band ramp fill, or put halftone under running prose. |
| Keep the six ramp fills climbing in chroma from a **desaturated matte ground**. | Let the ground rust out-saturate the bands above it, or claim monotonicity the tokens don't deliver. |
| Render the semantic through-line in exactly ONE hue (`{colors.accent}` teal). | Use a second cyan (`#6FD8FF`) for the "it converged" meaning; reserve it for non-semantic filament. |
| Reserve the summit neon (`{colors.ramp-neon-5}`) to the deep-space band. | Let mid-band accents out-saturate the orbit/deep-space payoff. |
| Spend exactly ONE **persistent-chrome** accent (`{colors.accent}` teal), as a flat fill. | Spray neon on instrument chrome, add a second UI accent, or pair the accent with glow. |
| Use neon-glow bloom only as diegetic light in orbit/deep-space; keep stratosphere lines flat emissive. | Use outer-glow as a depth device, or "glow" relationship lines below orbit. |
| Underline inline links by default; treat color as decoration, not affordance. | Distinguish an inline link by teal-vs-off-white hue alone (a 1.4.1 fail). |
| Give interactive edges `{colors.keyline-interactive}` (≥3:1 on canvas AND plate); keep chrome plates opaque. | Bound an actionable control with the decorative `{colors.keyline}`, or use alpha/blur on a plate. |
| Reserve `{spacing.tap-target}` (44px) hit area via transparent hit-slop, decoupled from the visual mark. | Ship a 12/24px dot whose tap target equals its drawn size. |
| Set hero/era/loot in the display face; body/mono for everything read. | Set reading body in the display face, or headings in Geist. |
| Hold chrome text ≥4.5:1 via the opaque plate; forbid `ink-tertiary` on `surface-raised`. | Let text ride directly on a moving, bright, or busy backdrop, or put `ink-tertiary` on `surface-raised`. |
| Keep halftone spatially static / scroll-locked; stabilize the Sobel pass under launch. | Animate halftone per-frame, strobe any effect > 3×/sec, or let Sobel edges crawl during launch. |
| Render the focus ring above canvas as an ink+paper double outline. | Ship `outline:none` or a color-only focus indicator. |
| Use `min-h-[100dvh]` for full-height surfaces; animate transform/opacity. | Use `h-screen`, or animate layout/color/filter on the hot path. |
| Keep the Truth Layer sober — suppress neon/halftone where content is read. | Let spectacle bleed onto Detail Panels or résumé text. |
| Ship the light `-light` token set; keep the cel dialect theme-invariant. | Restate literal hex/px in EXPERIENCE.md instead of `{path.to.token}` refs. |
| Fabricate no metrics — use `[metric]` placeholders when real data is absent (incl. career length). | Invent uptime/response-times/statistics, assert a rounded career span, or use AI-cliché copy. |
