import { StatusBar, HomeBar } from '../../phone/Phone'
import { EVENTS, posterImg } from '../../data/events'
import { CountUp } from '../../ui'
import { TabBar2 } from '../chrome2'
import { EventRow2, ArtTile, ArrowBtn } from '../ui2'
import { cover } from '../../data/events'
import { Cog, Users, Star, Ticket, Arrow, Chevron, Bell, Pin, Wallet, Message, Plus, Flash } from '../icons2'

export function Curated({ nav }) {
  const list = EVENTS.filter((e) => ['techno', 'party', 'live'].includes(e.cat)).slice(0, 5)
  const fan = list.slice(0, 3)
  return (
    <>
      <StatusBar light />
      <div className="body screen-indigo" style={{ color: '#fff' }}>
        <div className="row-between" style={{ padding: '4px 18px 4px' }}>
          <button className="iconbtn ghost" onClick={() => nav('back')}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
          <div className="vbadge acid">EDITOR'S COLLECTION</div>
          <span style={{ width: 38 }} />
        </div>

        {/* editorial hero — clean type, the posters fan below (no text-on-poster clash) */}
        <div className="pad" style={{ paddingTop: 20, textAlign: 'center' }}>
          <h1 className="h-mega" style={{ fontSize: 50 }}>Society<br />Is Healing</h1>
          <p style={{ fontSize: 14, marginTop: 14, color: 'rgba(255,255,255,.82)', maxWidth: 290, margin: '14px auto 0' }}>The nights putting the city back together.</p>
          <p className="hand" style={{ fontSize: 26, color: 'var(--acid)', marginTop: 6, transform: 'rotate(-2deg)' }}>we know where ✦</p>

          {/* fanned poster stickers — the actual picks */}
          <div className="center" style={{ height: 188, marginTop: 24, position: 'relative' }}>
            {fan.map((e, i) => {
              const rot = [-11, 0, 11][i]
              const x = [-92, 0, 92][i]
              return (
                <button key={e.id} onClick={() => nav('detail', { id: e.id })}
                  style={{ position: 'absolute', width: 124, aspectRatio: '4/5', borderRadius: 12, overflow: 'hidden', background: cover(e).bg, transform: `translateX(${x}px) rotate(${rot}deg)`, zIndex: i === 1 ? 3 : 2, boxShadow: '0 18px 40px -16px rgba(0,0,0,.7)', border: '3px solid #fff' }}>
                  <img src={cover(e).src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              )
            })}
          </div>
        </div>

        {/* list sits on the ink sheet */}
        <div style={{ background: 'var(--ink)', color: 'var(--white)', borderRadius: '26px 26px 0 0', marginTop: 26, paddingTop: 22, minHeight: 240 }}>
          <div className="pad" style={{ paddingBottom: 40 }}>
            <div className="row-between" style={{ marginBottom: 14 }}>
              <div className="lab" style={{ color: 'var(--ind-2)' }}>{list.length} HAND-PICKED</div>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Updated weekly</span>
            </div>
            <div className="stack" style={{ gap: 2 }}>{list.map((e) => <EventRow2 key={e.id} ev={e} nav={nav} />)}</div>
          </div>
        </div>
      </div>
      <HomeBar dark />
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
        <div className="app-h"><div className="h-mega ovp2" style={{ fontSize: 34 }}>You</div>
          <button className="iconbtn ghost" onClick={() => nav('settings')}><Cog s={18} /></button>
        </div>
        <div className="pad" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--coral), var(--ind))', display: 'grid', placeItems: 'center', fontFamily: 'var(--heavy)', fontWeight: 900, fontSize: 28, border: '2px solid var(--line)' }}>S</div>
            <div>
              <h2 className="h-card" style={{ fontSize: 22 }}>Samuel Z.</h2>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>@zen · Bratislava</div>
              <div className="vbadge" style={{ background: 'rgba(244,212,78,.16)', color: 'var(--acid)', marginTop: 8 }}><Flash s={11} /> Night owl · Lvl 4</div>
            </div>
          </div>

          {/* stat number cards (revenue-style) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {[[24, 'Been', 'var(--ind-2)'], [6, 'Upcoming', 'var(--acid)'], [38, 'Saved', 'var(--coral)']].map(([n, l, c]) => (
              <div key={l} className="vcard" style={{ padding: 14, textAlign: 'center' }}>
                <div className="h-mega" style={{ fontSize: 30, color: c }}><CountUp to={n} /></div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* AI entry */}
          <button className="block ind" onClick={() => nav('aiplanner')} style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 13, width: '100%' }}>
            <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.18)', display: 'grid', placeItems: 'center', fontSize: 20, flex: '0 0 auto' }}><span className="spin-slow">✦</span></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--heavy)', fontWeight: 900, textTransform: 'uppercase', fontSize: 16 }}>AI Night Lead</div>
              <div style={{ fontSize: 12.5, opacity: .85 }}>Plan tonight in one tap</div>
            </div>
            <ArrowBtn tone="light" />
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {[['Wallet', <Wallet s={20} />, 'wallet'], ['Messages', <Message s={20} />, 'messages'], ['Host', <Plus s={20} />, 'createEvent']].map(([l, ic, to]) => (
              <button key={l} onClick={() => nav(to)} className="vcard center" style={{ flexDirection: 'column', gap: 7, padding: '15px 6px' }}>
                <span style={{ color: 'var(--ind-2)' }}>{ic}</span><span style={{ fontSize: 12, fontWeight: 600 }}>{l}</span>
              </button>
            ))}
          </div>

          <div>
            <div className="sec2"><span className="t">Your next</span><button className="lab" onClick={() => nav('tickets')} style={{ color: 'var(--ind-2)' }}>PASSES</button></div>
            <div className="stack" style={{ gap: 2 }}>{up.slice(0, 2).map((e) => <EventRow2 key={e.id} ev={e} nav={nav} />)}</div>
          </div>

          <div>
            <div className="sec2"><span className="t">Crew</span><button className="lab" onClick={() => nav('friends')} style={{ color: 'var(--ind-2)' }}>ALL</button></div>
            <div style={{ display: 'flex', gap: 10 }} onClick={() => nav('friends')}>
              {['M', 'J', 'K', 'L', 'A'].map((x, i) => <div key={i} style={{ width: 46, height: 46, borderRadius: '50%', background: ['var(--ind)', 'var(--coral)', 'var(--acid)', 'var(--sky)', 'var(--elev)'][i], color: i === 2 || i === 3 ? '#14140f' : '#fff', display: 'grid', placeItems: 'center', fontWeight: 800 }}>{x}</div>)}
              <div className="center" style={{ width: 46, height: 46, borderRadius: '50%', border: '1px solid var(--line)', color: 'var(--muted)', fontSize: 12 }}>+12</div>
            </div>
          </div>
          <div style={{ height: 8 }} />
        </div>
      </div>
      <TabBar2 active="profile" nav={nav} />
      <HomeBar />
    </>
  )
}

const FRIENDS = [
  ['Mia', 'going to After Dark', 'M', 'var(--ind)'],
  ['Jakub', 'interested in Gonzi Open Air', 'J', 'var(--coral)'],
  ['Klára', 'going to Distorted', 'K', 'var(--acid)'],
  ['Leo', 'checked in at Blue Hour', 'L', 'var(--sky)'],
  ['Aďa', 'saved Smoke & Wine', 'A', 'var(--elev)'],
  ['Tomáš', 'going to Crate Diggers', 'T', 'var(--ind-2)'],
]
export function Friends({ nav }) {
  return (
    <>
      <StatusBar />
      <div className="body">
        <div className="row-between" style={{ padding: '4px 18px 12px' }}>
          <button className="iconbtn ghost" onClick={() => nav('back')}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
          <div className="h-mega" style={{ fontSize: 18 }}>Crew</div>
          <button className="iconbtn ghost"><Users s={17} /></button>
        </div>
        <div className="pad">
          <div className="lab" style={{ marginBottom: 14, color: 'var(--ind-2)' }}>17 FRIENDS · 9 OUT TONIGHT</div>
          <div className="stack" style={{ gap: 4 }}>
            {FRIENDS.map(([name, act, ltr, c], i) => (
              <button key={i} className="erow" onClick={() => nav('detail', { id: EVENTS[i % EVENTS.length].id })} style={{ width: '100%', textAlign: 'left' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: c, color: c === 'var(--acid)' || c === 'var(--sky)' ? '#14140f' : '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, flex: '0 0 auto' }}>{ltr}</div>
                <div style={{ flex: 1, minWidth: 0 }}><h4>{name}</h4><div className="sub" style={{ color: 'var(--ind-2)' }}>{act}</div></div>
                <Chevron s={18} />
              </button>
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
        <div className="row-between" style={{ padding: '4px 18px 12px' }}>
          <button className="iconbtn ghost" onClick={() => nav('back')}><Arrow s={18} style={{ transform: 'rotate(180deg)' }} /></button>
          <div className="h-mega" style={{ fontSize: 18 }}>Settings</div>
          <span style={{ width: 38 }} />
        </div>
        <div className="pad">
          {SETTINGS.map(([group, rows]) => (
            <div key={group} style={{ marginBottom: 20 }}>
              <div className="lab" style={{ marginBottom: 12 }}>{group}</div>
              <div className="vcard" style={{ padding: 0, overflow: 'hidden' }}>
                {rows.map(([label, icon], i) => (
                  <div key={label} className="row-between" style={{ padding: '15px 16px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                    <span style={{ display: 'flex', gap: 12, alignItems: 'center', fontWeight: 600, fontSize: 15 }}><span style={{ color: 'var(--ind-2)' }}>{icon}</span>{label}</span>
                    <Chevron s={18} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* quirky About / Help art cards — the reference's signature */}
          <div className="lab" style={{ marginBottom: 12 }}>About CITYLIFE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
            <ArtTile src={posterImg('crisist')} bg="#44321a" label="Our story" tag="Since 2024" />
            <ArtTile src={posterImg('whatislife')} bg="#ece9df" label="Help" tag="Got questions?" />
          </div>

          <div className="vcard" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="./brand/logo-white.png" style={{ width: 70 }} alt="" />
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>CITYLIFE v2.0 · concept<br />the city, scannable.</div>
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
      <HomeBar />
    </>
  )
}
