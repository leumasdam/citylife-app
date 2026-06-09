import { StatusBar, TabBar, HomeBar } from '../phone/Phone'
import { EVENTS, byId, img, cover } from '../data/events'
import { EventCard, EventRow, SecHead, BackHeader, CatTag, QR } from '../ui'
import { Ticket, Pin, Clock, Flash, Bell, Heart, Check, Arrow, Star, Cal } from '../lib/icons'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function Saved({ nav, ctx }) {
  const [tab, setTab] = useState('interested')
  const savedEvents = EVENTS.filter((e) => ctx.saved.has(e.id))
  const goingEvents = EVENTS.filter((e) => ctx.going.has(e.id))
  const list = tab === 'interested' ? (savedEvents.length ? savedEvents : EVENTS.slice(0, 4)) : (goingEvents.length ? goingEvents : EVENTS.slice(1, 3))
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="app-h"><div className="title" style={{ fontSize: 30 }}>Your list</div>
          <button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)' }} onClick={() => nav('tickets')}><Ticket s={20} /></button>
        </div>
        <div className="pad">
          <div style={{ display: 'flex', gap: 8, padding: 5, background: 'var(--card)', borderRadius: 14, border: '1px solid var(--line)', marginBottom: 18 }}>
            {[['interested', 'Interested', savedEvents.length || 4], ['going', 'Going', goingEvents.length || 2]].map(([id, label, n]) => (
              <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: '10px', borderRadius: 10, fontWeight: 700, fontSize: 14, background: tab === id ? 'var(--blue)' : 'transparent', color: tab === id ? '#fff' : 'var(--muted)' }}>{label} · {n}</button>
            ))}
          </div>
          {tab === 'going' && (
            <button className="btn btn-yellow" style={{ marginBottom: 16 }} onClick={() => nav('tickets')}><Ticket s={18} /> View my passes</button>
          )}
          <div style={{ display: 'grid', gap: 14 }}>
            {list.map((e) => <EventCard key={e.id} ev={e} nav={nav} saved={ctx.saved.has(e.id) || tab === 'interested'} onSave={ctx.toggle} />)}
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
      <TabBar active="saved" nav={nav} />
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
        <BackHeader nav={nav} title="My Passes" action={<button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)' }}><Cal s={18} /></button>} />
        <div className="pad">
          <div className="eyebrow blue" style={{ marginBottom: 14 }}>{list.length} upcoming</div>
          <div className="stack" style={{ gap: 16 }}>
            {list.map((ev) => (
              <button key={ev.id} className="ecard" style={{ display: 'flex', textAlign: 'left', padding: 0 }} onClick={() => nav('ticketPass', { id: ev.id })}>
                <div style={{ width: 104, flex: '0 0 104px', position: 'relative', background: cover(ev).bg }}>
                  <img src={cover(ev).src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 14, flex: 1, minWidth: 0 }}>
                  <CatTag cat={ev.cat} />
                  <h3 className="heavy" style={{ fontSize: 17, textTransform: 'uppercase', lineHeight: .98, margin: '8px 0 6px' }}>{ev.title}</h3>
                  <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 8 }}><Clock s={13} /> {ev.date} · {ev.time.split(' – ')[0]}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: 'var(--blue-2)', fontWeight: 700, fontSize: 13 }}><Ticket s={15} /> Tap to show QR</div>
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

export function TicketPass({ nav, params, ctx }) {
  const ev = byId(params?.id) || byId('soc-heal')
  return (
    <>
      <StatusBar light />
      <div className="body" style={{ background: 'var(--blue)', color: '#fff' }}>
        <BackHeader nav={nav} title="Entry Pass" action={<span style={{ width: 40 }} />} />
        <div className="pad center" style={{ paddingTop: 6 }}>
          <div style={{ background: 'var(--paper)', color: '#0b0b0d', borderRadius: 22, width: '100%', overflow: 'hidden', boxShadow: '0 30px 60px -20px rgba(0,0,0,.5)' }}>
            <div style={{ padding: '20px 20px 14px' }}>
              <div className="mono upper" style={{ fontSize: 11, color: 'var(--blue)' }}>CITYLIFE · ADMIT ONE</div>
              <h2 className="heavy" style={{ fontSize: 26, textTransform: 'uppercase', lineHeight: .95, margin: '8px 0' }}>{ev.title}</h2>
              <div style={{ fontSize: 13, color: '#444', display: 'flex', gap: 10 }}><span><Pin s={13} style={{ display: 'inline' }} /> {ev.venue}</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px 8px', fontSize: 12 }}>
              {[['Date', ev.date], ['Time', ev.time.split(' – ')[0]], ['Entry', ev.price]].map(([k, v]) => (
                <div key={k}><div style={{ color: '#888', fontFamily: 'var(--mono)', textTransform: 'uppercase', fontSize: 9, letterSpacing: '.1em' }}>{k}</div><div style={{ fontWeight: 800, fontSize: 14 }}>{v}</div></div>
              ))}
            </div>
            {/* perforation */}
            <div style={{ position: 'relative', height: 24, margin: '6px 0' }}>
              <div style={{ position: 'absolute', top: '50%', left: 14, right: 14, borderTop: '2px dashed #cfcdc4' }} />
              <div style={{ position: 'absolute', top: '50%', left: -12, width: 24, height: 24, borderRadius: '50%', background: 'var(--blue)', transform: 'translateY(-50%)' }} />
              <div style={{ position: 'absolute', top: '50%', right: -12, width: 24, height: 24, borderRadius: '50%', background: 'var(--blue)', transform: 'translateY(-50%)' }} />
            </div>
            <div className="center" style={{ paddingBottom: 22, flexDirection: 'column', gap: 12 }}>
              <div style={{ width: 190 }}><QR seed={31} size={13} /></div>
              <div className="mono" style={{ fontSize: 12, letterSpacing: '.2em', color: '#444' }}>CL · 8842 · 0931 · BA</div>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, marginTop: 18, textAlign: 'center' }}>Show this at the door. Brightness will boost automatically.</p>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

// deterministic confetti burst — varied angle, distance, colour, spin per piece
const CONFETTI = Array.from({ length: 16 }, (_, i) => {
  const ang = (i / 16) * Math.PI * 2 + (i % 3) * 0.4
  const dist = 120 + (i % 5) * 26
  const colors = ['var(--green)', 'var(--yellow)', 'var(--pink)', '#fff', 'var(--blue-2)']
  return { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist - 40, c: colors[i % colors.length], r: (i % 4) * 120, d: 0.35 + (i % 6) * 0.05 }
})

export function Checkin({ nav }) {
  const ev = byId('soc-heal')
  const fadeUp = { h: { opacity: 0, y: 16 }, s: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }
  return (
    <>
      <StatusBar />
      <div className="body center" style={{ background: 'var(--blue)', textAlign: 'center', padding: 24, overflow: 'hidden' }}>
        <motion.div className="stack" style={{ alignItems: 'center', gap: 18, position: 'relative', marginTop: 110 }}
          initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } } }}>
          {/* badge + celebratory rings + confetti */}
          <div style={{ position: 'relative', width: 96, height: 96, display: 'grid', placeItems: 'center' }}>
            {/* confetti shoots out as the badge lands */}
            {CONFETTI.map((p, i) => (
              <motion.span key={i} style={{ position: 'absolute', width: 9, height: 9, borderRadius: 2, background: p.c }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                animate={{ opacity: [0, 1, 1, 0], x: p.x, y: p.y, scale: [0.4, 1, 0.9], rotate: p.r }}
                transition={{ duration: 1.1, delay: 0.5 + p.d, ease: 'easeOut' }} />
            ))}
            {/* pulsing halo that keeps breathing */}
            <motion.span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(195,245,62,.5)' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }} />
            {/* the green check pops in with an overshoot, then settles */}
            <motion.div className="center" style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 16px rgba(195,245,62,.18)' }}
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: [0, 1.18, 1], rotate: [-25, 0, 0] }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.6, 1] }}>
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 500, damping: 16 }}>
                <Check s={52} w={3} />
              </motion.div>
            </motion.div>
          </div>
          <div>
            <motion.div variants={fadeUp} className="mono upper" style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', marginBottom: 10 }}>Checked in · 22:04</motion.div>
            <motion.h1 variants={fadeUp} className="display" style={{ fontSize: 44 }}>YOU’RE IN!</motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,.9)', marginTop: 12, fontSize: 16 }}>Welcome to <b>{ev.title}</b><br />Have the night of your life.</motion.p>
          </div>
        </motion.div>
      </div>
      <div className="dock" style={{ background: 'linear-gradient(to top, var(--blue) 60%, transparent)' }}>
        <button className="btn btn-white" onClick={() => nav('home')}>Back to tonight</button>
      </div>
      <HomeBar />
    </>
  )
}

const NOTES = [
  { ic: <Flash s={18} />, c: 'var(--yellow)', t: 'This is not a FOMO alert', d: '“Warehouse: Liquid” is 90% full. 6 friends are going.', when: 'now', hot: true },
  { ic: <Heart s={18} fill="var(--pink)" />, c: 'var(--pink)', t: 'Price drop', d: 'Riverside Festival early-bird ends tonight — 29€ → going up.', when: '12m' },
  { ic: <Pin s={18} />, c: 'var(--blue-2)', t: 'Right around the corner', d: 'Night Food Market just opened 1.9 km away.', when: '1h' },
  { ic: <Star s={18} fill="var(--yellow)" />, c: 'var(--yellow)', t: 'Because you like techno', d: 'New: “Society Is Healing” added for this Friday.', when: '3h' },
  { ic: <Check s={18} />, c: 'var(--green)', t: 'You’re on the list', d: 'Your pass for Cellar Jazz Sessions is ready.', when: '1d' },
]

export function Notifications({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <BackHeader nav={nav} title="Signals" action={<button className="more" style={{ color: 'var(--blue-2)', fontWeight: 700, fontSize: 13 }}>Read all</button>} />
        <div className="pad">
          <div className="eyebrow yellow" style={{ marginBottom: 14 }}>FOMO alerts · tuned to you</div>
          <div className="stack" style={{ gap: 10 }}>
            {NOTES.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 13, padding: 14, borderRadius: 16, background: n.hot ? 'rgba(243,255,54,.07)' : 'var(--card)', border: `1px solid ${n.hot ? 'rgba(243,255,54,.3)' : 'var(--line)'}` }} onClick={() => nav('detail', { id: 'dnb' })}>
                <div className="center" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.05)', color: n.c, flex: '0 0 auto' }}>{n.ic}</div>
                <div style={{ flex: 1 }}>
                  <div className="row-between"><b style={{ fontSize: 14.5 }}>{n.t}</b><span style={{ fontSize: 11, color: 'var(--muted)' }}>{n.when}</span></div>
                  <div style={{ fontSize: 13, color: 'var(--dim)', marginTop: 3 }}>{n.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}
