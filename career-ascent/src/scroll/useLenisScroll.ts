import { useEffect } from 'react'
import Lenis from 'lenis'
import { useWorld } from '../state/store'

// AD-4 one scroll authority. Lenis smooths window scroll and publishes progress (0..1)
// to the store; the camera rig reads it imperatively in useFrame (never setState in the loop).
let lenisRef: Lenis | null = null

export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.09 })
    lenisRef = lenis
    const setProgress = useWorld.getState().setProgress
    lenis.on('scroll', (e: { progress?: number }) => setProgress(e.progress ?? 0))

    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)

    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef = null }
  }, [])
}

// Waypoint jump (interruptible by any manual scroll). GSAP-driven timeline is the next pass.
export function jumpToEra(index: number, count: number) {
  const lenis = lenisRef
  if (!lenis) return
  const target = count > 1 ? index / (count - 1) : 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  lenis.scrollTo(target * max, { duration: 1.5 })
}
