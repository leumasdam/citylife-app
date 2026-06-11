import { useState } from 'react'
import { StatusBar, HomeBar } from '../../phone/Phone'
import { TabBar2 } from '../chrome2'
import { EVENTS, CATS, byId, cover, img } from '../../data/events'
import { MapBg } from '../../screens/onboarding'
import {
  CatTag2, Pill, ArrowBtn, CardHead, CrowdChart, CapWeek, AlertCard,
  EventCard2, EventRow2, CategoryDeck,
} from '../ui2'
import { Marquee } from '../../ui'
import { Search as SearchIc, Bell, Flash, Pin, Filter, Clock, Users, Star, Arrow, Mic, Heart, Check } from '../icons2'

const CATLIST = Object.entries(CATS).map(([id, c]) => ({ id, ...c }))

/* crowd of the city, by night this week */
const CROWD = [
  { d: 'Mon', v: 46 }, { d: 'Tue', v: 54 }, { d: 'Wed', v: 61 }, { d: 'Thu', v: 72 },
  { d: 'Fri', v: 91 }, { d: 'Sat', v: 88, future: true }, { d: 'Sun', v: 57, future: true },
]
const OLDTOWN = [40, 52, 58, 70, 92, 84, 55]
const PETRZ = [30, 36, 44, 52, 68, 74, 48]

/* =========================== HOME — the dashboard =========================== */
export function Home({ nav, ctx }) {
  const [cat, setCat] = useState('all')
  const hot = byId('dnb')
  const list = EVENTS.filter((e) => cat === 'all' || e.cat === cat)
  return (
    <>
      <StatusBar />
      <div className="body">
        {/* header */}
        <div className="app-h" style={{ alignItems: 'center' }}>
          <button onClick={() => nav('profile')} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span className="avatar" style={{ width: 44, height: 44 }}>S</span>
            <span style={{ textAlign: 'left' }}>
              <span className="lab" style={{ display: 'block' }}>Friday · Bratislava</span>
              <span style={{ fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase' }}>Hi, Samuel!</span>
            </span>
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="iconbtn ghost" onClick={() => nav('search')}><SearchIc s={18} /></button>
            <button className="iconbtn ghost" style={{ position: 'relative' }} onClick={() => nav('notifications')}>
              <Bell s={18} /><span style={{ position: 'absolute', top: 7, right: 8, width: 8, height: 8, borderRadius: 9, background: 'var(--coral)', border: '2px solid var(--ink)' }} />
            </button>
          </div>
        </div>

        <div className="pad" style={{ display: 'grid', gap: 14 }}>
          {/* location pill */}
          <button className="row-between vcard" style={{ padding: '12px 14px 12px 16px' }} onClick={() => nav('map')}>
            <span style={{ display: 'flex', gap: 9, alignItems: 'center', fontWeight: 700, fontSize: 14 }}><Pin s={17} style={{ color: 'var(--ind-2)' }} /> Old Town, Bratislava</span>
            <Pill variant="ink">Tonight</Pill>
          </button>

          {/* swipe deck — the fastest way in */}
          <button className="block coral" onClick={() => nav('swipe')} style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <div className="lab" style={{ color: 'rgba(0,0,0,.55)' }}>WITH YOUR CREW</div>
              <div className="h-card" style={{ marginTop: 5 }}>Swipe to find<br />your night</div>
            </div>
            {/* fanned mini deck */}
            <div style={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
              {[-10, 0, 10].map((r, i) => (
                <span key={r} style={{ width: 30, height: 42, borderRadius: 8, border: '2px solid rgba(0,0,0,.5)', background: ['rgba(0,0,0,.18)', '#14140f', 'rgba(255,255,255,.55)'][i], transform: `rotate(${r}deg)`, marginLeft: i ? -13 : 0, zIndex: i }} />
              ))}
            </div>
            <ArrowBtn tone="dark" />
          </button>

          {/* alert — selling fast */}
          <AlertCard tone="acid" icon={<Flash s={20} />}
            title="3 events selling fast"
            body={<>After Dark is <b>90% full</b> — 6 of your crew going.</>} tick="02:14"
            onClick={() => nav('detail', { id: 'dnb' })} />

          {/* AI night planner entry */}
          <button className="vcard" onClick={() => nav('aiplanner')} style={{ textAlign: 'left', display: 'block' }}>
            <CardHead title={<>AI Night<br />Planner</>} sub="Your concierge"
              right={<span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ind)', display: 'grid', placeItems: 'center', fontSize: 18 }}><span className="spin-slow">✦</span></span>} />
            <div className="ai-bubble" style={{ marginBottom: 12 }}>
              Hi Samuel — <span className="ind">4 events</span> match your crew tonight. Want me to plan a route that ends at <b>After Dark</b>?
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="ai-chip go">⚡ Plan my night</span>
              <span className="ai-chip">Who's going?</span>
            </div>
          </button>

          {/* crowd capacity block */}
          <div className="block lav">
            <CardHead dark title={<>Crowd<br />Tonight</>} sub="Where the city is"
              right={<Pill variant="solid">This week</Pill>} onArrow={() => nav('map')} arrowTone="light" />
            <CapWeek days={CROWD} todayIdx={4} />
            <div style={{ margin: '16px 0 12px' }}>
              <CrowdChart series={OLDTOWN} ghost={PETRZ} accent="#16122e" h={64} />
            </div>
            <div className="legend">
              <span><i style={{ background: '#16122e' }} /> Old Town</span>
              <span><i style={{ background: 'rgba(0,0,0,.35)' }} /> Petržalka</span>
              <span style={{ marginLeft: 'auto', fontWeight: 800 }}>Peak ~23:30</span>
            </div>
          </div>

          {/* category chips */}
          <div className="chiprow" style={{ marginTop: 2 }}>
            <button className={`chip ${cat === 'all' ? 'on' : ''}`} onClick={() => setCat('all')}><Flash s={13} /> For you</button>
            {CATLIST.map((c) => <button key={c.id} className={`chip ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>)}
          </div>

          {/* hot tonight */}
          <div className="sec2"><span className="t">Don't miss</span><button className="lab" onClick={() => nav('explore')} style={{ color: 'var(--ind-2)' }}>SEE ALL</button></div>
          <EventCard2 ev={hot} nav={nav} saved={ctx.saved.has(hot.id)} onSave={ctx.toggle} />
        </div>

        {/* ✦ ticker strip — the street DNA */}
        <Marquee style={{ marginTop: 18, transform: 'rotate(-1.5deg) scale(1.04)' }}
          words={['TONIGHT', 'NEAR YOU', 'SCAN ANYTHING', 'LIVING DATABASE', 'WE KNOW WHERE']} dur={20} />

        <div className="pad" style={{ display: 'grid', gap: 14, marginTop: 18 }}>
          {/* near you map */}
          <div className="block mint" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 188 }}>
              <MapBg />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(205,217,207,.2), rgba(205,217,207,.85))' }} />
              <div style={{ position: 'absolute', top: 14, left: 16, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="lab" style={{ color: 'rgba(0,0,0,.5)' }}>Near you</div>
                  <div className="h-card" style={{ color: '#16201a', marginTop: 4 }}>8 events<br />in 2 km</div>
                </div>
                <ArrowBtn tone="light" onClick={() => nav('map')} />
              </div>
              <span style={{ position: 'absolute', left: '32%', top: '58%', background: '#16201a', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 10px', borderRadius: 12 }}>After Dark · 0.6 km</span>
            </div>
          </div>

          {/* this weekend */}
          <div className="sec2"><span className="t">This weekend</span><span className="hand" style={{ fontSize: 19, color: 'var(--acid)', transform: 'rotate(-2deg)' }}>don't sleep on it ✦</span></div>
          <div style={{ display: 'grid', gap: 14 }}>
            {list.slice(5, 7).map((e) => <EventCard2 key={e.id} ev={e} nav={nav} saved={ctx.saved.has(e.id)} onSave={ctx.toggle} />)}
          </div>
        </div>
        <div style={{ height: 8 }} />
      </div>
      <TabBar2 active="home" nav={nav} />
      <HomeBar />
    </>
  )
}

/* =========================== EXPLORE — categories as a stacked deck =========================== */
const TIERS = [
  { cat: 'techno', label: 'Techno', poster: 'crisist', tone: 'coral' },
  { cat: 'party', label: 'Party', poster: 'roller', tone: 'acid' },
  { cat: 'art', label: 'Art', poster: 'amumu', tone: 'sky' },
  { cat: 'live', label: 'Live', poster: 'gonzi', tone: 'lav' },
]
export function Explore({ nav }) {
  const tiers = TIERS.map((t) => {
    const evs = EVENTS.filter((e) => e.cat === t.cat)
    const free = evs.filter((e) => e.priceNum === 0).length
    return { ...t, stats: [`${evs.length} events`, free ? `${free} free` : 'all ages'] }
  })
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="app-h"><div className="h-mega ovp2" style={{ fontSize: 34 }}>Categories</div>
          <button className="iconbtn ghost" onClick={() => nav('map')}><Pin s={18} /></button>
        </div>
        <div className="pad" style={{ display: 'grid', gap: 16 }}>
          <button className="row-between vcard" onClick={() => nav('search')} style={{ padding: '14px 16px', color: 'var(--muted)' }}>
            <span style={{ display: 'flex', gap: 10 }}><SearchIc s={19} /> Search events, venues, artists</span>
            <Filter s={18} />
          </button>

          <div className="sec2"><span className="t">Pick a scene</span><span className="hand" style={{ fontSize: 19, color: 'var(--muted)' }}>tap to open</span></div>
          <CategoryDeck tiers={tiers} nav={nav} />

          <div className="sec2"><span className="t">Trending now</span></div>
          <div className="stack" style={{ gap: 2 }}>
            {EVENTS.filter((e) => e.hot || e.rating >= 4.7).slice(0, 4).map((e, i) => (
              <button key={e.id} className="erow" onClick={() => nav('detail', { id: e.id })} style={{ width: '100%', textAlign: 'left' }}>
                <div className="h-mega" style={{ fontSize: 24, width: 24, color: 'var(--ind-2)' }}>{i + 1}</div>
                <div className="thumb" style={{ background: cover(e).bg }}><img src={cover(e).src} alt="" /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4>{e.title}</h4>
                  <div className="sub"><Star s={12} fill="var(--acid)" style={{ display: 'inline' }} /> {e.rating} · {e.going} going</div>
                </div>
                <CatTag2 cat={e.cat} />
              </button>
            ))}
          </div>
          <div style={{ height: 8 }} />
        </div>
      </div>
      <TabBar2 active="explore" nav={nav} />
      <HomeBar />
    </>
  )
}

/* =========================== MAP =========================== */
export function MapView({ nav }) {
  const ev = byId('dnb')
  return (
    <>
      <StatusBar />
      <div className="body" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}><MapBg /></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,14,18,.4), transparent 30%, transparent 60%, var(--ink))' }} />
        <div style={{ position: 'absolute', top: 14, left: 20, right: 20, display: 'flex', gap: 10 }}>
          <div className="row-between" style={{ flex: 1, padding: '12px 16px', borderRadius: 999, background: 'rgba(20,20,26,.9)', border: '1px solid var(--line)', backdropFilter: 'blur(8px)' }}>
            <span style={{ display: 'flex', gap: 8, fontSize: 14, fontWeight: 600 }}><SearchIc s={17} /> This area</span>
            <Filter s={17} />
          </div>
        </div>
        <div className="chiprow" style={{ position: 'absolute', top: 70, left: 20, right: 0 }}>
          {['Tonight', 'Free', 'Techno', '< 2 km'].map((t, i) => <span key={t} className={`chip ${i === 0 ? 'on' : ''}`}>{t}</span>)}
        </div>

        {/* floating tooltip on a pin */}
        <div style={{ position: 'absolute', top: '34%', left: '22%', background: '#16161b', border: '1px solid var(--line)', borderRadius: 14, padding: 10, width: 150, boxShadow: '0 14px 30px -10px rgba(0,0,0,.6)' }}>
          <CatTag2 cat={ev.cat} />
          <div style={{ fontWeight: 800, fontSize: 13, marginTop: 6 }}>{ev.title}</div>
          <div className="sub" style={{ color: 'var(--ind-2)' }}>0.6 km · {ev.price}</div>
        </div>

        <div className="sheet" style={{ paddingBottom: 16, background: 'var(--surface)' }}>
          <div className="grab" />
          <div className="row-between" style={{ marginBottom: 12 }}>
            <div className="lab" style={{ color: 'var(--ind-2)' }}>8 events near you</div>
            <button className="lab" onClick={() => nav('explore')} style={{ color: 'var(--ind-2)' }}>LIST VIEW</button>
          </div>
          <div className="stack" style={{ gap: 2 }}>
            {EVENTS.slice(5, 8).map((e) => <EventRow2 key={e.id} ev={e} nav={nav} right={<div className="when" style={{ color: 'var(--ind-2)' }}><b style={{ color: 'var(--white)' }}>{e.dist}</b></div>} />)}
          </div>
        </div>
      </div>
      <TabBar2 active="explore" nav={nav} />
      <HomeBar />
    </>
  )
}

/* =========================== SEARCH =========================== */
export function Search({ nav, params }) {
  const cat = params?.cat
  const [q, setQ] = useState(cat ? CATS[cat].label : '')
  const res = EVENTS.filter((e) => !cat || e.cat === cat)
  return (
    <>
      <StatusBar />
      <div className="body">
        <div style={{ display: 'flex', gap: 10, padding: '6px 18px 14px', alignItems: 'center' }}>
          <div className="row-between" style={{ flex: 1, padding: '12px 15px', borderRadius: 999, border: '1px solid var(--ind)', background: 'var(--card)' }}>
            <span style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1 }}><SearchIc s={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', font: 'inherit', width: '100%' }} />
            </span>
            <Mic s={17} style={{ color: 'var(--muted)' }} />
          </div>
          <button className="lab" onClick={() => nav('back')} style={{ color: 'var(--ind-2)' }}>CANCEL</button>
        </div>
        <div className="pad">
          <div className="chiprow" style={{ marginBottom: 18 }}>
            {['Tonight', 'Free', 'Nearby', 'Techno', 'Live', 'Art'].map((t, i) => <span key={t} className={`chip ${i < 2 ? 'on' : ''}`}>{i < 2 && <Check s={13} />}{t}</span>)}
          </div>
          <div className="row-between" style={{ marginBottom: 10 }}>
            <div className="lab" style={{ color: 'var(--ind-2)' }}>{res.length} results{cat ? ` · ${CATS[cat].label}` : ''}</div>
            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 6 }}><Filter s={14} /> Soonest</span>
          </div>
          <div className="stack" style={{ gap: 2 }}>
            {res.map((e) => <EventRow2 key={e.id} ev={e} nav={nav} />)}
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
      <HomeBar />
    </>
  )
}

/* =========================== DETAIL =========================== */
function MiniStat({ ic, k, v, v2 }) {
  return (
    <div className="vcard" style={{ padding: 13, borderRadius: 16 }}>
      <div style={{ color: 'var(--ind-2)', marginBottom: 8 }}>{ic}</div>
      <div className="lab">{k}</div>
      <div style={{ fontWeight: 800, fontSize: 15, marginTop: 3 }}>{v}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{v2}</div>
    </div>
  )
}
export function Detail({ nav, params, ctx }) {
  const ev = byId(params?.id) || EVENTS[0]
  const c = cover(ev)
  const saved = ctx.saved.has(ev.id)
  const going = ctx.going.has(ev.id)
  const cap = Math.round((ev.going / 800) * 100)
  return (
    <>
      <div className="body" style={{ position: 'relative' }}>
        <div style={{ position: 'relative', aspectRatio: '5/4', background: c.bg }}>
          <img src={c.src} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.28) 0%, transparent 24%, transparent 70%, var(--ink) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}><StatusBar /></div>
          <div className="row-between" style={{ position: 'absolute', top: 50, left: 18, right: 18 }}>
            <button className="iconbtn ghost" onClick={() => nav('back')}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
            <button className="iconbtn ghost"><Users s={17} /></button>
          </div>
          {ev.hot && <span className="stamp2" style={{ position: 'absolute', right: 16, bottom: 56, color: 'var(--acid)', zIndex: 3 }}>SELLING FAST ✦</span>}
        </div>

        <div className="pad" style={{ paddingBottom: 120, marginTop: 6 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}><CatTag2 cat={ev.cat} />{ev.hot && <span className="vbadge coral"><Flash s={11} /> Selling fast</span>}</div>
          <h1 className="h-mega" style={{ fontSize: 32 }}>{ev.title}</h1>

          <div className="row-between" style={{ marginTop: 16, marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex' }}>
                {['var(--coral)', 'var(--ind)', 'var(--acid)'].map((cc, i) => <span key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: cc, border: '2px solid var(--ink)', marginLeft: i ? -10 : 0 }} />)}
              </div>
              <div style={{ fontSize: 13 }}><b>{ev.going} going</b><div style={{ color: 'var(--muted)', fontSize: 12 }}>incl. {ev.friends} friends</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}><Star s={15} fill="var(--acid)" /> {ev.rating}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            <MiniStat ic={<Clock s={18} />} k="DATE & TIME" v={ev.date} v2={ev.time} />
            <MiniStat ic={<Pin s={18} />} k="LOCATION" v={ev.venue} v2={ev.area + ' · ' + ev.dist} />
          </div>

          {/* crowd forecast block */}
          <div className="block coral" style={{ marginBottom: 20 }}>
            <CardHead dark title="Fills up by" sub="Crowd forecast"
              right={<span style={{ fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 26 }}>{ev.time.split(' – ')[0]}</span>} />
            <div className="capweek" style={{ marginBottom: 8 }}>
              {['18', '20', '22', '00', '02', '04'].map((t, i) => {
                const vals = [12, 34, 78, 100, 64, 22]
                return <div className="capday" key={t}><div className="d">{t}h</div><div className={`capcircle ${i === 3 ? 'on' : ''}`}>{vals[i]}%</div></div>
              })}
            </div>
            <div style={{ fontSize: 12.5, opacity: .8, marginTop: 10 }}><b>{cap}% sold</b> · last entry 02:00 · arrive before midnight</div>
          </div>

          <div className="sec2"><span className="t">About</span></div>
          <p style={{ color: 'var(--dim)', fontSize: 15, lineHeight: 1.55 }}>{ev.about}</p>

          <div className="sec2" style={{ marginTop: 22 }}><span className="t">Lineup</span></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{ev.lineup.map((l) => <span key={l} className="chip">{l}</span>)}</div>

          <button className="row-between vcard" onClick={() => nav('organizer')} style={{ width: '100%', marginTop: 22, padding: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--ind)', display: 'grid', placeItems: 'center' }}><img src="./brand/logo-white.png" style={{ width: 46 }} alt="" /></span>
              <span style={{ textAlign: 'left' }}><span style={{ display: 'flex', gap: 5, alignItems: 'center', fontWeight: 700 }}>Hosted by {ev.venue}</span><span style={{ fontSize: 12.5, color: 'var(--muted)' }}>View organizer · message</span></span>
            </span>
            <Arrow s={18} />
          </button>

          <div className="sec2" style={{ marginTop: 22 }}><span className="t">Getting there</span></div>
          <div style={{ borderRadius: 18, overflow: 'hidden', height: 150, border: '1px solid var(--line)', position: 'relative' }}>
            <MapBg pins={false} />
            <div className="center" style={{ position: 'absolute', inset: 0 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--ind)', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 10px rgba(93,95,239,.25)' }}><Pin s={22} /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dock row">
        <button className="iconbtn dark" style={{ width: 54, height: 54, borderRadius: 16, background: saved ? 'rgba(255,106,92,.16)' : 'var(--card)' }} onClick={() => ctx.toggle(ev.id)}>
          <Heart s={22} fill={saved ? 'var(--coral)' : 'none'} />
        </button>
        <button className="btn" style={{ background: going ? 'var(--acid)' : 'var(--ind)', color: going ? '#14140f' : '#fff' }}
          onClick={() => going ? nav('ticketPass', { id: ev.id }) : ev.priceNum ? nav('checkout', { id: ev.id }) : ctx.goTo(ev.id)}>
          {going ? <><Check s={18} /> You're going · pass</> : ev.priceNum ? <>Get a pass — {ev.price} <Arrow s={18} /></> : <>I'm in — it's free <Arrow s={18} /></>}
        </button>
      </div>
      <HomeBar />
    </>
  )
}
