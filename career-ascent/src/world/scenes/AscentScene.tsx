import * as THREE from 'three'
import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { CelMesh } from '../pipeline/CelMesh'
import { ERAS, SPACING, MAX_ALTITUDE, eraColor } from '../../data/world'
import { RAMP, tokens } from '../../design/tokens'
import { useWorld } from '../../state/store'

const DEEP = new THREE.Color(tokens.canvasDeep)
const _c = new THREE.Color()

// grit -> neon: interpolate the 6-band ramp by progress.
function rampColorAt(p: number, out: THREE.Color) {
  const seg = Math.max(0, Math.min(1, p)) * (RAMP.length - 1)
  const i = Math.min(RAMP.length - 2, Math.floor(seg))
  const f = seg - i
  return out.set(RAMP[i]).lerp(_c.set(RAMP[i + 1]), f)
}

// A deterministic scatter so set-pieces flank the ascent column instead of stacking dead-center.
function offsetFor(i: number): [number, number] {
  const side = i % 2 === 0 ? -1 : 1
  const x = side * (2.6 + (i % 3) * 1.1)
  const z = -1.5 - (i % 4) * 1.4
  return [x, z]
}

function SkyAndFog() {
  const { scene } = useThree()
  const fog = useMemo(() => new THREE.Fog(tokens.canvasDeep, 16, 95), [])
  const bg = useMemo(() => new THREE.Color(tokens.canvasDeep), [])
  scene.fog = fog
  scene.background = bg
  useFrame(() => {
    const p = useWorld.getState().progress
    rampColorAt(p, bg).multiplyScalar(0.16).lerp(DEEP, 0.55)
    fog.color.copy(bg)
  })
  return null
}

function Rig() {
  const { camera } = useThree()
  useFrame(() => {
    const p = useWorld.getState().progress
    const y = p * MAX_ALTITUDE
    camera.position.set(0, y, 12)
    camera.lookAt(0, y + 4, -1)
  })
  return null
}

function Stars() {
  const geo = useMemo(() => {
    const N = 900
    const pos = new Float32Array(N * 3)
    let s = 20221011
    const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (rnd() - 0.5) * 90
      pos[i * 3 + 1] = rnd() * (MAX_ALTITUDE + 40) - 10
      pos[i * 3 + 2] = -10 - rnd() * 60
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  return (
    <points geometry={geo}>
      <pointsMaterial color={tokens.ink1} size={0.14} sizeAttenuation transparent opacity={0.7} />
    </points>
  )
}

export function AscentScene() {
  return (
    <>
      <SkyAndFog />
      <Rig />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 12, 8]} intensity={2.1} />
      <Stars />

      {/* the planet receding below the launchpad */}
      <CelMesh shape="sphere" color={RAMP[0]} position={[0, -SPACING * 2.4, -6]} scale={14} spin={0.01} outline={0.015} />

      {/* one cel set-piece per Career Sequence step, climbing grit -> neon */}
      {ERAS.map((e, i) => {
        const [x, z] = offsetFor(i)
        return (
          <CelMesh
            key={e.slug}
            shape={e.shape}
            color={eraColor(e)}
            position={[x, e.seq * SPACING, z]}
            scale={1.1 + (i % 3) * 0.25}
            spin={0.15 + (i % 4) * 0.06}
          />
        )
      })}
    </>
  )
}
