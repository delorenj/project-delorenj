# Architecture Spine — Rubric Walk

**Target:** `ARCHITECTURE-SPINE.md` (Career Ascent, feature altitude, 15 ADs)
**Driving spec:** `prd.md` + `addendum.md` (+ `research-digest.md`)
**Reviewer role:** rubric walker — judge against the good-spine checklist only; do not rewrite.
**Date:** 2026-07-16

## Verdict: PASS-WITH-CONCERNS

The spine is strong: the paradigm genuinely loads structure, the 15 ADs enforceably fix the real R3F/scroll/SSR/hosting/perf/source divergence points, it faithfully ratifies the PRD/addendum proposals, the diagrams are valid, the seed is minimal, and the deferrals are all fenced by an already-locked invariant. **One HIGH gap blocks a clean pass:** the accessibility half of §10 (keyboard/canvas-semantics/focus/contrast/SR/flash-safety) has no owning AD or convention, yet the Capability→Architecture map asserts §10 coverage. Two MED items (a redundant runtime-downgrade rule; a silent operations/observability dimension) round out the concerns. Everything decided is sound — this is a spine that needs one addition, not a rebuild.

---

## Checklist findings

### 1. Fixes the real divergence points below (epics/stories), misses none — MOSTLY, one miss
The 15 ADs cover the load-bearing forks a story-author would otherwise resolve inconsistently: where facts live (AD-1), DOM-vs-WebGL truth (AD-2), canvas count (AD-3), scroll/RAF ownership (AD-4), setState-in-frame (AD-5), DOM↔world sync (AD-6), camera authority (AD-7), world axis (AD-8), reduced-motion/fidelity (AD-9), fallback unification (AD-10), routing (AD-11), Cloudflare bundle split (AD-12), perf budget (AD-13), scene contract (AD-14), source gates (AD-15). This is comprehensive for the runtime/build/hosting surface.
**Miss:** the **accessibility interaction contract** is a genuine story-level divergence point (one story builds era-selection as raycast-only, another as real DOM buttons; one component scrims its text, another does not) and it is not fixed by any AD. See finding #6/#A. Testing strategy (unit/integration/e2e/experiential-acceptance mechanics per §16) is also unspecified — arguably below altitude, but noted.

### 2. Every AD's Rule is enforceable and its Prevents follows — YES
No Rule is vague, unfalsifiable, or has a Prevents that doesn't follow. Enforcement strength varies:
- **Strongly enforceable (CI/lint/measurable):** AD-2 (view-source + LCP), AD-3 (one `<Canvas>`, no runtime remount), AD-4 (no `drei ScrollControls` import), AD-5 (custom lint: no `setState`/`set` in `useFrame`), AD-6 (both derive from `sequence.config`), AD-8 (data validation: non-overlapping, non-decreasing, single-valued), AD-11 (route/SEO tests), AD-12 (ESBuild bundle-size gate), AD-13 (the CI gate *is* the enforcement), AD-15 (a/b/c/d are CI-backed).
- **Soft/convention-enforced (fine, but flag):** AD-1 "no career fact hardcoded" (partly lintable, mostly review); AD-14 "set pieces must match Era's Tech Nodes / no anachronism" (a content-authoring convention, not CI-checkable); AD-15(e) build case study + (c) cold-start locatability test (manual). These are testable *properties* even where enforcement is manual — acceptable, not findings.

### 3. Nothing under Deferred leaves a real fork open — YES
Every deferral is fenced by a locked invariant, so two units cannot diverge on it:
- WebGPU → WebGL2-only baseline fixed, "no WebGPU-only paths" (closed fork).
- Physics build (FR-22–24) → scope invariant already pre-committed in AD-14's physics sub-rule.
- KG pipeline (FR-18) → output constrained to the Career Data Layer schema.
- Relationship-line rendering (FR-17) → data/schema fixed, only the render deferred.
- Audio / analytics vendor / per-era fidelity / mobile tuning → each bounded by a stated constraint (Conventions privacy posture, AD-13 budgets, AD-14 contract).
- **Buy-vs-build the canvas/scroll rig** is the one to watch: it's correctly framed as *implementation open, topology fixed* (AD-3/AD-4). Because it resolves once behind a throwaway spike and the single-GlobalCanvas/single-scroll-authority invariants are locked, it does **not** leave a real fork open — but epics should schedule that spike before any scene work so stories don't build against divergent tunnel/`useCanvas` APIs.

### 4. Named tech verified-current for Jul 2026 — PLAUSIBLE (deep check delegated to review-versions.md)
Nothing looks obviously stale for July 2026: GSAP 3.13.x "free incl. all plugins" (post-2025 Webflow change — correct), R3F v9.6 / drei v10.7 / three 0.185 / React 19 form a coherent set, `@opennextjs/cloudflare` 1.20 with `next-on-pages` correctly rejected as deprecated, Lenis 1.3 via `lenis/react`. The memlog correctly relegates the two flagged-stale libs (`@theatre/r3f` → dev-only assumption; `r3f-scroll-rig` 8.15.0 → behind a spike gate).
**Flag for the version reviewer:** "**Next.js 16.2.x (LTS)**" — Next.js has not historically maintained an LTS track the way Node does; verify the "LTS" label is real and not an inference. Versions themselves are plausible.

### 5. Ratifies rather than contradicts the PRD/addendum — YES
No contradictions found. The stack (addendum §A/§N), single-canvas/scroll/RAF/state/camera model (§L), Career Sequence axis (§C), data types (§D), quality tiering (§L/§10), Static-Timeline-four-jobs (§10), routing (FR-21), perf budget (§10/§K), scene contract (§F), and Source-as-Exhibit (§4.8) are all adopted verbatim as `[ADOPTED]` ADs. The inferred forks match the PRD's own proposals: MVP waypoints = §6.1's BAE/Warby/Justworks/ACD+deep-space; fidelity bookends = §6.1/§8 Q12; hosting = §8 Q8 RESOLVED; WebGL2-only = §8 Q16 recommendation. The `[ASSUMPTION]`-tagged items (Theatre.js dev-only, license flavor) correctly mirror open PRD questions rather than overreaching.
*Nit (not a contradiction):* Conventions cite type `EraSegment` as "per addendum §D," but §D defines `CareerWaypoint/TechNode/CareerWorldState`; `EraSegment` is from §C. Fix the citation.

### 6. Covers FR-1..35 + §10 NFRs; Capability→Architecture map has no gaps — **GAP (accessibility)**
All 35 FRs are reachable through the map's group rows, and most §10 sub-areas are genuinely owned: CWV → AD-2+AD-13; frame budget → AD-5+AD-13; GPU/asset budgets → AD-13; adaptive quality → AD-9+AD-13; SEO → AD-2+AD-11; resilience → AD-3+AD-10.
**The map claims "§10 Cross-cutting NFRs → AD-2, AD-9, AD-13," but the §10 *Accessibility* block is largely uncaptured.** AD-9 owns only reduced-motion + fidelity tier. **No AD or convention owns:**
- **Keyboard/canvas semantics (FR-27):** "every era is a real focusable `<button>/<a>` triggering the same nav as click — **never raycast-only selection**"; canvas `aria-hidden`/`role=img`+`aria-labelledby`; skip-link; no keyboard trap.
- **Focus indicator:** visible ring ≥3:1 above the canvas, legible on **both** bright-cloud and deep-space backdrops (halo/double-outline); focused element never obscured (2.4.11).
- **Persistent-UI text contrast:** HUD/Rail/panel-chrome ≥4.5:1 against the **worst-case** backdrop across the full ascent (scrim/plate or luminance-adaptive).
- **SR orientation:** current Era/year as a polite ARIA live region on scroll-settle/arrival.
- **Flash safety (hard gate, safety+legal "high" risk):** no effect flashes >3×/sec at large area/high luminance; PEAT-gated — applies even in full-motion mode.

FR-27 is mapped to AD-9/AD-10, neither of which enforces any of the above. Given the PRD elevates a11y to a **first-class launch gate** ("full §10 launch gate, not a floor," §6.1) and lists it among the **high** risks (canvas-only selection, vestibular, photosensitivity), this is a HIGH finding: the map asserts coverage it does not deliver, and these are real story-level divergence points. **Recommend an AD-16 (A11y contract)** consolidating the above.

### 7. Every dimension decided/deferred/open — esp. OPERATIONAL envelope — **PARTIAL (ops silent)**
- **Deployment / environments / provider / CI: well covered.** AD-12 + the "Deployment & environments" section (Workers/OpenNext, R2, KV, `assets.jaradd.com`, ISR on KV+R2) + local→preview→production + CI gates sequenced before deploy.
- **Data/persistence, state, secrets, security:** decided (hand-authored typed data, Zustand, env/bindings + gitleaks). Auth is genuinely N/A (unauthenticated public site) — fine to omit.
- **Operations / observability: SILENT (finding).** No decision, deferral, or open-marker for runtime **error tracking/logging/alerting, rollback strategy, or field CWV/RUM monitoring.** Note the §10 CWV targets are specified "field/CrUX," but AD-13 only enforces them as a **lab CI gate** — production field monitoring has no home. For a solo Cloudflare portfolio, minimal ops is defensible, but *silence* is the finding: mark it explicitly (e.g., "Deferred: Cloudflare-native logs only, no error-tracking vendor / RUM in MVP").
- **Testing strategy:** unspecified beyond CI quality-gates; §16's "experience is the acceptance test" implies an experiential-acceptance mechanism that no AD/convention shapes. Minor.

### 8. Paradigm loads structure; seed minimal; diagrams valid & non-empty — YES
- **Paradigm** ("Layered progressive-enhancement over a single-source-of-truth data core, with a single-authority runtime") is a legitimate composite of three recognized models (progressive enhancement + model→projection SSOT + single-authority runtime). It's descriptive-compound rather than one canonical name, but it demonstrably **loads structure for free**: it derives the directory layout (`data/`=model, `truth/`+`app/`=enhancement base, `spectacle/`=leaf enhancement, `state/`+`scroll/`=single-authority runtime) and the import/dependency rule (nothing imports `spectacle/` statically; `truth/` builds with `spectacle/` absent). Good.
- **Structural Seed** is a scaffold, not a mirror: it names the load-bearing seams (`GlobalCanvas.tsx`, `cameraTimeline.ts`, `sequence.config.ts`, `perf-budget.json`, `StaticTimeline/`, `scenes/`, `rendering/`) without enumerating all 9 scenes or every component. Correct depth.
- **Diagrams:** all three are valid mermaid and non-empty — the paradigm dependency `graph TD` (with a valid dashed island-mount edge and an explicit "arrows = permitted import directions" rule), the deployment `graph LR` (subgraph + `<br/>` labels), and the core-entity `erDiagram` (valid cardinality tokens, quoted relationship labels). Special chars are safely inside quotes.

---

## AD hygiene (two-in-one / mis-classed / redundant)

- **Redundancy (MED):** the runtime adaptive-quality/FPS-downgrade rule is stated in **two** ADs — AD-9 ("`PerformanceMonitor` with hysteresis; shed order postprocessing→particles→DPR→LOD") and AD-13 ("if avg FPS < 40 for > 2 s the monitor auto-downgrades one Fidelity Tier"). Two owners with different framings/thresholds create authority ambiguity. Consolidate the runtime-downgrade spec in AD-9; have AD-13 reference it and keep only the *budget/CI-gate* concern.
- **Two-decisions-crammed (LOW):** AD-14 is the densest — composability + disposal-window + per-scene fallback-isolation + anachronism + a post-MVP physics sub-rule; the physics sub-rule could reasonably be its own deferred AD. AD-9 (reduced-motion + fidelity tier) and AD-12 (client/server split + R2 asset hosting) each bundle two facets, but the coupling justifies it. None blocking.
- **Convention-that-could-be-an-AD (LOW):** the analytics/consent rule (privacy-first, honor DNT/GPC, consent surface sequenced off the 3–5 s onboarding cue) lives in Conventions but has a real divergence (FR-34, consent collision) that would also be at home as an AD. Borderline; acceptable as a convention because the invariant is narrow.
- **AD-that-should-be-a-convention:** none. All 15 are genuine invariants.
- **Clean cross-references (not redundancy):** AD-3 ↔ AD-14 on node-mount/dispose is good factoring (AD-3 delegates GPU residency to AD-14), not duplication.

---

## Recommended actions (priority order)
1. **[HIGH]** Add an **A11y contract AD** (keyboard-operable/never-raycast-only era selection, canvas semantics, focus ring ≥3:1 on all bands + focus-not-obscured, persistent-UI text contrast ≥4.5:1 over worst-case backdrop, SR Era/year live region, PEAT flash-safety hard gate). Update the Capability→Architecture map so the §10 row honestly reflects it.
2. **[MED]** De-duplicate the runtime FPS-downgrade rule between AD-9 and AD-13 (single authority).
3. **[MED]** Give the **operations/observability** dimension an explicit decision or deferral (error tracking, rollback, field CWV/RUM) rather than leaving it silent.
4. **[LOW]** Version reviewer: confirm the "Next.js 16.2.x **(LTS)**" label is real. Fix the `EraSegment` "§D" citation (it's §C). Consider splitting AD-14's physics sub-rule into its own deferred AD.
