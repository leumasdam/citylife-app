import { StatusBar, TabBar, HomeBar } from '../phone/Phone'
import { EVENTS, CATS, byId, img, cover } from '../data/events'
import { EventCard, EventRow, EventBar, SecHead, CatTag, BackHeader, Marquee } from '../ui'
import { MapBg } from './onboarding'
import { Bell, Pin, Search as SearchIc, Filter, Clock, Heart, Users, Star, Flash, Arrow, Check, Message } from '../lib/icons'
import { useState } from 'react'

const CATLIST = Object.entries(CATS).map(([id, c]) => ({ id, ...c }))

export function Home({ nav, ctx }) {
  const [cat, setCat] = useState('all')
  const hot = EVENTS.find((e) => e.hot)
  const list = EVENTS.filter((e) => cat === 'all' || e.cat === cat)
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="app-h">
          <div>
            <div className="hello">Friday night · Bratislava</div>
            <div className="title">Tonight</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)', position: 'relative' }} onClick={() => nav('messages')}>
              <Message s={20} /><span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: 9, background: 'var(--blue)' }} />
            </button>
            <button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)', position: 'relative' }} onClick={() => nav('notifications')}>
              <Bell s={20} /><span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: 9, background: 'var(--pink)' }} />
            </button>
            <button className="avatar" onClick={() => nav('profile')}>S</button>
          </div>
        </div>

        <div className="pad">
          <div className="chiprow" style={{ marginBottom: 18 }}>
            <button className={`chip ${cat === 'all' ? 'on' : ''}`} onClick={() => setCat('all')}><Flash s={14} /> For you</button>
            {CATLIST.map((c) => <button key={c.id} className={`chip ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>)}
          </div>

          <button className="swipe-banner" onClick={() => nav('swipe')} style={{ width: '100%', marginBottom: 22, textAlign: 'left' }}>
            <div>
              <div className="mono upper" style={{ fontSize: 10, opacity: .8, marginBottom: 6 }}>New · with your crew</div>
              <div className="display" style={{ fontSize: 24, lineHeight: .95 }}>Swipe to find<br />your night</div>
              <div style={{ fontSize: 12.5, opacity: .85, marginTop: 6 }}>See what your crew’s into →</div>
            </div>
            <div className="sb-cards"><i /><i /><i /></div>
          </button>

          <SecHead eyebrow="Hot tonight" title="Don’t miss" />
          <EventCard ev={hot} nav={nav} saved={ctx.saved.has(hot.id)} onSave={ctx.toggle} />
        </div>

        <Marquee className="" style={{ marginTop: 22, transform: 'rotate(-1.5deg) scale(1.05)' }}
          words={['NEW DROPS', 'LIVING DATABASE', 'TONIGHT', 'NEAR YOU', 'SCAN ANYTHING', 'FUN']} dur={20} />

        <div className="pad" style={{ marginTop: 22 }}>
          <SecHead eyebrow="Closest to you" title="Near you" more="Map" onMore={() => nav('map')} />
          <div className="stack">
            {list.slice(1, 5).map((e) => (
              <EventRow key={e.id} ev={e} nav={nav}
                right={<div className="when" style={{ color: 'var(--blue-2)' }}><b style={{ color: '#fff' }}>{e.dist}</b>away</div>} />
            ))}
          </div>
        </div>

        <div className="pad" style={{ marginTop: 24 }}>
          <SecHead eyebrow="Sat – Sun" title="This weekend" more="See all" onMore={() => nav('explore')} />
          <div style={{ display: 'grid', gap: 14 }}>
            {list.slice(5, 7).map((e) => <EventCard key={e.id} ev={e} nav={nav} saved={ctx.saved.has(e.id)} onSave={ctx.toggle} />)}
          </div>
        </div>
        <div style={{ height: 16 }} />
      </div>
      <TabBar active="home" nav={nav} />
      <HomeBar />
    </>
  )
}

export function Explore({ nav, ctx }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="app-h"><div className="title" style={{ fontSize: 30 }}>Explore</div>
          <button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)' }} onClick={() => nav('map')}><Pin s={20} /></button>
        </div>
        <div className="pad">
          <button className="row-between" onClick={() => nav('search')} style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--muted)', marginBottom: 20 }}>
            <span style={{ display: 'flex', gap: 10 }}><SearchIc s={20} /> Search events, venues, artists</span>
            <Filter s={18} />
          </button>

          <SecHead eyebrow="Browse" title="Categories" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {CATLIST.slice(0, 6).map((c, i) => {
              const ev = EVENTS.find((e) => e.cat === c.id)
              return (
                <button key={c.id} onClick={() => nav('search', { cat: c.id })} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '1/0.78', textAlign: 'left' }}>
                  <img src={img(ev?.img || 'art')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,11,.85), transparent)' }} />
                  <span className="display" style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 20, color: '#fff' }}>{c.label}</span>
                </button>
              )
            })}
          </div>

          <div style={{ margintop: 8 }} />
          <SecHead eyebrow="Rising fast" title="Trending now" more="" />
          <div className="stack">
            {EVENTS.filter((e) => e.hot || e.rating >= 4.7).slice(0, 4).map((e, i) => (
              <div key={e.id} className="erow" onClick={() => nav('detail', { id: e.id })}>
                <div className="display" style={{ fontSize: 26, width: 26, color: 'var(--blue-2)' }}>{i + 1}</div>
                <div className="thumb" style={{ background: cover(e).bg }}><img src={cover(e).src} alt="" /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4>{e.title}</h4>
                  <div className="sub"><Star s={12} fill="var(--yellow)" style={{ display: 'inline' }} /> {e.rating} · {e.going} going</div>
                </div>
                <CatTag cat={e.cat} />
              </div>
            ))}
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
      <TabBar active="explore" nav={nav} />
      <HomeBar />
    </>
  )
}

export function MapView({ nav, ctx }) {
  const ev = byId('soc-heal')
  return (
    <>
      <StatusBar />
      <div className="body" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}><div style={{ height: '100%' }}><MapBg /></div></div>
        <div style={{ position: 'absolute', top: 14, left: 20, right: 20, display: 'flex', gap: 10 }}>
          <div className="row-between" style={{ flex: 1, padding: '12px 16px', borderRadius: 14, background: 'rgba(12,12,15,.85)', backdrop: 'blur(8px)', border: '1px solid var(--line)' }}>
            <span style={{ display: 'flex', gap: 8, fontSize: 14, fontWeight: 600 }}><SearchIc s={18} /> This area</span>
            <Filter s={18} />
          </div>
        </div>
        <div className="chiprow" style={{ position: 'absolute', top: 70, left: 20, right: 0 }}>
          {['Tonight', 'Free', 'Techno', '< 2 km'].map((t, i) => <span key={t} className={`chip ${i === 0 ? 'blue' : ''}`}>{t}</span>)}
        </div>

        {/* selected event mini-sheet */}
        <div className="sheet" style={{ paddingBottom: 16 }}>
          <div className="grab" />
          <div className="row-between" style={{ marginBottom: 12 }}>
            <div className="eyebrow blue">8 events near you</div>
            <button className="more" style={{ fontSize: 13, color: 'var(--blue-2)' }} onClick={() => nav('explore')}>List view</button>
          </div>
          <div style={{ marginBottom: 12 }}><EventBar ev={ev} nav={nav} /></div>
          <div className="stack" style={{ gap: 2 }}>
            {EVENTS.slice(6, 8).map((e) => <EventRow key={e.id} ev={e} nav={nav} right={<div className="when" style={{ color: 'var(--blue-2)' }}><b style={{ color: '#fff' }}>{e.dist}</b></div>} />)}
          </div>
        </div>
      </div>
      <TabBar active="explore" nav={nav} />
      <HomeBar />
    </>
  )
}

export function Search({ nav, params, ctx }) {
  const cat = params?.cat
  const [q, setQ] = useState(cat ? CATS[cat].label : '')
  const res = EVENTS.filter((e) => !cat || e.cat === cat)
  return (
    <>
      <StatusBar />
      <div className="body">
        <div style={{ display: 'flex', gap: 10, padding: '6px 18px 14px', alignItems: 'center' }}>
          <div className="row-between" style={{ flex: 1, padding: '12px 14px', borderRadius: 14, border: '1px solid var(--blue)', background: 'var(--card)' }}>
            <span style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1 }}><SearchIc s={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', font: 'inherit', width: '100%' }} />
            </span>
          </div>
          <button className="more" onClick={() => nav('back')} style={{ color: 'var(--blue-2)', fontWeight: 700 }}>Cancel</button>
        </div>

        <div className="pad">
          <div className="chiprow" style={{ marginBottom: 18 }}>
            {['Tonight', 'Free', 'Nearby', 'Techno', 'Live', 'Art'].map((t, i) => <span key={t} className={`chip ${i < 2 ? 'on' : ''}`}>{i < 2 && <Check s={13} />}{t}</span>)}
          </div>
          <div className="row-between" style={{ marginBottom: 8 }}>
            <div className="eyebrow blue">{res.length} results{cat ? ` · ${CATS[cat].label}` : ''}</div>
            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 6 }}><Filter s={14} /> Soonest</span>
          </div>
          <div className="stack" style={{ gap: 2 }}>
            {res.map((e) => <EventRow key={e.id} ev={e} nav={nav} />)}
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
      <HomeBar />
    </>
  )
}

export function Detail({ nav, params, ctx }) {
  const ev = byId(params?.id) || EVENTS[0]
  const c = cover(ev)
  const saved = ctx.saved.has(ev.id)
  const going = ctx.going.has(ev.id)
  return (
    <>
      <div className="body" style={{ position: 'relative' }}>
        {/* hero — real poster (full, no crop) for poster events, else photo with overlaid title */}
        {c.isPoster ? (
          <div style={{ position: 'relative', aspectRatio: '4/5', background: c.bg }}>
            <img src={c.src} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.28) 0%, transparent 16%, transparent 86%, var(--ink) 100%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}><StatusBar /></div>
            <div style={{ position: 'absolute', top: 44, left: 0, right: 0 }}><BackHeader nav={nav} /></div>
          </div>
        ) : (
          <div style={{ position: 'relative', height: 360 }}>
            <img src={c.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(12,12,15,.5) 0%, transparent 30%, var(--ink) 99%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}><StatusBar /></div>
            <div style={{ position: 'absolute', top: 44, left: 0, right: 0 }}><BackHeader nav={nav} /></div>
            <div style={{ position: 'absolute', left: 20, bottom: 18, right: 20, color: '#fff' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}><CatTag cat={ev.cat} />{ev.hot && <span className="tag yellow"><Flash s={12} /> Selling fast</span>}</div>
              <h1 className="heavy" style={{ fontSize: 32, textTransform: 'uppercase', lineHeight: .96, letterSpacing: '-.01em' }}>{ev.title}</h1>
            </div>
          </div>
        )}

        <div className="pad" style={{ paddingBottom: 120 }}>
          {c.isPoster && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}><CatTag cat={ev.cat} />{ev.hot && <span className="tag yellow"><Flash s={12} /> Selling fast</span>}</div>
              <h1 className="heavy" style={{ fontSize: 30, textTransform: 'uppercase', lineHeight: .96, letterSpacing: '-.01em' }}>{ev.title}</h1>
            </div>
          )}
          {/* going row */}
          <div className="row-between" style={{ marginTop: 14, marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex' }}>
                {[ 'var(--pink)','var(--blue)','var(--yellow)'].map((c, i) => <span key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: c, border: '2px solid var(--ink)', marginLeft: i ? -10 : 0 }} />)}
              </div>
              <div style={{ fontSize: 13 }}><b>{ev.going} going</b><div style={{ color: 'var(--muted)', fontSize: 12 }}>incl. {ev.friends} friends</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}><Star s={15} fill="var(--yellow)" /> {ev.rating}</div>
          </div>

          {/* info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            <Info ic={<Clock s={18} />} k="Date & time" v={ev.date} v2={ev.time} />
            <Info ic={<Pin s={18} />} k="Location" v={ev.venue} v2={ev.area + ' · ' + ev.dist} />
            <Info ic={<Users s={18} />} k="Capacity" v={ev.going + ' / 800'} v2="filling up" />
            <Info ic={<Flash s={18} />} k="Entry" v={ev.price} v2={ev.priceNum ? 'at the door' : 'no ticket'} />
          </div>

          <SecHead title="What’s it about" />
          <p style={{ color: 'var(--dim)', fontSize: 15, lineHeight: 1.55 }}>{ev.about}</p>

          <div style={{ marginTop: 22 }}>
            <SecHead title="Lineup" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{ev.lineup.map((l) => <span key={l} className="chip">{l}</span>)}</div>
          </div>

          <button className="row-between" onClick={() => nav('organizer')} style={{ width: '100%', marginTop: 22, padding: 14, borderRadius: 16, background: 'var(--card)', border: '1px solid var(--line)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 44, height: 44, borderRadius: 13, background: 'var(--blue)', display: 'grid', placeItems: 'center' }}><img src="./brand/logo-white.png" style={{ width: 30 }} alt="" /></span>
              <span style={{ textAlign: 'left' }}><span style={{ display: 'flex', gap: 5, alignItems: 'center', fontWeight: 700 }}>Hosted by {ev.venue} <Star s={13} fill="var(--blue-2)" /></span><span style={{ fontSize: 12.5, color: 'var(--muted)' }}>View organizer · message</span></span>
            </span>
            <Arrow s={18} />
          </button>

          <div style={{ marginTop: 22 }}>
            <SecHead title="Getting there" />
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 150, border: '1px solid var(--line)', position: 'relative' }}>
              <MapBg pins={false} />
              <div className="center" style={{ position: 'absolute', inset: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--blue)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 10px rgba(31,68,255,.2)' }}><Pin s={22} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dock row">
        <button className="center" onClick={() => ctx.toggle(ev.id)} style={{ width: 54, height: 54, borderRadius: 16, border: '1px solid var(--line)', background: saved ? 'rgba(255,94,199,.14)' : 'var(--card)', flex: '0 0 auto' }}>
          <Heart s={22} fill={saved ? 'var(--pink)' : 'none'} />
        </button>
        <button className={`btn ${going ? 'btn-yellow' : 'btn-blue'}`}
          onClick={() => going ? nav('ticketPass', { id: ev.id }) : ev.priceNum ? nav('checkout', { id: ev.id }) : ctx.goTo(ev.id)}>
          {going ? <><Check s={18} /> You’re going · get pass</> : ev.priceNum ? <>Get a pass — {ev.price} <Arrow s={18} /></> : <>I’m in — it’s free <Arrow s={18} /></>}
        </button>
      </div>
      <HomeBar />
    </>
  )
}

function Info({ ic, k, v, v2 }) {
  return (
    <div className="pill" style={{ padding: 13 }}>
      <div style={{ color: 'var(--blue-2)', marginBottom: 8 }}>{ic}</div>
      <div style={{ fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', fontFamily: 'var(--mono)' }}>{k}</div>
      <div style={{ fontWeight: 700, fontSize: 15, marginTop: 3 }}>{v}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{v2}</div>
    </div>
  )
}
