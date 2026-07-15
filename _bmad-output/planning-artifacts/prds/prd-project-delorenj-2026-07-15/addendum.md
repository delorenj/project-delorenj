# Addendum — Career Ascent Portfolio World

*Companion to `prd.md`. This holds the technical **how**, rejected alternatives, and deep data/mechanism detail that were deliberately kept out of the capabilities-focused PRD body. It is **input for the downstream `bmad-architecture` workflow to ratify**, not an architecture decision record itself. Source: distilled from `ARCHITECTURE_DRAFT.md` and `BRAINDUMP.md` (both Jul 11). Treat specifics as proposals pending the Architecture phase.*

---

## A. Proposed Stack (to be ratified in Architecture)

**Primary:** Next.js + React Three Fiber + Three.js + GSAP ScrollTrigger + Zustand + Rapier.

Rationale: the product has two co-equal identities — a cinematic WebGL experience **and** a real, recruiter-navigable web property (SEO, routing, MDX, static fallbacks). R3F builds the 3D world as reusable React components; Next.js keeps it a shippable web property; GSAP ScrollTrigger drives scroll-linked, nonlinear, click-to-waypoint camera motion (scrub, pin, snap, timeline labels, velocity); Rapier gives real physics to floating cards / orbiting stations / debris.

**Supporting libraries:**
- `@react-three/fiber` — Three.js renderer for React.
- `@react-three/drei` — camera, scroll, asset, shader, helper primitives.
- `three` — core 3D rendering.
- `gsap` + `ScrollTrigger` — timeline, scroll, pin, snap, scrub, nonlinear travel.
- `zustand` — global state (current year, active waypoint, camera target, panels, reduced-motion).
- `@react-three/rapier` — physics for cards, satellites, debris, docking stations, soft collisions.
- `leva` / `tweakpane` — internal tuning during development.
- `theatre.js` — optional cinematic camera authoring.
- `postprocessing` / `@react-three/postprocessing` — bloom, DoF, atmospheric glow, vignette, scanlines (used sparingly).
- `MDX` — essays, project pages, long-form content attached to world objects.

**Open technical question for Architecture:** GSAP ScrollTrigger vs drei `ScrollControls` vs a smooth-scroll lib (Lenis) for the scroll↔camera coupling; native vs virtual scroll container; SSR/hydration handling for the canvas. (The in-progress grounding-research digest addresses these — fold its findings in here before Architecture.)

## B. Rejected Alternatives (rationale preserved)

- **Phaser** — excellent for real 2D games; would make the site feel like a game embedded in a page. The product needs premium editorial UI, SEO, accessible HTML, and DOM/WebGL blend. Rejected.
- **PixiJS** — excellent 2D/2.5D; strong if the concept were mostly sprites/particles/shaders. But the rocket-camera look up/down, orbital stations, and depth transitions want real 3D. Rejected as sole renderer.
- **Babylon.js / PlayCanvas** — strong for a real 3D game/explorable world; less natural where the HTML/React content layer, MDX publishing, and recruiter navigation must be first-class. Rejected.
- **Raw Three.js** — max control, but R3F gives near-equal control with a cleaner component model, easier state integration, and a more maintainable content-driven site. Rejected in favor of R3F.

## C. World Engine — Career Sequence → distance mapping (+ motion constants)

**Why sequence, not raw year:** the real career has overlapping tenures (Warby 2013 inside ClassPass 2013–2016; Splash 2014–2018 overlapping ClassPass and the start of Justworks; ACD 2023–present overlapping Justworks). A pure `year → distance` function is therefore *not single-valued* and cannot place concurrent eras at distinct altitudes. The world axis is a monotonic **Career Sequence** of non-overlapping segments; each segment's *length* is sized by duration (clamped), and a year *label* is derived per position (monotone, never decreases). This backs FR-1/FR-5/FR-6.

```ts
// Each Era is one contiguous segment on the Primary Track, in narrative order.
type EraSegment = {
  id: string;
  order: number;                 // 0..8 (Prologue..Axioms)
  band: AltitudeBand;
  durationYears: number | null;  // null for Prologue (pre-roll) and Axioms (atemporal finale)
  yearLabelStart?: number;       // for HUD label only; omitted for atemporal segments
  yearLabelEnd?: number;
  concurrentRoleIds?: string[];  // co-located artifacts, NOT their own segment
};

const SPAN_MIN = 1.0;            // floor (in "scroll screens") so short eras still register
const SPAN_MAX = 3.5;            // ceiling so the longest tenure isn't a tedious scroll (backs §15 cap + FR-5)
const SPAN_PER_YEAR = 0.5;       // base rate before clamping; tune for "3–5 wheel-notches/year" feel

// span(era) = clamp(durationYears * SPAN_PER_YEAR, SPAN_MIN, SPAN_MAX);
//   Prologue -> fixed SPAN_MIN pre-roll at the very bottom (no negative positions; fixes the old START_YEAR=2004 bug)
//   Axioms   -> fixed anchor segment at the very top (atemporal finale)
// Cumulative segment offsets define scroll span and world altitude; camera & HUD read the current segment.
```

**Motion constants referenced by the FRs (tune in dev via leva/tweakpane):**
```ts
const CAMERA_SMOOTHING_TAU_MS = 120;   // FR-2 damped-follow time-constant (bounded, not 1:1)
const MAX_CAMERA_TILT_DEG     = 12;    // FR-4 tilt ceiling; 0 in reduced-motion
const TRAVEL_MS_PER_SEGMENT   = 550;   // FR-3 base; total launch duration scales with segments crossed
const TRAVEL_MS_MAX           = 2600;  // FR-3 ceiling so a full ground->deep-space launch stays snappy
const PHYSICS_BODY_CAP        = { tier3: 40, tier2: 20, tier1: 8, tier0: 0 }; // FR-22/FR-24 per Fidelity Tier
```

Virtual scroll state keeps the mapping stable regardless of literal document height (backs FR-1). Derive DOM section heights **and** world waypoint offsets from this one config to prevent drift (backs §10 CLS).

## D. Career Data Layer — proposed types (backs FR-15/16/17)

```ts
type CareerWaypoint = {
  id: string;
  label: string;
  company?: string;
  role?: string;
  startYear: number;
  endYear?: number;
  altitudeBand:
    | "ground" | "low-atmosphere" | "clouds"
    | "stratosphere" | "orbit" | "deep-space";
  sceneTheme: string;
  summary: string;
  technologies: string[];
  artifacts: string[];
  links: Array<{ label: string; href: string }>;
  positionHint?: [number, number, number];
};

type TechNode = {
  id: string;
  label: string;
  yearStart: number;
  yearEnd?: number;
  category: "language" | "framework" | "pattern" | "tool" | "platform" | "ai" | "architecture";
  visualMotif: string;
  relevance: "personal" | "industry" | "both";
};

type CareerWorldState = {
  scrollY: number;
  currentYear: number;
  activeWaypointId?: string;
  cameraMode: "free-scroll" | "waypoint-jump" | "inspect";   // PRD "Motion Mode" — use these literals verbatim
  reducedMotion: boolean;
};
```

This single source of truth powers: the rendered world, the Timeline Rail, project detail pages, SEO HTML fallback, résumé page, and jump-to-era nav. (The Knowledge Graph is a *producer* of this layer, not a consumer of it — see §I.)

## E. Motion Controller — waypoint jump (backs FR-3)

```ts
function jumpToWaypoint(era: EraSegment) {
  const targetScroll = segmentScrollOffset(era.order);           // from §C cumulative offsets
  const segmentsCrossed = Math.abs(era.order - currentEraOrder);
  gsap.to(scrollState, {
    y: targetScroll,
    duration: Math.min(segmentsCrossed * TRAVEL_MS_PER_SEGMENT, TRAVEL_MS_MAX) / 1000, // farther = longer, bounded
    ease: "power3.inOut",
    onUpdate: syncCameraToScroll,
  });
}
```

Two movement modes: **natural scroll** (camera follows a smoothed scroll-derived target, `CAMERA_SMOOTHING_TAU_MS`) and **waypoint-jump** (nonlinear tween that accelerates, arcs, eases in). Must be interruptible. **Deep-link cold load** does NOT tween from the bottom — it sets `scrollState.y = segmentScrollOffset(target)` directly and opens the panel (backs FR-21); reduced-motion anchors instantly.

## F. Scene Chunk System (backs FR-6/7)

Do not render the whole universe at once. Chunked scenes lazy-load GLTFs/textures/shaders/particles near the camera. **Explicit Era→Scene mapping** (FR-6 permits 1-Era→N-Scene; every Era has ≥1 Scene, no orphans):

| Era (# / band) | Scene Chunk(s) |
|---|---|
| 0 Prologue (`ground`) | `PrologueLaunchpadScene` |
| 1 BAE (`ground`) | `RadioLabScene` |
| 2 Web/Agency (`low-atmosphere`) | `WebEraScene` **+** `CreativeAgencyScene` *(intentional 1→2: Rails/Ajax vs Flash/agency)* |
| 3 Warby (`clouds`) | `VisionCloudScene` |
| 4 ClassPass/SagePoint (`clouds`) | `StartupCloudCityScene` |
| 5 Splash (`clouds`) | `PlatformDecompScene` |
| 6 Justworks (`stratosphere`) | `StratosphereArchitectureScene` |
| 7 ACD/IntelliForia (`orbit`) | `OrbitAIScene` |
| 8 Axioms (`deep-space`) | `DeepSpaceAxiomsScene` |

Per FR-7: scene-graph nodes stay mounted (no recompile hitch); GPU textures/geometry are disposed/reloaded outside the adjacent-era window to hold the §10 mobile texture budget. Each scene has a bounded loading state + degraded fallback (FR-33).

## G. DOM + Canvas split (backs FR-10/11/14)

- WebGL canvas fixed behind everything.
- HTML overlay pinned above it.
- Cards have matching 3D anchors; selecting a 3D object opens a real HTML panel.
- Reduced-motion turns the whole thing into an elegant Static Timeline.

## H. Career World Map (era-by-era visual + tech detail)

*Source truth for Set Pieces / Tech Nodes (backs FR-6/8). Dates to be confirmed — see PRD §8 Q1.*

- **Prologue — Before Launch:** internships/college/first systems exposure (Lockheed Martin, Unisys, and **Stevens Institute of Technology** — LinkedIn corrects the braindump's "Drexel"). Dark launchpad, early machines, code notebooks, signal towers, internship badges. *(Exact companies/dates to be authored into the Career Data Layer from LinkedIn — full profile was auth-gated.)*
- **2004–2010 — BAE Systems (ground):** radio hardware, antennas, oscilloscopes, spectrum analyzers, green waveforms, SCA diagrams, test benches. Tech: embedded systems, Java, J2EE, EJB, AJAX, SCA, TDD, Agile, metrics automation, design patterns. Feeling: grounded, engineered, physical.
- **2009–2012 — Web/Agency (Noise, Firstborn) (low-atmosphere):** browser windows, Flash motion fragments, jQuery sparks, PHP panels, Symfony/MVC, Rails tracks, Backbone. Tech: Flash, PHP, Symfony, Rails, Ajax, Backbone, MVC, APIs, object recognition, AR. Feeling: kinetic, creative, high-gloss.
- **2013 — Warby Parker (clouds):** camera grids, face landmarks, glasses overlays, calibration screens, neural-looking UI, glassy panels in cloud. Tech: computer vision, perception, ML-adjacent product, team leadership. Feeling: ascent into clouds; reality interpreted.
- **2013–2016 — ClassPass + SagePoint (clouds):** cloud city, neon storefronts, booking flows, resource nodes, matching graphs. Tech: CMS, B2B SaaS, multi-tenancy, skill taxonomy, resource matching, enterprise privacy. Feeling: startup velocity, ambiguity, founder energy.
- **2014–2018 — Splash (platform decomposition):** monolith splitting into services, API pipes, webhook pulses, OAuth locks, event trails. Tech: Rails monolith decomposition, decoupled API platform, third-party integrations, real-time analytics. Feeling: architecture becomes visible.
- **2018–2024 — Justworks (stratosphere):** Earth curvature, architecture constellations, service diagrams, temporal trees, compliance engines, payment orbits. Tech: TimeEngine, OvertimeEngine, Payment Center, GraphQL, React, distributed systems, Testing Maturity Model, hybrid RAG. Feeling: staff-level pattern recognition; whole-system sight.
- **2023–present — ACD + IntelliForia (orbit):** orbital stations, MCP docking ports, retrieval beams, clinical-note satellites, compliance shields, voice waveform paths, agent constellations. Tech: RAG, MCP, multi-agent orchestration, evaluation, guardrails, voice notes, real-time compliance scoring, secure healthcare data. Feeling: current frontier; systems that reason/act/verify.
- **Deep Space — Axioms of AI:** floating axioms as orbital tablets, AI/HE ratio gauge, requirements/acceptance-criteria as cosmic forces, management-as-gravity metaphor. The framework built from the journey.

## I. Knowledge Graph pipeline (backs FR-18, post-MVP)

```txt
Resume + LinkedIn + GitHub + Medium + essays
        -> Knowledge Graph
        -> Career World Data (Career Data Layer)
        -> WebGL / HTML Portfolio Experience
```

A tool-agnostic content/authoring aid, **not** the renderer (PRD §8 Q7 RESOLVED — no vendor lock-in, post-MVP). Connects companies, roles, projects, technologies, patterns, essays, GitHub projects, AI concepts, dates, visual motifs, relationships — then exports structured data the world consumes. Encodes the through-line (BAE→signals→architecture→patterns→AI orchestration; SagePoint→taxonomy→RAG→knowledge graphs; TimeEngine→layered abstraction; Axioms↔whole arc). It is a **producer** of Career Data Layer content, never a consumer of it.

## J. Proposed Build Sequence (maps to PRD §6 MVP + phasing)

1. **Phase 1 — Static data + cinematic prototype (MVP):** career data file; single fixed canvas; 3 altitude bands; scroll-to-year; click-to-waypoint tween; simple cards for BAE/Warby/Justworks/AI.
2. **Phase 2 — Worldbuilding + scene identity:** BAE radio scene; web/Ajax/Rails/Flash scene; Warby CV cloud scene; Justworks architecture stratosphere; AI orbital scene; parallax cloud layers + atmospheric transitions.
3. **Phase 3 — Physics + interactions:** floating cards as physics objects; click cards → HTML panels; idle orbit/drift; drag/inspect artifacts; camera pivot + acceleration on waypoint transitions.
4. **Phase 4 — Content integration:** Medium, GitHub, résumé, company/project write-ups; KG relationships as hidden metadata + visual dotted links.
5. **Phase 5 — Performance + accessibility:** static fallback timeline; reduced-motion; mobile simplified; lazy-loaded GLTFs/textures; performance budgets; keyboard nav.

## K. Performance Rules (feed PRD §10 NFRs)

- Canvas fixed; avoid massive DOM movement.
- Instancing for particles, stars, tech nodes, small satellites.
- LOD for distant objects.
- Preload only the next Scene chunk.
- Compress GLTF with Draco or Meshopt; textures via KTX2/Basis.
- Postprocessing tasteful — bloom can murder mobile GPUs.
- Reduced-motion and low-power modes.
- Keep text in HTML so the site is useful even with WebGL disabled.

## L. Integration Patterns (from grounding research — for Architecture to ratify)

*Source: `research-digest.md`. These are the concrete mechanisms behind PRD §10's "what must be true"; the Architecture phase should confirm or revise.*

- **Single canvas topology:** exactly ONE persistent `GlobalCanvas` fixed behind the scrolling document for the whole site; never a per-section/per-era `<Canvas>`. Switch era scene-graphs via the `visible` prop (stay mounted, pre-warm materials); never conditional mount/unmount at runtime (browsers cap WebGL contexts ~8–16 and kill the oldest; remount recompiles materials → hitches at transitions). Buy-vs-build reference: `14islands/r3f-scroll-rig` (`useCanvas`/tunneling, DOM-proxy tracking).
- **Single scroll authority:** GSAP ScrollTrigger on the real (native / Lenis) document is the ONLY scroll authority — no `drei ScrollControls` in the same route (its transformed overlay div breaks the SSR/semantic truth layer and desyncs the scrubbed camera).
- **Single RAF loop:** Lenis `autoRaf:false`; `gsap.ticker.lagSmoothing(0)`; drive `lenis.raf()` from `gsap.ticker` (convert `time*1000` s→ms); `ScrollTrigger.update()` on Lenis's scroll event. Two competing RAF loops cause visible DOM↔WebGL jitter.
- **State boundary:** per-frame values (camera position, scrollProgress, physics) live in refs or are read via `store.getState()` inside `useFrame` — NEVER `setState` in `useFrame`/scroll callbacks. React re-render reserved for discrete UI only (activeEra, qualityTier, reducedMotion). Routing 60fps updates through React's scheduler is the #1 R3F perf failure.
- **Camera model:** author the whole ground→orbit→deep-space journey as ONE scrubbable timeline; each frame map `scrollProgress → timeline position` (`tl.seek(offset*duration)`); reuse the same timeline for click-to-launch by tweening the playhead to a waypoint (don't hijack scroll). Derive BOTH DOM section heights and world waypoint offsets from one shared config to prevent drift. If Theatre.js: Studio is dev-only (NODE_ENV-guarded, tree-shaken), animation baked to a checked-in `state.json`. (Codrops "camera fly-through on scroll with Theatre.js + R3F" is the concrete pattern — but it omits `prefers-reduced-motion`; close that gap.)
- **Rendering mode:** `frameloop='demand'` + explicit `invalidate()` during scroll/tween/physics; zero renders when idle; `regress()` during interaction.
- **Physics scope:** Rapier scoped to active-era accent props only; world paused when the era is off-screen; disabled entirely in Low tier / reduced-motion; raycasting throttled ~30Hz.
- **Postprocessing:** single `@react-three/postprocessing` EffectComposer; selective bloom via emissive materials + `luminanceThreshold≈1` (not global bloom); full stack desktop/tier3 only; bloom at ½–¼ res on tier2; disabled on mobile/tier≤1. DOM legibility must never depend on postprocessing.
- **Quality tiering:** `pmndrs/detect-gpu` (tier 0–3) at boot sets initial budgets; `drei PerformanceMonitor` drives runtime up/down-grade with hysteresis (shed order: postprocessing → particle count → DPR → LOD). Tier 0 / no WebGL2 / `webglcontextlost` → serve the Static Timeline.
- **SSR island:** the WebGL layer is a `next/dynamic({ ssr:false })` `'use client'` island mounted post-hydration on top of already-SSR'd DOM, with a poster/skeleton. Optionally opt into the `Sec-CH-Prefers-Reduced-Motion` client hint so SSR ships the static timeline (and skips the R3F bundle) from the first byte.
- **Composable rendering:** shared material/particle/transition modules reused per era (à la The Monolith's "composable rendering systems") — not N bespoke pipelines — so a solo builder can maintain 5–9 eras and add more by config.

## M. Reference-Class / Prior Art

*From `research-digest.md` — proven analogs establishing feasibility + the credibility bar.*

- **The Monolith Project** — <https://themonolithproject.net> — closest structural analog: 13-scene scroll narrative on the exact stack (Three.js + R3F + GSAP + shaders + GPU particles); Codrops case study documents the composable-rendering pattern.
- **Bruno Simon** — <https://bruno-simon.com> — reference-class solo WebGL portfolio; onboarding teaches interaction in 3–5s, physics is legible/purposeful, repo is public (credibility multiplier).
- **Explore Primland** — <https://explore.ownprimland.com> — scroll-driven aerial flythrough; proves altitude/scale reads from atmospheric cues, not camera height alone.
- **Sébastien Lempens** — <https://sebastien-lempens.com> — scroll journey with per-segment camera-mode variety (avoids monotony over a long scroll).
- **Igloo Inc** — <https://igloo.inc> — journey via structural navigation over effect density (the "one defended idea / restraint" exemplar).
- **Codrops — camera fly-through on scroll (Theatre.js + R3F)** — <https://tympanus.net/codrops/2023/02/14/animate-a-camera-fly-through-on-scroll-using-theatre-js-and-react-three-fiber/> — concrete single-timeline camera-authoring tutorial (note: add reduced-motion, which it omits).
- **14islands/r3f-scroll-rig** — <https://github.com/14islands/r3f-scroll-rig> — production single-GlobalCanvas + scrolling-HTML pattern; the buy-vs-build reference.

## N. Hosting & Deployment (from grounding research — for Architecture to ratify)

*Decision: **Cloudflare** (fits Jarad's Cloudflare-centric infra). Grounded in current 2025–2026 sources (see below). The Architecture phase confirms/updates.*

**Recommended topology:**
- **App:** Next.js (App Router) deployed via **`@opennextjs/cloudflare` (OpenNext) on Cloudflare Workers** — Node runtime, so full SSR/SSG/ISR + on-demand revalidation (`revalidateTag`/`revalidatePath`, ISR cache on KV + R2). **Do NOT use `@cloudflare/next-on-pages`** — Cloudflare deprecated it (Apr 8 2025) in favor of OpenNext.
- **Large 3D binaries** (KTX2 textures, Draco/Meshopt `.glb`, HDRIs): **Cloudflare R2** behind a **custom domain** (e.g. `assets.jaradd.com`), `Cache-Control: public, max-age=31536000, immutable`, content-hashed filenames, single-range (206) requests for progressive decode, Smart Tiered Cache. **R2 has zero egress fees** — the decisive cost win for an asset-heavy site.
- **Keep Three.js/R3F in client components** so they compile to static JS assets, NOT into the server Worker bundle.

**Hard limits to design around (the real gotchas):**
- **Server Worker bundle ≤ ~10 MiB gzip** (paid plan; 3 MiB free) — the most-reported OpenNext pain point. Keeping 3D client-side is what keeps you under it; use the ESBuild bundle analyzer.
- **Max single static-asset file 25 MiB** on Workers Static Assets → big 3D assets *must* live in R2, not the asset bundle.
- Static asset file count: 20k free / 100k paid (5× bump Sept 2025). CPU: 10 ms free / up to 5 min paid (SSR is well within). 128 MB isolate memory (fine — no server-side WebGL).
- **Build on Next.js 15/16** — OpenNext drops Next 14 support Q1 2026.

**Reduced-motion at the edge (`Sec-CH-Prefers-Reduced-Motion`):** technically doable in a Worker (advertise `Accept-CH` + `Critical-CH` for retry, `Vary` for cache) to SSR a reduced-motion variant — **but Chromium-only and marked "not Baseline."** Treat it as a progressive-enhancement optimization only; the **source of truth remains CSS `@media (prefers-reduced-motion)` + `matchMedia`** (PRD §10, FR-25). Cloudflare shipped `Vary` support in Cache Rules (Jul 2 2026); whether it allowlists `Sec-CH-*` is unconfirmed — verify in-account.

**Honest alternative — Vercel:** the Next.js reference platform (zero adapter risk, every feature day-one, near-zero ops) but **metered bandwidth** that gets expensive for GB-scale 3D-asset transfer. Cloudflare wins here specifically because R2 zero-egress neutralizes the dominant cost and Workers give edge-level control; choose Vercel only if adapter-risk avoidance + low ops outweigh bandwidth cost.

*Key sources: OpenNext Cloudflare docs (opennext.js.org/cloudflare, /caching, /troubleshooting); Cloudflare OpenNext announcement (blog.cloudflare.com/deploying-nextjs-apps-to-cloudflare-workers-with-the-opennext-adapter); Workers limits (developers.cloudflare.com/workers/platform/limits); R2 pricing/public-buckets; MDN + web.dev on the reduced-motion client hint.*
