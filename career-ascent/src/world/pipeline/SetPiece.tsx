import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { toonGradient } from './cel'
import { tokens } from '../../design/tokens'
import { useWorld } from '../../state/store'
import { setPieceParts, type Part, type Tone } from './models'
import { MAX_ALTITUDE, SPACING, REVEAL_START, REVEAL_HOLD } from '../../data/world'

// AD-6 the cel pipeline: a set-piece is an assembly of toon-shaded parts, each wrapped in an
// inverted-hull ink outline (the Borderlands contour). Glow parts are unlit and skip the hull.
// The whole rig slow-spins and melts away during the Earth reveal so it never reads as debris.
const METAL_ACCENT = '#454F5E'
const METAL_DARK = '#20222E'

function toneColor(tone: Tone, color: string, emissive: string): string {
  switch (tone) {
    case 'glow': return emissive
    case 'accent': return METAL_ACCENT
    case 'dark': return METAL_DARK
    default: return color
  }
}

// glow parts push past 1.0 (toneMapped off) so the bloom pass — and only the bloom pass —
// picks them up; the multiplier sets how hard each one flares.
const GLOW_HDR = 2.3

function PartMesh({ part, color, emissive, outline }: { part: Part; color: string; emissive: string; outline: number }) {
  const col = toneColor(part.tone, color, emissive)
  const rot = part.rot ?? [0, 0, 0]
  const pos = part.pos ?? [0, 0, 0]
  const glow = useMemo(() => new THREE.Color(col).multiplyScalar(GLOW_HDR), [col])
  if (part.tone === 'glow') {
    return (
      <mesh geometry={part.geo} position={pos} rotation={rot}>
        <meshBasicMaterial color={glow} toneMapped={false} transparent fog={false} />
      </mesh>
    )
  }
  const withHull = part.outline !== false
  return (
    <group position={pos} rotation={rot}>
      <mesh geometry={part.geo}>
        <meshToonMaterial color={col} gradientMap={toonGradient()} transparent />
      </mesh>
      {withHull && (
        <mesh geometry={part.geo} scale={1 + outline}>
          <meshBasicMaterial color={tokens.ink} side={THREE.BackSide} transparent />
        </mesh>
      )}
    </group>
  )
}

function setOpacity(group: THREE.Object3D, o: number) {
  group.traverse((n) => {
    const m = (n as THREE.Mesh).material as THREE.Material | undefined
    if (m) m.opacity = o
  })
}

export function SetPiece({
  kind,
  color,
  emissive,
  position,
  scale = 1,
  outline = 0.08,
  spin = 0.2,
}: {
  kind: string
  color: string
  emissive: string
  position: [number, number, number]
  scale?: number
  outline?: number
  spin?: number
}) {
  const parts = useMemo(() => setPieceParts(kind), [kind])
  const ref = useRef<THREE.Group>(null)
  // this piece's location along the scroll, for distance culling
  const pieceP = position[1] / MAX_ALTITUDE

  useFrame((_, dt) => {
    const g = ref.current
    if (!g) return
    const { progress, reducedMotion } = useWorld.getState()

    // LOD/cull: pieces well outside the current view band aren't drawn, don't spin, and — since
    // their glow is hidden — don't feed the bloom pass. Frustum culling already skips off-screen
    // draws; this also kills the per-frame churn and bright pixels for far pieces.
    if (Math.abs(progress - pieceP) > 0.24) {
      if (g.visible) g.visible = false
      return
    }

    if (spin && !reducedMotion) g.rotation.y += spin * dt
    // reveal declutter — set-pieces below the corridor top fade out as the camera pitches to
    // Earth (fade completes ahead of the pitch so no half-ghosts hang over the globe).
    const t = THREE.MathUtils.clamp((progress - REVEAL_START) / ((REVEAL_HOLD - REVEAL_START) * 0.65), 0, 1)
    const below = THREE.MathUtils.clamp((MAX_ALTITUDE - SPACING * 0.5 - position[1]) / (SPACING * 0.5), 0, 1)
    const fade = 1 - t * below
    if (fade >= 0.999) {
      if (g.userData.faded) { setOpacity(g, 1); g.userData.faded = false }
      g.visible = true
      return
    }
    g.userData.faded = true
    g.visible = fade > 0.02
    if (g.visible) setOpacity(g, fade)
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      {parts.map((p, i) => (
        <PartMesh key={i} part={p} color={color} emissive={emissive} outline={outline} />
      ))}
    </group>
  )
}
