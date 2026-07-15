# Edge-Case Hunter Review — Career Ascent PRD

*Role: method-driven edge-case enumeration. Scope: failure/empty/first-visit/slow-network/context-loss states; accessibility edges beyond §10; SEO/deep-link edges; reduced-motion × Source-as-Exhibit interaction; analytics/consent gaps; security/privacy of the public repo. Items already tracked in §8 (career dates, MVP era set, physics-in-MVP, success-metric numbers, audio, WebGPU) are deliberately NOT re-flagged.*

*Verdict: **pass-with-concerns.** The PRD is unusually rigorous on the "hero" failure modes (context-lost→static, flash safety, GPU tiering). The gaps are at the seams — the state transitions between layers, the cold/slow/deep-linked entry paths, and the security posture of the very artifact the site is built to show off.*

---

## CRITICAL

### C1 — No secret-hygiene / no-secrets requirement for a deliberately-public repo (security)
**Where:** §4.8 FR-29 ("The repo is public, buildable, and documented…"), FR-32 (agent-context files committed), §13 (Cloudflare Workers + R2 + KV, OpenNext), §8 Q10 (analytics).
**Edge:** The entire Source-as-Exhibit thesis (§1, UJ-5) is that a *skeptic clones the repo and comes away more convinced*. That repo will contain deployment config, and the stack (OpenNext on Workers, R2 custom domain, KV cache, "lightweight analytics," Cloudflare-centric infra) implies API tokens / bucket bindings / analytics keys somewhere near the code. There is **no requirement** mandating secret hygiene: `.env` exclusion, no committed tokens, scrubbed commit history, a pre-publish secret scan. For a repo whose whole purpose is hostile inspection, a single leaked Cloudflare/analytics key found by "Alex the skeptical staff engineer" (UJ-5) inverts the exact signal the exhibit exists to send. This is the highest-consequence miss in the document.
**Fix:** Add an FR under §4.8: repo must pass an automated secret scan (e.g., gitleaks) in CI as a publish gate; all credentials via environment bindings, never committed; commit history verified clean before the repo is made public. Make "no secrets in the public repo" an explicit launch-checklist item alongside the §15 gates.

---

## HIGH

### H1 — Reduced-motion / no-WebGL users may lose access to the repo link and easter eggs (reduced-motion × Source-as-Exhibit)
**Where:** FR-29 ("A repository link is reachable from the persistent UI **and/or** an easter-egg path"); FR-31 (easter eggs "in the source **and/or** the experience"); FR-25 consequence ("The Static Timeline exposes every Era, Detail Panel, résumé, and link available in the World"); SM-C3 (a11y content parity).
**Edge:** FR-29's "and/or" permits an implementation where the repo link is surfaced *only* via an in-world easter-egg path. A Reduced-Motion / Static-Timeline / no-WebGL visitor (UJ-4, FR-28) never boots the world, so an experience-embedded easter egg or in-world-only repo link is unreachable — yet UJ-5 (open the source) and SM-5 (source inspection) are core to the product. FR-25 says the static timeline exposes "every … link available in the World," but it is silent on whether the repo link and easter eggs count, and FR-31 explicitly allows experience-only easter eggs that the static path cannot render. The credibility payoff of the third layer is therefore not guaranteed for the accessibility/fallback cohort.
**Fix:** State that the public-repo link is part of the persistent Content Truth Layer UI (not easter-egg-gated) and therefore present in the Static Timeline; and that at least one easter egg lives in the *source* (reachable by any inspector) so the Source-as-Exhibit payoff does not depend on booting WebGL.

### H2 — No loading / in-flight / failed-fetch state for a Scene Chunk on arrival (slow-network + failure)
**Where:** FR-7 (assets load "only when the camera is near"); FR-3 (waypoint jump "launch" to a Waypoint); FR-21 (deep-link "lands the visitor at the corresponding Waypoint"); §10 asset budgets; §13 (3D binaries fetched from R2).
**Edge:** FR-3/FR-21 can move the camera to an era faster than FR-7 can stream that era's assets over a slow or flaky connection (recruiter on mobile / locked-down corporate network — the stated target device profile, §1). Nothing specifies what the visitor sees when they *arrive at an era whose Scene Chunk has not finished loading, or whose R2 fetch failed*: no loading placeholder/poster requirement, no per-scene timeout, no per-scene failure fallback (e.g., drop to that era's static content). The only fetch-failure path documented is the whole-experience `webglcontextlost` → Static Timeline (§15), which is too coarse — one slow/failed era should not blank the world or strand the camera in empty space.
**Fix:** Add an FR: each Scene Chunk shows a bounded loading state on approach and a per-scene degraded fallback (billboard/low-LOD or the era's Detail Panel content) if assets are slow past a threshold or fail; a single scene's asset failure never blanks the canvas or blocks navigation to other eras.

### H3 — Success metrics depend on instrumentation the PRD never specifies, and a consent surface is unscoped (analytics/consent)
**Where:** §7 SM-1 through SM-5 (all outcome/engagement metrics); §8 Q10 (analytics in scope? — known-open); §10 Privacy ("any analytics is privacy-respecting and consent-appropriate"); §11 (diegetic first-cue in first 3–5s).
**Edge:** This is *not* the §8-Q10 open question ("is analytics in scope"). Even granting it is: SM-2 (share of engaged desktop visitors who reach orbit — requires scroll-depth/era events), SM-3 (résumé downloads + outbound clicks), SM-4 (shares/revisits), and SM-5 (repo engagement) are **unmeasurable** without defined instrumentation, and no FR defines what events are emitted or from which surface. Worse, "consent-appropriate" for EU recruiters may require a consent banner — which is itself (a) a UI surface that must be keyboard-accessible and motion-safe, (b) a surface that competes with the 3–5s diegetic onboarding cue (§11) for the first paint, and (c) a bias source (declined-consent sessions produce zero SM data, skewing SM-2's denominator). None of this interaction is addressed. Downstream Epics cannot build the metrics program, and UX cannot lay out first-paint, from what is written.
**Fix:** Add an analytics FR listing the concrete events backing SM-2–SM-5; specify DNT/GPC handling; and require that if a consent surface is needed it is accessible, reduced-motion-safe, and sequenced so it does not collide with the onboarding cue. Note the consent-bias caveat on SM-2.

### H4 — Deep-link cold-load motion behavior is unspecified and collides with the CWV gate (SEO/deep-link)
**Where:** FR-21 ("Visiting an Era URL directly positions the experience at that Waypoint … with its Detail Panel available"); FR-3 (waypoint jump = "launch": accelerate, arc, ease-in); §10 CWV gate (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms).
**Edge:** UJ-2's edge case shares a deep link to a *late* era (e.g., orbit/AI). On a cold load of `/journey/agentic-ai`, does the camera **start in place at that waypoint**, or perform the FR-3 "launch" animation from the START_YEAR ground (a multi-second flight, per the distance-scaled travel duration)? The PRD never says. If it flies from 2004, a shared deep link produces a long forced animation, a late LCP for the panel content, and likely CLS as the world settles — directly threatening the §10 launch gate — plus it must still respect reduced-motion (instant anchor). "Positions the experience at that Waypoint" is ambiguous between *instant placement* and *animated arrival*.
**Fix:** Specify that a deep-link cold load places the camera *at* the target waypoint with the panel open (no from-ground launch), reduced-motion path anchors instantly, and only *in-session* selections trigger the FR-3 launch tween.

---

## MEDIUM

### M1 — No social-preview (Open Graph / Twitter Card) requirement despite shareability being a metric (SEO/deep-link)
**Where:** SM-4 ("referral/social shares and direct-link revisits"); UJ-3 climax ("copies the link and shares it"); UJ-2 edge ("shareable to a co-founder"); §10 SEO (covers title/meta/canonical/JSON-LD only); FR-21 ("appropriate metadata").
**Edge:** Sharing is an explicit success metric and a journey climax, but there is no requirement for per-era Open Graph / Twitter Card metadata or share-preview images. A link pasted into Slack/LinkedIn/iMessage with no OG image and generic title materially depresses the click-through the whole share loop depends on — and a WebGL site produces no meaningful auto-preview. "Appropriate metadata" (FR-21) is too vague to guarantee this.
**Fix:** Add to §10 SEO: each indexable route ships SSR'd OG + Twitter Card tags and a per-era (or at least site-level) static preview image.

### M2 — Persistent-UI text contrast over a dynamic bright/dark background is unaddressed (a11y beyond §10)
**Where:** §10 a11y ("Focus indicator … legible on both bright-cloud and deep-space backdrops"); FR-20 (HUD), FR-19 (Timeline Rail), FR-11 (Detail Panels) all overlay the world.
**Edge:** §10 solves this problem *only for the focus ring*. The same luminance swing (bright clouds → deep space) that would kill a single-treatment focus ring also threatens the **text** of the HUD, Timeline Rail labels, and any panel/UI chrome rendered over the canvas — a WCAG 1.4.3 (contrast ≥ 4.5:1) risk that the PRD's own reasoning implies but never states for text. Persistent overlay text over a changing WebGL backdrop is a classic contrast-failure surface.
**Fix:** Require all persistent Content Truth Layer text over the canvas to maintain ≥ 4.5:1 against the worst-case backdrop across the full ascent (e.g., scrim/plate behind UI, or luminance-adaptive treatment), verified at the brightest and darkest bands.

### M3 — No screen-reader announcement of era/year changes during scroll or jump (a11y beyond §10)
**Where:** FR-20 (HUD "communicates current year and/or altitude" — visually); FR-1 (year changes continuously with scroll); FR-27 (keyboard/focus, but not live announcements); §10 a11y (canvas semantics + focus, no live-region requirement).
**Edge:** The core sensation — "you are moving through time/altitude" — is conveyed by the visual HUD and the moving world. A screen-reader user scrolling or triggering a waypoint jump gets focus management (FR-27) but **no programmatic signal that the current era/year changed**. The HUD is not required to be exposed to AT, and no ARIA live region announces era transitions. The blind/low-vision visitor loses the product's central orientation cue.
**Fix:** Require the current era/year to be exposed to assistive tech (HUD as a labeled live region, polite), announcing era changes on scroll settle and on waypoint arrival; ensure the static timeline conveys the same ordering semantics.

### M4 — Mid-session WebGL context loss does not preserve place / open-panel state (context-loss)
**Where:** §15 ("`webglcontextlost` → Static Timeline"); §10 adaptive quality ("context-lost ⇒ serve the Static Timeline"); FR-28 (fallback "without a broken screen"); FR-3 (arrival opens a Detail Panel).
**Edge:** Context loss is only reasoned about at *boot* / capability detection. If it fires **mid-journey** — visitor deep in the orbit era with a Detail Panel open — the requirements say "serve the Static Timeline" but never say the fallback preserves the visitor's *position and open-panel state*. Dumping the user to the top of the static timeline (losing their place and the panel they were reading) is a "broken" experience in spirit even if not a blank screen (iOS Safari tab-kill and thermal context-loss are called out as *likely*, §15). This is a real transition state, not a hypothetical.
**Fix:** Require that a mid-session fall-to-Static-Timeline anchors to the visitor's current era (and re-opens the equivalent Detail Panel where possible), not the top of the page.

### M5 — History-API entry semantics vs continuous scroll and waypoint jumps are undefined (deep-link / navigation)
**Where:** §10 SEO ("Real History-API per-era routes … a restorable scroll waypoint"); FR-21; FR-3 (waypoint jump); FR-1 (continuous scroll).
**Edge:** The PRD mandates real per-era URLs but never says *when a history entry is created*. If every era boundary crossed during continuous free-scroll pushes state, the browser Back button becomes unusable (dozens of entries per session). If waypoint jumps (UJ-1: Dana clicks the rail) push entries but scroll does not, Back behavior is inconsistent and surprising. Back-from-a-deep-linked-era destination is also unspecified. This blocks UX/Architecture from designing a coherent history model.
**Fix:** Specify the history model: e.g., `replaceState` on scroll (URL tracks position without stacking), `pushState` only on explicit waypoint selection; define Back behavior for deep-link entry.

### M6 — Duplicate-content risk between the root experience and per-era routes (SEO)
**Where:** §10 SEO (per-era routes each "unique SSR'd title/meta/canonical"); §12 (root Career World is the primary surface; per-era deep links); Resilience ("One … Static Timeline … the SEO body").
**Edge:** The full Static Timeline is the SEO body and appears to be served at the root AND mirrored across per-era routes. If `/` and every `/journey/<era>` render substantially the same static-timeline HTML, that is a duplicate-content pattern that dilutes ranking unless canonicalization is deliberate. The PRD asserts per-route unique canonicals but does not resolve how the root vs. per-era content differs enough to avoid near-duplication.
**Fix:** Specify the content differentiation / canonicalization strategy between the root and per-era routes (e.g., per-era route emphasizes that era's deep content; canonical rules prevent self-competition).

### M7 — No behavior for unknown / removed / renamed era routes on a site designed to "keep growing" (deep-link)
**Where:** FR-21 (era URLs "suitable for sharing and indexing"); §15 (solo maintenance / "the ascent metaphor implicitly promises the site keeps growing"); §16 (hard, fast pivots expected).
**Edge:** Externally-shared, indexed era URLs are permanent, but the content model is explicitly evolving (eras get re-authored, renamed, re-slugged during "hard, fast pivots"). There is no requirement for a 404 experience or a redirect strategy when a previously-shared `/journey/<era>` slug changes or an unknown slug is hit. A dead shared link (from a recruiter's notes weeks later) fails silently — undermining SM-1/SM-4.
**Fix:** Require a graceful 404 that drops into the Static Timeline (not a blank canvas), and a redirect/alias policy so previously-published era slugs remain resolvable after renames.

---

## LOW

### L1 — §6.1 uses "space" as an Altitude Band name that is not in the Glossary (consistency)
**Where:** §6.1 ("Three working Altitude Bands (ground / clouds / space)"); §3 Glossary defines exactly six bands: `ground, low-atmosphere, clouds, stratosphere, orbit, deep-space` and states "No synonyms elsewhere in the PRD."
**Edge:** "space" is a synonym not among the six defined bands, violating the Glossary's own no-synonyms rule. It also silently collapses the MVP's Justworks (`stratosphere`) and AI (`orbit`) waypoints — two distinct bands — into one "space" band, leaving the MVP band→waypoint mapping ambiguous for UX/Architecture.
**Fix:** Use defined band names in §6.1 and state which of the six bands the MVP realizes (e.g., ground / clouds / orbit) and how the four waypoints map to them.

### L2 — FR-31 easter eggs "documented internally" in a public repo spoil their own discovery (consistency / Source-as-Exhibit)
**Where:** FR-31 consequence ("documented internally so it isn't accidentally removed"); FR-29 (repo is public); UJ-5 ("trip over an easter egg planted in the source").
**Edge:** If the easter egg is documented *in the public repo* (the only "internal" location for a solo public project), the skeptic who is supposed to *discover* it (UJ-5 climax) instead reads about it, defeating the delight. Tension between "documented so it survives refactors" and "discoverable by surprise."
**Fix:** Clarify that discovery-dependent easter eggs are protected by a test/CI guard or an obfuscated marker rather than a plainly-worded public doc that spoils them.

### L3 — Raw contact email exposed to scrapers (privacy)
**Where:** FR-13 ("a lightweight contact affordance (email + LinkedIn — no form in v1)").
**Edge:** A plain `mailto:`/visible email on a high-traffic public site invites harvesting/spam. Minor, but trivially mitigated and worth stating given "no form."
**Fix:** Note an obfuscation/anti-harvest measure for the exposed email.

### L4 — Zoom/reflow, forced-colors, and touch-target sizing are unaddressed (a11y beyond §10)
**Where:** §10 a11y (covers 2.2.2, 2.3.1, 1.1.1, 2.4.x, focus) but not 1.4.10 Reflow, 1.4.12/forced-colors/`prefers-contrast`, or 2.5.8 Target Size (Minimum) — the latter two are WCAG 2.2 AA, which §10 explicitly commits to.
**Edge:** §10 commits to "WCAG 2.2 AA" but omits 2.5.8 (Target Size, new in 2.2 — relevant to the Timeline Rail and mobile controls) and reflow at 400% zoom for a pinned-canvas + overlay layout, plus forced-colors/high-contrast-mode behavior for the DOM layer. These are concrete AA obligations the stated commitment implies but the checklist misses.
**Fix:** Add 2.5.8 target-size, 1.4.10 reflow-at-400%, and forced-colors/`prefers-contrast` handling to the §10 a11y gate.

---

*Method note: findings are entry-path and state-transition oriented — the PRD's steady-state, single-happy-path failures are already well-covered by §10/§15; the residual risk is in cold/slow/deep-linked/context-lost entries, the layer-to-layer transitions, and the security of the exhibit artifact itself.*
