# Jarad Portfolio: Game-Loop Career Journey Architecture

## Core Idea

This should not feel like a portfolio page. It should feel like a playable career world.

The visitor is not scrolling through sections. They are piloting upward through time. The ground is not a background image; it is an entity. Clouds are not decoration; they are depth layers. Jobs are not cards; they are waypoints in a continuous world. Technologies are not tags; they are environmental artifacts from the era they belong to.

The experience should communicate one thing immediately: this is not someone who has merely worked at companies. This is someone who has lived through multiple eras of software, internalized the patterns, and carried them forward into the AI era.

---

## Recommended Stack

### Primary Stack

**Next.js + React Three Fiber + Three.js + GSAP ScrollTrigger + Zustand + Rapier**

This is the best fit because the site has two equally important identities:

1. It is a cinematic WebGL/WebGPU-style experience.
2. It is still a personal site that recruiters, founders, hiring managers, and curious technical people need to read, skim, link, search, and navigate.

React Three Fiber lets the 3D world be built in reusable React components. Next.js keeps the site shippable as a real web property with SEO, routing, MDX content, static fallbacks, and good deployment ergonomics. GSAP controls scroll-linked, nonlinear, click-to-waypoint camera motion. Rapier gives real physics to floating cards, orbiting stations, and debris.

### Supporting Libraries

- `@react-three/fiber`: Three.js renderer for React.
- `@react-three/drei`: camera, scroll, asset, shader, and helper primitives.
- `three`: core 3D rendering.
- `gsap` + `ScrollTrigger`: timeline, scroll, pinning, snapping, scrub, and nonlinear travel.
- `zustand`: global state for current year, active waypoint, camera target, content panels, and reduced-motion mode.
- `@react-three/rapier`: physics for floating story cards, satellites, debris, docking stations, and soft collisions.
- `leva` or `tweakpane`: internal tuning controls during development.
- `theatre.js`: optional but very useful for cinematic camera authoring.
- `postprocessing` / `@react-three/postprocessing`: bloom, depth of field, atmospheric glow, vignette, scanlines.
- `MDX`: essays, project pages, and long-form content attached to world objects.

---

## Why Not a Traditional Game Engine?

### Phaser

Phaser is excellent for real 2D games. It is less ideal here because the site needs premium editorial UI, SEO, HTML content, accessible text, and a blend of DOM and WebGL. Phaser would make the whole thing feel more like a game embedded in a site instead of a site whose storytelling layer happens to behave like a game.

### PixiJS

PixiJS is excellent for 2D and 2.5D rendering. It would be a strong choice if the concept were mostly sprites, clouds, particles, cards, and shader layers. The limitation is that the rocket-camera idea, looking up/down, orbital space stations, and depth transitions want actual 3D, even if the aesthetic remains mostly 2D.

### Babylon.js / PlayCanvas

Babylon.js and PlayCanvas are strong if this becomes a real 3D game or explorable world. They are less natural for a personal portfolio where the HTML/React content layer, MDX publishing, and recruiter-friendly navigation need to remain first-class.

### Raw Three.js

Raw Three.js gives maximum control, but React Three Fiber gives almost the same control with a cleaner component model, easier state integration, and a better path for a maintainable content-driven site.

---

## The Core Product Architecture

### 1. Career Data Layer

Store career and technology history as structured data, not hardcoded scene logic.

```ts
type CareerWaypoint = {
  id: string;
  label: string;
  company?: string;
  role?: string;
  startYear: number;
  endYear?: number;
  altitudeBand:
    | "ground"
    | "low-atmosphere"
    | "clouds"
    | "stratosphere"
    | "orbit"
    | "deep-space";
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
  category:
    | "language"
    | "framework"
    | "pattern"
    | "tool"
    | "platform"
    | "ai"
    | "architecture";
  visualMotif: string;
  relevance: "personal" | "industry" | "both";
};
```

This gives you a single source of truth that can power:

- the rendered world,
- the left rail timeline,
- project detail pages,
- SEO HTML fallback,
- the knowledge graph,
- the resume-download page,
- and the “jump to era” navigation.

### 2. World Engine

The world engine converts years into vertical distance.

```ts
const START_YEAR = 2004;
const PIXELS_PER_YEAR = 4200;
const WORLD_UNITS_PER_YEAR = 35;

function yearToScrollY(year: number) {
  return (year - START_YEAR) * PIXELS_PER_YEAR;
}

function yearToWorldY(year: number) {
  return (year - START_YEAR) * WORLD_UNITS_PER_YEAR;
}
```

A longer job physically occupies more world distance. Justworks feels big because it was big. BAE feels foundational because it occupies a major early chunk. Short intense chapters, like Warby Parker, feel like dense set pieces rather than tiny résumé rows.

### 3. Motion Controller

There are two movement modes:

#### Natural scroll

The user scrolls normally. The camera tracks a target position based on the current virtual scroll value. This should feel responsive but not mechanical.

#### Waypoint jump

The user clicks BAE, Warby, Justworks, AI, etc. The scroll controller performs a nonlinear tween to that year/altitude. The camera accelerates, arcs, then eases into the scene.

```ts
function jumpToWaypoint(waypoint: CareerWaypoint) {
  gsap.to(scrollState, {
    y: yearToScrollY(waypoint.startYear),
    duration: computeTravelDuration(currentYear, waypoint.startYear),
    ease: "power3.inOut",
    onUpdate: syncCameraToScroll,
  });
}
```

### 4. Scene Chunk System

Do not render the entire universe at full fidelity at once.

Use chunks:

- `GroundScene`
- `RadioLabScene`
- `WebEraScene`
- `CreativeAgencyScene`
- `VisionCloudScene`
- `StartupCloudCityScene`
- `StratosphereArchitectureScene`
- `OrbitAIScene`
- `DeepSpaceAxiomsScene`

Each scene can lazy-load GLTFs, textures, shaders, cards, and particles only when the camera is near it.

### 5. DOM + Canvas Split

The most important text should exist in HTML, not only in WebGL.

Use WebGL for spectacle. Use HTML/React for readable content, detail cards, links, keyboard navigation, accessibility, and SEO.

Best pattern:

- WebGL canvas fixed behind everything.
- HTML overlay pinned above it.
- Cards can have matching 3D anchors in the world.
- Selecting a 3D object opens a real HTML panel.
- Reduced-motion mode turns the whole thing into an elegant static timeline.

---

## Career World Map

### Prologue: Before Launch

**Years:** internships / college / first systems exposure  
**Visuals:** dark launchpad, early machines, code notebooks, signal towers, internship badges.  
**Story:** Before BAE, there were signals: Lockheed Martin, Unisys, Drexel, math, CS, AI, computer vision.

### 2004-2010: BAE Systems - Signals & Systems

**Visuals:** radio hardware, antennas, oscilloscopes, spectrum analyzers, green waveforms, SCA diagrams, rugged equipment, test benches.  
**Tech set pieces:** embedded systems, Java, J2EE, EJB, AJAX, SCA, TDD, Agile training, metrics automation, design patterns.  
**Feeling:** grounded, serious, engineered, physical.

### 2009-2012: Web / Agency Era - The Browser Learns to Move

**Visuals:** browser windows, Flash motion fragments, jQuery sparks, PHP panels, Symfony/MVC diagrams, Rails tracks, Backbone-style UI fragments.  
**Companies:** Noise, Firstborn.  
**Tech set pieces:** Flash, PHP, Symfony, Rails, Ajax, Backbone, MVC, APIs, object recognition, AR.  
**Feeling:** kinetic, creative, experimental, high-gloss.

### 2013: Warby Parker - Vision Systems

**Visuals:** camera grids, face landmarks, glasses overlays, calibration screens, neural-looking UI diagrams, clouds around glassy panels.  
**Tech set pieces:** computer vision, perception, ML-adjacent product work, team leadership.  
**Feeling:** ascent into clouds; reality gets interpreted.

### 2013-2016: ClassPass + SagePoint - Startup Gravity

**Visuals:** cloud city, neon storefronts, booking flows, resource nodes, matching graphs, startup scaffolding.  
**Tech set pieces:** CMS, B2B SaaS, multi-tenancy, skill taxonomy, resource matching, enterprise privacy controls.  
**Feeling:** velocity, ambiguity, product-market chaos, founder energy.

### 2014-2018: Splash - Platform Decomposition

**Visuals:** monolith splitting into service modules, API pipes, webhook pulses, OAuth locks, event trails.  
**Tech set pieces:** Rails monolith decomposition, decoupled API platform, third-party integrations, real-time analytics.  
**Feeling:** architecture becomes visible.

### 2018-2024: Justworks - Architecture at Scale

**Visuals:** stratosphere, Earth curvature, architecture constellations, service diagrams, temporal trees, compliance engines, payment orbits.  
**Tech set pieces:** TimeEngine, OvertimeEngine, Payment Center, GraphQL, React, distributed systems, integrations, Testing Maturity Model, hybrid RAG.  
**Feeling:** staff-level pattern recognition; seeing the whole system.

### 2023-Present: ACD + IntelliForia - Agentic Systems

**Visuals:** orbital stations, MCP docking ports, retrieval beams, clinical-note satellites, compliance shields, voice waveform paths, agent constellations.  
**Tech set pieces:** RAG, MCP, multi-agent orchestration, evaluation, guardrails, voice notes, real-time compliance scoring, secure healthcare data.  
**Feeling:** current frontier; systems that reason, act, and verify.

### Deep Space: Axioms of AI

**Visuals:** floating axioms as orbital tablets, AI/HE ratio gauge, requirements/acceptance criteria as cosmic forces, management-as-gravity metaphor.  
**Story:** This is no longer just Jarad's job history. This is the framework he has built from the journey.

---

## How Ace Knowledge Graph Fits

Ace Knowledge Graph should not be the final portfolio renderer. It should be a content intelligence tool.

Use it to extract and connect:

- companies,
- roles,
- projects,
- technologies,
- patterns,
- essays,
- GitHub projects,
- AI concepts,
- dates,
- visual motifs,
- and relationships.

Then export that graph into structured data that the portfolio world can consume.

In other words:

```txt
Resume + LinkedIn + GitHub + Medium + essays
        -> Knowledge Graph
        -> Career World Data
        -> WebGL / HTML Portfolio Experience
```

This matters because the portfolio should not merely show a chronological timeline. It should show connections:

- BAE radio systems connect to signal processing.
- Signal processing connects to architecture discipline.
- Architecture discipline connects to design patterns.
- Design patterns connect to AI orchestration.
- Skill taxonomy connects to RAG and knowledge graphs.
- TimeEngine connects to layered abstraction.
- Axioms of AI connect to the entire career arc.

That is the magic: the visitor feels the time, but also sees the through-line.

---

## MVP Build Plan

### Phase 1: Static Data + Cinematic Prototype

- Build the `career.timeline.ts` file.
- Build a single fixed WebGL canvas.
- Create three altitude bands: ground, clouds, space.
- Implement scroll-to-year mapping.
- Implement click-to-waypoint tweening.
- Add simple cards for BAE, Warby, Justworks, AI.

### Phase 2: Worldbuilding + Scene Identity

- Add BAE radio hardware scene.
- Add Web/Ajax/Rails/Flash scene.
- Add Warby CV cloud scene.
- Add Justworks architecture stratosphere scene.
- Add AI orbital scene.
- Add parallax cloud layers and atmospheric transitions.

### Phase 3: Physics + Interactions

- Floating cards become physics objects.
- Clicking cards opens HTML panels.
- Cards orbit or drift when idle.
- User can drag small satellites or “inspect” artifacts.
- Waypoint transitions include camera pivot and acceleration.

### Phase 4: Content Integration

- Connect Medium writing.
- Connect GitHub repos.
- Connect résumé downloads.
- Connect company/project writeups.
- Add knowledge graph relationships as hidden metadata and visual dotted links.

### Phase 5: Performance + Accessibility

- Add static fallback timeline.
- Add reduced-motion mode.
- Add mobile simplified mode.
- Add lazy-loaded GLTFs/textures.
- Add performance budgets.
- Add keyboard navigation.

---

## Performance Rules

- Canvas must be fixed; avoid massive DOM movement.
- Use instancing for particles, stars, tech nodes, and small satellites.
- Use LOD for distant objects.
- Preload only the next scene chunk.
- Compress GLTF assets with Draco or Meshopt.
- Use KTX2/Basis for textures.
- Keep postprocessing tasteful; bloom can murder mobile GPUs.
- Provide reduced-motion and low-power modes.
- Keep text in HTML so the site is still useful even when WebGL is disabled.

---

## The One-Sentence Creative Brief

A recruiter scrolls upward from radio waves on Earth to agentic systems in orbit, feeling twenty years of software history not as a résumé, but as a playable ascent through the technologies, patterns, companies, and ideas that shaped Jarad into an AI-era systems architect.
