import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { AscentScene } from './scenes/AscentScene'
import { useWorld } from '../state/store'

// AD-3 the single canvas. Scenes swap inside it; it never remounts.
// Perf: dpr is adaptive — a 1.6 ceiling (plenty for flat cel + bloom), driven down by the
// PerformanceMonitor on weaker GPUs. Reduced-motion users get frameloop="demand" (nothing
// animates for them, so we render only on scroll instead of pinning 60fps).
// Cap render scale at 1.6× the device pixel ratio's own ceiling — never oversample a 1× screen,
// but pull a 2×/retina panel down to 1.6× (plenty for flat cel + bloom, big fragment saving).
const DPR_CAP = Math.min(1.6, typeof window !== 'undefined' ? window.devicePixelRatio : 1.6)

export function GlobalCanvas() {
  const reducedMotion = useWorld((s) => s.reducedMotion)
  const [dpr, setDpr] = useState(DPR_CAP)
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 900 }}
      dpr={dpr}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor
        flipflops={3}
        onChange={({ factor }) => setDpr(Math.round(DPR_CAP * (0.6 + 0.4 * factor) * 100) / 100)}
        onFallback={() => setDpr(Math.max(1, Math.round(DPR_CAP * 0.6 * 100) / 100))}
      />
      <AscentScene />
    </Canvas>
  )
}
