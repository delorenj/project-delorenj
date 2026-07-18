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
      {/* scroll length: one viewport per sequence step gives the camera room to climb */}
      <div className="spacer" style={{ height: `${ERAS.length * 100}vh` }} />
      <Hud />
    </>
  )
}
