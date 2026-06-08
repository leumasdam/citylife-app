import { Home, Compass, Scan, Heart, User } from '../lib/icons'

export function StatusBar({ light = false }) {
  return (
    <div className={`statusbar ${light ? 'onlight' : ''}`}>
      <span>9:41</span>
      <span className="right">
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
        {/* wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 11.5 0.5 4A10.6 10.6 0 0 1 15.5 4L8 11.5Z" opacity=".9"/></svg>
        {/* battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" opacity=".5"/><rect x="2.2" y="2.2" width="16" height="8.6" rx="2" fill="currentColor"/><rect x="24" y="4" width="1.6" height="5" rx="1" fill="currentColor"/></svg>
      </span>
    </div>
  )
}

const TABS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'explore', label: 'Explore', Icon: Compass },
  { id: 'scan', label: '', Icon: Scan, fab: true },
  { id: 'saved', label: 'Saved', Icon: Heart },
  { id: 'profile', label: 'You', Icon: User },
]

export function TabBar({ active, nav }) {
  return (
    <nav className="tabbar">
      {TABS.map(({ id, label, Icon, fab }) =>
        fab ? (
          <button key={id} className="fab" onClick={() => nav('scanner')} aria-label="Scan">
            <Icon s={26} w={2.4} />
          </button>
        ) : (
          <button key={id} className={`tab ${active === id ? 'on' : ''}`} onClick={() => nav(id)}>
            <Icon s={23} />
            <span>{label}</span>
          </button>
        )
      )}
    </nav>
  )
}

/* phone chrome wrapper used in gallery + device */
export function Phone({ children, sm = false, island = true, theme = 'light' }) {
  return (
    <div className={`phone ${sm ? 'sm' : ''}`}>
      {island ? <div className="dynisland" /> : <div className="notch" />}
      <div className={`screen ${theme === 'dark' ? 't-dark' : 't-light'}`}>{children}</div>
    </div>
  )
}

export function HomeBar({ dark = false }) {
  return <div className={`homebar ${dark ? 'dark' : ''}`} />
}
