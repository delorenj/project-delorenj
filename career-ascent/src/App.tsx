import { useEffect, useState } from 'react'
import { canRun } from './capability/gate'
import { GlobalCanvas } from './world/GlobalCanvas'
import { Hud } from './ui/Hud'
import { BailOut } from './ui/BailOut'
import { Boot } from './ui/Boot'
import { useLenisScroll } from './scroll/useLenisScroll'
import { ERAS } from './data/world'

type Phase = 'checking' | 'run' | 'bail'

export default function App() {
  const [phase, setPhase] = useState<Phase>('checking')
  const [reason, setReason] = useState('')

  useEffect(() => {
    let alive = true
    // debug bypass: ?force skips the capability gate (lets a software-GL headless render the world)
    if (new URLSearchParams(location.search).has('force')) { setPhase('run'); return }
    canRun().then((r) => {
      if (!alive) return
      setReason(r.reason)
      setPhase(r.ok ? 'run' : 'bail')
    })
    return () => { alive = false }
  }, [])

  if (phase === 'checking') return <Boot />
  if (phase === 'bail') return <BailOut reason={reason} />
  return <Experience />
}

function Experience() {
  useLenisScroll() // AD-4 scroll authority
  return (
    <>
      <div className="stage"><GlobalCanvas /></div>
      {/* scroll length: generous per-era so 25 years FEELS like a climb (tune VH_PER_ERA) */}
      <div className="spacer" style={{ height: `${ERAS.length * 340}vh` }} />
      <Hud />
    </>
  )
}
