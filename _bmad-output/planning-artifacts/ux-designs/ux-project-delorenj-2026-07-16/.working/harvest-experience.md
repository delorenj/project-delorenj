# EXPERIENCE Harvest — Career Ascent (Jarad DeLorenzo Portfolio World)

Source-grounded interaction/experience signal for an `EXPERIENCE.md`. Verbatim names preserved from PRD / SPEC / capability-traceability / epics. Product north star: **credibility over spectacle** — the site must be remembered and *cited* in hiring conversations and survive a skeptical Staff/Principal reviewer at three co-equal layers: **content, performance, and source code**. Two co-equal layers: **Spectacle Layer** (WebGL world, the hook) and **Content Truth Layer** (SSR HTML, what a recruiter actually uses). **DOM is truth; WebGL is a leaf enhancement island.** Neither is sacrificed for the other.

---

## (a) Named Personas + User Journeys (with climax beats)

Five named Key User Journeys (§2.3). FRs reference them by ID ("realizes UJ-N").

### UJ-1 — Dana, a technical recruiter *(NORTH-STAR journey)*
- **Persona/context:** Screens senior/staff engineering + AI candidates. ~2 minutes, a dozen tabs open, strong bias toward closing anything slow or confusing.
- **Entry state:** unauthenticated, arrives via a shared link, desktop, cold.
- **Path:** World loads on the ground (radio hardware, waveforms). A **one-line orientation cue** tells her she can scroll or jump. She scrolls; camera climbs through time-themed eras. Notices a **persistent timeline rail** and a **"download résumé" affordance**. Clicks the top era ("AI") on the rail.
- **CLIMAX:** The camera **launches** — accelerating past earlier eras, through clouds, into orbit — settling on the agentic-AI station. A Detail Panel opens with real, readable text and links. *She gets it: a quarter-century, ground to orbit, ending in AI.*
- **Resolution:** Downloads résumé, clicks to GitHub, flags Jarad for a callback.
- **Edge case:** If the world can't render (old GPU / WebGL off), she sees the **Static Timeline** with the same facts + links, **and never notices anything was missing.**

### UJ-2 — Marcus, a founder (drills for depth)
- **Persona/context:** Hiring a founding/staff engineer; wants proof of scale + systems thinking, not vibes. Willing to spend 5+ minutes.
- **Entry state:** unauthenticated desktop, motivated.
- **Path:** Jumps to the **stratosphere (Justworks) waypoint**, opens artifact cards (**TimeEngine, Payment Center, distributed systems**), follows glowing **Relationship Lines** connecting a pattern here to an AI capability later, ascends to the orbit/AI era + the **Axioms of AI**.
- **CLIMAX:** He sees the **through-line rendered** — *SagePoint's skill taxonomy → RAG; BAE's signal discipline → architecture → orchestration* — and realizes the career wasn't a random walk; **it converged.**
- **Resolution:** Opens a project write-up (MDX) + a Medium essay in new tabs, reaches the contact affordance.
- **Edge case:** **Deep-linking a specific era via URL** lands him directly at that waypoint with the panel open, shareable to a co-founder.

### UJ-3 — Priya, a senior engineer (delighted, shares)
- **Persona/context:** Peer who appreciates WebGL/interaction craft; found the link on social. Curious, playful.
- **Entry state:** desktop.
- **Path:** Free-scrolls slowly to feel parallax + camera tilt, **grabs and inspects floating artifacts**, watches idle cards drift/orbit, **pivots the camera to look up/down like a rocket.**
- **CLIMAX:** A moment of *"how did they do that"* — the physics, era set pieces, sense of altitude.
- **Resolution:** Copies the link, shares with the takeaway **"best portfolio I've seen this year."**
- **Edge case:** On a mid-range laptop the experience **quietly drops to a lower fidelity tier** rather than stuttering.

### UJ-4 — Sam, vestibular sensitivity (motion-safe parity)
- **Persona/context:** Has `prefers-reduced-motion` set OS-wide; large parallax/camera moves make them ill.
- **Entry state:** desktop or mobile, reduced-motion signaled by OS.
- **Path:** Site detects reduced-motion and presents an **elegant Static Timeline** — same eras, artifacts, text, links as a navigable vertical timeline, **no camera flight or parallax**; motion limited to gentle, opt-in transitions.
- **CLIMAX:** Sam reads the whole career comfortably and **never has to fight the interface.**
- **Resolution:** **100% of the content value with 0% of the motion cost.**
- **Edge case:** A **visible, discoverable toggle** lets *any* visitor switch between World and Static Timeline regardless of OS setting.

### UJ-5 — Alex, a skeptical staff engineer (opens the source to call the bluff)
- **Persona/context:** Has seen a hundred flashy portfolios; assumes the impressive part is a template or **AI slop**. Wants to know if the person can actually engineer.
- **Entry state:** on the site, mildly impressed, reflexively looking for the repo link.
- **Path:** Finds the **surfaced-by-design link to the public source**, clones/browses, reads architecture, module boundaries, docs, commit hygiene. Trips over an **Easter Egg** planted in the source and notices the **Embedded Team Guidance** ("for whoever's editing this next").
- **CLIMAX:** The realization that the code is **disciplined AND deliberately AI-aware** — the site is a working demonstration of *directing AI to build to a real engineer's standard.*
- **Resolution:** Skepticism flips to respect; **Alex becomes the strongest possible advocate.**
- **Edge case:** Even a hostile reader who dislikes the concept has to **concede the engineering underneath is legitimate.**

*(Named minor persona: **Inspector / Challenger** — glossary term for the UJ-5 archetype who reads source to test whether the craft is real.)*

*(Builder persona, non-journey: **Jarad** — "a living artifact of my career and my Axioms of AI that is unmistakably mine — a spiritual successor to jaradd.com (2006).")*

---

## (b) Information Architecture — every surface/route + navigation model

### Primary surface
- **Career World** — the single continuous rendered environment; the whole experience, not a page. Carries persistent **Timeline Rail + HUD + résumé/contact affordances**.

### Altitude Bands (vertical zones, altitude increases with time)
`ground` → `low-atmosphere` → `clouds` → `stratosphere` → `orbit` → `deep-space` (Glossary values). Bands are **non-decreasing** along the Career Sequence (equal allowed).

### Canonical Era set (§4.2 FR-6) — 9 Eras (Prologue = Era #0)
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

**MVP renders 4 waypoints across 4 bands + the deep-space Axioms bookend:** BAE (#1, ground), Warby (#3, clouds), Justworks (#6, stratosphere), ACD/IntelliForia (#7, orbit); Axioms (#8, deep-space) is part of the top signature bookend. Fidelity strategy: **full-realized 3D reserved for the two signature bookends** (ground radio-waves BAE, orbit→deep-space AI/Axioms); transitional eras get lighter kinetic-type/particle/wireframe treatments.

### Surfaces / routes
- **Career World / home** (root `/`) — the world experience; root vs per-era content is differentiated + canonicalized to avoid self-competition.
- **Per-Era deep links** — `/journey/[era]` (example given: `/journey/computer-vision`). Real History-API routes, **no hash/fragment routing**. Each carries unique SSR title/meta/canonical, `Person` JSON-LD mirroring the DOM 1:1, OG/Twitter cards + static preview image, restorable scroll waypoint.
- **Static Timeline** — reduced-motion / no-WebGL fallback surface; **one artifact serving four jobs**: SEO body, `<noscript>` mirror, reduced-motion mode, low-end/mobile/context-lost fallback. Mirrors every Era, Detail Panel, résumé, and link.
- **Detail Panels** — per-Era and per-Artifact HTML overlays (Content Truth Layer), opened from an Artifact or Waypoint.
- **Résumé / CV** — authored once in **MDX (single source)**, rendered as accessible crawlable HTML page + exportable PDF from the same source; affordance reachable from persistent UI, not buried in one Era.
- **Project / case-study detail** — long-form write-ups authored as HTML/MDX, each reachable by its own URL, readable without the Spectacle Layer.
- **Source-as-Exhibit** — public repository; link is **persistent Content Truth Layer UI** (not easter-egg-gated), present in the Static Timeline too. Includes `CONVENTIONS.md`, `AGENTS.md`/`CLAUDE.md`, per-module docs, a published **build case study**, a CI-guarded source-resident Easter Egg, source-available "look, don't reuse" license.
- **About / Axioms of AI** — deep-space climax content: Jarad's authored framework (**AI/HE Ratio**, "agent as employee," requirements & acceptance criteria as forces).
- **404 / not-found** — an unknown or renamed Era slug returns a **graceful 404 that drops into the Static Timeline** (never a blank canvas); previously-published slugs stay resolvable via redirect/alias policy.
- **External:** LinkedIn (`linkedin.com/in/delorenj`, authoritative career source), GitHub, Medium (essays), contact (email + LinkedIn, **no form in v1**).

### Navigation model
- **Timeline Rail** — persistent Content Truth Layer affordance listing Eras/years; selecting one triggers a **Waypoint jump** (FR-3). Reflects Career Data Layer order; highlights current Era as visitor moves.
- **HUD** — persistent readout of current year and/or altitude + overall progress.
- **Waypoints** — one navigable anchor per Era (Prologue = Waypoint #0) the camera can jump to; in-world Waypoints selectable too.
- **Career Sequence axis** — world is laid out along a **monotonic narrative ordering** (Prologue → … → Axioms), *not* raw calendar year; a monotonic year *label* is derived for display. The **Primary Track** is single-valued at every sequence position; concurrent/overlapping roles co-locate as artifacts within the dominant Era's band.
- **Single navigation/history authority:** `replaceState` tracks position during scroll (URL follows, no stacking); `pushState` only on explicit Waypoint selection; Back after deep-link entry is defined (returns to referrer / top anchor, never a broken state); no scene writes `history.*` directly.

---

## (c) UI States (exhaustive)

- **First-visit / diegetic onboarding:** teach *"scroll up = up in time and altitude"* within the **first 3–5 seconds** via an **in-world (diegetic) cue** — NOT a tutorial overlay (Bruno-Simon-style). A one-line orientation cue tells the visitor they can scroll or jump. Any consent UI must be sequenced **NOT to collide** with this 3–5s cue.
- **Loading (per-scene):** on approach/arrival a Scene shows a **bounded loading placeholder** until assets resolve — never a blank/broken canvas (FR-33).
- **Scene degraded / failure:** past a per-scene timeout or on fetch failure, a Scene degrades to a **low-LOD / billboard stand-in** or the Era's Detail Panel content; failure is **isolated** (does not cascade or trigger the coarse `webglcontextlost` → Static Timeline path).
- **Empty / no-data:** Career Data Layer is SSOT; unknown/renamed Era slug → graceful 404 → Static Timeline (never blank).
- **Error / not-found:** graceful 404 dropping into Static Timeline.
- **Slow / flaky network:** a waypoint jump (FR-3) or deep link (FR-21) can reach an Era **faster than its R2 assets stream** — bounded loading covers in-flight assets; degraded fallback covers slow/failed fetches.
- **Cold deep-link entry:** camera is **PLACED** at the Waypoint with its Detail Panel open — **does NOT play the from-ground launch tween** (would delay LCP / risk CLS). Reduced-Motion anchors instantly. **Only in-session selections trigger the FR-3 launch.**
- **Reduced-Motion Mode:** entered when `prefers-reduced-motion` set OR visitor toggles it. Spectacle **OFF by default in code**, enabled only when `prefers-reduced-motion` does *not* match; a single flag gates all camera launch/parallax/physics, re-evaluated on the `matchMedia` change event. Uses native/instant scroll, jump/crossfade instead of camera launch, renders the same Static Timeline. Tilt fully suppressed; idle physics drift paused.
- **Low-tier / no-WebGL:** **Fidelity Tier 0–3 scale.** Tier 3 = full, tier 2 = reduced, tier 1 = minimal, **tier 0 = Static Timeline (no WebGL)**. Boot-time GPU tier detection (`detect-gpu`) + runtime monitor with hysteresis (shed order: **postprocessing → particle count → DPR → LOD**). Auto-downgrade one tier if avg FPS < 40 for > 2s. Tier 0 / no-WebGL2 / context-lost ⇒ Static Timeline. Manual override available. (Reduced-Motion is **orthogonal** — a motion preference, not a Fidelity Tier.)
- **Mid-session WebGL context loss** (iOS-Safari-likely): falls to Static Timeline **anchored to the visitor's current Era**, re-opens the equivalent Detail Panel where possible — **does not dump them to the top.**
- **Mobile simplified mode:** adapts to a performant lower-fidelity spectacle (Tier 1–2, reduced effects, touch nav) preserving all content; holds mobile frame budget or drops to Static Timeline rather than stuttering.
- **Inspect state:** an inspected Artifact enters `inspect` Motion Mode and returns cleanly to the world on release/close (post-MVP physics).
- **Detail Panel open state:** single panel controller — **one `activePanel` at a time**; opening moves focus in, closing restores focus to the trigger; no second panel simultaneously open.
- **Film-beat per-era states:** each era is **entrance → *hold* → exit**; the **hold** is a calm, readable state where the eye and résumé content breathe.

---

## (d) Accessibility Floor (WCAG 2.2 AA committed launch gate; + 2.3.3 AAA via reduced-motion)

Accessibility is a **first-class launch gate, not a floor/afterthought.** SM-C3: never trade a11y for wow.

- **Reduced-motion parity:** a **primary designed mode**, not "animations off." Spectacle OFF by default in code; single flag gates all launch/parallax/physics; re-evaluated on `matchMedia` change. Plus a **persistent, keyboard-reachable in-UI pause/reduce toggle** (OS setting alone does not satisfy **2.2.2** for ambient motion > 5s). Reduced-Motion delivers **full content parity**.
- **Flash safety (PEAT, WCAG 2.3.1 Level A — hard gate, applies even in full-motion mode):** no effect (launch flash, bloom flicker, ignition, strobe) flashes **> 3×/sec at large area / high luminance**; PEAT-verify launch + deep-space effects; PEAT check runs in CI as a hard gate.
- **Keyboard / focus:** every era is a **real focusable `<button>/<a>` in logical DOM order**, Enter/Space-activatable, triggering the **same navigation as a click** — **NEVER raycast-only selection.** Skip-link is first tab stop → `<main>`. Heading order h1 (name) → h2 (per era). **No keyboard trap in the canvas.** Opening a panel moves focus in; closing restores to the trigger.
- **Focus-not-obscured + dual-backdrop ring (2.4.11):** never `outline:none`; a visible ring **rendered above the canvas**, ≥ **3:1 contrast**, legible on **both bright-cloud AND deep-space backdrops** (halo / double-outline, **not color-only**); focused element **never obscured.**
- **Canvas semantics + SR era/year announcements:** canvas `aria-hidden` (decorative) or `role="img"` + `aria-labelledby` to visible DOM text. Current Era/year exposed to assistive tech as a **polite ARIA live region**, announcing Era changes on **scroll-settle** and on **Waypoint arrival**. The "moving through time" cue **must not be visual-only**; Static Timeline conveys the same ordering.
- **Text contrast over dynamic backdrop (1.4.3):** all persistent Content Truth Layer text (**HUD, Timeline Rail, panel chrome**) holds ≥ **4.5:1** against the **worst-case** backdrop across the full ascent — via scrim/plate or luminance-adaptive treatment — verified at brightest + darkest bands.
- **Touch targets (2.5.8 Target Size):** Timeline Rail + mobile controls.
- **Reflow (1.4.10) at 400%:** pinned-canvas + overlay layout must not require **2-D scroll** of content.
- **Forced-colors / `prefers-contrast`:** handled for the DOM layer.
- **Min font / readability:** the **hold** state is calm and readable; all primary text stays in DOM (never trapped in WebGL) for reading, search, links, keyboard, SEO.
- **Degrades deterministically to ONE Static Timeline** serving four jobs; reduced-motion / Tier 0 / no-WebGL2 / context-lost all deliver **full content parity** (every Era, panel, résumé, link present).

---

## (e) Interaction Primitives

- **Scroll → sequence (FR-1, FR-2):** scroll deterministically maps to a monotonic **Career Sequence** position → drives camera altitude + derived year label. **Monotonic** (scrolling one direction never moves sequence backward; HUD year label never decreases while scrolling up). **Virtual Scroll** decouples from literal document height → stable across viewports. Free-scroll camera is a **smoothed (damped) follow**, not 1:1 rigid coupling; no dropped input (rapid scroll still resolves to the correct final Era). Target feel "responsive, not mechanical."
- **Waypoint-jump tween + interruption (FR-3):** select any Era (Timeline Rail or in-world Waypoint) → camera performs a **nonlinear "launch" tween** (accelerate, arc, ease-in), entering `waypoint-jump` Motion Mode. **Travel duration scales with distance** between current and target (farther = longer, bounded). **Interruptible:** a new selection or manual scroll cleanly takes over **without visual snapping**. On arrival → Motion Mode returns to `free-scroll` + target Detail Panel available/opened. One scrubbable camera **playhead** is tweened — never a second camera system.
- **Camera orientation / flight feel (FR-4):** camera **pivots to look up/down + tilt** driven by scroll velocity + direction (rocket/ascent feel). Tilt capped at documented max degrees, returns to neutral at rest, **fully suppressed in Reduced-Motion**. Camera-mode variety across bands (**ground dolly, arc into clouds, orbital tumble**) keeps a long ascent from feeling monotonous.
- **Inspect (FR-23, post-MVP):** grab / move / focus select Artifacts → enters `inspect` Motion Mode → can open corresponding Detail Panel → returns cleanly to world on release/close.
- **Physics idle motion (FR-22, FR-24, post-MVP):** floating/artifact cards behave as **soft-physics bodies** that drift/orbit gently when idle (bounded — never off-scene or jittering); satellites/debris/stations orbit + collide softly. Paused under Reduced-Motion / low Fidelity Tier (≤ Tier 1).
- **Hover / grab (UJ-3):** grab + inspect floating artifacts; pivot the camera to look up/down like a rocket.
- **Keyboard (FR-27):** move between Eras, open/close panels, reach all links; Enter/Space activation firing the same navigation as click.
- **Motion Modes (state machine):** `free-scroll` (visitor scrolls) · `waypoint-jump` (nonlinear tween to a Waypoint) · `inspect` (focused on one artifact).
- **Input latency:** perceptible response **< ~100 ms**; camera/scroll sustains the frame budget (60 fps desktop, ≥ 45 fps mid-range phone).

---

## (f) Microcopy Voice / Tone Cues (§11 Aesthetic & Tone)

- **Voice (product text & copy):** **confident senior systems-architect** — *precise, a little wry, never boastful*; lets the arc and artifacts do the bragging.
- **Feel:** grand, cinematic, "video-game-loop rendering" of a continuous world; parallax depth; a sense of **magnitude** and **time**. A spiritual successor to **jaradd.com (2006)** — inventive, unmistakably personal, "revolutionary for its moment."
- **Per-era mood:** ground = grounded/engineered/physical (radio lab); web era = kinetic/creative/high-gloss; clouds = ascent/interpretation (vision); stratosphere = systems-at-scale/pattern-recognition; orbit = frontier/agentic; deep space = identity/framework (Axioms).
- **Pacing — film beats:** each era = **entrance → *hold* → exit**; the **hold** is calm and readable so the eye and résumé content breathe.
- **Restraint — one defended idea:** the **vertical time+altitude ascent** is *the* idea; protect it. **No shader-zoo** where every scene competes as a hero and nothing breathes.
- **Altitude legibility via atmosphere:** "higher = later / more advanced" must read from **first-class per-era atmospheric art direction** (fog density, horizon curvature, haze, star-field) — **not camera height alone.**
- **Onboarding — diegetic first-cue:** teach "scroll up = up in time and altitude" in the first **3–5 seconds** via an in-world cue, not a tutorial overlay.
- **Anti-references (explicitly avoid):** a generic template landing page; "five giant scroll sections with big empty gaps"; spectacle that sacrifices readability; effects that feel like a tech demo with nothing to say; a shader-zoo with uneven era-to-era fidelity.
- **Sharing takeaway to engineer for (UJ-3):** *"best portfolio I've seen this year."*
- **Source-as-Exhibit tone:** the site is AI-built **and that is the point, not a disclaimer** — the medium becomes the message; the repo actively **invites hostile inspection** ("inspect/challenge me").
- **Two positioning one-liners the copy answers:** *"this is not someone who merely worked at companies; this is someone who has lived through multiple eras of software … and carried them into the AI era"*; and the hiring-manager blunt truth the design must beat — *"if the most interesting technical thing in your portfolio is the portfolio website itself, you have a problem."*

---

## Cross-cutting experiential invariants (load-bearing for EXPERIENCE.md)

- **Experience is a first-class acceptance test** (§16): *"Does it feel right when you scroll it?"* is a gate alongside functional correctness and perf budgets. Every spectacle story carries an **experiential acceptance criterion** (e.g. Story 2.2: "scrolling the BAE ascent *feels* responsive and cinematic, not mechanical").
- **Truth-layer-first, demo-first walking skeleton:** SSR Content Truth Layer + Static Timeline stands up first (Epic 1), then one real Era proves the piloting loop (Epic 2 — BAE), then full ascent (Epic 3), then a11y/perf launch gate certified (Epic 4), then Source-as-Exhibit + instrumentation (Epic 5), delight/worldbuilding post-MVP (Epic 6).
- **Single-authority runtime** (never jitters): one GlobalCanvas (switch scenes by visibility, never remount), one scroll authority (GSAP ScrollTrigger on Lenis — **no `drei ScrollControls`**), one RAF loop, one scrubbable camera timeline, one navigation/history authority, one panel/focus controller, one analytics event schema, one runtime quality monitor. Never `setState` in `useFrame`/scroll callbacks.
- **Instrumentation experiential signals (FR-34, SM-2):** scroll-traversal arrival vs. jump arrival are **distinct named events** keyed by Era slug (so completion depth is measured distinctly from rail-jump arrivals); plus résumé download, outbound/repo clicks, shares/revisits. DNT/GPC honored; consent UI keyboard- + reduced-motion-safe and sequenced off the 3–5s onboarding cue.

---

Relevant source files (all absolute):
- `/home/delorenj/code/project-delorenj/_bmad-output/planning-artifacts/prds/prd-project-delorenj-2026-07-15/prd.md` (personas §2.3, FR/NFR §4/§10, accessibility §10, aesthetic/tone §11, IA §12, platform §13, risks §15, ways-of-working/walking-skeleton §16)
- `/home/delorenj/code/project-delorenj/_bmad-output/specs/spec-project-delorenj/SPEC.md` (CAP-1…CAP-10, constraints, success signal)
- `/home/delorenj/code/project-delorenj/_bmad-output/specs/spec-project-delorenj/capability-traceability.md` (CAP↔FR↔AD map, non-disposable foundations, walking-skeleton slice)
- `/home/delorenj/code/project-delorenj/_bmad-output/planning-artifacts/epics.md` (Epics 1–6, per-story ACs incl. experiential ACs, FR/NFR coverage map)

Note: the PRD references a companion `addendum.md` (§C constants, §J/§L/§N implementation) and an `ARCHITECTURE-SPINE.md` (19 ADs, pinned stack) that were not in the read set but govern exact numeric feel-constants (tilt max, smoothing time-constant, scroll-notches-per-year ≈ 3–5) and the binding decisions cited throughout.