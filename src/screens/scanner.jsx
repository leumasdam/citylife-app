import { StatusBar, HomeBar } from '../phone/Phone'
import { byId, img, posterImg } from '../data/events'
import { CatTag, EventBar } from '../ui'
import { X, Flash, Image as ImageIc, Pin, Clock, Arrow, Check } from '../lib/icons'

function ScannerChrome({ nav, scanning = true }) {
  return (
    <>
      {/* camera feed: the real CITYLIFE poster wall on the street */}
      <img className="feed" src={posterImg('wall')} alt="" style={{ objectPosition: '35% center' }} />
      <div className="scan-mask" />
      <div className="scan-window">
        <div className="scan-corners"><span /><span /><span /><span /></div>
        {scanning && <div className="scanline" style={{ top: '50%' }} />}
        {/* the real Society Is Healing poster (with its own QR) framed inside the reticle */}
        <div className="center" style={{ position: 'absolute', inset: '12%' }}>
          <img src={posterImg('society')} alt="" style={{ width: '78%', borderRadius: 6, transform: 'rotate(-3deg)', boxShadow: '0 12px 34px rgba(0,0,0,.55)' }} />
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
        <ScannerChrome nav={nav} />
        {/* top controls */}
        <div className="row-between" style={{ position: 'absolute', top: 8, left: 20, right: 20, zIndex: 10 }}>
          <button className="center" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,.5)', border: '1px solid var(--line)' }} onClick={() => nav('home')}><X s={20} /></button>
          <div className="mono upper" style={{ fontSize: 12 }}>Scan poster</div>
          <button className="center" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,.5)', border: '1px solid var(--line)' }}><Flash s={20} /></button>
        </div>
        {/* hint + actions */}
        <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, zIndex: 10, display: 'grid', placeItems: 'center', gap: 18 }}>
          <div className="center" style={{ gap: 8, flexDirection: 'column' }}>
            <div style={{ background: 'rgba(243,255,54,.16)', border: '1px solid var(--yellow)', color: 'var(--yellow)', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 13 }}>Looking for a CITYLIFE code…</div>
            <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13 }}>Point at any poster on the street</div>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <button className="center" onClick={() => nav('arscan')} style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.2)', flexDirection: 'column', gap: 2, color: '#fff' }}><span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 11 }}>AR</span></button>
            <button onClick={() => nav('scanResult')} style={{ width: 76, height: 76, borderRadius: '50%', border: '4px solid #fff', background: 'rgba(255,255,255,.2)' }} />
            <button className="center" onClick={() => nav('scanResult')} style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--blue)', color: '#fff' }}><Arrow s={22} /></button>
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}

export function ScanResult({ nav, ctx }) {
  const ev = byId('soc-heal')
  return (
    <>
      <StatusBar />
      <div className="body scanview">
        <ScannerChrome nav={nav} scanning={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,6,9,.5)' }} />
        {/* success sheet */}
        <div className="sheet" style={{ paddingBottom: 22 }}>
          <div className="grab" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div className="center" style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--green)' }}><Check s={18} w={3} /></div>
            <div className="eyebrow" style={{ color: 'var(--green)' }}>Poster recognised · event unlocked</div>
          </div>
          <div style={{ marginBottom: 16 }}><EventBar ev={ev} nav={nav} /></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-dark" style={{ flex: '0 0 56px', padding: 0, height: 54 }} onClick={() => ctx.toggle(ev.id)}>♡</button>
            <button className="btn btn-blue" onClick={() => nav('detail', { id: ev.id })}>Open event <Arrow s={18} /></button>
          </div>
        </div>
      </div>
      <HomeBar />
    </>
  )
}
