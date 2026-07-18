---
name: Career Ascent
description: The interaction and information-architecture contract for Career Ascent — peer to DESIGN.md — defining how the scroll-driven cel-shaded career world behaves, degrades, and stays credible across the Spectacle and Truth layers, with every visual value cross-referenced to a DESIGN.md token.
status: final
updated: 2026-07-18
design: ./DESIGN.md
sources:
  - ./DESIGN.md
  - ../../prds/prd-project-delorenj-2026-07-15/prd.md
  - ../../prds/prd-project-delorenj-2026-07-15/addendum.md
  - ../../specs/spec-project-delorenj/SPEC.md
  - ../../specs/spec-project-delorenj/capability-traceability.md
  - ../../architecture/architecture-project-delorenj-2026-07-16/ARCHITECTURE-SPINE.md
  - ../../planning-artifacts/epics.md
---

<!-- STALE-BANNER v2026-07-18 -->
> ⚠️ **PARTIALLY STALE — 2026-07-18 pivot.** The **behavioral half** (SSR, routing-as-truth, Static Timeline as a co-equal surface, the WCAG launch gate, DOM-is-truth) is superseded by the 2026-07-18 spectacle-first pivot — see `architecture-project-delorenj-2026-07-18`. The world model, journeys, camera/interaction, and cel dialect still inform the build.


# Career Ascent — Experience & Interaction Contract

This is the behavioral half of the system. **DESIGN.md is the visual reference** — every color, type role, radius, spacing step, and component skin is defined there and named here by `{path.to.token}`. This document says how the thing *behaves*: what navigates, what opens, what degrades, what a screen reader hears, and how five named people move through the world. Where this file and any mock, import, or component-library default disagree, **the spine's token/rule wins on conflict**.

> **North star:** credibility over spectacle. The site must be *cited* in hiring conversations and survive a skeptical Staff/Principal reviewer at three co-equal layers — content, performance, and source. DOM is truth; WebGL is a leaf enhancement island. Neither layer is sacrificed for the other.

---

## 1. Foundation

**Form factor:** a single responsive web surface — one continuous rendered "Career World," not a set of pages. **Desktop-primary, mobile first-class.** No native app; no separate mobile site. The whole experience is one route tree served SSR-first with a WebGL enhancement island mounted on top (AD-2).

**UI system:** a **custom system**, not a component library. DESIGN.md is the visual source of truth; this file references it by token and never restates literal values. The system is expressed as **one cel dialect across three surfaces** — the 3D World, the 2D Chrome, and the tier-0 Static Timeline — so a HUD plate `{components.hud-telemetry}`, a Detail Panel `{components.detail-panel}`, and an orbital set piece read as the same object at different scales.

**Full-height rule:** any full-viewport surface uses `min-h-[100dvh]`, never `h-screen`. **Hot-path rule:** interface motion animates `transform` / `opacity` only — never layout, color, or filter on scroll/tween/physics paths.

**Single-authority runtime (never jitters):** one persistent `GlobalCanvas` (scenes toggle `visible`, never remount — AD-3); one scroll authority (GSAP ScrollTrigger on Lenis, no `drei ScrollControls`); one RAF loop with `frameloop='demand'` (AD-4); one scrubbable camera timeline (AD-7); one navigation/history authority (AD-11); one Detail-Panel + focus controller (AD-17); one analytics `track()` (AD-19); one runtime quality monitor (AD-13). No module writes `history.*`, calls `setState` inside `useFrame`, or spins a second camera.

---

## 2. The Two-Layer Contract (Spectacle ↔ Truth)

The product is two co-equal layers held in tension. This section is the behavioral framing; the visual framing lives in DESIGN.md §1 (Brand & Style) — the two must never contradict.

**Spectacle Layer — the WebGL world (the hook).** Full cel-shade, maximal, cinematic. It is *structurally disposable*: an `ssr:false` island mounted over already-SSR'd DOM. **It never becomes the LCP element, never traps text, and never owns a fact.** Everything it shows that matters as content is a mirror of DOM the browser already has.

**Content Truth Layer — the DOM (what a recruiter actually uses).** Real SSR HTML: résumé, project detail, outbound links, Detail Panels, and the Static Timeline. It wears the **inked-instrument** chrome — legible, gridded, restrained density, rendered in the cel dialect but **sober where content must be read**: neon and halftone are suppressed on reading surfaces (`{components.detail-panel}`, `{components.static-timeline-card}` body).

**The contract, stated as behavior:**
1. **Truth is reachable without the Spectacle.** Every Era, panel, résumé line, and outbound link exists in DOM and is navigable with WebGL off, JS off, or a dead GPU.
2. **Spectacle never gates Truth.** A camera flight, an inspect grab, or a loot drop-in is always optional polish on top of content that already rendered.
3. **They share one source.** Band color, era title, year label, panel body, and résumé line are read from the one typed Career Data Layer keyed by slug (AD-1) — World, Chrome, and Static Timeline read the *same* record, never a hardcoded per-surface copy.
4. **They share one spatial rhythm.** DOM section heights and world waypoint altitudes derive from the same `sequence.config` (AD-6), so the 2D fallback and 3D world climb at the same pace.

**The failure test the contract must pass (UJ-1 edge case):** when the world cannot render, the visitor sees the Static Timeline with the same facts and links **and never notices anything was missing.**

---

## 3. Information Architecture

### 3.1 Primary surface
- **Career World** (`/`) — the single continuous environment, carrying the persistent **Timeline Rail**, **HUD**, and **résumé / contact** affordances. Root-vs-per-era content is differentiated and canonicalized so the home route never self-competes in search.

### 3.2 Altitude Bands (vertical zones; altitude increases with time)
`ground` → `low-atmosphere` → `clouds` → `stratosphere` → `orbit` → `deep-space`. Bands are **non-decreasing** along the Career Sequence (AD-8) — which is what guarantees the grit→neon saturation arc (`{colors.ramp-grit-0}` … `{colors.ramp-neon-5}`) climbs monotonically as you scroll up.

### 3.3 Canonical Era set (9 Eras; Prologue = Era #0)

| # | Era | Altitude Band |
|---|-----|---------------|
| 0 | Prologue (Lockheed / Unisys / Stevens Institute of Technology — launchpad) | `ground` |
| 1 | BAE Systems (radio / signals) | `ground` |
| 2 | Web / Agency era (Noise, Firstborn) | `low-atmosphere` |
| 3 | Warby Parker (vision) | `clouds` |
| 4 | ClassPass / SagePoint (startup) | `clouds` |
| 5 | Splash (platform decomposition) | `clouds` |
| 6 | Justworks (architecture at scale) | `stratosphere` |
| 7 | ACD / IntelliForia (agentic AI) | `orbit` |
| 8 | Axioms of AI (finale) | `deep-space` |

**MVP renders 4 full waypoints across 4 bands + the deep-space bookend:** BAE (`ground`), Warby (`clouds`), Justworks (`stratosphere`), ACD/IntelliForia (`orbit`); Axioms (`deep-space`) is part of the top signature bookend. Full-realized 3D is reserved for the **two signature bookends** (ground radio-waves, orbit→deep-space AI/Axioms); transitional eras get lighter kinetic-type / particle / wireframe treatments — protecting the "no shader-zoo" rule.

### 3.4 Surfaces & routes
- **Career World / home** — `/`; the world experience.
- **Per-Era deep links** — `/journey/[era]` (e.g. `/journey/computer-vision`). Real History-API routes, **no hash/fragment routing.** Each carries unique SSR title/meta/canonical, `Person` JSON-LD mirroring the DOM 1:1, OG/Twitter cards + static preview image, and a restorable scroll waypoint (AD-11).
- **Static Timeline** — one component, four jobs (AD-10): SEO body, `<noscript>` mirror, Reduced-Motion Mode, and low-end / no-WebGL / context-lost fallback. Mirrors every Era, Detail Panel, résumé, and link. Rendered as the tier-0 pure-2D cel surface via `{components.static-timeline-card}`.
- **Detail Panels** — per-Era and per-Artifact HTML overlays (Truth Layer), opened from a Waypoint or Artifact through the one panel controller (`{components.detail-panel}`, AD-17).
- **Résumé / CV** — authored once in MDX (single source), rendered as crawlable HTML + exportable PDF from the same source; reachable from persistent chrome via `{components.button-primary}`, never buried in one Era.
- **Project / case-study detail** — long-form HTML/MDX, each its own URL, readable without the Spectacle Layer.
- **Source-as-Exhibit** — public repository; the link is **persistent Truth-Layer UI** (not easter-egg-gated), present in the Static Timeline too. Surfaced via `{components.button-ghost}`.
- **About / Axioms of AI** — deep-space climax content (AI/HE Ratio, "agent as employee," requirements & acceptance criteria as forces).
- **404 / not-found** — an unknown or renamed Era slug returns a graceful 404 that **drops into the Static Timeline** (never a blank canvas); previously-published slugs stay resolvable via redirect/alias.
- **External** — LinkedIn (`linkedin.com/in/delorenj`, authoritative career source), GitHub, Medium (essays), contact (email + LinkedIn; **no form in v1**).

### 3.5 Navigation model
- **Timeline Rail** (`{components.timeline-rail}`) — persistent Truth-Layer list of Eras/years, reflecting Career-Data order (AD-1). Selecting one triggers a Waypoint jump; the current Era highlights (flat fill swap to `{components.timeline-rail.active-fill}`, never a glow) as the visitor moves.
- **HUD** (`{components.hud-telemetry}`) — persistent readout of current year and/or altitude plus overall progress, in `{typography.telemetry}` / `{typography.telemetry-lg}` on a cel plate.
- **Waypoints** (`{components.waypoint-marker}`) — one navigable anchor per Era (Prologue = #0); selectable in-world *and* via the rail, each a real focusable control with a DOM-focus equivalent (never raycast-only).
- **Career Sequence axis** — the world is laid out along a **monotonic narrative ordering** (Prologue → … → Axioms), not raw calendar year; a monotonic year *label* is derived for display. The **Primary Track** is single-valued at every sequence position; concurrent/overlapping roles co-locate as artifacts within the dominant Era's band.
- **Single navigation/history authority** (AD-11): `replaceState` tracks position during scroll (URL follows, no stacking); `pushState` fires only on explicit Waypoint selection; **Back** after deep-link entry returns to referrer / top anchor and never lands a broken state; scenes/rail/HUD never call `history.*` directly.

---

## 4. Voice and Tone

Brand voice lives in DESIGN.md §1 (Brand & Style); this section is microcopy Do/Don't pairs only. Never fabricate metrics — use a `[metric]` placeholder when real data is absent. Never use hype clichés (Elevate / Seamless / Unleash / Next-Gen and kin). Never format as `LABEL // YEAR`. No emojis in product UI.

**Orientation cue (diegetic, first 3–5s)**
- Do: "Up = later — climb through the years, or jump to any era." (teaches the inverted-scroll mechanic; dismisses after first interaction).
- Don't: "Scroll to explore." / "Welcome! Start your journey now." / a modal tutorial overlay.

**HUD readouts**
- Do: `2004 · GROUND` / `ALT 0 km · 6% ASCENT` (plain mono telemetry).
- Don't: `YEAR // 2004` / "You are here on your amazing adventure."

**Era title / loot callout arrivals**
- Do: "BAE Systems — Signals & Radio" / loot chip "PATTERN ACQUIRED: signal discipline."
- Don't: "Unleash the next chapter" / "A seamless leap forward."

**Detail Panel body & CTAs**
- Do: "Decomposed the monolith into [n] bounded services; owned the payment path." / button "Download résumé (PDF)" / link "Read the write-up."
- Don't: "Revolutionized scalability with cutting-edge, next-gen architecture." / invented "99.99% uptime" absent a source.

**Résumé / contact**
- Do: "Résumé — one page, honest." / "Reach me: email or LinkedIn."
- Don't: "Let's synergize!" / "Elevate your team with my expertise."

**Loading (per-scene)**
- Do: "Loading this era…" (bounded, on a cel plate).
- Don't: a blank canvas, an infinite spinner, or "Almost there!" with no bound.

**Degraded / fallback notices**
- Do: silent, seamless drop to lower fidelity — no notice. If surfaced: "Showing the timeline view."
- Don't: "Your device is too slow." / "WebGL failed." / any apology that blames the visitor.

**Reduced-motion & theme toggles**
- Do: "Motion: full / reduced" · "Theme: dark / light" (`{typography.ui-action}`, uppercase).
- Don't: "Turn off the fun." / "Boring mode."

**404 / empty / not-found**
- Do: "That era moved. Here's the whole timeline." (drops into Static Timeline).
- Don't: "Oops! Page not found [emoji]" / a dead canvas.

**Source-as-Exhibit**
- Do: "Read the source. It's meant to be inspected." / "Built with AI, to my standard — that's the point."
- Don't: "Please excuse any messiness." / any disclaimer that treats AI authorship as an apology.

**Screen-reader era announcement (live region)**
- Do: "Entering orbit — 2023, ACD / IntelliForia." (announced on scroll-settle / arrival).
- Don't: reading raw coordinates, or announcing every intermediate frame.

---

## 5. Component Patterns

Behavior and rules only — every visual spec (color, size, radius, shadow) lives in the referenced `{components.*}` token object in DESIGN.md. Nothing here restates a value.

**HUD telemetry — `{components.hud-telemetry}`.** Reads current year, altitude/band, and ascent progress from the camera playhead via refs/`getState()`, never React state inside the frame loop (AD-5). Updates are throttled to human-perceptible cadence; the value text is DOM (screen-reader reachable), not baked into WebGL. Current-era emphasis is a discrete mark, never an animated glow.

**Detail Panel — `{components.detail-panel}` (AD-17).** One `activePanel` at a time. Opening moves focus into the panel; closing (Esc, close control, or backdrop) restores focus to the trigger. At most one panel open — opening a second closes the first. World Waypoints, Static-Timeline anchors, and deep-link cold-load all open panels through the *same* controller with identical Career-Data content. A selected cel Artifact/Waypoint *calls* this controller — it never rolls its own focus handling.

**Timeline Rail — `{components.timeline-rail}`.** Selecting an entry issues a Waypoint jump (see §7/§8) and fires the analytics **jump-arrival** event keyed by slug. As the visitor free-scrolls, the rail highlights the settled Era (fill swap, not glow). Every entry is a real `<button>/<a>` firing the same navigation as a click, reserving a ≥ `{spacing.tap-target}` hit area (§10) regardless of the visual mark size.

**Waypoint Marker — `{components.waypoint-marker}`.** A selectable in-world point that is a real focusable control with a DOM equivalent. Pointer-click and keyboard Enter/Space fire identical navigation; selection is a flat fill swap, never bloom. Never raycast-only. Its hit area is ≥ `{spacing.tap-target}` via transparent hit-slop, decoupled from the small visual dot (§10).

**Static-Timeline Card — `{components.static-timeline-card}`.** Each Era is a card in `sequence.config` order (AD-6). With JS, its Detail Panel opens through the same single controller; without JS, it degrades to native `<details>` or its `/journey/[era]` route. Scroll-into-view fires the **traversal** analytics event; anchor-click fires **jump-arrival** (AD-19). Fully operable with JS and WebGL both unavailable.

**Buttons — `{components.button-primary}` / `{components.button-ghost}`.** Primary (résumé/CTA) and ghost (theme toggle, motion/pause toggle, repo link) both press by *collapsing the offset shadow* so the control moves toward the surface — `transform` only, no layout/color animation. Both are persistent and keyboard-reachable, each reserving a ≥ `{spacing.tap-target}` hit area (§10); ghost toggles are stateful (pressed/`aria-pressed`).

**Focus ring — `{components.focus-ring}`.** Rendered above the canvas for every focusable element. Follows logical DOM focus order; never `outline:none`; never color-only (behavioral detail in §10).

**Era title lockup / loot callout — `{components.era-title-lockup}` / `{components.loot-callout}`.** Arrival flourishes on the Spectacle side. Any drop-in animates `transform`/`opacity` only and must ramp/ease — no strobe, no bloom flicker (PEAT gate, §10). They decorate; they never carry a fact the Truth Layer lacks.

**Theme + motion toggles.** Two persistent ghost controls. **Theme** swaps the dark/`-light` token set (dialect stays theme-invariant; only fill/atmosphere tokens change). **Motion** flips the single motion flag that gates all camera/parallax/physics/idle-drift (AD-9); it re-evaluates on the `matchMedia` change event and is honored even when OS `prefers-reduced-motion` is unset (OS setting alone does not satisfy WCAG 2.2.2).

**Relationship lines (through-line).** Filaments connect a pattern in one Era to a capability in a later one (e.g. SagePoint taxonomy → RAG). The semantic through-line renders in **exactly one hue — the connective accent `{colors.accent}` teal** — so the single-accent color payoff on which the argument rests is never diluted by a second cyan; the same "it converged" relationships are also stated in panel prose so the meaning survives without the Spectacle. Below `orbit` the filaments carry **flat/emissive material color, not bloom-glow** (actual glow is reserved for `orbit`/`deep-space` per DESIGN.md §5); `{colors.band-strato-line}` is reserved for non-semantic filament *texture* only, never for the through-line itself.

---

## 6. State Patterns

**First-visit / diegetic onboarding.** Teach "up = later" (scroll up = forward in time and altitude — the non-obvious inverted-scroll mechanic) within the **first 3–5 seconds** via an *in-world* cue (Bruno-Simon style), not a tutorial overlay; the cue **dismisses cleanly after the first scroll interaction**. Any consent UI is sequenced **not to collide** with this cue and is keyboard- and reduced-motion-safe (AD-19).

**Loading (per-scene).** On approach/arrival a Scene shows a **bounded** loading placeholder — a cel-styled poster/skeleton (flat `{colors.surface-plate}` fill + `{colors.ink-outline}` border, per the dialect) — never a blank/broken canvas (FR-33). The DOM behind it is already rendered and readable.

**Scene degraded / failure.** Past a per-scene timeout or on asset/R2 fetch failure, a Scene degrades to a low-LOD/billboard stand-in or the Era's Detail Panel content. Failure is **isolated** — it does not cascade and does not trigger the coarse `webglcontextlost` → Static Timeline path (AD-14).

**Empty / no-data.** The Career Data Layer is SSOT (AD-1); an unknown/renamed Era slug resolves to a graceful 404 → Static Timeline, never a blank state.

**Error / not-found.** Graceful 404 that drops into the Static Timeline anchored sensibly; old slugs alias/redirect.

**Slow / flaky network.** A Waypoint jump or deep link can reach an Era faster than its assets stream — the bounded loading placeholder covers in-flight assets; the degraded fallback covers slow/failed fetches. Truth text is present throughout because it is SSR DOM.

**Cold deep-link entry (AD-11).** The camera is **PLACED** at the target Waypoint with its Detail Panel open — it does **not** play the from-ground launch tween (which would delay LCP / risk CLS). The cel scene must be correct as a *settled static frame* (toon ramp + inverted-hull are static-frame-correct). Reduced-Motion anchors instantly. **Only in-session selections trigger the launch tween.**

**Reduced-Motion Mode.** Entered when `prefers-reduced-motion` matches OR the visitor toggles it. Spectacle is **OFF by default in code**, enabled only when the OS preference does not match. A single motion flag gates all launch/parallax/physics/idle-drift, re-evaluated on the `matchMedia` change event. Per AD-9 this deterministically selects the **Static Timeline** as the rendered surface (the cel look survives, rendered statically — §9). Native/instant scroll; jump/crossfade instead of camera launch; tilt fully suppressed (`MAX_CAMERA_TILT_DEG → 0`, addendum §C); idle drift → 0. Full content parity.

**Low-tier / no-WebGL.** Fidelity Tier 0–3 (§9). Boot-time GPU detection (`detect-gpu`) + a runtime monitor with hysteresis; auto-downgrade one tier if avg FPS < 40 for > 2s (AD-13). Tier 0 / no-WebGL2 / context-lost ⇒ Static Timeline. Manual override available. Fidelity Tier and Reduced-Motion are **orthogonal**.

**Mid-session teardown of the WebGL island (context loss *or* FPS auto-downgrade).** Any mid-session teardown — an iOS-Safari-likely `webglcontextlost`, **or** the runtime monitor (AD-13) auto-downgrading across the Tier-1→Tier-0 boundary (AD-9, which tears the canvas down) — falls to the Static Timeline **anchored to the visitor's current Era**, re-opening the equivalent Detail Panel where possible — never dumped to the top. Both paths share one continuity contract (§9).

**Mobile simplified mode.** Adapts to a performant lower-fidelity spectacle (Tier 1–2, reduced effects, touch nav) preserving all content; holds the mobile frame budget or drops to the Static Timeline rather than stuttering.

**Inspect state (post-MVP).** An inspected Artifact enters `inspect` Motion Mode and returns cleanly to the world on release/close; it may open its corresponding Detail Panel through the one controller.

**Detail Panel open state.** Exactly one `activePanel`; open moves focus in, close restores to trigger; no second panel simultaneously open.

**Film-beat per-era state.** Each Era plays **entrance → *hold* → exit.** The **hold** is a calm, readable state where the eye and the résumé content breathe — the Detail Panel reading measure lives here (`{components.detail-panel}`, `{typography.body-lg}`).

---

## 7. Interaction Primitives

**Scroll → sequence (FR-1, FR-2).** Scroll deterministically maps to a monotonic **Career Sequence** position → camera altitude + derived year label. **Monotonic:** scrolling one direction never moves the sequence backward and the HUD year label never decreases while scrolling up. A **Virtual Scroll** decouples from literal document height so behavior is stable across viewports (roughly `SCROLL_NOTCHES_PER_YEAR ≈ 3–5`, addendum §C). Free-scroll camera is a **smoothed (damped) follow** (smoothing time-constant per addendum §C), not 1:1 rigid coupling; rapid scroll still resolves to the correct final Era with no dropped input. Target feel: responsive, not mechanical.

**Waypoint-jump tween + interruption (FR-3).** Selecting any Era (rail or in-world) tweens the camera along a nonlinear "launch" (accelerate, arc, ease-in; `power3.inOut`), entering `waypoint-jump` Motion Mode. **Travel duration scales with distance** (farther = longer, bounded). **Interruptible:** a new selection or manual scroll cleanly takes over without visual snapping. On arrival, Motion Mode returns to `free-scroll` and the target Detail Panel is available/opened. One scrubbable camera **playhead** is tweened — never a second camera (AD-7).

**Camera orientation / flight feel (FR-4).** The camera pivots to look up/down and tilts, driven by scroll velocity + direction (rocket/ascent feel). Tilt is capped at `MAX_CAMERA_TILT_DEG`, returns to neutral at rest, and is **fully suppressed under Reduced-Motion**. Camera-mode variety across bands (ground dolly, arc into clouds, orbital tumble) keeps a long ascent from feeling monotonous.

**Inspect (FR-23, post-MVP).** Grab / move / focus-select an Artifact → `inspect` Motion Mode → optional Detail Panel → clean return on release/close.

**Physics idle motion (FR-22, FR-24, post-MVP).** Floating cards behave as soft-physics bodies that drift/orbit gently when idle (bounded — never off-scene or jittering); satellites/debris orbit and collide softly. Paused under Reduced-Motion and at Fidelity Tier ≤ 1 (`PHYSICS_BODY_CAP` by tier, addendum §C).

**Hover / grab (UJ-3).** Grab and inspect floating artifacts; pivot the camera to look up/down like a rocket.

**Keyboard (FR-27).** Move between Eras, open/close panels, reach every link; Enter/Space activation fires the *same* navigation as a click. Never raycast-only.

**Motion Modes (state machine).** `free-scroll` (visitor scrolls) · `waypoint-jump` (nonlinear tween to a Waypoint) · `inspect` (focused on one artifact). Transitions are the only things that `invalidate()` under `frameloop='demand'` — static cel passes never force per-frame renders.

**Input latency.** Perceptible response < ~100 ms; camera/scroll sustains the frame budget (60 fps desktop, ≥ 45 fps mid-range phone).

---

## 8. World Navigation & Camera Interaction

*The camera is a first-class interaction primitive, not a cutscene. Every camera behavior below is `transform`/`opacity` only, has a keyboard and pointer equivalent, and has a Reduced-Motion equivalent tied to the degradation ladder in §9.*

**One camera, one playhead (AD-7).** A single scrubbable GSAP timeline is the runtime authority. `free-scroll` seeks the playhead; `waypoint-jump` tweens the *same* playhead. There is no second camera system, and idle-drift/parallax are decorations *on* this timeline, gated by the motion flag.

**Pointer / scroll control.**
- **Scroll** drives altitude via the Virtual Scroll (§7); damped follow, monotonic.
- **Drag / pointer** (post-MVP inspect) grabs an Artifact; the camera holds while the object is manipulated, then eases back.
- **Wheel/trackpad and touch** map to the same sequence axis; touch adds momentum consistent with the damping constant.

**Keyboard control (parity, AD-16).**
- **Tab / Shift-Tab** move focus through Waypoints and chrome in logical DOM order.
- **Enter / Space** on a Waypoint or rail entry fires the *same* jump as a pointer selection.
- **Esc** closes the active panel and restores focus to its trigger.
- **Arrow/PageUp-Down** may nudge the sequence, but every Era remains reachable by discrete focusable controls — the canvas is never a keyboard trap, and there is no move that only a mouse can make.

**Camera-mode variety (per band).** `ground` dolly → `low-atmosphere`/`clouds` arc → `stratosphere` pattern-survey → `orbit` orbital tumble → `deep-space` settle. Variety is diegetic art direction (fog density, horizon curvature, haze, star-field, §DESIGN 7.4), so "higher = later/more advanced" reads from atmosphere, **not camera height alone**.

**Tilt / orientation.** Look-up/down and roll are velocity-driven, capped at `MAX_CAMERA_TILT_DEG`, and self-center at rest.

**Interruption model.** Any new selection or manual scroll during a `waypoint-jump` cleanly retargets the single playhead — no snap, no queue, no competing tween.

**Reduced-Motion equivalent (deterministic, AD-9).** When the motion flag is off, there is no camera flight: navigation becomes native/instant scroll and jump/crossfade within the Static Timeline surface. Tilt and idle-drift are zeroed. The visitor loses none of the *content* of navigation — only its kinetics.

**Route coupling (one-way, AD-11 / AD-16→18).** A route change sets the camera target via the playhead; camera motion rewrites the route **only on settle** (`replaceState` during scroll, `pushState` on explicit selection). Scenes never call `history.*`.

**Flash-safety on camera FX (AD-16, hard gate).** Launch/ignition bloom and any loot-beam glow **ramp/ease and never strobe** (> 3×/sec at large area / high luminance is prohibited even in full-motion). PEAT verifies this path in CI.

---

## 9. Fidelity-Tier & Reduced-Motion Degradation Ladder

Two orthogonal axes. **Fidelity Tier** (0–3) is a *quality* axis owned by the one runtime monitor (AD-13). **Reduced-Motion** is a *motion* preference (AD-9). The cel *identity* survives everything down to a surface switch; only *polish* degrades. The full visual mapping is DESIGN.md §7.6/§9; below is the behavior.

**The load-bearing rule:** degrade **polish before identity.** The ink outline's baseline is **inverted-hull geometry**, not a post-process pass — because the monitor sheds postprocessing first, and the brand's signature must not be the first casualty. The Sobel edge pass is a Tier-3 enhancement on top. The cross-surface "same object" identity (World, Chrome, Static Timeline) rests on the **toon fill, bold ink outline, hard offset shadow, and halftone** — the four properties that carry across all three surfaces; the *variable-weight, slightly imperfect* contour is a **Tier-3 world-only enhancement** (the Sobel pass), not the cross-surface signature.

| Behavior | Tier 3 (full) | Tier 2 | Tier 1 | Tier 0 |
|---|---|---|---|---|
| **Rendered surface** | WebGL island | WebGL island | WebGL island | **No WebGL — Static Timeline** |
| **Toon ramp** (identity floor) | 3-band, all heroes | 3-band | 2–3 band (~free) | CSS flat poster fills from `{colors.ramp-grit-0}`…`{colors.ramp-neon-5}` |
| **Ink outline** | Sobel pass + inverted-hull | Inverted-hull + Sobel | **Inverted-hull only** | Thick CSS/SVG borders (`{spacing.ink-hair}`–`{spacing.ink-bold}`, `{colors.ink-outline}`) |
| **Halftone** | Full-density post-pass | Reduced density, baked-lean | Baked into gradientMap | SVG `<pattern>` at `{spacing.halftone-scale}` / coarse `{spacing.halftone-scale-coarse}` |
| **Comic grain** | On (low-contrast) | **Off** (first drop) | Off | Off |
| **Loot-beam / bloom** | Full selective | ½–¼ res | Off | Flat `{components.loot-callout}` chip, no glow |
| **Particles / stars** | Full | Reduced | Minimal | Static SVG accents |
| **Physics (post-MVP)** | 40 bodies | 20 | **0 (disabled ≤ Tier 1)** | 0 |

**Intra-postprocessing shed order (AD-13), derived from the tier table above (the table is ground truth):** `comic grain → halftone density → bloom (full→½–¼→off) → particles (full→reduced→minimal) → Sobel outline` → then the generic `DPR → LOD`. Particle caps step down (at Tier 2) **before** the Sobel pass drops (at Tier 1), and Sobel is guaranteed through Tier 2 (no "if headroom" hedge). Inverted-hull + toon ramp are geometry/material and are **never** on the shed list.

**Auto-downgrade.** One `PerformanceMonitor` with hysteresis: avg FPS < 40 for > 2s drops one tier; recovery is gated so tiers don't oscillate. No other module downgrades quality. A **manual override** lets any visitor pin a tier or force the Static Timeline. When an auto-downgrade crosses the **Tier-1→Tier-0 boundary** the canvas is torn down (AD-9); exactly like a mid-session context loss, this hands off to the Static Timeline **anchored to the current Era with the equivalent panel re-opened** — never a jump to the top (one continuity contract shared with §6).

**Reduced-Motion (orthogonal, but couples to surface via AD-9).** When the motion flag is off, the WebGL island is **not mounted** and the **Static Timeline is the rendered surface** — the spine forbids a mounted "still" canvas. The **cel aesthetic is never stripped**: the Static Timeline *is* the dialect rendered statically (thick borders, flat poster fills, hard offset shadows, static SVG halftone). So "keeps the cel look statically" is delivered concretely by tier-0 2D cel. The motion flag also zeroes tilt, parallax, idle-drift, physics, and any animated halftone/grain.

**Every rung delivers full content parity.** Reduced-Motion, Tier 0, no-WebGL2, and context-lost all present every Era, Detail Panel, résumé, and link. No rung breaks the cel look; no rung hides a fact.

---

## 10. Accessibility Floor

WCAG 2.2 AA is a **committed launch gate, not a floor** (plus 2.3.3 AAA via reduced-motion). Behavioral obligations only; contrast values trace to DESIGN.md tokens and are not restated here.

**Reduced-motion parity.** A *primary designed mode*, not "animations off." Spectacle OFF by default in code; a single flag gates all launch/parallax/physics, re-evaluated on the `matchMedia` change event, plus a **persistent, keyboard-reachable in-UI reduce/pause toggle** (`{components.button-ghost}`) — OS setting alone does not satisfy WCAG 2.2.2 for ambient motion > 5s. Reduced-Motion delivers full content parity.

**Flash safety (PEAT, WCAG 2.3.1-A — hard gate, even in full-motion).** No effect (launch flash, bloom flicker, ignition, halftone shimmer, loot-beam) flashes > 3×/sec at large area / high luminance. Halftone is spatially static or scroll-locked; the "imperfect" ink contour is a per-object *spatial* seed, never per-frame temporal noise; grain stays low-contrast. PEAT runs in CI against the animated-cel path (the only surface where the risk exists — reduced-motion has no canvas).

**Keyboard / focus.** Every Era is a real focusable `<button>/<a>` in logical DOM order, Enter/Space-activatable, firing the same navigation as a click — **never raycast-only.** Skip-link is the first tab stop → `<main>`. Heading order: `h1` (Jarad's name) → `h2` per Era. No keyboard trap in the canvas. Opening a panel moves focus in; closing restores focus to the trigger (AD-17).

**Focus-not-obscured + dual-backdrop ring (WCAG 2.4.11).** Never `outline:none`. A visible ring rendered **above the canvas** via `{components.focus-ring}` — a teal core wrapped in a concentric ink+paper double outline — so one ring always clears the contrast floor on **both** bright-cloud and deep-space backdrops (not color-only). **Not-obscured is delivered by a concrete mechanism, not asserted:** every focusable target sets `scroll-margin` (and the scroll container sets `scroll-padding`) equal to the sticky-chrome insets — HUD corner, Timeline Rail edge, Detail-Panel column, mobile toggles — so a Tab-focused waypoint or rail entry always lands clear of fixed chrome; the Detail Panel and any fixed overlay must never cover the control that opened them. (Concrete behavioral acceptance criterion under Epic 4, Story 4.2.)

**Canvas semantics + SR era/year announcements.** The canvas is `aria-hidden` (decorative) or `role="img"` + `aria-labelledby` to visible DOM text. Current Era/year is exposed to assistive tech via a **polite ARIA live region**, announcing Era changes on **scroll-settle** and on **Waypoint arrival**. The "moving through time" cue is never visual-only; the Static Timeline conveys the same ordering.

**Text contrast over dynamic backdrop (WCAG 1.4.3 / 1.4.11).** All persistent Truth-Layer text (HUD, Timeline Rail, panel chrome) holds the contrast floor against the worst-case backdrop across the full ascent — delivered by the cel plate (flat fill + ink border) per `{components.hud-telemetry}` / `{components.detail-panel}`, verified at the brightest (`clouds`) and darkest (`deep-space`) bands. The text-on-fill flip is **luminance-driven, not neon-driven**: bright bands take dark ink — the mid-tone `clouds` band and the neon summit alike — while dark bands take light `{colors.ink-primary}` (pairing rule in DESIGN.md §2/§7). Reading bodies never ride a saturated band fill; they sit on a sober plate (§2).

**Touch targets.** Timeline Rail entries, waypoint controls, and mobile/ghost toggles reserve at least the `{spacing.tap-target}` hit area via transparent padding / `::before` hit-slop, decoupled from the small visual mark (the rail node and waypoint dot keep their look). This clears the **WCAG 2.5.8 (AA)** minimum with margin and meets the larger **WCAG 2.5.5 (AAA) / platform-HIG** comfort target.

**Reflow (WCAG 1.4.10) at 400%.** The pinned-canvas + overlay layout must not require 2-D scrolling of content.

**Minimum readable body.** Primary reading text stays in DOM (never trapped in WebGL) and is set no smaller than `{typography.body}` (1rem) — for reading, search, links, keyboard, and SEO.

**Forced-colors / `prefers-contrast`.** Handled for the DOM layer; the border-heavy cel dialect maps cleanly onto forced-colors (borders + system colors survive).

**Deterministic degrade to one Static Timeline.** Reduced-Motion / Tier 0 / no-WebGL2 / context-lost all deliver the same full-parity surface (AD-9/AD-10). Accessibility is never traded for wow (SM-C3).

---

## 11. Responsive & Platform

**Platform.** One responsive web surface; **desktop-primary, mobile first-class.** No native app, no separate mobile site. SSR-first DOM with a WebGL island on top.

**Breakpoints** (values in DESIGN.md §4): compact / tablet / desktop. Layout reflows to 400% zoom without horizontal scroll (WCAG 1.4.10). Full-viewport surfaces use `min-h-[100dvh]`, never `h-screen`.

**Desktop.** Full spectacle at the device's Fidelity Tier; pointer + wheel + keyboard navigation; corner-anchored chrome (HUD, Timeline Rail on one vertical edge, Detail Panel as a bounded reading column during the "hold").

**Mobile / touch.** Simplified spectacle (Tier 1–2, reduced effects), touch navigation with momentum consistent with the scroll damping; holds the mobile frame budget or drops to the Static Timeline rather than stuttering. All content preserved. Touch targets reserve the `{spacing.tap-target}` hit area (§10). Chrome margins use `{spacing.margin-mobile}`; desktop uses `{spacing.margin-desktop}`; inter-column `{spacing.gutter}`.

**Theme.** Dark is design-primary and the token baseline; the light `-light` sibling set ships for theme-awareness. A manual theme toggle (`{components.button-ghost}`) swaps the set; the cel dialect itself is theme-invariant — only fill/atmosphere tokens change. `forced-colors` / `prefers-contrast` handled on the DOM layer.

**Performance envelope (AD-13).** First WebGL load < 6 MB (hard cap ~15 MB); draw calls ≤ 50 mobile / 100 desktop; triangles ≤ 500k; texture memory ≤ 256–384 MB mobile / ≤ 1 GB desktop. Inverted-hull is restricted to hero silhouettes; instanced stars/particles/tech-nodes get no per-object hull. **The pass cost is carried into the budget, not just geometry/texture bytes:** each hero's inverted-hull counts as **+1 draw call** against the cap, and the **maximum simultaneous full-screen post passes per tier** (Sobel + halftone + grain + bloom-composite at Tier 3, shedding per §9) is enumerated as a **fill-rate line in `perf-budget.json`** so the CI budget gate covers passes, not only bytes. Cel ramps and halftone patterns are small, tileable, shared modules — never per-era atlases.

---

## 12. Inspiration & Anti-patterns

**Inspiration (behavioral, not to be copied literally).**
- **Bruno-Simon-style diegetic onboarding** — teach navigation *in the world* within 3–5s, not with a modal.
- **Borderlands loot-drop cadence** — arrivals land as inked loot cards (`{components.loot-callout}`), used sparingly so the summit still pops.
- **jaradd.com (2006) lineage** — inventive, unmistakably personal, "revolutionary for its moment"; a spiritual successor, not a nostalgia piece.
- **Film beats** — entrance → *hold* → exit, so content breathes.
- **Instrument discipline** — the chrome is a legible gauge wearing the cel skin, not a sci-fi cockpit.

**Anti-patterns (explicitly avoid).**
- A generic template landing page.
- "Five giant scroll sections with big empty gaps."
- A **shader-zoo** where every scene competes as a hero and nothing breathes — full 3D is reserved for the two signature bookends; transitional eras stay lighter.
- Spectacle that sacrifices readability; effects that feel like a tech demo with nothing to say.
- Uneven era-to-era fidelity that reads as unfinished.
- Neon-glow as a depth device; smooth gradients; blurred shadows; pure `#000000` (use `{colors.canvas}`).
- Any camera move without a keyboard and reduced-motion equivalent.

**Two positioning truths the experience must answer:**
1. "This is not someone who merely worked at companies; this is someone who has lived through multiple eras of software — and carried them into the AI era."
2. The hiring-manager blunt truth the design must *beat*: "If the most interesting technical thing in your portfolio is the portfolio website itself, you have a problem." The world is the hook; the **work** — résumé, project detail, and the source itself — is the payload. Experience is a **first-class acceptance test**: "Does it feel right when you scroll it?" is a gate alongside functional correctness and perf budgets.

---

## 13. Key Flows

Five named protagonists. Each lands one explicit **climax beat** — the moment spectacle resolves into truth and the work is revealed.

### Flow 1 — Dana, a technical recruiter *(north-star journey, UJ-1)*
~2 minutes, a dozen tabs open, biased toward closing anything slow or confusing. Arrives cold via a shared link, desktop, unauthenticated.
- **Path:** The world loads on the ground — radio hardware, waveforms. Within 3–5s a diegetic one-line cue tells her she can scroll or jump. She scrolls; the camera climbs through time-themed eras. She notices the persistent Timeline Rail (`{components.timeline-rail}`) and a "Download résumé" affordance (`{components.button-primary}`). She clicks the top era ("AI") on the rail.
- **CLIMAX:** The camera **launches** — accelerating past earlier eras, through clouds, into orbit — settling on the agentic-AI station as a Detail Panel (`{components.detail-panel}`) opens with real, readable text and links. *She gets it: the whole arc — ground to orbit — ending in AI.* Spectacle has resolved into a résumé.
- **Resolution:** Downloads the résumé, clicks through to GitHub, flags Jarad for a callback.
- **Edge case:** If the world can't render (old GPU / WebGL off), she sees the Static Timeline with the same facts and links and **never notices anything was missing.**

### Flow 2 — Marcus, a founder (drills for depth, UJ-2)
Hiring a founding/staff engineer; wants proof of scale and systems thinking. Willing to spend 5+ minutes.
- **Path:** Jumps to the **stratosphere (Justworks) waypoint**, opens artifact cards (TimeEngine, Payment Center, distributed systems), and follows the through-line filaments connecting a pattern here to an AI capability later; ascends to orbit and the Axioms of AI.
- **CLIMAX:** He sees the **through-line rendered** — SagePoint's skill taxonomy → RAG; BAE's signal discipline → architecture → orchestration — carried in the single connective accent (`{colors.accent}`), and realizes the career wasn't a random walk: **it converged.** The one-hue color payoff *is* the argument.
- **Resolution:** Opens a project write-up (MDX) and a Medium essay in new tabs; reaches the contact affordance.
- **Edge case:** Deep-linking a specific era via URL lands him directly at that waypoint with the panel open (camera **placed**, not launched), shareable to a co-founder.

### Flow 3 — Priya, a senior engineer (delighted, shares, UJ-3)
Peer who appreciates WebGL/interaction craft; found the link on social. Curious, playful, desktop.
- **Path:** Free-scrolls slowly to feel the parallax and camera tilt, grabs and inspects floating artifacts, watches idle cards drift/orbit, pivots the camera to look up/down like a rocket.
- **CLIMAX:** A "how did they *do* that" moment — the physics, the era set pieces, the genuine sense of altitude — and then she notices the craft holds up when she stops to actually read a panel. The delight doesn't cost legibility.
- **Resolution:** Copies the link and shares it: "best portfolio I've seen this year."
- **Edge case:** On a mid-range laptop the experience **quietly drops to a lower fidelity tier** (§9) rather than stuttering — no notice, no apology.

### Flow 4 — Sam, vestibular sensitivity (motion-safe parity, UJ-4)
Has `prefers-reduced-motion` set OS-wide; large parallax/camera moves make them ill. Desktop or mobile.
- **Path:** The site detects reduced-motion and presents the **Static Timeline** — same eras, artifacts, text, and links as a navigable vertical timeline — with no camera flight or parallax; motion limited to gentle, opt-in transitions. The cel look is fully present, rendered statically (thick borders, flat poster fills from the ramp tokens, hard offset shadows, static SVG halftone).
- **CLIMAX:** Sam reads the whole career comfortably and **never has to fight the interface** — and the page still looks like *the* Career Ascent, not a stripped "lite" version. 100% of the content value, 0% of the motion cost.
- **Resolution:** Reaches the résumé and contact affordances without ever triggering motion.
- **Edge case:** A visible, keyboard-reachable toggle (`{components.button-ghost}`) lets *any* visitor switch between World and Static Timeline regardless of OS setting.

### Flow 5 — Alex, a skeptical staff engineer (opens the source to call the bluff, UJ-5)
Has seen a hundred flashy portfolios and assumes the impressive part is a template or AI slop. Wants to know if the person can actually engineer.
- **Path:** Mildly impressed, reflexively hunts for the repo link — and finds it **surfaced by design** in the persistent Truth-Layer chrome (`{components.button-ghost}`), not easter-egg-gated. Clones/browses, reads the architecture, module boundaries, docs, and commit hygiene. Trips over a CI-guarded Easter Egg planted in the source and notices the Embedded Team Guidance ("for whoever's editing this next").
- **CLIMAX:** The realization that the code is **disciplined AND deliberately AI-aware** — the site is a working demonstration of *directing AI to build to a real engineer's standard.* The medium is the message, not a disclaimer.
- **Resolution:** Skepticism flips to respect; Alex becomes the strongest possible advocate.
- **Edge case:** Even a hostile reader who dislikes the concept has to concede the engineering underneath is legitimate — the source survives inspection as its own third credibility layer.

---

*Spine wins on conflict.* Where any mock, import, or component-library default disagrees with a token or rule named here, the DESIGN.md token and this contract are authoritative. Every visual value in this document is a `{path.to.token}` reference resolving into DESIGN.md; no literal hex/px is restated.