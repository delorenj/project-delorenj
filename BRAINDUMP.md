---
title: "Project: delorenj"
source: "https://chatgpt.com/g/g-p-698b05742dac8191bbf15ee043cadd7d/c/6a50195d-3350-83ea-9bc9-7f0cacc6eee6"
category: "braindump"
---

**You:**

All right, I've, I have a Medium site, a GitHub site, a GitHub Pages site, company sites, all this stuff. What I really need is a super stylish, like, grand, amazing design. It needs to be modern and showcase interesting and unique things that you just don't typically see and that are, that take the person on a career journey. I want them to feel like they're on a journey, like, an old website I made back in 2006, my personal site, jaradd.com, J-A-R-A-D-D. It might be still floating around, but it was revolutionary for the time. It started on the ground, or in the sky, but it goes everywhere from the ground on Earth, and then as you go through the journey, you go up, upwards, past, like, the clouds, and then into space where there's a satellite and little cards floating using physics, you know, using JavaScript physics, and all the cards are these space stations that each tell a story about me. It'd be cool if going up, it was the timeline, like, where I started, pulling me up, my first job at BAE Systems doing military radio design. It'd be cool to have, like, a little gimmick scene where there's radios and sounds and, like, waveforms, and then up to, you know, showcase Ajax and Rails, and then how I went into Firstborn and noise, and then the director level stuff. Now we're going up into the clouds when I started doing computer vision stuff at Warby, and then startup at ClassPass, and then directing. And then staff level is going into the space, right? Splashes, staff level, I'm getting more, like, knowledge, patterns, I see the architecture in my head, like, connecting dots, and then all the way up to Justworks, and then AI is, like, gonna be in space and all the stuff I do with my axioms of AI. But it'd be cool if it was, like, all out, going all out crazy like that.

---

**ChatGPT:**

![Generated image: Futuristic personal portfolio journey design](https://chatgpt.com/backend-api/estuary/content?id=file_000000003448720c838ed150b4baac16&ts=495490&p=fs&cid=1&sig=b6085ba8228566383228973dadd029cb48f225f1fffab798eef78e79a2207495&v=0)

---

**You:**

Ace Knowledge Graph That design is amazing. It's very, very close to what I meant. If I were to give any updates, I would say that I want the scale to be grand. So it can't just be like a linear, you know, scene, and then a scene, a vertical scene, a vertical scene. I want it to give the sense of time. So I would like it to be one of those, I want it to be more of a video game loop rendering, where, you know, it feels like a scene from a game with parallax clouds as a layer, and the ground being an entity, and then, you know, like, that's how I envision it. And I also envision it like a timeline from when I, you know, maybe it can even be from when I was, like, in grade school, and it could show, you know, the year that I, maybe start from the year I graduated college. So my first job, BAE, is where I started. Maybe I can even do my first internships at Lockheed Martin and Unisys, followed by my job in 2004. And then as we scroll up, I want each year to feel like a bunch of scrolls. So you can get a sense of how long I was at the longer ones. So maybe one year is going to be maybe three to five mouse wheel scrolls. Really though, it'll tween from year to year. If you want to click on a certain era or job, it will do a nonlinear tween speed up, slow down curve to get between the waypoints. But you could just scroll and feel the distance and magnitude of the site. It needs to be a spectacle, so I want to go all out with, you know, if it's going to be OpenGL rendering or some graphics framework that does 2D and 3D, because I envision it being 2D, but maybe the camera pivots to look down when I'm moving, or you can pivot to look up or down when it's moving, like a rocket ship. So that would be really cool. So look into what kind of JavaScript framework would be best for this. I'm not sure how the ace Knowledge Graph works but if it connects things like connects the dots it could use all of my resumes and details from LinkedIn about my entire career it could also pull in Tech specific nodes from each year so we can decorate the scene similar to how like that '70s show that '80s show Etc they have a a themed set piece so I would think each year or each era like the BAE Systems era is right around the dawn of Ajax and the first Ruby on Rails stuff and test first design gang of four and then up to firstborn in 2010 ish that's the era of Flash was prominent PHP was huge and then noise brings in model view controller Frameworks like Symphony and react came in there somewhere you know what I mean like I want to show what I was doing and give a sense of how much Tech timeline I've lived through to give a sense of my experience that I've gained

---

**ChatGPT:**

Yes. This is **way** stronger than a pretty vertical landing page. The right version is not “section, section, section.” It is a **scroll-driven career world** with a real simulation model underneath it.

I’d build it as a **cinematic game-loop portfolio**: one continuous rendered world, driven by a virtual timeline, where scroll input moves the camera through years, altitude, eras, artifacts, and story nodes.

I also tried generating the Ace Knowledge Graph twice with the career/tech spine, but the connector timed out both times. The graph idea is still absolutely the right fit, though: use Ace KG as the **relationship intelligence layer**, not the renderer. More on that below.

I wrote up a full architecture/spec here:

## The framework answer

Use:

**Next.js + React Three Fiber + Three.js + GSAP ScrollTrigger + Zustand + Rapier**

That gives you the best blend of:

**Real website**  
with routes, SEO, résumé links, Medium/GitHub links, static fallbacks, accessibility, and recruiter-friendly content.

**Real rendered world**  
with camera movement, parallax, 3D/2.5D set pieces, particles, atmosphere, floating cards, physics, and cinematic scroll.

**Real motion control**  
where scroll is not just “page goes down”; it becomes a virtual time engine.

React Three Fiber is the key piece because it lets you build Three.js scenes declaratively as reusable React components, and its own docs explicitly frame it as reusable, interactive scene-building that participates in React’s ecosystem. The docs also say everything that works in Three.js works there, and that it adds no overhead because components render outside React. [![](https://www.google.com/s2/favicons?domain=https://r3f.docs.pmnd.rs&sz=128)Poimandres Documentation](https://r3f.docs.pmnd.rs/getting-started/introduction)

Three.js itself gives you the graphics foundation: objects, meshes, sprites, lines, cameras, loaders, renderers, WebGLRenderer, and WebGPURenderer hooks are all part of the documented ecosystem. [![](https://www.google.com/s2/favicons?domain=https://threejs.org&sz=128)Three.js](https://threejs.org/docs/)

GSAP ScrollTrigger is the scroll/motion brain. It supports scroll-based animation with scrub, pin, snap, timeline labels, callbacks, velocity, custom scroll containers, and responsive behavior, which is exactly what you need for “click an era, nonlinear tween there, speed up, slow down, and feel the distance.” [![](https://www.google.com/s2/favicons?domain=https://gsap.com&sz=128)GSAP](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

I would **not** make WebGPU the default baseline yet. WebGPU is powerful and meant for complex rendering/compute, but MDN still marks it as not Baseline because it does not work in some widely used browsers; Can I Use shows broad but uneven support, including partial Safari support and Firefox disabled-by-default in the table. So: build on WebGL/Three.js first, then optionally detect WebGPU for enhanced mode. [![](https://www.google.com/s2/favicons?domain=https://developer.mozilla.org&sz=128)MDN Web Docs+1](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## How I’d structure the experience

The big conceptual shift: **years become distance**.

Not “BAE is one card.”  
Not “Justworks is one section.”  
Nope.

A longer chapter should physically occupy more scroll-space. If BAE was 2004-2010, that should feel like a long foundational climb. If Warby Parker was shorter but dense, it should feel like a concentrated, high-detail set piece. If Justworks was a major staff-level arc, it should feel like the stratosphere opening up.

A simple model:

```TypeScript
const START_YEAR = 2004
const PIXELS_PER_YEAR = 4200
const WORLD_UNITS_PER_YEAR = 35

function yearToScrollY(year: number) {
  return (year - START_YEAR) * PIXELS_PER_YEAR
}

function yearToWorldY(year: number) {
  return (year - START_YEAR) * WORLD_UNITS_PER_YEAR
}
```

Then every job, technology, essay, GitHub repo, and artifact has a timestamp or range.

That gives you:

```TypeScript
{
  id: "bae-systems",
  startYear: 2004,
  endYear: 2010,
  altitudeBand: "ground",
  sceneTheme: "radio-lab",
  technologies: ["SCA", "AJAX", "Java", "J2EE", "TDD", "Design Patterns"],
  artifacts: ["radio hardware", "waveforms", "oscilloscope", "metrics dashboard"]
}
```

This means the site becomes a **time-space mapping**.

## The site should have two systems running together

### 1. The rendered world

This is the cinematic layer.

Ground, radio towers, signal waves, browser windows, clouds, computer vision overlays, architecture constellations, satellites, MCP docking ports, AI stations, orbital cards.

This lives in:

```
/components/world
  GroundScene.tsx
  RadioLabScene.tsx
  WebEraScene.tsx
  CreativeAgencyScene.tsx
  VisionCloudScene.tsx
  StartupCloudCityScene.tsx
  StratosphereArchitectureScene.tsx
  OrbitAIScene.tsx
  DeepSpaceAxiomsScene.tsx
```

### 2. The content layer

This is the readable, useful layer.

Actual text, links, résumé download, project detail panels, Medium links, GitHub links, case studies, AI axioms, job descriptions, “open card” overlays.

This should remain HTML/React, not trapped inside WebGL. That way a recruiter can still read, search, skim, and click. The WebGL layer is the spectacle. The DOM layer is the truth.

## The timeline should feel physically large

Your “one year equals three to five mouse-wheel scrolls” idea is exactly right.

The trick is to avoid a normal document height with giant empty sections. Use a **virtual scroll state**.

The browser can have a tall scroll container, but the scene itself is driven by a normalized timeline:

```TypeScript
type CareerWorldState = {
  scrollY: number
  currentYear: number
  activeWaypointId?: string
  cameraMode: "free-scroll" | "jumping" | "inspect"
  reducedMotion: boolean
}
```

Then:

```TypeScript
function jumpToWaypoint(waypoint) {
  gsap.to(scrollState, {
    y: yearToScrollY(waypoint.startYear),
    duration: computeTravelDuration(currentYear, waypoint.startYear),
    ease: "power3.inOut",
    onUpdate: syncCameraToScroll,
  })
}
```

So if someone clicks “Warby Parker,” the site does not teleport. It **launches**. It accelerates past earlier eras, bends through clouds, eases into the vision layer, and settles into the Warby scene.

That is the difference between a cool website and a spectacle.

## How the career journey should map visually

### Pre-launch: Lockheed, Unisys, Drexel

This can be the pre-career launchpad.

A distant engineering base. Early terminals. Math/CS notes. Antenna silhouettes. Internship badges. A subtle “before the signal” feeling.

### 2004-2010: BAE Systems

This is the ground layer.

Radio hardware. Oscilloscopes. Green waveform displays. Signal towers. SCA diagrams. AJAX interface fragments on rugged radio screens. TDD and Gang of Four patterns as blueprints or schematic overlays.

This is where the world says: “He started close to the metal.”

### 2009-2012: Noise / Firstborn / early web spectacle

Now the ground starts to lift into the web.

Flash-era motion. PHP/Symfony/MVC panels. Rails tracks. Browser windows floating like billboards. jQuery sparks. Early AR/object-recognition overlays.

This layer should feel like: “The web learned to move.”

### 2013: Warby Parker

Clouds.

Camera grids. Face landmarks. Eyewear overlays. Computer vision diagrams. Calibration frames. A head/face mesh made from glowing points inside the clouds.

This is where “vision” becomes literal and metaphorical.

### ClassPass / SagePoint / Splash

Still in the clouds, but now product and platform complexity appear.

Booking flows. CMS panels. SaaS tenant maps. Skill taxonomy graphs. Resource-matching constellations. API pipes. Monolith splitting into services. OAuth locks. Webhook pulses.

This is the “startup velocity and platform architecture” band.

### 2018-2024: Justworks

Stratosphere.

Earth curvature. Architecture diagrams become constellations. TimeEngine as a temporal tree. OvertimeEngine as a compliance calculation engine. Payment Center as orbital payment rails. Observability traces. GraphQL/API surfaces. Distributed systems motifs.

This should feel like the moment the visitor realizes: “Oh, this person sees systems at scale.”

### 2023-present: ACD / IntelliForia / AI

Orbit.

MCP docking ports. RAG retrieval beams. Voice waveform trails. Clinical-note satellites. Compliance shields. Agent constellations. Evaluation panels. Guardrail fields.

This is not just “AI stuff.” This is the culmination of the whole journey: signals, patterns, vision, taxonomy, time, compliance, orchestration.

### Deep space: Axioms of AI

This is the final identity layer.

The Axioms become floating orbital tablets. AI/HE Ratio becomes a gauge. “Requirements” and “Acceptance Criteria” become cosmic forces. “Agent as employee” becomes a visible organizational constellation.

The visitor should feel like your career did not merely arrive at AI. It was always moving toward it.

## Where Ace Knowledge Graph fits

Ace Knowledge Graph should be used to build the **content brain** of the site.

Not:

```
Ace KG -> embed graph on homepage
```

Instead:

```
resumes + LinkedIn + GitHub + Medium + essays
        -> Ace Knowledge Graph
        -> career/tech relationship data
        -> rendered portfolio world
```

The graph should connect:

BAE → software-defined radio → SCA → design patterns → architecture  
Firstborn → object recognition → computer vision → Warby Parker  
SagePoint → skill taxonomy → knowledge modeling → RAG  
Justworks → TimeEngine → layered abstraction → temporal systems  
ACD / IntelliForia → MCP → orchestration → Axioms of AI

That graph becomes the hidden map that decorates the world. It tells the renderer which artifacts belong near which years, which concepts connect across eras, and which cards should have glowing relationship lines.

The coolest version: when the visitor opens a card, they can see “why this matters later.” BAE is not just BAE. It points to SCA, patterns, TDD, embedded UI, and eventually MCP/tool boundaries. SagePoint is not just SagePoint. It points to taxonomy, retrieval, knowledge graphs, and RAG.

That is where the whole thing becomes more than résumé theater.

## What I would not do

I would not build this as a normal landing page with five giant scroll sections.

I would not build the whole thing in Phaser unless you want it to feel more like a game than a site.

I would not use only PixiJS unless you decide the entire aesthetic is 2D/2.5D and you give up the camera pivot / rocket / orbital-depth idea.

I would not make the text only WebGL. It’ll look cool and be annoying to read, inaccessible, harder to search, and less recruiter-friendly.

I would not over-index on WebGPU yet. Use WebGL-first, then progressive-enhance.

## The build sequence I’d use

Phase one should be tiny but prove the magic:

1. Create the career data file.
2. Render a fixed canvas.
3. Map scroll position to year.
4. Create three altitude bands: ground, clouds, space.
5. Add BAE, Warby, Justworks, AI as waypoints.
6. Add click-to-waypoint tweening.
7. Add basic camera tilt and acceleration.

Once that works, the rest is worldbuilding.

Phase two:

1. Add radio lab scene.
2. Add web-era browser/code scene.
3. Add CV cloud scene.
4. Add architecture stratosphere scene.
5. Add AI orbit scene.
6. Add floating cards and HTML panels.

Phase three:

1. Add physics.
2. Add parallax atmosphere.
3. Add project artifacts.
4. Pull in Medium/GitHub.
5. Add reduced-motion/static fallback.
6. Add mobile simplified mode.

The north star is this:

> A recruiter scrolls upward from radio waves on Earth to agentic systems in orbit, feeling twenty years of software history not as a résumé, but as a playable ascent through the technologies, patterns, companies, and ideas that shaped you into an AI-era systems architect.

That is the site.

