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

// Sky/fog color by altitude: warm dusk on the ground → deep space up top.
// This is what keeps the prologue from reading as a black void.
const SKY_STOPS = ['#2A2130', '#3A2C4A', '#28406A', '#173A63', '#0E2140', '#070E1C', '#05070D'].map(
  (c) => new THREE.Color(c),
)
function skyColorAt(p: number, out: THREE.Color) {
  const seg = Math.max(0, Math.min(1, p)) * (SKY_STOPS.length - 1)
  const i = Math.min(SKY_STOPS.length - 2, Math.floor(seg))
  return out.copy(SKY_STOPS[i]).lerp(SKY_STOPS[i + 1], seg - i)
}

function offsetFor(i: number): [number, number] {
  const side = i % 2 === 0 ? -1 : 1
  return [side * (2.6 + (i % 3) * 1.1), -1.5 - (i % 4) * 1.4]
}

function Atmosphere() {
  const { scene } = useThree()
  const fog = useMemo(() => new THREE.Fog('#2A2130', 26, 150), [])
  const bg = useMemo(() => new THREE.Color('#2A2130'), [])
  scene.fog = fog
  scene.background = bg
  useFrame(() => {
    skyColorAt(useWorld.getState().progress, bg)
    fog.color.copy(bg)
  })
  return null
}

// Climb the Career Sequence looking flat at the 2D parallax layers, then in the top ~24%
// pitch down toward the 3D Earth — the reveal.
function Rig() {
  const { camera } = useThree()
  const base = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    const p = useWorld.getState().progress
    const y = p * MAX_ALTITUDE
    const t = THREE.MathUtils.smoothstep(p, 0.76, 1.0)
    camera.position.set(0, y + t * 12, 12 + t * 12)
    base.set(0, y + 4, -12)
    look.copy(base).lerp(EARTH_V, t)
    camera.lookAt(look)
  })
  return null
}

function Stars() {
  const geo = useMemo(() => {
    const N = 1300
    const pos = new Float32Array(N * 3)
    let s = 20221011
    const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (rnd() - 0.5) * 120
      pos[i * 3 + 1] = MAX_ALTITUDE * 0.4 + rnd() * (MAX_ALTITUDE + 50)
      pos[i * 3 + 2] = -20 - rnd() * 60
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  return (
    <points geometry={geo}>
      <pointsMaterial color={tokens.ink1} size={0.18} sizeAttenuation transparent opacity={0.8} fog={false} />
    </points>
  )
}

export function AscentScene() {
  return (
    <>
      <Atmosphere />
      <Rig />
      {/* never let the ground go black */}
      <hemisphereLight args={['#8FB0D6', '#5A3A2E', 0.6]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 22, 10]} intensity={2.1} />
      {/* warm dusk fill that only reaches the launchpad — Origins glows */}
      <pointLight position={[0, 4, 7]} intensity={90} distance={60} decay={2} color="#FFB27A" />

      <Backdrop />
      <Earth />
      <Stars />

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
