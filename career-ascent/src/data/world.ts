// AD-1 World-Data core — the single source every scene, panel, waypoint, and the bail-out read.
// AD-2 Career Sequence axis: `seq` is the monotonic world order; altitude = seq * SPACING.
import { RAMP, EMISSIVE, BAND_NAMES } from '../design/tokens'

export type Shape = 'cyl' | 'octa' | 'box' | 'ico' | 'torus' | 'tetra' | 'sphere'

export interface Era {
  slug: string
  title: string
  seq: number
  band: number // 0..5 index into RAMP/EMISSIVE/BAND_NAMES
  years: string
  blurb: string
  tech: string[]
  shape: Shape
}

export const ERAS: Era[] = [
  { slug: 'prologue', title: 'Prologue', seq: 0, band: 0, years: 'launchpad', blurb: 'Lockheed / Unisys / Stevens — ignition on the pad.', tech: ['C', 'systems'], shape: 'cyl' },
  { slug: 'bae', title: 'BAE Systems', seq: 1, band: 0, years: '2004–2010', blurb: 'Radio hardware & signals: oscilloscopes, green waveforms, disciplined TDD.', tech: ['Java', 'J2EE', 'SCA', 'embedded'], shape: 'octa' },
  { slug: 'web', title: 'Web / Agency', seq: 2, band: 1, years: 'the climb begins', blurb: 'Off the ground plane — Ajax, Flash, Rails, first altitude.', tech: ['Ajax', 'Rails', 'JS'], shape: 'box' },
  { slug: 'warby', title: 'Warby Parker', seq: 3, band: 2, years: 'computer vision', blurb: 'Vision systems & calibration in the cloud layer.', tech: ['CV', 'calibration'], shape: 'ico' },
  { slug: 'classpass', title: 'ClassPass · SagePoint', seq: 4, band: 2, years: 'startup', blurb: 'Skill taxonomy → the seed of retrieval.', tech: ['taxonomy', 'search'], shape: 'torus' },
  { slug: 'splash', title: 'Splash', seq: 5, band: 2, years: 'platform', blurb: 'Platform decomposition — services find their orbits.', tech: ['platform', 'services'], shape: 'tetra' },
  { slug: 'justworks', title: 'Justworks', seq: 6, band: 3, years: '2018–2024', blurb: 'Stratosphere: architecture constellations, TimeEngine, payment orbits — whole-system sight.', tech: ['TimeEngine', 'GraphQL', 'distributed systems', 'hybrid RAG'], shape: 'octa' },
  { slug: 'acd', title: 'ACD · IntelliForia', seq: 7, band: 4, years: '2023–present', blurb: 'Orbit: MCP docking ports, retrieval beams, agent constellations.', tech: ['RAG', 'MCP', 'multi-agent', 'guardrails'], shape: 'ico' },
  { slug: 'axioms', title: 'Axioms of AI', seq: 8, band: 5, years: 'the framework', blurb: 'Deep space: the axioms as orbital tablets — the framework built from the arc.', tech: ['axioms', 'orchestration'], shape: 'sphere' },
]

export const SPACING = 18 // world units between sequence steps (roomy — eras shouldn't collide)
export const MAX_ALTITUDE = (ERAS.length - 1) * SPACING

// The reveal beat: pitch-down starts at REVEAL_START, the composition is fully settled by
// REVEAL_HOLD, and the remaining scroll HOLDS the Earth shot (slow drift only, so it breathes).
export const REVEAL_START = 0.66
export const REVEAL_HOLD = 0.92

export function eraColor(e: Era) { return RAMP[e.band] }
export function eraEmissive(e: Era) { return EMISSIVE[e.band] }
export function bandName(e: Era) { return BAND_NAMES[e.band] }

// The one website-y concession (AD-7 bail-out). TODO: confirm real links / add a video reel.
export const IDENTITY = {
  name: 'Jarad DeLorenzo',
  line: 'Staff Engineer / Systems Architect — 25+ years, ground to orbit.',
  links: [
    { label: 'Résumé', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
}
