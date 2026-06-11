import { useState } from 'react'
import { motion } from 'framer-motion'
import { StatusBar, HomeBar } from '../../phone/Phone'
import { CATS } from '../../data/events'
import { MapBg } from '../../screens/onboarding'
import { QR } from '../../ui'
import { Arrow, Pin, Check, Heart, Flash } from '../icons2'

const fadeUp = { h: { opacity: 0, y: 18 }, s: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }
const EASE = [0.22, 1, 0.36, 1]

/* =========================== SPLASH — day → night street lamp ===========================
   One full day → night → day loop. The sky darkens first; the street lamp only
   switches on once night has fallen, then goes out again before daybreak.
   (Indigo-tinted v1 cycle. Alternative "scan" splash is parked in splash-scan.jsx.) */
const CYCLE = 8.2
const skyFall = { duration: CYCLE, repeat: Infinity, ease: 'easeInOut', times: [0, 0.22, 0.8, 1] }
const lampOn = { duration: CYCLE, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.32, 0.74, 0.84] }

function StreetLamp() {
  return (
    <svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="lampGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe6a6" stopOpacity="0.95" />
          <stop offset="32%" stopColor="#ffc257" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffc257" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lampCone2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffd98a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* warm halo + light cone — softened so the logo stays the hero */}
      <motion.ellipse cx="250" cy="208" rx="250" ry="250" fill="url(#lampGlow2)" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.55, 0.55, 0] }} transition={lampOn} />
      <motion.polygon points="241,206 261,206 360,640 150,640" fill="url(#lampCone2)" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.45, 0.45, 0] }} transition={lampOn} />
      {/* pole + shepherd's-crook arm — quiet silhouette, the logo is the hero */}
      <g opacity="0.45">
        <g stroke="#1c1d66" strokeWidth="5.5" fill="none" strokeLinecap="round">
          <line x1="302" y1="844" x2="302" y2="248" />
          <path d="M302 248 Q302 198 256 196" />
        </g>
        <rect x="290" y="828" width="24" height="16" rx="2" fill="#1c1d66" />
        <path d="M243 195 L269 195 L264 221 L248 221 Z" fill="#1c1d66" />
      </g>
      {/* warm core that switches on */}
      <motion.path d="M247 199 L265 199 L261 218 L251 218 Z" fill="#ffe6a6" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }} transition={lampOn} />
    </svg>
  )
}

export function Splash() {
  return (
    <>
      <StatusBar light />
      <div className="body center" style={{ overflow: 'hidden', position: 'relative', background: 'linear-gradient(180deg, #6e70f4 0%, #4243c0 100%)' }}>
        {/* nightfall layer cross-fades over the day sky */}
        <motion.div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #070b30 0%, #02030f 100%)' }}
          initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={skyFall} />
        <StreetLamp />
        <motion.div
          style={{ position: 'absolute', width: 440, height: 440, borderRadius: '50%', border: '1.5px dashed rgba(255,255,255,.14)' }}
          animate={{ rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }} />
        <div className="stack" style={{ alignItems: 'center', gap: 18, position: 'relative', zIndex: 2 }}>
          <motion.img
            className="splash-float" src="./brand/logo-white.png" alt="CITYLIFE" style={{ width: 232, filter: 'drop-shadow(0 6px 30px rgba(0,0,0,0.25))' }}
            initial={{ scale: 0.6, opacity: 0, y: 8 }}
            animate={{ scale: [0.6, 1.06, 1], opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, times: [0, 0.7, 1] }} />
          <motion.div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.85)', letterSpacing: '0.3em' }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            THE CITY, SCANNABLE
          </motion.div>
        </div>
        <motion.div style={{ position: 'absolute', bottom: 64, left: 0, right: 0, display: 'grid', placeItems: 'center', gap: 13, zIndex: 2 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div style={{ width: 150, height: 4, borderRadius: 3, background: 'rgba(255,255,255,.22)', overflow: 'hidden' }}>
            <motion.div style={{ height: '100%', width: '55%', background: '#fff', borderRadius: 3 }} animate={{ x: ['-100%', '180%'] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: 'rgba(255,255,255,.75)', letterSpacing: '.22em' }}>LOADING TONIGHT…</div>
        </motion.div>
      </div>
      <HomeBar dark />
    </>
  )
}

/* =========================== ONBOARDING SCENES ===========================
   No stock photos — each slide is a small animated scene that demonstrates
   the actual feature. One accent color per slide, looped, clean timing. */

/* shared frame for the scenes */
function Scene({ children }) {
  return (
    <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '1/0.94', background: 'var(--card)', border: '1px solid var(--line)' }}>
      {/* quiet dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.4px)', backgroundSize: '22px 22px' }} />
      {children}
    </div>
  )
}

/* 01 — DISCOVER: a pulsing you-pin, live event cards surface around it */
const DISC_CARDS = [
  { t: 'AFTER DARK', m: '23:00 · 0.6 km', x: '6%', y: '14%', d: 0.5, tone: 'var(--coral)' },
  { t: 'SMOKE & WINE', m: '17:00 · free', x: '50%', y: '30%', d: 1.1, tone: 'var(--acid)' },
  { t: 'BLUE HOUR', m: '20:00 · 0.8 km', x: '14%', y: '64%', d: 1.7, tone: 'var(--sky)' },
]
function SceneDiscover() {
  return (
    <Scene>
      {/* the you-dot with radar rings */}
      <div className="center" style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%,-50%)' }}>
        {[0, 1].map((i) => (
          <motion.span key={i} style={{ position: 'absolute', width: 54, height: 54, borderRadius: '50%', border: '1.5px solid var(--coral)' }}
            initial={{ scale: 1, opacity: 0.55 }} animate={{ scale: 3.6, opacity: 0 }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 1.3 }} />
        ))}
        <motion.div className="center" style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--coral)', color: '#1c0f0c' }}
          animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}>
          <Pin s={24} />
        </motion.div>
      </div>
      {/* event cards surface one by one, then float */}
      {DISC_CARDS.map((c) => (
        <motion.div key={c.t} style={{ position: 'absolute', left: c.x, top: c.y, background: 'var(--elev)', border: '1px solid var(--line)', borderRadius: 13, padding: '9px 12px', boxShadow: '0 12px 28px -12px rgba(0,0,0,.6)' }}
          initial={{ opacity: 0, y: 14, scale: 0.9 }} animate={{ opacity: 1, y: [14, 0, -3, 0], scale: 1 }}
          transition={{ duration: 4.5, delay: c.d, repeat: Infinity, repeatDelay: 1.5, times: [0, 0.12, 0.6, 1], ease: EASE }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: 8, background: c.tone }} />
            <span style={{ fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 12, letterSpacing: '.01em' }}>{c.t}</span>
          </span>
          <span className="mono" style={{ display: 'block', fontSize: 9.5, color: 'var(--muted)', marginTop: 3, letterSpacing: '.08em' }}>{c.m}</span>
        </motion.div>
      ))}
    </Scene>
  )
}

/* 02 — SCAN: reticle locks onto a poster, scanline sweeps, QR confirms */
function SceneScan() {
  const SEQ = { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
  return (
    <Scene>
      {/* the street poster (drawn, not a photo) */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%) rotate(-2deg)', width: '46%', background: 'var(--ind)', borderRadius: 10, padding: '13px 13px 11px', color: '#fff', boxShadow: '0 18px 40px -14px rgba(0,0,0,.7)' }}>
        <div className="mono" style={{ fontSize: 8, opacity: .75, letterSpacing: '.16em' }}>CITYLIFE ✦ 03</div>
        <div style={{ fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 17, lineHeight: 0.95, textTransform: 'uppercase', margin: '6px 0 9px' }}>Society<br />is healing</div>
        <div style={{ width: 44 }}><QR seed={12} size={9} /></div>
      </div>
      {/* reticle breathes around it */}
      <motion.div style={{ position: 'absolute', left: '50%', top: '50%', width: '62%', aspectRatio: '1/1.18', transform: 'translate(-50%,-50%)' }}
        animate={{ scale: [1.06, 1, 1, 1.06] }} transition={SEQ}>
        {[
          { top: 0, left: 0, borderWidth: '2.5px 0 0 2.5px', borderRadius: '8px 0 0 0' },
          { top: 0, right: 0, borderWidth: '2.5px 2.5px 0 0', borderRadius: '0 8px 0 0' },
          { bottom: 0, left: 0, borderWidth: '0 0 2.5px 2.5px', borderRadius: '0 0 0 8px' },
          { bottom: 0, right: 0, borderWidth: '0 2.5px 2.5px 0', borderRadius: '0 0 8px 0' },
        ].map((s, i) => <span key={i} style={{ position: 'absolute', width: 26, height: 26, borderStyle: 'solid', borderColor: 'var(--coral)', ...s }} />)}
        {/* scanline sweep */}
        <motion.div style={{ position: 'absolute', left: 6, right: 6, height: 2, background: 'var(--coral)', boxShadow: '0 0 12px 1px var(--coral)' }}
          animate={{ top: ['8%', '88%', '8%'], opacity: [0, 1, 0] }} transition={{ ...SEQ, times: [0, 0.5, 1] }} />
      </motion.div>
      {/* recognised badge pops at the end of each sweep */}
      <motion.div className="center" style={{ position: 'absolute', left: '50%', bottom: '7%', transform: 'translateX(-50%)', background: 'var(--ind)', color: '#fff', borderRadius: 999, padding: '7px 14px', gap: 6, display: 'flex', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}
        animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, -4], scale: [0.9, 0.9, 1, 1, 0.96] }}
        transition={{ duration: 3.8, repeat: Infinity, times: [0, 0.5, 0.58, 0.92, 1], ease: EASE }}>
        <Check s={14} w={3} /> Poster recognised
      </motion.div>
    </Scene>
  )
}

/* 03 — DECIDE: a card swipes itself right, stamped, the next one steps up */
function SceneDecide() {
  const SWIPE = { duration: 3.2, repeat: Infinity, ease: EASE }
  return (
    <Scene>
      {/* back card steps up as the front one leaves */}
      <motion.div style={{ position: 'absolute', left: '50%', top: '47%', width: '56%', aspectRatio: '4/5', borderRadius: 18, background: 'linear-gradient(150deg, #2b2ca6, var(--ind))', border: '1px solid var(--line)', x: '-50%', y: '-50%' }}
        animate={{ scale: [0.92, 0.92, 1, 0.92], rotate: [3, 3, 0, 3] }} transition={{ ...SWIPE, times: [0, 0.45, 0.75, 1] }}>
        <div style={{ position: 'absolute', left: 14, bottom: 12 }}>
          <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,.7)', letterSpacing: '.12em' }}>SAT · 15:00</div>
          <div style={{ fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 15, color: '#fff', textTransform: 'uppercase', lineHeight: 0.95, marginTop: 3 }}>Gonzi<br />Open Air</div>
        </div>
      </motion.div>
      {/* front card: hesitates, tilts, flies right with a stamp */}
      <motion.div style={{ position: 'absolute', left: '50%', top: '47%', width: '56%', aspectRatio: '4/5', borderRadius: 18, background: 'linear-gradient(150deg, #b04a3e, var(--coral))', x: '-50%', y: '-50%', boxShadow: '0 22px 46px -16px rgba(0,0,0,.7)' }}
        animate={{ x: ['-50%', '-50%', '-42%', '120%'], rotate: [0, 0, 6, 22], opacity: [1, 1, 1, 0] }}
        transition={{ ...SWIPE, times: [0, 0.42, 0.6, 0.78] }}>
        <div style={{ position: 'absolute', left: 14, bottom: 12, color: '#fff' }}>
          <div className="mono" style={{ fontSize: 9, opacity: .8, letterSpacing: '.12em' }}>FRI · 23:00</div>
          <div style={{ fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 15, textTransform: 'uppercase', lineHeight: 0.95, marginTop: 3 }}>After<br />Dark</div>
        </div>
        <motion.span style={{ position: 'absolute', top: 12, left: 12, border: '2.5px solid var(--acid)', color: 'var(--acid)', fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 13, padding: '3px 8px', borderRadius: 8, rotate: -10, textTransform: 'uppercase' }}
          animate={{ opacity: [0, 0, 1, 1], scale: [1.6, 1.6, 1, 1] }} transition={{ ...SWIPE, times: [0, 0.5, 0.58, 1] }}>
          I'm in ⚡
        </motion.span>
      </motion.div>
      {/* action hints */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: '6%', display: 'flex', justifyContent: 'center', gap: 12 }}>
        <span className="center" style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--elev)', border: '1px solid var(--line)', color: 'var(--muted)' }}>✕</span>
        <motion.span className="center" style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--ind)', color: '#fff' }}
          animate={{ scale: [1, 1, 1.18, 1] }} transition={{ ...SWIPE, times: [0, 0.55, 0.66, 0.8] }}><Flash s={16} /></motion.span>
        <span className="center" style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--elev)', border: '1px solid var(--line)', color: 'var(--coral)' }}><Heart s={15} /></span>
      </div>
    </Scene>
  )
}

/* =========================== ONBOARDING SHELL =========================== */
function OnbShell({ scene, eyebrow, title, text, idx, nav }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <motion.div className="pad" style={{ paddingTop: 10 }}
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}>
          {scene}
        </motion.div>
        <motion.div className="pad" style={{ marginTop: 22 }} initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}>
          <motion.div className="lab" style={{ marginBottom: 12, color: 'var(--ind-2)' }} variants={fadeUp}>{eyebrow}</motion.div>
          <motion.h1 className="h-mega" style={{ fontSize: 38 }} variants={fadeUp}>{title}</motion.h1>
          <motion.p style={{ color: 'var(--dim)', marginTop: 14, fontSize: 15.5, lineHeight: 1.5, maxWidth: 310 }} variants={fadeUp}>{text}</motion.p>
        </motion.div>
      </div>
      <div className="dock row">
        <div className="dots">{[0, 1, 2].map((i) => <i key={i} className={i === idx ? 'on' : ''} />)}</div>
        <button className="btn" style={{ background: 'var(--ind)', color: '#fff', width: 'auto', flex: 1, marginLeft: 8 }} onClick={() => nav('next')}>
          {idx === 2 ? 'Get started' : 'Next'} <Arrow s={18} />
        </button>
      </div>
      <HomeBar />
    </>
  )
}

export const Onb1 = ({ nav }) => (
  <OnbShell idx={0} nav={nav} scene={<SceneDiscover />}
    eyebrow="01 — DISCOVER"
    title={<>What's on.<br /><span style={{ color: 'var(--coral)' }}>Right now.</span></>}
    text="A living map of everything happening in your city tonight — gigs, raves, markets, openings. Curated, not cluttered." />
)
export const Onb2 = ({ nav }) => (
  <OnbShell idx={1} nav={nav} scene={<SceneScan />}
    eyebrow="02 — SCAN"
    title={<>Scan any<br /><span style={{ color: 'var(--ind-2)' }}>poster.</span></>}
    text="See a poster on the street? Point your camera at the QR and the full event opens instantly — time, place, price, the vibe." />
)
export const Onb3Photo = ({ nav }) => (
  <OnbShell idx={2} nav={nav} scene={<SceneDecide />}
    eyebrow="03 — DECIDE"
    title={<>From mood<br /><span style={{ color: 'var(--acid)' }}>to action.</span></>}
    text="Save it, tap 'I'm in', get your pass. From curiosity to the dancefloor in three taps — your AI lead plans the rest." />
)

/* =========================== INTERESTS =========================== */
const POOL = Object.entries(CATS).map(([id, c]) => ({ id, ...c }))
const EXTRA = ['Open air', 'Free', 'Late night', 'Underground', 'Wine', 'Vinyl', 'Workshops', 'Queer']
export function Interests({ nav }) {
  const [sel, setSel] = useState(['techno', 'live', 'art'])
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  return (
    <>
      <StatusBar />
      <div className="body pad" style={{ paddingTop: 12 }}>
        <div className="lab" style={{ marginBottom: 10, color: 'var(--ind-2)' }}>SET UP · 1 OF 2</div>
        <h1 className="h-mega" style={{ fontSize: 36 }}>What are<br />you into?</h1>
        <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 14 }}>Pick a few. We'll tune your signal — change it anytime.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
          {POOL.concat(EXTRA.map((label) => ({ id: label, label }))).map((c) => (
            <button key={c.id} className={`chip ${sel.includes(c.id) ? 'blue' : ''}`} style={{ fontSize: 14, padding: '11px 16px' }} onClick={() => toggle(c.id)}>
              {sel.includes(c.id) && <Check s={14} />}{c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="dock">
        <button className="btn" style={{ background: 'var(--ind)', color: '#fff' }} onClick={() => nav('next')}>Continue · {sel.length} picked <Arrow s={18} /></button>
      </div>
      <HomeBar />
    </>
  )
}

/* =========================== LOCATION =========================== */
export function Location({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="pad" style={{ paddingTop: 8 }}>
          <div className="block mint" style={{ padding: 0, overflow: 'hidden', height: 340, position: 'relative' }}>
            <MapBg />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(205,217,207,.15), rgba(205,217,207,.6))' }} />
            <div className="center" style={{ position: 'absolute', inset: 0 }}>
              <div className="center" style={{ position: 'relative', width: 70, height: 70 }}>
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} style={{ position: 'absolute', width: 70, height: 70, borderRadius: '50%', border: '2px solid var(--ind)' }}
                    initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 3.4, opacity: 0 }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.8 }} />
                ))}
                <motion.div className="center" style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--ind)', boxShadow: '0 0 0 12px rgba(93,95,239,.2)', color: '#fff' }}
                  initial={{ scale: 0, y: -30 }} animate={{ scale: [0, 1.15, 1], y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.7, 1] }}>
                  <Pin s={30} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="pad" style={{ marginTop: 16 }}>
          <h1 className="h-mega" style={{ fontSize: 34 }}>Find events<br />around you</h1>
          <p style={{ color: 'var(--dim)', marginTop: 14, fontSize: 15, maxWidth: 300 }}>Turn on location to surface what's happening within walking distance — sorted by what's closest and starting soon.</p>
        </div>
      </div>
      <div className="dock stack" style={{ gap: 10 }}>
        <button className="btn" style={{ background: 'var(--ind)', color: '#fff' }} onClick={() => nav('next')}>Allow location</button>
        <button className="btn btn-ghost" onClick={() => nav('next')}>Not now</button>
      </div>
      <HomeBar />
    </>
  )
}

/* =========================== AUTH =========================== */
export function Auth({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body pad" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 'clamp(56px, 12svh, 120px)' }}>
        <motion.div className="stack" style={{ gap: 22, width: '100%', alignItems: 'center' }} initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="tilt" style={{ '--rot': '-3deg', width: 168, height: 168, borderRadius: 40, background: 'var(--ind)', display: 'grid', placeItems: 'center', boxShadow: '0 24px 60px -18px rgba(93,95,239,.7)', position: 'relative' }}>
            <img src="./brand/logo-white.png" style={{ width: 160 }} alt="CITYLIFE" />
            <span className="tape2" style={{ top: -8, left: -12, transform: 'rotate(-42deg)' }} />
            <span className="tape2" style={{ bottom: 12, right: -13, transform: 'rotate(-14deg)' }} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="lab" style={{ marginBottom: 10, color: 'var(--coral)' }}>ALMOST THERE</div>
            <h1 className="h-mega" style={{ fontSize: 44 }}>Join the<br />city</h1>
            <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 14.5, maxWidth: 260 }}>One tap and the whole city opens up. No spam, just signal.</p>
          </motion.div>
        </motion.div>
      </div>
      <div className="dock stack" style={{ gap: 10 }}>
        <button className="btn btn-white" onClick={() => nav('done')}>Continue with Apple</button>
        <button className="btn btn-dark" onClick={() => nav('done')}>Continue with Google</button>
        <button className="btn" style={{ background: 'var(--ind)', color: '#fff' }} onClick={() => nav('done')}>Sign up with email</button>
        <button className="btn btn-ghost" style={{ border: 'none', color: 'var(--muted)' }} onClick={() => nav('done')}>Skip — explore as guest</button>
      </div>
      <HomeBar />
    </>
  )
}
