import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { StatusBar, HomeBar } from '../../phone/Phone'
import { byId, cover, crewFor } from '../../data/events'
import { CatTag2 } from '../ui2'
import { X, Heart, Flash, Pin, Clock, Users, Send } from '../icons2'

const DECK = ['steal-font', 'soc-heal', 'dnb', 'fomo', 'festival', 'art-live', 'mountains', 'vinyl', 'skate', 'ufo', 'market2', 'jazz', 'petrzalka', 'complain', 'gallery']

function CrewStrip({ crew }) {
  const named = crew.filter((c) => !c.fof)
  const fof = crew.some((c) => c.fof)
  if (!named.length) return null
  const label = named.length === 1 ? `${named[0].n} is ${named[0].status}` : `${named[0].n} +${named.length - 1} from your crew`
  return (
    <div className="crew-strip">
      <div className="crew-avs">
        {named.map((c, i) => <span key={i} className="crew-av" style={{ background: c.c, color: c.c === 'var(--yellow)' ? '#0b0b0d' : '#fff', marginLeft: i ? -9 : 0, zIndex: 5 - i }}>{c.l}</span>)}
      </div>
      <div className="crew-txt"><b>{label}</b><span>{fof ? 'incl. friends of friends' : named.some((c) => c.status === 'going') ? 'going tonight' : 'interested'}</span></div>
    </div>
  )
}

function SwipeCard({ ev, depth, top, onDecide, exitDir }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-15, 15])
  const likeOp = useTransform(x, [28, 130], [0, 1])
  const nopeOp = useTransform(x, [-130, -28], [1, 0])
  const goOp = useTransform(y, [-130, -28], [1, 0])
  const c = cover(ev)
  const crew = crewFor(ev)
  return (
    <motion.div className="swipe-card" style={top ? { x, y, rotate, zIndex: 6 } : { zIndex: 3 - depth }}
      drag={top} dragSnapToOrigin dragElastic={0.5}
      onDragEnd={top ? (e, info) => { const ox = info.offset.x, oy = info.offset.y; if (ox > 110) onDecide('interested', ev); else if (ox < -110) onDecide('skip', ev); else if (oy < -120) onDecide('going', ev) } : undefined}
      custom={exitDir} initial={{ scale: 0.92, opacity: 0, y: 18 }}
      animate={{ scale: depth === 0 ? 1 : depth === 1 ? 0.95 : 0.9, opacity: depth > 2 ? 0 : 1, y: depth * 12 }}
      exit={(d) => ({ x: d === 'skip' ? -480 : d === 'interested' ? 480 : 0, y: d === 'going' ? -720 : 0, rotate: d === 'skip' ? -22 : d === 'interested' ? 22 : 0, opacity: 0, transition: { duration: 0.32 } })}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
      <div className="sc-img" style={{ background: c.bg }}><img src={c.src} alt="" draggable="false" /></div>
      <div className="sc-grad" />
      {top && (<>
        <motion.div className="stamp like" style={{ opacity: likeOp, color: 'var(--ind-2)', borderColor: 'var(--ind-2)' }}>INTERESTED</motion.div>
        <motion.div className="stamp nope" style={{ opacity: nopeOp }}>SKIP</motion.div>
        <motion.div className="stamp go" style={{ opacity: goOp, color: 'var(--coral)', borderColor: 'var(--coral)' }}>I'M IN ⚡</motion.div>
      </>)}
      <div className="sc-info">
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}><CatTag2 cat={ev.cat} />{ev.hot && <span className="vbadge coral"><Flash s={11} /> Selling fast</span>}</div>
        <h2 className="sc-title">{ev.title}</h2>
        <div className="sc-meta"><span><Pin s={13} /> {ev.venue}</span><span><Clock s={13} /> {ev.time.split(' – ')[0]}</span><b style={{ color: 'var(--acid)' }}>{ev.price}</b></div>
        <CrewStrip crew={crew} />
      </div>
    </motion.div>
  )
}

export function Swipe({ nav }) {
  const [idx, setIdx] = useState(0)
  const [exitDir, setExitDir] = useState('skip')
  const [picks, setPicks] = useState({ interested: [], going: [] })
  const [toast, setToast] = useState(null)
  const decide = (action, ev) => {
    setExitDir(action)
    if (action !== 'skip') {
      setPicks((p) => ({ ...p, [action]: [...p[action], ev.id] }))
      const crew = crewFor(ev).filter((c) => !c.fof)
      if (crew.length) { setToast({ ev, who: crew[0] }); setTimeout(() => setToast(null), 2400) }
    }
    setIdx((i) => i + 1)
  }
  const done = idx >= DECK.length
  const visible = DECK.slice(idx, idx + 3).map((id, d) => ({ ev: byId(id), depth: d }))
  return (
    <>
      <StatusBar />
      <div className="body" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="row-between" style={{ padding: '4px 18px 10px' }}>
          <button className="iconbtn ghost" onClick={() => nav('home')}><X s={20} /></button>
          <div className="center" style={{ flexDirection: 'column', gap: 1 }}>
            <div className="h-mega" style={{ fontSize: 22 }}>Tonight</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em' }}>{Math.min(idx + (done ? 0 : 1), DECK.length)} / {DECK.length}</div>
          </div>
          <button className="iconbtn ghost" style={{ position: 'relative' }} onClick={() => nav('saved')}>
            <Heart s={19} fill={picks.interested.length ? 'var(--coral)' : 'none'} />
            {picks.interested.length > 0 && <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 9, background: 'var(--coral)', color: '#fff', fontSize: 10, fontWeight: 800, display: 'grid', placeItems: 'center' }}>{picks.interested.length}</span>}
          </button>
        </div>
        {done ? (
          <DeckDone picks={picks} nav={nav} reset={() => { setIdx(0); setPicks({ interested: [], going: [] }) }} />
        ) : (
          <>
            <div className="deck">
              <AnimatePresence custom={exitDir}>
                {visible.slice().reverse().map(({ ev, depth }) => <SwipeCard key={ev.id} ev={ev} depth={depth} top={depth === 0} onDecide={decide} exitDir={exitDir} />)}
              </AnimatePresence>
            </div>
            <div className="swipe-actions">
              <button className="sa skip" onClick={() => decide('skip', byId(DECK[idx]))} aria-label="Skip"><X s={26} /></button>
              <button className="sa go" style={{ background: 'var(--ind)', borderColor: 'var(--ind)', color: '#fff' }} onClick={() => decide('going', byId(DECK[idx]))} aria-label="I'm in"><Flash s={24} /></button>
              <button className="sa like" style={{ color: 'var(--coral)' }} onClick={() => decide('interested', byId(DECK[idx]))} aria-label="Interested"><Heart s={26} /></button>
            </div>
            <div className="mono" style={{ textAlign: 'center', fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.14em', paddingBottom: 8 }}>SWIPE ← SKIP · → INTERESTED · ↑ I'M IN</div>
          </>
        )}
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div className="match-toast" style={{ background: 'var(--surface)' }} initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}>
            <span className="crew-av" style={{ background: toast.who.c, color: toast.who.c === 'var(--yellow)' ? '#0b0b0d' : '#fff' }}>{toast.who.l}</span>
            <div style={{ flex: 1 }}><b>You + {toast.who.n} matched! 🎉</b><span>Both into {toast.ev.title}</span></div>
            <button onClick={() => { setToast(null); nav('chat') }} style={{ padding: '9px 13px', borderRadius: 11, fontWeight: 700, fontSize: 13, display: 'flex', gap: 6, alignItems: 'center', background: 'var(--ind)', color: '#fff' }}><Send s={15} /> Crew</button>
          </motion.div>
        )}
      </AnimatePresence>
      <HomeBar />
    </>
  )
}

function DeckDone({ picks, nav, reset }) {
  return (
    <div className="center" style={{ flex: 1, flexDirection: 'column', textAlign: 'center', padding: 28, gap: 6 }}>
      <div style={{ fontSize: 46 }}>🌃</div>
      <h2 className="h-mega" style={{ fontSize: 34 }}>That's tonight</h2>
      <p style={{ color: 'var(--muted)', fontSize: 14.5, maxWidth: 280, marginTop: 4 }}>
        You're into <b style={{ color: 'var(--coral)' }}>{picks.interested.length}</b> and going to <b style={{ color: 'var(--ind-2)' }}>{picks.going.length}</b> events. Your crew's been pinged.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', marginTop: 18 }}>
        <div className="vcard center" style={{ flexDirection: 'column', gap: 2, padding: 16 }}><div className="h-mega" style={{ fontSize: 30, color: 'var(--coral)' }}>{picks.interested.length}</div><div style={{ fontSize: 11.5, color: 'var(--muted)' }}>Interested</div></div>
        <div className="vcard center" style={{ flexDirection: 'column', gap: 2, padding: 16 }}><div className="h-mega" style={{ fontSize: 30, color: 'var(--ind-2)' }}>{picks.going.length}</div><div style={{ fontSize: 11.5, color: 'var(--muted)' }}>Going</div></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 20 }}>
        <button className="btn" style={{ background: 'var(--ind)', color: '#fff' }} onClick={() => nav('saved')}><Users s={18} /> See who's going with you</button>
        <button className="btn btn-ghost" onClick={reset}>Swipe again</button>
      </div>
    </div>
  )
}
