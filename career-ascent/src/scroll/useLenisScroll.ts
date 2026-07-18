import { useEffect } from 'react'
import Lenis from 'lenis'
import { useWorld } from '../state/store'
import { ERAS } from '../data/world'

// AD-4 one scroll authority. "Up = later": you START on the ground at the BOTTOM of the page
// and scroll UP to ascend. Lenis reports e.progress 0(top)..1(bottom), so world progress is
// the inverse. The camera rig reads it imperatively in useFrame (never setState in the loop).
let lenisRef: Lenis | null = null

export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.09 })
    lenisRef = lenis
    const setProgress = useWorld.getState().setProgress
    lenis.on('scroll', (e: { progress?: number }) => setProgress(1 - (e.progress ?? 0)))

    // begin on the ground: jump to the page bottom, world progress = 0
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      lenis.scrollTo(max, { immediate: true })
      setProgress(0)
    })

    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef = null }
  }, [])
}

// Waypoint jump (interruptible). Higher seq = later = nearer the top of the page.
export function jumpToEra(seq: number) {
  const lenis = lenisRef
  if (!lenis) return
  const count = ERAS.length
  const p = count > 1 ? seq / (count - 1) : 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  lenis.scrollTo((1 - p) * max, { duration: 1.5 })
}
