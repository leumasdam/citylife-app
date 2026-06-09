import { StatusBar, HomeBar } from '../phone/Phone'
import { EVENTS, byId, img, cover, CATS } from '../data/events'
import { EventRow, SecHead, BackHeader, CatTag, QR } from '../ui'
import { Image as ImageIc, Cal, Clock, Pin, Flash, Users, Arrow, Check, Plus, Chevron, Star, Verified, Send, Mic, Card, Apple, Wallet as WalletIc, Ticket, Bell } from '../lib/icons'
import { useState } from 'react'

/* ---------------- CREATE EVENT (organizer) ---------------- */
function Field({ label, children }) {
  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>{label}</div>
      {children}
    </label>
  )
}
const inputCss = { width: '100%', padding: '13px 14px', borderRadius: 13, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--white)', font: 'inherit', outline: 'none' }

export function CreateEvent({ nav }) {
  const [cat, setCat] = useState('techno')
  return (
    <>
      <StatusBar />
      <div className="body">
        <BackHeader nav={nav} title="New event" action={<button className="more" style={{ color: 'var(--blue-2)', fontWeight: 800, fontSize: 14 }} onClick={() => nav('organizer')}>Preview</button>} />
        <div className="pad" style={{ paddingBottom: 110 }}>
          <button style={{ width: '100%', aspectRatio: '16/8', borderRadius: 16, border: '1.5px dashed var(--line)', background: 'var(--card)', color: 'var(--muted)', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
            <div className="center" style={{ flexDirection: 'column', gap: 8 }}><ImageIc s={26} /><span style={{ fontSize: 13, fontWeight: 600 }}>Add cover image</span></div>
          </button>

          <Field label="Event title"><input style={inputCss} defaultValue="Society Is Healing" /></Field>

          <div className="eyebrow" style={{ marginBottom: 8 }}>Category</div>
          <div className="chiprow" style={{ marginBottom: 16 }}>
            {Object.entries(CATS).map(([id, c]) => <button key={id} className={`chip ${cat === id ? 'blue' : ''}`} onClick={() => setCat(id)}>{c.label}</button>)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Date"><div style={{ ...inputCss, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Fri 12 Jun <Cal s={18} /></div></Field>
            <Field label="Time"><div style={{ ...inputCss, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>22:00 <Clock s={18} /></div></Field>
          </div>
          <Field label="Venue"><div style={{ ...inputCss, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Nová Cvernovka <Pin s={18} /></div></Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Entry price"><input style={inputCss} defaultValue="12€" /></Field>
            <Field label="Capacity"><input style={inputCss} defaultValue="800" /></Field>
          </div>
          <Field label="Description"><textarea rows={3} style={{ ...inputCss, resize: 'none' }} defaultValue="A curiosity-driven night of hypnotic techno in the old chemistry hall." /></Field>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14, borderRadius: 14, background: 'rgba(31,68,255,.08)', border: '1px solid rgba(31,68,255,.3)' }}>
            <div style={{ width: 54, flex: '0 0 54px' }}><QR seed={31} size={9} /></div>
            <div style={{ fontSize: 13 }}><b>Auto-poster + QR</b><div style={{ color: 'var(--muted)', fontSize: 12.5 }}>We generate a printable CITYLIFE poster with a scannable code for the street.</div></div>
          </div>
        </div>
      </div>
      <div className="dock"><button className="btn btn-blue" onClick={() => nav('organizer')}>Publish event <Arrow s={18} /></button></div>
      <HomeBar />
    </>
  )
}

/* ---------------- ORGANIZER / HOST PROFILE ---------------- */
export function Organizer({ nav }) {
  const events = EVENTS.filter((e) => ['techno', 'art', 'party'].includes(e.cat)).slice(0, 4)
  return (
    <>
      <div className="body" style={{ position: 'relative' }}>
        <div style={{ position: 'relative', height: 180 }}>
          <img src={img('rave')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.3), var(--ink))' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}><StatusBar /></div>
          <div style={{ position: 'absolute', top: 44, left: 0, right: 0 }}><BackHeader nav={nav} /></div>
        </div>
        <div className="pad" style={{ marginTop: -44, position: 'relative' }}>
          <div style={{ width: 84, height: 84, borderRadius: 22, background: 'var(--blue)', display: 'grid', placeItems: 'center', border: '3px solid var(--ink)' }}>
            <img src="./brand/logo-white.png" style={{ width: 74 }} alt="" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
            <h1 className="heavy" style={{ fontSize: 26, textTransform: 'uppercase' }}>Nová Cvernovka</h1>
            <span style={{ color: 'var(--blue-2)' }}><Verified s={20} /></span>
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 2 }}>Cultural centre · Nové Mesto · 12.4k followers</div>

          <div style={{ display: 'flex', gap: 10, margin: '18px 0' }}>
            <button className="btn btn-blue" style={{ flex: 1 }}>Follow</button>
            <button className="btn btn-dark" style={{ flex: '0 0 56px', padding: 0, height: 50 }} onClick={() => nav('chat')}><Send s={20} /></button>
          </div>

          <div style={{ display: 'flex', gap: 14, marginBottom: 22 }}>
            {[['38', 'Events'], ['12.4k', 'Followers'], ['4.8', 'Rating']].map(([n, l]) => (
              <div key={l}><span className="display" style={{ fontSize: 24 }}>{n}</span><div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{l}</div></div>
            ))}
          </div>

          <SecHead eyebrow="Hosting next" title="Upcoming" more="All" />
          <div className="stack" style={{ gap: 2, paddingBottom: 16 }}>
            {events.map((e) => <EventRow key={e.id} ev={e} nav={nav} />)}
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

/* ---------------- MESSAGES (chat list) ---------------- */
const CHATS = [
  { n: 'Nová Cvernovka', m: 'Doors open at 22:00 — see you on the floor 🔊', t: 'now', u: 2, c: 'var(--blue)', l: 'NC', org: true },
  { n: 'Mia', m: 'omg yes scanning that poster rn', t: '4m', u: 1, c: 'var(--pink)', l: 'M' },
  { n: 'Subclub', m: 'Your pass for Warehouse: Liquid is ready', t: '1h', c: 'var(--yellow)', l: 'S', org: true },
  { n: 'Jakub', m: 'who’s in for riverside saturday?', t: '3h', c: 'var(--green)', l: 'J' },
  { n: 'CITYLIFE', m: 'New: 4 events near you this weekend', t: '1d', c: 'var(--elev)', l: '✦', org: true },
  { n: 'Klára', m: 'see you there!', t: '2d', c: 'var(--blue-2)', l: 'K' },
]
export function Messages({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="app-h"><div className="title" style={{ fontSize: 30 }}>Messages</div>
          <button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)' }}><Plus s={20} /></button>
        </div>
        <div className="pad">
          <div className="stack" style={{ gap: 2 }}>
            {CHATS.map((c, i) => (
              <div key={i} className="erow" onClick={() => nav('chat')} style={{ padding: '12px 0' }}>
                <div style={{ width: 52, height: 52, borderRadius: c.org ? 14 : '50%', background: c.c, color: c.c === 'var(--yellow)' ? '#0b0b0d' : '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, flex: '0 0 auto' }}>{c.l}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row-between"><h4 style={{ display: 'flex', gap: 5, alignItems: 'center' }}>{c.n}{c.org && <Verified s={14} />}</h4><span style={{ fontSize: 11, color: 'var(--muted)' }}>{c.t}</span></div>
                  <div className="sub" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: c.u ? 'var(--white)' : 'var(--muted)', fontWeight: c.u ? 600 : 400 }}>{c.m}</div>
                </div>
                {c.u && <span style={{ width: 20, height: 20, borderRadius: 10, background: 'var(--blue)', color: '#fff', fontSize: 11, fontWeight: 800, display: 'grid', placeItems: 'center' }}>{c.u}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

/* ---------------- CHAT thread ---------------- */
const MSGS = [
  { me: false, t: 'Hey! Saw you scanned our poster 👀 welcome' },
  { me: true, t: 'haha yes — is there still entry at the door?' },
  { me: false, t: 'Yep, 12€ cash or in-app. Want me to hold a spot?' },
  { me: true, t: 'go on then' },
  { me: false, t: 'Done ✅ your pass is in Wallet. Doors 22:00.', pass: true },
]
export function Chat({ nav }) {
  const ev = byId('soc-heal')
  return (
    <>
      <StatusBar />
      <div className="body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="row-between" style={{ padding: '4px 16px 12px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={() => nav('back')} className="center" style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid var(--line)' }}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--blue)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800 }}>NC</div>
            <div><div style={{ fontWeight: 700, fontSize: 15, display: 'flex', gap: 4, alignItems: 'center' }}>Nová Cvernovka <Verified s={13} /></div><div style={{ fontSize: 11.5, color: 'var(--green)' }}>● active now</div></div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="erow" onClick={() => nav('detail', { id: ev.id })} style={{ padding: 10, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--card)' }}>
            <div className="thumb" style={{ width: 46, height: 58, background: cover(ev).bg }}><img src={cover(ev).src} alt="" /></div>
            <div style={{ flex: 1, minWidth: 0 }}><h4 style={{ fontSize: 14 }}>{ev.title}</h4><div className="sub">{ev.date} · {ev.price}</div></div>
            <Chevron s={16} />
          </div>
          {MSGS.map((m, i) => (
            <div key={i} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '78%' }}>
              <div style={{ padding: '10px 14px', borderRadius: 16, background: m.me ? 'var(--blue)' : 'var(--card)', color: m.me ? '#fff' : 'var(--white)', border: m.me ? 'none' : '1px solid var(--line)', fontSize: 14.5, lineHeight: 1.4 }}>{m.t}</div>
              {m.pass && <button onClick={() => nav('wallet')} style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center', color: 'var(--blue-2)', fontWeight: 700, fontSize: 13 }}><Ticket s={15} /> View pass in Wallet</button>}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', borderTop: '1px solid var(--line)' }}>
          <div style={{ flex: 1, padding: '11px 16px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--muted)', fontSize: 14 }}>Message…</div>
          <button className="center" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--blue)', color: '#fff' }}><Send s={20} /></button>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

/* ---------------- WALLET ---------------- */
export function Wallet({ nav }) {
  const passes = [byId('soc-heal'), byId('dnb')]
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="app-h"><div className="title" style={{ fontSize: 30 }}>Wallet</div>
          <button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)' }}><Plus s={20} /></button>
        </div>
        <div className="pad" style={{ paddingBottom: 20 }}>
          {/* credits card */}
          <div style={{ borderRadius: 20, padding: 20, background: 'linear-gradient(135deg, var(--blue), #1226b0)', color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: 22 }}>
            <div style={{ position: 'absolute', right: -20, top: -20, opacity: .25 }}><img src="./brand/logo-white.png" style={{ width: 120 }} alt="" /></div>
            <div className="mono upper" style={{ fontSize: 11, opacity: .8 }}>CITYLIFE credits</div>
            <div className="display" style={{ fontSize: 42, marginTop: 8 }}>34.00€</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button className="btn btn-white sm" style={{ flex: 1 }} onClick={() => nav('checkout')}>Top up</button>
              <button className="btn sm" style={{ flex: 1, background: 'rgba(255,255,255,.2)', color: '#fff' }}>Send</button>
            </div>
          </div>

          <SecHead eyebrow="Tap to show" title="Your passes" more="" />
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, marginBottom: 20 }} className="chiprow">
            {passes.map((ev) => (
              <button key={ev.id} onClick={() => nav('ticketPass', { id: ev.id })} style={{ flex: '0 0 150px', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--card)', textAlign: 'left' }}>
                <div style={{ aspectRatio: '4/5', position: 'relative', background: cover(ev).bg }}><img src={cover(ev).src} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" /><div style={{ position: 'absolute', top: 8, left: 8 }}><CatTag cat={ev.cat} /></div></div>
                <div style={{ padding: 10 }}><div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.1 }}>{ev.title}</div><div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{ev.date}</div></div>
              </button>
            ))}
          </div>

          <SecHead title="Payment methods" />
          <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)', overflow: 'hidden', marginBottom: 18 }}>
            {[[<Apple s={20} />, 'Apple Pay', 'default'], [<Card s={20} />, 'Visa •••• 4242', ''], [<Plus s={20} />, 'Add payment method', '']].map(([ic, label, tag], i) => (
              <div key={label} className="row-between" style={{ padding: '15px 16px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <span style={{ display: 'flex', gap: 12, alignItems: 'center', fontWeight: 600 }}><span style={{ color: 'var(--blue-2)' }}>{ic}</span>{label}</span>
                {tag ? <span className="tag blue">{tag}</span> : <Chevron s={18} />}
              </div>
            ))}
          </div>

          <SecHead title="Recent" />
          {[['Warehouse: Liquid', '-15.00€', 'Sat'], ['Top up', '+20.00€', 'Wed'], ['Cellar Jazz Sessions', '-10.00€', 'Tue']].map(([t, a, d]) => (
            <div key={t} className="row-between" style={{ padding: '12px 0', borderBottom: '1px solid var(--line-2)' }}>
              <div><div style={{ fontWeight: 600, fontSize: 14.5 }}>{t}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{d}</div></div>
              <div style={{ fontWeight: 800, color: a[0] === '+' ? 'var(--green)' : 'var(--white)' }}>{a}</div>
            </div>
          ))}
          <div style={{ height: 16 }} />
        </div>
      </div>
      <HomeBar />
    </>
  )
}

/* ---------------- CHECKOUT (payment) ---------------- */
export function Checkout({ nav, params, ctx }) {
  const ev = byId(params?.id) || byId('dnb')
  const fee = 1.5
  const total = (ev.priceNum || 0) + fee
  return (
    <>
      <StatusBar />
      <div className="body">
        <BackHeader nav={nav} title="Checkout" action={<span style={{ width: 40 }} />} />
        <div className="pad" style={{ paddingBottom: 130 }}>
          <div className="erow" style={{ padding: 12, borderRadius: 16, border: '1px solid var(--line)', background: 'var(--card)', marginBottom: 20 }}>
            <div className="thumb" style={{ background: cover(ev).bg }}><img src={cover(ev).src} alt="" /></div>
            <div style={{ flex: 1 }}><h4>{ev.title}</h4><div className="sub">{ev.date} · {ev.time.split(' – ')[0]}</div><div className="sub" style={{ color: 'var(--blue-2)' }}>{ev.venue}</div></div>
          </div>

          <SecHead title="Tickets" />
          <div className="row-between" style={{ padding: '12px 0' }}>
            <div><div style={{ fontWeight: 600 }}>General admission</div><div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{ev.price} each</div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button className="center" style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line)' }}>–</button>
              <b>1</b>
              <button className="center" style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--blue)', color: '#fff' }}><Plus s={16} /></button>
            </div>
          </div>

          <div className="divider" style={{ margin: '12px 0' }} />
          {[['Subtotal', ev.price], ['Service fee', fee.toFixed(2) + '€']].map(([k, v]) => (
            <div key={k} className="row-between" style={{ padding: '6px 0', color: 'var(--muted)', fontSize: 14 }}><span>{k}</span><span>{v}</span></div>
          ))}
          <div className="row-between" style={{ padding: '10px 0', fontWeight: 800, fontSize: 18 }}><span>Total</span><span>{total.toFixed(2)}€</span></div>

          <SecHead title="Pay with" />
          <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)', overflow: 'hidden' }}>
            {[[<Apple s={20} />, 'Apple Pay', true], [<Card s={20} />, 'Visa •••• 4242', false], [<WalletIc s={20} />, 'CITYLIFE credits · 34€', false]].map(([ic, label, on], i) => (
              <div key={label} className="row-between" style={{ padding: '15px 16px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <span style={{ display: 'flex', gap: 12, alignItems: 'center', fontWeight: 600 }}><span style={{ color: 'var(--blue-2)' }}>{ic}</span>{label}</span>
                <span style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid ' + (on ? 'var(--blue)' : 'var(--line)'), display: 'grid', placeItems: 'center' }}>{on && <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--blue)' }} />}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dock"><button className="btn btn-blue" onClick={() => { ctx?.goConfirm?.(ev.id); nav('ticketPass', { id: ev.id }) }}> Pay {total.toFixed(2)}€ · get pass</button></div>
      <HomeBar />
    </>
  )
}

/* ---------------- AR SCAN ---------------- */
const AR_PINS = [
  { x: '16%', y: '34%', ev: 'soc-heal', d: '0.2 km' },
  { x: '64%', y: '26%', ev: 'dnb', d: '0.5 km' },
  { x: '44%', y: '52%', ev: 'market2', d: '0.9 km' },
  { x: '80%', y: '60%', ev: 'jazz', d: '1.1 km' },
]
export function ARScan({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body scanview">
        <img className="feed" src={img('rooftop')} alt="" style={{ opacity: .95 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,9,.4), rgba(6,6,9,.1) 40%, rgba(6,6,9,.7))' }} />

        {AR_PINS.map((p, i) => {
          const ev = byId(p.ev)
          return (
            <button key={i} onClick={() => nav('detail', { id: ev.id })} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ background: 'rgba(12,12,15,.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 12, padding: '8px 12px', minWidth: 120, textAlign: 'left', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><CatTag cat={ev.cat} /><span style={{ fontSize: 11, color: 'var(--yellow)' }}>{p.d}</span></div>
                <div style={{ fontWeight: 800, fontSize: 13, marginTop: 6, lineHeight: 1 }}>{ev.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 3 }}>{ev.time.split(' – ')[0]} · {ev.price}</div>
              </div>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--blue)', border: '2px solid #fff', boxShadow: '0 0 0 6px rgba(31,68,255,.3)' }} />
            </button>
          )
        })}

        {/* top bar */}
        <div className="row-between" style={{ position: 'absolute', top: 54, left: 20, right: 20, zIndex: 10, color: '#fff' }}>
          <button className="center" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.2)' }} onClick={() => nav('home')}><Arrow s={20} style={{ transform: 'rotate(180deg)' }} /></button>
          <div className="mono upper" style={{ fontSize: 12 }}>AR · look around</div>
          <div style={{ width: 40 }} />
        </div>

        {/* mode switch */}
        <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, display: 'grid', placeItems: 'center', gap: 14, zIndex: 10 }}>
          <div style={{ color: 'rgba(255,255,255,.85)', fontSize: 13 }}>4 events in view · point your phone around</div>
          <div style={{ display: 'inline-flex', padding: 4, borderRadius: 999, background: 'rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.2)' }}>
            <button onClick={() => nav('scanner')} style={{ padding: '9px 18px', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 13 }}>Scan QR</button>
            <button style={{ padding: '9px 18px', borderRadius: 999, background: '#fff', color: '#0b0b0d', fontWeight: 700, fontSize: 13 }}>AR view</button>
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}
