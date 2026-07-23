import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { ERAS, SPACING, eraEmissive, REVEAL_START, REVEAL_HOLD, type Era } from '../../data/world'
import { detailTexture, DETAIL_ASPECT } from '../detail'
import { useWorld } from '../../state/store'

// AD-10 in-world content: each era's write-up rides a data-plate beside its set-piece, on the
// opposite side of the corridor. A plate lights up only while its era is the one you're passing,
// and clears once the reveal pitch takes the frame — the panels never fight the Earth beat.
const PANEL_W = 5.4
const PANEL_H = PANEL_W / DETAIL_ASPECT
const N = ERAS.length

function Panel({ era, i }: { era: Era; i: number }) {
  const tex = useMemo(() => detailTexture(era, eraEmissive(era)), [era])
  const grp = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const eraP = N > 1 ? era.seq / (N - 1) : 0
  // opposite side to the set-piece (which uses side = i%2===0 ? -1 : 1)
  const side = i % 2 === 0 ? 1 : -1
  const x = side * (3.1 + (i % 3) * 0.45)
  const y = era.seq * SPACING - 1.1

  useFrame(() => {
    const p = useWorld.getState().progress
    let vis = 1 - THREE.MathUtils.smoothstep(Math.abs(p - eraP), 0.04, 0.08)
    const revealT = THREE.MathUtils.clamp((p - REVEAL_START) / (REVEAL_HOLD - REVEAL_START), 0, 1)
    vis *= 1 - THREE.MathUtils.smoothstep(revealT, 0.2, 0.5)
    if (grp.current) grp.current.visible = vis > 0.02
    if (mat.current) mat.current.opacity = vis
  })

  return (
    <group ref={grp} position={[x, y, -3.4]} visible={false}>
      <mesh>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshBasicMaterial ref={mat} map={tex} transparent opacity={0} depthWrite={false} fog={false} />
      </mesh>
    </group>
  )
}

export function DetailPanels() {
  return (
    <>
      {ERAS.map((e, i) => (
        <Panel key={e.slug} era={e} i={i} />
      ))}
    </>
  )
}
