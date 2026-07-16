# Reconciliation Review — Architecture Spine vs. PRD / Addendum / Research Digest

*Reviewer role: reconciliation — does the spine faithfully carry the load-bearing intent of its sources, and what quiet requirement did the terse AD structure drop?*
*Date: 2026-07-16. Inputs: `ARCHITECTURE-SPINE.md`, `prd.md`, `addendum.md`, `research-digest.md` (all read in full).*

## Verdict

**NEEDS-WORK** — narrowly. The spine is technically excellent and internally consistent: every addendum §L runtime pattern is carried into an AD, there are no material contradictions with settled PRD/addendum decisions, the §16 non-disposable foundations all landed as ADOPTED ADs, and Source-as-Exhibit / SEO / perf-budget / resilience are strongly gated. **But an entire cluster of load-bearing accessibility invariants — every §10 a11y commitment that governs the *full-motion* (spectacle-on) experience — is silently dropped.** These are not deferrable: the PRD promotes them to MVP launch gates (§6.1), one of them (flash-safety/PEAT) is a WCAG 2.3.1 Level-A seizure-safety gate with legal exposure that *explicitly applies even in full-motion mode*, and the product's own counter-metric SM-C3 exists to protect them. The fix is well-scoped (one new accessibility AD + an a11y CI gate + binding FR-27), which is why this is NEEDS-WORK rather than a structural failure.

---

## 1. Coverage matrix — FR groups (§4.1–4.9)

| FR group | Status in spine | Where |
|---|---|---|
| **4.1 World & Motion (FR-1–5)** | Decided | Cap-map row 4.1 → AD-4, AD-6, AD-7, AD-8. FR-1 sequence axis (AD-8), FR-2 damped follow / FR-3 waypoint tween / FR-4 tilt (AD-7 timeline; tilt suppressed via AD-9 motion flag), FR-5 proportional-with-cap (AD-6 SPAN_* constants). Faithful. |
| **4.2 Era Scenes (FR-6–9, 33)** | Decided (FR-9 thin) | AD-3, AD-13, AD-14. FR-6 bands/scenes, FR-7 dispose-outside-window, FR-8 anachronism-free set pieces, FR-33 bounded-loading/isolated-fallback all in AD-14. **FR-9 atmospheric transitions** appears only as "band transitions" in AD-14's composable-module list; the "no discontinuous pop / altitude-via-atmosphere" substance is not an invariant (see F8). |
| **4.3 Content Truth Layer (FR-10–14)** | Decided | AD-1, AD-2. Text-never-trapped-in-WebGL is the AD-2 core invariant; résumé MDX single-source in structural seed (`app/resume`) + Conventions. Strong. |
| **4.4 Data Model & KG (FR-15–18)** | Decided / Deferred | AD-1 (SSOT), Conventions (types per addendum §D). FR-17 lines and FR-18 KG both in Deferred, KG correctly framed "producer, never renderer." Faithful. |
| **4.5 Nav & Wayfinding (FR-19–21)** | Decided | AD-11 (routes/cold-load/history/404-alias) + AD-7 (jump). Rail/HUD in structural seed `truth/rail`,`truth/hud`. Strong — AD-11 is one of the most complete ADs. |
| **4.6 Physics (FR-22–24)** | Deferred | Deferred list + AD-14 physics sub-rule (PHYSICS_BODY_CAP, active-era scope, tier gating). Faithful. |
| **4.7 A11y & Fallbacks (FR-25–28)** | **Partial — major gap** | AD-9 + AD-10 cover FR-25 (reduced-motion), FR-26/FR-28 (fidelity tier / no-WebGL / context-lost → Static Timeline). **FR-27 (keyboard nav & focus management) is bound by NO AD** — the only "keyboard" token in the whole spine is AD-9's reduce/pause toggle. See F1–F5. |
| **4.8 Source-as-Exhibit (FR-29–32, 35)** | Decided | AD-15 (a–e): CONVENTIONS+CI, gitleaks history-clean publish gate, AGENTS/CLAUDE cold-start test, CI-guarded easter egg, build case study. License assumption flagged for confirm. Strong. |
| **4.9 Instrumentation & Consent (FR-34)** | Decided (taxonomy thin) | Conventions (privacy-first, DNT/GPC, consent sequenced off the onboarding cue) + AD-9 (consent sequencing). The concrete **event set** backing SM-2–SM-5 (scroll-depth-vs-jump distinguished) is not carried (F10). |

## 2. Coverage matrix — §10 NFR clusters

| §10 cluster | Status | Where / gap |
|---|---|---|
| **Perf — CWV** | Decided (numbers not in the JSON) | AD-2 (LCP = SSR text, never canvas), AD-6 binds CLS. Numeric p75 gates (LCP≤2.5 / INP≤200 / CLS≤0.1) are not enumerated in `perf-budget.json` (which lists GPU/asset budgets); field-metric, so partly a measurement-not-CI concern. Low. |
| **Perf — frame budget** | Decided | AD-13 "avg FPS < 40 for > 2 s ⇒ auto-downgrade one tier." ≥45fps floor / 10ms ceiling implied. |
| **Perf — GPU/asset budgets** | Decided | AD-13 enumerates draw calls / triangles / texture mem / KTX2 / first-load<6MB/~15MB cap / DPR≤2 / instancing — verbatim to §10. Strong. |
| **Perf — adaptive quality** | Decided | AD-9 (detect-gpu boot + PerformanceMonitor hysteresis, shed order postproc→particles→DPR→LOD), AD-13. Strong. |
| **Accessibility** | **SILENTLY DROPPED (full-motion subset)** | AD-9/AD-10 = reduced-motion axis + static-timeline parity only. Flash-safety, canvas semantics/keyboard, focus ring, text contrast, SR live region, target size, reflow, forced-colors — **none appear in any AD, convention, capability-map row, or CI gate.** See F1–F6. |
| **SEO & discoverability** | Decided (canonicalization thin) | AD-2 (SSR-before-hydration), AD-11 (per-era routes + OG/Twitter + preview image), AD-13 + structural seed (JSON-LD / Rich-Results CI). Duplicate-content self-compete rule under-carried (F7). |
| **Resilience / prog. enhancement** | Decided | AD-10 (one artifact / four jobs), AD-3 (one canvas, switch by visibility), AD-9 (WebGL2 baseline, no WebGPU-only). Strong. |
| **Privacy / Maintainability** | Decided | Conventions (privacy) + AD-1/AD-14 (single edit point, composable data-driven scenes). Strong. |

## 3. Coverage — §5 Non-Goals

All non-goals are either carried or not contradicted; none is violated by an AD.

- Not text-trapped-in-WebGL → AD-2 core invariant (strongly carried).
- Not on-page live KG viz / KG is offline aid → Deferred + cap-map 4.4 "producer, never a renderer" (carried).
- Not a reusable/OSS product → AD-15 license assumption ("look, don't reuse") (carried).
- Not bleeding-edge baseline (WebGL2-first) → AD-9 + Deferred WebGPU (carried).
- Not built on a game engine / 2D renderer → Stack picks R3F/Three; addendum §B rejections consistent (carried).
- **Not a game** (no win/lose/score) and **Not a CMS/blog** → not explicitly restated but not contradicted; acceptable for a terse spine. Low.

## 4. Coverage — §16 Ways-of-Working

Well represented. The §16 "explicitly non-disposable" foundations map one-to-one onto ADOPTED ADs: single canvas (AD-3), single scroll authority + single RAF (AD-4), SSR'd Content Truth Layer / Static Timeline (AD-2, AD-10), Fidelity-Tier detection (AD-9), perf-budget CI gate (AD-13). "Disposable spikes / hard pivots / experiential tuning" are referenced in Deferred and in AD-11/AD-15 (§16 citations). The demo-first walking-skeleton *sequencing* is left to Epics — appropriate. No gap.

## 5. Contradiction check — do any ADs contradict settled decisions?

**None material.** Spot-checks:
- AD-3 ("switch by visibility, never unmount") vs FR-7 ("dispose GPU textures outside adjacent window") — correctly reconciled: AD-3 defers residency to AD-13/AD-14, AD-14 does the disposal. No conflict (this was the one place the PRD itself flagged a potential contradiction; the spine resolves it cleanly).
- AD-12 Cloudflare/OpenNext/R2, no `next-on-pages`, Three client-only under the ~10 MiB Worker ceiling — matches §13 + addendum §N exactly.
- Stack: Next 16.2.x / React 19 / R3F v9 — consistent with §13 assumption ("Next 15/16") and addendum §A.
- AD-9 "spectacle OFF by default in code unless prefers-reduced-motion does not match" — matches research digest verbatim.
- AD-7's Theatre.js dev-only stance is flagged `[ASSUMPTION … confirm §8 Q13]` — an open question, not a contradiction.

## 6. Coverage — addendum §L integration patterns (research digest)

Nearly complete. Single-canvas (AD-3), single scroll authority (AD-4), single RAF (AD-4), state boundary (AD-5), one-timeline camera + derive-DOM+world-from-one-config (AD-6/AD-7), frameloop='demand'/invalidate/regress (AD-4), physics scope (AD-14), quality tiering (AD-9/AD-13), SSR island (AD-2), composable rendering (AD-14) — all carried. Two soft spots, both low:
- **Postprocessing "DOM legibility must never depend on postprocessing"** — only *implicit* (subsumed by AD-2's DOM-independent-of-WebGL); the selective-bloom mechanism is named in structural seed `spectacle/post/` but the legibility constraint isn't stated (F11).
- **`Sec-CH-Prefers-Reduced-Motion` client hint** — not carried, but addendum §N explicitly marks it optional/progressive-enhancement (source of truth stays matchMedia/AD-9). Acceptable omission.

## 7. Quiet-requirements checklist (the ten named in the brief)

| Quiet requirement | In spine? | Evidence |
|---|---|---|
| flash-safety / PEAT (WCAG 2.3.1 A) | **MISSING** | No token "flash"/"PEAT" anywhere; not in AD-9 (which is reduced-motion, but §10 says this applies *even in full-motion*), not in any CI gate. **F1 / CRITICAL.** |
| focus-ring dual-backdrop contrast (2.4.7 / 2.4.11) | **MISSING** | No "focus"/"outline" token; the bright-cloud→deep-space backdrop problem the rule exists to solve is unaddressed. **F3 / HIGH.** |
| SR live-region Era announcements | **MISSING** | No "live region"/"aria"/"screen reader" token; the core "moving through time" cue has no non-visual equivalent. **F4 / HIGH.** |
| target-size (2.5.8) | **MISSING** | Not present. **F5 / MED.** |
| reflow-at-400% (1.4.10) | **MISSING** | Not present (relevant: pinned-canvas + overlay layout). **F5 / MED.** |
| forced-colors / prefers-contrast | **MISSING** | Not present. **F5 / MED.** |
| anti-harvest email | **PRESENT** | Conventions: "Exposed email uses an anti-harvest measure (no raw `mailto` in markup)." |
| consent not colliding with onboarding | **PRESENT** | Conventions: consent "sequenced not to collide with the 3–5 s onboarding cue"; cap-map 4.9 → AD-9 (consent sequencing). |
| duplicate-content canonicalization | **PARTIAL** | AD-11 lists "canonical" per route, but §10's "root and per-era routes differentiated … so they don't self-compete" is not carried as intent. **F7 / MED.** |
| "one defended idea / restraint" aesthetic | **ABSENT (by altitude)** | §11 restraint/film-beat/altitude-via-atmosphere/diegetic-cue not in spine; partly enforced indirectly by AD-13 (budget) + AD-14 (composable), and the 3–5 s cue is referenced only obliquely via the consent convention. **F8 / MED.** |

---

## 8. Findings (ranked, most severe first)

**F1 — [CRITICAL] Flash-safety / PEAT gate is entirely absent.**
`§10 "Flash safety (hard gate, applies even in full-motion mode)"`, `§6.1` (MVP launch gate), `§15` (high risk, "safety + legal"). WCAG 2.3.1 Level A: no effect flashes >3×/sec at large area/high luminance; verify launch tween + deep-space effects with PEAT. Because it *applies even in full-motion mode*, AD-9's reduced-motion path does **not** discharge it. The spine has no AD, no convention, and no CI/QA gate for it — while it *does* gate perf, secrets, JSON-LD, and boundaries. A seizure-safety + legal-liability requirement is the single most important thing not to lose in translation, and it was lost. **Fix:** add it to an accessibility AD and to the launch checklist / CI-or-manual PEAT gate.

**F2 — [HIGH] No accessibility invariant governs the full-motion experience; FR-27 is bound by no AD.**
`§10 "Canvas semantics + keyboard"`, `FR-27`, `§6.1` ("canvas semantics"). The spine has no rule for: canvas `aria-hidden`/`role=img`+`aria-labelledby`; **every era a real focusable `<button>/<a>` in DOM order, Enter/Space-activatable, never raycast-only selection**; skip-link first tab stop → `<main>`; h1→h2 hierarchy; panel focus-in-on-open / restore-on-close / no canvas keyboard trap. FR-27 sits in the front-matter `binds: FR-1..FR-35` but is referenced by zero ADs; cap-map row 4.7 lists only AD-9/AD-10 (reduced-motion + static-timeline parity). Failure mode: the core era-selection interaction ships keyboard/SR-unreachable (fails 2.1.1 / 2.4.3) with nothing in the spine to prevent it.

**F3 — [HIGH] Focus-ring dual-backdrop contrast and persistent-UI text contrast are dropped.**
`§10 "Focus indicator"` (visible ring above the canvas, ≥3:1, halo/double-outline not color-only, legible on both bright-cloud and deep-space backdrops, never obscured — 2.4.7/2.4.11) and `§10 "Text contrast over a dynamic backdrop"` (all persistent HUD/Rail/panel chrome ≥4.5:1 against the *worst-case* backdrop across the full ascent, via scrim/plate — 1.4.3). Both are in `§6.1` MVP gates. The whole point — the backdrop luminance swings from clouds to deep space, so a single-treatment ring/text disappears at one end — is exactly the kind of cross-cutting invariant a spine exists to pin, and it is absent.

**F4 — [HIGH] Screen-reader live-region Era/year announcements are dropped.**
`§10 "Screen-reader orientation"`, `§6.1` ("SR era/year announcements"). Current Era/year must be a polite ARIA live region announced on scroll-settle and on Waypoint arrival; "the core 'moving through time' cue must not be visual-only." This is the a11y counterpart of the HUD (FR-20) and is central to the product thesis for non-visual users. No AD/convention carries it.

**F5 — [MED] Additional WCAG 2.2 criteria dropped: 2.5.8 target size, 1.4.10 reflow-at-400%, forced-colors / prefers-contrast.**
`§10 "Additional 2.2 criteria"`. Reflow-at-400% is non-trivial *specifically because* of the pinned-canvas + overlay layout (AD-2/AD-3/FR-10) — content must not require 2-D scroll — so it is architecturally load-bearing, not cosmetic. None represented.

**F6 — [MED] The CI gate surface has no accessibility verification.**
AD-13 / AD-15 and structural-seed `.github/workflows` enumerate perf-budget, gitleaks, boundary-lint, JSON-LD — but no axe/a11y/PEAT check. Given SM-C3 (accessibility-integrity counter-metric) and §6.1 treating a11y as a launch gate "not a floor," the enforcement asymmetry (perf is CI-gated, a11y is not even mentioned) undercuts the "checkable, not 'you can tell'" ethos the spine applies everywhere else.

**F7 — [MED] Duplicate-content canonicalization is under-carried.**
AD-11 names `canonical` per route but does not carry §10's intent: "root and per-era routes are differentiated (each per-era route foregrounds that era's deep content) with canonical rules so they don't self-compete in ranking." The tag is present; the differentiation strategy that makes SM-4 shareability + SEO work is not.

**F8 — [MED] Aesthetic restraint (§11) — "one defended idea," film-beat entrance/hold/exit, altitude-legibility-via-atmosphere, diegetic 3–5 s onboarding cue — is not represented.**
Partly UX-artifact territory, but the PRD makes restraint a *credibility* discipline (§1, §11, §15 top risk), and it has architectural teeth already present (AD-13 budget, AD-14 composable modules) plus one oblique hook (the 3–5 s cue is referenced only through the consent-sequencing convention). Recommend the spine cross-reference §11 / the UX artifact so this credibility-critical constraint is not lost in the PRD→UX→Epics handoff. FR-9's "no hard cut / atmosphere sells altitude" belongs here too.

**F9 — [LOW] FR-28 mid-session context-loss place-preservation nuance is dropped.**
`FR-28` requires the mid-session `webglcontextlost` fall-back to be **anchored to the visitor's current Era with the equivalent panel re-opened — not dumped to the top.** AD-9 reduces this to "`webglcontextlost` ⇒ the Static Timeline." The "don't lose their place" detail (a real UX guarantee) is gone.

**F10 — [LOW] FR-34 event taxonomy not carried.**
Conventions cover privacy/DNT/GPC/consent-sequencing but not the required event set — most importantly the **scroll-traversal-depth vs. jump-arrival distinction** that SM-2 is defined around. Likely Epics-level, but that one distinction is an instrumentation invariant, not a story detail.

**F11 — [LOW] Postprocessing "DOM legibility must never depend on postprocessing" is only implicit.**
`§10` / addendum `§L`. Subsumed by AD-2 (DOM independent of WebGL) and the `spectacle/post/` seed note, but not stated as a rule.

---

## 9. What the spine got right (so remediation stays surgical)

- addendum §L runtime patterns: fully carried (AD-3/4/5/6/7/9/13/14) — the hardest-won research, intact.
- No material contradiction with any settled PRD/addendum decision; the one PRD-flagged tension (mount-vs-dispose) is cleanly resolved.
- §16 non-disposable foundations → all ADOPTED ADs.
- Source-as-Exhibit (FR-29–32, 35): strongly gated, including gitleaks history-clean publish gate and CI-guarded easter egg.
- SEO/JSON-LD/OG, perf-budget CI, KG-as-producer, text-not-in-WebGL, anti-harvest email, consent-off-the-onboarding-cue: all present and faithful.

## 10. Recommended minimal remediation (do not rewrite the spine)

1. **Add one AD — "Accessibility contract (full-motion + fallback)"**, ADOPTED, binding FR-27 and the §10 a11y cluster, capturing: flash-safety/PEAT hard gate (even in full-motion) [F1]; canvas semantics + keyboard model / era-as-focusable-button / never-raycast-only / skip-link / heading hierarchy / panel focus management [F2]; dual-backdrop focus ring + worst-case persistent-UI text contrast [F3]; SR live-region Era/year announcements [F4]; target-size / reflow-at-400% / forced-colors [F5]. Add it to the Capability→Architecture map row 4.7 and note the CTL text lives in `truth/`.
2. **Add an a11y gate to CI** (axe/pa11y on the SSR'd routes + Static Timeline; PEAT as a documented manual launch-checklist item) alongside the existing perf/gitleaks/JSON-LD gates [F6]. Add `a11y` to the `.github/workflows/` seed line.
3. **Tighten AD-11** with the root-vs-per-era differentiation/canonicalization rule [F7], and restore the FR-28 "anchor to current Era, re-open panel" nuance in AD-9 or the new AD [F9].
4. **Cross-reference §11 / the UX artifact** from the spine (a one-line pointer in the paradigm or Conventions) so the "one defended idea / restraint," film-beat, and altitude-via-atmosphere constraints are explicitly owned somewhere downstream [F8].
5. Optional: note the CWV p75 gate and the FR-34 scroll-vs-jump event distinction as measurement/instrumentation invariants [F10], and state the postprocessing-legibility rule explicitly [F11].
