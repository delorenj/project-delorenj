---
title: 'Adversarial Review — Career Ascent Architecture Spine'
type: architecture-review
method: adversarial-divergence-hunt
target: '../ARCHITECTURE-SPINE.md'
reviewer: 'adversarial spine reviewer'
created: '2026-07-16'
verdict: NEEDS-WORK
---

# Adversarial Review — "Two conforming units that still build incompatibly"

**Method.** For each candidate hole I name two units **one level down** from the spine
(two Era Scene Chunks; the scroll authority vs the router; a scene vs the Static Timeline;
two developers implementing different epics). I show that **both obey every AD to the letter**,
then show the **incompatibility** that survives, then propose the **tightening** (new AD or
amended Rule). The bar is: divergence the *current* ADs do **not** pin.

**Verdict: NEEDS-WORK.** The topology is genuinely strong — AD-3/AD-4/AD-5/AD-7 close the
classic R3F self-inflicted wounds cleanly, and AD-1/AD-2/AD-10 are load-bearing and correct.
But the spine **adopts addendum §D verbatim as its schema**, and §D models one conceptual Era
with **two overlapping entities that duplicate the band and the year range** — so the SSOT (AD-1)
is violated by its own adopted types. On top of that, three cross-cutting *authorities* that the
spine's own paradigm promises ("each cross-cutting concern has exactly one authority") are **not
actually named**: the URL/History writer, the analytics event schema, and the Detail-Panel/focus
controller. Two of these (Era identity, History authority) are foundational — you cannot safely
start Epics until they are pinned, because every surface reads/writes them. The rest are HIGH/MED
tightenings. None of this is a topology failure; it is **under-specification at the seams**.

---

## HOLE 1 — [CRITICAL] The Era is modeled by TWO entities that each duplicate `band` and the year range. AD-1's "defined once" is satisfied by *each type* while the fact still diverges.

**The two units.** Developer A owns the **sequence/world-layout** epic and edits
`data/sequence.config.ts` (`EraSegment`, addendum §C). Developer B owns the **content/panel/route**
epic and edits `data/career/` (`CareerWaypoint`, addendum §D). The spine's Conventions row
"Data & formats" adopts **both** verbatim: *"types per addendum §D: `EraSegment`, `CareerWaypoint`…"*.

**Both obey every AD.** AD-1 says *"every Era… is defined once in the typed Career Data Layer…
and read by every surface."* Each developer defines their Era record exactly once, in one typed
file, and every surface reads it. Neither hardcodes a fact in scene logic. AD-1 is satisfied **to
the letter by each**.

**The incompatibility.** The two types **both** carry the same facts:
- `EraSegment.band: AltitudeBand` **and** `CareerWaypoint.altitudeBand: AltitudeBand` — the band
  is stored twice.
- `EraSegment.yearLabelStart/End` **and** `CareerWaypoint.startYear/endYear` — the year range is
  stored twice.

Nothing in the spine declares the **identity** between an `EraSegment` and a `CareerWaypoint`
(is `EraSegment.id === CareerWaypoint.id`? one Era, or a segment-id vs a waypoint-id?), and nothing
declares which type **owns** `band`/years. So Dev A sets `EraSegment.band = "clouds"` for Warby
while Dev B sets `CareerWaypoint.altitudeBand = "low-atmosphere"`. **Both typecheck, both "define it
once," CI is green** — and now the world lays Warby out in the clouds band (reads `EraSegment.band`)
while the HUD, the per-era route `<meta>`, and the panel say low-atmosphere (read
`CareerWaypoint.altitudeBand`). AD-8's "Altitude Band is non-decreasing along the sequence" is
checkable only against *one* of the two fields; the other can silently violate it. This is the exact
failure AD-1 exists to prevent — a per-Era fact carried differently by two surfaces — re-introduced
by the adopted schema.

**Tightening (new AD, or amend AD-1 + Conventions).** Declare a **single canonical Era entity**
keyed by the kebab-case `id` (= route slug), and make `EraSegment` and `CareerWaypoint` either
(a) one merged type, or (b) explicitly **derived projections** of it with
`EraSegment.id === CareerWaypoint.id === slug` enforced, where **`band` and the year range are owned
by exactly one** (recommend `EraSegment`, since AD-8 makes the sequence the axis) and the other
type **references, never restates** them. Kill the duplicate `altitudeBand` and `startYear/endYear`
from `CareerWaypoint`. Add a schema/CI invariant: one record per `id`, band/years present exactly once.

---

## HOLE 2 — [CRITICAL] No single Navigation/History authority. AD-4 (scroll), AD-11 (routing), and the Next.js App Router each legitimately write position/history. A scene, the rail, and the scroll loop can all push/replace.

**The two units.** The **scroll authority** module in `scroll/` (AD-4) and the **Timeline-Rail /
per-era route** pair in `truth/rail/` + `app/journey/[era]/page.tsx` (AD-11).

**Both obey every AD.** AD-11 says *"`replaceState` tracks scroll position (no history stacking);
`pushState` only on explicit Waypoint selection."* So the scroll authority, being the single owner
of scroll (AD-4), legitimately calls `replaceState` on scroll-settle to keep the URL on the current
Era. The Rail, on selection, legitimately calls `pushState`. The route component, on URL change,
legitimately places the camera (AD-11 cold-load). **Every one of these is AD-compliant.**

**The incompatibility.** AD-11 specifies the *history semantics* but never names the **single writer**.
Result:
1. **Two history writers race.** A Rail selection → `pushState(/journey/warby)` starts an AD-7 jump
   tween. The tween scrubs scroll (AD-7 "tweens the same playhead"), which the scroll authority sees
   as scrolling and answers with `replaceState` on every settle — so the explicit `pushState` is
   immediately chased by `replaceState`s, and "Back after a deep-link entry is defined" (AD-11) is
   in practice undefined: which entry is on the stack?
2. **Raw History desyncs the Next router.** AD-11 routes are Next.js App-Router routes; Next owns the
   History API for client navigation. If the scroll-sync writer uses raw `history.replaceState`,
   Next's router state no longer matches the URL — Back/forward and `<Link>` prefetch break. If it
   uses `router.replace`, every scroll-settle triggers a Next navigation. Neither is pinned.
3. **A scene can push.** Nothing forbids a Scene Chunk (or a deep-linked panel auto-open) from
   nudging the URL; AD-11 only *describes* when push should happen, it does not restrict *who may call*.

**Tightening (new AD).** Name a single **Navigation/History authority** (e.g. `app/navigation/`) that
is the **sole writer** to history. It (a) writes exclusively through the Next router API (never raw
`history.*`) so router state stays coherent; (b) derives the URL from the scroll authority's *current
Era* via a **debounced** subscription and uses shallow `replace` for scroll-tracking; (c) is the only
caller of `push` (on explicit Waypoint selection); (d) makes route→placement strictly **one-way**
(URL change places the camera via the cold-load path; camera/scroll motion re-navigates *only* through
this one debounced writer). No scene, rail, or scroll module writes history directly.

---

## HOLE 3 — [HIGH] No single analytics event-schema authority. FR-34/SM-2 require distinguishing scroll-traversal from jump-arrival across World, Rail, and Static Timeline — three surfaces, three ad-hoc event shapes, no schema owner.

**The two (three) units.** The **World scroll surface** (`spectacle/`+`scroll/`), the **Timeline Rail**
(`truth/rail/`), and the **Static Timeline** (`truth/StaticTimeline/`) — all of which reach Eras and
must report it (SM-2 is reported separately for desktop *and* mobile; the Static Timeline is the mobile
/ reduced-motion surface).

**Both obey every AD.** There is **no AD for the analytics event contract.** The only governance is the
Conventions "State & cross-cutting" line: *"Analytics is privacy-first, honors DNT/GPC, and its consent
surface is sequenced…"* — a privacy/consent rule, **not a schema**. So each surface emits whatever it
likes and is fully compliant.

**The incompatibility.** SM-2 *requires* "reach the `orbit` era, measuring scroll-traversal depth
distinctly from jump arrivals." Three surfaces implement it three ways:
- World: `track('era_reached', { era: 'warby-parker', via: 'scroll' })`
- Rail: `track('waypointArrival', { eraId: 'warby', method: 'jump' })`
- Static Timeline: `track('timeline_view', { section: 'Warby Parker' })`

Different event names, different Era keys (kebab slug vs label vs display string — note the Naming
convention pins the *slug* but nobody applied it to analytics), different property keys
(`via`/`method`/none). The metric **cannot be computed**: you can't tell the two SM-2 paths apart, and
you can't join across surfaces. SM-2 is the **primary** success metric (§7), so this silently defeats
the reason FR-34 exists. This is a "soft convention, not an AD" gap the prompt specifically warned about.

**Tightening (new AD).** Add a **single analytics event-schema authority**: a typed event registry
(e.g. `data/analytics-events.ts` or a `state/` module) defining every SM-backing event's canonical
name, its Era key (**always the kebab-case slug**, reusing the Naming convention), and its property
shape (`via: 'scroll' | 'jump' | 'deep-link'`, `surface: 'world' | 'static-timeline'`). Every surface
emits **only** through one typed `track()` bound to this registry; CI type-checks emitters against it.

---

## HOLE 4 — [HIGH] The "adjacent-era window" is "defined" but not defined *anywhere single*, and the per-scene-fallback (AD-14) vs coarse-context-lost (AD-9) boundary has no single owner. Two scenes classify residency and failure differently.

**The two units.** `RadioLabScene` and `StratosphereArchitectureScene` (any two Era Scene Chunks,
AD-14), plus the GlobalCanvas-level context handler (AD-9).

**Both obey every AD.** AD-14 says GPU textures/geometry are *"disposed/reloaded outside a defined
adjacent-era window"* and each scene has *"a bounded loading state + degraded per-scene fallback…
isolated and never triggers the coarse context-lost → Static Timeline path."* AD-9 says
*"`webglcontextlost` ⇒ the Static Timeline."* Both scenes implement a window and a fallback. Compliant.

**The incompatibility.**
1. **Window units diverge.** AD-14 never says *where* the window is defined or in what units.
   `RadioLabScene` treats "adjacent" as `order ± 1`; `StratosphereArchitectureScene` treats it as a
   world-distance threshold in Y. Because era spans vary from `SPAN_MIN 1.0` to `SPAN_MAX 3.5`
   (§C/AD-6), `order±1` and a fixed distance are **not equivalent**. During an AD-7 waypoint-jump
   crossing five segments fast, the order-based scene keeps ±1 resident while the distance-based scene
   disposes its own textures *while the camera is flying through it* → a blank scene mid-launch (an
   FR-33 violation reached by two compliant policies). And because each scene sizes its own residency,
   the **sum** of resident texture memory can blow AD-13's ≤256–384 MB mobile budget even though each
   scene is individually "fine" — AD-13's CI gate checks the *static* `perf-budget.json`, not the
   *runtime resident set*, so CI stays green.
2. **Failure classification diverges.** The boundary between "isolated per-scene asset failure →
   billboard" (AD-14) and "coarse `webglcontextlost` → Static Timeline" (AD-9) has no single owner.
   If R2 is fully down, **every** scene independently shows its own billboard and the experience
   **never** escalates to the Static Timeline, even though the whole world is broken. Conversely, a
   scene error boundary (Conventions: *"a scene load error… never throws to the canvas"*) may **swallow**
   a genuine context-loss as a per-scene fallback, so the global AD-9 path never fires. Two scenes can
   route the *same* underlying WebGL error to *opposite* fallbacks.

**Tightening (amend AD-14 + AD-9).** Define the adjacent-era window **once**, in units, in a single
place (e.g. `sequence.config.ts` or `perf-budget.json`: `ADJACENT_WINDOW = ±1 segment by order`), and
make a single **residency authority** in `spectacle/quality` enforce the *runtime* resident-texture sum
against AD-13's budget (evict by order-distance) — scenes may not run their own window heuristic. Then
pin the **failure taxonomy**: asset fetch/decode failure = isolated (billboard); `webglcontextlost` /
WebGL2-unavailable / Tier 0 = coarse, owned **only** by the GlobalCanvas-level handler (not scene
boundaries); and N-simultaneous per-scene asset failures above a threshold **escalate** to the coarse
Static Timeline (the R2-down case).

---

## HOLE 5 — [HIGH] No single Detail-Panel/focus controller. Every surface can "open a panel, focus-managed" (FR-11/FR-27) its own way — two panels open at once, focus never restored to the trigger.

**The two units.** The in-world **Artifact handler** inside `OrbitAIScene` (AD-14) and the
**Static Timeline** (`truth/StaticTimeline/`, AD-10) — plus the Rail (FR-3 "panel opened on arrival")
and deep-link cold-load (AD-11) as further openers.

**Both obey every AD.** FR-11 requires panels be *"keyboard-dismissable and focus-managed,"* FR-27
requires *"opening… moves focus into it; closing restores focus to the trigger."* There is **no AD
naming a single panel controller.** The core-entities diagram shows both `ARTIFACT` and `WAYPOINT`
opening a `DETAIL_PANEL`, but not *through what*. So `OrbitAIScene` rolls its own portal + local React
state + `panelRef.focus()`, and the Static Timeline uses a shared controller with an `activePanelId`
store slice. **Each is independently "focus-managed."** Compliant.

**The incompatibility.**
- **Two open at once.** The scene opens its panel via local state; the Rail opens another via the store.
  Nothing enforces at-most-one-open, so two panels stack (FR-11 implies one; never stated).
- **Focus restore breaks.** FR-27 requires focus return to *the trigger*. The scene's trigger is a 3D
  raycast object, not a DOM node — the ad-hoc handler has no DOM element to restore focus to, so on
  close focus lands on `<body>` (a WCAG 2.4.3 regression), while the Static Timeline's controller
  restores correctly. Two surfaces, two different (one broken) focus contracts.
- **Desynced open-state.** With no single `activePanelId`, the Rail can highlight Era X's panel as open
  while the scene shows Era Y's.

**Tightening (new AD).** Name a single **Detail-Panel/focus controller** in `truth/panels/`, driven by
one discrete `activePanel: {type, id} | null` Zustand slice (AD-5 discrete state). Every opener —
Artifact, Waypoint, Rail, Static Timeline, deep-link — routes through it. It owns focus-move-in and
focus-restore-to-trigger (require every Artifact to register a real focusable DOM trigger, extending
§10's "every era is a real focusable `<button>`" to artifacts), enforces at-most-one-open, and is the
**same** code path in World and Static Timeline.

---

## HOLE 6 — [HIGH] Zustand slices have no single-writer ownership, and `cameraMode`/`activeEra`/`currentYear` are not classified as ref-vs-slice. Two writers, or the wrong storage class, either violate AD-5 or dead-end the HUD.

**The two units.** The **scroll authority** (AD-4) and the **waypoint-jump / motion controller**
(AD-7) — both of which mutate the shared store — plus the Rail, deep-link, and router as further writers
of `activeEra`.

**Both obey every AD.** Conventions: *"One Zustand store… components subscribe to discrete slices via
selectors only,"* and AD-5 reserves React re-render for *"discrete UI state only — `activeEra`,
`qualityTier`, `reducedMotion`, panel open/close."* Neither an owner-per-slice rule nor a
ref-vs-slice classification for `cameraMode`/`currentYear` exists. So both modules write freely.

**The incompatibility.**
- **`cameraMode` has three writers** (`free-scroll` from AD-4 settle, `waypoint-jump` from AD-7,
  `inspect` from FR-23). AD-7 tweens are *interruptible* by scroll (FR-3). When a jump is interrupted,
  the scroll authority sets `free-scroll` **and** the jump's `onComplete` later sets `waypoint-jump` —
  a race that flips the mode back. No single-writer rule forbids this.
- **`activeEra`/`activeWaypointId` have four writers** (scroll-settle, Rail, deep-link, router). A
  scroll-settle writing `activeEra=warby` mid-jump-to-justworks makes the HUD/Rail flicker.
- **`currentYear` is unclassified.** It changes continuously with scroll. If a dev makes it a store
  slice updated per scroll tick, that is `setState` in the scroll loop — a **direct AD-5 violation**
  (the #1 R3F failure AD-5 exists to prevent). If a dev makes it a ref (AD-5-safe), the HUD (a DOM
  component, FR-20) **cannot subscribe** to re-render on it and never updates. Both devs are "obeying"
  because AD-5 lists `activeEra` as discrete but is silent on `currentYear`.

**Tightening (amend AD-5 + Conventions).** Add a **store-ownership table**: each slice → its single
writer module + read pattern (ref vs selector). Pin `cameraMode` single-writer = the AD-7 motion
controller (scroll authority *requests* mode changes through it, never writes it). Pin
`activeEra`/`activeWaypointId` single-writer = the Navigation authority (Hole 2). Classify the HUD year
explicitly: the **derived year *label* changes only at Era boundaries** → it is discrete (re-renders
when `activeEra` changes), *not* per-frame; any continuous year value is a ref. State this so the HUD
neither storms re-renders nor dead-ends.

---

## HOLE 7 — [HIGH] Reduced-Motion: mount the canvas or not? AD-9 says "spectacle OFF by default… enabled only when prefers-reduced-motion does not match," while §L/§10 describe a still-rendered world that "crossfades instead of launches." Two surfaces implement opposite things and the "orthogonal to Fidelity Tier" claim is undercut.

**The two units.** The **island loader** in `app/layout.tsx` (AD-2/AD-9) and a **Scene Chunk's
reduced-motion path** (e.g. `VisionCloudScene`, AD-14/AD-9/§L).

**Both obey every AD.** AD-9 states *"spectacle is OFF by default in code, enabled only when
`prefers-reduced-motion` does not match"* and *"Tier 0 / … ⇒ the Static Timeline,"* while also binding
FR-25 (reduced-motion presents the Static Timeline). §L (adopted as the mechanism source) says
*"reduced mode uses… jump/crossfade instead of camera launch"* — which presupposes a **rendered world**
to crossfade. Both readings are textually supported.

**The incompatibility.**
- **Reading A (AD-9 literal):** reduced-motion ⇒ **no canvas mounted**, Static Timeline only. The loader
  reads `reducedMotion` and never mounts the island.
- **Reading B (§L/§10):** reduced-motion ⇒ world **still mounted** at the current Fidelity Tier, large
  motion suppressed, waypoint changes crossfade.

`VisionCloudScene` implements Reading B (a crossfade path that assumes it is mounted). Under a loader
that implements Reading A, that path is **dead code** and reduced-motion users get no world at all;
under Reading B, the loader wrongly hides the world. Two compliant units, opposite products. This also
undercuts the Glossary's *"Reduced-Motion Mode is orthogonal — a motion preference, not a Fidelity
Tier"*: if reduced-motion ⇒ Static Timeline, it is **operationally identical to Tier 0**, i.e. not
orthogonal. And the **runtime toggle** (AD-9's persistent in-UI reduce/pause) is unspecified: flipping
reduced-motion ON at Tier 3 mid-session either **unmounts** a live canvas (via which path? the coarse
context-lost path? a fourth path?) or merely **suppresses motion** — undefined and non-deterministic.

**Tightening (amend AD-9).** State explicitly whether reduced-motion mounts the canvas. Recommended:
**Reading B** to keep orthogonality real — "under reduced-motion the world MAY still render at the
current Fidelity Tier, but **all** motion (launch, parallax, tilt, physics, idle-drift) is suppressed
and waypoint changes anchor instantly / crossfade; only Tier 0 / no-WebGL2 / context-lost drops to the
Static Timeline." Then reconcile AD-9's "spectacle OFF by default" wording (it means *motion* off, not
*canvas* absent) and define the runtime-toggle transition (suppress-in-place, not unmount).

---

## HOLE 8 — [MED-HIGH] Data-field conventions the Conventions table doesn't nail: `positionHint` units/frame, world-Y ownership, slug↔id↔order canonical key, and TechNode membership.

**The units.** Two Era Scene Chunks placing their waypoint anchors (`RadioLabScene`, `OrbitAIScene`),
and two developers computing TechNode membership.

**Both obey every AD.** The Conventions table nails literals (band values, Motion Mode strings, Scene
`PascalCase`, kebab slug) and adopts §D — but says nothing about the *units or frame* of
`CareerWaypoint.positionHint: [number,number,number]`, nor how `EraSegment.order` relates to array
index, nor which year source governs TechNode overlap. All the following are compliant:

**Incompatibilities.**
1. **`positionHint` vs derived world-Y — two authorities.** AD-6/AD-8 make world-Y (altitude/offset)
   **derived** from `sequence.config` cumulative offsets. But `positionHint` is a hand-authored
   `[x,y,z]` sitting in the data layer. `RadioLabScene` reads `segmentScrollOffset(order)` for its
   anchor (AD-6-compliant); `OrbitAIScene` reads `positionHint[1]` as world-Y (it's in the data;
   AD-1 says read facts from the data). When `positionHint.y` disagrees with the derived offset, the
   panel opens but the camera stares at empty space. Units are also undefined (world units? offset from
   segment origin? normalized?).
2. **slug ↔ id ↔ order — three keys, no canonical join.** `EraSegment.order` is a separate integer from
   `id`; nothing forbids gaps or duplicate `order`s, yet `segmentsCrossed = Math.abs(order - order)`
   (§E) turns a gap into inflated travel and a dup into a two-era collision at one offset. Meanwhile the
   Scene→Era map (§F) keys by **number**, routing (AD-11) keys by **slug**, and the Rail may sort by
   array index — three orderings that can disagree.
3. **TechNode membership (FR-16) contradicts AD-8.** FR-16: *"A Tech Node only appears in Scenes whose
   Era overlaps the node's year range"* — but AD-8's whole point is that eras **overlap in year** (Warby
   2013 ⊂ ClassPass 2013–2016) and are separated only by **sequence**. A 2013 TechNode overlaps *both*
   Warby and ClassPass by year, so two scenes both claim it (FR-16 literal) — or a dev hand-assigns it,
   diverging. Year-overlap membership is incompatible with the sequence-single-track model.
4. **Era→SceneChunk binding is unpinned.** `CareerWaypoint.sceneTheme: string` is a free string; the 1→N
   case (Web/Agency → `WebEraScene` + `CreativeAgencyScene`) can't be named by one string. Dev A treats
   `sceneTheme` as the component key (breaks for N-scene eras); Dev B adds a `sceneChunks: string[]`.
   Divergent schema for "which scenes render this Era."

**Tightening (amend Conventions + AD-6/AD-8/AD-14).** (a) Pin `positionHint` frame/units: **world-Y is
always derived from `sequence.config`**; `positionHint` is **X/Z scene-local decoration only** (or an
explicitly bounded delta), never an alternate Y authority — or delete it. (b) Declare `id === slug` the
identity, require `order === canonical array index` (or derive `order`, drop the field), forbid
gaps/dupes via schema/CI, and key the Scene→Era registry by **slug**. (c) Change FR-16/AD-8 membership
from year-overlap to **explicit Era-`id` assignment** (or Primary-Track sequence position), consistent
with AD-8. (d) Add a canonical `sceneChunks: SceneId[]` to the Era entity (supporting 1→N, `SceneId`
matching the registry) and demote `sceneTheme` to art-direction only.

---

## HOLE 9 — [MED-HIGH] AD-6 says DOM heights and world offsets are "derived from one config," but not by one function with one viewport basis. `vh` (SSR-safe) vs `innerHeight` (client) drift on the mobile dynamic viewport — the exact CLS/desync AD-6 exists to prevent.

**The two units.** The **Content Truth Layer height derivation** (`truth/`, SSR, must be window-free per
AD-2) and the **Spectacle world-offset derivation** (`spectacle/`, client).

**Both obey every AD.** AD-6: *"the Sequence-to-Distance Mapping… is the single origin for both DOM
section heights and world waypoint offsets. Both are derived from it."* Both consumers read the same
`span` values from `sequence.config`. Compliant.

**The incompatibility.** `span` is in *"scroll screens"* (§C) — a screen-height multiple. Converting to
pixels needs a viewport height, and the two consumers can't share a basis at the same time: SSR
(window-free, AD-2) must emit `vh`/`svh` CSS, while the client world offset naturally uses
`window.innerHeight * span`. On mobile Safari, `100vh` ≠ `window.innerHeight` (the URL-bar dynamic
viewport), so the DOM section for an Era and its world waypoint offset **drift** — landing the camera
mid-transition and blowing CLS, precisely the drift AD-6 targets, while both consumers are "derived from
one config." "Derived from one config" is satisfied; "computed by one function against one measured
length" is not.

**Tightening (amend AD-6).** Pin a **single derivation**: one function resolves `span` → a canonical
length, and **both layers consume the same resolved value from one runtime source** (e.g. ScrollTrigger's
measured total scroll length, or a single JS-measured viewport height published to both) — not two
independent `vh`-vs-`innerHeight` computations. Name the dynamic-viewport basis explicitly (`svh`/`dvh`
or a shared measured height).

---

## HOLE 10 — [MED-HIGH] Shared rendering modules (AD-14) have no budget-ownership contract, and band transitions have no owner. Two scenes pass incompatible counts to the same instanced module; two adjacent scenes each render "their half" of a transition.

**The two units.** `RadioLabScene` and `OrbitAIScene`, both consuming the shared `spectacle/rendering/`
modules (AD-14), and the boundary between `VisionCloudScene` (clouds) and
`StratosphereArchitectureScene` (stratosphere).

**Both obey every AD.** AD-14 requires scenes be *"assembled from shared composable rendering modules…
not per-era pipelines."* Both scenes use the shared `<ParticleField>`; both are compliant. AD-13 sets
per-tier particle caps (≈100k/30k/10k/static) enforced by a **CI check against `perf-budget.json`**.

**The incompatibility.**
1. **Budget clamp ownership.** `RadioLabScene` passes `count={budget.particles[tier]}`; `OrbitAIScene`
   passes `count={50000}` (fine on its desktop). AD-13's CI gate validates the **JSON file**, not
   runtime literals inside scenes, so the hardcoded count sails through CI green while the **sum** of
   live draw calls/triangles blows the runtime budget — AD-13's stated failure mode ("each fine, the sum
   blows"), reached by two AD-14-compliant scenes.
2. **Transition ownership.** FR-9 forbids a discontinuous "pop" between bands. But is the cloud→
   stratosphere transition owned by the leaving scene, the entering scene, or a module between them?
   Unpinned — so each adjacent scene implements "its half" with a different fog curve and the boundary
   pops.

**Tightening (amend AD-13 + AD-14).** Require shared rendering modules to **read their caps from
`perf-budget.json`/tier internally and clamp** — scenes pass semantic intent, never absolute counts —
so an over-budget literal is impossible. Add a **dev-mode runtime budget assertion** summing live
draw-calls/triangles against the budget (not only the static CI check). Assign each **band transition to
a single inter-band transition module** (owned by the transition system, keyed by the band pair), not to
either adjacent scene.

---

## HOLE 11 — [MED] Known-but-unrendered (MVP-excluded) Eras have undefined navigation behavior. AD-11 covers unknown slugs and AD-10 exposes every Era, but a *known* slug with no rendered Scene falls between them.

**The two units.** The **Navigation/route** handler (AD-11) and the **World** for a deep-link to
`/journey/splash` (Era 5) — an Era that exists in the data and the Static Timeline but has **no MVP
Scene Chunk** (§6.1 renders only 4 waypoints; §F lists 9 scenes as the full-build target).

**Both obey every AD.** AD-11: *"Unknown/renamed slug → graceful 404 into the Static Timeline."*
`splash` is **not** unknown — it's a valid Era with a Static Timeline entry (AD-10 exposes every Era) and
a valid route. AD-11 also says cold-load *"places the camera at the Waypoint with its panel open."*
Both the "place the camera" path and the "it's a valid Static Timeline entry" path are compliant.

**The incompatibility.** One developer routes known-but-unrendered eras to the **Static Timeline entry /
panel** (there's no scene to place a camera in); another **places the camera** at the derived world
offset for Era 5 and opens the panel over an **empty world position** (no set piece). Same AD, two
products — one graceful, one a blank-ish waypoint. As the site ships MVP-first and grows era-by-era
(§16), this is a live case, not hypothetical.

**Tightening (amend AD-11 + AD-14).** Define behavior for **known-but-unrendered** Eras: they resolve to
the Static Timeline entry / panel; the World places the camera **only** for Eras with a registered Scene
Chunk. Give the Era entity a `rendered`/`hasScene` signal (or make the Scene registry the source) that
the Navigation authority (Hole 2) consults, so an Era gaining a Scene later is a pure config flip.

---

## HOLE 12 — [MED] First-run sequencing: the diegetic onboarding cue (Spectacle) and the consent surface (Truth) both own "the first 3–5 seconds" with no coordination authority.

**The two units.** The **diegetic onboarding cue** (§11 "teach scroll in 3–5s," lives in `spectacle/`)
and the **analytics consent surface** (FR-34, lives in `truth/`).

**Both obey every AD.** AD-9 is credited with *"consent sequencing"* and the Conventions line says the
consent surface is *"sequenced not to collide with the 3–5 s onboarding cue."* But the cue is authored
in the Spectacle island and the consent surface in the Truth layer, and **no single owner** schedules
the first-run timeline. Each ships independently and is "sequenced" only by hopeful intent.

**The incompatibility.** The consent banner (Truth, no knowledge of the island's readiness) renders at
`t=0`; the onboarding cue (Spectacle, no knowledge of the banner) plays at `t≈3–5s` after the island
hydrates — and they collide, the exact outcome FR-34/§11 forbid. Nobody owns the ordering across the
layer boundary.

**Tightening (amend AD-9 or Conventions).** Name a single **first-run sequence owner** (in `truth/`,
since it must exist before the island) that gates the onboarding cue and the consent surface into a
defined order and is the one place that decides which shows when — the Spectacle cue subscribes to it
rather than self-scheduling.

---

## Summary table

| # | Sev | Hole | Two units | Fix shape |
|---|-----|------|-----------|-----------|
| 1 | CRITICAL | Dual Era entities duplicate `band`/years; no identity/owner | `EraSegment` (Dev A) vs `CareerWaypoint` (Dev B) | New/amended AD-1: one canonical Era keyed by slug; band/years owned once |
| 2 | CRITICAL | No single History/Navigation authority | scroll authority (AD-4) vs router/rail (AD-11) | New AD: sole history writer via Next router; one-way route→placement |
| 3 | HIGH | No analytics event-schema authority | World vs Rail vs Static Timeline emitters | New AD: typed event registry, slug key, one `track()` |
| 4 | HIGH | Adjacent-era window & fallback taxonomy unpinned | two Scene Chunks + GlobalCanvas handler | Amend AD-14/AD-9: one residency authority; pinned failure classes |
| 5 | HIGH | No single Detail-Panel/focus controller | scene Artifact handler vs Static Timeline | New AD: one panel controller + `activePanel` slice |
| 6 | HIGH | Store slices lack single-writer + ref/slice class | scroll authority vs motion controller | Amend AD-5: ownership table; classify `currentYear`/`cameraMode` |
| 7 | HIGH | Reduced-motion: mount canvas or not (AD-9 vs §L) | island loader vs a Scene's RM path | Amend AD-9: pick Reading B; define runtime toggle |
| 8 | MED-HIGH | `positionHint` units, slug↔id↔order, FR-16 vs AD-8, Era→Scene bind | two scenes / two devs | Amend Conventions/AD-6/AD-8/AD-14 |
| 9 | MED-HIGH | AD-6 derived "from one config" ≠ one viewport basis (vh vs innerHeight) | SSR height vs client offset | Amend AD-6: one measured length, dynamic-viewport basis |
| 10 | MED-HIGH | Shared-module budget clamp & band-transition ownership | two scenes + a band boundary | Amend AD-13/AD-14: clamp inside module; transition owner |
| 11 | MED | Known-but-unrendered Era nav undefined | route handler vs World | Amend AD-11/AD-14: `hasScene` signal |
| 12 | MED | First-run cue vs consent surface, no scheduler | onboarding cue vs consent banner | Amend AD-9: single first-run sequence owner |

## What the spine already closes well (credit)

- AD-3 (one canvas, switch by visibility), AD-4 (single scroll + single RAF), AD-5 (no setState in
  frame loop), AD-7 (one scrubbable timeline reused for scroll and launch) — these are exactly the
  R3F failure modes that kill this class of project, and they are pinned cleanly.
- AD-2 + AD-10 (DOM truth; one Static Timeline serving four jobs) is the right spine for SEO/a11y/
  fallback parity, and the dependency rule (nothing imports `spectacle/` statically) is enforceable.
- AD-9's **single motion flag** does close the reduced-motion *flag* multi-owner hole (Hole 7 is about
  canvas-mount policy, not the flag).
- The single-authority *principle* is stated in the paradigm — the holes above are all cases where that
  principle was declared but the **specific authority was not named**. Naming them (Holes 2, 3, 5, 6)
  is the highest-leverage work.

**Bottom line.** Fix Holes 1 and 2 before any Epic starts (Era identity and the history writer are read/
written by every surface). Holes 3–7 should be pinned before the surfaces they govern are built. 8–12
can be tightened as their epics come up but should not be left to two developers to discover.
