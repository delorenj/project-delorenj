---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories, step-04-final-validation]
inputDocuments:
  - _bmad-output/specs/spec-project-delorenj/SPEC.md
  - _bmad-output/specs/spec-project-delorenj/capability-traceability.md
  - _bmad-output/planning-artifacts/prds/prd-project-delorenj-2026-07-15/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture-project-delorenj-2026-07-16/ARCHITECTURE-SPINE.md
generatedBy: bmad-create-epics-and-stories (autonomous /loop, Fast path)
uxContract: none (aesthetic/interaction requirements folded into PRD §11 + experiential ACs; a dedicated bmad-ux run is an optional deepener)
---

<!-- STALE-BANNER v2026-07-18 -->
> ⚠️ **PARTIALLY STALE — 2026-07-18 pivot.** Post-2026-07-18 pivot to spectacle-first R3F: **Epic 1 (truth layer) and Epic 4 (a11y launch gate) are obsolete**, and truth-layer-first sequencing no longer applies. Epics need re-derivation from `architecture-project-delorenj-2026-07-18`.


# Career Ascent — Epic Breakdown

## Overview

Complete epic and story breakdown for **Career Ascent** (Jarad DeLorenzo Portfolio World), decomposing the PRD requirements and architecture-spine decisions into implementable stories. Epics are organized by **user value** and sequenced per the PRD §16 **truth-layer-first walking skeleton**: the readable, accessible, SSR'd truth layer stands up first (Epic 1), then one real Era proves the piloting loop end-to-end (Epic 2), then the full ascent (Epic 3), then the accessibility + performance launch gate is certified (Epic 4), then the repo-as-exhibit + instrumentation (Epic 5), with delight/worldbuilding deferred post-MVP (Epic 6).

Every story cites the capabilities (`CAP-n`, from `SPEC.md`), functional requirements (`FR-n`, from `prd.md`), and architecture decisions (`AD-n`, from `ARCHITECTURE-SPINE.md`) it realizes, so a dev agent has the full contract without leaving the story.

## Requirements Inventory

### Functional Requirements

- **FR-1:** Scroll-to-sequence mapping — scroll deterministically maps to a monotonic Career Sequence position driving camera altitude + a derived year label.
- **FR-2:** Free-scroll camera tracking — smoothed (damped) follow of the scroll-derived target, not 1:1.
- **FR-3:** Waypoint jump (click-to-launch) — interruptible nonlinear tween to a Waypoint; duration scales with distance.
- **FR-4:** Camera orientation / flight feel — tilt/pivot driven by scroll velocity, capped, suppressed in reduced-motion.
- **FR-5:** Proportional era distance with floor/ceiling cap; overlapping roles never claim overlapping spans.
- **FR-6:** Altitude bands & era scenes — each Era one band + ≥1 Scene Chunk; bands non-decreasing along the sequence.
- **FR-7:** Scene chunk lazy-loading — nodes stay mounted; GPU textures/geometry disposed/reloaded outside the adjacent-era window.
- **FR-8:** Themed set pieces & environmental artifacts matching each Era's Tech Nodes (no anachronisms).
- **FR-9:** Atmospheric band transitions — continuous parallax/fog/color-grade, no hard cut.
- **FR-10:** DOM overlay over fixed canvas — all primary text in the DOM.
- **FR-11:** Artifact / waypoint Detail Panels with readable summary/role/dates/tech/links; keyboard-dismissable, focus-managed.
- **FR-12:** Résumé access — one MDX source → accessible HTML + exported PDF.
- **FR-13:** Outbound, contact & project links (LinkedIn/GitHub/Medium/repo/email, no form v1); repo link persistent.
- **FR-14:** Content authored outside WebGL (HTML/MDX), linkable and indexable.
- **FR-15:** Structured Career Data Layer as single source of truth for all surfaces.
- **FR-16:** Tech Nodes decorate scenes by era (year range + visual motif).
- **FR-17:** Relationship Lines expressing the career through-line (data + optionally rendered).
- **FR-18:** Knowledge Graph as offline, tool-agnostic creative authoring aid (post-MVP).
- **FR-19:** Timeline Rail (jump-to-era) triggering a Waypoint jump.
- **FR-20:** Year / altitude HUD consistent with the FR-1 mapping.
- **FR-21:** Deep links / shareable era routes with defined cold-load (place, don't launch), history, and 404 behavior.
- **FR-22:** Floating cards as soft-physics bodies (idle drift, bounded, paused in reduced-motion/low tier).
- **FR-23:** Inspect / grab artifacts → `inspect` Motion Mode → panel.
- **FR-24:** Orbiting objects & soft collisions within the per-tier physics body cap.
- **FR-25:** Reduced-motion Static Timeline — same content, no camera flight/parallax.
- **FR-26:** Mobile simplified mode — performant, all content preserved.
- **FR-27:** Keyboard navigation & focus management — fully operable, visible focus, no traps.
- **FR-28:** Capability fallback (no-WebGL / low-power / context loss) → Static Timeline anchored to current Era.
- **FR-29:** Public, inspection-worthy repository, link discoverable.
- **FR-30:** Code embodies documented engineering standards — `CONVENTIONS.md` + CI + build case study.
- **FR-31:** Easter eggs — ≥1 source-resident, CI-guarded, non-degrading.
- **FR-32:** Embedded team-member guidance (`AGENTS.md`/`CLAUDE.md` + module docs), cold-start locatable.
- **FR-33:** Scene loading & failure states — bounded loading + degraded per-scene fallback, isolated.
- **FR-34:** Privacy-respecting analytics & consent capturing the SM events; DNT/GPC honored.
- **FR-35:** Repository integrity & secret hygiene — gitleaks publish gate, clean history, no committed secrets.

### NonFunctional Requirements

- **NFR-1 (Core Web Vitals):** LCP ≤ 2.5 s, INP ≤ 200 ms (target < 100 ms), CLS ≤ 0.1 at p75 across mobile **and** desktop; the LCP element is SSR'd text, never the canvas.
- **NFR-2 (Frame budget):** 60 fps desktop target, ≤ 10 ms JS/CPU per 16.6 ms frame; floor ≥ 45 fps on a mid-range 2–3-year-old phone; auto-downgrade one tier if avg FPS < 40 for > 2 s.
- **NFR-3 (GPU/asset budgets):** draw calls ≤ 50 mobile / ≤ 100 desktop; triangles ≤ 500k; texture memory ≤ 256–384 MB mobile / ≤ 1 GB desktop (all KTX2/mipmapped); first WebGL load < 6 MB (cap ~15 MB); DPR ≤ 2; instancing for all repeated nodes; enforced via a checked-in `perf-budget.json` + CI gate.
- **NFR-4 (Adaptive quality):** boot-time GPU tier detection (0–3) + runtime monitor with hysteresis (shed order postprocessing → particles → DPR → LOD); Tier 0 / no-WebGL2 / context-lost ⇒ Static Timeline.
- **NFR-5 (Accessibility, WCAG 2.2 AA + 2.3.3 AAA):** reduced-motion a primary designed mode; flash-safety (PEAT, 2.3.1 A) even in full motion; canvas semantics + keyboard, never raycast-only; focus indicator ≥ 3:1 on both bright-cloud and deep-space backdrops, focus not obscured (2.4.11); persistent text ≥ 4.5:1 worst-case (1.4.3); SR era/year live region; target size (2.5.8), reflow at 400% (1.4.10), forced-colors/`prefers-contrast`.
- **NFR-6 (SEO):** SSR/SSG every indexable route with full content before hydration; real per-era History-API routes; SSR'd `ProfilePage > Person` JSON-LD mirroring the DOM 1:1; OG/Twitter cards + static preview image per route; duplicate-content canonicalization; validated by CI (Rich Results).
- **NFR-7 (Resilience / progressive enhancement):** one Static Timeline serving four jobs (SEO body, `<noscript>`, reduced-motion, capability fallback); exactly one persistent canvas; WebGL2 baseline, WebGPU opt-in only with WebGL2 fallback.
- **NFR-8 (Browser/device):** latest 2 evergreen desktop browsers; modern iOS Safari / Android Chrome; real mid-tier-device testing is a launch requirement.
- **NFR-9 (Privacy):** analytics privacy-respecting and consent-appropriate; honors DNT/GPC; no invasive fingerprinting.
- **NFR-10 (Maintainability, solo builder):** Career Data Layer is the single edit point for career facts; scenes are data/config-driven; a composable/shared rendering system (reused material/particle/transition modules), not N bespoke pipelines.

### Additional Requirements

*(From the architecture spine — technical requirements that shape implementation. Full binding set of 19 ADs with Binds/Prevents/Rule lives in `ARCHITECTURE-SPINE.md`.)*

- **No starter template.** Architecture recommends hand-rolling the minimal single-GlobalCanvas + tunnel pattern with drei primitives rather than adopting a starter/rig — so **Epic 1 Story 1 scaffolds a fresh Next.js 16 App Router project** (not a starter clone). *(spine Deferred; AD-3/AD-4 topology fixed)*
- **Hosting topology:** Cloudflare OpenNext-on-Workers + R2 (zero-egress 3D assets behind `assets.jaradd.com`) + KV (ISR cache); R3F/Three are **client components only** — never in the server Worker bundle (≤ ~10 MiB); domain `jaradd.com`; `next-on-pages` not used. *(AD-12)*
- **Single-authority runtime primitives** to stand up before scenes: one GlobalCanvas (visibility-switched), one scroll authority (GSAP ScrollTrigger on Lenis), one RAF loop (`frameloop='demand'`), one scrubbable camera timeline, one navigation/history authority, one panel/focus controller, one analytics event schema, one runtime quality monitor. *(AD-3,4,5,7,13,17,18,19)*
- **Data invariants:** Career Sequence axis (not year); one canonical Era keyed by slug owns band+years; one shared `sequence.config` drives both DOM section heights and world offsets. *(AD-1,6,8)*
- **CI gates (checked-in, green on `main`):** perf-budget, gitleaks secret-scan (publish gate), import-boundary/module-graph lint, JSON-LD Rich-Results validation, axe + PEAT accessibility. *(AD-13,15,16)*
- **Spikes (disposable, per §16):** scroll-rig buy-vs-build resolution, code-authored GSAP camera vs Theatre.js (lean code-authored), `@react-three/postprocessing` + `detect-gpu` validation, per-era fidelity treatments.
- **Pinned stack:** Next.js 16.2.x, React 19, `@opennextjs/cloudflare` 1.20.x, three 0.185.x, `@react-three/fiber` 9.6.x, drei 10.7.x, gsap 3.13.x, lenis 1.3.x, zustand 5.x, `@react-three/rapier` 2.2.x (post-MVP). *(spine Stack)*

### UX Design Requirements

*None extracted — no `bmad-ux` design contract exists for this project. Aesthetic and interaction requirements are carried by PRD §11 (Aesthetic & Tone) and by the **experiential acceptance criterion** each spectacle story carries (per §16, "experience is a first-class acceptance test"). Recommendation surfaced to the user: a dedicated `bmad-ux` run would deepen the per-era art direction and interaction spec before Epic 2/3 spikes.*

### FR Coverage Map

| FR | Epic.Story | Coverage |
| --- | --- | --- |
| FR-1 | 2.2 | Scroll→sequence mapping |
| FR-2 | 2.2 | Free-scroll camera tracking |
| FR-3 | 2.3, 3.3 | Waypoint jump (single era, then world-wide) |
| FR-4 | 2.2 | Camera tilt/flight feel |
| FR-5 | 1.2, 2.2 | Proportional era distance (config + applied) |
| FR-6 | 2.4, 3.1, 6.6 | Era scenes (one, then MVP set, then full fidelity) |
| FR-7 | 2.4 | Scene lazy-loading / residency |
| FR-8 | 2.4, 6.6 | Themed set pieces |
| FR-9 | 3.2, 6.6 | Atmospheric band transitions |
| FR-10 | 1.3, 2.7 | DOM overlay over fixed canvas |
| FR-11 | 1.4, 2.7 | Detail Panels |
| FR-12 | 1.5 | Résumé MDX → HTML + PDF |
| FR-13 | 1.6 | Outbound/contact/repo links |
| FR-14 | 1.6 | Content outside WebGL |
| FR-15 | 1.2 | Career Data Layer SSOT |
| FR-16 | 1.2, 2.4 | Tech Nodes |
| FR-17 | 6.4 | Visual Relationship Lines |
| FR-18 | 6.5 | Knowledge Graph pipeline |
| FR-19 | 3.3 | Timeline Rail jump |
| FR-20 | 2.6 | Year/altitude HUD |
| FR-21 | 1.7, 3.4 | Per-era routes (static, then cold-load placement) |
| FR-22 | 6.1 | Physics floating cards |
| FR-23 | 6.2 | Inspect/grab artifacts |
| FR-24 | 6.3 | Orbiting objects & soft collisions |
| FR-25 | 1.3 | Reduced-motion Static Timeline |
| FR-26 | 4.4 | Mobile simplified/lower-fidelity spectacle |
| FR-27 | 1.8 | Keyboard nav & focus |
| FR-28 | 2.5 | Capability fallback (no-WebGL/context-lost) |
| FR-29 | 5.5 | Public inspection-worthy repo |
| FR-30 | 5.1, 5.5 | Documented standards + CI + case study |
| FR-31 | 5.4 | CI-guarded easter egg |
| FR-32 | 5.3 | Embedded agent/human guidance |
| FR-33 | 2.4 | Scene loading/failure states |
| FR-34 | 5.6 | Privacy-respecting analytics |
| FR-35 | 1.1, 5.2 | Secret hygiene (scaffold gate, then publish audit) |

## Epic List

### Epic 1: The Readable Career (Truth-Layer Walking Skeleton)
Stand up a real, fast, accessible, SSR'd portfolio — every Era, date, tech, summary, résumé, and link readable at per-era URLs with **zero WebGL** — over the Career Data Layer and the non-disposable project foundation. This is a shippable site on its own and the truth every later layer enhances.
**FRs covered:** FR-10, FR-11, FR-12, FR-13, FR-14, FR-15, FR-16, FR-21 (static routes), FR-25, FR-27, FR-35 (scaffold gate). **NFRs:** NFR-1, NFR-6, NFR-7, NFR-10.

### Epic 2: Piloting a Single Era (Spectacle Vertical Slice)
Prove the "wow" end-to-end on **one** real signature Era: scroll → sequence → camera → scene → panel, running on the single-canvas/scroll/RAF runtime with reduced-motion and Fidelity-Tier degradation live. Demoable magic, minimum surface area.
**FRs covered:** FR-1, FR-2, FR-3 (single era), FR-4, FR-5, FR-6 (one scene), FR-7, FR-8, FR-10, FR-20, FR-28, FR-33. **NFRs:** NFR-2, NFR-3, NFR-4.

### Epic 3: The Full Ascent (All MVP Waypoints + Wayfinding)
Widen the proven loop to the whole MVP career — four waypoints across four bands + the deep-space Axioms bookend — with atmospheric band transitions, the Timeline Rail, and shareable deep links that place (not launch).
**FRs covered:** FR-3 (world-wide), FR-6 (MVP set), FR-9, FR-19, FR-21 (cold-load placement).

### Epic 4: Trustworthy for Everyone (Accessibility & Performance Launch Gate)
Certify the full §10 launch gate: everyone — motion-sensitive, keyboard-only, screen-reader, low-end mobile, no-WebGL — gets parity and safety, and the site provably never trades the truth or the budgets for spectacle.
**FRs covered:** FR-26. **NFRs:** NFR-1, NFR-2, NFR-3, NFR-5, NFR-8 (certification of the woven-in a11y/perf work + net-new mobile spectacle).

### Epic 5: The Source is the Proof (Source-as-Exhibit + Instrumentation)
Make the public repository hold up to hostile inspection — enforced standards, clean secret history, AI-aware guidance, discoverable easter eggs, a build case study — and instrument whether the whole play landed.
**FRs covered:** FR-29, FR-30, FR-31, FR-32, FR-34, FR-35 (publish audit). **NFRs:** NFR-9.

### Epic 6: A Living World (Post-MVP Delight & Worldbuilding)
Bring the world alive: physics-driven grabbable artifacts, rendered relationship lines, full nine-scene worldbuilding fidelity, and the offline Knowledge Graph authoring aid. Explicitly post-MVP.
**FRs covered:** FR-6 (full fidelity), FR-8 (full), FR-9 (full richness), FR-17, FR-18, FR-22, FR-23, FR-24.

---

## Epic 1: The Readable Career (Truth-Layer Walking Skeleton)

**Goal:** A visitor, a crawler, and a keyboard/screen-reader user can read Jarad's entire career as a fast, accessible, SSR'd Static Timeline at real per-era URLs — with no WebGL — backed by the Career Data Layer and the non-disposable project foundation. *(CAP-4, CAP-5, CAP-8 static path, CAP-6 static form)*

### Story 1.1: Scaffold the project foundation and CI gates

As the solo builder,
I want a fresh Next.js 16 App Router project deployable to Cloudflare Workers with the non-disposable CI gates wired from commit one,
So that every later increment ships on a trustworthy, budget-enforced foundation. *(AD-12, AD-13, AD-15; FR-35; NFR-3)*

**Acceptance Criteria:**

**Given** an empty repo,
**When** the project is scaffolded,
**Then** a Next.js 16.2.x App Router app builds and deploys to Cloudflare Workers via `@opennextjs/cloudflare` (not `next-on-pages`),
**And** `jaradd.com` + `assets.jaradd.com` (R2) bindings and KV ISR cache are configured, with `.env*` git-ignored and secrets only via bindings.

**Given** the CI pipeline,
**When** any commit is pushed,
**Then** a gitleaks secret-scan runs as a publish gate and fails the build on any hit (FR-35),
**And** a `perf-budget.json` gate, an import-boundary/module-graph lint, and a JSON-LD Rich-Results check are present and green on `main` (AD-13/15; NFR-3/6).

**Given** a client-only R3F import placeholder,
**When** the server Worker bundle is analyzed,
**Then** no Three/R3F code is in the server bundle and the bundle is under the ~10 MiB gzip limit (AD-12).

### Story 1.2: Define the Career Data Layer + sequence config as the single source of truth

As the solo builder,
I want one typed Career Data Layer and one `sequence.config` that own all career facts and the sequence→distance mapping,
So that every surface reads one source and nothing can drift. *(AD-1, AD-6, AD-8; FR-15, FR-16, FR-5)*

**Acceptance Criteria:**

**Given** the data schema,
**When** an Era is defined,
**Then** one canonical Era record keyed by a stable kebab-case slug owns its `band` and year range, and `CareerWaypoint`/`TechNode`/route reference it by slug without restating band or years (AD-1).

**Given** `sequence.config.ts`,
**When** DOM section heights and (future) world waypoint offsets are needed,
**Then** both are **derived** from the one Sequence-to-Distance Mapping — proportional to duration within the documented floor/ceiling, overlapping tenures never producing overlapping spans (AD-6, AD-8; FR-5).

**Given** the MVP Eras (Prologue, BAE, Web/Agency, Warby, ClassPass/SagePoint, Splash, Justworks, ACD, Axioms),
**When** the data is authored,
**Then** each Era has exactly one Altitude Band (a Glossary value), bands are non-decreasing along the sequence, and Tech Nodes carry year range + visual motif (FR-16; FR-6 data).

### Story 1.3: SSR the Static Timeline rendering every Era

As a technical recruiter with no time and no patience for a loading spinner,
I want the whole career laid out as a readable vertical timeline in the initial HTML,
So that I can skim the arc instantly and it works even with JS or WebGL off. *(AD-2, AD-10; FR-25, FR-10; NFR-1, NFR-7)*

**Acceptance Criteria:**

**Given** any Era in the Career Data Layer,
**When** the root page is server-rendered,
**Then** every Era, its summary, dates, and tech appear in the initial HTML (view-source) before hydration, ordered by Career Sequence (AD-10; FR-25).

**Given** the page load,
**When** LCP is measured,
**Then** the LCP element is SSR'd hero/timeline text (never a canvas) and LCP ≤ 2.5 s / CLS ≤ 0.1 at p75 (NFR-1).

**Given** JS disabled and WebGL unavailable,
**When** the page is opened,
**Then** the same Static Timeline renders with all content reachable (NFR-7) — this one component is the SEO body, `<noscript>` mirror, reduced-motion mode, and fallback.

### Story 1.4: Detail Panels via the single panel/focus controller

As a founder who wants depth,
I want to open any Era or artifact and read its full summary, role, dates, tech, and links,
So that I can drill in without losing my place. *(AD-17, AD-1; FR-11)*

**Acceptance Criteria:**

**Given** the Static Timeline,
**When** I activate an Era,
**Then** a Detail Panel opens through the single panel controller (one `activePanel` at a time), populated entirely from the Career Data Layer (AD-1, AD-17; FR-11).

**Given** an open panel,
**When** I dismiss it (Esc or close),
**Then** focus returns to the triggering element and no second panel can be open simultaneously (AD-17; FR-11, FR-27).

### Story 1.5: Résumé from one MDX source → HTML + PDF

As a recruiter,
I want to read and download a current résumé,
So that I can forward it and file it. *(FR-12; NFR-6)*

**Acceptance Criteria:**

**Given** one MDX résumé source,
**When** the site builds,
**Then** an accessible, crawlable HTML résumé page and a downloadable PDF are both derived from that single source (no divergent copies) (FR-12).

**Given** any surface,
**When** I look for the résumé,
**Then** a résumé affordance is reachable from the persistent UI, not buried in one Era (FR-12).

### Story 1.6: Persistent outbound, contact & repo links

As a skeptical engineer,
I want the repo, LinkedIn, GitHub, Medium, and contact always one action away,
So that I can inspect, connect, or reach out from anywhere including the Static Timeline. *(FR-13, FR-14)*

**Acceptance Criteria:**

**Given** the persistent UI in both the World and the Static Timeline,
**When** I look for contact or the source repo,
**Then** each is reachable within one action, links resolve to correct destinations, and the exposed email uses an anti-harvest measure (no raw `mailto` in markup) (FR-13).

**Given** long-form content (project write-ups, essays, Era summaries),
**When** it is authored,
**Then** it lives as HTML/MDX reachable by its own URL and readable without the Spectacle Layer (FR-14).

### Story 1.7: Real per-era routes with SSR metadata and graceful 404

As a visitor sharing a link,
I want each Era at a real, crawlable URL with correct previews,
So that shares look right and search engines index each era. *(AD-11; FR-21; NFR-6)*

**Acceptance Criteria:**

**Given** each Era,
**When** its route (`/journey/[era]`) is server-rendered,
**Then** it carries a unique SSR'd title/meta/canonical, `Person` JSON-LD mirroring the DOM 1:1, and OG/Twitter cards + a static preview image (NFR-6; FR-21).

**Given** an unknown or renamed Era slug,
**When** it is requested,
**Then** a graceful 404 drops into the Static Timeline (never a blank), and previously-published slugs stay resolvable via an alias/redirect policy (FR-21).

**Given** the root and per-era routes,
**When** indexed,
**Then** they are differentiated and canonicalized so they do not self-compete (NFR-6).

### Story 1.8: Keyboard navigation, focus, and document semantics

As a keyboard-only user,
I want to reach and operate every Era, panel, and link with a visible focus indicator and no traps,
So that the whole truth layer is operable without a mouse. *(AD-16; FR-27)*

**Acceptance Criteria:**

**Given** the Static Timeline,
**When** I tab through it,
**Then** a skip-link is the first stop → `<main>`, headings run `h1` (name) → `h2` (per era), and every Era is a real focusable `<button>/<a>` activatable by Enter/Space firing the same navigation as a click (AD-16; FR-27).

**Given** any interactive element,
**When** it receives focus,
**Then** a visible focus indicator shows (never `outline:none`) and there is no keyboard trap (FR-27).

---

## Epic 2: Piloting a Single Era (Spectacle Vertical Slice)

**Goal:** A visitor can scroll to pilot the camera through one real signature Era (BAE `ground` radio era) in the WebGL world — scroll → sequence → camera → scene → panel — on the single-canvas/scroll/RAF runtime, with reduced-motion and Fidelity-Tier degradation live, all as progressive enhancement over Epic 1. *(CAP-1, CAP-2 single-era, CAP-3 one scene, CAP-8 degrade)*

### Story 2.1: Single-authority runtime (canvas + scroll + RAF)

As the solo builder,
I want exactly one GlobalCanvas, one scroll authority, and one RAF loop mounted as an SSR-false island,
So that every later scene hangs on a runtime that can't jitter or exhaust WebGL contexts. *(AD-2, AD-3, AD-4, AD-5)*

**Acceptance Criteria:**

**Given** the app,
**When** the Spectacle Layer mounts,
**Then** it is a single `next/dynamic({ssr:false})` island over the already-SSR'd DOM, with exactly one persistent `<Canvas>` fixed behind the document (AD-2, AD-3).

**Given** scrolling,
**When** the runtime drives motion,
**Then** GSAP ScrollTrigger on Lenis is the only scroll authority (no `drei ScrollControls`), Lenis runs `autoRaf:false` driven from `gsap.ticker`, and the canvas is `frameloop='demand'` with `invalidate()` on scroll/tween — one RAF loop, zero idle renders (AD-4).

**Given** any scene code,
**When** it updates per frame,
**Then** it reads/writes via refs or `store.getState()` inside `useFrame` and never calls `setState` in the frame/scroll loop (AD-5).

### Story 2.2: Scroll-to-sequence mapping + free-scroll camera

As a visitor,
I want scrolling to move me continuously and smoothly through the career,
So that scrolling feels like flying, not paging. *(AD-6, AD-8; FR-1, FR-2, FR-4, FR-5)*

**Acceptance Criteria:**

**Given** the sequence config,
**When** I scroll,
**Then** scroll position deterministically maps to a monotonic Career Sequence position driving camera altitude and a derived year label that never decreases while scrolling up, stable across viewport sizes (FR-1, FR-5).

**Given** `free-scroll` Motion Mode,
**When** the camera follows,
**Then** it is a smoothed (damped) follow within the bounded time-constant, not 1:1, and rapid scroll still resolves to the correct final Era (FR-2).

**Given** motion,
**When** the camera tilts/pivots,
**Then** tilt never exceeds the documented ceiling, returns to neutral at rest, and is fully suppressed in reduced-motion (FR-4).

**Experiential AC:** scrolling the BAE ascent *feels* responsive and cinematic, not mechanical (§16 — reviewed by scrolling it).

### Story 2.3: One camera timeline + waypoint-jump launch

As a visitor,
I want to click to launch the camera to the era in a cinematic arc,
So that I can travel deliberately, not just scroll. *(AD-7, AD-18; FR-3)*

**Acceptance Criteria:**

**Given** one scrubbable camera timeline,
**When** free-scroll runs,
**Then** each frame maps `scrollProgress → timeline position`; **when** a waypoint is selected, the same playhead is tweened (never a second camera system), duration scaling with sequence distance within a bounded range (AD-7; FR-3).

**Given** a launch tween,
**When** I scroll or select again mid-tween,
**Then** it is interruptible without snapping, and on arrival Motion Mode returns to `free-scroll` with the target panel available (FR-3).

### Story 2.4: The signature Era Scene Chunk (BAE RadioLabScene)

As a visitor,
I want the BAE era to render as a themed, believable radio-lab world that loads gracefully,
So that the first era proves the worldbuilding bar. *(AD-3, AD-13, AD-14; FR-6, FR-7, FR-8, FR-33; NFR-3)*

**Acceptance Criteria:**

**Given** the BAE Era,
**When** its scene renders,
**Then** it is a data-driven Scene Chunk built from shared composable rendering modules, with era-appropriate set pieces matching its Tech Nodes (oscilloscopes, waveforms — no anachronisms) (FR-6, FR-8; NFR-10).

**Given** scene assets in R2,
**When** the camera approaches or a jump/deep-link arrives faster than assets stream,
**Then** a bounded loading placeholder shows and, past timeout/failure, degrades to a low-LOD/billboard or the Era's panel content — isolated, never blanking the canvas or triggering the coarse context-lost path (FR-33; AD-14).

**Given** traversal,
**When** GPU residency is measured,
**Then** textures/geometry outside the adjacent-era window are disposed/reloaded by the single residency authority (nodes stay mounted) and resident texture memory stays within the mobile budget (FR-7; AD-14; NFR-3).

### Story 2.5: Fidelity-Tier detection + deterministic degrade to truth

As a visitor on a weak device or with motion sensitivity,
I want the site to quietly serve me the right fidelity or the Static Timeline,
So that I never get a stutter, a seizure risk, or a blank canvas. *(AD-9, AD-13; FR-28, FR-26; NFR-2, NFR-4)*

**Acceptance Criteria:**

**Given** boot,
**When** the device is profiled,
**Then** `detect-gpu` sets an initial Fidelity Tier (0–3) and budgets; the single runtime monitor auto-downgrades one tier if avg FPS < 40 for > 2 s (shed order postprocessing → particles → DPR → LOD) (AD-13; NFR-2, NFR-4).

**Given** reduced-motion **OR** Tier 0 **OR** no-WebGL2 **OR** a mid-session `webglcontextlost`,
**When** the surface is selected,
**Then** the WebGL island is not mounted (or is torn down) and the Static Timeline is served, anchored to the visitor's current Era — deterministically, never a blank (AD-9; FR-28).

### Story 2.6: Year / altitude HUD

As a visitor,
I want a persistent readout of where I am in time and altitude,
So that I stay oriented during the ascent. *(FR-20)*

**Acceptance Criteria:**

**Given** scrolling or a jump,
**When** the HUD updates,
**Then** the displayed year/altitude stays consistent with the FR-1 mapping during scroll and after a jump (FR-20),
**And** HUD text holds ≥ 4.5:1 against the worst-case backdrop (NFR-5 — full audit in Epic 4).

### Story 2.7: DOM overlay + in-world waypoint → panel

As a visitor,
I want selecting a 3D waypoint to open the same readable HTML panel,
So that the spectacle and the truth are one experience. *(AD-2, AD-17; FR-10, FR-11)*

**Acceptance Criteria:**

**Given** the fixed canvas,
**When** content renders,
**Then** the HTML/React overlay is pinned above it and all primary text remains in the DOM, not WebGL textures (FR-10; AD-2).

**Given** an in-world waypoint,
**When** I select it,
**Then** it calls the shared panel/focus controller (AD-17) — not its own handler — opening the same Detail Panel as the Static Timeline, focus-managed (FR-11).

---

## Epic 3: The Full Ascent (All MVP Waypoints + Wayfinding)

**Goal:** The visitor can pilot the entire MVP career ascent — four waypoints across four bands + the deep-space Axioms bookend — jump between any via the Timeline Rail, experience atmospheric band transitions, and land on deep links that place. *(CAP-1, CAP-2 full, CAP-3 MVP set, CAP-6 full)*

### Story 3.1: Author the remaining MVP Era scenes

As a visitor,
I want Warby (clouds), Justworks (stratosphere), ACD (orbit), and the Axioms (deep-space) finale to each have a distinct world,
So that the whole ascent reads as a journey through advancing altitude. *(AD-14; FR-6, FR-8)*

**Acceptance Criteria:**

**Given** each remaining MVP Era,
**When** its scene renders,
**Then** it is a data-driven Scene Chunk from the same shared composable modules (added by config, not a new pipeline), with band-appropriate set pieces matching its Tech Nodes (NFR-10; FR-6, FR-8).

**Given** the four bands,
**When** the visitor ascends,
**Then** `ground → clouds → stratosphere → orbit → deep-space` altitude reads from first-class atmospheric art direction, not camera height alone (PRD §11 experiential AC).

### Story 3.2: Atmospheric band transitions

As a visitor,
I want moving between bands to feel continuous,
So that the ascent never jars with a hard cut. *(AD-14; FR-9)*

**Acceptance Criteria:**

**Given** `free-scroll` across a band boundary,
**When** the transition plays,
**Then** parallax/fog/color-grade/star-density shift continuously with no discontinuous "pop," respecting the active Fidelity Tier and reduced-motion (FR-9).

### Story 3.3: Timeline Rail jump-to-era across the world

As a visitor,
I want a persistent rail to launch to any era,
So that I never feel lost in a big world. *(AD-18, AD-7; FR-19, FR-3)*

**Acceptance Criteria:**

**Given** the persistent Timeline Rail,
**When** I select an Era,
**Then** it triggers the FR-3 launch through the single navigation authority, and the rail reflects the Career Data Layer order and highlights the current Era as I move (FR-19; AD-18).

### Story 3.4: Deep-link cold-load placement + history semantics

As a visitor arriving from a shared link,
I want to land directly at that era with its panel open,
So that I see the payload immediately, not a replayed launch. *(AD-11, AD-18; FR-21)*

**Acceptance Criteria:**

**Given** a deep link to a late Era,
**When** it cold-loads,
**Then** the camera is *placed* at the Waypoint with its panel open (no from-ground launch; reduced-motion anchors instantly) — only in-session selection launches (FR-21; AD-11).

**Given** navigation,
**When** history is written,
**Then** it goes through the single navigation authority: `replaceState` tracks scroll, `pushState` only on explicit selection, Back after a deep-link entry is defined, and no scene writes `history.*` directly (AD-18; FR-21).

### Story 3.5: Per-era fidelity tiering

As the solo builder protecting scope,
I want full 3D reserved for the signature bookends and lighter treatments for transitional eras,
So that the premium impression holds on a solo timeline without uneven fidelity. *(PRD §8 Q12, §6.1; FR-6)*

**Acceptance Criteria:**

**Given** the era set,
**When** fidelity is assigned,
**Then** the `ground` (BAE) and `orbit → deep-space` (ACD/Axioms) bookends get full-realized 3D and transitional eras get lighter kinetic-type/particle/wireframe treatments — all within the AD-13 budgets (PRD §8 Q12).

*(Decision surfaced: exact transitional-era treatments are an experiential spike, not fixed here.)*

---

## Epic 4: Trustworthy for Everyone (Accessibility & Performance Launch Gate)

**Goal:** Certify the full §10 launch gate — motion-sensitive, keyboard, screen-reader, low-end mobile, and no-WebGL users all get full parity and safety, and the site provably holds the truth and the budgets under spectacle. *(CAP-8 full; §10)*

### Story 4.1: Flash-safety (PEAT) gate

As a photosensitive visitor,
I want no effect to flash dangerously even at full motion,
So that the site can't trigger a seizure. *(AD-16; NFR-5)*

**Acceptance Criteria:**

**Given** every launch/bloom/ignition/strobe effect,
**When** analyzed with PEAT,
**Then** none flashes > 3×/sec at large area / high luminance, and a PEAT check on the enumerated effects runs in CI as a hard gate (AD-16; NFR-5).

### Story 4.2: Focus and contrast over a dynamic backdrop

As a low-vision or keyboard user,
I want focus and persistent text to stay legible across the whole ascent,
So that the brightest and darkest bands never wash them out. *(AD-16; NFR-5)*

**Acceptance Criteria:**

**Given** any focusable element,
**When** focused over bright-cloud or deep-space backdrops,
**Then** the focus ring holds ≥ 3:1 (halo/double-outline, not color-only) and the focused element is never obscured (2.4.11) (NFR-5).

**Given** all persistent Content Truth Layer text (HUD, Rail, panel chrome),
**When** measured against the worst-case backdrop,
**Then** it holds ≥ 4.5:1 via scrim/plate or luminance-adaptive treatment (1.4.3) (NFR-5).

### Story 4.3: Screen-reader orientation + remaining WCAG 2.2 criteria

As a screen-reader user,
I want to hear where I am in time and operate everything,
So that "moving through time" is not visual-only. *(AD-16; NFR-5)*

**Acceptance Criteria:**

**Given** era changes on scroll-settle and waypoint arrival,
**When** they occur,
**Then** the current Era/year is announced via a polite ARIA live region, and the canvas is `aria-hidden` or `role="img"` labelled to visible DOM text (NFR-5).

**Given** the DOM layer,
**When** audited,
**Then** target size (2.5.8), reflow at 400% without 2-D scroll (1.4.10), and forced-colors/`prefers-contrast` all pass, verified by an axe CI gate (NFR-5).

### Story 4.4: Lower-fidelity mobile spectacle

As a mobile visitor (the majority),
I want a genuine — if simpler — spectacle that stays smooth,
So that the positioning thesis doesn't surrender the mobile audience. *(FR-26; NFR-2, NFR-8)*

**Acceptance Criteria:**

**Given** a representative mid-range mobile device (real hardware, not simulator),
**When** the lower-fidelity (Tier 1–2) spectacle runs,
**Then** it holds ≥ 45 fps under sustained scroll or drops to the Static Timeline rather than stuttering, with all content reachable (FR-26; NFR-2, NFR-8).

### Story 4.5: Perf-budget certification + field CWV

As the solo builder,
I want the performance budgets provably enforced and field-verified,
So that spectacle can never silently make the site slow (SM-C1). *(AD-13; NFR-1, NFR-3)*

**Acceptance Criteria:**

**Given** the full MVP world,
**When** CI runs,
**Then** the `perf-budget.json` gate fails on any regression to draw calls / triangles / resident texture memory / WebGL bundle weight, asserted against the resident-window sum, not per-asset (AD-13; NFR-3).

**Given** production traffic,
**When** field CWV (CrUX/RUM) is measured,
**Then** LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75 on mobile and desktop (NFR-1).

---

## Epic 5: The Source is the Proof (Source-as-Exhibit + Instrumentation)

**Goal:** A skeptical engineer opens the public repo and finds AI-built code that meets Jarad's standard and holds up to hostile inspection, and the site measures whether the whole play landed. *(CAP-9, CAP-10)*

### Story 5.1: Documented, CI-enforced engineering standards

As a challenger reading the source,
I want the code's standards to be checkable, not asserted,
So that "directed AI to my standard" is falsifiable. *(AD-15; FR-30)*

**Acceptance Criteria:**

**Given** the repo,
**When** it is inspected,
**Then** a `CONVENTIONS.md` documents module boundaries/naming/abstraction seams/doc expectations, and CI enforces the enforceable parts (lint/format, import-boundary/module-graph rules, doc-presence) green on `main` (FR-30).

### Story 5.2: Secret-hygiene publish audit

As Jarad, inviting hostile inspection,
I want the public repo to never have leaked a secret,
So that one found key can't invert the whole credibility signal. *(AD-15; FR-35)*

**Acceptance Criteria:**

**Given** the repo before it is made public,
**When** the publish gate runs,
**Then** gitleaks scans the working tree **and** the full commit history is verified clean, no credentials are committed (all via bindings), and "no secrets in public repo" is on the launch checklist (FR-35).

### Story 5.3: Embedded agent- and human-aware guidance

As the next team member (human or agent) editing this repo,
I want passively-helpful, accurate guidance,
So that I can find the right module fast and the code demonstrates Jarad's AI-orchestration philosophy. *(AD-15; FR-32)*

**Acceptance Criteria:**

**Given** the repo,
**When** a fresh agent/human is given a defined "make change X" task,
**Then** an `AGENTS.md`/`CLAUDE.md` + per-module docs (accurate to the code) let them locate the right module from the docs alone within the stated bar (no source-wide search) (FR-32).

### Story 5.4: CI-guarded source-resident easter egg

As a challenger who looks closely,
I want a discoverable skill-showcase in the source itself,
So that the payoff rewards inspection and doesn't require WebGL. *(FR-31)*

**Acceptance Criteria:**

**Given** the source,
**When** it is read,
**Then** ≥ 1 non-trivial source-resident easter egg exists, protected from accidental removal by a CI test (not spoiled by a plain public doc), and it never degrades the core experience, the §10 budgets, or accessibility (FR-31).

### Story 5.5: Build case study + public repo & license

As a skeptical staff engineer (UJ-5),
I want to open the public repo and read how the code was directed to standard,
So that I believe the craft is real. *(AD-15; FR-29, FR-30)*

**Acceptance Criteria:**

**Given** the site,
**When** I follow the repo link,
**Then** the source is public, buildable, and documented enough for a stranger to understand its structure, under a source-available "look, don't reuse" license (FR-29).

**Given** the "directed AI to my standard" claim,
**When** I look for evidence,
**Then** a published build case study documents the AI-direction process as the falsifiable evidence (FR-30).

*(Decision surfaced: license flavor — PolyForm Noncommercial / BUSL / custom view-only — pending Jarad's choice.)*

### Story 5.6: Privacy-respecting analytics via one event schema

As Jarad measuring success,
I want the minimal metric events captured through one schema without fighting onboarding,
So that SM-2 is computable and privacy is respected. *(AD-19; FR-34; NFR-9)*

**Acceptance Criteria:**

**Given** the one typed event registry and `track()`,
**When** any surface (World, Rail, Static Timeline) emits an event,
**Then** scroll-traversal arrival and jump arrival are **distinct** named events keyed by Era slug (SM-2 computable), plus résumé download, outbound/repo clicks, and shares/revisits (FR-34; AD-19).

**Given** a visitor's privacy signals,
**When** analytics runs,
**Then** DNT/GPC are honored, no invasive fingerprinting occurs, and any consent UI is keyboard- and reduced-motion-safe and sequenced not to collide with the 3–5 s onboarding cue (FR-34; NFR-9).

*(Decision surfaced: analytics vendor + production RUM mechanism pending; schema is fixed by AD-19.)*

---

## Epic 6: A Living World (Post-MVP Delight & Worldbuilding)

**Goal:** Bring the world alive — physics-driven grabbable artifacts, rendered relationship lines, full nine-scene worldbuilding fidelity, and the offline Knowledge Graph authoring aid. **Explicitly post-MVP.** *(CAP-7, CAP-3 full, CAP-5 KG/lines)*

### Story 6.1: Floating cards as soft-physics bodies

As a visitor,
I want artifact cards to drift and orbit gently,
So that the world feels alive, not static. *(AD-14 physics sub-rule; FR-22)*

**Acceptance Criteria:**

**Given** an active era with physics enabled,
**When** cards are idle,
**Then** they drift within bounds (never off-scene or jittering), Rapier scoped to active-era props only, world paused off-screen, and physics disabled at Tier ≤ 1 / reduced-motion (FR-22; AD-14).

### Story 6.2: Inspect / grab artifacts

As a visitor,
I want to grab and inspect an artifact,
So that I can examine it and open its details tactilely. *(FR-23)*

**Acceptance Criteria:**

**Given** a grabbable artifact,
**When** I inspect it,
**Then** it enters `inspect` Motion Mode, can open the corresponding Detail Panel (via AD-17), and returns cleanly to the world on release/close (FR-23).

### Story 6.3: Orbiting objects & soft collisions

As a visitor,
I want satellites/debris/stations to orbit and collide softly,
So that the higher bands feel like living systems. *(AD-14; FR-24)*

**Acceptance Criteria:**

**Given** a scene with orbiting objects,
**When** they move and collide,
**Then** motion/collisions are soft and the physics body count per scene never exceeds the per-tier cap, protecting the frame budget (FR-24; NFR-2).

### Story 6.4: Visual Relationship Lines

As a founder tracing the through-line,
I want to see how a pattern here becomes a capability later,
So that the career reads as a connected arc, not disconnected jobs. *(FR-17)*

**Acceptance Criteria:**

**Given** the relationship data,
**When** rendered,
**Then** at least the core through-line chains (BAE→signals→architecture→patterns→AI orchestration; SagePoint→taxonomy→RAG) appear as Relationship Lines and/or "why this matters later" notes, and opening a related item reveals its forward/backward connections (FR-17).

### Story 6.5: Knowledge Graph offline authoring pipeline

As Jarad authoring content,
I want an offline tool-agnostic graph to surface cross-era connections,
So that the Career Data Layer is richer than a linear résumé. *(FR-18)*

**Acceptance Criteria:**

**Given** source material (résumé/LinkedIn/GitHub/Medium/essays),
**When** the offline KG process runs,
**Then** its output conforms to the Career Data Layer schema (a producer, never the renderer) and measurably surfaces cross-era connections used in authored content (FR-18).

### Story 6.6: Full worldbuilding fidelity for remaining eras

As a visitor,
I want every era — including Prologue, Web/Agency, ClassPass/SagePoint, and Splash — fully realized,
So that the whole world holds the premium bar, not just the bookends. *(FR-6, FR-8, FR-9)*

**Acceptance Criteria:**

**Given** the transitional eras,
**When** upgraded to full fidelity,
**Then** each has its full set pieces + Tech-Node motifs and full-richness band transitions, added by config through the shared composable modules within the AD-13 budgets (FR-6, FR-8, FR-9; NFR-3, NFR-10).

---

## Final Validation

- **FR coverage:** all of FR-1…FR-35 appear in ≥ 1 story (see FR Coverage Map). ✅
- **NFR coverage:** NFR-1…NFR-10 land across Epics 1 (SEO/CWV/PE), 2 (perf/adaptive), 4 (a11y/perf certification), 5 (privacy). ✅
- **No starter template:** confirmed — Story 1.1 scaffolds a fresh Next.js 16 project (architecture recommends hand-roll). ✅
- **Entity/data creation just-in-time:** the Career Data Layer schema (1.2) is defined once as the SSOT; scenes/routes consume it — no big-upfront-everything. ✅
- **Epic independence:** each epic is demoable and standalone — Epic 1 ships a real readable site; Epic 2 adds the spectacle on one era; Epic 3 widens it; Epic 4 certifies the gate; Epic 5 hardens the exhibit; Epic 6 is post-MVP. No epic requires a later epic to function. ✅
- **Within-epic story order:** each story builds only on previous ones (foundation → data → render → enhance). ✅
- **File-churn check:** the single-authority primitives (canvas/scroll/panel/nav/data) are established once (Epics 1–2) and *referenced* thereafter, not re-touched per epic — the architecture's single-authority ADs are what prevent churn. ✅
- **Open decisions surfaced (not invented):** license flavor (5.5), analytics vendor/RUM (5.6), transitional-era fidelity treatments (3.5), SM target numbers, MVP physics/relationship-line inclusion — all flagged for Jarad, matching the SPEC's open questions.
