import { Home, Compass, Scan, Heart, User } from './icons2'

/* v2 bottom nav — a dark floating pill, active tab filled indigo, scan = coral */
const TABS = [
  { id: 'home', Icon: Home },
  { id: 'explore', Icon: Compass },
  { id: 'scan', Icon: Scan, scan: true },
  { id: 'saved', Icon: Heart },
  { id: 'profile', Icon: User },
]

export function TabBar2({ active, nav }) {
  return (
    <nav className="vtabbar">
      <div className="pillnav">
        {TABS.map(({ id, Icon, scan }) =>
          scan ? (
            <button key={id} className="vtab scan" onClick={() => nav('scanner')} aria-label="Scan">
              <Icon s={22} w={2.4} />
            </button>
          ) : (
            <button key={id} className={`vtab ${active === id ? 'on' : ''}`} onClick={() => nav(id)} aria-label={id}>
              <Icon s={21} />
            </button>
          )
        )}
      </div>
    </nav>
  )
}
