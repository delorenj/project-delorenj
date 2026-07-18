import * as THREE from 'three'
import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { CelMesh } from '../pipeline/CelMesh'
import { Backdrop } from './Backdrop'
import { Earth, EARTH_CENTER } from './Earth'
import { ERAS, SPACING, MAX_ALTITUDE, eraColor } from '../../data/world'
import { tokens } from '../../design/tokens'
import { useWorld } from '../../state/store'

const EARTH_V = new THREE.Vector3(...EARTH_CENTER)

function offsetFor(i: number): [number, number] {
  const side = i % 2 === 0 ? -1 : 1
  return [side * (2.6 + (i % 3) * 1.1), -1.5 - (i % 4) * 1.4]
}

function Atmosphere() {
  const { scene } = useThree()
  const fog = useMemo(() => new THREE.Fog(tokens.canvasDeep, 22, 130), [])
  const bg = useMemo(() => new THREE.Color(tokens.canvasDeep), [])
  scene.fog = fog
  scene.background = bg
  return null
}

// The camera flight: climb the Career Sequence looking flat at the 2D parallax layers,
// then in the top ~24% pitch down toward the 3D Earth — the reveal.
function Rig() {
  const { camera } = useThree()
  const base = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    const p = useWorld.getState().progress
    const y = p * MAX_ALTITUDE
    const t = THREE.MathUtils.smoothstep(p, 0.76, 1.0)
    camera.position.set(0, y + t * 9, 12 + t * 9)
    base.set(0, y + 4, -12)
    look.copy(base).lerp(EARTH_V, t)
    camera.lookAt(look)
  })
  return null
}

function Stars() {
  const geo = useMemo(() => {
    const N = 1100
    const pos = new Float32Array(N * 3)
    let s = 20221011
    const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (rnd() - 0.5) * 110
      pos[i * 3 + 1] = MAX_ALTITUDE * 0.35 + rnd() * (MAX_ALTITUDE + 40)
      pos[i * 3 + 2] = -20 - rnd() * 55
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  return (
    <points geometry={geo}>
      <pointsMaterial color={tokens.ink1} size={0.16} sizeAttenuation transparent opacity={0.75} fog={false} />
    </points>
  )
}

export function AscentScene() {
  return (
    <>
      <Atmosphere />
      <Rig />
      <ambientLight intensity={0.6} />
      <directionalLight position={[7, 14, 9]} intensity={2.2} />

      <Backdrop />
      <Earth />
      <Stars />

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
