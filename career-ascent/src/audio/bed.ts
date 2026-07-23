import { useWorld } from '../state/store'

// AD-11 the ambient bed: a procedural synth drone that mirrors the ascent — dark and filtered
// on the ground, opening up with a high shimmer as chroma climbs to neon. Web Audio only, no
// asset. Never autoplays: the graph is built and the context resumed inside the toggle click
// (the required user gesture), and it stays off until then.
class AscentBed {
  private ctx: AudioContext | null = null
  private master!: GainNode
  private filter!: BiquadFilterNode
  private shimmer!: GainNode
  private unsub: (() => void) | null = null
  enabled = false

  private ensure() {
    if (this.ctx) return
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctor()
    this.ctx = ctx

    const master = ctx.createGain()
    master.gain.value = 0.0001
    master.connect(ctx.destination)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 200
    filter.Q.value = 0.9
    filter.connect(master)

    // drone chord (A2 root, E3 fifth, A3 octave) — detuned saws for a warm chorus
    const voices: Array<[number, number, OscillatorType, number]> = [
      [110, -6, 'sawtooth', 0.14],
      [110, 7, 'sawtooth', 0.14],
      [164.81, 0, 'sawtooth', 0.11],
      [220, -3, 'triangle', 0.09],
    ]
    for (const [freq, detune, type, gain] of voices) {
      const o = ctx.createOscillator()
      o.type = type
      o.frequency.value = freq
      o.detune.value = detune
      const g = ctx.createGain()
      g.gain.value = gain
      o.connect(g)
      g.connect(filter)
      o.start()
    }

    // sub weight (A1), straight to master so the filter sweep never thins the low end
    const sub = ctx.createOscillator()
    sub.type = 'sine'
    sub.frequency.value = 55
    const subG = ctx.createGain()
    subG.gain.value = 0.2
    sub.connect(subG)
    subG.connect(master)
    sub.start()

    // shimmer (A5) — silent on the ground, rises with altitude for the neon top
    const sh = ctx.createOscillator()
    sh.type = 'triangle'
    sh.frequency.value = 880
    const shG = ctx.createGain()
    shG.gain.value = 0
    sh.connect(shG)
    shG.connect(master)
    sh.start()
    this.shimmer = shG

    // slow cutoff drift so the pad breathes even when the scroll is still
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.05
    const lfoG = ctx.createGain()
    lfoG.gain.value = 130
    lfo.connect(lfoG)
    lfoG.connect(filter.frequency)
    lfo.start()

    this.master = master
    this.filter = filter
    this.apply(useWorld.getState().progress)
    this.unsub = useWorld.subscribe((s) => { if (this.enabled) this.apply(s.progress) })
  }

  private apply(p: number) {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    this.filter.frequency.setTargetAtTime(180 + p * p * 2200, now, 0.4) // opens toward neon
    this.shimmer.gain.setTargetAtTime(0.004 + Math.max(0, p - 0.4) * 0.055, now, 0.6)
  }

  async toggle(): Promise<boolean> {
    this.ensure()
    const ctx = this.ctx!
    if (ctx.state === 'suspended') await ctx.resume()
    this.enabled = !this.enabled
    const now = ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setTargetAtTime(this.enabled ? 0.16 : 0.0001, now, this.enabled ? 1.1 : 0.35)
    if (this.enabled) this.apply(useWorld.getState().progress)
    return this.enabled
  }

  dispose() {
    this.unsub?.()
    this.ctx?.close()
    this.ctx = null
  }
}

let bed: AscentBed | null = null
export function audioBed(): AscentBed {
  if (!bed) bed = new AscentBed()
  return bed
}
