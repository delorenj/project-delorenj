---
name: Career Ascent
description: The cel-shaded, dark-anchored visual system for Career Ascent — a scroll-driven 3D "career world" where color earns altitude from radio-era grit to agentic-AI neon, spoken as one ink-outlined poster dialect across World, Chrome, and the Static Timeline.
status: final
updated: 2026-07-18
sources:
  - ../../prds/prd-project-delorenj-2026-07-15/prd.md
  - ../../prds/prd-project-delorenj-2026-07-15/addendum.md
  - ../../architecture/architecture-project-delorenj-2026-07-16/ARCHITECTURE-SPINE.md
colors:
  # ── CANVAS & SURFACES (dark = primary/baseline) ──────────────────────────
  canvas: '#0B0F1A'            # deep-space navy-black; primary canvas (never #000)
  canvas-deep: '#05070D'       # deepest void; deep-space band backdrop only
  surface-plate: '#141B2A'     # cel plate for HUD / panels (lighter than canvas)
  surface-raised: '#1C2536'    # raised plate: loot callouts, waypoint markers
  surface-sunken: '#0E1420'    # sunken well: timeline-rail trough
  keyline: '#2A3446'           # cool light-ish hairline for dark-on-dark plate edges
  # ── INK (outlines + text) — outline is NEVER pure black ──────────────────
  ink-outline: '#0A0E16'       # default cool near-black contour (chrome + world)
  ink-outline-warm: '#120D08'  # warm-black outline for ground / low bands
  ink-outline-cool: '#04121A'  # cool-black outline for orbit / deep-space bands
  ink-primary: '#EDF1F7'       # high-contrast off-white text            [ASSUMPTION]
  ink-secondary: '#B4C0D2'     # muted labels / secondary prose          [ASSUMPTION]
  ink-tertiary: '#7C8AA0'      # faint telemetry / rest-state labels     [ASSUMPTION]
  # ── HALFTONE / COMIC TEXTURE ─────────────────────────────────────────────
  halftone-dot: '#0A0E16'      # dot-screen + cross-hatch ink laid in shadow bands
  # ── ONE DISCIPLINED CHROME ACCENT (the connective "advancement" hue) ─────
  accent: '#12E0C8'            # signal-teal: focus core, active state, through-line
  accent-press: '#0FB7A4'      # pressed/darker teal for active buttons
  # ── FOCUS RING (dual-backdrop concentric pair) ───────────────────────────
  focus-core: '#12E0C8'        # teal core stripe
  focus-halo-ink: '#05070D'    # dark ring — reads on bright-cloud backdrops
  focus-halo-paper: '#EDF1F7'  # light ring — reads on deep-space backdrops
  # ── SIX-BAND GRIT→NEON RAMP (base poster fills, darkest-grit → top-neon) ──
  ramp-grit-0: '#8A5A2B'       # BAND 1 ground — rust (matte, gritty floor)
  ramp-grit-1: '#5B6B7A'       # BAND 2 low-atmosphere — steel-slate (first gloss)
  ramp-lift-2: '#6E8296'       # BAND 3 clouds — luminous muted slate      [ASSUMPTION]
  ramp-lift-3: '#3E6B72'       # BAND 4 stratosphere — desat-teal (chroma pivot)
  ramp-neon-4: '#12E0C8'       # BAND 5 orbit — plasma-teal (full neon arrival)
  ramp-neon-5: '#FF3D9A'       # BAND 6 deep-space — plasma-magenta (peak neon)
  # ── PER-BAND WORLD FILLS · SHADOW · DIEGETIC EMISSIVE (world-only accents) ─
  band-ground-fill: '#B07C42'      # ground light poster step
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
  band-strato-line: '#6FD8FF'      # relationship-line filament
  band-orbit-fill: '#5FF0DE'
  band-orbit-shadow: '#0A8478'
  band-orbit-emissive: '#B9FFF4'   # retrieval-beam white-cyan
  band-deep-fill: '#FF77BC'
  band-deep-shadow: '#A31E5F'
  band-deep-emissive: '#B14BFF'    # gravity-field violet
  accent-gold: '#F2C24A'           # recurring "compliance / payments / structure" — WORLD only
  # ══════════════════════════════════════════════════════════════════════════
  # LIGHT SECONDARY SET (theme-awareness; every dark token has a -light sibling)
  # Values tuned to hold body text ≥4.5:1 on warm paper; neon fills darkened.
  # Entire light block is [ASSUMPTION] — finalize against the contrast gate.
  # ══════════════════════════════════════════════════════════════════════════
  canvas-light: '#F4F1EA'
  canvas-deep-light: '#E4DCCB'
  surface-plate-light: '#FBF8F1'
  surface-raised-light: '#FFFDF7'
  surface-sunken-light: '#E9E3D5'
  keyline-light: '#C9BFA9'
  ink-outline-light: '#14110B'
  ink-outline-warm-light: '#1A1207'
  ink-outline-cool-light: '#0C1319'
  ink-primary-light: '#141A24'
  ink-secondary-light: '#3D4656'
  ink-tertiary-light: '#63707F'
  halftone-dot-light: '#14110B'
  accent-light: '#0E9E8C'
  accent-press-light: '#0B7D6F'
  focus-core-light: '#0E9E8C'
  focus-halo-ink-light: '#14110B'
  focus-halo-paper-light: '#FFFDF7'
  ramp-grit-0-light: '#7A4E24'
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
    note: 'Heavy comic-grotesk. Always inked (layered offset text-shadow). Hero name only. Font pick is [ASSUMPTION] — Bungee / Rubik Mono One / distressed heavy grotesk.'
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
    note: 'Instrument gauge, not a cockpit. Anchored on a cel plate so text holds ≥4.5:1 vs worst-case backdrop. No blur, no glow, no smooth gradient.'
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
    tag-type: '{typography.label}'
    tag-surface: '{colors.surface-raised}'
    tag-color: '{colors.ink-secondary}'
    header-halftone: '{colors.halftone-dot}'
    note: 'The Truth-Layer reading surface — sober, high-contrast, quiet. Halftone limited to a header strip. Neon suppressed. Real links, generous measure.'
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
    gap: '{spacing.4}'
    active-fill: '{colors.accent}'
    active-ink: '{colors.ink-outline-cool}'
    active-type: '{typography.telemetry}'
    note: 'Current-era highlight is a flat FILL swap + ink emphasis, never a glow. Reflects Career-Data order.'
  waypoint-marker:
    fill: '{colors.surface-raised}'
    border-color: '{colors.ink-outline}'
    border-width: '{spacing.ink}'
    radius: '{rounded.full}'
    shadow-offset: '{spacing.offset-shadow-sm}'
    shadow-color: '{colors.ink-outline}'
    size: '{spacing.5}'
    label-type: '{typography.label}'
    label-color: '{colors.ink-primary}'
    active-fill: '{colors.accent}'
    active-ink: '{colors.ink-outline-cool}'
    note: 'A selectable, real <button> equivalent. Selection = flat fill swap, not bloom. DOM-focus equivalent required.'
  static-timeline-card:
    surface: '{colors.ramp-grit-0}'
    border-color: '{colors.ink-outline}'
    border-width: '{spacing.ink-bold}'
    radius: '{rounded.md}'
    shadow-offset: '{spacing.offset-shadow}'
    shadow-color: '{colors.ink-outline}'
    padding: '{spacing.panel-pad}'
    title-type: '{typography.display-era}'
    title-color: '{colors.ink-primary}'
    title-ink-shadow: '{colors.ink-outline}'
    year-type: '{typography.telemetry}'
    body-type: '{typography.body}'
    body-color: '{colors.ink-primary}'
    tag-type: '{typography.label}'
    halftone-color: '{colors.halftone-dot}'
    halftone-scale: '{spacing.halftone-scale}'
    note: 'Tier-0 pure-2D cel. `surface` swaps per AltitudeBand from the ramp tokens (ground shown as default). On neon fills, title/body flip to ink for ≥4.5:1. Same dialect as World + Chrome; SVG halftone is temporally static (PEAT-safe).'
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
    note: 'The ONLY chrome element permitted the accent fill (résumé download, primary CTA). High-luminance teal → dark ink text. Press collapses the offset shadow so the button physically presses down (transform only).'
  button-ghost:
    surface: 'transparent'
    surface-hover: '{colors.surface-plate}'
    text-color: '{colors.ink-primary}'
    text-type: '{typography.ui-action}'
    border-color: '{colors.keyline}'
    border-width: '{spacing.ink-hair}'
    radius: '{rounded.DEFAULT}'
    shadow-offset: '{spacing.offset-shadow-sm}'
    shadow-color: '{colors.ink-outline}'
    padding-x: '{spacing.4}'
    padding-y: '{spacing.2}'
    note: 'Secondary actions: theme toggle, motion/pause toggle, repo link. Light keyline so the ink dialect still reads on the dark canvas.'
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
    eyebrow-type: '{typography.eyebrow}'
    eyebrow-color: '{colors.ink-tertiary}'
    title-type: '{typography.display-era}'
    title-color: '{colors.ink-primary}'
    ink-shadow-color: '{colors.ink-outline}'
    ink-shadow-offset: '{spacing.offset-shadow-sm}'
    year-type: '{typography.telemetry-lg}'
    year-color: '{colors.ink-secondary}'
    rule-color: '{colors.accent}'
    halftone-color: '{colors.halftone-dot}'
    note: 'Band eyebrow (mono) + inked display era title + mono year. `rule-color` defaults to the accent but swaps to the active band emissive from the ramp on scroll.'
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
    note: 'Borderlands-style loot card for era arrivals / notable artifacts. `accent-strip` swaps per band from the ramp. Hard offset shadow + halftone edge. Any drop-in animates transform/opacity only — no strobe, no bloom flicker.'
---

# Career Ascent — Design System

A cinematic, scroll-driven 3D "career world" rendered as **comic-book concept-art come to life**. The visitor pilots a rocket-camera up an altitude axis from radio-era ground (BAE, 2004) to deep-space agentic AI (Axioms of AI). This document is the single visual reference for both the **Spectacle Layer** (the WebGL world) and the **Content Truth Layer** (the SSR DOM a recruiter actually reads). One cel dialect; three surfaces; no layer sacrificed for another.

> **North star:** credibility over spectacle. The look must survive a skeptical Staff/Principal reviewer at content, performance, **and** source layers. DOM is truth; WebGL is a leaf enhancement island. Color earns altitude — it is not sprayed.

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

**Ink is never `#000000`.** The outline is a warm-or-cool near-black chosen per altitude: `{colors.ink-outline-warm}` low, the neutral `{colors.ink-outline}` default, `{colors.ink-outline-cool}` up top. This keeps the "inked comic" read without the deadness of pure black.

**One disciplined chrome accent.** `{colors.accent}` signal-teal is the *only* accent the UI chrome spends — on the focus core, active/current-era state, the through-line, and the single primary CTA. It is deliberately the **connective "advancement" hue**: teal seeds at Warby (calibration), strengthens through the stratosphere (nodes), peaks at orbit, and returns in deep-space as the duotone partner to magenta. Rendering the career through-line in teal makes the "it converged" moment a *color payoff*, not just geometry. Everything else saturated is diegetic — it lives in the world, keyed per band.

### The six-band grit → neon ramp

Saturation — the **chroma budget** a band is allowed to spend — increases monotonically with altitude. `AltitudeBand` is non-decreasing along the Career Sequence, so the arc is guaranteed to climb as you scroll up. Each band base fill is a flat token; the world reads it, the chrome reads it, the Static Timeline reads it — one source, three surfaces (AD-1).

| Token | Band | Role — the feeling color carries |
|---|---|---|
| `{colors.ramp-grit-0}` `#8A5A2B` | **ground** | Rust. Heaviest, grittiest, most matte. "Color is scarce down here" — establishes the floor so the neon payoff later lands. Only glow permitted: phosphor green `{colors.band-ground-emissive}`. |
| `{colors.ramp-grit-1}` `#5B6B7A` | **low-atmosphere** | Steel-slate. Dust gives way to steel-and-glass sky; first gloss pops (`{colors.band-low-emissive}`, `{colors.band-low-spark}`). Still restrained. |
| `{colors.ramp-lift-2}` `#6E8296` | **clouds** | Luminous muted slate — a *lit* cloud deck, never white. Three eras share the band: base holds, the accent carries the variety (`{colors.band-clouds-emissive}`, `{colors.band-clouds-signage}`). |
| `{colors.ramp-lift-3}` `#3E6B72` | **stratosphere** | Desaturated teal — the chroma pivot where color visibly *earns altitude*. Constellation nodes and relationship-line filaments first render here. |
| `{colors.ramp-neon-4}` `#12E0C8` | **orbit** | Plasma-teal. Full neon arrival. Max cel contrast: near-black void, hot teal fills, crisp ink. Selective bloom lives here (emissive + high luminance threshold, not global). |
| `{colors.ramp-neon-5}` `#FF3D9A` | **deep-space** | Plasma-magenta. Peak saturation on the fewest lit forms — darkest canvas, most chroma. Held in complementary duotone with orbit-teal: the finale reads as a **teal + magenta poster**. This is the visual climax; restraint everywhere except here. |

**Arc-integrity rules.**
- Phosphor green at the bottom and teal/magenta at the top are the *only* saturated notes at their altitudes — no mid-band accent may out-shout the summit.
- `{colors.accent-gold}` is the recurring "compliance / payments / structure" motif (Splash → Justworks → orbit). It is **world-diegetic only**, never a chrome accent — so the "one primary accent per theme" discipline holds for the UI.
- The true summit neon (`ramp-neon-5` magenta) is reserved to the deep-space band and never appears in chrome.

**Contrast floor.** All persistent chrome text holds **≥4.5:1** against the worst-case backdrop across the full ascent, delivered via the cel plate (flat fill + ink border), verified at the brightest (clouds) and darkest (deep-space) bands. Neon fills demand dark ink text; dark bands demand light text. See the Static Timeline per-band text pairing in §7.

---

## 3. Typography

**Bold where it flexes, clean where it must be read.** Three families, three jobs.

- **Display — heavy comic-grotesk** (`{typography.display-hero}`, `{typography.display-era}`, `{typography.display-loot}`). Hero name, era titles, and loot callouts **only**. Candidate face **Bungee** (with Rubik Mono One / a distressed heavy grotesk as alternates) — [ASSUMPTION], safe to finalize, keep it heavy and inked. Display type is *always* inked: a layered offset `text-shadow` in `{colors.ink-outline}` gives the screen-printed comic edge. Era titles drop in like loot cards.
- **Body — Geist** (`{typography.body-lg}` / `{typography.body}` / `{typography.body-sm}`, plus `{typography.title}` / `{typography.subtitle}` for headings). Satoshi is the sanctioned alternate. Carries every Detail Panel, résumé line, essay, and link. Must hold ≥4.5:1 on the worst-case band backdrop. **Panel and section headings use body-bold, not the display face** — display is reserved for spectacle voice.
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

**Breakpoints** (prose, not tokens): compact < 640px, tablet 640–1024px, desktop > 1024px. The layout must **reflow to 400% zoom** without horizontal scroll (WCAG 1.4.10) and honor `forced-colors` / `prefers-contrast`.

**Full-height rule:** any full-viewport surface uses `min-h-[100dvh]`, **never** `h-screen`.

---

## 5. Elevation & Depth

**Depth is drawn, not blurred.** The entire system rejects Gaussian shadow and airbrushed light.

- **Hard offset shadows, zero blur.** Every card, panel, button, marker, and callout casts a solid-color offset shadow — `{spacing.offset-shadow-sm}` / `{spacing.offset-shadow}` / `{spacing.offset-shadow-lg}` in an ink color (`{colors.ink-outline}` family). Elevation = offset distance. On press, the offset *collapses* (the object presses toward the surface) — animated with `transform` only.
- **Tonal layering** carries in-plate depth: `{colors.surface-sunken}` → `{colors.surface-plate}` → `{colors.surface-raised}`. A `{colors.keyline}` hairline separates dark-on-dark plate edges where an ink border alone would vanish against `{colors.canvas}`.
- **In the world, depth is the toon ramp + parallax**, not shadow: 2–3 discrete tone steps per form, layered parallax strata, atmospheric fog stepping per band. Never a smooth blend.
- **Neon is not the depth device.** No outer-glow halos to fake elevation (banned). The one sanctioned emissive lighting is *selective bloom* in orbit/deep-space, driven by emissive materials at a high luminance threshold — a light source in the fiction, not a UI shadow.
- **Focus indicator sits above everything**, including the canvas (see `focus-ring` in §8).

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
The signature is a **variable-weight, slightly imperfect** black contour. Architecturally critical: the **baseline outline is inverted-hull geometry** (`{spacing.ink}`-equivalent hull scale on hero silhouettes), *not* a post-process pass — because the runtime monitor sheds postprocessing first (AD-13), and the brand's signature must not be the first casualty. The **Sobel/edge-detect post-pass is a Tier-3 enhancement on top**, adding the variable-weight imperfect line. Outline thickens on hero forms and on selection/hover emphasis; instanced stars, particles, and repeated tech-nodes get **no per-object hull** (draw-call budget). The imperfection is a **per-object spatial seed, never per-frame temporal noise** (flash-safety + demand-loop stability). In chrome, ink is expressed as `{spacing.ink-hair}`–`{spacing.ink-bold}` solid borders in the `{colors.ink-outline}` family; in inked type, as layered offset `text-shadow`.

### 7.3 Halftone (where, and at what scale)
The darkest tone step of every band carries a **dot-screen / cross-hatch** — the "comic ink" tell. In-world: baked into the gradientMap/texture at the identity floor, with a full-density post-pass at Tier 3. In chrome: an inline SVG `<pattern>` in header strips and shadow edges at `{spacing.halftone-scale}` (coarser `{spacing.halftone-scale-coarse}` when tiers drop), colored `{colors.halftone-dot}`. **Halftone is spatially static or scroll-locked — never a per-frame shimmer** (PEAT hard gate: no flash > 3×/sec at large area / high luminance).

### 7.4 The six-band grit → neon ramp in the render
Atmosphere, poster fill, shadow-band, ink, and emissive are keyed per band and climb the arc:
`{colors.ramp-grit-0}` (ground rust, matte, single phosphor note) → `{colors.ramp-grit-1}` (low steel-slate, first gloss) → `{colors.ramp-lift-2}` (clouds luminous slate) → `{colors.ramp-lift-3}` (stratosphere desat-teal, chroma pivot) → `{colors.ramp-neon-4}` (orbit plasma-teal, selective bloom) → `{colors.ramp-neon-5}` (deep-space plasma-magenta, teal-magenta duotone climax). Band-to-band transitions are **continuous but stepped/dithered** — a crossfade of parallax + fog + color-grade + particle density that reads as poster banding, **never** an airbrushed blend and **never** a hard cut.

### 7.5 Chrome mirrors world (explicit)
The 2D chrome is **derived from the 3D world dialect, not a parallel style.** It reads the *same* ramp tokens, the *same* ink-outline colors, and the *same* halftone at UI scale — expressed cheaply: thick borders for the outline, flat fills for the toon ramp, hard offset shadows for depth, SVG `<pattern>` for halftone, layered `text-shadow` for inked type. A HUD plate, a Detail Panel, and an orbit station are the same object at different scales. Every Component in §8 is built from these shared primitives.

### 7.6 Degradation of the cel look (Tier 3 → 0)
The dialect degrades **polish before identity** (maps onto AD-9 / AD-13; behavioral ladder in EXPERIENCE.md §9):
- **Tier 3:** toon ramp + inverted-hull + Sobel outline + full halftone + comic grain + selective bloom (orbit/deep-space) + full particles/parallax.
- **Tier 2:** drop comic grain first; reduce halftone density (coarser, baked-lean); bloom at ½–¼ res; particle caps down.
- **Tier 1:** drop the Sobel post-pass — **inverted-hull + toon ramp only**; halftone baked into the gradientMap; no bloom; minimal particles.
- **Tier 0:** no WebGL — the **Static Timeline** renders the whole language in pure 2D (thick CSS/SVG borders, flat poster fills from the ramp tokens, hard offset shadows, SVG halftone). Same brand, zero GPU.

Inverted-hull + toon ramp are geometry/material — the **identity floor that is never on the shed list**; only a surface switch to Tier 0 removes them.

### 7.7 Reduced-Motion (orthogonal) and flash-safety
Reduced-Motion is a *motion* preference, orthogonal to fidelity: it suppresses camera flight, parallax, idle-drift, physics, and any animated halftone/grain, but the **cel aesthetic is never stripped**. Per AD-9 the concrete delivery is the tier-0 2D cel Static Timeline (which *is* the dialect rendered statically) — the spine forbids a mounted "still" canvas. **Flash-safety is a hard gate even in full-motion:** halftone stays static, loot-beam glow and launch/ignition bloom **ramp/ease and never strobe**, comic grain stays low-contrast. PEAT verifies the animated-cel path in CI.

---

## 8. Components

Every component below is the cel dialect at UI scale: flat fill, ink border, hard offset shadow, no blur, no smooth gradient. Tokens resolve to §2–§6. The Truth-Layer components (`detail-panel`, `static-timeline-card` body, `hud-telemetry` values) stay **sober and high-contrast** — spectacle does not bleed onto reading surfaces.

**`hud-telemetry`** — instrument gauge on a cel plate (`{components.hud-telemetry.surface}` with `{components.hud-telemetry.border-color}` + small offset shadow). Mono readouts (`{typography.telemetry}` / `{typography.telemetry-lg}`), uppercase labels (`{typography.label}`) in `{colors.ink-tertiary}`, values in `{colors.ink-primary}`. Current-era emphasis uses a thin `{colors.accent}` mark — never a glow. Holds ≥4.5:1 over any band.

**`detail-panel`** — the film "HOLD" reading surface and the credibility payload. Bold ink border (`{spacing.ink-bold}`), large offset shadow, `{typography.title}` heading + `{typography.body-lg}` prose in `{colors.ink-primary}`, real links in `{colors.accent}`, tech-node tags as `{typography.label}` chips. Halftone confined to a header strip. **Quiet by design.**

**`timeline-rail`** — vertical, gridded, monospaced years (`{typography.telemetry}`). Current era = flat **fill swap** to `{colors.accent}` + ink emphasis (`{components.timeline-rail.active-ink}`), never a glow. Round nodes (`{rounded.full}`) with ink borders. Reflects Career-Data order (AD-1).

**`waypoint-marker`** — a selectable in-world point that is a real focusable control. Round, ink-bordered, small offset shadow; selection = flat `{colors.accent}` fill swap. Must carry a DOM-focus equivalent (never raycast-only).

**`static-timeline-card`** — the tier-0 cel card and the SEO/`<noscript>`/reduced-motion/fallback surface. `surface` swaps per `AltitudeBand` from the ramp tokens (ground default shown); bold ink border, hard offset shadow, inked `{typography.display-era}` title, mono year, `{typography.body}` prose. On neon fills (orbit/deep-space) title and body flip to ink for ≥4.5:1; on dark bands they use `{colors.ink-primary}`. SVG halftone is temporally static.

**`button-primary`** — the single sanctioned accent moment (résumé download / primary CTA): `{colors.accent}` fill, dark ink text (`{colors.ink-outline-cool}`), ink border, hard offset shadow that **collapses on press** (transform only). This is the *only* chrome element permitted the accent fill.

**`button-ghost`** — secondary actions (theme toggle, motion/pause toggle, repo link): transparent fill, `{colors.keyline}` hairline so the ink dialect reads on the dark canvas, mono uppercase label. Persistent and keyboard-reachable.

**`focus-ring`** — dual-backdrop, design-critical. A teal `{colors.focus-core}` core wrapped by a concentric **ink `{colors.focus-halo-ink}` + paper `{colors.focus-halo-paper}`** double outline, so one ring always clears ≥3:1 whether the backdrop is bright-cloud or deep-space. Renders above the canvas. Never `outline:none`, never color-only.

**`era-title-lockup`** — mono band eyebrow (`{typography.eyebrow}`, `{colors.ink-tertiary}`) → inked `{typography.display-era}` title with offset `text-shadow` → mono `{typography.telemetry-lg}` year. A rule in `{colors.accent}` that swaps to the active band emissive on scroll.

**`loot-callout`** — the one playful chrome element: a Borderlands-style loot card for era arrivals / notable artifacts. Raised surface, bold ink border, large offset shadow, `{typography.display-loot}` inked title, halftone edge, a per-band `accent-strip`. Playful but never at the cost of the panel's legibility discipline; drop-in animates transform/opacity only — no strobe, no bloom flicker.

---

## 9. Do's and Don'ts

| Do | Don't |
|---|---|
| Use flat poster fills with 2–3 discrete toon steps. | Use smooth CSS/GPU gradients or airbrushed lighting anywhere. |
| Cast hard offset shadows (`{spacing.offset-shadow}` in ink). | Use blurred / Gaussian drop shadows. |
| Outline in the ink family (`{colors.ink-outline}` warm/cool). | Use pure `#000000` for ink or `#000000` backgrounds (use `{colors.canvas}`). |
| Keep the world's inverted-hull + toon ramp as the identity floor. | Put the signature ink outline *only* in a post-process pass (it sheds first). |
| Reserve the summit neon (`{colors.ramp-neon-5}`) to the deep-space band. | Let mid-band accents out-saturate the orbit/deep-space payoff. |
| Spend exactly ONE chrome accent (`{colors.accent}` teal). | Spray neon on chrome or add a second UI accent. |
| Use neon-glow bloom only as diegetic light in orbit/deep-space. | Use outer-glow as a depth device on chrome. |
| Set hero/era/loot in the display face; body/mono for everything read. | Set reading body in the display face, or headings in Geist. |
| Hold chrome text ≥4.5:1 on the worst-case band via the cel plate. | Let text ride directly on a moving, bright, or busy backdrop. |
| Keep halftone spatially static / scroll-locked. | Animate halftone per-frame or strobe any effect > 3×/sec. |
| Render the focus ring above canvas as an ink+paper double outline. | Ship `outline:none` or a color-only focus indicator. |
| Use `min-h-[100dvh]` for full-height surfaces; animate transform/opacity. | Use `h-screen`, or animate layout/color/filter on the hot path. |
| Keep the Truth Layer sober — suppress neon/halftone where content is read. | Let spectacle bleed onto Detail Panels or résumé text. |
| Ship the light `-light` token set; keep the cel dialect theme-invariant. | Restate literal hex/px in EXPERIENCE.md instead of `{path.to.token}` refs. |
| Fabricate no metrics — use `[metric]` placeholders when real data is absent. | Invent uptime/response-times/statistics or use AI-cliché copy. |