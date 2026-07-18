import { useWorld } from '../state/store'
import { ERAS, MAX_ALTITUDE, bandName } from '../data/world'
import { jumpToEra } from '../scroll/useLenisScroll'

// AD-10 in-world content projected from the World-Data core (not hardcoded).
export function Hud() {
  const progress = useWorld((s) => s.progress)
  const active = useWorld((s) => s.activeEra)
  const era = ERAS[active]
  const altitude = Math.round(progress * MAX_ALTITUDE * 6) // diegetic km
  const seq2 = String(era.seq + 1).padStart(2, '0')

  // rail: latest at top, START (Origins) at the bottom — matches "up = later".
  const rail = ERAS.slice().reverse()

  return (
    <div className="hud">
      <div className="era pane">
        <div className="eb">{seq2} <span className="pip">·</span> {bandName(era).toUpperCase()}</div>
        <h1>{era.title}</h1>
        <div className="yr">{era.years}</div>
      </div>

      <div className="tape pane">
        <span className="cap">ALT · km</span>
        <span className="num">{altitude}</span>
      </div>

      <nav className="rail pane" aria-label="Career timeline">
        <span className="rail-cap top">PRESENT ▲</span>
        {rail.map((e) => (
          <button
            key={e.slug}
            className={e.seq === active ? 'wp active' : 'wp'}
            onClick={() => jumpToEra(e.seq)}
            title={`${e.title} · ${e.years}`}
          >
            <span className="dot" style={{ background: `var(--ramp-${e.band})` }} />
            <span className="nm">{e.title}</span>
          </button>
        ))}
        <span className="rail-cap bot">START ▼</span>
      </nav>

      <div className="hint pane">Scroll up to ascend — up is later</div>
    </div>
  )
}
