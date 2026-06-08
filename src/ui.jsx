import { CATS, img } from './data/events'
import { Pin, Clock, Heart, ArrowL, Share, Star } from './lib/icons'

export function CatTag({ cat }) {
  const c = CATS[cat]
  return <span className={`tag ${c.color}`}>{c.label}</span>
}

export function EventCard({ ev, nav, saved, onSave }) {
  return (
    <div className="ecard" onClick={() => nav('detail', { id: ev.id })}>
      <div className="img">
        <img src={img(ev.img)} alt="" loading="lazy" />
        <div className="cat"><CatTag cat={ev.cat} /></div>
        <button className="save" onClick={(e) => { e.stopPropagation(); onSave?.(ev.id) }}>
          <Heart s={17} fill={saved ? 'var(--pink)' : 'none'} />
        </button>
        <div className="meta">
          <h3>{ev.title}</h3>
          <div className="row">
            <span><Pin s={13} /> {ev.venue}</span>
            <span><Clock s={13} /> {ev.time.split(' – ')[0]}</span>
            <b>{ev.price}</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EventRow({ ev, nav, right }) {
  return (
    <div className="erow" onClick={() => nav?.('detail', { id: ev.id })}>
      <div className="thumb"><img src={img(ev.img)} alt="" loading="lazy" /></div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <h4>{ev.title}</h4>
        <div className="sub">{ev.venue} · {ev.area}</div>
        <div className="sub" style={{ color: 'var(--blue-2)', marginTop: 2 }}>{ev.date} · {ev.price}</div>
      </div>
      {right ?? (
        <div className="when"><b>{ev.day}</b>{ev.mon}</div>
      )}
    </div>
  )
}

export function SecHead({ eyebrow, title, more, onMore }) {
  return (
    <div className="sec-head">
      <div>
        {eyebrow && <div className="eyebrow blue" style={{ marginBottom: 5 }}>{eyebrow}</div>}
        <div className="sec-title">{title}</div>
      </div>
      {more && <button className="more" onClick={onMore}>{more}</button>}
    </div>
  )
}

export function BackHeader({ nav, title, light = false, action }) {
  return (
    <div className="row-between" style={{ padding: '4px 18px 12px' }}>
      <button onClick={() => nav('back')} className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)', background: light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)' }}>
        <ArrowL s={20} />
      </button>
      {title && <div className="heavy" style={{ fontSize: 16, textTransform: 'uppercase', letterSpacing: '.02em' }}>{title}</div>}
      {action ?? <button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)' }}><Share s={18} /></button>}
    </div>
  )
}

/* deterministic css QR */
export function QR({ seed = 7, size = 11, light = false }) {
  let s = (seed * 2654435761) % 2147483647
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
  const cells = []
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const isF = (x < 3 && y < 3) || (x >= size - 3 && y < 3) || (x < 3 && y >= size - 3)
    let on
    if (isF) {
      const cx = x < 3 ? 0 : size - 3, cy = y < 3 ? 0 : size - 3
      const lx = x - cx, ly = y - cy
      // finder = 3x3 outline ring + filled centre
      on = lx === 0 || lx === 2 || ly === 0 || ly === 2 || (lx === 1 && ly === 1)
    } else on = rnd() > 0.52
    cells.push(on)
  }
  return (
    <div className="qr" style={{ gridTemplateColumns: `repeat(${size},1fr)` }}>
      {cells.map((on, i) => <i key={i} className={on ? 'on' : ''} />)}
    </div>
  )
}

/* small reusable brand poster (sticker) */
export function PosterMini({ kind = 'society' }) {
  if (kind === 'society')
    return (
      <div className="postermini" style={{ background: '#b9b6e6', color: '#232049' }}>
        <div className="mono" style={{ fontSize: 9, opacity: .7 }}>CITYLIFE · 03</div>
        <div style={{ fontSize: 18, lineHeight: .95, marginTop: 4 }}>SOCIETY<br />IS HEALING</div>
        <Globe />
        <div style={{ marginTop: 'auto', fontStyle: 'italic', fontFamily: 'var(--mono)', fontSize: 10 }}>We know where.</div>
      </div>
    )
  return (
    <div className="postermini" style={{ background: '#f4f3ee', color: '#1b2a78' }}>
      <div style={{ fontSize: 16, lineHeight: .95 }}>THIS IS NOT<br />A <span style={{ background: 'var(--yellow)', padding: '0 3px' }}>FOMO</span> ALERT.</div>
      <Globe stroke="#1b2a78" />
    </div>
  )
}
function Globe({ stroke = '#232049' }) {
  return (
    <svg viewBox="0 0 80 64" style={{ width: '60%', margin: '8px auto', display: 'block' }} fill="none" stroke={stroke} strokeWidth="3">
      <circle cx="38" cy="34" r="20" /><ellipse cx="38" cy="34" rx="8" ry="20" /><path d="M18 34h40M22 24h32M22 44h32" />
      <path d="M16 36a23 23 0 0 1 44 0" /><rect x="12" y="33" width="8" height="14" rx="4" fill={stroke} /><rect x="58" y="33" width="8" height="14" rx="4" fill={stroke} />
    </svg>
  )
}

export { Star }
