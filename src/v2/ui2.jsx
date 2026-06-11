import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATS, cover } from '../data/events'
import { Pin, Clock, Heart, Arrow, Chevron, Flash, Mic } from './icons2'

/* ---------- category badge, remapped to the v2 palette ---------- */
const CAT_TONE = {
  techno: 'ind', film: 'ind', live: 'coral', talk: 'coral',
  art: 'acid', party: 'acid', market: 'sky', community: 'sky',
}
export function CatTag2({ cat }) {
  const c = CATS[cat]
  return <span className={`vbadge ${CAT_TONE[cat] || 'ind'}`}>{c.label}</span>
}

/* ---------- circular arrow button (card corner) ---------- */
export function ArrowBtn({ tone = 'light', onClick, dir = 'up' }) {
  const rot = dir === 'up' ? -45 : dir === 'right' ? 0 : 90
  return (
    <button className={`iconbtn ${tone}`} onClick={onClick} aria-label="open">
      <Arrow s={18} style={{ transform: `rotate(${rot}deg)` }} />
    </button>
  )
}

/* ---------- pill (dropdown / filter) ---------- */
export function Pill({ children, variant = 'glass', chevron = true, onClick }) {
  return (
    <button className={`vpill ${variant}`} onClick={onClick}>
      {children}{chevron && <Chevron s={13} className="chev" style={{ transform: 'rotate(90deg)' }} />}
    </button>
  )
}

/* ---------- card header ---------- */
export function CardHead({ title, right, sub, onArrow, arrowTone = 'light', dark }) {
  return (
    <div className="vcard-head">
      <div>
        {sub && <div className="lab" style={{ marginBottom: 6, color: dark ? 'rgba(0,0,0,.55)' : undefined }}>{sub}</div>}
        <div className="h-card" style={dark ? { color: 'inherit' } : undefined}>{title}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {right}
        {onArrow && <ArrowBtn tone={arrowTone} onClick={onArrow} />}
      </div>
    </div>
  )
}

/* ---------- smooth area / line chart ---------- */
function smooth(vals, w, h) {
  const n = vals.length
  const max = Math.max(...vals), min = Math.min(...vals)
  const xs = (i) => (i / (n - 1)) * w
  const ys = (v) => h - ((v - min) / (max - min || 1)) * (h - 6) - 3
  let d = `M0 ${ys(vals[0])}`
  for (let i = 1; i < n; i++) {
    const x0 = xs(i - 1), x1 = xs(i), cx = (x0 + x1) / 2
    d += ` C ${cx} ${ys(vals[i - 1])} ${cx} ${ys(vals[i])} ${x1} ${ys(vals[i])}`
  }
  return { line: d, area: `${d} L ${w} ${h} L 0 ${h} Z`, xs, ys }
}

export function CrowdChart({ series, h = 70, accent = '#ff6a5c', ghost }) {
  const w = 300
  const main = smooth(series, w, h)
  const g = ghost ? smooth(ghost, w, h) : null
  const id = 'cg' + accent.replace('#', '')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: h, display: 'block', overflow: 'visible' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {g && <path d={g.line} fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2" strokeDasharray="3 4" />}
      <path d={main.area} fill={`url(#${id})`} />
      <motion.path d={main.line} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} />
    </svg>
  )
}

/* tiny inline sparkline */
export function Spark({ series, accent = 'var(--ind-2)', h = 34 }) {
  const w = 90
  const s = smooth(series, w, h)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: 90, height: h }} preserveAspectRatio="none">
      <path d={s.line} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- crowd capacity circles (week) ---------- */
export function CapWeek({ days, todayIdx }) {
  return (
    <div className="capweek">
      {days.map((d, i) => (
        <div className="capday" key={d.d}>
          <div className="d">{d.d}</div>
          <div className={`capcircle ${i === todayIdx ? 'on' : ''} ${d.future ? 'future' : ''}`}>{d.v}%</div>
        </div>
      ))}
    </div>
  )
}

/* ---------- bar chart ---------- */
export function Bars({ data, onIdx, tip }) {
  const max = Math.max(...data.map((d) => d.v))
  return (
    <>
      <div className="bars">
        {data.map((d, i) => (
          <div key={d.l} className={`bar ${i === onIdx ? 'on' : ''}`} style={{ height: `${(d.v / max) * 100}%` }}>
            {i === onIdx && tip && <span className="tip">{tip}</span>}
          </div>
        ))}
      </div>
      <div className="barlabels">
        {data.map((d, i) => <span key={d.l} className={i === onIdx ? 'on' : ''}>{d.l}</span>)}
      </div>
    </>
  )
}

/* ---------- radial clock gauge (best time to arrive / peak) ---------- */
export function RadialClock({ pct = 0.62, label = '23:30', accent = '#ff6a5c' }) {
  const R = 52, C = 2 * Math.PI * R
  return (
    <div style={{ position: 'relative', width: 150, height: 150, margin: '0 auto' }}>
      <svg viewBox="0 0 150 150" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
        <circle cx="75" cy="75" r={R} fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="11" />
        <motion.circle cx="75" cy="75" r={R} fill="none" stroke={accent} strokeWidth="11" strokeLinecap="round"
          strokeDasharray={C} initial={{ strokeDashoffset: C }} whileInView={{ strokeDashoffset: C * (1 - pct) }}
          viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
        {/* clock ticks */}
        {[0, 3, 6, 9].map((t) => {
          const a = (t / 12) * Math.PI * 2
          return <line key={t} x1={75 + Math.cos(a) * 34} y1={75 + Math.sin(a) * 34} x2={75 + Math.cos(a) * 40} y2={75 + Math.sin(a) * 40} stroke="rgba(0,0,0,.3)" strokeWidth="2" />
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 26, lineHeight: 1, color: accent }}>{label}</div>
          <div style={{ fontSize: 10, opacity: .6, marginTop: 3, fontWeight: 700 }}>PEAK</div>
        </div>
      </div>
    </div>
  )
}

/* ---------- alert card — ink card + tone-colored icon circle (reference style) ---------- */
const TONE_INK = { acid: '#14140f', sky: '#0c2630', mint: '#16201a', lav: '#16122e' }
export function AlertCard({ tone = 'acid', icon, title, body, tick, when, onClick }) {
  return (
    <button className="vcard" onClick={onClick} style={{ display: 'flex', gap: 13, textAlign: 'left', width: '100%', alignItems: 'center', padding: 15 }}>
      <span className="center" style={{ width: 42, height: 42, borderRadius: '50%', background: `var(--${tone})`, color: TONE_INK[tone] || '#fff', flex: '0 0 auto' }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: 'var(--heavy)', fontWeight: 900, textTransform: 'uppercase', fontSize: 14.5, lineHeight: 1, letterSpacing: '-.01em' }}>{title}</span>
        <span style={{ display: 'block', fontSize: 12.5, marginTop: 5, color: 'var(--muted)', lineHeight: 1.45 }}>
          {body}{tick && <> · starts in <b className="mono" style={{ color: 'var(--acid)' }}>{tick}</b></>}
        </span>
      </span>
      {when
        ? <span className="mono" style={{ fontSize: 10.5, color: 'var(--faint)', flex: '0 0 auto', alignSelf: 'flex-start', marginTop: 2 }}>{when}</span>
        : <Chevron s={18} style={{ color: 'var(--faint)', flex: '0 0 auto' }} />}
    </button>
  )
}

/* ---------- event card v2 ---------- */
export function EventCard2({ ev, nav, saved, onSave }) {
  const c = cover(ev)
  return (
    <motion.div className="vecard" onClick={() => nav('detail', { id: ev.id })}
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -40px' }} transition={{ duration: 0.4 }}>
      <div className="art" style={{ background: c.bg }}>
        <img src={c.src} alt={ev.title} loading="lazy" />
        <div className="tl"><CatTag2 cat={ev.cat} />{ev.hot && <span className="vbadge coral"><Flash s={11} /> Hot</span>}</div>
        <button className="iconbtn ghost tr" onClick={(e) => { e.stopPropagation(); onSave?.(ev.id) }} aria-label="save">
          <Heart s={16} fill={saved ? 'var(--coral)' : 'none'} />
        </button>
      </div>
      <div className="meta">
        <h3>{ev.title}</h3>
        <div className="r"><span><Pin s={12} /> {ev.venue}</span><span><Clock s={12} /> {ev.time.split(' – ')[0]}</span><b>{ev.price}</b></div>
      </div>
    </motion.div>
  )
}

/* ---------- event row v2 ---------- */
export function EventRow2({ ev, nav, right }) {
  const c = cover(ev)
  return (
    <button className="erow" onClick={() => nav?.('detail', { id: ev.id })} style={{ width: '100%', textAlign: 'left' }}>
      <div className="thumb" style={{ background: c.bg }}><img src={c.src} alt="" loading="lazy" /></div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <h4>{ev.title}</h4>
        <div className="sub">{ev.venue} · {ev.area}</div>
        <div className="sub" style={{ color: 'var(--ind-2)', marginTop: 2 }}>{ev.time.split(' – ')[0]} · {ev.price}</div>
      </div>
      {right ?? <Chevron s={18} style={{ color: 'var(--muted)' }} />}
    </button>
  )
}

/* ---------- art tile (quirky poster as illustration block, sticker tilt) ---------- */
export function ArtTile({ src, bg, label, tag, toptag, onClick, tall, rot = 0 }) {
  return (
    <button className="arttile" onClick={onClick} style={{ background: bg, minHeight: tall ? 200 : 150, '--rot': `${rot}deg` }}>
      <div className="art"><img src={src} alt="" loading="lazy" /></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.55), transparent 55%)' }} />
      {toptag && <span className="vbadge coral toptag" style={{ transform: 'rotate(-4deg)' }}>{toptag}</span>}
      <div className="label">
        <h4 style={{ color: '#fff' }}>{label}{tag && <div style={{ fontSize: 11, fontWeight: 600, opacity: .85, marginTop: 4, fontFamily: 'var(--body)', textTransform: 'none', letterSpacing: 0 }}>{tag}</div>}</h4>
        <span className="iconbtn light"><Arrow s={16} style={{ transform: 'rotate(-45deg)' }} /></span>
      </div>
    </button>
  )
}

/* ---------- stacked category deck (folder-tab stack, active one expands) ---------- */
const TONE_DARK = { acid: true, mint: true, sky: true, lav: true } // these need ink text (matches .block.* colors)
export function CategoryDeck({ tiers, nav }) {
  const [active, setActive] = useState(tiers.length - 1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {tiers.map((t, i) => {
        const on = i === active
        const dark = TONE_DARK[t.tone]
        const ink = dark ? '#14140f' : '#fff'
        return (
          <motion.div key={t.cat} layout transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            onClick={() => (on ? nav('search', { cat: t.cat }) : setActive(i))}
            style={{
              background: `var(--${t.tone})`, color: ink, borderRadius: 22, overflow: 'hidden',
              marginTop: i ? -16 : 0, zIndex: on ? 50 : i, position: 'relative', cursor: 'pointer',
              boxShadow: '0 -8px 22px -12px rgba(0,0,0,.55)',
            }}>
            <motion.div layout="position" style={{ padding: on ? '17px 18px 0' : '15px 18px 21px', position: 'relative', zIndex: 3 }}>
              <div className="row-between">
                <span style={{ fontFamily: 'var(--heavy)', fontWeight: 900, textTransform: 'uppercase', fontSize: on ? 27 : 16, lineHeight: 0.92, letterSpacing: '-.01em' }}>{t.label}</span>
                {on
                  ? <span className="iconbtn" style={{ background: ink, color: `var(--${t.tone})` }}><Arrow s={17} style={{ transform: 'rotate(-45deg)' }} /></span>
                  : <span style={{ width: 7, height: 7, borderRadius: 7, background: ink, opacity: .5 }} />}
              </div>
              <AnimatePresence>
                {on && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div style={{ display: 'flex', gap: 8, marginTop: 13 }}>
                      {t.stats.map((s, k) => (
                        <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: dark ? 'rgba(0,0,0,.1)' : 'rgba(255,255,255,.16)', borderRadius: 999, padding: '6px 11px', fontSize: 12, fontWeight: 700 }}>
                          <i style={{ width: 7, height: 7, borderRadius: 7, background: k ? (dark ? 'rgba(0,0,0,.45)' : 'rgba(255,255,255,.6)') : (dark ? '#14140f' : '#fff') }} />{s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <AnimatePresence>
              {on && (
                <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: 'relative', height: 168, marginTop: 6 }}>
                  <img src={`./posters/${t.poster}.jpg`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, transparent, var(--${t.tone}) 96%)`, mixBlendMode: dark ? 'normal' : 'multiply', opacity: dark ? 0.18 : 0.35 }} />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="grain-full" style={{ opacity: .18 }} />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ---------- waveform (AI input decoration) ---------- */
export function Waveform() {
  const hs = [6, 11, 16, 9, 14, 7, 12, 5]
  return <span className="wave">{hs.map((h, i) => <i key={i} style={{ height: h }} />)}</span>
}

export { Mic }
