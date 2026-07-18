import { create } from 'zustand'
import { ERAS } from '../data/world'

interface WorldState {
  progress: number // 0..1 along the Career Sequence
  activeEra: number
  reducedMotion: boolean
  setProgress: (p: number) => void
  setReducedMotion: (v: boolean) => void
}

const COUNT = ERAS.length

export const useWorld = create<WorldState>((set) => ({
  progress: 0,
  activeEra: 0,
  reducedMotion:
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  setProgress: (p) => {
    const clamped = p < 0 ? 0 : p > 1 ? 1 : p
    const active = Math.round(clamped * (COUNT - 1))
    set((s) => (s.activeEra === active && s.progress === clamped ? s : { progress: clamped, activeEra: active }))
  },
  setReducedMotion: (v) => set({ reducedMotion: v }),
}))
