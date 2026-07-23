import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { skyGradient, cloudSprite, groundSilhouette } from '../textures'
import { MAX_ALTITUDE, REVEAL_START } from '../../data/world'
import { useWorld } from '../../state/store'

// Origins mountains + city — greets you on the launchpad, fades out as you leave the ground
// (so it stops slashing across the Earth once you're in orbit).
function GroundLayer({ map }: { map: THREE.Texture }) {
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  useFrame(() => {
    if (mat.current) mat.current.opacity = THREE.MathUtils.clamp(1 - useWorld.getState().progress / 0.11, 0, 1)
  })
  return (
    <mesh position={[0, 2.4, -13]}>
      <planeGeometry args={[92, 26]} />
      <meshBasicMaterial ref={mat} map={map} transparent depthWrite={false} fog={false} />
    </mesh>
  )
}

export function Backdrop() {
  const sky = useMemo(skyGradient, [])
  const cloud = useMemo(cloudSprite, [])
  const ground = useMemo(groundSilhouette, [])

  const clouds = useMemo(() => {
    const out: Array<{ pos: [number, number, number]; s: number; o: number }> = []
    let seed = 7
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
    // concentrated in the clouds band, not smeared into space
    for (let i = 0; i < 12; i++) {
      const y = MAX_ALTITUDE * 0.3 + rnd() * (MAX_ALTITUDE * 0.36)
      const z = -11 - rnd() * 13
      const x = (rnd() - 0.5) * 50
      out.push({ pos: [x, y, z], s: 7 + rnd() * 7, o: 0.78 + rnd() * 0.22 }) // near-opaque: cel clouds are solid, translucent overlaps read as mist
    }
    return out
  }, [])

  const drift = useRef<THREE.Group>(null)
  const skyMat = useRef<THREE.MeshBasicMaterial>(null)
  const cloudMats = useRef<Array<THREE.MeshBasicMaterial | null>>([])
  useFrame(() => {
    const { progress: p, reducedMotion } = useWorld.getState()
    if (drift.current && !reducedMotion) drift.current.position.x = Math.sin(performance.now() * 0.00004) * 1.4
    // the reveal declutters: the flat sky plane and the cloud band belong to the side-view
    // ascent — fade them before the camera pitches far enough to catch the plane edge-on
    // (hard dusk stripes) or see the sprites floating over the Earth.
    if (skyMat.current) skyMat.current.opacity = 1 - THREE.MathUtils.smoothstep(p, REVEAL_START, REVEAL_START + 0.06)
    const cloudFade = 1 - THREE.MathUtils.smoothstep(p, REVEAL_START + 0.01, REVEAL_START + 0.09)
    for (let i = 0; i < cloudMats.current.length; i++) {
      const m = cloudMats.current[i]
      if (m) m.opacity = clouds[i].o * cloudFade
    }
  })

  return (
    <group>
      {/* sky gradient — furthest, slowest */}
      <mesh position={[0, MAX_ALTITUDE / 2, -46]}>
        <planeGeometry args={[190, MAX_ALTITUDE + 90]} />
        <meshBasicMaterial ref={skyMat} map={sky} fog={false} transparent depthWrite={false} />
      </mesh>

      {/* cloud band — mid depth, fogs away as you rise above it */}
      <group ref={drift}>
        {clouds.map((c, i) => (
          <mesh key={i} position={c.pos} scale={c.s}>
            <planeGeometry args={[2.6, 1]} />
            <meshBasicMaterial
              ref={(m) => { cloudMats.current[i] = m }}
              map={cloud}
              transparent
              opacity={c.o}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <GroundLayer map={ground} />
    </group>
  )
}
