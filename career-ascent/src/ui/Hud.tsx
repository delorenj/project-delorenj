import { useWorld } from '../state/store'
import { ERAS, MAX_ALTITUDE, bandName } from '../data/world'
import { jumpToEra } from '../scroll/useLenisScroll'

// AD-10 in-world content projected from the World-Data core (not hardcoded).
export function Hud() {
  const progress = useWorld((s) => s.progress)
  const active = useWorld((s) => s.activeEra)
  const era = ERAS[active]
  const altitude = Math.round(progress * MAX_ALTITUDE * 6) // diegetic km

  return (
    <div className="hud">
      <div className="era pane">
        <div className="eb">
          {bandName(era).toUpperCase()} <span className="pip">◆</span> SEQ {era.seq}/{ERAS.length - 1}
        </div>
        <h1>{era.title}</h1>
        <div className="yr">{era.years}</div>
      </div>

      <div className="tape pane">
        <span className="cap">ALT · km</span>
        <span className="num">{altitude}</span>
      </div>

      <nav className="rail pane" aria-label="Career timeline">
        {ERAS.map((e, i) => (
          <button
            key={e.slug}
            className={i === active ? 'wp active' : 'wp'}
            onClick={() => jumpToEra(i, ERAS.length)}
            title={`${e.title} · ${e.years}`}
          >
            <span className="dot" style={{ background: `var(--ramp-${e.band})` }} />
            <span className="nm">{e.title}</span>
          </button>
        ))}
      </nav>

      <div className="hint pane">Scroll — up is later</div>
    </div>
  )
}
