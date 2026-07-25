import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { ERAS, SPACING, eraEmissive, REVEAL_START, REVEAL_HOLD, type Era } from '../../data/world'
import { detailTexture, DETAIL_ASPECT } from '../detail'
import { useWorld } from '../../state/store'

// AD-10 in-world content: each era's write-up rides a data-plate beside its set-piece, on the
// opposite side of the corridor. A plate lights up only while its era is the one you're passing,
// and clears once the reveal pitch takes the frame — the panels never fight the Earth beat.
// Perf/LOD: the 1024² plate texture is built only when you approach the era and disposed once
// you leave (hysteresis window), so we hold ~1 plate in GPU memory instead of all nine, and
// the ones off-screen are neither rasterized at load nor kept resident.
const PANEL_W = 5.4
const PANEL_H = PANEL_W / DETAIL_ASPECT
const N = ERAS.length
const BUILD_AT = 0.11 // start rasterizing this far out (> the 0.08 visibility edge)
const DROP_AT = 0.16 // dispose past here — the gap is the anti-thrash hysteresis

function Panel({ era, i }: { era: Era; i: number }) {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null)
  const texRef = useRef<THREE.CanvasTexture | null>(null)
  const grp = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const eraP = N > 1 ? era.seq / (N - 1) : 0
  // opposite side to the set-piece (which uses side = i%2===0 ? -1 : 1)
  const side = i % 2 === 0 ? 1 : -1
  const x = side * (3.1 + (i % 3) * 0.45)
  const y = era.seq * SPACING - 1.1

  useFrame(() => {
    const p = useWorld.getState().progress
    const d = Math.abs(p - eraP)
    // lazy build / dispose across the hysteresis band
    if (d < BUILD_AT && !texRef.current) {
      const t = detailTexture(era, eraEmissive(era))
      texRef.current = t
      setTex(t)
    } else if (d > DROP_AT && texRef.current) {
      texRef.current.dispose()
      texRef.current = null
      setTex(null)
    }
    let vis = 1 - THREE.MathUtils.smoothstep(d, 0.04, 0.08)
    const revealT = THREE.MathUtils.clamp((p - REVEAL_START) / (REVEAL_HOLD - REVEAL_START), 0, 1)
    vis *= 1 - THREE.MathUtils.smoothstep(revealT, 0.2, 0.5)
    if (grp.current) grp.current.visible = !!texRef.current && vis > 0.02
    if (mat.current) mat.current.opacity = vis
  })

  useEffect(() => () => { texRef.current?.dispose() }, [])

  return (
    <group ref={grp} position={[x, y, -3.4]} visible={false}>
      {tex && (
        <mesh>
          <planeGeometry args={[PANEL_W, PANEL_H]} />
          <meshBasicMaterial ref={mat} map={tex} transparent opacity={0} depthWrite={false} fog={false} />
        </mesh>
      )}
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
