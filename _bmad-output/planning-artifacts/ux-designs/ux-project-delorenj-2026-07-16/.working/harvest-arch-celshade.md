# Architecture→UX Constraint Harvest + Cel-Shade Render/Degradation Brief

**Career Ascent Portfolio World** — bindings from `ARCHITECTURE-SPINE.md` (AD-1..AD-19) + `addendum.md` (§C/§D/§L/§N). Every constraint below is traced to an AD by the number the spine assigns it. The four RESOLVED VISUAL FORKS and the CEL-SHADE TECHNICAL DIALECT are treated as decided and are mapped onto the spine's Fidelity Tiers (AD-9) and shed order (AD-13), not re-litigated.

---

## (a) Architecture Decisions that bind UX — one-line UX implication each

| AD | Spine title (verbatim spirit) | UX implication (what the interface must do because of it) |
|---|---|---|
| **AD-1** | Career Data Layer is the single source of truth | Every band color, era title, year label, tech motif, panel body, and résumé line is read from one typed record keyed by **slug**; the "GRIT→NEON" saturation arc must be tokenized **per `AltitudeBand` in `data/`** and read identically by WORLD, CHROME, and Static Timeline — never hardcoded per surface. `band` + year range live on the one Era record; `EraSegment.band` and waypoint altitude can't disagree. |
| **AD-2** | DOM is truth; WebGL is an `ssr:false` island on top | The cel 3D world is a **leaf enhancement**; all hero/era text is SSR'd DOM and is the LCP element. The cel canvas mounts behind a **cel-styled poster/skeleton** (flat fill + ink border), never becomes LCP, never traps content. |
| **AD-3** | Exactly one persistent GlobalCanvas; switch scenes by `visible` | One canvas for the whole ascent; era scenes stay mounted and toggle visibility. The cel **material/outline modules must pre-warm** (no per-transition MeshToonMaterial/outline recompile hitch) — shared, not per-era pipelines. |
| **AD-4** | Single scroll authority + single RAF; `frameloop='demand'` | Cel passes must **not force continuous rendering** — static halftone/outline/grain must not call `invalidate()` every frame; only scroll/tween/physics invalidate. A per-frame-animated shimmer would defeat `demand`, burn battery, and (see AD-16) risk flash. |
| **AD-5** | Never `setState` in the frame/scroll loop | Quality-tier, `reducedMotion`, `activePanel` are discrete React state; per-frame cel uniforms (outline weight, ramp step, halftone offset) live in **refs / `getState()`**, never React state inside `useFrame`. |
| **AD-6** | One Sequence config drives DOM heights **and** world offsets | DOM section heights and world waypoint altitudes derive from `data/sequence.config.ts`; the Static Timeline's vertical band lengths and the 3D altitude of each cel scene are the **same derived numbers** — the 2D fallback and 3D world share one spatial rhythm. |
| **AD-7** | One scrubbable GSAP camera timeline is runtime authority | `free-scroll` seeks the playhead, `waypoint-jump` tweens the **same** playhead (`power3.inOut`, bounded, interruptible). No second camera system. Cel idle-drift/parallax are *decorations on* this timeline, gated by the motion flag. |
| **AD-8** | World axis is the Career Sequence, not raw year | Layout is a monotonic non-overlapping sequence; **Altitude Band is non-decreasing** → the GRIT→NEON saturation arc is guaranteed monotonic up the scroll. Concurrent roles co-locate as artifacts within an Era's band, not their own altitude. |
| **AD-9** | Reduced-Motion and Fidelity Tier are orthogonal degrade-to-truth modes | **Surface-selection is deterministic:** `reduced-motion` **OR** Tier 0 **OR** no-WebGL2 **OR** `webglcontextlost` ⇒ WebGL island **not mounted/torn down**, **Static Timeline is the rendered surface**. Spectacle is **OFF by default in code**, enabled only when `prefers-reduced-motion` does not match. One motion flag gates all camera/parallax/physics. A persistent keyboard-reachable reduce/pause toggle exists. |
| **AD-10** | Static Timeline is one component, four jobs | The **same** artifact is SEO body + `<noscript>` + Reduced-Motion Mode + low-end/context-lost fallback. This is the **tier-0 pure-2D cel surface** (section c) — not a separate "lite" page; it exposes every Era, Detail Panel, résumé, and link the World does. |
| **AD-11** | Real per-era routes; deep-link cold-load **places**, never launches | Each Era is a real `/journey/[era]` route with own SSR meta/JSON-LD/OG. **Cold-load sets the camera at the Waypoint with panel open (no launch tween)** → the cel scene must be correct as a *settled static frame*, not mid-flight; only in-session selection fires the AD-7 tween. Unknown slug → 404 into the Static Timeline; old slugs alias/redirect. |
| **AD-16→AD-18 reconcile** | Single navigation/history authority | Scroll-settle `replaceState`-track and rail/Waypoint `pushState`-select **both** go through one Next-router module; scenes/rail/HUD **never** call `history.*`. Route change → sets camera target (via AD-7); camera motion → rewrites route **only on settle**, one-way. |
| **AD-13** | Perf budget = CI gate; one runtime quality monitor | `data/perf-budget.json` is CI-enforced against the **resident-window sum**, not per-asset. **One** `PerformanceMonitor` with hysteresis owns runtime downgrade; **shed order = postprocessing → particles → DPR → LOD**; avg FPS < 40 for > 2 s → down one Tier. The cel outline/toon/halftone/grain passes must **slot into this shed order** (section b/d) and count against the budget. No other module downgrades quality. |
| **AD-14** | Scene contract: data-driven, composable, fallback-bounded, anachronism-free | Every Era = ≥1 `<Name>Scene` assembled from **shared composable cel modules** (`spectacle/rendering/`: toon materials, halftone/cross-hatch, outline, band transitions) — not N bespoke pipelines. Each scene has a **bounded loading state + degraded per-scene fallback** (low-LOD/billboard or the Era's panel). Per-scene asset/R2 failure → that scene's fallback (isolated); only boot Tier 0 / no-WebGL2 / context-lost → coarse Static Timeline. Set pieces must match that Era's Tech Nodes. |
| **AD-16** | Accessibility is a first-class launch invariant | Every Era is a real focusable `<button>/<a>` firing the **same** nav as click (never raycast-only); skip-link first; `h1`(name)→`h2`(era); no canvas keyboard trap. **Focus indicator renders above the canvas, ≥3:1 on both bright-cloud and deep-space backdrops (halo/double-outline, not color-only)**; persistent chrome text holds **≥4.5:1 vs worst-case backdrop**. Current Era/year in a **polite ARIA live region** on scroll-settle/arrival. Target Size 2.5.8, Reflow 400% 1.4.10, forced-colors/`prefers-contrast`. **Flash-safety is a hard gate even in full-motion (PEAT in CI).** |
| **AD-17** | One Detail-Panel & focus controller | One `activePanel` slice + one controller; **at most one panel open**; open moves focus in, close restores focus to trigger, Esc dismisses. World, Static Timeline, and deep-link cold-load open panels through the **same path** with identical Career-Data content. A selected cel Artifact/Waypoint **calls this controller** — it never rolls its own focus handling. |
| **AD-19** | Single analytics event schema authority | One typed registry + one `track()`; every SM event keyed by Era **slug**. **Scroll-traversal arrival and jump arrival are two distinct named events** (SM-2 = two clean numbers) — the Static Timeline's anchor-clicks map to jump-arrival, scroll-into-view to traversal. `track()` honors DNT/GPC; consent sequencing must not collide with the 3–5 s onboarding cue. No ad-hoc event names. |

---

## (b) Cel-Shade Degradation Ladder — Tier 3 → 0 (mapped onto AD-9 / AD-13)

**Cel technique cost classes** (this ordering is the load-bearing translation):

- **Identity floor (geometry/material, ~free, survives everything down to Tier 1):** `MeshToonMaterial` + stepped `gradientMap` (2–3 discrete bands); **inverted-hull** ink outline on hero silhouettes; **baked** halftone/cross-hatch in the ramp/texture.
- **Enhancement layer (postprocessing full-screen passes — first to shed under AD-13):** post-process **edge-detect / Sobel outline** (the variable-weight imperfect contour), **halftone density post-pass**, **comic grain**, **selective bloom** loot-beams.

> **Critical constraint from AD-13:** the runtime monitor sheds **postprocessing first**. Therefore the ink outline must **not** live *only* in a post-process pass, or the brand's signature would be the first casualty at 40 fps. **Baseline outline = inverted-hull (geometry).** The Sobel pass is a Tier-3 *enhancement* on top. This makes the cel *identity* survive quality shedding while the *polish* degrades — exactly what AD-9's "degrade-to-truth" demands.

| Axis / pass | **Tier 3 (full)** | **Tier 2** | **Tier 1** | **Tier 0** |
|---|---|---|---|---|
| **Surface (AD-9)** | WebGL island | WebGL island | WebGL island | **No WebGL — Static Timeline (2D cel)** |
| **Toon ramp** (`MeshToonMaterial`+gradientMap) | 3-band ramp, all hero surfaces | 3-band | 2–3 band (unchanged, ~free) | CSS flat poster fills (section c) |
| **Ink outline** | Post-process Sobel (variable-weight, all objects) **+** inverted-hull on heroes | Inverted-hull heroes **+** Sobel (if headroom) | **Inverted-hull only** (drop Sobel) — task's Tier-1 rule | Thick CSS/SVG borders (2D) |
| **Halftone / cross-hatch** | Post-FX dot-screen + cross-hatch shadow bands, full density | **Reduced density** (coarser dots, fewer bands) + **baked-only** | Baked-into-gradientMap only (no post pass) | SVG `<pattern>` dot-screen fill |
| **Comic grain** | On (low-contrast) | **Off** (first drop, task's Tier-2 rule) | Off | Off (or static CSS noise) |
| **Loot-beam glow** (selective bloom, emissive + `luminanceThreshold≈1`) | Full-res selective bloom | **½–¼ res** (per §L) | **Off** (mobile/tier≤1 per §L) | CSS flat "loot-callout" chip, no glow |
| **Particles/stars** (AD-13 shed #2) | Full instanced counts | Reduced count | Minimal | None (static SVG accents) |
| **DPR** (AD-13 shed #3) | ≤2 | ≤1.5 | ≤1 | n/a |
| **LOD** (AD-13 shed #4) | Full geometry | LOD kicks earlier | Billboards/low-LOD | n/a |
| **Physics (post-MVP, AD-14)** | `tier3:40` bodies | `tier2:20` | **`tier1:8`** | `tier0:0` |

**AD-13 intra-postprocessing shed order for cel (so the monitor degrades polish before identity):**
`comic grain → halftone density post-pass → bloom (full→½–¼→off) → post-process Sobel outline` **→ then** the generic `particles → DPR → LOD`. Inverted-hull + toon ramp are geometry/material and are **never** on the shed list — they are the identity floor that only Tier-0 removes (by switching surfaces).

### Reduced-Motion (orthogonal) — how it behaves

Per the cel direction, reduced-motion is a **motion** preference orthogonal to the tier/quality axis: it suppresses **camera flight, parallax, idle-drift, physics, and any animated halftone/grain**, but the **cel aesthetic is never stripped**.

**However — honor AD-9 exactly:** reduced-motion is one of the four *deterministic surface-selection* conditions. When it holds, the WebGL island is **not mounted**, and the **Static Timeline is the rendered surface** — the spine states *"reduced-motion never mounts a 'still' canvas."* So the concrete delivery of "keeps the cel look statically" is the **tier-0 2D cel Static Timeline** (section c), which *is* the shared cel dialect rendered statically. The orthogonality holds at the *aesthetic* level (cel survives), not at the *surface* level (AD-9 couples reduced-motion → Static Timeline).

- The single **motion flag** (AD-9) re-evaluates on the `matchMedia` change event and gates *all* camera/parallax/physics/idle-drift.
- `MAX_CAMERA_TILT_DEG → 0` and idle-drift → 0 in reduced-motion (addendum §C).
- The persistent in-UI reduce/pause toggle (AD-9, WCAG 2.2.2) flips the same flag; OS setting alone doesn't satisfy it.

> **Open item to flag, do not silently assume:** if the design intends a *paused-but-mounted 3D cel frame* under reduced-motion on capable devices (rather than the 2D Static Timeline), that **contradicts AD-9 as written** and requires an AD-9 amendment. Under the current spine, reduced-motion = tier-0 2D cel surface.

---

## (c) Tier-0 Pure-2D Cel Expression — the Static Timeline (AD-10)

One SSR'd component (`truth/StaticTimeline/`) that **is** the SEO body, `<noscript>` mirror, Reduced-Motion Mode, and no-WebGL/context-lost fallback (AD-10). Works with **JS disabled and WebGL unavailable**. Expresses the **one shared cel dialect** in 2D CSS/SVG — no gradients, no blur.

**Structure & motion path (AD-6 / AD-8 / AD-16):**
- Vertical timeline of Era panels, ordered by the **same `sequence.config` offsets** as the world (AD-6); band lengths mirror world altitude spans. Altitude Band non-decreasing (AD-8) → color climbs the GRIT→NEON arc as you read up-sequence.
- Logical DOM order (AD-16): skip-link (first tab stop) → `<main>` → `h1` (Jarad's name) → `h2` per Era. Prologue = pre-roll at bottom of sequence, Axioms = fixed anchor at top.
- Static by default (no camera, no strobe → inherently PEAT-safe). Non-reduced tier-0 may use flash-safe CSS hover (offset-shadow nudge); reduced-motion suppresses even that.

**Cel-in-2D token recipe:**
- **Ink outline** → thick solid borders (`border: 3px solid #0B0F1A`), slightly irregular via layered offset borders or an SVG turbulence filter (temporally static — no per-frame jitter).
- **Hard offset shadow (no blur)** → `box-shadow: 6px 6px 0 #000` on cards/chips; **never** a blurred shadow.
- **Inked type** → layered offset `text-shadow` (e.g. `2px 2px 0 #000`) on the heavy display font.
- **Halftone / cross-hatch** → inline SVG `<pattern>` dot-screen / hatch as shadow-band fills — static, zero animation.
- **Flat poster fills** → one solid color per `AltitudeBand`, read from the AD-1 data-layer band tokens (not hardcoded here).

**Palette tokens (dark-primary baseline `#0B0F1A`; secondary light set also specified) — "color earns altitude":**

| Band (AD-8 literal) | Fill (grit→neon) | On-fill text (WCAG ≥4.5:1) |
|---|---|---|
| `ground` | rust `#8A5A2B` / dust `#C2B9A7` | dust-on-rust needs check; use ink `#0B0F1A` on dust, off-white on rust |
| `low-atmosphere` / `clouds` | steel-slate `#5B6B7A` + pale sky | off-white on slate; ink on pale sky |
| `stratosphere` | transitional (slate→teal) | ink or off-white per luminance |
| `orbit` | plasma-teal `#12E0C8` + void ink | **ink `#0B0F1A` on teal** (teal is high-luminance) |
| `deep-space` | plasma-magenta `#FF3D9A` + near-black | **ink on magenta**, or off-white on near-black plate |

*(Seed values from the resolved fork; finalize exact hexes against the ≥4.5:1 gate — neon fills need dark ink text, dark bands need light text.)*

**Typography roles (resolved fork 5):** heavy comic-grotesk display (Bungee / Rubik Mono / distressed heavy grotesk) for **era titles + loot-style callouts only**; Geist/Satoshi body (WCAG-legible); JetBrains Mono for years/telemetry/HUD readouts.

**Behavior wired to the spine:**
- **Detail Panels (AD-17):** open through the *same* single controller — with JS, at-most-one-open + focus-in/restore + Esc; without JS, degrade to native `<details>` or the per-era `/journey/[era]` route (AD-11). Identical Career-Data content (AD-1).
- **Every Era = real `<button>/<a>` (AD-16)** firing the same nav; focus indicator = halo/double-outline ≥3:1 (renders fine on the dark canvas; verify against each neon band plate).
- **Analytics (AD-19):** anchor-click to an Era = **jump-arrival** event; scroll-into-view = **traversal** event; both keyed by slug via the one `track()`.
- **Routing (AD-11):** links are real routes; unknown slug 404s *into* this timeline.
- **Theme (AD-16):** dark token set is baseline; ship the secondary light set + `forced-colors`/`prefers-contrast` handling — the border-heavy cel dialect maps cleanly onto forced-colors (borders + system colors survive).

---

## (d) Perf & Flash-Safety Guardrails the cel passes impose

**Perf budget (AD-13 — asserted against the resident-window sum, CI-gated):**
1. **Inverted-hull doubles draw calls + ~doubles triangle submission** for every outlined mesh → pressures `draw calls ≤ 50 mobile / 100 desktop` and `triangles ≤ 500k`. **Restrict hull outline to hero silhouettes**; instanced stars/particles/repeated tech-nodes get **no per-object hull** (would blow the mobile draw-call cap). Toon ramp is a material swap — negligible, cheaper than PBR.
2. **Each full-screen post-pass (Sobel, halftone, grain) is a fixed postprocessing cost** on top of selective bloom. They **must be registered in AD-13's shed order** (postprocessing first) so the monitor can drop them without touching the toon+hull identity floor. Bloom stays **selective** (emissive + `luminanceThreshold≈1`), **½–¼ res at Tier 2, off at Tier ≤1** (§L); DOM legibility must **never** depend on any post-pass.
3. **Texture memory ≤ 256–384 MB mobile / ≤1 GB desktop** (AD-13): gradientMap ramps are tiny; halftone/cross-hatch must be **small tileable KTX2, mipmapped, shared** under `spectacle/rendering/` (AD-14 composable) — never unique per-era halftone atlases, which would inflate the resident-window sum (AD-14 residency authority disposes outside the adjacent-era window).
4. **First WebGL load < 6 MB / hard cap ~15 MB** (AD-13): cel ramps + tileable patterns are byte-cheap; keep them in shared modules, not per-scene, so the first-load and per-era streaming budgets hold.
5. **`frameloop='demand'` (AD-4):** static halftone/outline/grain must **not** `invalidate()` per frame. Only scroll/tween/physics/interaction invalidate — a per-frame-animated cel shimmer would defeat demand-rendering and battery.

**Flash-safety (AD-16 — hard gate *even in full-motion*, WCAG 2.3.1-A, PEAT in CI):**
6. **Halftone dot-screen must be spatially static or scroll-locked** — no per-frame shimmer that flashes **> 3×/sec at large area / high luminance**. Any animated shadow-band halftone reveal stays small-area / low-luminance or **< 3 Hz**.
7. **Loot-beam glow and launch/ignition bloom must ramp/ease, never strobe** (AD-16 names launch/bloom/ignition explicitly).
8. **The variable-weight "imperfect" ink contour must be temporally stable** — seed the per-object jitter, do **not** re-randomize per frame. Per-frame outline flicker would (a) shimmer-flash, (b) desync the demand loop, (c) burn renders. The "imperfect" signature is a per-object *spatial* seed, not *temporal* noise.
9. **Comic grain must be low-contrast**; prefer static or scroll-coupled grain over high-frequency temporal noise at high luminance.
10. **Verification surface:** because AD-9 routes reduced-motion → Static Timeline (no canvas), the animated-cel flash surface exists **only** in the non-reduced, Tier ≥1 WebGL path — **PEAT must run against that path** in CI, alongside axe on the SSR DOM (AD-16 automated a11y gate) and the AD-13 perf-budget gate.

---

### Key reconciliations surfaced (flagged, not silently assumed)

- **Ink-outline placement vs AD-13 shed order:** outline baseline **must** be inverted-hull (geometry), not post-process — else the brand signature sheds first. *This is the single most important architectural translation of the cel direction.*
- **Reduced-motion vs "still cel canvas" (AD-9):** the spine forbids a mounted still canvas; reduced-motion delivers the cel look via the **tier-0 2D cel Static Timeline**. A paused-3D-cel reduced-motion state would need an AD-9 amendment.
- **Band color arc (GRIT→NEON) is data, not surface CSS (AD-1/AD-8):** tokenize per `AltitudeBand` in `data/`, read by WORLD + CHROME + Static Timeline; monotonic saturation is guaranteed by AD-8's non-decreasing band rule.
- **Deep-link cold-load (AD-11):** the cel scene must be correct as a **settled static frame**; toon+hull are static-frame-correct, so this is satisfied by the identity floor.

**Source files:** `/home/delorenj/code/project-delorenj/_bmad-output/planning-artifacts/architecture/architecture-project-delorenj-2026-07-16/ARCHITECTURE-SPINE.md` (AD-1..AD-19, Stack, Consistency Conventions, §C constants via addendum) and `/home/delorenj/code/project-delorenj/_bmad-output/planning-artifacts/prds/prd-project-delorenj-2026-07-15/addendum.md` (§C motion constants + `PHYSICS_BODY_CAP`, §D types, §L integration patterns / shed order, §N hosting).