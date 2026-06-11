import { useState } from 'react'
import { motion } from 'framer-motion'
import { StatusBar, HomeBar } from '../../phone/Phone'
import { byId } from '../../data/events'
import { EventRow2, Waveform } from '../ui2'
import { Arrow, Send, Flash } from '../icons2'

/* a scripted conversation that shows off the concierge */
const THREAD = [
  { me: false, t: <>Hi Samuel — it's Friday and the city's at <b className="hl">91%</b> crowd. <span className="ind">4 events</span> match your crew tonight. Two are filling up fast.</> },
  { me: true, t: 'plan me a night that ends with techno' },
  { me: false, t: <>On it. I'd start light, eat, then go hard — here's a route that keeps you under <b className="hl">2 km</b> all night:</>, route: ['market2', 'art-live', 'dnb'] },
]

const CHIPS = ['⚡ Plan my night', "Who's going?", 'Cheapest tonight', 'Free events only']

export function AIPlanner({ nav }) {
  const [sent, setSent] = useState(false)
  return (
    <>
      <StatusBar />
      <div className="body" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* header */}
        <div className="row-between" style={{ padding: '4px 18px 12px' }}>
          <button className="iconbtn ghost" onClick={() => nav('back')}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
          <div className="center" style={{ flexDirection: 'column' }}>
            <div className="h-mega" style={{ fontSize: 18 }}>AI Night Lead</div>
            <div style={{ fontSize: 11, color: 'var(--ind-2)', display: 'flex', gap: 5, alignItems: 'center' }}><span style={{ width: 6, height: 6, borderRadius: 6, background: 'var(--ind-2)' }} /> thinking with you</div>
          </div>
          <button className="iconbtn ind" style={{ fontSize: 17 }}><span className="spin-slow">✦</span></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 18px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {THREAD.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.25 }}
              style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: m.me ? '80%' : '100%', width: m.route ? '100%' : 'auto' }}>
              {m.me ? (
                <div style={{ padding: '11px 15px', borderRadius: 16, background: 'var(--ind)', color: '#fff', fontSize: 14, lineHeight: 1.4 }}>{m.t}</div>
              ) : (
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--ind)', display: 'grid', placeItems: 'center', fontSize: 14, flex: '0 0 auto', marginTop: 2 }}><span className="spin-slow">✦</span></span>
                  <div style={{ flex: 1 }}>
                    <div className="ai-bubble">{m.t}</div>
                    {m.route && (
                      <div className="vcard" style={{ marginTop: 10, padding: 12 }}>
                        <div className="lab" style={{ marginBottom: 10, color: 'var(--ind-2)' }}>SUGGESTED ROUTE · 3 STOPS</div>
                        <div className="stack" style={{ gap: 2 }}>
                          {m.route.map((id, k) => (
                            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div className="center" style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--elev)', fontSize: 11, fontWeight: 800, flex: '0 0 auto', color: 'var(--ind-2)' }}>{k + 1}</div>
                              <div style={{ flex: 1, minWidth: 0 }}><EventRow2 ev={byId(id)} nav={nav} /></div>
                            </div>
                          ))}
                        </div>
                        <button className="btn" style={{ background: 'var(--ind)', color: '#fff', marginTop: 12 }} onClick={() => nav('saved')}><Flash s={17} /> Lock this route</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          {sent && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignSelf: 'flex-start', display: 'flex', gap: 6, padding: '12px 16px', borderRadius: 16, background: 'var(--elev)' }}>
              {[0, 1, 2].map((i) => <motion.span key={i} style={{ width: 7, height: 7, borderRadius: 7, background: 'var(--muted)' }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />)}
            </motion.div>
          )}
        </div>

        {/* quick chips + input */}
        <div style={{ padding: '0 16px 8px' }}>
          <div className="chiprow" style={{ marginBottom: 12 }}>
            {CHIPS.map((c, i) => <button key={c} className={`ai-chip ${i === 0 ? 'go' : ''}`} onClick={() => { setSent(true); setTimeout(() => setSent(false), 1500) }}>{c}</button>)}
          </div>
          <div className="ai-input">
            <input placeholder="Ask anything, or pick a prompt…" onKeyDown={() => setSent(true)} />
            <Waveform />
            <button className="iconbtn coral" onClick={() => { setSent(true); setTimeout(() => setSent(false), 1500) }}><Send s={17} /></button>
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}
