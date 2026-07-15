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

## C. World Engine — year → distance mapping

```ts
const START_YEAR = 2004;
const PIXELS_PER_YEAR = 4200;      // tune for "3–5 wheel notches per year"
const WORLD_UNITS_PER_YEAR = 35;

function yearToScrollY(year: number) {
  return (year - START_YEAR) * PIXELS_PER_YEAR;
}
function yearToWorldY(year: number) {
  return (year - START_YEAR) * WORLD_UNITS_PER_YEAR;
}
```

A longer job physically occupies more world distance (backs FR-5). Virtual scroll state keeps year mapping stable regardless of literal document height (backs FR-1).

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
  cameraMode: "free-scroll" | "jumping" | "inspect";   // maps to PRD "Motion Mode"
  reducedMotion: boolean;
};
```

This single source of truth powers: the rendered world, the Timeline Rail, project detail pages, SEO HTML fallback, the Knowledge Graph, résumé page, and jump-to-era nav.

## E. Motion Controller — waypoint jump (backs FR-3)

```ts
function jumpToWaypoint(waypoint: CareerWaypoint) {
  gsap.to(scrollState, {
    y: yearToScrollY(waypoint.startYear),
    duration: computeTravelDuration(currentYear, waypoint.startYear), // farther = longer
    ease: "power3.inOut",
    onUpdate: syncCameraToScroll,
  });
}
```

Two movement modes: **natural scroll** (camera follows a smoothed scroll-derived target) and **waypoint jump** (nonlinear tween that accelerates, arcs, eases in). Must be interruptible.

## F. Scene Chunk System (backs FR-6/7)

Do not render the whole universe at once. Chunked scenes, each lazy-loading GLTFs/textures/shaders/particles near the camera:

`GroundScene`, `RadioLabScene`, `WebEraScene`, `CreativeAgencyScene`, `VisionCloudScene`, `StartupCloudCityScene`, `StratosphereArchitectureScene`, `OrbitAIScene`, `DeepSpaceAxiomsScene`.

## G. DOM + Canvas split (backs FR-10/11/14)

- WebGL canvas fixed behind everything.
- HTML overlay pinned above it.
- Cards have matching 3D anchors; selecting a 3D object opens a real HTML panel.
- Reduced-motion turns the whole thing into an elegant Static Timeline.

## H. Career World Map (era-by-era visual + tech detail)

*Source truth for Set Pieces / Tech Nodes (backs FR-6/8). Dates to be confirmed — see PRD §8 Q1.*

- **Prologue — Before Launch:** internships/college/first systems exposure (Lockheed Martin, Unisys, Drexel). Dark launchpad, early machines, code notebooks, signal towers, internship badges.
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

A content-intelligence tool, **not** the renderer. Connects companies, roles, projects, technologies, patterns, essays, GitHub projects, AI concepts, dates, visual motifs, relationships — then exports structured data the world consumes. Encodes the through-line (BAE→signals→architecture→patterns→AI orchestration; SagePoint→taxonomy→RAG→knowledge graphs; TimeEngine→layered abstraction; Axioms↔whole arc). Open question (PRD §8 Q7): is "Ace Knowledge Graph" a specific tool or a generic enrichment step?

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
