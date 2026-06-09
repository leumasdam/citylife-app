import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from './phone/Phone'
import { Splash, Onb1, Onb2, Onb3Photo, Interests, Location, Auth } from './screens/onboarding'
import { Home, Explore, MapView, Search, Detail } from './screens/discovery'
import { Scanner, ScanResult } from './screens/scanner'
import { Saved, Tickets, TicketPass, Checkin, Notifications } from './screens/attendance'
import { Curated, Profile, Friends, Settings } from './screens/profile'
import { CreateEvent, Organizer, Messages, Chat, Wallet, Checkout, ARScan } from './screens/extra'
import { Swipe } from './screens/swipe'

/* screen registry — id → component + gallery caption */
const SCREENS = {
  splash:        { C: Splash,       t: 'Splash',           d: 'Brand load — “the city, scannable”.' },
  onb1:          { C: Onb1,         t: 'Onboarding · 01',  d: 'Discover what’s on right now.' },
  onb2:          { C: Onb2,         t: 'Onboarding · 02',  d: 'Scan any poster to unlock it.' },
  onb3:          { C: Onb3Photo,    t: 'Onboarding · 03',  d: 'From mood to action in 3 taps.' },
  interests:     { C: Interests,    t: 'Pick interests',   d: 'Tune the feed to your taste.' },
  location:      { C: Location,     t: 'Location',         d: 'Find events around you.' },
  auth:          { C: Auth,         t: 'Sign up',          d: 'Join the city, or stay a guest.' },
  home:          { C: Home,         t: 'Home feed',        d: 'Living database — tonight, near you.', tab: 'home' },
  swipe:         { C: Swipe,        t: 'Swipe deck',       d: 'Tinder-style — find tonight with your crew.' },
  explore:       { C: Explore,      t: 'Explore',          d: 'Categories & trending.', tab: 'explore' },
  map:           { C: MapView,      t: 'Map',              d: 'Events around you, on a map.', tab: 'explore' },
  search:        { C: Search,       t: 'Search & filter',  d: 'Find events, venues, artists.' },
  detail:        { C: Detail,       t: 'Event detail',     d: 'Time, place, price, lineup, map.', p: { id: 'soc-heal' } },
  scanner:       { C: Scanner,      t: 'QR scanner',       d: 'Point at a street poster.' },
  scanResult:    { C: ScanResult,   t: 'Scan → unlocked',  d: 'Poster recognised, event opens.' },
  saved:         { C: Saved,        t: 'Your list',        d: 'Interested vs going.', tab: 'saved' },
  tickets:       { C: Tickets,      t: 'My passes',        d: 'Upcoming entry passes.' },
  ticketPass:    { C: TicketPass,   t: 'Entry pass',       d: 'Scannable QR ticket for the door.', p: { id: 'soc-heal' } },
  checkin:       { C: Checkin,      t: 'Checked in',       d: 'Welcome — you’re in.' },
  notifications: { C: Notifications,t: 'Signals',          d: 'FOMO alerts, tuned to you.' },
  curated:       { C: Curated,      t: 'Editor’s collection', d: '“Society is healing” picks.' },
  checkout:      { C: Checkout,     t: 'Checkout',         d: 'Tickets, fees, pay with Apple Pay.', p: { id: 'dnb' } },
  wallet:        { C: Wallet,       t: 'Wallet',           d: 'Credits, passes, payment methods.' },
  arscan:        { C: ARScan,       t: 'AR view',          d: 'Events floating over the street.' },
  organizer:     { C: Organizer,    t: 'Organizer',        d: 'Venue / promoter profile.' },
  createEvent:   { C: CreateEvent,  t: 'Create event',     d: 'Publish + auto poster & QR.' },
  messages:      { C: Messages,     t: 'Messages',         d: 'Chats with venues & friends.' },
  chat:          { C: Chat,         t: 'Chat',             d: 'Talk to the organizer.' },
  profile:       { C: Profile,      t: 'Profile',          d: 'Stats, badges, crew.', tab: 'profile' },
  friends:       { C: Friends,      t: 'Crew',             d: 'Who’s out tonight.' },
  settings:      { C: Settings,     t: 'Settings',         d: 'Account & preferences.' },
}

const GALLERY_ORDER = [
  'splash', 'onb1', 'onb2', 'onb3', 'interests', 'location', 'auth',
  'home', 'swipe', 'explore', 'map', 'arscan', 'search', 'detail',
  'scanner', 'scanResult',
  'checkout', 'ticketPass', 'wallet', 'saved', 'tickets', 'checkin', 'notifications',
  'organizer', 'createEvent', 'messages', 'chat',
  'curated', 'profile', 'friends', 'settings',
]
const ONB_FLOW = ['splash', 'onb1', 'onb2', 'onb3', 'interests', 'location', 'auth', 'home']

function ScreenHost({ id, params, nav, ctx }) {
  const def = SCREENS[id]
  if (!def) return null
  const { C } = def
  return <C nav={nav} params={{ ...(def.p || {}), ...params }} ctx={ctx} />
}

export default function App() {
  const [mode, setMode] = useState('gallery')
  const [theme, setTheme] = useState('dark')
  return (
    <div className="stage">
      <header className="stage-head">
        <div>
          <div className="lockup">
            <img src="./brand/logo-white.png" alt="" />
            <div>
              <span className="tagpill">✦ App concept · {GALLERY_ORDER.length} screens</span>
            </div>
          </div>
          <h1 style={{ marginTop: 18 }}>CITYLIFE<br /><span style={{ color: 'var(--blue-2)' }}>the city, scannable</span></h1>
          <p className="sub">Discover, scan and attend events from the street to the dancefloor — a living database of what’s happening, unlocked by the posters you already walk past.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
          <div className="modebar">
            <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')}>☀ Light</button>
            <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')}>☾ Dark</button>
          </div>
          <div className="modebar">
            <button className={mode === 'gallery' ? 'on' : ''} onClick={() => setMode('gallery')}>All screens</button>
            <button className={mode === 'device' ? 'on' : ''} onClick={() => setMode('device')}>Try it live</button>
          </div>
        </div>
      </header>

      {mode === 'gallery' ? <GalleryMode theme={theme} /> : <DeviceMode theme={theme} />}
    </div>
  )
}

/* ---------------- gallery: every screen, static ---------------- */
function GalleryMode({ theme }) {
  const ctx = {
    saved: new Set(['fomo', 'vinyl', 'gallery']),
    going: new Set(['soc-heal', 'dnb']),
    toggle: () => {}, goTo: () => {}, goConfirm: () => {},
  }
  const noop = () => {}
  return (
    <div className="gallery">
      {GALLERY_ORDER.map((id, i) => (
        <div className="gallery-item" key={id}>
          <Phone sm theme={theme}>
            <ScreenHost id={id} params={{}} nav={noop} ctx={ctx} />
          </Phone>
          <div className="cap">
            <div className="n">{String(i + 1).padStart(2, '0')}</div>
            <div className="t">{SCREENS[id].t}</div>
            <div className="d">{SCREENS[id].d}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- device: interactive prototype ---------------- */
function DeviceMode({ theme }) {
  const [stack, setStack] = useState([{ id: 'home', params: {} }])
  const [saved, setSaved] = useState(new Set(['fomo', 'vinyl']))
  const [going, setGoing] = useState(new Set(['soc-heal']))
  const cur = stack[stack.length - 1]

  const nav = useCallback((target, params = {}) => {
    setStack((st) => {
      const here = st[st.length - 1].id
      if (target === 'back') return st.length > 1 ? st.slice(0, -1) : st
      if (target === 'next') {
        const i = ONB_FLOW.indexOf(here)
        const nx = i >= 0 && i < ONB_FLOW.length - 1 ? ONB_FLOW[i + 1] : 'home'
        return [...st, { id: nx, params: {} }]
      }
      if (target === 'done') return [{ id: 'home', params: {} }]
      if (!SCREENS[target]) return st
      return [...st, { id: target, params }]
    })
  }, [])

  const toggle = useCallback((id) => setSaved((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n }), [])
  const goTo = useCallback((id) => {
    setGoing((s) => new Set(s).add(id))
    setStack((st) => [...st, { id: 'ticketPass', params: { id } }])
  }, [])
  const goConfirm = useCallback((id) => setGoing((s) => new Set(s).add(id)), [])

  const ctx = { saved, going, toggle, goTo, goConfirm }

  return (
    <div className="device-wrap">
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn-ghost btn sm" style={{ width: 'auto' }} onClick={() => nav('back')}>← Back</button>
        <button className="btn-ghost btn sm" style={{ width: 'auto' }} onClick={() => setStack([{ id: 'splash', params: {} }])}>↺ Restart onboarding</button>
      </div>
      <Phone theme={theme}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={cur.id + JSON.stringify(cur.params)}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
          >
            <ScreenHost id={cur.id} params={cur.params} nav={nav} ctx={ctx} />
          </motion.div>
        </AnimatePresence>
      </Phone>
      <div className="device-hint">Tap around · scan a poster · grab a pass</div>
    </div>
  )
}
