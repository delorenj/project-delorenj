import * as THREE from 'three'

// AD-6 the cel pipeline, part 1: a stepped gradient ramp for MeshToonMaterial so lighting
// quantizes into flat poster bands instead of a smooth falloff. Shared singleton.
let grad: THREE.DataTexture | null = null

export function toonGradient(): THREE.DataTexture {
  if (grad) return grad
  const steps = new Uint8Array([70, 140, 205, 255]) // 4 discrete light bands
  const t = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat)
  t.needsUpdate = true
  t.minFilter = THREE.NearestFilter
  t.magFilter = THREE.NearestFilter
  grad = t
  return t
}
