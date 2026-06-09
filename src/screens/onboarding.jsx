import { StatusBar, HomeBar } from '../phone/Phone'
import { img, posterImg, CATS } from '../data/events'
import { Arrow, Pin, Scan, Check, Flash } from '../lib/icons'
import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = { h: { opacity: 0, y: 18 }, s: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

/* SVG city skyline — real windows that light up in a left→right wave (the loader) */
const SKYLINE = [
  { x: 12, w: 38, h: 66, cols: 3, rows: 6 },
  { x: 56, w: 30, h: 96, cols: 2, rows: 9 },
  { x: 92, w: 46, h: 54, cols: 4, rows: 5 },
  { x: 144, w: 26, h: 112, cols: 2, rows: 10 },
  { x: 176, w: 42, h: 76, cols: 3, rows: 7 },
  { x: 224, w: 26, h: 60, cols: 2, rows: 5 },
]
const BASE = 120
const WINDOWS = (() => {
  const a = []
  SKYLINE.forEach((b, bi) => {
    const pad = 5, gx = (b.w - pad * 2) / b.cols, gy = (b.h - pad * 2) / b.rows
    const ww = Math.min(gx * 0.62, 5), wh = Math.min(gy * 0.55, 5)
    for (let r = 0; r < b.rows; r++) for (let c = 0; c < b.cols; c++) {
      const x = b.x + pad + c * gx + (gx - ww) / 2
      const y = (BASE - b.h) + pad + r * gy + (gy - wh) / 2
      const delay = (x / 250) * 1.5 + (r % 3) * 0.1 + bi * 0.04
      const warm = (c * 3 + r) % 4 === 0 ? '#ffffff' : '#ffd23f'
      a.push({ x, y, ww, wh, delay, warm })
    }
  })
  return a
})()

function CityLoader({ width = 210 }) {
  return (
    <svg className="city-loader" viewBox="0 0 262 124" style={{ width, display: 'block' }} fill="none">
      {SKYLINE.map((b, i) => (
        <rect key={i} x={b.x} y={BASE - b.h} width={b.w} height={b.h} rx="2.5"
          fill="rgba(7,15,70,0.55)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      ))}
      {WINDOWS.map((w, i) => (
        <rect key={'w' + i} className="win" x={w.x} y={w.y} width={w.ww} height={w.wh} rx="0.6"
          fill={w.warm} style={{ opacity: 0.12, animationDelay: `${w.delay}s` }} />
      ))}
      <line x1="2" y1={BASE + 1.5} x2="260" y2={BASE + 1.5} stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Splash() {
  return (
    <>
      <StatusBar />
      <div className="body center" style={{ background: 'var(--blue)', overflow: 'hidden' }}>
        <motion.div
          style={{ position: 'absolute', width: 460, height: 460, borderRadius: '50%', border: '1.5px dashed rgba(255,255,255,.22)' }}
          animate={{ rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', border: '1.5px dashed rgba(255,255,255,.16)' }}
          animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        />
        <div className="stack" style={{ alignItems: 'center', gap: 18, position: 'relative' }}>
          <motion.img
            className="splash-float" src="./brand/logo-white.png" alt="CITYLIFE" style={{ width: 230 }}
            initial={{ scale: 0.6, opacity: 0, y: 8 }}
            animate={{ scale: [0.6, 1.06, 1], opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], times: [0, 0.7, 1] }}
          />
          <motion.div className="mono upper" style={{ fontSize: 12, color: 'rgba(255,255,255,.85)', letterSpacing: '0.3em' }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            the city, scannable
          </motion.div>
        </div>
        <motion.div style={{ position: 'absolute', bottom: 54, left: 0, right: 0, display: 'grid', placeItems: 'center', gap: 14 }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
          <CityLoader />
          <div className="mono" style={{ fontSize: 10.5, color: 'rgba(255,255,255,.7)', letterSpacing: '0.22em' }}>
            LOADING TONIGHT…
          </div>
        </motion.div>
      </div>
      <HomeBar />
    </>
  )
}

function OnbShell({ photo, eyebrow, title, text, idx, nav, accent }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <div style={{ position: 'relative', height: 380 }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(12,12,15,.2), var(--ink))' }} />
          <div className="mstrip" style={{ position: 'absolute', top: 60, left: 0, right: 0, transform: 'rotate(-3deg) scale(1.1)' }}>
            <div className="t">{Array(6).fill('CITYLIFE ✦ ').join('')}</div>
          </div>
        </div>
        <motion.div className="pad" style={{ marginTop: -30, position: 'relative' }}
          initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}>
          <motion.div className={`eyebrow ${accent}`} style={{ marginBottom: 12 }} variants={fadeUp}>{eyebrow}</motion.div>
          <motion.h1 className="display" style={{ fontSize: 40 }} variants={fadeUp}>{title}</motion.h1>
          <motion.p style={{ color: 'var(--dim)', marginTop: 16, fontSize: 15.5, lineHeight: 1.5, maxWidth: 300 }} variants={fadeUp}>{text}</motion.p>
        </motion.div>
      </div>
      <div className="dock row">
        <div className="dots">{[0, 1, 2].map((i) => <i key={i} className={i === idx ? 'on' : ''} />)}</div>
        <button className="btn btn-blue" style={{ width: 'auto', flex: 1, marginLeft: 8 }} onClick={() => nav('next')}>
          {idx === 2 ? 'Get started' : 'Next'} <Arrow s={18} />
        </button>
      </div>
      <HomeBar />
    </>
  )
}

export const Onb1 = ({ nav }) => (
  <OnbShell idx={0} nav={nav} accent="yellow" photo={img('festival')}
    eyebrow="01 — Discover"
    title={<>WHAT’S ON.<br /><span style={{ color: 'var(--yellow)' }}>RIGHT NOW.</span></>}
    text="A living map of everything happening in your city tonight — gigs, raves, markets, openings. Curated, not cluttered." />
)
export const Onb2 = ({ nav }) => (
  <OnbShell idx={1} nav={nav} accent="blue" photo={posterImg('wall')}
    eyebrow="02 — Scan"
    title={<>SCAN ANY<br /><span style={{ color: 'var(--blue-2)' }}>POSTER.</span></>}
    text="See a poster on the street? Point your camera at the QR and the full event opens instantly — time, place, price, the vibe." />
)
export const Onb3Photo = ({ nav }) => (
  <OnbShell idx={2} nav={nav} accent="yellow" photo={img('rooftop')}
    eyebrow="03 — Decide"
    title={<>FROM MOOD<br /><span style={{ color: 'var(--pink)' }}>TO ACTION.</span></>}
    text="Save it, tap “I’m in”, get your pass. From curiosity to the dancefloor in three taps." />
)

const POOL = Object.entries(CATS).map(([id, c]) => ({ id, ...c }))
const EXTRA = ['Open air', 'Free', 'Late night', 'Underground', 'Wine', 'Vinyl', 'Workshops', 'Queer']

export function Interests({ nav }) {
  const [sel, setSel] = useState(['techno', 'live', 'art'])
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  return (
    <>
      <StatusBar />
      <div className="body pad" style={{ paddingTop: 12 }}>
        <div className="eyebrow blue" style={{ marginBottom: 10 }}>Set up · 1 of 2</div>
        <h1 className="display" style={{ fontSize: 38 }}>WHAT ARE<br />YOU INTO?</h1>
        <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 14 }}>Pick a few. We’ll tune your signal — you can change it anytime.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
          {POOL.concat(EXTRA.map((label) => ({ id: label, label }))).map((c) => (
            <button key={c.id} className={`chip ${sel.includes(c.id) ? 'blue' : ''}`} style={{ fontSize: 14, padding: '11px 16px' }} onClick={() => toggle(c.id)}>
              {sel.includes(c.id) && <Check s={14} />}{c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="dock">
        <button className="btn btn-blue" onClick={() => nav('next')}>Continue · {sel.length} picked <Arrow s={18} /></button>
      </div>
      <HomeBar />
    </>
  )
}

export function Location({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body" style={{ position: 'relative' }}>
        <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
          <MapBg />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, var(--ink) 92%)' }} />
          <div className="center" style={{ position: 'absolute', top: 130, left: 0, right: 0 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--blue)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 12px rgba(31,68,255,.18), 0 0 0 28px rgba(31,68,255,.08)', color: '#fff' }}>
                <Pin s={30} />
              </div>
            </div>
          </div>
        </div>
        <div className="pad" style={{ marginTop: 14 }}>
          <h1 className="display" style={{ fontSize: 34 }}>FIND EVENTS<br />AROUND YOU</h1>
          <p style={{ color: 'var(--dim)', marginTop: 14, fontSize: 15, maxWidth: 290 }}>Turn on location to surface what’s happening within walking distance — sorted by what’s closest and starting soon.</p>
        </div>
      </div>
      <div className="dock stack" style={{ gap: 10 }}>
        <button className="btn btn-blue" onClick={() => nav('next')}>Allow location</button>
        <button className="btn btn-ghost" onClick={() => nav('next')}>Not now</button>
      </div>
      <HomeBar />
    </>
  )
}

export function Auth({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body pad center" style={{ textAlign: 'center' }}>
        <motion.div className="stack" style={{ gap: 22, width: '100%', alignItems: 'center' }}
          initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} style={{ width: 150, height: 150, borderRadius: 34, background: 'var(--blue)', display: 'grid', placeItems: 'center', boxShadow: '0 24px 60px -20px rgba(31,68,255,.6)' }}>
            <img src="./brand/logo-white.png" style={{ width: 108 }} alt="CITYLIFE" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="eyebrow yellow" style={{ marginBottom: 10 }}>Almost there</div>
            <h1 className="display" style={{ fontSize: 44 }}>JOIN THE<br />CITY</h1>
            <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 14.5, maxWidth: 260 }}>One tap and the whole city opens up. No spam, just signal.</p>
          </motion.div>
        </motion.div>
      </div>
      <div className="dock stack" style={{ gap: 10 }}>
        <button className="btn btn-white" onClick={() => nav('done')}> Continue with Apple</button>
        <button className="btn btn-dark" onClick={() => nav('done')}>Continue with Google</button>
        <button className="btn btn-blue" onClick={() => nav('done')}>Sign up with email</button>
        <button className="btn btn-ghost" style={{ border: 'none' }} onClick={() => nav('done')}>
          <span style={{ color: 'var(--muted)' }}>Skip — explore as guest</span>
        </button>
      </div>
      <HomeBar />
    </>
  )
}

/* tiny faux map background (grid + streets + pins) */
export function MapBg({ pins = true }) {
  return (
    <svg viewBox="0 0 384 460" style={{ width: '100%', height: '100%', display: 'block', background: '#101015' }}>
      <defs>
        <pattern id="g" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0H0V34" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="384" height="460" fill="url(#g)" />
      <path d="M-10 120 Q140 100 200 200 T420 300" fill="none" stroke="rgba(31,68,255,.35)" strokeWidth="8" />
      <path d="M40 -10 Q60 180 160 260 T240 480" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="14" />
      <path d="M300 -10 Q260 160 320 260" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="10" />
      <path d="M-10 360 H400" stroke="rgba(255,255,255,.06)" strokeWidth="12" />
      {pins && [[90, 150, 'var(--yellow)'], [250, 110, 'var(--pink)'], [180, 300, 'var(--blue-2)'], [300, 330, 'var(--white)']].map(([x, y, c], i) => (
        <g key={i}><circle cx={x} cy={y} r="16" fill={c} /><circle cx={x} cy={y} r="5" fill="#0c0c0f" /></g>
      ))}
    </svg>
  )
}
