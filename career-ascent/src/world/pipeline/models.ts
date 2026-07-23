import * as THREE from 'three'

// AD-6 the cel pipeline, part 3: set-pieces are no longer bare primitives — each era is a
// small assembly of toon parts that reads as a real object (radio bench, camera rig, station,
// tablet…). Pure geometry only; the SetPiece component owns material, outline, and reveal-fade.
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

// Every model lives in a roughly 2-unit box centered on its origin; the scene scales it.
function build(kind: string): Part[] {
  switch (kind) {
    // Prologue — ignition on the pad: a stubby rocket with fins and an engine glow.
    case 'prologue':
      return [
        { geo: cyl(0.3, 0.4, 1.4, 18), tone: 'body', pos: [0, 0.15, 0] },
        { geo: cone(0.3, 0.5, 18), tone: 'accent', pos: [0, 1.1, 0] },
        { geo: box(0.5, 0.5, 0.1), tone: 'accent', pos: [0, -0.5, 0.32] },
        { geo: box(0.5, 0.5, 0.1), tone: 'accent', pos: [0, -0.5, -0.32] },
        { geo: box(0.1, 0.5, 0.5), tone: 'accent', pos: [0.32, -0.5, 0] },
        { geo: sph(0.22, 12, 8), tone: 'glow', pos: [0, -0.95, 0], outline: false },
      ]
    // BAE — radio hardware & signals: an oscilloscope bench, green waveform on the screen.
    case 'bae':
      return [
        { geo: box(1.3, 0.95, 0.7), tone: 'body', pos: [0, 0, 0] },
        { geo: box(0.86, 0.62, 0.08), tone: 'dark', pos: [-0.08, 0.06, 0.37] },
        { geo: box(0.7, 0.46, 0.06), tone: 'glow', pos: [-0.08, 0.06, 0.42], outline: false },
        { geo: cyl(0.045, 0.045, 0.85, 10), tone: 'accent', pos: [0.5, 0.85, 0] },
        { geo: sph(0.08, 10, 8), tone: 'glow', pos: [0.5, 1.32, 0], outline: false },
        { geo: cyl(0.09, 0.09, 0.1, 12), tone: 'accent', pos: [0.44, -0.3, 0.37], rot: [HALF_PI, 0, 0] },
        { geo: cyl(0.09, 0.09, 0.1, 12), tone: 'accent', pos: [0.2, -0.3, 0.37], rot: [HALF_PI, 0, 0] },
      ]
    // Web / Agency — off the ground plane: a stacked server/monitor tower with a status strip.
    case 'web':
      return [
        { geo: box(1.0, 1.35, 0.9), tone: 'body', pos: [0, 0, 0] },
        { geo: box(0.92, 0.06, 0.84), tone: 'dark', pos: [0, 0.34, 0] },
        { geo: box(0.92, 0.06, 0.84), tone: 'dark', pos: [0, 0.04, 0] },
        { geo: box(0.92, 0.06, 0.84), tone: 'dark', pos: [0, -0.26, 0] },
        { geo: box(0.12, 0.5, 0.06), tone: 'glow', pos: [0.3, 0.5, 0.46], outline: false },
      ]
    // Warby Parker — computer vision & calibration: a camera body with a glowing lens.
    case 'warby':
      return [
        { geo: box(0.72, 0.72, 0.72), tone: 'body', pos: [0, 0, -0.2] },
        { geo: cyl(0.4, 0.42, 0.7, 20), tone: 'accent', pos: [0, 0, 0.42], rot: [HALF_PI, 0, 0] },
        { geo: torus(0.4, 0.08, 22), tone: 'body', pos: [0, 0, 0.78] },
        { geo: cyl(0.3, 0.3, 0.04, 22), tone: 'glow', pos: [0, 0, 0.8], rot: [HALF_PI, 0, 0], outline: false },
      ]
    // ClassPass · SagePoint — skill taxonomy, the seed of retrieval: a ringed seed / iris.
    case 'classpass':
      return [
        { geo: torus(0.58, 0.14, 26), tone: 'body', pos: [0, 0, 0] },
        { geo: sph(0.34, 20, 16), tone: 'accent', pos: [0, 0, 0] },
        { geo: sph(0.17, 16, 12), tone: 'glow', pos: [0, 0, 0.24], outline: false },
      ]
    // Splash — platform decomposition, services find their orbits: a core with satellites.
    case 'splash':
      return [
        { geo: tetra(0.72), tone: 'body', pos: [0, 0, 0] },
        { geo: ico(0.22), tone: 'accent', pos: [0.9, 0.32, 0.1] },
        { geo: ico(0.19), tone: 'accent', pos: [-0.72, -0.42, 0.42] },
        { geo: ico(0.17), tone: 'glow', pos: [0.12, -0.78, -0.4], outline: false },
      ]
    // Justworks — stratosphere constellations, TimeEngine, payment orbits: cored octa + ring.
    case 'justworks':
      return [
        { geo: octa(0.72), tone: 'body', pos: [0, 0, 0] },
        { geo: torus(0.98, 0.055, 32), tone: 'accent', pos: [0, 0, 0], rot: [1.15, 0, 0.35] },
        { geo: sph(0.15, 12, 10), tone: 'glow', pos: [0.9, 0.18, 0.28], outline: false },
        { geo: sph(0.13, 12, 10), tone: 'glow', pos: [-0.62, -0.34, -0.55], outline: false },
      ]
    // ACD · IntelliForia — orbit, MCP docking ports & retrieval beams: a satellite station.
    case 'acd':
      return [
        { geo: cyl(0.4, 0.4, 1.05, 18), tone: 'body', pos: [0, 0, 0], rot: [0, 0, HALF_PI] },
        { geo: box(1.15, 0.5, 0.04), tone: 'accent', pos: [0, 0, 0.5] },
        { geo: box(1.15, 0.5, 0.04), tone: 'accent', pos: [0, 0, -0.5] },
        { geo: cone(0.3, 0.42, 18), tone: 'accent', pos: [0.62, 0, 0], rot: [0, 0, -HALF_PI] },
        { geo: box(0.44, 0.09, 0.34), tone: 'glow', pos: [0, 0.42, 0], outline: false },
        { geo: sph(0.11, 10, 8), tone: 'glow', pos: [-0.55, 0.24, 0.2], outline: false },
      ]
    // Axioms of AI — deep space, the framework as an orbital tablet: a glyph monolith + halo.
    case 'axioms':
      return [
        { geo: box(0.72, 1.5, 0.16), tone: 'body', pos: [0, 0, 0] },
        { geo: box(0.5, 0.14, 0.02), tone: 'glow', pos: [0, 0.46, 0.09], outline: false },
        { geo: box(0.5, 0.14, 0.02), tone: 'glow', pos: [0, 0.08, 0.09], outline: false },
        { geo: box(0.5, 0.14, 0.02), tone: 'glow', pos: [0, -0.3, 0.09], outline: false },
        { geo: torus(0.92, 0.05, 36), tone: 'accent', pos: [0, 0, 0], rot: [HALF_PI, 0, 0] },
      ]
    default:
      return [{ geo: ico(1.2), tone: 'body', pos: [0, 0, 0] }]
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
