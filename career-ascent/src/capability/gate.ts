import { getGPUTier } from '@pmndrs/detect-gpu'

// AD-7 capability gate: decide boot-the-world vs the static bail-out card.
export interface GateResult { ok: boolean; reason: string; tier: number }

export async function canRun(): Promise<GateResult> {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2')
  if (!gl) return { ok: false, reason: 'This experience needs WebGL2.', tier: 0 }

  const smallTouch =
    window.matchMedia('(pointer: coarse)').matches &&
    Math.min(window.innerWidth, window.innerHeight) < 560

  try {
    const t = await getGPUTier()
    if ((t.tier ?? 0) < 1) return { ok: false, reason: 'This GPU is below the floor for the world.', tier: t.tier ?? 0 }
    if (smallTouch && (t.tier ?? 0) < 2) return { ok: false, reason: 'Best on a laptop or desktop.', tier: t.tier ?? 0 }
    return { ok: true, reason: 'ok', tier: t.tier ?? 1 }
  } catch {
    // Detection failed — don't punish the visitor; let them in.
    return { ok: true, reason: 'ok', tier: 1 }
  }
}
