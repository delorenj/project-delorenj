---
id: SPEC-project-delorenj
companions:
  - capability-traceability.md
  - ../../planning-artifacts/prds/prd-project-delorenj-2026-07-15/prd.md
  - ../../planning-artifacts/architecture/architecture-project-delorenj-2026-07-16/ARCHITECTURE-SPINE.md
sources: []
---

<!-- STALE-BANNER v2026-07-18 -->
> ⚠️ **PARTIALLY STALE — 2026-07-18 pivot.** Post-2026-07-18 pivot (spectacle-first R3F): capabilities around SEO, the DOM truth layer, and the accessibility launch gate are **dropped**. The world/scene/pilot capabilities survive. Re-derive against `architecture-project-delorenj-2026-07-18`.


> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. The PRD carries the full FR-level testable consequences and glossary; the architecture spine carries the 19 binding decisions (ADs), the pinned stack, and the diagrams. This kernel unifies them at capability altitude and must not be read in isolation from those two companions.

# Career Ascent — Jarad DeLorenzo Portfolio World

## Why

**A vision to realize, in service of an opportunity to capture.** Jarad DeLorenzo — a 25+ year Staff Engineer / Systems Architect — needs a portfolio that doesn't *list* a career but makes a skeptical audience *feel* its arc and *believe* its craft. The product renders his career as one continuous cinematic ascent — scrolling is piloting a camera from the **ground** (radio-era signals at BAE) up through the atmosphere to **deep space** (agentic AI and the Axioms of AI framework), higher altitude reading as later and more advanced. It serves a technical recruiter who must feel the arc in a skim, a founder who drills into the architecture and AI eras, an engineer delighted enough to share it, a motion-sensitive visitor owed full parity, and — decisively — a skeptical staff engineer who opens the public source to call the bluff and finds AI-built code that meets Jarad's standard. The bet is **credibility over spectacle**: the site is remembered and cited in real hiring conversations because the truth survives inspection at every layer — the readable content, the performance, and the source itself.

## Capabilities

- **CAP-1 — Pilot the career by scrolling**
  - **intent:** The visitor scrolls to move continuously through the career; scroll position deterministically maps to a monotonic Career Sequence position that drives camera altitude and a derived year label.
  - **success:** At rest the reported Era/label matches the scroll-derived position via the Sequence-to-Distance Mapping; the mapping is monotonic (scrolling one direction never moves the sequence backward) and stable across viewport sizes.

- **CAP-2 — Jump to any Era (click-to-launch)**
  - **intent:** The visitor selects any Era from the Timeline Rail or an in-world Waypoint and the camera performs an interruptible nonlinear launch tween to it.
  - **success:** Travel duration scales with sequence distance within a bounded range; the tween is interruptible without visual snapping; on arrival Motion Mode returns to `free-scroll` and the target's Detail Panel is available.

- **CAP-3 — Era scenes & worldbuilding**
  - **intent:** Each Era renders as one or more themed Scene Chunks in its Altitude Band, lazy-loaded by camera proximity, with continuous atmospheric band transitions and bounded loading/failure states.
  - **success:** Each Era has exactly one band and ≥1 Scene Chunk; resident GPU texture memory stays within the mobile budget across the full traversal; no material-recompile hitch at transitions; a jumped-to or deep-linked Era never blanks the canvas.

- **CAP-4 — Content Truth Layer**
  - **intent:** All readable, linkable, indexable content (Era summaries, Detail Panels, résumé, outbound/contact/repo links) lives in the SSR'd DOM above the fixed canvas — never trapped in WebGL.
  - **success:** All primary text is present in server-rendered HTML (view-source) before hydration; the résumé renders from one MDX source to both HTML and PDF; contact and the repo link are each reachable within one action from the persistent UI in both the World and the Static Timeline.

- **CAP-5 — Career Data Layer as single source of truth**
  - **intent:** One typed, structured data layer defines every Era, Waypoint, Tech Node, artifact, date, and link and feeds every surface; an offline, tool-agnostic Knowledge Graph may later author/enrich it (post-MVP).
  - **success:** Editing an Era in the data updates the world, rail, panel, route, and Static Timeline with no per-surface duplication; no career fact is hardcoded in scene logic; one canonical Era record keyed by slug owns band and years.

- **CAP-6 — Navigation & wayfinding**
  - **intent:** A persistent Timeline Rail (jump-to-era), a year/altitude HUD, and real shareable per-era routes let visitors orient and share without getting lost.
  - **success:** The rail reflects data order and highlights the current Era; the HUD year stays consistent with the scroll mapping and after a jump; each Era is a real crawlable URL whose deep-link cold-load *places* the camera (no from-ground launch) and whose Back/404 behavior is defined.

- **CAP-7 — Physics & artifact interaction** *(post-MVP)*
  - **intent:** Story/artifact cards behave as soft-physics bodies that drift or orbit when idle and can be grabbed or inspected on demand.
  - **success:** Idle motion is bounded and pauses under reduced-motion / low Fidelity Tier; per-scene physics body count never exceeds the per-tier cap; inspecting enters `inspect` Motion Mode and returns cleanly to the world.

- **CAP-8 — Accessibility & fallback parity**
  - **intent:** The product is fully usable and truthful via keyboard, reduced-motion, mobile, and no-WebGL paths, delivering full content parity — a first-class capability, not a floor.
  - **success:** reduced-motion / Tier 0 / no-WebGL2 / context-lost deterministically serve the same SSR'd Static Timeline (every Era, panel, résumé, and link present); every Era is a focusable button (never raycast-only); flash effects pass PEAT; the focus ring holds ≥3:1 on the worst-case backdrop; current Era/year is announced to assistive tech.

- **CAP-9 — Source-as-Exhibit**
  - **intent:** The public repository is a first-class portfolio artifact — AI-built code that demonstrably meets Jarad's engineering standards, is conspicuously AI-aware, and holds up to hostile inspection.
  - **success:** `CONVENTIONS.md` + CI import-boundary/lint/doc checks are green on `main`; a gitleaks secret-scan publish gate passes with clean history; `AGENTS.md`/`CLAUDE.md` pass a cold-start locatability test; ≥1 CI-guarded source-resident easter egg exists; a build case study is published.

- **CAP-10 — Instrumentation & consent**
  - **intent:** The site captures the minimal privacy-respecting events behind its success metrics through one typed event schema, honoring privacy signals, without a consent surface that collides with onboarding.
  - **success:** scroll-traversal arrival and jump arrival are distinct named events (so SM-2 is computable); résumé downloads, outbound/repo clicks, and shares/revisits are captured; DNT/GPC are honored; any consent UI is keyboard- and reduced-motion-safe and sequenced off the 3–5 s onboarding cue.

## Constraints

*The load-bearing decision-benders. The full, binding set of 19 architecture decisions (with Binds/Prevents/Rule) lives in the `ARCHITECTURE-SPINE.md` companion; downstream reads it directly.*

- **DOM is the truth; WebGL is a leaf enhancement.** The Spectacle Layer is a single `next/dynamic({ ssr:false })` island mounted on already-SSR'd DOM; the LCP element is SSR text, never the canvas. *(AD-2)*
- **Single-authority runtime.** Exactly one persistent GlobalCanvas (switch scenes by visibility, never remount), one scroll authority (GSAP ScrollTrigger on Lenis — no `drei ScrollControls`), one RAF loop, one scrubbable camera timeline, one navigation/history authority, one panel/focus controller, one analytics event schema, one runtime quality monitor. *(AD-3,4,7,13,17,18,19)*
- **State boundary.** Never `setState` in `useFrame`/scroll callbacks; per-frame values via refs or `store.getState()`; React re-render only for discrete UI state. *(AD-5)*
- **Career Sequence axis, not calendar year.** The world lays out along a monotonic Career Sequence; year is a derived label; the Primary Track is single-valued; one canonical Era keyed by slug owns band and years. *(AD-1,8)*
- **Accessibility is a launch gate.** Reduced-Motion and Fidelity Tier are orthogonal; the system degrades deterministically to one Static Timeline that serves four jobs (SEO body, `<noscript>`, reduced-motion, capability fallback); keyboard/never-raycast-only selection; PEAT flash-safety applies even in full motion; WCAG 2.2 AA committed. *(AD-9,10,16,17)*
- **Performance budget is a CI gate.** A checked-in `perf-budget.json` (draw calls, triangles, resident texture memory, WebGL bundle weight, Core Web Vitals) fails CI on regression; the runtime auto-downgrades one Fidelity Tier if average FPS < 40 for > 2 s. *(AD-13)*
- **Cloudflare hosting topology.** OpenNext-on-Workers + R2 (zero-egress 3D assets behind `assets.jaradd.com`) + KV; R3F/Three are client-only and never enter the server Worker bundle (≤ ~10 MiB); build on Next.js 16; `next-on-pages` is not used; domain `jaradd.com`. Full pinned stack in the spine companion. *(AD-12)*
- **Truth-layer-first walking skeleton; demo-first.** Every increment is runnable and watchable; spikes are disposable **except** the non-disposable foundations (single canvas/scroll/RAF, SSR Content Truth Layer / Static Timeline, Fidelity-Tier detection, perf-budget CI). Experience is a first-class acceptance test — downstream epics must be demoable per epic and carry an experiential acceptance criterion. *(PRD §16)*
- **Source-available license.** The repo is public *for inspection only* under a "look, don't reuse" license — not an OSS/reuse product. *(AD-15; license flavor is an open question)*

## Non-goals

- **Not a game** — game-loop *feel*, yes; win/lose/score/levels, no.
- **Not built on a game engine or a 2D-only renderer** — the camera-pivot/orbital-depth concept needs real 3D with a first-class HTML content layer.
- **Not text-trapped-in-WebGL** — primary content stays in the DOM for readability, SEO, and accessibility.
- **Not a bleeding-edge baseline** — WebGL2-first; WebGPU is optional enhancement only.
- **Not a CMS / blog platform** — essays live on Medium (linked) or as MDX.
- **Not a reusable portfolio-builder** for others in v1.
- **Not an on-page live knowledge-graph visualization** — the Knowledge Graph is an offline authoring aid.
- **Not an open-source / reuse product** — the repo is public for inspection, not maintained as a template or supported OSS.

## Success signal

The site is **cited or remembered in ≥ N recruiter or founder conversations in the first quarter post-launch** (SM-1 — a non-gated qualitative proxy), and **≥ 40% of engaged sessions that pass the first Era reach the `orbit` Era** with scroll-traversal depth reported distinctly from jump arrivals (SM-2 — the primary testable metric). Secondary: résumé downloads + outbound/repo clicks per engaged session (SM-3), shares + direct-link revisits (SM-4), and repository engagement plus qualitative "I looked at the code and…" reactions (SM-5). It has **failed** if spectacle wins by regressing the §10 load/performance budgets, if a visitor who skips the spectacle can't quickly find roles/dates/tech/résumé/contact, or if the reduced-motion / keyboard / no-WebGL paths don't deliver full content parity.

## Assumptions

- **Camera authoring:** a code-authored GSAP timeline is the runtime authority; Theatre.js is at most a dev-only aid baked to `state.json` (never a runtime dependency) — `@theatre/r3f` is ~2 years stale. *(AD-7)*
- **Scroll rig:** hand-roll the minimal single-canvas/tunnel pattern with drei primitives; `@14islands/r3f-scroll-rig` sits behind a spike gate (8.15.0 stale, React-19 compat unconfirmed). *(AD-4 topology fixed)*
- **WebGL2-only at launch;** WebGPU deferred.
- **Audio** muted-by-default, user-initiated, out of MVP.
- **Fidelity-tiering:** full 3D for the two signature bookends (ground BAE, orbit→deep-space AI); lighter kinetic/particle/wireframe treatments for transitional eras.
- **MVP shape:** 4 waypoints (BAE / Warby / Justworks / ACD) + the deep-space Axioms bookend across 4 bands; physics, visual relationship lines, and KG ingestion are post-MVP; a genuine lower-fidelity mobile spectacle is required before public launch.
- **Timeline facts** are authored into the Career Data Layer from LinkedIn (auth-gated): education = Stevens Institute of Technology, current = IntelliForia, "25+ yrs Staff Engineer / Systems Architect"; exact companies/dates are a data-authoring task, not a build blocker.

## Open Questions

- **Success targets:** set `N` for SM-1 (conversations) and confirm the SM-2 ≥ 40%-reach-`orbit` threshold. *(PRD §7 / §8 Q9)*
- **License flavor:** which source-available "look, don't reuse" license for the public repo (e.g. PolyForm Noncommercial, BUSL, or a custom view-only notice)? *(AD-15; PRD §4.8)*
- **Confirm the five architecture Fast-path calls stand:** code-authored GSAP camera, hand-rolled scroll rig, WebGPU deferred, audio out of MVP, per-era fidelity tiers. *(PRD §8 Q12–16)*
- **MVP inclusion** of a lightweight physics idle-drift teaser (FR-22–24) and of visual Relationship Lines (FR-17) vs. data-only + panel notes — left for demo-first resolution. *(PRD §8 Q5/Q6)*
- **Analytics vendor + production observability/RUM** choice (privacy-first; field-CWV is a §10 launch gate) — the event *schema* is fixed by AD-19, the *mechanism* is open. *(PRD §8 Q10)*
