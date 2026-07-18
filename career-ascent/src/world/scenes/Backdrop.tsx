import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { skyGradient, cloudSprite, groundSilhouette } from '../textures'
import { MAX_ALTITUDE } from '../../data/world'
import { useWorld } from '../../state/store'

// The far, slow 2D parallax scenery. Everything here is fog-immune (it IS the horizon) and
// parallaxes purely from perspective as the camera translates up — near layers slide faster.
export function Backdrop() {
  const sky = useMemo(skyGradient, [])
  const cloud = useMemo(cloudSprite, [])
  const ground = useMemo(groundSilhouette, [])

  // a handful of cloud billboards banded around the low/mid altitudes, at staggered depth
  const clouds = useMemo(() => {
    const out: Array<{ pos: [number, number, number]; s: number; o: number }> = []
    let seed = 7
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
    for (let i = 0; i < 10; i++) {
      const y = 10 + rnd() * (MAX_ALTITUDE * 0.55)
      const z = -12 - rnd() * 12
      const x = (rnd() - 0.5) * 42
      out.push({ pos: [x, y, z], s: 7 + rnd() * 7, o: 0.5 + rnd() * 0.35 })
    }
    return out
  }, [])

  const drift = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (drift.current && !useWorld.getState().reducedMotion) drift.current.position.x = Math.sin(performance.now() * 0.00004) * 1.4
  })

  return (
    <group>
      {/* sky gradient — furthest, slowest */}
      <mesh position={[0, MAX_ALTITUDE / 2, -46]}>
        <planeGeometry args={[190, MAX_ALTITUDE + 90]} />
        <meshBasicMaterial map={sky} fog={false} depthWrite={false} />
      </mesh>

      {/* cloud band — mid depth */}
      <group ref={drift}>
        {clouds.map((c, i) => (
          <mesh key={i} position={c.pos} scale={c.s}>
            <planeGeometry args={[2.6, 1]} />
            <meshBasicMaterial map={cloud} transparent opacity={c.o} depthWrite={false} fog={false} />
          </mesh>
        ))}
      </group>

      {/* Origins — mountains + city, near the ground, greets you at the start */}
      <mesh position={[0, 2.2, -13]}>
        <planeGeometry args={[80, 24]} />
        <meshBasicMaterial map={ground} transparent depthWrite={false} fog={false} />
      </mesh>
    </group>
  )
}
