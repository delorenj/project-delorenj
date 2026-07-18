import { IDENTITY } from '../data/world'

// AD-7 the only non-WebGL surface: a sober static card when the world can't run.
export function BailOut({ reason }: { reason: string }) {
  return (
    <div className="bailout">
      <div className="card">
        <div className="eb">CAREER ASCENT</div>
        <h1>{IDENTITY.name}</h1>
        <p>{IDENTITY.line}</p>
        <div className="links">
          {IDENTITY.links.map((l) => (
            <a key={l.label} className="link" href={l.href}>{l.label} ↗</a>
          ))}
        </div>
        {reason && reason !== 'ok' && <div className="why">{reason} The full cel-shaded world wants a real GPU.</div>}
      </div>
    </div>
  )
}
