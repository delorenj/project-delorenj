# Adversarial Review — Career Ascent PRD

*Role: cynical adversarial reviewer. Mandate: attack the PRD for internal contradictions, untestable requirements, over-ambition for a solo builder, claims it can't cash, and downstream-blocking gaps. Scope excludes items already tracked in §8 (career dates, MVP era set, physics-in-MVP, success-metric numbers, audio, WebGPU). Every finding cites a specific section/quote.*

**Gate verdict: needs-work.** The prose layer is excellent and the research grounding is real. But the core navigation model has a mathematical contradiction with the real career data, the MVP scope contradicts itself on altitude bands and on build order, and the marquee "third layer" (Source-as-Exhibit) rests on an unfalsifiable claim. These are not polish items — they will each stall the UX/Architecture/Epics phases the PRD explicitly feeds (§0).

---

## CRITICAL / HIGH

### H1. "Scroll distance IS time" is mathematically incompatible with a real (overlapping) career. — §1, FR-1, FR-5, addendum §C vs §H

The entire premise: *"Scroll distance is time... a longer chapter physically occupies more of the world"* (§1). FR-1 makes it a single-valued, monotonic function: *"scroll position deterministically maps to a current year"*, *"The mapping is monotonic."* Addendum §C implements it as a pure linear function `yearToWorldY(year) = (year - 2004) * 35` — one year → exactly one world position.

But the actual career (addendum §H) has **heavily overlapping** eras:
- BAE **2004–2010** overlaps Web/Agency **2009–2012** (2009–2010)
- Warby **2013** sits inside ClassPass/SagePoint **2013–2016**
- ClassPass **2013–2016** overlaps Splash **2014–2018** (2014–2016)
- Justworks **2018–2024** overlaps ACD/IntelliForia **2023–present** (2023–2024)

A year→distance bijection cannot place two eras that share the year 2013 (Warby and ClassPass) at two different scroll positions — they collide at the same world Y. FR-6's testable consequence *"Scenes appear in non-decreasing altitude order with increasing year"* is directly violated: at 2009–2010 the world must show both `ground` (BAE) and `low-atmosphere` (Web/Agency). The PRD never states how concurrent roles map onto a single monotonic altitude axis. This is the first thing the Architecture phase will hit and it has no answer in the doc. Either the mapping is not a pure function of year (contradicting FR-1), or eras cannot overlap (contradicting the real résumé), or "distance = time" is abandoned for concurrent roles (contradicting §1). **Pick one, and specify it in the PRD, before UX/Architecture.**

### H2. §6.1 says "three altitude bands" but the four MVP waypoints span four. — §6.1 vs FR-6, Glossary

§6.1: *"Three working Altitude Bands (ground / clouds / space) with at least four Waypoints rendered end-to-end: BAE, Warby, Justworks, AI."* Map those four against their canonical band assignments (FR-6, addendum §H):
- BAE → `ground`
- Warby → `clouds`
- **Justworks → `stratosphere`**
- AI (ACD/IntelliForia) → `orbit`

That is **four distinct bands** (ground, clouds, stratosphere, orbit), not three. Justworks' `stratosphere` band appears in neither the MVP band list nor the label "space." Additionally, **"space" is not a defined Altitude Band** — the Glossary enumerates exactly six: `ground, low-atmosphere, clouds, stratosphere, orbit, deep-space`. §3 states *"Downstream workflows and readers must use these terms exactly. No synonyms."* §6.1 both under-counts the bands and invents an off-glossary term for the MVP's climax band. Downstream cannot build "3 bands" and "4 waypoints in their canonical bands" simultaneously.

### H3. Three mutually contradictory build-orders; §6's "Aligned to Phase 1" claim is false. — §6 header, §16, §15, addendum §J

The PRD asserts three different sequencing stories:
- **§16 (Ways of Working):** the walking skeleton is *"scroll → year → camera → one real scene → one real panel"* — **spectacle-first**, no truth layer, no a11y, no SSR.
- **§15 + research digest:** *"sequence the truth layer first (it doubles as SEO/noscript/reduced-motion/fallback)"* — **truth-layer-first**.
- **Addendum §J:** Phase 1 = *"Static data + cinematic prototype"* (canvas, scroll-to-year, waypoint tween); the static fallback, reduced-motion, mobile, and keyboard nav are **Phase 5 — last**.

These cannot all be the plan. Worse, §6's header claims *"Aligned to 'prove the magic first' (build Phase 1 in addendum.md)"* — but §6.1 MVP scope includes the *"Accessibility floor... treated as MVP, not deferred"* (FR-25/27/28) and *"SEO baseline: server-rendered content... Person structured data"*, **none of which are in addendum Phase 1** (they are Phases 4–5). So the MVP is claimed to equal addendum Phase 1 while actually spanning Phases 1–5. Epics sequencing built off this will be incoherent: the same deliverable (Static Timeline / SSR) is simultaneously "MVP, not deferred" (§6.1) and "Phase 5, last" (addendum §J). Reconcile the phase map with the MVP scope, and pick one first-slice story.

### H4. FR-5's testable proportionality contradicts the §15 scroll-length cap. — FR-5 vs §15 vs addendum §C

FR-5 consequence (labeled testable): *"Given two Eras, the one with the larger year span has the larger scroll span (per the mapping constants)."* Addendum §C implements strict linearity (no cap). But §15's scroll-fatigue mitigation says *"cap the longest-tenure scroll length"* and Q on scale asks for *"a cap on the longest tenure."* A cap breaks the FR-5 acceptance test: cap Justworks (2018–2024, 6y) and it may no longer exceed a similarly-long BAE (2004–2010, ~6y) or, worse, a capped long era falls below an uncapped shorter one. The PRD mandates strict proportionality as a pass/fail gate *and* mandates a cap that would fail that gate, with no reconciliation. Downstream will not know whether to implement linear-uncapped (fails fatigue mitigation) or capped (fails FR-5).

### H5. Source-as-Exhibit's central proof is unfalsifiable; §4.8 consequences are not testable. — §1, §4.8 (FR-30/31/32), UJ-5

The task asked directly whether this pillar is coherent/testable or aspirational fluff. It is largely the latter as written.

The thesis (§1): the repo *"proves he can direct AI to produce work that embodies his standards."* The problem: **an inspector cannot verify "AI-built to my standard" from the artifact.** Clean, layered, documented code is equally consistent with hand-written code, or with AI slop that a human heavily cleaned. UJ-5's climax — *"the realization that the code is disciplined and deliberately AI-aware — that the site is a working demonstration of directing AI"* — does not follow from the evidence available to the reader (source code). The load-bearing claim ("I directed AI to this bar") is exactly the part that leaves no inspectable trace. The pillar asks the skeptic to *conclude* something the artifact cannot *demonstrate*.

The FRs compound this with non-criteria masquerading as consequences:
- FR-30: *"consistent enough that the discipline is self-evident to a senior reader"* — "self-evident" is a subjective judgment, not a test.
- FR-31: *"At least one non-trivial easter egg is discoverable"* — "non-trivial" and "discoverable" are undefined; no pass/fail.
- FR-32: *"measurably eases a cold-start edit"* — asserts a measurement with no metric, instrument, or threshold.

If this is a co-equal third layer (it is repeatedly framed as such), it needs the same testable-consequence discipline the other features got. Right now SM-5 tries to backfill it with *"qualitative 'I looked at the code and…' reactions,"* which concedes the pillar has no objective acceptance criterion.

---

## MEDIUM

### M1. The year→distance mapping structurally excludes the Prologue and the Axioms finale. — addendum §C, FR-6, Glossary

`START_YEAR = 2004` (addendum §C). But FR-6 opens the world with the **Prologue** (Lockheed/Unisys/Stevens, "launchpad"), which is pre-2004 (internships/college). Under `yearToWorldY`, pre-2004 years produce **negative** world/scroll positions — the mapping cannot represent the era the experience is supposed to open on. At the other end, the deep-space **Axioms of AI** climax is a *framework*, not a time period — it has **no year** to map to. §1 makes it the emotional summit (*"finally reach... the Axioms of AI"*), yet the entire navigation model is year-indexed. How scroll reaches an atemporal finale beyond "present" is undefined. Both bookends of the journey fall outside the mapping's domain.

### M2. Career-span number is internally contradictory, and it's the north-star copy. — §1 vs §8 Q1

§1 repeatedly asserts *"twenty years of software history"* / *"a twenty-year career"* and bakes it into the **north star**: *"feeling twenty years of software history."* But §8 Q1 records the authoritative LinkedIn headline as *"Staff Engineer & Systems Architect, 25+ years,"* and START_YEAR 2004 → 2026 is 22 years (more with the pre-2004 Prologue). This is not the "exact dates" open question — it's two asserted, conflicting career-length claims, one of which is the product's headline metric and will drive HUD/copy. The spectacle currently undersells the résumé by 5+ years. Pick the number.

### M3. Success metrics are defined with no in-scope mechanism to capture them. — §7 (SM-1–SM-4) vs §8 Q10, §6.1, FR-13

Every primary/secondary metric requires instrumentation: SM-2 *"share of engaged desktop visitors who reach the orbit/AI era"*, SM-3 *"résumé downloads + outbound clicks... per engaged session"*, SM-4 *"referral/social shares and direct-link revisits."* Yet analytics is unresolved (§8 Q10, *"is engagement instrumentation... in scope"*) and **absent from the §6.1 MVP scope list**. Worse, SM-1 (*"conversations attributable to the site"*) is essentially unattributable given FR-13's decision — *"contact affordance (email + LinkedIn — no form in v1)"* — there is no captured event tying a conversation back to the site. The PRD sets pass/fail launch metrics it has provided no way to measure. Either analytics enters MVP scope or these metrics are proxies at best.

### M4. The spectacle — the entire differentiator — never reaches the audience the research says matters most. — §1, research digest "Positioning" vs §6.2, §13, SM-2

The positioning (§1) leans on the research finding that recruiters are *"frequently on mobile or locked-down corporate machines"* and that *"shipping something janky on a recruiter's mid-tier phone actively destroys the signal."* The strategic response, though, is §6.2 *"Full mobile spectacle (FR-26 full)... Out of Scope for MVP — MVP mobile target is the simplified/static experience"* and §13 mobile = *"simplified/performant experience or Static Timeline."* So on the device the majority of the target audience uses, the MVP delivers the **Static Timeline** — i.e., functionally the same as the "conventional, template-style résumé site" §2.2 explicitly disavows. The flagship journey (UJ-1 Dana) is desktop-only and the north-star metric SM-2 is *"engaged **desktop** visitors."* The credibility-raising spectacle is scoped away from the segment whose credibility read the product exists to change. This is a coherence gap between the thesis and the scope, not just a nice-to-have.

### M5. §6.1's "accessibility floor" is narrower than the WCAG 2.2 AA launch gate committed in §10. — §6.1 vs §10

§16 says the plan is to *"ship MVP publicly"* — so MVP is the launch. §10 commits, as a launch NFR, **full WCAG 2.2 AA plus 2.3.3 AAA**, including flash-safety PEAT testing (2.3.1), focus-not-obscured (2.4.11), a focus ring legible on *both* bright-cloud and deep-space backdrops, and canvas semantics. §6.1's *"Accessibility floor"* lists only FR-25 (reduced-motion), FR-27 (keyboard), FR-28 (no-WebGL fallback). Flash safety, focus-not-obscured, and dual-backdrop focus indicators are not in the MVP scope list. Epics generated from §6.1 will under-scope the a11y that §10 declares a hard launch gate (flash safety is even called a *"hard gate... applies even in full-motion mode"*). Align §6.1's floor with §10's committed criteria.

### M6. FR-7 "release assets when far" directly conflicts with §10/addendum "stay mounted, pre-warm materials." — FR-7 vs §10, addendum §L

FR-7 requires unloading to bound memory: *"release them when far,"* consequence *"Memory does not grow unbounded."* But §10 mandates *"switch era scene-graphs by visibility, not mount/unmount"* and addendum §L: *"Switch era scene-graphs via the `visible` prop (stay mounted, pre-warm materials); never conditional mount/unmount."* "Pre-warm and keep mounted" and "release when far" are opposing strategies. With nine KTX2-textured scenes and a *"≤ 256–384MB mobile texture budget"* (§10), you cannot both keep everything mounted/pre-warmed **and** stay under budget. The PRD asserts both requirements without acknowledging the tradeoff (dispose GPU textures but retain scene-graph nodes is a possible reconciliation — but the PRD doesn't say that; it says opposite things). Architecture needs the PRD to state which invariant wins.

### M7. Demo-first ethos (§16) vs the "from day one" infrastructure §10 demands. — §16 vs §10

The task asked whether §10 contradicts §16. Partially, yes. §16: *"Disposable by default. Prototypes are spikes, not commitments... throw it away,"* *"no long infrastructure-only stretches with nothing to see,"* *"A vertical slice of the world beats a complete-but-invisible subsystem."* §10 requires, as launch gates built *"from day one"*: adaptive GPU tiering (*"build in from day one"*), a *"checked-in perf-budget JSON + CI gate,"* the SSR truth-layer island, single-RAF/single-scroll-authority plumbing, and PEAT flash testing. This is substantial invisible infrastructure that a throwaway spike cannot carry, and that must exist before the first honest public increment. The PRD never reconciles "disposable spikes with visible output each increment" against "these non-visible systems are mandatory from the start." At minimum §16 should acknowledge which §10 systems are exempt from disposability (they are the load-bearing skeleton, not spikes).

---

## LOW (discipline / hygiene — will bite if propagated to the Career Data Layer)

### L1. Glossary "no synonyms" rule is already violated. — Glossary §3 vs addendum §D, FR-6

§3: *"No synonyms elsewhere in the PRD."* Yet addendum §D types `cameraMode: "free-scroll" | "jumping" | "inspect"` with the comment *"maps to PRD 'Motion Mode'"* — but the Glossary Motion Mode value is **`waypoint-jump`**, not `jumping`. If the data-model type is authored as-is, the state machine's enum diverges from the canonical vocabulary. Separately, FR-6 line still reads *"Prologue (Lockheed/Unisys/**Drexel**, launchpad)"* although §8 Q1 (RESOLVED) and addendum §H both correct this to **Stevens Institute of Technology**. A known-corrected fact is left stale in the requirement that the Career Data Layer author will read.

### L2. Several "Consequences (testable)" are subjective, not testable. — FR-2, FR-4

FR-2: *"without mechanical snapping,"* *"no 1:1 rigid coupling that feels janky."* FR-4: camera pivot to *"evoke a rocket/ascent feel."* These live under headers explicitly labeled **"Consequences (testable)"** but are aesthetic judgments with no pass/fail. §16's "experience is the acceptance test" partly covers this, but as written they misrepresent themselves as objective acceptance criteria. Either move them to §11 Aesthetic or give them a measurable proxy (e.g., smoothing time-constant bounds, max tilt degrees — FR-4 already has "Tilt magnitude is bounded," so the "feel" clause is redundant fluff).

### L3. Public repo invites and measures clones, but there's no license and §5 says "Not an open-source product." — FR-29, UJ-5, SM-5 vs §5

UJ-5: the inspector *"clones or browses it."* SM-5 measures *"repository engagement (visits/stars/clones)."* FR-29 requires it *"public, buildable."* But §5 states *"Not an open-source product... not maintained as a reusable template."* A public GitHub repo with no license is "all rights reserved" by default — cloning/reuse is legally undefined, while the PRD explicitly invites and measures cloning. A one-line licensing decision (e.g., source-available/"look don't reuse" license, or an explicit README notice) closes the gap; right now the product invites an action it hasn't authorized.

---

## What holds up (so this isn't pure demolition)

- The research grounding is genuine and the §10 NFR budgets are traceable to `research-digest.md` line-by-line — this is not vibes.
- The Content Truth Layer / SSR-first / one-artifact-four-jobs design is coherent and the strongest part of the doc.
- The risk register (§15) is honest about the two things that actually sink this (solo over-scope, style-over-substance) and the mitigations are real.
- The FR-numbering + Glossary discipline is good *structure* — which is exactly why the violations above (H2 band term, L1 synonym, L2 false-testable) are worth fixing rather than shrugging off: the doc set a high bar for itself.

The through-line of the serious findings: **the vision prose committed to "distance = time" and "twenty years, ground to orbit" as absolutes, and the real career data (overlapping roles, pre-2004 Prologue, atemporal Axioms, 25+ years) does not fit those absolutes.** That mismatch surfaces as H1, H2, M1, and M2. Resolve the mapping model against the real data first; several other findings soften once that's settled.
