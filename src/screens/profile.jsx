import { StatusBar, TabBar, HomeBar } from '../phone/Phone'
import { EVENTS, byId, img, posterImg } from '../data/events'
import { EventRow, SecHead, BackHeader, CatTag, PosterMini, CountUp } from '../ui'
import { Cog, Users, Star, Ticket, Heart, Arrow, Chevron, Bell, Pin, Check, Flash, Wallet, Message, Plus } from '../lib/icons'

export function Curated({ nav }) {
  const list = EVENTS.filter((e) => ['techno', 'party', 'live'].includes(e.cat)).slice(0, 5)
  return (
    <>
      <div className="body" style={{ position: 'relative' }}>
        <div style={{ position: 'relative', height: 320, background: '#0d359b', overflow: 'hidden', color: '#fff' }}>
          <img src={posterImg('society')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'blur(1px)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,53,155,.5), rgba(13,53,155,.4) 50%, var(--ink))' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}><StatusBar /></div>
          <div style={{ position: 'absolute', top: 44, left: 0, right: 0 }}><BackHeader nav={nav} action={<span style={{ width: 40 }} />} /></div>
          <div className="center" style={{ position: 'absolute', inset: 0, flexDirection: 'column', textAlign: 'center', padding: 20 }}>
            <div className="mono upper" style={{ fontSize: 11, marginBottom: 12, color: 'var(--yellow)' }}>Editor’s collection</div>
            <h1 className="display" style={{ fontSize: 50 }}>Society<br />Is Healing</h1>
            <p style={{ fontSize: 13.5, marginTop: 14, maxWidth: 280, color: 'rgba(255,255,255,.85)' }}>The nights putting the city back together. <i style={{ color: 'var(--yellow)' }}>We know where.</i></p>
          </div>
        </div>
        <div className="pad" style={{ marginTop: 18, paddingBottom: 100 }}>
          <div className="row-between" style={{ marginBottom: 16 }}>
            <div className="eyebrow blue">{list.length} hand-picked</div>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Updated weekly</span>
          </div>
          <div className="stack" style={{ gap: 2 }}>
            {list.map((e) => <EventRow key={e.id} ev={e} nav={nav} />)}
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

export function Profile({ nav, ctx }) {
  const going = EVENTS.filter((e) => ctx.going.has(e.id))
  const up = going.length ? going : EVENTS.slice(0, 2)
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="app-h"><div className="title" style={{ fontSize: 30 }}>You</div>
          <button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)' }} onClick={() => nav('settings')}><Cog s={20} /></button>
        </div>
        <div className="pad">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--pink), var(--blue))', display: 'grid', placeItems: 'center', fontFamily: 'var(--display)', fontSize: 30, border: '2px solid var(--line)' }}>S</div>
            <div>
              <h2 className="heavy" style={{ fontSize: 22, textTransform: 'uppercase' }}>Samuel Z.</h2>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>@zen · Bratislava</div>
              <div style={{ display: 'inline-flex', gap: 6, marginTop: 8, alignItems: 'center', background: 'rgba(243,255,54,.12)', color: 'var(--yellow)', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}><Flash s={12} /> Night owl · Lvl 4</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 14 }}>
            {[[24, 'Been', 'var(--blue-2)'], [6, 'Upcoming', 'var(--yellow)'], [38, 'Saved', 'var(--pink)']].map(([n, l, c]) => (
              <div key={l} className="pill center" style={{ flexDirection: 'column', gap: 2 }}>
                <div className="display" style={{ fontSize: 30, color: c }}><CountUp to={n} /></div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 22 }}>
            {[['Wallet', <Wallet s={20} />, 'wallet'], ['Messages', <Message s={20} />, 'messages'], ['Host event', <Plus s={20} />, 'createEvent']].map(([l, ic, to]) => (
              <button key={l} onClick={() => nav(to)} className="center" style={{ flexDirection: 'column', gap: 7, padding: '14px 6px', borderRadius: 14, background: 'var(--card)', border: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--blue-2)' }}>{ic}</span><span style={{ fontSize: 12, fontWeight: 600 }}>{l}</span>
              </button>
            ))}
          </div>

          <SecHead eyebrow="Don’t be late" title="Your next" more="Passes" onMore={() => nav('tickets')} />
          <div className="stack" style={{ gap: 2, marginBottom: 22 }}>
            {up.slice(0, 2).map((e) => <EventRow key={e.id} ev={e} nav={nav} />)}
          </div>

          <SecHead title="Crew" more="All" onMore={() => nav('friends')} />
          <div style={{ display: 'flex', gap: 10, marginBottom: 8 }} onClick={() => nav('friends')}>
            {['M', 'J', 'K', 'L', 'A'].map((x, i) => <div key={i} style={{ width: 46, height: 46, borderRadius: '50%', background: ['var(--blue)', 'var(--pink)', 'var(--yellow)', 'var(--green)', 'var(--elev)'][i], color: i === 2 ? '#0b0b0d' : '#fff', display: 'grid', placeItems: 'center', fontWeight: 800 }}>{x}</div>)}
            <div className="center" style={{ width: 46, height: 46, borderRadius: '50%', border: '1px solid var(--line)', color: 'var(--muted)', fontSize: 12 }}>+12</div>
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
      <TabBar active="profile" nav={nav} />
      <HomeBar />
    </>
  )
}

const FRIENDS = [
  ['Mia', 'going to Warehouse: Liquid', 'M', 'var(--blue)'],
  ['Jakub', 'interested in Riverside Festival', 'J', 'var(--pink)'],
  ['Klára', 'going to Society Is Healing', 'K', 'var(--yellow)'],
  ['Leo', 'checked in at Cellar Jazz', 'L', 'var(--green)'],
  ['Aďa', 'saved Night Food Market', 'A', 'var(--elev)'],
  ['Tomáš', 'going to Vinyl Flea', 'T', 'var(--blue)'],
]
export function Friends({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <BackHeader nav={nav} title="Crew" action={<button className="center" style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)' }}><Users s={18} /></button>} />
        <div className="pad">
          <div className="eyebrow blue" style={{ marginBottom: 14 }}>17 friends · 9 out tonight</div>
          <div className="stack" style={{ gap: 4 }}>
            {FRIENDS.map(([name, act, ltr, c], i) => (
              <div key={i} className="erow" onClick={() => nav('detail', { id: EVENTS[i % EVENTS.length].id })}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: c, color: c === 'var(--yellow)' ? '#0b0b0d' : '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, flex: '0 0 auto' }}>{ltr}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4>{name}</h4>
                  <div className="sub" style={{ color: 'var(--blue-2)' }}>{act}</div>
                </div>
                <Chevron s={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

const SETTINGS = [
  ['Account', [['Edit profile', <Users s={18} />], ['Notifications', <Bell s={18} />], ['Privacy & location', <Pin s={18} />]]],
  ['Preferences', [['Interests', <Star s={18} />], ['Saved & passes', <Ticket s={18} />], ['Connected friends', <Users s={18} />]]],
]
export function Settings({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <BackHeader nav={nav} title="Settings" action={<span style={{ width: 40 }} />} />
        <div className="pad">
          {SETTINGS.map(([group, rows]) => (
            <div key={group} style={{ marginBottom: 22 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>{group}</div>
              <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)', overflow: 'hidden' }}>
                {rows.map(([label, icon], i) => (
                  <div key={label} className="row-between" style={{ padding: '15px 16px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                    <span style={{ display: 'flex', gap: 12, alignItems: 'center', fontWeight: 600, fontSize: 15 }}><span style={{ color: 'var(--blue-2)' }}>{icon}</span>{label}</span>
                    <Chevron s={18} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: 'var(--card)', borderRadius: 16, border: '1px solid var(--line)' }}>
            <img src="./brand/logo-white.png" style={{ width: 70 }} alt="" />
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>CITYLIFE v1.0 · concept<br />the city, scannable.</div>
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
      <HomeBar />
    </>
  )
}
