import * as THREE from 'three'
import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { SetPiece } from '../pipeline/SetPiece'
import { Backdrop } from './Backdrop'
import { DetailPanels } from './DetailPanels'
import { Earth, EARTH_CENTER } from './Earth'
import { ERAS, SPACING, MAX_ALTITUDE, eraColor, eraEmissive, REVEAL_START, REVEAL_HOLD } from '../../data/world'
import { tokens } from '../../design/tokens'
import { useWorld } from '../../state/store'

const EARTH_V = new THREE.Vector3(...EARTH_CENTER)

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

// The camera as a scrubbable GSAP timeline: eased climb that settles into each era, a subtle
// bank toward each set-piece, and the reveal as a deliberate power-curve beat at the top.
function buildTimeline(rig: { alt: number; dolly: number; pitch: number; roll: number; fov: number }) {
  const N = ERAS.length
  const seg = 1 / (N - 1)
  const tl = gsap.timeline({ paused: true })

  // altitude — hit each era at its scroll-time, eased so the camera decelerates on arrival
  for (let i = 1; i < N; i++) {
    tl.to(rig, { alt: i * SPACING, duration: seg, ease: 'power1.inOut' }, (i - 1) * seg)
  }
  // bank toward each era's set-piece as you pass it, settle before the reveal
  for (let i = 1; i <= 5; i++) {
    const side = i % 2 === 0 ? -1 : 1
    tl.to(rig, { roll: side * 0.05, duration: seg * 0.5, ease: 'sine.inOut' }, i * seg - seg * 0.25)
    tl.to(rig, { roll: 0, duration: seg * 0.5, ease: 'sine.inOut' }, i * seg + seg * 0.25)
  }
  // gentle FOV settle through the atmosphere
  tl.to(rig, { fov: 54, duration: REVEAL_START, ease: 'sine.inOut' }, 0)
  // THE REVEAL — pitch down to Earth, dolly back, punch the FOV wide, settled by REVEAL_HOLD…
  tl.to(rig, { pitch: 1, duration: REVEAL_HOLD - REVEAL_START, ease: 'power3.inOut' }, REVEAL_START)
  tl.to(rig, { dolly: 30, duration: REVEAL_HOLD - REVEAL_START, ease: 'power2.inOut' }, REVEAL_START)
  tl.to(rig, { fov: 66, duration: REVEAL_HOLD - REVEAL_START, ease: 'power2.out' }, REVEAL_START)
  // …then HOLD the beat: the composition stays put and just breathes on a slow drift back
  tl.to(rig, { dolly: 33.5, duration: 1 - REVEAL_HOLD, ease: 'sine.out' }, REVEAL_HOLD)
  return tl
}

function Rig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const { rig, tl } = useMemo(() => {
    const r = { alt: 0, dolly: 13, pitch: 0, roll: 0, fov: 58 }
    return { rig: r, tl: buildTimeline(r) }
  }, [])
  const base = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    tl.progress(THREE.MathUtils.clamp(useWorld.getState().progress, 0, 1))
    camera.position.set(0, rig.alt + rig.pitch * 6, rig.dolly)
    base.set(0, rig.alt + 4, -12)
    look.copy(base).lerp(EARTH_V, rig.pitch)
    camera.up.set(Math.sin(rig.roll), Math.cos(rig.roll), 0)
    camera.lookAt(look)
    if (camera.fov !== rig.fov) { camera.fov = rig.fov; camera.updateProjectionMatrix() }
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
      <hemisphereLight args={['#8FB0D6', '#5A3A2E', 0.6]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 22, 10]} intensity={2.1} />
      <pointLight position={[0, 4, 7]} intensity={90} distance={60} decay={2} color="#FFB27A" />

      <Backdrop />
      <Earth />
      <Stars />

      {ERAS.map((e, i) => {
        const [x, z] = offsetFor(i)
        return (
          <SetPiece
            key={e.slug}
            kind={e.slug}
            color={eraColor(e)}
            emissive={eraEmissive(e)}
            position={[x, e.seq * SPACING, z]}
            scale={0.9 + (i % 3) * 0.18}
            spin={0.14 + (i % 4) * 0.05}
          />
        )
      })}

      <DetailPanels />
    </>
  )
}
