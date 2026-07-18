import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { toonGradient } from './cel'
import { tokens } from '../../design/tokens'
import { useWorld } from '../../state/store'
import type { Shape } from '../../data/world'

// AD-6 the cel pipeline, part 2: every set-piece is a toon-shaded mesh wrapped in an
// inverted-hull ink outline (back-face, scaled up, flat black) — the Borderlands contour,
// cheap and reliable, no post-pass required at this tier.
function makeGeo(shape: Shape): THREE.BufferGeometry {
  switch (shape) {
    case 'cyl': return new THREE.CylinderGeometry(0.85, 1.0, 2.2, 14)
    case 'octa': return new THREE.OctahedronGeometry(1.25, 0)
    case 'box': return new THREE.BoxGeometry(1.5, 1.5, 1.5)
    case 'ico': return new THREE.IcosahedronGeometry(1.3, 0)
    case 'torus': return new THREE.TorusGeometry(1.05, 0.4, 12, 22)
    case 'tetra': return new THREE.TetrahedronGeometry(1.4)
    default: return new THREE.SphereGeometry(1.25, 28, 18)
  }
}

export function CelMesh({
  shape,
  color,
  position,
  scale = 1,
  outline = 0.06,
  spin = 0.25,
}: {
  shape: Shape
  color: string
  position: [number, number, number]
  scale?: number
  outline?: number
  spin?: number
}) {
  const geo = useMemo(() => makeGeo(shape), [shape])
  const ref = useRef<THREE.Group>(null)

  useFrame((_, dt) => {
    if (!ref.current) return
    if (spin && !useWorld.getState().reducedMotion) ref.current.rotation.y += spin * dt
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={geo}>
        <meshToonMaterial color={color} gradientMap={toonGradient()} />
      </mesh>
      <mesh geometry={geo} scale={1 + outline}>
        <meshBasicMaterial color={tokens.ink} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}
