import { Canvas } from '@react-three/fiber'
import { AscentScene } from './scenes/AscentScene'

// AD-3 the single canvas. Scenes swap inside it; it never remounts.
export function GlobalCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 250 }}
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <AscentScene />
    </Canvas>
  )
}
