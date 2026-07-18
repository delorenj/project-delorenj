# Career Ascent — Visual & Art-Direction Brief

*Harvested signal for DESIGN.md. Sources: `prd.md` (§1, §11 Aesthetic & Tone, §10 a11y/perf NFRs, Glossary), `addendum.md` (§H Career World Map, §C motion constants, §F Era→Scene map, §K/§L perf & rendering), and the UX `.memlog.md` resolved forks. All four visual forks below are DECIDED and treated as law. Seed hexes are extended into full stepped ramps; anything I invented beyond a seed is tagged `[INFERRED]` and is safe to tune but should keep the stated arc.*

---

## 0. The Non-Negotiables (restated as law)

1. **Aesthetic = CEL / TOON (Borderlands lineage).** Hard-stepped ramp shading (flat poster fills, NOT smooth gradients), bold black ink outlines on every form, halftone / cross-hatch texture inside shadow bands. Comic-book concept-art-come-to-life. It should *feel like a video game*.
2. **Chrome = INKED INSTRUMENT.** The 3D world goes full cel. The readable chrome (HUD, Detail Panels, Timeline Rail, Static Timeline) keeps instrument discipline — legible, gridded, restrained density — but wears the cel skin: bold outline, flat fill, halftone accents, **hard OFFSET shadows (no blur)**, no smooth gradients. Not full-cockpit sci-fi, not a clean neutral UI.
3. **Palette = GRIT → NEON ASCENT.** Saturation *increases with altitude* across six bands. Color EARNS altitude; it is the primary non-camera cue that "higher = later / more advanced."
4. **Theme = DARK-ANCHORED.** Primary canvas deep-space `#0B0F1A` (never pure `#000`). Cel fills + ink outlines pop hardest on dark. Dark is design-primary and the token baseline; a secondary light set + manual theme/motion toggle still ship (architecture mandates theme-awareness).
5. **Lettering = CHUNKY DISPLAY + CLEAN SANS + MONO.** Heavy comic-grotesk display for hero/era titles/loot callouts ONLY; Geist or Satoshi for body (WCAG-legible); JetBrains Mono for telemetry/years/HUD.

**North star that overrides every art choice:** credibility over spectacle. The look must survive a skeptical Staff/Principal reviewer at content, performance, AND source layers. DOM is truth; WebGL is a leaf enhancement island. Neither layer is sacrificed for the other.

---

## 1. The Cel Dialect (one visual language, three surfaces)

Every surface — the 3D world, the chrome, and the tier-0 Static Timeline — speaks ONE dialect so they read as the same object. The dialect's five constants:

- **Flat poster fills.** Each form gets 2–3 discrete tone steps from a `gradientMap` ramp (MeshToonMaterial), never a smooth gradient. Think screen-printed poster, not airbrush.
- **Bold ink outline.** Black/near-black contour on every silhouette. In-world: inverted-hull or post-process edge detect. In chrome/2D: 2–3px solid borders. Outline color is warm-black or cool-black per band (see ramps), NOT flat `#000`.
- **Halftone / cross-hatch in shadow bands.** The darkest tone step carries a dot-screen or cross-hatch texture (SVG halftone in 2D; screen-space or texture in 3D). This is the "comic ink" tell.
- **Hard offset shadows, zero blur.** Drop shadows are solid-color, offset (e.g. `4px 4px 0`), never Gaussian. Applies to cards, panels, loot callouts, buttons.
- **No smooth gradients anywhere.** Where a transition is needed (band-to-band sky), use stepped color banding or dithered/halftone gradients, not CSS/GPU smooth blends.

**Degradation order of the cel look across Fidelity Tiers** (must be authored, ties to §10 perf gate): drop post-process outline/halftone FX FIRST → then reduce ramp steps → keep flat fills + 2D borders longest. Tier-0 expresses the whole language in cheap 2D (thick borders, flat fills, hard offset shadows, SVG halftone dot-screens) so world + chrome + fallback never diverge.

---

## 2. The Six Altitude Bands — era, motifs, set pieces, feeling, cel treatment

*Bands are non-decreasing along the Career Sequence (equal allowed). Full-fidelity 3D is reserved for the two signature bookends — `ground` (BAE radio-waves) and `orbit`→`deep-space` (agentic AI / Axioms); transitional bands (`low-atmosphere`, `clouds`, `stratosphere`) get lighter kinetic-type / particle / wireframe cel treatments. This protects the premium impression on a solo timeline.*

### BAND 1 — `ground` · Eras 0–1 · Prologue + BAE Systems (2004–2010)
- **Scenes:** `PrologueLaunchpadScene`, `RadioLabScene`.
- **Feeling:** grounded, engineered, physical. The heaviest, grittiest, most matte band — the "before you leave Earth" weight. Desaturated Pandora-grit.
- **Prologue set pieces:** dark launchpad, early machines, code notebooks, signal towers, internship badges (Lockheed Martin, Unisys, **Stevens Institute of Technology**).
- **BAE set pieces:** radio hardware, antennas, oscilloscopes, spectrum analyzers, green phosphor waveforms, SCA block diagrams, test benches, tangled cabling.
- **Tech-node motifs:** embedded systems, Java/J2EE/EJB, AJAX, SCA, TDD/Agile, metrics automation, design patterns.
- **Cel treatment:** thick outlines, matte rust/steel poster fills, heavy cross-hatch in shadow. The ONE glow permitted is the oscilloscope phosphor green — a single restrained emissive against an otherwise unlit, dusty environment. Establishes "color is scarce down here" so the neon payoff later lands.

### BAND 2 — `low-atmosphere` · Era 2 · Web / Agency (Noise, Firstborn, ~2009–2012)
- **Scenes:** `WebEraScene` **+** `CreativeAgencyScene` (deliberate 1-Era→2-Scene: Rails/Ajax discipline vs. Flash/agency flash).
- **Feeling:** kinetic, creative, high-gloss. The browser learns to move. First lift-off — dust gives way to steel-and-glass sky.
- **Set pieces:** browser windows/chrome, Flash motion fragments, jQuery "sparks," PHP panels, Symfony/MVC scaffolds, Rails track rails, Backbone lattices, early AR/object-recognition overlays.
- **Tech-node motifs:** Flash, PHP, Symfony, Rails, Ajax, Backbone, MVC, APIs, object recognition, AR.
- **Cel treatment:** first introduction of GLOSS — a few saturated pop accents (jQuery-spark magenta, gloss cyan) against steel-slate poster fills. Kinetic type fragments and floating browser-panel wireframes. Slightly more chroma than ground; still restrained.

### BAND 3 — `clouds` · Eras 3–5 · Warby Parker → ClassPass/SagePoint → Splash (2013–2018)
- **Scenes:** `VisionCloudScene`, `StartupCloudCityScene`, `PlatformDecompScene`.
- **Feeling:** ascent into clouds; reality gets *interpreted*; startup velocity, ambiguity, founder energy; then architecture becoming visible. Three eras share the band, so **base color holds and the ACCENT carries the internal variety** — do not restate the band, re-light it.
- **Warby (vision) set pieces:** camera grids, face landmarks, glasses overlays, calibration screens, neural-looking UI, glassy panels floating in cloud. *Accent: calibration cyan + face-landmark pink node dots.*
- **ClassPass/SagePoint set pieces:** cloud city, neon storefronts, booking flows, resource nodes, matching graphs, skill-taxonomy trees. *Accent: warm neon storefront signage.*
- **Splash set pieces:** a monolith splitting into services, API pipes, webhook pulses, OAuth padlocks, event trails. *Accent: electric-blue API pipes + OAuth-lock gold.*
- **Tech-node motifs:** computer vision/perception, CMS, B2B SaaS, multi-tenancy, skill taxonomy, resource matching, Rails monolith decomposition, decoupled API platform, third-party integrations, real-time analytics.
- **Cel treatment:** luminous slate-blue cloudscape (dark-anchored — a lit cloud deck, NOT white), glassy cel panels, wireframe matching-graphs. Pale-sky poster fills brighten; chroma steps up again.

### BAND 4 — `stratosphere` · Era 6 · Justworks (2018–2024)
- **Scene:** `StratosphereArchitectureScene`.
- **Feeling:** staff-level pattern recognition; whole-system sight; systems-at-scale. The transitional band where color visibly *earns altitude* — this is the pivot from grit toward neon.
- **Set pieces:** Earth curvature / horizon limb glow, architecture constellations, service diagrams, temporal trees, compliance engines, payment orbits.
- **Tech-node motifs:** TimeEngine, OvertimeEngine, Payment Center, GraphQL, React, distributed systems, Testing Maturity Model, hybrid RAG.
- **Cel treatment:** thinning atmosphere, star-field begins, Earth's curved limb with a hard cel horizon line. Constellation nodes + Relationship-Line "why this matters later" filaments render here as a first-class motif. Desaturated-teal transitional base bridges cloud-slate to orbit-plasma; clearly higher chroma than clouds.

### BAND 5 — `orbit` · Era 7 · ACD + IntelliForia (2023–present)
- **Scene:** `OrbitAIScene`.
- **Feeling:** current frontier; systems that reason / act / verify. Full neon arrival. First signature-bookend band with full-fidelity 3D + selective bloom.
- **Set pieces:** orbital stations, MCP docking ports, retrieval beams, clinical-note satellites, compliance shields, voice-waveform paths, agent constellations.
- **Tech-node motifs:** RAG, MCP, multi-agent orchestration, evaluation, guardrails, voice notes, real-time compliance scoring, secure healthcare data.
- **Cel treatment:** plasma-teal emissive against void ink; this is where selective bloom lives (emissive materials + high luminance threshold, NOT global bloom). Retrieval beams and docking-port glows are the hero light sources. Max cel contrast: near-black void, hot teal poster fills, crisp ink outlines.

### BAND 6 — `deep-space` · Era 8 · Axioms of AI (finale, atemporal)
- **Scene:** `DeepSpaceAxiomsScene`.
- **Feeling:** identity / framework; the summit; the arc resolved. Peak saturation on the fewest lit forms — the darkest canvas, the most chroma.
- **Set pieces:** floating axioms as orbital tablets, AI/HE-ratio gauge, requirements/acceptance-criteria rendered as cosmic forces, management-as-gravity metaphor (gravity-well field lines). "The framework built from the journey."
- **Cel treatment:** near-black void; plasma-magenta as hero, kept in complementary duotone with orbit-teal so the finale reads as a **teal + magenta poster** at maximum chroma. Axiom tablets are the emissive light. This is the visual climax — restraint everywhere except here.

---

## 3. The Grit → Neon Color Arc (consolidated + full ramps)

**Baseline chrome canvas (all bands, dark theme):** `#0B0F1A` deep-space navy-black. Each band *tints the world atmosphere* around this; the chrome plate stays anchored to it.

**Saturation trajectory:** ground (near-grayscale grit) → low-atmosphere (first gloss pops) → clouds (luminous but muted) → stratosphere (chroma pivot) → orbit (full neon) → deep-space (peak neon duotone).

Seed values from the forks are marked ★. Extended steps are `[INFERRED]` — tune freely, keep the arc and keep every ramp hard-stepped (no smooth interpolation between steps in render).

| Band | Atmosphere / Fog | Poster fill — LIGHT | Poster fill — MID (base) | Shadow band (halftone) | Ink outline | Neon / emissive accent |
|---|---|---|---|---|---|---|
| **ground** | `#4A3420` warm dust haze → `#241A12` | `#B07C42` | `#8A5A2B` ★rust | `#4E3117` (cross-hatch) | `#120D08` warm-black | phosphor green `#7CF06E` (single, restrained) — plus neutral dust `#C2B9A7` ★ / `#8F887A` |
| **low-atmosphere** | `#37424E` steel dusk | `#7E8E9C` | `#5B6B7A` ★steel-slate | `#33404B` | `#101720` | gloss cyan `#2FBBD6` + jQuery-spark magenta `#F25C9C`; pale sky `#A9BCC9` |
| **clouds** | sky void `#1B2836`; cloud fill `#9FB4C6` | `#C7D6E2` ★pale sky | `#6E8296` (from `#5B6B7A`) | `#46596B` | `#0F1922` | Warby calibration cyan `#43D6C4`; landmark pink `#FF5C9E`; ClassPass neon `#FF8A3D`; Splash API-blue `#3E8CE0` / OAuth gold `#F2C24A` |
| **stratosphere** | `#0E1A2A` void, `#16283B` horizon glow | `#5C919A` | `#3E6B72` desat-teal (transitional) | `#244249` | `#0B1620` | node cyan `#4FE3D2`; relationship-line `#6FD8FF`; temporal-tree gold `#F2C24A` |
| **orbit** | void ink `#06131A` → `#08202A` | `#5FF0DE` | `#12E0C8` ★plasma teal | `#0A8478` | `#04121A` | retrieval-beam white-cyan `#B9FFF4`; compliance-shield gold `#F2C24A`; agent-node teal `#12E0C8` |
| **deep-space** | near-black `#05070D` | `#FF77BC` | `#FF3D9A` ★plasma magenta | `#A31E5F` (halftone) | `#06060C` | complementary teal `#12E0C8` (duotone partner); gravity-field violet `#B14BFF` |

**Arc-integrity rules:**
- The phosphor green at ground and the plasma teal/magenta at the top are the *only* saturated notes at their altitudes — do not let mid-band accents out-shout the summit.
- Teal (`#12E0C8`) is the connective "advancement" hue: it seeds at Warby (calibration), strengthens through stratosphere (nodes), peaks at orbit, and returns at deep-space as the duotone partner to magenta. Use it to render the career **through-line / Relationship Lines** so the "it converged" moment is a color payoff, not just geometry.
- Gold (`#F2C24A`) is the recurring "compliance / payments / structure" accent from Splash → Justworks → orbit.

---

## 4. Motion, Atmosphere & Camera Art Direction

**Governing constants (from addendum §C — art direction must honor):**
- `CAMERA_SMOOTHING_TAU_MS = 120` — damped follow, never 1:1 rigid.
- `MAX_CAMERA_TILT_DEG = 12` — tilt ceiling; **0 in reduced-motion**; returns to neutral at rest.
- `TRAVEL_MS_PER_SEGMENT = 550`, `TRAVEL_MS_MAX = 2600` — waypoint-jump launch: accelerate → arc → ease-in; farther = longer, bounded and snappy.
- Physics body caps per tier `{t3:40, t2:20, t1:8, t0:0}`.

**Per-band atmosphere gradient** (drives "altitude legibility via atmosphere," §11 — the metaphor must read from art direction, not camera height alone):

| Band | Fog / haze | Parallax depth layers | Particle field | Camera-mode / tilt |
|---|---|---|---|---|
| ground | thick, warm, low — dusty | few, heavy, close (crowded lab) | slow dust motes | grounded **dolly**; minimal tilt (≤3–4°); weighty |
| low-atmosphere | clearing steel haze | mid; browser-panels at varying depths | drifting gloss fragments / sparks | gentle lift, slight arc; light tilt |
| clouds | volumetric cloud banks, soft occlusion | many, deep — cloud strata | cloud vapor + calibration dots + storefront neon flecks | **arc into clouds**; banking tilt |
| stratosphere | thin haze, horizon glow, Earth limb | deep — constellation far-field | first star-field + relationship-line filaments | wider, slower; tilt to reveal curvature |
| orbit | near-vacuum, crisp; rim light only | very deep — stations near, stars far | dense stars + retrieval-beam particles | **orbital tumble**; full tilt range; pivots to look up/down like a rocket |
| deep-space | none — pure void | sparse, infinite | sparse axiom-glyphs, gravity-field lines | slow reverent orbit; controlled tilt; the "hold" is longest here |

**Pacing — film beats (every era):** entrance → **HOLD** → exit. The HOLD is calm and readable — camera settles, motion quiets, cel-flat Detail Panels appear so the eye and the résumé content breathe. This is when the chrome does its job. Camera-mode variety across bands (dolly → arc → tumble) is mandatory to keep a long ascent from feeling monotonous.

**Band transitions:** continuous atmospheric crossfade (parallax + fog + color-grade + particle-density shift), **never a hard cut** — but because smooth gradients are banned by the cel dialect, transitions read as *stepped/dithered banding* between poster tones, not airbrushed blends. No discontinuous "pop" between bands during free-scroll.

**Diegetic onboarding cue:** teach "scroll up = up in time and altitude" within the first **3–5 seconds** via an in-world cue (Bruno-Simon style), NOT a tutorial overlay. Visual: an ignition/liftoff beat at the launchpad that reads instantly as "this goes up."

**Flash-safety hard gate (overrides spectacle):** no effect — launch flash, bloom flicker, ignition, strobe — flashes >3×/sec at large area / high luminance. PEAT-verify the launch tween and deep-space effects. This constrains the ignition and the orbit/deep-space emissive pulsing.

---

## 5. Typography System

- **Display (chunky comic-grotesk):** hero title, era titles, and Borderlands-style **loot callouts** ONLY. Candidates: **Bungee**, **Rubik Mono One**, or a distressed heavy grotesk. Heavy weight, tight, often outlined/inked to match the cel dialect. Era titles can drop in like *loot cards* (hard offset shadow, halftone edge). Pick is `[INFERRED]` to finalize.
- **Body (clean sans, WCAG-legible):** **Geist** or **Satoshi**. Carries Detail Panel prose, résumé, essays, all reading content. Must hold ≥4.5:1 on the worst-case band backdrop. Never set body in the display face.
- **Mono (telemetry):** **JetBrains Mono** for HUD readouts, year labels, altitude, coordinates, tech-node tags, and any "instrument" numerics. Reinforces the inked-instrument chrome.

Rule of thumb from the fork: **bold where it flexes, clean where it must be read.** Display is the loot/spectacle voice; body/mono are the credibility voice.

---

## 6. Two-/Three-Layer Doctrine — visual-identity implications

The site has THREE co-equal exhibits; the visual identity must serve all three without one cannibalizing another.

1. **Spectacle Layer (WebGL world)** — full cel-shade, the hook. It is a *leaf enhancement island*: `next/dynamic ssr:false`, mounted post-hydration over already-SSR'd DOM. Visually it can be maximal; structurally it is disposable/enhancement.
2. **Content Truth Layer (DOM = truth)** — real SSR HTML: résumé, project detail, outbound links, Detail Panels. **All primary text lives in the DOM**, never trapped as WebGL textures. This layer wears the **inked-instrument** chrome (see §7). It is what a recruiter actually uses in <30s without booting WebGL.
3. **Source-as-Exhibit (the repo)** — public, inspectable, AI-aware, disciplined. Not a visual surface per se, but the *design system itself is part of the exhibit*: clean tokens, one dialect, documented — the code must look as considered as the pixels.

**Hard visual-identity consequences:**
- **One dialect, three surfaces.** World, chrome, and tier-0 Static Timeline are unmistakably the same object (flat fills, ink outlines, halftone, hard offset shadows). The Static Timeline is not a "lite mode" — it's the same brand in cheap 2D and it doubles as SEO body, `<noscript>` mirror, reduced-motion mode, and low-end/context-lost fallback.
- **Contrast over a moving backdrop.** All persistent chrome text (HUD, Timeline Rail, panel chrome) holds ≥4.5:1 against the *worst-case* backdrop across the full ascent — via a scrim/plate or luminance-adaptive treatment, verified at the brightest (clouds) and darkest (deep-space) bands. The cel plate (flat fill + ink border) is the natural vehicle for this.
- **Focus indicator is design-critical.** Never `outline:none`. A visible ring rendered ABOVE the canvas, ≥3:1 contrast, legible on both bright-cloud and deep-space backdrops — use a halo/double-outline (the ink-outline motif does double duty), never color-only.
- **The canvas is decorative to a11y.** `aria-hidden` or `role=img` + labelled by visible DOM; every era is a real focusable `<button>/<a>`, never raycast-only. Visual selection state must have a DOM-focus equivalent.
- **Spectacle never buys slowness.** Cel adds render passes (outline + halftone); the perf budget must absorb them, and the cel look must degrade gracefully (outline/post FX shed first). If spectacle makes it janky on a mid-tier phone, it has *destroyed* the signal — restraint is the design, not a compromise.

---

## 7. Chrome / Inked-Instrument spec

The chrome is a *disciplined instrument wearing the cel skin* — legible, gridded, restrained information density, but rendered in the cel dialect. Concretely:

- **Panels & cards:** flat poster fill, 2–3px solid ink border, **hard offset shadow** (e.g. `5px 5px 0` in ink or band-shadow color), no blur, no smooth gradient. Optional halftone dot-screen in a header strip or shadow edge.
- **Timeline Rail:** vertical, gridded, monospaced year labels (JetBrains Mono), current-era highlight as a flat fill swap + ink emphasis (not a glow). Reflects Career Data Layer order; highlights current era on scroll.
- **HUD:** year / altitude / progress in mono, on a cel plate for contrast. Reads like an instrument gauge, not a sci-fi cockpit.
- **Detail Panel:** the "hold"-state reading surface — clean body sans, generous measure, real links, ink-bordered, hard-shadowed. This is where credibility is delivered; keep it calm and readable.
- **Loot callouts:** the ONE place the chrome gets playful — era arrivals / notable artifacts can drop in as Borderlands-style loot cards (display face, halftone, hard shadow) — but they must not compromise the panel's legibility discipline.
- **Buttons/toggles** (theme + motion toggle, résumé download, repo link): flat fill, ink border, offset shadow that "presses" on active. The reduce-motion and light/dark toggles are persistent and keyboard-reachable.

---

## 8. Brand & Voice Adjectives (implied)

**Visual/experiential:** cinematic, grand, magnitude-conveying, gritty-to-neon, comic-book-concept-art-come-to-life, video-game, inked, poster-flat, high-contrast, restrained (one defended idea), inventive, unmistakably personal, "revolutionary for its moment" (a spiritual successor to jaradd.com 2006), credible-under-inspection.

**Copy / product voice (§11):** confident senior systems-architect — **precise, a little wry, never boastful**; lets the arc and the artifacts do the bragging. The tone contract: spectacle in the world, humility in the words. Display type shouts; body type quietly proves.

**Emotional arc:** weight and grit at the ground → lift and gloss in the web era → interpretation and velocity in the clouds → whole-system clarity in the stratosphere → frontier confidence in orbit → resolved identity in deep space. Color, motion, and voice should all trace this one curve.

---

## 9. Anti-references / guardrails (explicitly avoid)

- A generic template landing page.
- "Five giant scroll sections with big empty gaps" / "nothing breathed."
- A **shader-zoo** where every scene competes as a hero and fidelity is uneven era-to-era (this is *the* failure mode — hence full 3D only for the two signature bookends).
- Spectacle that sacrifices readability; a tech-demo with nothing to say.
- Smooth gradients, soft/blurred drop shadows, airbrushed lighting — all violate the cel dialect.
- Pure `#000000` backgrounds (use `#0B0F1A`), or letting mid-band accents out-saturate the orbit/deep-space payoff.
- Motion that induces sickness: `prefers-reduced-motion` *replaces* the ascent with the native-scroll Static Timeline (tilt→0, no parallax, no physics), plus a persistent in-UI pause toggle.

---

## 10. Theme tokens — dark primary + light secondary + degradation

**Dark (design-primary, token baseline):** canvas `#0B0F1A`; text high-contrast off-white `#EDF1F7` `[INFERRED]`; per-band atmosphere + accents per §3. Static Timeline stays dark, high-contrast.

**Light (secondary, must exist for theme-awareness) `[INFERRED — tune]`:** canvas paper `#F4F1EA` (warm, keeps the Pandora-grit kinship, not sterile white); ink outline stays `#120D08`; text `#141A24`; band accents *desaturate slightly and darken* to hold ≥4.5:1 on light (e.g. teal → `#0E9E8C`, magenta → `#C21E6E`, phosphor green → `#3E9E3A`). The cel dialect (flat fills, ink borders, hard offset shadows, halftone) is theme-invariant — only the fill/atmosphere tokens swap.

**Fidelity-tier degradation of the cel look (perf gate, tier 3→0):**
- **Tier 3:** full cel — post-process outline + halftone + selective bloom (orbit/deep-space), full particle/parallax, physics.
- **Tier 2:** outline via cheaper inverted-hull, halftone reduced, bloom at ½–¼ res, particle caps down.
- **Tier 1:** flat toon fills + geometry outline only, no post FX, minimal particles, no physics.
- **Tier 0 (Static Timeline):** the cel language in pure 2D — thick CSS borders, flat fills, hard offset shadows, SVG halftone dot-screens — same dialect, zero WebGL.

---

**Source file paths for downstream drafters:**
- `/home/delorenj/code/project-delorenj/_bmad-output/planning-artifacts/prds/prd-project-delorenj-2026-07-15/prd.md` (§1 vision, §11 Aesthetic & Tone, §10 a11y/perf gates, §3 Glossary — canonical band + term names)
- `/home/delorenj/code/project-delorenj/_bmad-output/planning-artifacts/prds/prd-project-delorenj-2026-07-15/addendum.md` (§H Career World Map — per-era motifs & "Feeling," §C motion constants, §F Era→Scene map, §K/§L perf & cel-render implications)
- `/home/delorenj/code/project-delorenj/_bmad-output/planning-artifacts/ux-designs/ux-project-delorenj-2026-07-16/.memlog.md` (the four resolved forks + cel-shade reconciliation)