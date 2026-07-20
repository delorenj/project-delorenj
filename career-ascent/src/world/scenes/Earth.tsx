import { useMemo } from 'react'
import * as THREE from 'three'
import { toonGradient } from '../pipeline/cel'
import { tokens } from '../../design/tokens'

// The 3D reveal: a real cel-shaded globe far below. Flat while it's off-camera; the moment
// the rig pitches down near space, its curvature + atmosphere rim announce the third dimension.
export const EARTH_CENTER: [number, number, number] = [0, -18, -6]
const R = 48

export function Earth() {
  const geo = useMemo(() => new THREE.SphereGeometry(R, 48, 32), [])
  return (
    <group position={EARTH_CENTER}>
      {/* atmosphere rim (flat, back-face) */}
      <mesh scale={1.05}>
        <sphereGeometry args={[R, 48, 32]} />
        <meshBasicMaterial color="#5AA6E6" side={THREE.BackSide} transparent opacity={0.45} fog={false} />
      </mesh>
      {/* toon globe */}
      <mesh geometry={geo}>
        <meshToonMaterial color="#2E6EA6" gradientMap={toonGradient()} fog={false} />
      </mesh>
      {/* ink outline */}
      <mesh geometry={geo} scale={1.01}>
        <meshBasicMaterial color={tokens.ink} side={THREE.BackSide} fog={false} />
      </mesh>
      {/* a couple of cel land masses */}
      <mesh position={[R * 0.2, R * 0.55, R * 0.72]}>
        <sphereGeometry args={[R * 0.34, 20, 14]} />
        <meshToonMaterial color="#3E8A5A" gradientMap={toonGradient()} fog={false} />
      </mesh>
      <mesh position={[-R * 0.55, R * 0.1, R * 0.66]}>
        <sphereGeometry args={[R * 0.26, 18, 12]} />
        <meshToonMaterial color="#4A925F" gradientMap={toonGradient()} fog={false} />
      </mesh>
    </group>
  )
}
