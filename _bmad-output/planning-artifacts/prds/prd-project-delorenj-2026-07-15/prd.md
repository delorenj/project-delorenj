---
title: "Career Ascent — Jarad DeLorenzo Portfolio World"
status: draft
created: 2026-07-15
updated: 2026-07-15
---

# PRD: Career Ascent — Jarad DeLorenzo Portfolio World
*Working title — confirm.*

## 0. Document Purpose

This PRD is for the builder (Jarad, solo) and any future collaborator, and it feeds the downstream BMAD workflows — UX (`bmad-ux`), Architecture (`bmad-architecture`), and Epics & Stories. It is derived from two Jul-11 inputs: `BRAINDUMP.md` (the original vision) and `ARCHITECTURE_DRAFT.md` (the technical sketch). It captures **what** the product is and must do; the **how** (framework choices, the year→distance math, the data-model types, the phased build order, and rejected stack alternatives) lives in the companion **`addendum.md`** in this same folder — the PRD references capabilities and points there rather than duplicating implementation. Vocabulary is anchored in §3 Glossary; features are grouped with globally-numbered Functional Requirements (FR-N) nested under them; inferences are tagged inline `[ASSUMPTION: ...]` and indexed in §9. `[NOTE FOR PM]` marks items flagged for a decision.

## 1. Vision

This is not a portfolio *page*. It is a **playable career world** — a single, continuous, scroll-driven experience where the visitor pilots *upward through time and altitude*. They begin on the ground amid radio hardware and green waveforms (the embedded-systems era, ~2004), climb through the browser-learns-to-move web-agency era, rise into the clouds where computer vision interprets reality, break into the stratosphere where architecture becomes visible at scale, and finally reach orbit and deep space — agentic AI systems and the Axioms of AI. Scroll distance *is* time: a longer chapter physically occupies more of the world, so the visitor **feels** the span of a twenty-year career rather than reading a list of it.

Two systems run together and are equally important. The **Spectacle Layer** is the cinematic 3D world — camera movement, parallax, era-specific set pieces, particles, atmosphere, floating cards, physics. The **Content Truth Layer** is the readable, linkable, indexable, accessible reality underneath — real HTML text, résumé, project detail, outbound links, and a reduced-motion static timeline. The spectacle is the hook; the truth is what a recruiter actually uses. Neither is sacrificed for the other.

Why it matters: the site must communicate, in the first thirty seconds and again at the summit, one thing — *this is not someone who merely worked at companies; this is someone who has lived through multiple eras of software, internalized the patterns, and carried them into the AI era.* The north star: **A recruiter scrolls upward from radio waves on Earth to agentic systems in orbit, feeling twenty years of software history not as a résumé, but as a playable ascent through the technologies, patterns, companies, and ideas that shaped Jarad into an AI-era systems architect.**

## 2. Target User

### 2.1 Jobs To Be Done

- **Assess fast (recruiter / hiring manager):** "In a couple minutes, tell me whether this person is senior, real, and worth a conversation." Needs skimmable truth *and* a memorable impression.
- **Judge depth (founder / hiring principal / staff+ interviewer):** "Show me the arc — did they actually operate at scale, and do they think in systems and patterns?" Wants to drill into architecture and AI work.
- **Be delighted and share (technical peer / community):** "This is the kind of craft I respect." Explores the spectacle, inspects artifacts, and shares the link.
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
  - **Climax:** The camera *launches* — accelerating past the earlier eras, through clouds, into orbit — and settles on the agentic-AI station. A detail panel opens with real, readable text and links. She gets it: *twenty years, ground to orbit, ending in AI.*
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

## 3. Glossary

*Downstream workflows and readers must use these terms exactly. No synonyms elsewhere in the PRD.*

- **Career World** — the single continuous rendered environment the visitor travels through; the whole experience, not a page or a set of sections.
- **Spectacle Layer** — the 3D/WebGL rendered visual world (camera, scenes, set pieces, particles, physics). One of the two co-equal layers.
- **Content Truth Layer** — the HTML/DOM layer carrying the real readable/linkable/indexable content (text, panels, résumé, links, static fallback). The other co-equal layer. Source of truth for facts.
- **Altitude Band** — a vertical zone of the world with a distinct visual identity: `ground`, `low-atmosphere`, `clouds`, `stratosphere`, `orbit`, `deep-space`. Altitude increases with time.
- **Era** — a named chapter of the career mapped to a year range and an Altitude Band (e.g., "BAE Systems — Signals & Systems, 2004–2010, ground").
- **Waypoint** — a navigable anchor in the Career World, one per Era (and the Prologue), that the visitor can jump the camera to.
- **Scene / Scene Chunk** — the renderable set piece for one Era (e.g., `RadioLabScene`), loaded/unloaded based on camera proximity.
- **Set Piece** — the themed environmental artifacts that decorate an Era's Scene (radios, oscilloscopes, browser windows, satellites, MCP docking ports, etc.).
- **Virtual Scroll** — the normalized scroll-driven state that maps scroll input to a year and a camera position, independent of literal document height.
- **Year-to-Distance Mapping** — the rule that converts a year to vertical world distance so longer Eras occupy more space. (Constants live in `addendum.md`.)
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
- **Fidelity Tier** — a device-appropriate quality level (e.g., full / reduced / static) selected by capability detection and performance headroom.
- **Axioms of AI** — Jarad's authored framework (e.g., AI/HE Ratio, "agent as employee," requirements & acceptance criteria as forces); the deep-space climax content.

## 4. Features

*FRs are numbered globally so downstream artifacts keep stable references even if features are reorganized. Feature-specific NFRs appear under their feature; system-wide NFRs are in §10.*

### 4.1 Career World & Motion Engine
**Description:** The heart of the product — the machinery that turns scrolling into piloting through time. It maps Virtual Scroll to a year and a camera position via the Year-to-Distance Mapping, tracks the camera smoothly in `free-scroll`, performs cinematic nonlinear tweens in `waypoint-jump`, and tilts/pivots the camera to sell the sense of flight. Longer Eras occupy proportionally more distance so magnitude is *felt*. Realizes UJ-1, UJ-2, UJ-3.

**Functional Requirements:**

#### FR-1: Scroll-to-time mapping
The visitor can move continuously through the career timeline by scrolling; scroll position deterministically maps to a current year and a camera altitude via the Year-to-Distance Mapping.
**Consequences (testable):**
- At rest, the HUD's reported year corresponds to the scroll position within ±1 year of the mapping formula.
- The mapping is monotonic: scrolling one direction never moves the current year backward.
- Scroll state is decoupled from literal document height (Virtual Scroll), so year mapping is stable across viewport sizes.

#### FR-2: Free-scroll camera tracking
In `free-scroll` Motion Mode, the camera tracks a target derived from the current scroll position, responsively but without mechanical snapping.
**Consequences (testable):**
- Camera position is a smoothed follow of the scroll-derived target (no 1:1 rigid coupling that feels janky).
- No dropped input: rapid scroll still resolves to the correct final year/altitude.

#### FR-3: Waypoint jump (click-to-launch)
The visitor can select any Era (from the Timeline Rail or an in-world Waypoint) and the camera performs a nonlinear tween ("launch": accelerate, arc, ease-in) to that Waypoint's year/altitude, entering `waypoint-jump` Motion Mode for the duration. Realizes UJ-1, UJ-2.
**Consequences (testable):**
- Travel duration scales with distance between the current year and the target year (farther = longer, within a bounded range).
- The tween is interruptible: a new selection or manual scroll cleanly takes over without visual snapping.
- On arrival, Motion Mode returns to `free-scroll` and the target Waypoint's Detail Panel is available/opened.

#### FR-4: Camera orientation / flight feel
The camera can pivot to look up/down (and tilt) during motion to evoke a rocket/ascent feel, driven by scroll velocity and direction.
**Consequences (testable):**
- Tilt magnitude is bounded and returns to neutral at rest.
- Tilt is fully suppressed in Reduced-Motion Mode.

#### FR-5: Proportional era distance
A longer Era occupies proportionally more world distance and scroll span than a shorter one.
**Consequences (testable):**
- Given two Eras, the one with the larger year span has the larger scroll span (per the mapping constants).
- `[ASSUMPTION: target "feel" is ~3–5 mouse-wheel notches per year, tunable — from BRAINDUMP.md.]`

**Feature-specific NFRs:** camera/scroll interaction must sustain the frame-budget target in §10; input latency must feel immediate (perceptible response < ~100 ms).

### 4.2 Era Scenes & Worldbuilding
**Description:** The visual identity of each chapter. Each Era has a Scene Chunk with themed Set Pieces and belongs to an Altitude Band; the bands transition atmospherically (parallax, fog/color grade, density) as the visitor ascends. Scenes load and unload by camera proximity so the whole universe is never rendered at once. Realizes UJ-1, UJ-2, UJ-3.

**Functional Requirements:**

#### FR-6: Altitude bands & era scenes
The world presents the defined Eras, each rendered as a distinct Scene keyed to its Altitude Band, in chronological/altitude order. Canonical set (confirm dates/companies in §8): Prologue (Lockheed/Unisys/Drexel, launchpad) → BAE Systems (ground, radio/signals) → Web/Agency era incl. Noise & Firstborn (low-atmosphere) → Warby Parker (clouds, vision) → ClassPass/SagePoint (clouds, startup) → Splash (platform decomposition) → Justworks (stratosphere, architecture at scale) → ACD/IntelliForia (orbit, agentic AI) → Axioms of AI (deep space).
**Consequences (testable):**
- Each Era in the Career Data Layer has a corresponding Scene and Altitude Band.
- Scenes appear in non-decreasing altitude order with increasing year.
**Out of Scope:** photorealism; every Era at full fidelity in MVP (see §6).

#### FR-7: Scene chunk lazy-loading
Scenes load their heavy assets (models, textures, particles) only when the camera is near, and release them when far, to bound memory and cost.
**Consequences (testable):**
- Assets for a distant Scene are not fetched until within a defined proximity threshold.
- Memory does not grow unbounded while traversing the full world (no cumulative leak across all Scenes).

#### FR-8: Themed set pieces & environmental artifacts
Each Scene is decorated with era-appropriate Set Pieces and Tech-Node-driven motifs (e.g., oscilloscopes & waveforms at BAE; browser windows & Flash/Rails motifs in the web era; face-landmark/calibration motifs at Warby; constellations/temporal-tree motifs at Justworks; MCP docking ports/retrieval beams in the AI orbit).
**Consequences (testable):**
- Set Pieces shown in an Era match that Era's Tech Nodes/artifacts in the Career Data Layer (no anachronisms — e.g., no MCP motif on the ground).

#### FR-9: Atmospheric band transitions
Moving between Altitude Bands produces a continuous atmospheric transition (parallax depth layers, fog/haze, color grade, star/particle density) rather than a hard cut.
**Consequences (testable):**
- No discontinuous "pop" between bands during `free-scroll`.
- Transition effects respect the active Fidelity Tier and Reduced-Motion Mode.

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

#### FR-12: Résumé access
The visitor can view and download a current résumé from anywhere in the experience.
**Consequences (testable):**
- A résumé affordance is reachable from the persistent UI (not buried in one Era).
- Downloaded file is a real document (e.g., PDF). `[ASSUMPTION: PDF download of a maintained résumé; confirm format/source.]`

#### FR-13: Outbound & project links
Detail Panels and persistent UI expose outbound links (GitHub, Medium, company/project write-ups, contact) that open correctly.
**Consequences (testable):**
- Links resolve to the correct destinations and open in an appropriate target.
- `[ASSUMPTION: contact = email/LinkedIn; confirm preferred contact affordance in §8.]`

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

#### FR-18: Knowledge-graph ingestion pipeline *(post-MVP)*
Source material (résumé, LinkedIn, GitHub, Medium, essays) can be processed offline to produce or enrich the Career Data Layer and its relationships.
**Consequences (testable):**
- Pipeline output conforms to the Career Data Layer schema (it is a data producer, not the renderer).
- `[ASSUMPTION: KG pipeline is post-MVP; MVP uses a hand-authored career data file. Confirm in §6/§8.]`
**Out of Scope:** the KG as a live, on-page rendered graph (it is a content-intelligence tool, not the portfolio renderer).

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
Each Era (and key project/essay) has a URL that lands the visitor at the corresponding Waypoint/content, suitable for sharing and indexing.
**Consequences (testable):**
- Visiting an Era URL directly positions the experience at that Waypoint (or the Static Timeline anchor) with its Detail Panel available.
- Era URLs are crawlable and carry appropriate metadata (see §10 SEO).

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
- Physics object count per Scene is bounded to protect the frame budget (§10).
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

#### FR-28: Capability fallback (no-WebGL / low-power)
If WebGL is unavailable/blocked or the device is low-power, the experience falls back to the Static Timeline automatically, without a broken screen.
**Consequences (testable):**
- With WebGL disabled, the visitor gets the Static Timeline (not a blank canvas or error).
- Fidelity Tier selection is automatic with a manual override available.

## 5. Non-Goals (Explicit)

- **Not a game.** Game-loop *feel*, yes; win/lose/score/levels, no.
- **Not built on a game engine or 2D-only renderer.** The camera-pivot/orbital-depth concept needs real 3D with a first-class HTML content layer; pure-2D or game-engine framings are rejected (rationale in `addendum.md`).
- **Not text-trapped-in-WebGL.** Primary content stays in the DOM for readability, SEO, and accessibility.
- **Not a bleeding-edge-baseline build.** No reliance on features not broadly supported; enhanced modes are progressive, not required. `[ASSUMPTION: WebGL-first, optional WebGPU enhancement only — from ARCHITECTURE_DRAFT.md.]`
- **Not a CMS / blog platform.** Essays live on Medium (linked) or as MDX; the site does not become a general publishing tool.
- **Not a reusable portfolio-builder product** for others in v1.
- **Not an on-page live knowledge-graph visualization.** The Knowledge Graph is an offline content tool.

## 6. MVP Scope

*Aligned to "prove the magic first" (build Phase 1 in `addendum.md`).*

### 6.1 In Scope (MVP)
- Career Data Layer as a hand-authored structured file (FR-15) covering all Eras with summaries, dates, tech, links.
- Career World & Motion Engine core: scroll-to-time (FR-1), free-scroll tracking (FR-2), waypoint jump (FR-3), basic camera tilt (FR-4), proportional distance (FR-5).
- Three working Altitude Bands (ground / clouds / space) with at least four Waypoints rendered end-to-end: **BAE, Warby, Justworks, AI** (subset of FR-6), each with a Detail Panel (FR-11).
- Content Truth Layer basics: DOM overlay (FR-10), detail panels (FR-11), résumé (FR-12), outbound links (FR-13).
- Navigation: Timeline Rail (FR-19) and Year/altitude HUD (FR-20).
- Accessibility floor: Reduced-Motion Static Timeline (FR-25), keyboard nav (FR-27), no-WebGL fallback (FR-28) — treated as MVP, not deferred.
- SEO baseline: server-rendered content + per-era routes (FR-21) with Person structured data (§10).

### 6.2 Out of Scope for MVP
- Full set of nine high-fidelity Scenes and all Set Pieces (FR-6/FR-8 at full detail) — *reason: worldbuilding is Phase 2; MVP proves the loop with 3 bands / 4 waypoints.*
- Atmospheric band transitions at full richness (FR-9) — *basic transitions only in MVP.*
- Physics & artifact interaction (FR-22–FR-24) — *Phase 3; `[NOTE FOR PM] the floating/orbiting cards are emotionally load-bearing to the "wow"; revisit if timeline allows a lightweight version in MVP.]`*
- Visual Relationship Lines (FR-17 rendered) — *data + panel notes may ship; visual lines post-MVP.*
- Knowledge-graph ingestion pipeline (FR-18) — *post-MVP; MVP data is hand-authored.*
- Full mobile spectacle (FR-26 full) — *MVP mobile target is the simplified/static experience, not the full world.*

## 7. Success Metrics

*This is a personal-brand launch, so metrics blend outcome, engagement, and quality guardrails. `[ASSUMPTION: targets below are proposed defaults pending Jarad's confirmation — see §8.]`*

**Primary**
- **SM-1 — Opportunity conversion:** qualified inbound conversations / callbacks attributable to the site. Target: the site is cited/remembered in ≥ N recruiter or founder conversations in the first quarter post-launch. Validates the whole product (esp. UJ-1, UJ-2). `[ASSUMPTION: N to be set by Jarad.]`
- **SM-2 — Journey completion:** share of engaged desktop visitors who reach the orbit/AI era. Target: ≥ 40% of sessions that pass the first era reach the AI era. Validates FR-1–FR-6, FR-19.

**Secondary**
- **SM-3 — Content actions:** résumé downloads + outbound clicks (GitHub/Medium/contact) per engaged session. Validates FR-12, FR-13.
- **SM-4 — Shareability:** referral/social shares and direct-link revisits. Validates FR-3, FR-21 (delight + deep links). Speaks to UJ-3.

**Counter-metrics (do not optimize)**
- **SM-C1 — Load/performance cost:** initial load time and time-to-interactive must not regress past the §10 budgets in pursuit of spectacle. Counterbalances SM-2/SM-4. *If spectacle wins by making the site slow, it has failed.*
- **SM-C2 — Content findability:** a visitor who skips the spectacle must still find roles, dates, tech, résumé, and contact quickly. Counterbalances SM-4. *Spectacle must never bury the truth.*
- **SM-C3 — Accessibility integrity:** reduced-motion and keyboard/no-WebGL paths deliver full content parity. Counterbalances SM-2. *Never trade a11y for wow.*

## 8. Open Questions

1. **Career timeline accuracy** — confirm exact companies, roles, and date ranges (source docs show overlaps, e.g., ClassPass/SagePoint 2013–2016 vs Splash 2014–2018; Warby 2013). The Career Data Layer needs Jarad's authoritative dates.
2. **Contact affordance** — email, LinkedIn, a form, or a "book time" link? (FR-13)
3. **Résumé** — one general PDF, or role-tailored variants? Who maintains it and where does it live? (FR-12)
4. **MVP waypoint set** — is BAE/Warby/Justworks/AI the right four to prove the magic, or swap one (e.g., include the Prologue or Splash)? (§6, FR-6)
5. **Relationship Lines in MVP** — data-only + panel notes, or visual lines from the start? (FR-17)
6. **Physics in MVP** — fully deferred, or a lightweight idle-drift teaser included? (FR-22–24)
7. **Knowledge Graph** — is "Ace Knowledge Graph" a specific tool to integrate, or a generic offline enrichment step? Any constraint on it? (FR-18)
8. **Domain & hosting** — jaradd.com? a new domain? deployment target/budget? `[NOTE FOR PM] affects SEO canonicalization and §10 targets.]`
9. **Success targets** — set concrete numbers for SM-1 (N conversations) and confirm SM-2 threshold. (§7)
10. **Analytics** — is engagement instrumentation (for SM-1–SM-4) in scope, and privacy-respecting/consent posture? `[ASSUMPTION: lightweight privacy-friendly analytics; confirm.]`
11. **Audio** — BRAINDUMP.md mentions radio sounds/waveforms; is audio in scope, and must it be muted-by-default / user-initiated? (a11y + autoplay policy)

## 9. Assumptions Index

*Every `[ASSUMPTION]`/inference above, surfaced for confirmation:*

- §2.2 — Not intended to be reused/templatized for others in v1.
- §4.1 (FR-5) — Target feel ≈ 3–5 wheel-notches per year, tunable.
- §4.3 (FR-12) — Résumé is a downloadable PDF of a maintained document.
- §4.3 (FR-13) — Contact = email/LinkedIn (pending §8 Q2).
- §4.4 (FR-18) — KG ingestion is post-MVP; MVP data is hand-authored.
- §5 — WebGL-first with optional WebGPU enhancement; no bleeding-edge baseline dependency.
- §7 — All SM targets are proposed defaults pending Jarad's numbers.
- §6.2 — Mobile MVP target is simplified/static, not the full world.
- §8 Q10 — Lightweight, privacy-friendly analytics assumed in scope.
- §10 (below) — Specific NFR numeric targets are proposed defaults, to be confirmed against the grounding-research digest and Jarad's device/hosting reality.

---

## 10. Cross-Cutting NFRs

*System-wide quality attributes. Numeric targets are proposed defaults pending the grounding-research digest (in progress) and confirmation. `[ASSUMPTION: targets below are starting proposals.]`*

- **Performance — frame rate:** sustain ≈ 60 fps on a representative modern desktop during `free-scroll` and `waypoint-jump`; degrade gracefully (Fidelity Tier) rather than stutter on weaker hardware; mobile target ≈ 30–60 fps or auto-fallback to Static Timeline.
- **Performance — load:** fast first meaningful paint of the Content Truth Layer independent of heavy 3D assets; heavy Scene assets stream in by proximity (FR-7). `[ASSUMPTION: TTI/LCP budgets to be set from research digest.]`
- **Performance — assets:** compressed geometry and textures; instancing for particles/nodes; LOD for distant objects; only next Scene chunk preloaded; tasteful postprocessing (bloom must not murder mobile GPUs).
- **Accessibility:** target WCAG 2.2 AA for the Content Truth Layer; honor `prefers-reduced-motion` (FR-25); keyboard-operable (FR-27); visible focus; no motion that can't be stopped; sufficient contrast in panels.
- **SEO & crawlability:** server-render/pre-render the Content Truth Layer; per-era routes (FR-21); `Person`/résumé structured data (JSON-LD); correct titles/meta/OpenGraph for shareable links.
- **Progressive enhancement / resilience:** the site is useful with JS-limited or WebGL-disabled clients (Static Timeline); capability detection selects Fidelity Tier with manual override (FR-28).
- **Browser/device support:** `[ASSUMPTION: latest 2 versions of major evergreen browsers on desktop; iOS/Android modern Safari/Chrome on mobile — confirm matrix.]`
- **Privacy:** any analytics is privacy-respecting and consent-appropriate (§8 Q10).
- **Maintainability (solo builder):** the Career Data Layer is the single edit point for career facts (FR-15); Scenes are modular/chunked so eras can be added incrementally.

## 11. Aesthetic & Tone

- **Feel:** grand, cinematic, "video-game-loop rendering" of a continuous world; parallax depth; a sense of *magnitude* and *time*. A spiritual successor to jaradd.com (2006) — inventive, unmistakably personal, "revolutionary for its moment."
- **Per-era mood:** ground = grounded/engineered/physical (radio lab); web era = kinetic/creative/high-gloss; clouds = ascent/interpretation (vision); stratosphere = systems-at-scale/pattern-recognition; orbit = frontier/agentic; deep space = identity/framework (Axioms).
- **Voice (product text & copy):** confident senior systems-architect — precise, a little wry, never boastful; lets the arc and artifacts do the bragging.
- **Anti-references (explicitly avoid):** a generic template landing page; "five giant scroll sections with big empty gaps"; spectacle that sacrifices readability; effects that feel like a tech demo with nothing to say.

## 12. Information Architecture

- **Primary surface:** the Career World (single continuous experience) with persistent Timeline Rail + HUD + résumé/contact affordances.
- **Detail Panels:** per-Era and per-Artifact overlays (Content Truth Layer).
- **Content pages (routes):** per-era deep links (FR-21); project/case-study write-ups (MDX); résumé (download). Essays primarily on Medium (linked).
- **Fallback surface:** the Static Timeline mirroring all of the above.
- **External:** GitHub, Medium, contact.

## 13. Platform

- **Desktop web — primary:** full Spectacle Layer; the intended "wow" surface.
- **Mobile web — adaptive:** simplified/performant experience or Static Timeline (FR-26); full content parity.
- **Reduced-motion / no-WebGL — first-class:** Static Timeline (FR-25, FR-28).

## 14. Why Now

Timing is genuinely load-bearing: (1) Jarad's career has arrived at an AI-era systems-architect inflection, and the site's whole thesis is that arrival earned — the moment to tell that story is now. (2) The web-3D stack (declarative R3F over Three.js, mature scroll/animation tooling) is finally productive enough for one person to build a cinematic world without a studio. (3) A memorable, high-craft personal brand is disproportionately valuable in a crowded senior/AI hiring market. `[ASSUMPTION: no hard external deadline; "now" is opportunity-driven, not date-driven — confirm.]`

## 15. Risk & Mitigations

*Starter register; the grounding-research digest (in progress) will refine severities and add stack-specific items.*

- **Scope explosion vs solo capacity (high):** nine bespoke Scenes + physics + KG is a lot for one person. *Mitigation:* MVP proves the loop with 3 bands / 4 waypoints; data-driven Scenes so eras are additive; strict phase gates (§6, `addendum.md`).
- **Scroll/camera jank & the WebGL-vs-scroll integration (high):** smoothing, tween interruption, and scroll-sync are the classic failure points. *Mitigation:* nail the Motion Engine (4.1) first as a vertical slice; performance budgets (§10) as gates; research digest to pick proven integration patterns.
- **Mobile performance (high):** graphics-heavy sites die on mobile GPUs. *Mitigation:* Fidelity Tiers + auto-fallback to Static Timeline (FR-26, FR-28); postprocessing restraint.
- **Spectacle buries substance (medium):** recruiters bounce if they can't get facts fast. *Mitigation:* Content Truth Layer + SM-C2 counter-metric + always-visible résumé/rail.
- **Accessibility as afterthought (medium):** easy to skip on a canvas site. *Mitigation:* a11y is MVP (FR-25, FR-27, FR-28); SM-C3 guardrail.
- **Never-ships polish trap (medium):** infinite worldbuilding. *Mitigation:* ship MVP publicly, iterate era-by-era.
