---
title: "Career Ascent — Jarad DeLorenzo Portfolio World"
status: draft
created: 2026-07-15
updated: 2026-07-15
---

<!-- STALE-BANNER v2026-07-18 -->
> ⚠️ **PARTIALLY STALE — 2026-07-18 pivot.** Product **pivoted 2026-07-18** to a spectacle-first, client-only R3F WebGL experience (NOT a findable/accessible website). Personas, era/world content, and cel direction still inform the build; but the 'credibility over spectacle' north star, the §10 accessibility launch gate, and §6/§16 SEO/SSR/truth-layer-first framing are **superseded**. New spine: `architecture-project-delorenj-2026-07-18`.


# PRD: Career Ascent — Jarad DeLorenzo Portfolio World
*Working title — confirm.*

## 0. Document Purpose

This PRD is for the builder (Jarad, solo) and any future collaborator, and it feeds the downstream BMAD workflows — UX (`bmad-ux`), Architecture (`bmad-architecture`), and Epics & Stories. It is derived from two Jul-11 inputs: `BRAINDUMP.md` (the original vision) and `ARCHITECTURE_DRAFT.md` (the technical sketch). It captures **what** the product is and must do; the **how** (framework choices, the year→distance math, the data-model types, the phased build order, and rejected stack alternatives) lives in the companion **`addendum.md`** in this same folder — the PRD references capabilities and points there rather than duplicating implementation. Vocabulary is anchored in §3 Glossary; features are grouped with globally-numbered Functional Requirements (FR-N) nested under them; inferences are tagged inline `[ASSUMPTION: ...]` and indexed in §9. `[NOTE FOR PM]` marks items flagged for a decision.

## 1. Vision

This is not a portfolio *page*. It is a **playable career world** — a single, continuous, scroll-driven experience where the visitor pilots *upward through time and altitude*. They begin on the ground amid radio hardware and green waveforms (the embedded-systems era, ~2004), climb through the browser-learns-to-move web-agency era, rise into the clouds where computer vision interprets reality, break into the stratosphere where architecture becomes visible at scale, and finally reach orbit and deep space — agentic AI systems and the Axioms of AI. Scroll distance *is* time: a longer chapter physically occupies more of the world, so the visitor **feels** the span of a quarter-century career rather than reading a list of it.

Two systems run together and are equally important. The **Spectacle Layer** is the cinematic 3D world — camera movement, parallax, era-specific set pieces, particles, atmosphere, floating cards, physics. The **Content Truth Layer** is the readable, linkable, indexable, accessible reality underneath — real HTML text, résumé, project detail, outbound links, and a reduced-motion static timeline. The spectacle is the hook; the truth is what a recruiter actually uses. Neither is sacrificed for the other.

Why it matters: the site must communicate, in the first thirty seconds and again at the summit, one thing — *this is not someone who merely worked at companies; this is someone who has lived through multiple eras of software, internalized the patterns, and carried them into the AI era.* The north star: **A recruiter scrolls upward from radio waves on Earth to agentic systems in orbit, feeling a quarter-century of software history not as a résumé, but as a playable ascent through the technologies, patterns, companies, and ideas that shaped Jarad into an AI-era systems architect.**

**Positioning principle (credibility over spectacle).** For this audience — recruiters, founders, hiring managers, senior/staff peers — the real tension is *credibility vs. spectacle*, not WebGL vs. content. Hiring managers are blunt: "if the most interesting technical thing in your portfolio is the portfolio website itself, you have a problem." The move that makes the spectacle *raise* credibility rather than lower it is that the ascent metaphor is **diegetic to this specific career** — radio waves → web → computer vision → distributed systems → agentic AI — so the spectacle *is* the résumé and *is* a live demonstration of the graphics-and-agentic-AI engineering being claimed. This imposes three disciplines the rest of the PRD enforces: (1) commit to the **one defended idea** (the vertical time+altitude ascent) and budget everything around restraint — no "shader zoo" where every scene competes as a hero and nothing breathes; (2) structure each era as a **film beat** (entrance → calm readable *hold* → exit) that links in seconds to a real deep-dive (architecture, decisions, tradeoffs, measurable impact) and, where possible, a live demo or repo; (3) ship a genuinely **co-equal, SSR'd truth layer** so an information-seeker gets the full story in under 30 seconds without ever booting WebGL. Shipping something janky on a recruiter's mid-tier phone actively *destroys* the signal the site exists to send.

**The source code is itself an exhibit (the third layer).** Beyond the spectacle and the truth layer, the **repository is a deliberate demonstration**. The site is AI-built — and that is the point, not a disclaimer. An inspector who opens the source finds code that adheres to Jarad's personal style and software-engineering discipline (layered, abstracted at the right seams, modular, documented) *and* is conspicuously **AI-aware**: skill showcases planted as **easter eggs** for anyone who chooses to inspect or challenge him, and **embedded guidance for other "team members"** (human or agent) that is passively helpful to whoever works in the code next. This closes the "why does an engineer have a game site" gap from the other direction: the codebase proves he can *direct AI to produce work that embodies his standards and his Axioms of AI* — the medium becomes the message. The repository is therefore public and inspection-worthy by design (see §4.8).

## 2. Target User

### 2.1 Jobs To Be Done

- **Assess fast (recruiter / hiring manager):** "In a couple minutes, tell me whether this person is senior, real, and worth a conversation." Needs skimmable truth *and* a memorable impression.
- **Judge depth (founder / hiring principal / staff+ interviewer):** "Show me the arc — did they actually operate at scale, and do they think in systems and patterns?" Wants to drill into architecture and AI work.
- **Be delighted and share (technical peer / community):** "This is the kind of craft I respect." Explores the spectacle, inspects artifacts, and shares the link.
- **Prove it under inspection (skeptic / challenger):** "Nice site — but is the *code* real, or is it AI slop?" Opens the repo to test the claim, and instead finds disciplined, well-architected, documented, AI-aware code with easter eggs and helpful embedded guidance — and comes away *more* convinced, not less.
- **For the builder (Jarad):** "A living artifact of my career and my Axioms of AI that is unmistakably *mine* — a spiritual successor to jaradd.com (2006) — that earns conversations and callbacks and is fun to keep evolving."
- **For everyone:** find the facts (roles, dates, tech, links, résumé) even if they skip the spectacle or can't run it.

### 2.2 Non-Users (v1)

- People wanting a conventional, template-style résumé site — this is deliberately a spectacle; the static fallback serves them but is not the point.
- Visitors on very low-end / unsupported devices get the **Static Timeline**, not the full world — they are served, not targeted.
- This is not a general portfolio-builder product for other people; it is Jarad's site. `[ASSUMPTION: not intended to be reused/templatized for others in v1.]`

### 2.3 Key User Journeys

*Named-persona narratives the product enables. FRs reference these by ID inline ("realizes UJ-2").*

- **UJ-1. Dana, a technical recruiter, skims from the ground and still feels the arc.** *(North-star journey.)*
  - **Persona + context:** Dana screens senior/staff engineering and AI candidates; she has ~2 minutes, a dozen tabs open, and a strong bias toward closing anything slow or confusing.
  - **Entry state:** unauthenticated, arrives via a shared link on desktop, cold.
  - **Path:** The world loads on the ground — radio hardware, waveforms. A one-line orientation cue tells her she can scroll or jump. She scrolls; the camera climbs through eras, each visibly themed to its time. She notices a persistent timeline rail and a "download résumé" affordance. She clicks the top era ("AI") on the rail.
  - **Climax:** The camera *launches* — accelerating past the earlier eras, through clouds, into orbit — and settles on the agentic-AI station. A detail panel opens with real, readable text and links. She gets it: *a quarter-century, ground to orbit, ending in AI.*
  - **Resolution:** She downloads the résumé, clicks through to GitHub, and flags Jarad for a callback. **Edge case:** if the world can't render (old GPU / WebGL off), she instead sees the Static Timeline with the same facts and links, and never notices anything was missing.

- **UJ-2. Marcus, a founder, drills into the architecture and AI eras for depth.**
  - **Persona + context:** hiring a founding/staff engineer; wants proof of scale and systems thinking, not vibes.
  - **Entry state:** unauthenticated desktop, motivated, willing to spend 5+ minutes.
  - **Path:** He jumps to the stratosphere (Justworks) waypoint, opens artifact cards (TimeEngine, Payment Center, distributed systems), follows the glowing relationship lines that connect a pattern here to an AI capability later, then ascends to the orbit/AI era and the Axioms of AI.
  - **Climax:** He sees the *through-line* rendered — SagePoint's skill taxonomy → RAG; BAE's signal discipline → architecture → orchestration — and realizes the career wasn't a random walk; it converged.
  - **Resolution:** He opens a project write-up (MDX) and a Medium essay in new tabs, then reaches the contact affordance. **Edge case:** deep-linking a specific era via URL lands him directly at that waypoint with the panel open, shareable to a co-founder.

- **UJ-3. Priya, a senior engineer, is delighted and shares it.**
  - **Persona + context:** peer who appreciates WebGL/interaction craft; found the link on social.
  - **Entry state:** desktop, curious, playful.
  - **Path:** She free-scrolls slowly to feel the parallax and the camera tilt, grabs and inspects floating artifacts, watches idle cards drift/orbit, and pivots the camera to look up/down like a rocket.
  - **Climax:** A moment of "how did they *do* that" — the physics, the era set pieces, the sense of altitude.
  - **Resolution:** She copies the link and shares it with the takeaway "best portfolio I've seen this year." **Edge case:** on a mid-range laptop the experience quietly drops to a lower fidelity tier rather than stuttering.

- **UJ-4. Sam, who has vestibular sensitivity, browses without motion sickness.**
  - **Persona + context:** Sam has `prefers-reduced-motion` set OS-wide; large parallax/camera moves make them ill.
  - **Entry state:** desktop or mobile, reduced-motion signaled by the OS.
  - **Path:** The site detects reduced-motion and presents an elegant **Static Timeline** — the same eras, artifacts, text, and links laid out as a navigable vertical timeline with no camera flight or parallax; motion is limited to gentle, opt-in transitions.
  - **Climax:** Sam reads the whole career comfortably and never has to fight the interface.
  - **Resolution:** Sam gets 100% of the *content* value with 0% of the motion cost. **Edge case:** a visible, discoverable toggle lets any visitor switch between World and Static Timeline regardless of OS setting.

- **UJ-5. Alex, a skeptical staff engineer, opens the source to call the bluff.**
  - **Persona + context:** Alex has seen a hundred flashy portfolios and assumes the impressive part is a template or AI slop; wants to know if the person behind it can actually engineer.
  - **Entry state:** on the site, mildly impressed, reflexively looking for the repo link.
  - **Path:** finds the (surfaced-by-design) link to the public source, clones or browses it, and starts reading — architecture, module boundaries, docs, commit hygiene. Along the way they trip over an easter egg planted in the source and notice the embedded "for whoever's editing this next" guidance.
  - **Climax:** the realization that the code is disciplined *and* deliberately AI-aware — that the site is a working demonstration of directing AI to build to a real engineer's standard.
  - **Resolution:** the skepticism flips to respect; Alex is now the strongest possible advocate. **Edge case:** even a hostile reader who dislikes the concept has to concede the engineering underneath is legitimate.

## 3. Glossary

*Downstream workflows and readers must use these terms exactly. No synonyms in FRs, UJs, or SMs. Prose sections (§1, §11) may use a brief descriptive shorthand (e.g. "the truth layer") once the canonical term has been introduced.*

- **Career World** — the single continuous rendered environment the visitor travels through; the whole experience, not a page or a set of sections.
- **Spectacle Layer** — the 3D/WebGL rendered visual world (camera, scenes, set pieces, particles, physics). One of the two co-equal layers.
- **Content Truth Layer** — the HTML/DOM layer carrying the real readable/linkable/indexable content (text, panels, résumé, links, static fallback). The other co-equal layer. Source of truth for facts.
- **Altitude Band** — a vertical zone of the world with a distinct visual identity: `ground`, `low-atmosphere`, `clouds`, `stratosphere`, `orbit`, `deep-space`. Altitude increases with time.
- **Era** — a named chapter of the career mapped to a year range and an Altitude Band (e.g., "BAE Systems — Signals & Systems, 2004–2010, ground").
- **Waypoint** — a navigable anchor in the Career World, one per Era (the Prologue is Era #0), that the visitor can jump the camera to.
- **Scene / Scene Chunk** — the renderable set piece for one Era (e.g., `RadioLabScene`), loaded/unloaded based on camera proximity.
- **Set Piece** — the themed environmental artifacts that decorate an Era's Scene (radios, oscilloscopes, browser windows, satellites, MCP docking ports, etc.).
- **Virtual Scroll** — the normalized scroll-driven state that maps scroll input to a Career Sequence position and a camera position, independent of literal document height.
- **Career Sequence** — the single monotonic narrative ordering of Eras (Prologue → … → Axioms) that the world is laid out along. The world axis is *sequence*, not raw calendar year; this is what lets overlapping/concurrent tenures coexist. A monotonic year *label* is derived from the current Era for display.
- **Primary Track** — the single dominant role occupying each Career Sequence span. Concurrent/overlapping roles are co-located as artifacts within the Primary Track Era's band rather than claiming their own span or altitude.
- **Sequence-to-Distance Mapping** — the rule that converts a Career Sequence position to vertical world distance and scroll span, sized roughly proportional to each Era's duration within a documented floor/ceiling. (Constants live in `addendum.md §C`.)
- **Motion Mode** — the current camera-control mode: `free-scroll` (visitor scrolls), `waypoint-jump` (nonlinear tween to a Waypoint), or `inspect` (focused on one artifact).
- **Career Data Layer** — the single structured source of truth for Eras, Waypoints, Tech Nodes, artifacts, and links that powers the world, the rail, detail panels, SEO fallback, and routes.
- **Tech Node** — a technology/pattern/tool datum (with year range, category, visual motif) that decorates the Scene of the Era it belongs to.
- **Relationship Line** — a rendered connection between related Career Data items expressing the career **through-line** (e.g., "this pattern here → that AI capability later").
- **Knowledge Graph** — the offline content-intelligence process that ingests source material (résumé/LinkedIn/GitHub/Medium/essays) and produces Career Data Layer content and Relationship Lines. Not the renderer.
- **Artifact** — an interactive object in a Scene (often a floating/physics card) that, when opened, reveals a Content Truth Layer panel.
- **Detail Panel** — a Content Truth Layer HTML overlay opened from an Artifact or Waypoint, containing readable text and links.
- **Timeline Rail** — the persistent Content Truth Layer navigation affordance listing Eras/years for jump-to navigation.
- **HUD** — the persistent on-screen indicator of current year and/or altitude and progress through the world.
- **Static Timeline** — the reduced-motion / no-WebGL fallback: the same content laid out as a navigable vertical timeline with no camera flight or parallax.
- **Reduced-Motion Mode** — the experience state entered when `prefers-reduced-motion` is set or the visitor toggles it; presents the Static Timeline and suppresses large motion.
- **Fidelity Tier** — the device-appropriate quality level on a single **0–3 scale** selected by GPU capability detection and live performance headroom: tier 3 = full effects, tier 2 = reduced, tier 1 = minimal, **tier 0 = the Static Timeline** (no WebGL). "Downgrade one tier" moves along this scale. (Reduced-Motion Mode is orthogonal — a motion preference, not a Fidelity Tier.)
- **Axioms of AI** — Jarad's authored framework (e.g., AI/HE Ratio, "agent as employee," requirements & acceptance criteria as forces); the deep-space climax content.
- **Source-as-Exhibit** — the principle that the site's public repository is itself a portfolio artifact: AI-built code that demonstrably meets Jarad's engineering standards and is AI-aware. The third layer alongside the Spectacle Layer and Content Truth Layer.
- **Easter Egg** — a deliberate, discoverable skill-showcase or delight planted in the source (or the experience) for those who inspect or challenge — not required to use the site, rewarding to find.
- **Embedded Team Guidance** — passively-helpful, agent- and human-oriented context authored into the repo (e.g., agent-context files, well-placed comments, module docs) that helps whoever edits the code next and demonstrates Jarad's AI-orchestration philosophy.
- **Inspector / Challenger** — the persona who reads the source to test whether the craft is real (UJ-5).

## 4. Features

*FRs are numbered globally so downstream artifacts keep stable references even if features are reorganized. Feature-specific NFRs appear under their feature; system-wide NFRs are in §10.*

### 4.1 Career World & Motion Engine
**Description:** The heart of the product — the machinery that turns scrolling into piloting through time. It maps Virtual Scroll to a Career Sequence position and a camera position via the Sequence-to-Distance Mapping, tracks the camera smoothly in `free-scroll`, performs cinematic nonlinear tweens in `waypoint-jump`, and tilts/pivots the camera to sell the sense of flight. Longer Eras occupy proportionally more distance (within a cap) so magnitude is *felt*. Realizes UJ-1, UJ-2, UJ-3.

**Functional Requirements:**

#### FR-1: Scroll-to-sequence mapping
The visitor can move continuously through the career by scrolling; scroll position deterministically maps to a position along a monotonic **Career Sequence** (narrative order of Eras), which in turn drives camera altitude and a derived year *label*. The axis is sequence-ordered, **not** a pure function of calendar year — this is what lets concurrent/overlapping roles coexist (see FR-5, FR-6, Glossary "Career Sequence").
**Consequences (testable):**
- The mapping is monotonic in sequence: scrolling one direction never moves the Career Sequence position backward, and the HUD year *label* (derived from the current Era) never decreases while scrolling up.
- At rest, the reported Era/label matches the scroll-derived Career Sequence position via the Sequence-to-Distance Mapping (`addendum.md §C`).
- Scroll state is decoupled from literal document height (Virtual Scroll), so the mapping is stable across viewport sizes.
- The Prologue (pre-2004) and the atemporal Axioms finale resolve to valid sequence positions (start pre-roll / top anchor) even though they have no ordinary year range.

#### FR-2: Free-scroll camera tracking
In `free-scroll` Motion Mode, the camera tracks a target derived from the current scroll position with smoothed follow (the "responsive, not mechanical" feel target lives in §11).
**Consequences (testable):**
- Camera position is a smoothed (damped) follow of the scroll-derived target with a smoothing time-constant within the bounds in `addendum.md §C` — not 1:1 rigid coupling.
- No dropped input: rapid scroll still resolves to the correct final Career Sequence position / Era.

#### FR-3: Waypoint jump (click-to-launch)
The visitor can select any Era (from the Timeline Rail or an in-world Waypoint) and the camera performs a nonlinear tween ("launch": accelerate, arc, ease-in) to that Waypoint's year/altitude, entering `waypoint-jump` Motion Mode for the duration. Realizes UJ-1, UJ-2.
**Consequences (testable):**
- Travel duration scales with distance between the current year and the target year (farther = longer, within a bounded range).
- The tween is interruptible: a new selection or manual scroll cleanly takes over without visual snapping.
- On arrival, Motion Mode returns to `free-scroll` and the target Waypoint's Detail Panel is available/opened.

#### FR-4: Camera orientation / flight feel
The camera pivots to look up/down (and tilt) during motion, driven by scroll velocity and direction (the rocket/ascent *feel* is described in §11).
**Consequences (testable):**
- Tilt magnitude never exceeds the maximum degrees defined in `addendum.md §C` and returns to neutral at rest.
- Tilt is fully suppressed in Reduced-Motion Mode.

#### FR-5: Proportional era distance (with cap)
A longer Era occupies proportionally more world distance and scroll span than a shorter one, **within a documented floor and ceiling** so the longest tenure doesn't become a tedious scroll (resolving the §15 scroll-fatigue mitigation). Concurrent/overlapping roles do not each claim their own span; the dominant role for a span sits on the **Primary Track** and co-located roles render as artifacts within that Era's band.
**Consequences (testable):**
- For two Eras both within the cap range, the one with the larger duration has the larger scroll span (per the constants in `addendum.md §C`).
- No Era's scroll span exceeds the documented ceiling or falls below the floor, regardless of duration.
- Overlapping year ranges never produce overlapping sequence spans (the Primary Track is single-valued at every sequence position).
- `[ASSUMPTION: target "feel" ≈ 3–5 wheel-notches per year within the cap, tunable — from BRAINDUMP.md.]`

**Feature-specific NFRs:** camera/scroll interaction must sustain the frame-budget target in §10; input latency must feel immediate (perceptible response < ~100 ms).

### 4.2 Era Scenes & Worldbuilding
**Description:** The visual identity of each chapter. Each Era has a Scene Chunk with themed Set Pieces and belongs to an Altitude Band; the bands transition atmospherically (parallax, fog/color grade, density) as the visitor ascends. Scenes load and unload by camera proximity so the whole universe is never rendered at once. Realizes UJ-1, UJ-2, UJ-3.

**Functional Requirements:**

#### FR-6: Altitude bands & era scenes
The world presents the defined Eras in **Career Sequence** order, each assigned exactly one Altitude Band (a Glossary value) and rendered by one **or more** Scene Chunks. Canonical set with explicit bands (dates/companies confirmed in the Career Data Layer, §8 Q1):
| # | Era | Altitude Band |
|---|-----|---------------|
| 0 | Prologue (Lockheed / Unisys / **Stevens Institute of Technology**, launchpad) | `ground` |
| 1 | BAE Systems (radio / signals) | `ground` |
| 2 | Web / Agency era (Noise, Firstborn) | `low-atmosphere` |
| 3 | Warby Parker (vision) | `clouds` |
| 4 | ClassPass / SagePoint (startup) | `clouds` |
| 5 | Splash (platform decomposition) | `clouds` |
| 6 | Justworks (architecture at scale) | `stratosphere` |
| 7 | ACD / IntelliForia (agentic AI) | `orbit` |
| 8 | Axioms of AI (finale) | `deep-space` |

**Consequences (testable):**
- Each Era in the Career Data Layer has exactly one Altitude Band (a Glossary value) and at least one Scene Chunk; an Era **may** comprise multiple Scene Chunks (a deliberate 1-Era→N-Scene relationship, e.g. the Web/Agency era).
- Bands are non-decreasing along the Career Sequence (equal is allowed; e.g. Prologue and BAE both `ground`; Warby/ClassPass/Splash all `clouds`).
**Out of Scope:** photorealism; every Era at full fidelity in MVP (see §6).

#### FR-7: Scene chunk lazy-loading
Scenes load their heavy assets (models, textures, particles) only when the camera is near, and free GPU resources for distant scenes, to bound memory and cost. **Precise invariant (reconciles with §10 "switch by visibility, don't remount"):** scene-graph *nodes* stay mounted (no material recompile hitch at transitions), but their **GPU textures/geometry are disposed and reloaded** outside a defined adjacent-era window.
**Consequences (testable):**
- Assets for a Scene outside the adjacent-era window are not fetched until within the proximity threshold, and their GPU textures/geometry are released when the camera leaves that window.
- Total resident GPU texture memory stays within the §10 mobile budget while traversing the full world (no cumulative growth across all Scenes).
- No era transition causes a material-recompile hitch (nodes were not unmounted).

#### FR-8: Themed set pieces & environmental artifacts
Each Scene is decorated with era-appropriate Set Pieces and Tech-Node-driven motifs (e.g., oscilloscopes & waveforms at BAE; browser windows & Flash/Rails motifs in the web era; face-landmark/calibration motifs at Warby; constellations/temporal-tree motifs at Justworks; MCP docking ports/retrieval beams in the AI orbit).
**Consequences (testable):**
- Set Pieces shown in an Era match that Era's Tech Nodes/artifacts in the Career Data Layer (no anachronisms — e.g., no MCP motif on the ground).

#### FR-9: Atmospheric band transitions
Moving between Altitude Bands produces a continuous atmospheric transition (parallax depth layers, fog/haze, color grade, star/particle density) rather than a hard cut.
**Consequences (testable):**
- No discontinuous "pop" between bands during `free-scroll`.
- Transition effects respect the active Fidelity Tier and Reduced-Motion Mode.

#### FR-33: Scene loading & failure states
Arriving at a Scene (by scroll or jump) never shows a blank or broken canvas: a bounded loading state covers in-flight assets, and a degraded per-scene fallback covers slow/failed fetches — because a waypoint jump (FR-3) or deep link (FR-21) can reach an Era faster than its R2 assets stream on a slow/flaky network.
**Consequences (testable):**
- On approach/arrival, a Scene shows a bounded loading placeholder until its assets resolve.
- Past a per-scene timeout or on fetch failure, the Scene degrades to a low-LOD/billboard stand-in or the Era's Detail Panel content — it never blanks the canvas or blocks navigation elsewhere.
- A single Scene's asset failure is isolated (does not cascade to the whole experience or trigger the coarse `webglcontextlost` → Static Timeline path).

### 4.3 Content Truth Layer
**Description:** The readable reality. A fixed canvas holds the Spectacle Layer; HTML/React content is pinned above it. Selecting an Artifact or Waypoint opens a Detail Panel with real text and links. The most important text is never trapped in WebGL — it stays HTML for reading, search, links, keyboard use, and SEO. Realizes UJ-1, UJ-2, UJ-4.

**Functional Requirements:**

#### FR-10: DOM overlay over fixed canvas
Content is rendered as an HTML/React overlay above a fixed Spectacle Layer canvas; the canvas does not scroll the DOM content out of reach.
**Consequences (testable):**
- All primary textual content exists in the DOM (present in server-rendered HTML / view-source), not only as WebGL textures.

#### FR-11: Artifact / waypoint detail panels
Opening an Artifact or Waypoint reveals a Detail Panel containing that item's readable summary, role, dates, technologies, and links; closing returns to the world.
**Consequences (testable):**
- Every Waypoint and interactive Artifact maps to a Detail Panel whose content comes from the Career Data Layer.
- Panels are keyboard-dismissable and focus-managed (see FR-27).

#### FR-12: Résumé access (MDX single-source)
The visitor can view and download a current résumé from anywhere in the experience. The résumé is authored once in **MDX** (single source, for flexible control and portability) and rendered as an accessible HTML page, with an exportable PDF derived from the same source.
**Consequences (testable):**
- A résumé affordance is reachable from the persistent UI (not buried in one Era).
- The HTML résumé and the downloadable PDF derive from the same MDX source (no divergent copies).
- The HTML résumé is crawlable/indexable and readable without the Spectacle Layer.

#### FR-13: Outbound, contact & project links
Detail Panels and persistent UI expose outbound links that open correctly: **LinkedIn** (`linkedin.com/in/delorenj`, the authoritative career source), **GitHub**, **Medium**, the public **source repository** (the "inspect/challenge me" hook — see §4.8), company/project write-ups, and a lightweight **contact** affordance (email + LinkedIn — no form in v1). The repository link is **persistent Content Truth Layer UI** (not easter-egg-gated), so it is present in the Static Timeline too (FR-25) and the UJ-5 payoff never requires WebGL.
**Consequences (testable):**
- Links resolve to the correct destinations and open in an appropriate target.
- Contact and the repository link are each reachable within one action from the persistent UI, in both the World and the Static Timeline.
- The exposed email uses an anti-harvest measure (obfuscation / not a raw plaintext `mailto` in markup).

#### FR-14: Content authored outside WebGL
Long-form content (project write-ups, essays, Era summaries) is authored as HTML/MDX in the Content Truth Layer, linkable and indexable.
**Consequences (testable):**
- Project/essay content is reachable via its own URL and readable without the Spectacle Layer running.

### 4.4 Career Data Model & Knowledge Graph
**Description:** One structured Career Data Layer is the single source of truth feeding the world, the rail, the panels, the routes, and the SEO fallback. Tech Nodes decorate Scenes by era. Relationship Lines render the career through-line ("why this matters later"). An offline Knowledge Graph process can later generate/enrich this data from source material. Realizes UJ-2 (through-line), and underpins all other features.

**Functional Requirements:**

#### FR-15: Structured career data as single source of truth
All Eras, Waypoints, Tech Nodes, artifacts, dates, summaries, and links are defined in one structured Career Data Layer consumed by every surface.
**Consequences (testable):**
- Adding/editing an Era in the data updates the world, the Timeline Rail, its Detail Panel, its route, and the Static Timeline without per-surface duplication.
- No career fact is hardcoded into Scene logic in a way that diverges from the data.

#### FR-16: Tech nodes decorate scenes by era
Tech Nodes carry a year range and visual motif and appear in the Scene(s) of the era(s) they belong to.
**Consequences (testable):**
- A Tech Node only appears in Scenes whose Era overlaps the node's year range.

#### FR-17: Relationship lines (career through-line)
The data expresses relationships between items across eras, and the experience can surface them as Relationship Lines and/or "why this matters later" notes in Detail Panels.
**Consequences (testable):**
- At least the core through-line chains from the source docs are represented (e.g., BAE→signals→architecture→patterns→AI orchestration; SagePoint→taxonomy→RAG).
- Opening a related item can reveal its forward/backward connections.
**Notes:** `[NOTE FOR PM] Visual Relationship Lines are high-delight but complex; may ship as data + panel notes first, visual lines later. Confirm MVP inclusion in §6.`

#### FR-18: Knowledge graph as creative authoring aid *(post-MVP, tool-agnostic)*
An offline, **tool-agnostic** knowledge graph connects time periods and ideas to what Jarad was doing at the time, used primarily to **aid the creative authoring** of Career Data Layer content and Relationship Lines — surfacing connections a linear résumé would miss. No specific graph product is mandated; it is a means to richer, well-connected content, not a shipped feature.
**Consequences (testable):**
- Its output conforms to the Career Data Layer schema (it is a data/insight producer, not the renderer).
- It measurably surfaces cross-era connections used in authored content (e.g., through-line chains that end up as Relationship Lines / "why this matters later" notes).
**Out of Scope:** any specific vendor/tool lock-in; the graph as a live, on-page rendered visualization (it is a content-intelligence/authoring aid, not the portfolio renderer). MVP content is hand-authored.

### 4.5 Navigation & Wayfinding
**Description:** So visitors never feel lost in a big world: a persistent Timeline Rail to jump between eras, a HUD showing year/altitude/progress, and shareable per-era routes. Realizes UJ-1, UJ-2.

**Functional Requirements:**

#### FR-19: Timeline rail (jump-to-era)
A persistent Timeline Rail lists Eras/years; selecting one triggers a Waypoint jump (FR-3).
**Consequences (testable):**
- The rail reflects the Career Data Layer order and highlights the current Era as the visitor moves.

#### FR-20: Year / altitude HUD
A persistent HUD communicates current year and/or altitude and overall progress through the world.
**Consequences (testable):**
- HUD year stays consistent with FR-1 mapping during scroll and after a jump.

#### FR-21: Deep links / shareable era routes
Each Era (and key project/essay) has a real URL that lands the visitor at the corresponding Waypoint/content, suitable for sharing and indexing, with well-defined cold-load, history, and not-found behavior.
**Consequences (testable):**
- **Cold-load placement:** a deep link to a late Era **places** the camera at that Waypoint with its Detail Panel open — it does **not** play the FR-3 from-ground launch (which would delay LCP and risk CLS). In Reduced-Motion Mode it anchors instantly. Only **in-session** selections trigger the FR-3 launch tween.
- **History semantics:** `replaceState` tracks position during scroll (URL follows without stacking); `pushState` only on explicit Waypoint selection; Back after a deep-link entry is defined (returns to referrer / the top anchor, never a broken state).
- **Not-found / renamed:** an unknown or renamed Era slug returns a graceful 404 that drops into the Static Timeline (never a blank canvas); previously-published slugs stay resolvable via a redirect/alias policy (the site is expected to evolve via hard pivots, §16).
- Era URLs are crawlable and carry per-route metadata (title/meta/canonical/JSON-LD **and** OG/Twitter cards + preview image — §10 SEO); root vs per-era content is differentiated/canonicalized to avoid self-competition.

### 4.6 Physics & Artifact Interaction
**Description:** The tactile delight layer: cards and small objects behave as physics bodies — drifting/orbiting when idle, grabbable and inspectable on demand. Realizes UJ-3.

**Functional Requirements:**

#### FR-22: Floating cards as physics objects
Story/artifact cards behave as soft-physics bodies that drift or orbit gently when idle.
**Consequences (testable):**
- Idle motion is bounded (objects don't drift off-scene or jitter) and pauses under Reduced-Motion Mode / low Fidelity Tier.

#### FR-23: Inspect / grab artifacts
The visitor can grab, move, or focus ("inspect") select Artifacts; inspecting can open the corresponding Detail Panel.
**Consequences (testable):**
- An inspected Artifact enters `inspect` Motion Mode and returns cleanly to the world on release/close.

#### FR-24: Orbiting objects & soft collisions
Satellites/debris/stations orbit or collide softly to reinforce the sense of a living world.
**Consequences (testable):**
- Physics object count per Scene never exceeds the per-tier cap defined in `addendum.md §C`/`§K`, protecting the frame budget (§10).
**Notes:** `[NOTE FOR PM] Physics is Phase-3 in the build plan; likely post-MVP. Confirm in §6.`

### 4.7 Accessibility & Fallback Experiences
**Description:** The product is usable and truthful for everyone, on any device, motion-sensitive or not. This is a first-class feature, not an afterthought — the Content Truth Layer makes it possible. Realizes UJ-4 and protects UJ-1 on constrained devices.

**Functional Requirements:**

#### FR-25: Reduced-motion static timeline
When `prefers-reduced-motion` is set (or the visitor toggles it), the experience presents the Static Timeline with the same content and no camera flight/parallax.
**Consequences (testable):**
- With reduced-motion signaled, no large camera moves, parallax, or physics drift occur on load.
- The Static Timeline exposes every Era, Detail Panel, résumé, and link available in the World.

#### FR-26: Mobile simplified mode
On mobile / touch, the experience adapts to a simplified, performant version (reduced effects, touch-appropriate navigation) while preserving all content.
**Consequences (testable):**
- On a representative mid-range mobile device the experience holds the mobile frame-budget target (§10) or drops to Static Timeline rather than stuttering.
- All content and links remain reachable on mobile.

#### FR-27: Keyboard navigation & focus management
The full content experience is operable by keyboard: move between Eras, open/close panels, reach all links, with visible focus and no traps.
**Consequences (testable):**
- Every interactive Content Truth Layer element is reachable and operable by keyboard with a visible focus indicator.
- Opening a Detail Panel moves focus into it; closing restores focus to the trigger; no keyboard trap in the canvas.

#### FR-28: Capability fallback (no-WebGL / low-power / context loss)
If WebGL is unavailable/blocked, the device is low-power, or the WebGL context is lost mid-session (an iOS-Safari-likely event, §15), the experience falls back to the Static Timeline automatically, without a broken screen and without losing the visitor's place.
**Consequences (testable):**
- With WebGL disabled at load, the visitor gets the Static Timeline (not a blank canvas or error).
- Fidelity Tier (0–3, per Glossary) selection is automatic with a manual override available.
- A **mid-session** context loss falls to the Static Timeline **anchored to the visitor's current Era** and re-opens the equivalent Detail Panel where possible — it does not dump them to the top.

### 4.8 Source-as-Exhibit (Inspectable Craft & AI-Awareness)
**Description:** The repository is a first-class exhibit, not backstage plumbing. The code is AI-built *on purpose* and holds up to inspection: it embodies Jarad's engineering discipline and is conspicuously AI-aware — planted easter eggs for those who inspect or challenge, and embedded guidance that helps the next "team member" (human or agent). Realizes UJ-5, deepens UJ-3, and makes the §1 positioning literal. This is a **product** concern (what must be true of the artifact), while *how* Jarad works day-to-day is §16.

**Functional Requirements:**

#### FR-29: Public, inspection-worthy repository
The site's source is public and its link is discoverable from the experience for anyone who wants to inspect or challenge.
**Consequences (testable):**
- A repository link is reachable from the persistent UI and/or an easter-egg path.
- The repo is public, buildable, and documented enough that a stranger can understand its structure. `[ASSUMPTION: public GitHub repo; confirm.]`
**Out of Scope:** open-sourcing for *reuse* as a template (see §5) — public for inspection, not a product.

#### FR-30: Code embodies documented engineering standards
The codebase adheres to Jarad's personal style and software-engineering best practices — layered, abstracted at the right seams, modular, documented — made **checkable**, not left to "you can tell."
**Consequences (testable):**
- A `CONVENTIONS.md` (module boundaries, naming, abstraction seams, doc expectations) exists in the repo.
- CI enforces the enforceable parts (lint/format, import-boundary/module-graph rules, doc-presence checks) and is green on `main`.
- A published **build case study** documents the AI-direction process (how the code was produced to standard) — this, not the clean code alone, is the falsifiable evidence for the "directed AI to my standard" claim in §1/UJ-5.

#### FR-31: Easter eggs (discoverable skill showcases)
The source (and the experience) contain deliberate, discoverable easter eggs that showcase skill for those who choose to look — **at least one lives in the source itself** so the payoff doesn't require WebGL.
**Consequences (testable):**
- At least one non-trivial source-resident easter egg exists and is protected from accidental removal by a CI guard / test (not a plainly-worded public doc that would spoil the discovery).
- Easter eggs never degrade the core experience, the §10 performance budgets, or accessibility.

#### FR-32: Embedded team-member guidance (agent- & human-aware)
The repo carries passively-helpful, AI-aware guidance for whoever edits it next (agent-context file, purposeful comments, module docs) that demonstrates Jarad's AI-orchestration philosophy.
**Consequences (testable):**
- An agent-context file (e.g. `AGENTS.md`/`CLAUDE.md`) and per-module docs exist and are accurate to the code.
- Cold-start test: a defined "make change X" task is locatable from the docs alone by a fresh agent/human within a stated bar (e.g. no source-wide search needed to find the right module).
**Notes:** `[NOTE FOR PM] This is where the Axioms of AI stop being décor and become demonstrated practice — the deep-space content (§4.2) and the repo should rhyme.`

#### FR-35: Repository integrity & secret hygiene
The deliberately-public repo (which actively invites hostile inspection, UJ-5) never leaks a secret — one found key would invert the entire credibility signal.
**Consequences (testable):**
- CI runs an automated secret scan (e.g. gitleaks) as a **publish gate**; a hit blocks going/staying public.
- No credentials are committed — all secrets via environment/Cloudflare bindings; `.env*` git-ignored; commit **history** verified clean before the repo is made public.
- "No secrets in public repo" is on the launch checklist.

**Licensing:** `[ASSUMPTION: since UJ-5/SM-5 invite cloning/inspection but §5 says "not an OSS product", the repo ships a source-available "look, don't reuse" license (or an explicit README notice) so the invited inspection is legally unambiguous. Confirm license choice.]`

### 4.9 Instrumentation & Consent
**Description:** The success metrics (§7) are unmeasurable without event capture, and a public site with EU visitors needs a consent posture — but the consent surface must not fight the first-paint experience. This makes the measurement mechanism explicit. Underpins SM-2–SM-5.

**Functional Requirements:**

#### FR-34: Privacy-respecting analytics & consent
The site captures the minimal events behind its metrics using privacy-respecting analytics, honoring user privacy signals, without a consent surface that collides with the onboarding cue.
**Consequences (testable):**
- The concrete events backing SM-2–SM-5 are captured: scroll-traversal depth vs. jump arrival (distinguished), which Eras are reached, résumé download, outbound/repo-link clicks, and shares/direct-link revisits.
- Analytics honors Do-Not-Track / Global Privacy Control; data is privacy-respecting (no invasive fingerprinting).
- Any required consent UI is keyboard-accessible, reduced-motion-safe, and sequenced **not** to collide with the 3–5s diegetic onboarding cue (§11); declined consent is handled gracefully (and its effect on SM-2 sampling is noted, not hidden).
- SM-1 (attributable conversations) is treated as a non-instrumented **proxy**, not a gated launch metric (§7).

## 5. Non-Goals (Explicit)

- **Not a game.** Game-loop *feel*, yes; win/lose/score/levels, no.
- **Not built on a game engine or 2D-only renderer.** The camera-pivot/orbital-depth concept needs real 3D with a first-class HTML content layer; pure-2D or game-engine framings are rejected (rationale in `addendum.md`).
- **Not text-trapped-in-WebGL.** Primary content stays in the DOM for readability, SEO, and accessibility.
- **Not a bleeding-edge-baseline build.** No reliance on features not broadly supported; enhanced modes are progressive, not required. `[ASSUMPTION: WebGL2-first, optional WebGPU enhancement only — from ARCHITECTURE_DRAFT.md.]`
- **Not a CMS / blog platform.** Essays live on Medium (linked) or as MDX; the site does not become a general publishing tool.
- **Not a reusable portfolio-builder product** for others in v1.
- **Not an on-page live knowledge-graph visualization.** The Knowledge Graph is an offline content/authoring aid.
- **Not an open-source product.** The repo is public *for inspection* (§4.8), not maintained as a reusable template or supported OSS project.

## 6. MVP Scope

*Sequencing note: the MVP is **truth-layer-first**, not spectacle-first. Build the SSR'd Content Truth Layer + Static Timeline (which doubles as SEO/noscript/reduced-motion/fallback) and the non-disposable foundations (single canvas, single scroll authority, perf-budget CI, Fidelity-Tier detection) first, then layer the WebGL ascent over it as progressive enhancement (see §16 walking skeleton). This **supersedes** the linear phase order sketched in `addendum.md §J`, which put fallback/a11y last — a11y and SSR are MVP here, not Phase 5.*

### 6.1 In Scope (MVP)

`[NOTE FOR PM] Fidelity-tier strategy (research-recommended, confirm §8 Q12): rather than four equal waypoints, reserve full-realized 3D for the two signature bookends — the `ground` radio-waves era (Era #1, BAE) and the `orbit` agentic-AI era culminating in the `deep-space` Axioms finale (Eras #7–8) — and give the transitional eras (Warby, Justworks, etc.) lighter kinetic-type/particle/wireframe treatments. This protects the premium impression on a solo timeline and avoids uneven fidelity. The MVP waypoint list below is the current proposal pending that decision.]`

- Career Data Layer as a hand-authored structured file (FR-15) covering all Eras with summaries, dates, tech, links.
- Career World & Motion Engine core: scroll-to-sequence (FR-1), free-scroll tracking (FR-2), waypoint jump (FR-3), basic camera tilt (FR-4), proportional distance with cap (FR-5).
- **Four Altitude Bands** — `ground`, `clouds`, `stratosphere`, `orbit` (Glossary values) — with four Waypoints rendered end-to-end: **BAE (Era #1, ground), Warby (Era #3, clouds), Justworks (Era #6, stratosphere), ACD/IntelliForia (Era #7, orbit)** — the `deep-space` Axioms finale (Era #8) is part of the top signature bookend. Each Waypoint has a Detail Panel (FR-11).
- Scene loading/failure states for the rendered scenes (FR-33).
- Content Truth Layer basics: DOM overlay (FR-10), detail panels (FR-11), résumé (FR-12), outbound + contact + repo links (FR-13).
- Navigation: Timeline Rail (FR-19), Year/altitude HUD (FR-20), shareable per-era routes with deep-link cold-load behavior (FR-21).
- **Accessibility (full §10 launch gate, not a floor):** Reduced-Motion Static Timeline (FR-25), keyboard nav + focus management (FR-27), no-WebGL/capability fallback (FR-28), **plus** the §10 gate items — flash safety (PEAT), focus-not-obscured + dual-backdrop focus ring, canvas semantics, persistent-UI text contrast, and SR era/year announcements.
- SEO baseline: SSR content + per-era routes (FR-21) with `Person` JSON-LD **and** OG/Twitter cards + preview image (§10).
- Instrumentation: privacy-respecting analytics + consent handling (FR-34); repo integrity / secret-hygiene gate (FR-35).

### 6.2 Out of Scope for MVP
- Full set of nine high-fidelity Scenes and all Set Pieces (FR-6/FR-8 at full detail) — *reason: worldbuilding is Phase 2; MVP proves the loop with 3 bands / 4 waypoints.*
- Atmospheric band transitions at full richness (FR-9) — *basic transitions only in MVP.*
- Physics & artifact interaction (FR-22–FR-24) — *Phase 3; `[NOTE FOR PM] the floating/orbiting cards are emotionally load-bearing to the "wow"; revisit if timeline allows a lightweight version in MVP.]`*
- Visual Relationship Lines (FR-17 rendered) — *data + panel notes may ship; visual lines post-MVP.*
- Knowledge-graph ingestion pipeline (FR-18) — *post-MVP; MVP data is hand-authored.*
- **Full-fidelity** mobile spectacle — *the first MVP demo may ship mobile = simplified/static; a genuine **lower-fidelity** mobile spectacle (Tier 1–2) is required before public launch (§13), since the positioning thesis depends on not surrendering the mobile majority. Full desktop-parity mobile spectacle stays out.*

## 7. Success Metrics

*This is a personal-brand launch, so metrics blend outcome, engagement, and quality guardrails. `[ASSUMPTION: targets below are proposed defaults pending Jarad's confirmation — see §8.]`*

**Primary**
- **SM-1 — Opportunity conversion** *(non-gated proxy — not directly instrumentable, gathered qualitatively; see FR-34):* qualified inbound conversations / callbacks attributable to the site. Target: the site is cited/remembered in ≥ N recruiter or founder conversations in the first quarter post-launch. Speaks to the whole product (esp. UJ-1, UJ-2). `[ASSUMPTION: N to be set by Jarad.]`
- **SM-2 — Journey completion:** share of engaged visitors (desktop **and** mobile, reported separately) who reach the `orbit` era, measuring **scroll-traversal depth distinctly from jump arrivals** (reaching via the rail exercises FR-3/FR-19; scrolling the ascent exercises FR-1/FR-2/FR-5). Target: ≥ 40% of sessions that pass the first Era reach the `orbit` era. Validates FR-1–FR-6 (scroll path) and FR-3/FR-19 (jump path) — reported as two numbers, not one.

**Secondary**
- **SM-3 — Content actions:** résumé downloads + outbound clicks (GitHub/Medium/contact) per engaged session. Validates FR-12, FR-13.
- **SM-4 — Shareability:** referral/social shares and direct-link revisits. Validates FR-3, FR-21 (delight + deep links). Speaks to UJ-3.
- **SM-5 — Source inspection & advocacy:** repository engagement (visits/stars/clones) and qualitative "I looked at the code and…" reactions — the signal that the Source-as-Exhibit play landed. Validates FR-29–FR-32. Speaks to UJ-5.

**Counter-metrics (do not optimize)**
- **SM-C1 — Load/performance cost:** initial load time and time-to-interactive must not regress past the §10 budgets in pursuit of spectacle. Counterbalances SM-2/SM-4. *If spectacle wins by making the site slow, it has failed.*
- **SM-C2 — Content findability:** a visitor who skips the spectacle must still find roles, dates, tech, résumé, and contact quickly. Counterbalances SM-4. *Spectacle must never bury the truth.*
- **SM-C3 — Accessibility integrity:** reduced-motion and keyboard/no-WebGL paths deliver full content parity. Counterbalances SM-2. *Never trade a11y for wow.*

## 8. Open Questions & Decisions

*Items resolved this session are marked **[RESOLVED →]** with the decision; the rest stay open. Per the demo-first ethos (§16), several "open" items are meant to resolve through experimentation, not upfront.*

1. **Career timeline accuracy** — **[RESOLVED → source]** the authoritative source is **`linkedin.com/in/delorenj`**. A partial fetch corrected education to **Stevens Institute of Technology** (not Drexel, as the braindump said), confirmed **IntelliForia** as current, and a "Staff Engineer & Systems Architect, 25+ years" headline. LinkedIn blocks full scraping, so exact companies/roles/dates become a **data-authoring task** in the Career Data Layer (from a LinkedIn export or hand entry) — not a blocker for the PRD.
2. **Contact affordance** — **[RESOLVED →]** email + LinkedIn, no form in v1 (FR-13).
3. **Résumé** — **[RESOLVED →]** authored once in **MDX**, rendered as HTML + exported to PDF from the same source (FR-12).
4. **MVP waypoint set** — is BAE/Warby/Justworks/AI the right four to prove the magic, or swap one (e.g., include the Prologue or Splash)? (§6, FR-6)
5. **Relationship Lines in MVP** — data-only + panel notes, or visual lines from the start? (FR-17)
6. **Physics in MVP** — fully deferred, or a lightweight idle-drift teaser included? (FR-22–24)
7. **Knowledge Graph** — **[RESOLVED →]** tool-agnostic; a generic offline **creative authoring aid** (connect eras/ideas to inform content), post-MVP, no vendor lock-in (FR-18).
8. **Domain & hosting** — **[RESOLVED →]** canonical domain **`jaradd.com`** (reclaimed — a callback to the earlier vertical career portfolio); hosting on **Cloudflare** (**Workers via the OpenNext adapter** + **R2** for large KTX2/Draco assets — the deprecated Pages `next-on-pages` path is *not* used), fitting Jarad's existing Cloudflare-centric infra. The exact Next.js-SSR adapter/topology is being ground-truthed by background research and is the Architecture phase's to confirm. `[NOTE FOR PM] affects SEO canonicalization and §10 targets.]`
9. **Success targets** — set concrete numbers for SM-1 (N conversations) and confirm SM-2 threshold. (§7)
10. **Analytics** — is engagement instrumentation (for SM-1–SM-4) in scope, and privacy-respecting/consent posture? `[ASSUMPTION: lightweight privacy-friendly analytics; confirm.]`
11. **Audio** — BRAINDUMP.md mentions radio sounds/waveforms; is audio in scope, and must it be muted-by-default / user-initiated? (a11y + autoplay policy)
12. **Fidelity-tier per era** *(research-surfaced)* — which 2–3 eras get full-realized 3D vs. lighter kinetic-type/particle/wireframe treatment? Concept implies ground radio-waves + deep-space agentic-AI as the 3D bookends — confirm, and decide transitional-era treatments. (Directly shapes §6 MVP and the solo-scope risk.)
13. **Camera authoring workflow** *(research-surfaced)* — Theatre.js Studio (GUI keyframing, dev-only, baked to `state.json`) vs. a code-authored GSAP timeline. Which fits solo maintenance? (`addendum.md §L`.)
14. **Live demo / repo per signature era** *(research-surfaced)* — is a working demo and/or public repo available for each signature era, or are some narrative-only? Gaps weaken those eras' credibility. (§1 positioning.)
15. **Buy vs. build the canvas/scroll sync** *(research-surfaced)* — adopt `14islands/r3f-scroll-rig` (proven single-GlobalCanvas pattern) or hand-roll. (`addendum.md §L`.)
16. **WebGPU at launch?** *(research-surfaced)* — ship WebGL2-only and revisit compute-particle paths post-telemetry, or enable a gated WebGPU path? (Recommendation: WebGL2-only for launch.)

## 9. Assumptions Index

*Remaining `[ASSUMPTION]`/inferences, surfaced for confirmation (resolved items live in §8):*

- §2.2 — Not intended to be reused/templatized for others in v1.
- §4.1 (FR-5) — Target feel ≈ 3–5 wheel-notches per year within the cap, tunable.
- §4.8 (FR-29) — the public repo is on GitHub; its link is surfaced by design.
- §4.8 (FR-35) — the repo ships a source-available "look, don't reuse" license (or README notice); confirm choice.
- §5 — WebGL2-first with optional WebGPU enhancement; no bleeding-edge baseline dependency.
- §7 — All SM targets are proposed defaults pending Jarad's numbers; SM-1 is a non-gated proxy.
- §6.2 / §13 — First MVP demo may ship mobile = static; a lower-fidelity mobile spectacle is required before public launch.
- §8 Q10 — Lightweight, privacy-friendly analytics assumed in scope (FR-34).
- §10 — Numeric NFR targets are research-grounded proposed launch gates, to be confirmed against Jarad's device/hosting reality.
- §10 — Browser matrix: latest 2 major evergreen desktop; modern iOS Safari / Android Chrome — confirm.
- §13 — Hosting = Cloudflare (OpenNext on Workers + R2); domain = `jaradd.com`; build on Next.js 15/16. Deployment topology is the Architecture phase's to ratify.
- §14 — No hard external deadline; "now" is opportunity-driven, not date-driven — confirm.

---

## 10. Cross-Cutting NFRs

*System-wide quality attributes. Numeric targets below are grounded in the `research-digest.md` in this folder (Awwwards-caliber benchmarks + WCAG + platform limits) and are proposed launch gates — confirm against Jarad's device/hosting reality. The **how** (which libraries, RAF-loop topology, camera authoring) lives in `addendum.md §L`; this section states **what must be true**.*

**Performance — Core Web Vitals (launch gate):**
- LCP ≤ 2.5s, INP ≤ 200ms (target < 100ms), CLS ≤ 0.1 at p75 across **both** mobile and desktop (field/CrUX). The LCP element must be SSR'd hero/timeline text — **never** the canvas.

**Performance — frame budget:**
- 60 fps desktop target with a hard ≤ 10ms JS/CPU ceiling per 16.6ms frame; **floor ≥ 45 fps on a mid-range 2–3-year-old phone** under sustained scroll. If average FPS < 40 for > 2s, auto-downgrade one Fidelity Tier (set-and-forget quality collapses under thermal throttling — 60→~20 fps after ~30s).

**Performance — GPU/asset budgets (enforce via a checked-in perf-budget JSON + CI gate):**
- Draw calls: ≤ 50 mobile / ≤ 100 desktop per frame (absolute ceiling 1000).
- Triangles: ≤ 500,000 total scene; env props 500–5,000 each; LOD by camera distance/altitude.
- Instancing: all stars/particles/repeated era nodes via InstancedMesh/BatchedMesh; per-tier caps (≈ 100k / 30k / 10k / static).
- Texture memory: ≤ 256–384MB on mobile (under iOS Safari's ~300–500MB WebGL heap), ≤ 1GB desktop; **all** 3D textures KTX2, mipmapped, ≤ 1K mobile / 2K desktop.
- Geometry: Draco/Meshopt-compressed (Meshopt preferred); count decode cost against **load** budget, not frame budget.
- Asset weight: first-meaningful WebGL load < 6MB, hard cap ~15MB; per-era lazy loading, preload only the adjacent era.
- devicePixelRatio clamped to min(DPR, 2); drop to 1.0–1.5 on low/mid GPU tier and during active scroll/launch.

**Performance — adaptive quality (build in from day one):**
- Boot-time GPU tier detection (0–3) sets initial DPR/particle/postprocessing budgets; runtime monitor drives up/down-grading with hysteresis (shed order: postprocessing → particle count → DPR → LOD). Tier 0 / no WebGL2 / context-lost ⇒ serve the Static Timeline. (Battery low-power mode is undetectable via web APIs, so live-FPS adaptation is mandatory.)

**Accessibility (WCAG 2.2 AA committed as launch NFR; + 2.3.3 AAA via reduced-motion):**
- **Reduced-motion is a primary designed mode, not "animations off":** spectacle OFF by default in code, enabled only when `prefers-reduced-motion` does *not* match; a single flag gates all camera launch/parallax/physics, re-evaluated on the `matchMedia` change event; reduced mode uses native/instant scroll, jump/crossfade instead of camera launch, and renders the same Static Timeline as the no-JS fallback (FR-25). Plus a persistent, keyboard-reachable in-UI pause/reduce toggle (OS setting alone does not satisfy 2.2.2 for ambient motion > 5s).
- **Flash safety (hard gate, applies even in full-motion mode):** no effect (launch flash, bloom flicker, ignition, strobe) flashes > 3×/sec at large area/high luminance; verify launch + deep-space effects with PEAT (WCAG 2.3.1 Level A — seizure safety).
- **Canvas semantics + keyboard:** canvas `aria-hidden` (decorative) or `role="img"` + `aria-labelledby` to visible DOM text; every era is a real focusable `<button>/<a>` in logical DOM order, Enter/Space-activatable, triggering the same navigation as a click — **never raycast-only selection** (FR-27). Skip-link first tab stop → `<main>`; h1 (name) → h2 (per era); no keyboard trap in the canvas.
- **Focus indicator:** never `outline:none`; a visible ring rendered above the canvas, ≥ 3:1 contrast, legible on **both** bright-cloud and deep-space backdrops (halo/double-outline, not color-only); focused element never obscured (2.4.11).
- **Text contrast over a dynamic backdrop:** all persistent Content Truth Layer text (HUD, Timeline Rail, panel chrome) holds ≥ 4.5:1 (WCAG 1.4.3) against the **worst-case** backdrop across the full ascent — via a scrim/plate or luminance-adaptive treatment — verified at the brightest and darkest bands.
- **Screen-reader orientation:** current Era/year is exposed to assistive tech as a polite ARIA live region, announcing Era changes on scroll-settle and on Waypoint arrival; the Static Timeline conveys the same ordering. (The core "moving through time" cue must not be visual-only.)
- **Additional 2.2 criteria:** 2.5.8 Target Size (Timeline Rail + mobile controls), 1.4.10 Reflow at 400% (pinned-canvas + overlay layout must not require 2-D scroll of content), and forced-colors / `prefers-contrast` handling for the DOM layer.

**SEO & discoverability:**
- SSR/SSG every indexable route so full résumé text + headings + links + JSON-LD exist in initial HTML **before** hydration and before the canvas mounts; WebGL is a client-only island mounted on top of already-SSR'd DOM.
- Real History-API per-era routes (e.g. `/journey/computer-vision`), each with unique SSR'd title/meta/canonical and a restorable scroll waypoint; no hash/fragment routing.
- SSR'd JSON-LD `ProfilePage > Person` in static HTML (AI crawlers — GPTBot/ClaudeBot/PerplexityBot — don't run JS), mirroring the visible DOM 1:1; validate with Rich Results Test in CI.
- **Social previews:** SSR'd Open Graph + Twitter Card tags and a static preview image on every indexable route (a WebGL canvas yields no auto-preview; shareability — SM-4 — depends on this).
- **Duplicate-content control:** the root experience and per-era routes are differentiated (each per-era route foregrounds that era's deep content) with canonical rules so they don't self-compete in ranking.

**Resilience / progressive enhancement:**
- One well-built **Static Timeline** artifact serves four jobs at once: the SEO body, the `<noscript>` mirror, the reduced-motion mode, and the low-end/mobile/context-lost fallback. Works with JS disabled and with WebGL unavailable.
- Exactly **one** persistent canvas fixed behind the scrolling document for the whole site (browsers cap WebGL contexts ~8–16 and kill the oldest); switch era scene-graphs by visibility, not mount/unmount.
- Baseline WebGL2; WebGPU opt-in only after successful adapter/device acquisition with automatic WebGL2 fallback — no WebGPU-only paths.

**Browser/device support:** `[ASSUMPTION: latest 2 versions of major evergreen browsers on desktop; modern iOS Safari / Android Chrome on mobile — confirm matrix. Real mid-tier-device testing (not desktop/simulator) is a launch requirement.]`

**Privacy:** any analytics is privacy-respecting and consent-appropriate (§8 Q10).

**Maintainability (solo builder):** the Career Data Layer is the single edit point for career facts (FR-15); Scenes are modular/chunked and **data/config-driven** so new eras are added by config, not a render-pipeline rewrite; adopt a composable/shared rendering system (reused material/particle/transition modules) rather than N bespoke pipelines.

## 11. Aesthetic & Tone

- **Feel:** grand, cinematic, "video-game-loop rendering" of a continuous world; parallax depth; a sense of *magnitude* and *time*. A spiritual successor to jaradd.com (2006) — inventive, unmistakably personal, "revolutionary for its moment."
- **Per-era mood:** ground = grounded/engineered/physical (radio lab); web era = kinetic/creative/high-gloss; clouds = ascent/interpretation (vision); stratosphere = systems-at-scale/pattern-recognition; orbit = frontier/agentic; deep space = identity/framework (Axioms).
- **Voice (product text & copy):** confident senior systems-architect — precise, a little wry, never boastful; lets the arc and artifacts do the bragging.
- **Pacing — film beats:** each era is entrance → *hold* → exit; the hold state is calm and readable so the eye and the résumé content can breathe. Camera-mode variety across bands (ground dolly, arc into clouds, orbital tumble) keeps a long ascent from feeling monotonous.
- **Restraint — one defended idea:** the vertical time+altitude ascent is *the* idea; protect it. No unrelated spectacle; the failure mode across every award roundup is "every section competes as a hero and nothing breathed."
- **Altitude legibility via atmosphere:** "higher = later / more advanced" must read from first-class per-era atmospheric art direction (fog density, horizon curvature, haze, star-field), not camera height alone.
- **Onboarding — diegetic first-cue:** teach "scroll up = up in time and altitude" within the first 3–5 seconds through an in-world cue, not a tutorial overlay (Bruno-Simon-style).
- **Anti-references (explicitly avoid):** a generic template landing page; "five giant scroll sections with big empty gaps"; spectacle that sacrifices readability; effects that feel like a tech demo with nothing to say; a shader-zoo where fidelity is uneven era-to-era.

## 12. Information Architecture

- **Primary surface:** the Career World (single continuous experience) with persistent Timeline Rail + HUD + résumé/contact affordances.
- **Detail Panels:** per-Era and per-Artifact overlays (Content Truth Layer).
- **Content pages (routes):** per-era deep links (FR-21); project/case-study write-ups (MDX); résumé (download). Essays primarily on Medium (linked).
- **Fallback surface:** the Static Timeline mirroring all of the above.
- **External:** GitHub, Medium, contact.

## 13. Platform

- **Desktop web — primary:** full Spectacle Layer; the intended "wow" surface.
- **Mobile web — adaptive:** the **launch goal is a genuine lower-fidelity mobile spectacle** (Fidelity Tier 1–2 — reduced effects, touch navigation), *not* only the Static Timeline, because the research thesis is that recruiters frequently arrive on mobile and a template-only mobile experience surrenders the majority audience the site exists to win. The Static Timeline (tier 0) remains the floor/fallback. Full content parity throughout. *(MVP may open with mobile = simplified/static and add the reduced mobile spectacle before public launch — see §6.2.)*
- **Reduced-motion / no-WebGL — first-class:** Static Timeline (FR-25, FR-28).
- **Domain:** `jaradd.com` (reclaimed — deliberate callback to Jarad's earlier vertical career portfolio).
- **Hosting:** **Cloudflare** — Next.js via the **OpenNext adapter on Workers** (full App-Router SSR/ISR on the Node runtime; the deprecated `next-on-pages` is *not* used), with large 3D binaries (KTX2/Draco/Meshopt) served from **R2** behind a custom domain with immutable long-cache (R2's zero egress is the decisive cost win for an asset-heavy site). Three.js/R3F stays client-side to keep the server Worker bundle under its ~10 MiB gzip ceiling. Details + honest Vercel contrast in `addendum.md §N`; the Architecture phase ratifies. `[ASSUMPTION: build on Next.js 15/16 — OpenNext drops Next 14 support Q1 2026.]`

## 14. Why Now

Timing is genuinely load-bearing: (1) Jarad's career has arrived at an AI-era systems-architect inflection, and the site's whole thesis is that arrival earned — the moment to tell that story is now. (2) The web-3D stack (declarative R3F over Three.js, mature scroll/animation tooling) is finally productive enough for one person to build a cinematic world without a studio. (3) A memorable, high-craft personal brand is disproportionately valuable in a crowded senior/AI hiring market. `[ASSUMPTION: no hard external deadline; "now" is opportunity-driven, not date-driven — confirm.]`

## 15. Risk & Mitigations

*Register grounded in `research-digest.md`. Highest-leverage risks first.*

- **Style-over-substance perception (high):** if the most impressive technical thing is the site itself, senior interviewers' credibility read *drops*. *Mitigation:* keep the metaphor diegetic to the real career and frame the build as a skill demonstration; route every era to a real deep-dive + live demo/repo in seconds; publish the source repo and a build case study (§1 positioning, §11).
- **Over-scope for a solo builder (high):** 5–9 fully-realized Awwwards-caliber eras risks never reaching the launch bar or shipping *uneven* eras that undercut the premium impression. *Mitigation:* **fidelity-tier the eras** — reserve full 3D for 2–3 signature bookends (ground radio-waves, deep-space agentic-AI) and use lighter kinetic-type/particle/wireframe treatments for transitional eras; data/config-driven eras so additions aren't rewrites (§6, §10 maintainability).
- **iOS Safari GPU-memory crashes (high):** exceeding the ~300–500MB WebGL heap (or context-not-released-on-resize bugs) silently kills the tab. *Mitigation:* ≤ 256–384MB mobile texture budget with KTX2; `dispose()` past-era assets; debounce resize, never recreate context on resize; `webglcontextlost` → Static Timeline; test on real iPhones (§10).
- **Performance failure on recruiters' actual devices (high):** mid-tier mobile / locked-down corporate machines; thermal throttling collapses 60→~20 fps under sustained scroll. *Mitigation:* boot GPU-tier detection + runtime downgrade with hysteresis; AdaptiveDpr; render-on-demand; ship the Static Timeline when 3D would add > 1s perceived delay; enforce all §10 budgets.
- **SEO / AI-search invisibility (high):** résumé content trapped in the canvas is uncrawlable by Google's first wave and non-JS AI crawlers, and unshareable. *Mitigation:* HTML-first SSR/SSG of the full timeline before the renderer boots; per-era History-API routes; SSR'd JSON-LD Person; verify via Search Console URL Inspection (§10 SEO).
- **Photosensitive-epilepsy seizures (high, safety + legal):** flashing in the launch tween or postprocessing. *Mitigation:* hard gate — no effect flashes > 3×/sec at large area/high luminance; PEAT-test launch + deep-space effects; applies even in full-motion mode (WCAG 2.3.1 A).
- **Canvas-only era selection unreachable for keyboard/SR users (high):** raycast-only navigation fails 2.1.1/2.4.3. *Mitigation:* 1:1 map every era to a real focusable element triggering the same navigation; canvas `aria-hidden`/`role=img` (§10 a11y, FR-27).
- **Vestibular / motion sickness (high):** scroll-jacking, parallax, and the nonlinear launch are exactly what WCAG 2.3.3 targets. *Mitigation:* `prefers-reduced-motion` *replaces* the ascent with the native-scroll Static Timeline (launch → instant jump/crossfade); persistent in-UI pause toggle (FR-25, §10).
- **Wrong scroll/render plumbing (medium):** `drei ScrollControls` breaks the SEO/semantic truth layer and desyncs the scrubbed camera; two RAF loops or setState-in-useFrame cause jitter/re-render storms. *Mitigation:* single scroll authority (GSAP ScrollTrigger on the real document), single RAF ticker, per-frame values in refs — details in `addendum.md §L`.
- **DOM↔world height drift (medium):** since scroll distance = years, section-height/world-waypoint mismatch lands the camera mid-transition and blows CLS. *Mitigation:* derive both DOM section heights and world waypoint offsets from one shared timeline/config; reserve the canvas box (§10 CWV).
- **Scroll fatigue — "nothing breathed" (medium):** long tenures become tedious scroll. *Mitigation:* bounded per-era "altitude chambers" rather than one giant scroll; film-beat pacing; cap the longest-tenure scroll length (§11, §8 Q on scale/cap).
- **Metaphor reads as gimmicky (medium):** altitude=era falls flat if the affordance isn't taught early and atmosphere doesn't sell "higher = later." *Mitigation:* diegetic first-cue in 3–5s; per-era atmospheric art direction as first-class (§11).
- **Solo maintenance / aging (medium):** immersive sites age fast; the ascent metaphor implicitly promises the site keeps growing. *Mitigation:* composable shared rendering system + data-driven era content model (§10 maintainability, §8 Q on content cadence).
- **Never-ships polish trap (medium):** infinite worldbuilding. *Mitigation:* sequence the truth layer first (it doubles as SEO/noscript/reduced-motion/fallback), ship MVP publicly, iterate era-by-era.

## 16. Ways of Working (development approach)

*This is a constraint on **how** the work runs, not a product requirement — but it's load-bearing for downstream Architecture and Epics, so it's stated here.*

- **Demo-first, always.** Every increment must produce something runnable and *watchable*. The experience is kept upfront and centered during development — no long infrastructure-only stretches with nothing to see. A vertical slice of the world beats a complete-but-invisible subsystem.
- **Disposable by default — with a load-bearing exception.** Experiential prototypes (a scene's look, a camera move, a physics toy) are spikes, not commitments; throw them away without ceremony when they underwhelm. **But a small set of foundations is explicitly non-disposable** and built early to stay: the single persistent canvas + single scroll authority + single RAF loop, the SSR'd Content Truth Layer / Static Timeline, the Fidelity-Tier detection, and the perf-budget CI gate (§10). Spikes are throwaway; the skeleton they hang on is not.
- **Highly iterative / experimental.** Expect hard, fast pivots (Jarad's standing style). The Career Data Layer (FR-15), data/config-driven Scenes, and the composable rendering system (§10) exist precisely so experiments are cheap and pivots don't cascade.
- **Experience is the acceptance test.** "Does it feel right when you scroll it?" is a first-class gate alongside functional correctness and the §10 budgets. Downstream stories should carry an experiential acceptance criterion, not only a behavioral one.
- **Implication for downstream BMAD phases:** Architecture should favor a **truth-layer-first walking skeleton** — a thin end-to-end vertical slice that stands up the SSR'd Content Truth Layer + Static Timeline and the non-disposable foundations first, *then* enhances one real Era with scroll → sequence → camera → scene → panel over it — rather than a spectacle-first or layered-horizontal build-out. Epics should be sequenced so a demoable artifact exists at the end of each and should explicitly permit throwaway experiential spikes.
