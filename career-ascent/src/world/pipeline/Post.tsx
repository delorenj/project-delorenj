import { EffectComposer, Bloom } from '@react-three/postprocessing'

// AD-12 the one post-pass: an HDR-threshold bloom so the diegetic glows (screens, engine flame,
// docking lights, glyphs, the neon top) actually emit light. Everything else is ACES-tonemapped
// by the renderer to ≤1 and stays under the threshold, so the flat cel clouds and toon faces do
// NOT bloom — only the toneMapped=false, >1 glow parts cross the line.
export function Post() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        mipmapBlur
        intensity={0.9}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.12}
        radius={0.72}
      />
    </EffectComposer>
  )
}
