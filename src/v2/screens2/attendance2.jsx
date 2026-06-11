import { useState } from 'react'
import { motion } from 'framer-motion'
import { StatusBar, HomeBar } from '../../phone/Phone'
import { EVENTS, byId, cover } from '../../data/events'
import { QR } from '../../ui'
import { TabBar2 } from '../chrome2'
import { CatTag2, EventCard2, AlertCard } from '../ui2'
import { Ticket, Pin, Clock, Flash, Heart, Check, Arrow, Star, Cal } from '../icons2'

export function Saved({ nav, ctx }) {
  const [tab, setTab] = useState('interested')
  const savedEvents = EVENTS.filter((e) => ctx.saved.has(e.id))
  const goingEvents = EVENTS.filter((e) => ctx.going.has(e.id))
  const list = tab === 'interested' ? (savedEvents.length ? savedEvents : EVENTS.slice(0, 4)) : (goingEvents.length ? goingEvents : EVENTS.slice(1, 3))
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="app-h"><div className="h-mega" style={{ fontSize: 34 }}>Your list</div>
          <button className="iconbtn ghost" onClick={() => nav('tickets')}><Ticket s={18} /></button>
        </div>
        <div className="pad">
          <div style={{ display: 'flex', gap: 6, padding: 5, background: 'var(--card)', borderRadius: 999, border: '1px solid var(--line)', marginBottom: 18 }}>
            {[['interested', 'Interested', savedEvents.length || 4], ['going', 'Going', goingEvents.length || 2]].map(([id, label, n]) => (
              <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: 11, borderRadius: 999, fontWeight: 700, fontSize: 14, background: tab === id ? 'var(--ind)' : 'transparent', color: tab === id ? '#fff' : 'var(--muted)' }}>{label} · {n}</button>
            ))}
          </div>
          {tab === 'going' && (
            <button className="btn" style={{ background: 'var(--acid)', color: '#14140f', marginBottom: 16 }} onClick={() => nav('tickets')}><Ticket s={18} /> View my passes</button>
          )}
          <div style={{ display: 'grid', gap: 14 }}>
            {list.map((e) => <EventCard2 key={e.id} ev={e} nav={nav} saved={ctx.saved.has(e.id) || tab === 'interested'} onSave={ctx.toggle} />)}
          </div>
          <div style={{ height: 8 }} />
        </div>
      </div>
      <TabBar2 active="saved" nav={nav} />
      <HomeBar />
    </>
  )
}

export function Tickets({ nav, ctx }) {
  const going = EVENTS.filter((e) => ctx.going.has(e.id))
  const list = going.length ? going : [byId('soc-heal'), byId('dnb')]
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="row-between" style={{ padding: '4px 18px 12px' }}>
          <button className="iconbtn ghost" onClick={() => nav('back')}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
          <div className="h-mega" style={{ fontSize: 18 }}>My Passes</div>
          <button className="iconbtn ghost"><Cal s={17} /></button>
        </div>
        <div className="pad">
          <div className="lab" style={{ marginBottom: 14, color: 'var(--ind-2)' }}>{list.length} UPCOMING</div>
          <div className="stack" style={{ gap: 16 }}>
            {list.map((ev) => (
              <button key={ev.id} className="vecard" style={{ display: 'flex', textAlign: 'left' }} onClick={() => nav('ticketPass', { id: ev.id })}>
                <div style={{ width: 104, flex: '0 0 104px', background: cover(ev).bg }}><img src={cover(ev).src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div style={{ padding: 14, flex: 1, minWidth: 0 }}>
                  <CatTag2 cat={ev.cat} />
                  <h3 className="h-card" style={{ fontSize: 17, margin: '8px 0 6px' }}>{ev.title}</h3>
                  <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 8 }}><Clock s={13} /> {ev.date} · {ev.time.split(' – ')[0]}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: 'var(--ind-2)', fontWeight: 700, fontSize: 13 }}><Ticket s={15} /> Tap to show QR</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

export function TicketPass({ nav, params }) {
  const ev = byId(params?.id) || byId('soc-heal')
  return (
    <>
      <StatusBar light />
      <div className="body screen-indigo" style={{ color: '#fff' }}>
        <div className="row-between" style={{ padding: '4px 18px 12px' }}>
          <button className="iconbtn ghost" onClick={() => nav('back')}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
          <div className="h-mega" style={{ fontSize: 18 }}>Entry Pass</div>
          <span style={{ width: 38 }} />
        </div>
        <div className="pad center" style={{ paddingTop: 6 }}>
          <div style={{ background: 'var(--paper)', color: '#0b0b0d', borderRadius: 24, width: '100%', overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(0,0,0,.5)', position: 'relative' }}>
            <span className="stamp2" style={{ position: 'absolute', top: 18, right: 14, color: 'var(--coral)', zIndex: 5 }}>ADMIT ONE ✦</span>
            <div style={{ padding: '20px 20px 14px' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ind)', letterSpacing: '.1em' }}>CITYLIFE · ENTRY</div>
              <h2 className="h-card" style={{ fontSize: 26, margin: '8px 0', maxWidth: '76%' }}>{ev.title}</h2>
              <div style={{ fontSize: 13, color: '#444' }}><Pin s={13} style={{ display: 'inline' }} /> {ev.venue}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px 8px', fontSize: 12 }}>
              {[['Date', ev.date], ['Time', ev.time.split(' – ')[0]], ['Entry', ev.price]].map(([k, v]) => (
                <div key={k}><div style={{ color: '#888', fontFamily: 'var(--mono)', textTransform: 'uppercase', fontSize: 9, letterSpacing: '.1em' }}>{k}</div><div style={{ fontWeight: 800, fontSize: 14 }}>{v}</div></div>
              ))}
            </div>
            <div style={{ position: 'relative', height: 24, margin: '6px 0' }}>
              <div style={{ position: 'absolute', top: '50%', left: 14, right: 14, borderTop: '2px dashed #cfcdc4' }} />
              <div style={{ position: 'absolute', top: '50%', left: -12, width: 24, height: 24, borderRadius: '50%', background: 'var(--ind)', transform: 'translateY(-50%)' }} />
              <div style={{ position: 'absolute', top: '50%', right: -12, width: 24, height: 24, borderRadius: '50%', background: 'var(--ind)', transform: 'translateY(-50%)' }} />
            </div>
            <div className="center" style={{ paddingBottom: 16, flexDirection: 'column', gap: 12 }}>
              <div style={{ width: 190 }}><QR seed={31} size={13} /></div>
              <div className="mono" style={{ fontSize: 12, letterSpacing: '.2em', color: '#444' }}>CL · 8842 · 0931 · BA</div>
            </div>
            <div className="barcode2" style={{ margin: '0 20px 18px' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, marginTop: 18, textAlign: 'center' }}>Show this at the door — brightness boosts automatically.</p>
        </div>
      </div>
      <HomeBar dark />
    </>
  )
}

const CONFETTI = Array.from({ length: 16 }, (_, i) => {
  const ang = (i / 16) * Math.PI * 2 + (i % 3) * 0.4
  const dist = 120 + (i % 5) * 26
  const colors = ['var(--sky)', 'var(--acid)', 'var(--coral)', '#fff', 'var(--ind-2)']
  return { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist - 40, c: colors[i % colors.length], r: (i % 4) * 120, d: 0.35 + (i % 6) * 0.05 }
})
export function Checkin({ nav }) {
  const ev = byId('soc-heal')
  const fadeUp = { h: { opacity: 0, y: 16 }, s: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }
  return (
    <>
      <StatusBar light />
      <div className="body center screen-indigo" style={{ textAlign: 'center', padding: 24, overflow: 'hidden', color: '#fff' }}>
        <motion.div className="stack" style={{ alignItems: 'center', gap: 38, position: 'relative', marginTop: 24 }}
          initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } } }}>
          <div style={{ position: 'relative', width: 96, height: 96, display: 'grid', placeItems: 'center' }}>
            {CONFETTI.map((p, i) => (
              <motion.span key={i} style={{ position: 'absolute', width: 9, height: 9, borderRadius: 2, background: p.c }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }} animate={{ opacity: [0, 1, 1, 0], x: p.x, y: p.y, scale: [0.4, 1, 0.9], rotate: p.r }} transition={{ duration: 1.1, delay: 0.5 + p.d, ease: 'easeOut' }} />
            ))}
            <motion.span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,.5)' }}
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: [1, 1.9], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }} />
            <motion.div className="center" style={{ width: 96, height: 96, borderRadius: '50%', background: '#fff', color: 'var(--ind)', boxShadow: '0 0 0 16px rgba(255,255,255,.16)' }}
              initial={{ scale: 0, rotate: -25 }} animate={{ scale: [0, 1.18, 1], rotate: [-25, 0, 0] }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.6, 1] }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 500, damping: 16 }}><Check s={52} w={3} /></motion.div>
            </motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', marginBottom: 10, letterSpacing: '.14em' }}>CHECKED IN · 22:04</motion.div>
            <motion.h1 variants={fadeUp} className="h-mega" style={{ fontSize: 44 }}>You're in!</motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,.9)', marginTop: 12, fontSize: 16 }}>Welcome to <b>{ev.title}</b><br /><span className="hand" style={{ fontSize: 24 }}>have the night of your life ✦</span></motion.p>
          </div>
        </motion.div>
      </div>
      <div className="dock" style={{ background: 'linear-gradient(to top, var(--ind) 60%, transparent)' }}>
        <button className="btn btn-white" onClick={() => nav('home')}>Back to tonight</button>
      </div>
      <HomeBar dark />
    </>
  )
}

const NOTES = [
  { tone: 'coral', ic: <Flash s={18} />, t: 'This is not a FOMO alert', d: '"After Dark" is 90% full. 6 friends are going.', when: 'now', hot: true },
  { tone: 'acid', ic: <Heart s={18} />, t: 'Price drop', d: 'Gonzi Open Air early-bird ends tonight — 29€ → going up.', when: '12m' },
  { tone: 'sky', ic: <Pin s={18} />, t: 'Right around the corner', d: 'Smoke & Wine just opened 1.9 km away.', when: '1h' },
  { tone: 'lav', ic: <Star s={18} />, t: 'Because you like techno', d: 'New: "Distorted" added for this Friday.', when: '3h' },
]
export function Notifications({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="row-between" style={{ padding: '4px 18px 12px' }}>
          <button className="iconbtn ghost" onClick={() => nav('back')}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
          <div className="h-mega" style={{ fontSize: 18 }}>Signals</div>
          <button className="lab" style={{ color: 'var(--ind-2)' }}>READ ALL</button>
        </div>
        <div className="pad">
          <div className="lab" style={{ marginBottom: 14, color: 'var(--coral)' }}>FOMO ALERTS · TUNED TO YOU</div>
          <div className="stack" style={{ gap: 12 }}>
            {NOTES.map((n, i) => (
              <AlertCard key={i} tone={n.tone} icon={n.ic} title={n.t} body={n.d} onClick={() => nav('detail', { id: 'dnb' })} />
            ))}
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}
