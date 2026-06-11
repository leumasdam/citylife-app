import { useState } from 'react'
import { motion } from 'framer-motion'
import { StatusBar, HomeBar } from '../../phone/Phone'
import { EVENTS, posterImg, cover } from '../../data/events'
import { EventRow2 } from '../ui2'
import { X, Flash, Arrow, Check } from '../icons2'

function ScannerChrome({ scanning = true }) {
  return (
    <>
      <img className="feed" src={posterImg('wall')} alt="" style={{ objectPosition: '35% center' }} />
      <div className="scan-mask" />
      <div className="scan-window">
        <div className="scan-corners" style={{ '--c': 'var(--coral)' }}><span /><span /><span /><span /></div>
        {scanning && <div className="scanline" style={{ top: '50%', background: 'var(--coral)', boxShadow: '0 0 14px 2px var(--coral)' }} />}
        <div className="center" style={{ position: 'absolute', inset: '12%' }}>
          <img src={posterImg('fomo')} alt="" style={{ width: '78%', borderRadius: 6, transform: 'rotate(-3deg)', boxShadow: '0 12px 34px rgba(0,0,0,.55)' }} />
        </div>
      </div>
    </>
  )
}

export function Scanner({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body scanview">
        <ScannerChrome />
        <div className="row-between" style={{ position: 'absolute', top: 54, left: 20, right: 20, zIndex: 10 }}>
          <button className="iconbtn ghost" onClick={() => nav('home')}><X s={20} /></button>
          <div className="vbadge" style={{ background: 'rgba(0,0,0,.5)', color: '#fff', border: '1px solid var(--line)' }}>SCAN POSTER</div>
          <button className="iconbtn ghost"><Flash s={18} /></button>
        </div>
        <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, zIndex: 10, display: 'grid', placeItems: 'center', gap: 18 }}>
          <div className="center" style={{ gap: 8, flexDirection: 'column' }}>
            <div style={{ background: 'rgba(255,106,92,.18)', border: '1px solid var(--coral)', color: 'var(--coral)', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 13 }}>Looking for a CITYLIFE code…</div>
            <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13 }}>Point at any poster on the street</div>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <button className="iconbtn ghost" style={{ width: 48, height: 48, borderRadius: 14, flexDirection: 'column' }} onClick={() => nav('arscan')}><span className="mono" style={{ fontWeight: 700, fontSize: 11 }}>AR</span></button>
            <button onClick={() => nav('scanResult')} style={{ width: 76, height: 76, borderRadius: '50%', border: '4px solid #fff', background: 'rgba(255,255,255,.2)' }} />
            <button className="iconbtn coral" style={{ width: 48, height: 48, borderRadius: 14 }} onClick={() => nav('scanResult')}><Arrow s={22} /></button>
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

const SCAN_FILTERS = ['Tonight', 'Free', 'Techno', 'Live', '< 2 km']
const SCAN_TEST = [() => true, (e) => e.priceNum === 0, (e) => e.cat === 'techno', (e) => e.cat === 'live', (e) => parseFloat(e.dist) < 2]

export function ScanResult({ nav }) {
  const [f, setF] = useState(0)
  const list = EVENTS.filter(SCAN_TEST[f])
  return (
    <>
      <StatusBar />
      <div className="body scanview">
        <ScannerChrome scanning={false} />
        <motion.div style={{ position: 'absolute', inset: 0, background: 'rgba(6,6,9,.55)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        <motion.div className="sheet scan-sheet" style={{ background: 'var(--surface)' }} initial={{ y: 420 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 280, damping: 30 }}>
          <div className="grab" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <motion.div className="center" style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ind)', flex: '0 0 auto' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25, type: 'spring', stiffness: 500, damping: 18 }}>
              <Check s={17} w={3} />
            </motion.div>
            <div>
              <div className="lab" style={{ color: 'var(--ind-2)' }}>POSTER RECOGNISED</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>Live database · {list.length} events tonight</div>
            </div>
          </div>
          <div className="chiprow" style={{ marginBottom: 12 }}>
            {SCAN_FILTERS.map((t, i) => <button key={t} className={`chip ${i === f ? 'blue' : ''}`} onClick={() => setF(i)}>{i === f && <Check s={13} />}{t}</button>)}
          </div>
          <div className="scan-list">
            {list.map((e) => (
              <div key={e.id} style={{ borderBottom: '1px solid var(--line-2)' }}>
                <EventRow2 ev={e} nav={nav} right={<Arrow s={18} />} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <HomeBar />
    </>
  )
}
