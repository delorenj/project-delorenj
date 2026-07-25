import * as THREE from 'three'

// AD-6 the cel pipeline, part 3: set-pieces are dioramas, not floating props. Each era is a
// small assembly of toon parts standing on a base/plinth (a desk, a launch pad, a floating
// pedestal) so it reads as a curated SET — a Radiolab-style vignette you can put props down in.
// Pure geometry only; the SetPiece component owns material, outline, and reveal-fade.
export type Tone = 'body' | 'accent' | 'dark' | 'glow'

export interface Part {
  geo: THREE.BufferGeometry
  tone: Tone
  pos?: [number, number, number]
  rot?: [number, number, number]
  outline?: boolean // default true; glow parts skip the ink hull
}

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d)
const cyl = (rt: number, rb: number, h: number, s = 16) => new THREE.CylinderGeometry(rt, rb, h, s)
const cone = (r: number, h: number, s = 16) => new THREE.ConeGeometry(r, h, s)
const sph = (r: number, w = 16, h = 12) => new THREE.SphereGeometry(r, w, h)
const torus = (r: number, t: number, s = 20) => new THREE.TorusGeometry(r, t, 12, s)
const ico = (r: number) => new THREE.IcosahedronGeometry(r, 0)
const octa = (r: number) => new THREE.OctahedronGeometry(r, 0)
const tetra = (r: number) => new THREE.TetrahedronGeometry(r)

const HALF_PI = Math.PI / 2

// shift a group of parts vertically so authored-at-origin props sit on their base
const lift = (parts: Part[], dy: number): Part[] =>
  parts.map((p) => {
    const [x, y, z] = p.pos ?? [0, 0, 0]
    return { ...p, pos: [x, y + dy, z] as [number, number, number] }
  })

// ---- bases -------------------------------------------------------------------------------
// A floating isometric pedestal — era-tinted top plate, dark tapering body. Top surface ~ -0.74.
function padBase(): Part[] {
  return [
    { geo: box(2.5, 0.16, 2.1), tone: 'body', pos: [0, -0.82, 0] },
    { geo: box(2.2, 0.14, 1.8), tone: 'dark', pos: [0, -0.97, 0] },
    { geo: box(2.0, 0.5, 1.6), tone: 'accent', pos: [0, -1.3, 0] },
    { geo: box(1.4, 0.42, 1.0), tone: 'dark', pos: [0, -1.72, 0] },
  ]
}

// A radio-bench workbench for the BAE "Radiolab". Desktop surface ~ -0.68.
function deskBase(): Part[] {
  const leg = (x: number, z: number): Part => ({ geo: box(0.13, 0.72, 0.13), tone: 'dark', pos: [x, -1.12, z] })
  return [
    { geo: box(2.7, 0.14, 1.35), tone: 'accent', pos: [0, -0.75, 0] }, // desktop
    { geo: box(2.7, 0.04, 1.35), tone: 'dark', pos: [0, -0.83, 0] }, // under-shadow
    leg(1.2, 0.52), leg(-1.2, 0.52), leg(1.2, -0.52), leg(-1.2, -0.52),
    { geo: box(2.7, 0.5, 0.08), tone: 'dark', pos: [0, -1.05, -0.62] }, // modesty panel
    { geo: box(2.7, 0.16, 0.3), tone: 'body', pos: [0, -0.62, -0.55] }, // back rail (era-tinted)
  ]
}

// A launch pad + gantry towers for the Prologue. Deck surface ~ -0.78.
function launchBase(): Part[] {
  const tower = (x: number): Part => ({ geo: box(0.14, 1.7, 0.14), tone: 'dark', pos: [x, -0.1, 0.0] })
  return [
    { geo: cyl(1.15, 1.3, 0.28, 24), tone: 'accent', pos: [0, -0.9, 0] }, // pad disc
    { geo: cyl(0.75, 0.85, 0.16, 24), tone: 'dark', pos: [0, -0.74, 0] }, // flame ring
    { geo: box(2.4, 0.5, 2.0), tone: 'dark', pos: [0, -1.3, 0] }, // base block
    tower(1.05), tower(-1.05),
    { geo: box(0.14, 0.14, 1.0), tone: 'dark', pos: [0.55, 0.55, 0] }, // gantry arm
  ]
}

// A desk lamp (arm + glowing head) — a Radiolab prop. Authored to sit on the BAE desktop.
function deskLamp(x: number, z: number): Part[] {
  return [
    { geo: cyl(0.16, 0.2, 0.06, 16), tone: 'dark', pos: [x, -0.62, z] }, // weighted base
    { geo: cyl(0.04, 0.04, 0.5, 10), tone: 'accent', pos: [x, -0.36, z], rot: [0.35, 0, 0.2] }, // arm
    { geo: cone(0.17, 0.24, 14), tone: 'accent', pos: [x - 0.12, -0.08, z + 0.16], rot: [1.9, 0, 0.3] }, // shade
    { geo: sph(0.08, 12, 10), tone: 'glow', pos: [x - 0.14, -0.14, z + 0.2], outline: false }, // bulb
  ]
}

// ---- eras --------------------------------------------------------------------------------
// Every model lives in a roughly 2-unit box; the scene scales it.
function build(kind: string): Part[] {
  switch (kind) {
    // Prologue — ignition on the pad: a rocket standing on a launch pad with gantry towers.
    case 'prologue':
      return [
        ...launchBase(),
        ...lift([
          { geo: cyl(0.3, 0.4, 1.4, 18), tone: 'body', pos: [0, 0.15, 0] },
          { geo: cone(0.3, 0.5, 18), tone: 'accent', pos: [0, 1.1, 0] },
          { geo: box(0.5, 0.5, 0.1), tone: 'accent', pos: [0, -0.5, 0.32] },
          { geo: box(0.5, 0.5, 0.1), tone: 'accent', pos: [0, -0.5, -0.32] },
          { geo: box(0.1, 0.5, 0.5), tone: 'accent', pos: [0.32, -0.5, 0] },
          { geo: sph(0.22, 12, 8), tone: 'glow', pos: [0, -0.95, 0], outline: false },
        ], 0.05),
      ]
    // BAE — radio hardware & signals: THE Radiolab. Oscilloscope + lamp + mug + papers + stool.
    case 'bae':
      return [
        ...deskBase(),
        // oscilloscope, sitting on the desk (left)
        { geo: box(1.2, 0.84, 0.64), tone: 'body', pos: [-0.38, -0.27, 0.02] }, // olive chassis
        { geo: box(0.66, 0.56, 0.08), tone: 'dark', pos: [-0.56, -0.24, 0.35] }, // screen bezel
        { geo: box(0.5, 0.42, 0.05), tone: 'glow', pos: [-0.56, -0.24, 0.4], outline: false }, // lime trace
        { geo: cyl(0.15, 0.15, 0.07, 20), tone: 'dark', pos: [-0.05, -0.22, 0.35], rot: [HALF_PI, 0, 0] }, // dial ring
        { geo: cyl(0.11, 0.11, 0.05, 20), tone: 'glow', pos: [-0.05, -0.22, 0.39], rot: [HALF_PI, 0, 0], outline: false }, // lime dial
        { geo: cyl(0.04, 0.04, 0.8, 10), tone: 'accent', pos: [0.05, 0.5, -0.05] }, // antenna
        { geo: sph(0.07, 10, 8), tone: 'glow', pos: [0.05, 0.94, -0.05], outline: false }, // antenna tip
        { geo: cyl(0.035, 0.045, 0.18, 10), tone: 'accent', pos: [-0.72, 0.24, 0.08] }, // top post
        { geo: cyl(0.035, 0.045, 0.18, 10), tone: 'accent', pos: [-0.56, 0.24, 0.08] }, // top post
        { geo: cyl(0.08, 0.08, 0.09, 12), tone: 'accent', pos: [-0.66, -0.62, 0.35], rot: [HALF_PI, 0, 0] }, // knobs
        { geo: cyl(0.08, 0.08, 0.09, 12), tone: 'accent', pos: [-0.3, -0.62, 0.35], rot: [HALF_PI, 0, 0] },
        // desk lamp (right)
        ...deskLamp(0.82, -0.12),
        // coffee mug
        { geo: cyl(0.13, 0.12, 0.22, 16), tone: 'dark', pos: [0.45, -0.56, 0.4] },
        { geo: torus(0.09, 0.03, 12), tone: 'dark', pos: [0.6, -0.55, 0.4], rot: [0, HALF_PI, 0] },
        // paper stack
        { geo: box(0.42, 0.05, 0.55), tone: 'accent', pos: [0.15, -0.65, 0.42], rot: [0, 0.2, 0] },
        { geo: box(0.42, 0.03, 0.55), tone: 'body', pos: [0.16, -0.61, 0.44], rot: [0, 0.12, 0] },
        // stool, pushed in front of the bench
        { geo: cyl(0.28, 0.28, 0.09, 18), tone: 'accent', pos: [-0.2, -1.15, 1.0] },
        { geo: cyl(0.05, 0.06, 0.55, 10), tone: 'dark', pos: [-0.35, -1.45, 0.88] },
        { geo: cyl(0.05, 0.06, 0.55, 10), tone: 'dark', pos: [-0.05, -1.45, 0.88] },
        { geo: cyl(0.05, 0.06, 0.55, 10), tone: 'dark', pos: [-0.2, -1.45, 1.15] },
      ]
    // Web / Agency — off the ground plane: a server/monitor stack on a pedestal.
    case 'web':
      return [
        ...padBase(),
        ...lift([
          { geo: box(1.0, 1.35, 0.9), tone: 'body', pos: [0, 0.62, 0] },
          { geo: box(0.92, 0.06, 0.84), tone: 'dark', pos: [0, 0.96, 0] },
          { geo: box(0.92, 0.06, 0.84), tone: 'dark', pos: [0, 0.66, 0] },
          { geo: box(0.92, 0.06, 0.84), tone: 'dark', pos: [0, 0.36, 0] },
          { geo: box(0.12, 0.5, 0.06), tone: 'glow', pos: [0.3, 1.12, 0.46], outline: false },
        ], -0.72),
      ]
    // Warby Parker — computer vision & calibration: a camera rig on an optics pedestal.
    case 'warby':
      return [
        ...padBase(),
        ...lift([
          { geo: box(0.72, 0.72, 0.72), tone: 'body', pos: [0, 0.36, -0.2] },
          { geo: cyl(0.4, 0.42, 0.7, 20), tone: 'accent', pos: [0, 0.36, 0.42], rot: [HALF_PI, 0, 0] },
          { geo: torus(0.4, 0.08, 22), tone: 'body', pos: [0, 0.36, 0.78] },
          { geo: cyl(0.3, 0.3, 0.04, 22), tone: 'glow', pos: [0, 0.36, 0.8], rot: [HALF_PI, 0, 0], outline: false },
        ], -0.74),
      ]
    // ClassPass · SagePoint — skill taxonomy, the seed of retrieval: a ringed seed on a plinth.
    case 'classpass':
      return [
        ...padBase(),
        ...lift([
          { geo: torus(0.58, 0.14, 26), tone: 'body', pos: [0, 0.62, 0] },
          { geo: sph(0.34, 20, 16), tone: 'accent', pos: [0, 0.62, 0] },
          { geo: sph(0.17, 16, 12), tone: 'glow', pos: [0, 0.62, 0.24], outline: false },
          { geo: cyl(0.1, 0.16, 0.3, 14), tone: 'dark', pos: [0, 0.12, 0] }, // stem to the pad
        ], -0.74),
      ]
    // Splash — platform decomposition, services find their orbits: a core with satellites.
    case 'splash':
      return [
        ...padBase(),
        ...lift([
          { geo: tetra(0.72), tone: 'body', pos: [0, 0.95, 0] },
          { geo: ico(0.22), tone: 'accent', pos: [0.9, 1.27, 0.1] },
          { geo: ico(0.19), tone: 'accent', pos: [-0.72, 0.53, 0.42] },
          { geo: ico(0.17), tone: 'glow', pos: [0.12, 0.17, -0.4], outline: false },
          { geo: cyl(0.08, 0.14, 0.5, 12), tone: 'dark', pos: [0, 0.4, 0] }, // mast
        ], -0.74),
      ]
    // Justworks — stratosphere constellations, TimeEngine, payment orbits: cored octa + ring.
    case 'justworks':
      return [
        ...padBase(),
        ...lift([
          { geo: octa(0.72), tone: 'body', pos: [0, 1.0, 0] },
          { geo: torus(0.98, 0.055, 32), tone: 'accent', pos: [0, 1.0, 0], rot: [1.15, 0, 0.35] },
          { geo: sph(0.15, 12, 10), tone: 'glow', pos: [0.9, 1.18, 0.28], outline: false },
          { geo: sph(0.13, 12, 10), tone: 'glow', pos: [-0.62, 0.66, -0.55], outline: false },
          { geo: cyl(0.09, 0.16, 0.5, 12), tone: 'dark', pos: [0, 0.42, 0] }, // mast
        ], -0.74),
      ]
    // ACD · IntelliForia — orbit, MCP docking ports & retrieval beams: a satellite station.
    case 'acd':
      return [
        ...padBase(),
        ...lift([
          { geo: cyl(0.4, 0.4, 1.05, 18), tone: 'body', pos: [0, 0.95, 0], rot: [0, 0, HALF_PI] },
          { geo: box(1.15, 0.5, 0.04), tone: 'accent', pos: [0, 0.95, 0.5] },
          { geo: box(1.15, 0.5, 0.04), tone: 'accent', pos: [0, 0.95, -0.5] },
          { geo: cone(0.3, 0.42, 18), tone: 'accent', pos: [0.62, 0.95, 0], rot: [0, 0, -HALF_PI] },
          { geo: box(0.44, 0.09, 0.34), tone: 'glow', pos: [0, 1.37, 0], outline: false },
          { geo: sph(0.11, 10, 8), tone: 'glow', pos: [-0.55, 1.19, 0.2], outline: false },
          { geo: cyl(0.1, 0.18, 0.5, 12), tone: 'dark', pos: [0, 0.42, 0] }, // mast
        ], -0.74),
      ]
    // Axioms of AI — deep space, the framework as an orbital tablet: a glyph monolith + halo.
    case 'axioms':
      return [
        ...padBase(),
        ...lift([
          { geo: box(0.72, 1.5, 0.16), tone: 'body', pos: [0, 0.85, 0] },
          { geo: box(0.5, 0.14, 0.02), tone: 'glow', pos: [0, 1.31, 0.09], outline: false },
          { geo: box(0.5, 0.14, 0.02), tone: 'glow', pos: [0, 0.93, 0.09], outline: false },
          { geo: box(0.5, 0.14, 0.02), tone: 'glow', pos: [0, 0.55, 0.09], outline: false },
          { geo: torus(0.92, 0.05, 36), tone: 'accent', pos: [0, 0.85, 0], rot: [HALF_PI, 0, 0] },
        ], -0.74),
      ]
    default:
      return [...padBase(), ...lift([{ geo: ico(1.2), tone: 'body', pos: [0, 1.1, 0] }], -0.74)]
  }
}

const cache = new Map<string, Part[]>()
export function setPieceParts(kind: string): Part[] {
  let parts = cache.get(kind)
  if (!parts) {
    parts = build(kind)
    cache.set(kind, parts)
  }
  return parts
}
