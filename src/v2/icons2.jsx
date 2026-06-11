/* CITYLIFE v2 — antidesign icon set.
   Quirky, chunky, street: panelák instead of a house, an eye instead of a
   compass, a smiley instead of a silhouette, ✦ sparkles as the brand motif.
   Same names as lib/icons so screens can swap imports 1:1. */

const I = (p) => ({ width: p.s || 22, height: p.s || 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: p.w || 2.3, strokeLinecap: 'round', strokeLinejoin: 'round', style: p.style, className: p.className })

/* ✦ four-point sparkle — the brand glyph (filled) */
const sparklePath = (cx, cy, r) => `M${cx} ${cy - r} L${cx + r * 0.28} ${cy - r * 0.28} L${cx + r} ${cy} L${cx + r * 0.28} ${cy + r * 0.28} L${cx} ${cy + r} L${cx - r * 0.28} ${cy + r * 0.28} L${cx - r} ${cy} L${cx - r * 0.28} ${cy - r * 0.28} Z`

export const Star = (p) => <svg {...I(p)}><path d={sparklePath(12, 12, 9)} fill={p.fill || 'currentColor'} stroke="none" /></svg>

/* home = panelák (block of flats with lit windows) */
export const Home = (p) => (
  <svg {...I(p)}>
    <rect x="5" y="3.6" width="14" height="17" rx="1.2" />
    <path d="M9.6 20.6v-3.2h4.8v3.2" />
    {[7.2, 11.2].map((y) => [8.4, 13.2].map((x) => <rect key={x + '-' + y} x={x} y={y} width="2.4" height="2.4" rx="0.4" fill="currentColor" stroke="none" />))}
  </svg>
)

/* explore = the city watches back */
export const Compass = (p) => (
  <svg {...I(p)}>
    <path d="M2.6 12C5.3 7.5 8.5 5.3 12 5.3s6.7 2.2 9.4 6.7c-2.7 4.5-5.9 6.7-9.4 6.7S5.3 16.5 2.6 12Z" />
    <circle cx="12" cy="12" r="3.1" />
    <circle cx="13.1" cy="10.9" r="1.05" fill="currentColor" stroke="none" />
  </svg>
)

/* scan = corners + sparkle */
export const Scan = (p) => (
  <svg {...I(p)}>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
    <path d={sparklePath(12, 12, 4.6)} fill="currentColor" stroke="none" />
  </svg>
)

/* heart with a shine */
export const Heart = (p) => (
  <svg {...I(p)} fill={p.fill || 'none'}>
    <path d="M12 20s-7-4.3-9.3-8.3C1 8.5 2.6 5.5 5.7 5.5c2 0 3.2 1.3 3.8 2.3.6-1 1.8-2.3 3.8-2.3 3.1 0 4.7 3 3 6.2C19 15.7 12 20 12 20Z" />
    <path d="M20.4 4.6l1.3-1.3M21.6 7.4l1.6-.3" strokeWidth={(p.w || 2.3) * 0.8} />
  </svg>
)

/* profile = smiley */
export const User = (p) => (
  <svg {...I(p)}>
    <circle cx="12" cy="12" r="8.6" />
    <circle cx="9" cy="10.2" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10.2" r="1.2" fill="currentColor" stroke="none" />
    <path d="M8.4 14.2c1 1.6 2.2 2.4 3.6 2.4s2.6-.8 3.6-2.4" />
  </svg>
)

/* pin with a sparkle heart */
export const Pin = (p) => (
  <svg {...I(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <path d={sparklePath(12, 10, 3.2)} fill="currentColor" stroke="none" />
  </svg>
)

/* search with a glint */
export const Search = (p) => (
  <svg {...I(p)}>
    <circle cx="11" cy="11" r="6.8" />
    <path d="m20.6 20.6-3.8-3.8" />
    <path d="M8.2 8.9a3.4 3.4 0 0 1 2.4-1.6" strokeWidth={(p.w || 2.3) * 0.75} />
  </svg>
)

/* bell, ringing */
export const Bell = (p) => (
  <svg {...I(p)}>
    <path d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 5 1.8 6 1.8 6H4.7s1.8-1 1.8-6Z" />
    <path d="M10 19.5a2 2 0 0 0 4 0" />
    <path d="M2.5 7.5c.3-1.6 1-2.8 2.1-3.8M21.5 7.5c-.3-1.6-1-2.8-2.1-3.8" strokeWidth={(p.w || 2.3) * 0.75} />
  </svg>
)

/* bolt — filled, chunky */
export const Flash = (p) => (
  <svg {...I(p)}>
    <path d="M13.2 2.2 4.4 13.6h6.2l-1.1 8.2 8.9-11.7h-6.3z" fill={p.fill ?? 'none'} />
  </svg>
)

export const Clock = (p) => (
  <svg {...I(p)}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 7.4v4.8l3.2 2" />
    <path d="M12 3.2v1M12 19.8v1M3.2 12h1M19.8 12h1" strokeWidth={(p.w || 2.3) * 0.7} />
  </svg>
)

export const Arrow = (p) => <svg {...I(p)}><path d="M4.5 12h15M13.5 5.8l6 6.2-6 6.2" /></svg>
export const ArrowL = (p) => <svg {...I(p)}><path d="M19.5 12h-15M10.5 5.8l-6 6.2 6 6.2" /></svg>
export const X = (p) => <svg {...I(p)}><path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" /></svg>
export const Check = (p) => <svg {...I(p)}><path d="M4.5 12.8 9.8 18 19.5 6.5" /></svg>
export const Plus = (p) => <svg {...I(p)}><path d="M12 4.5v15M4.5 12h15" /></svg>

/* the rest stays from the base set */
export {
  Ticket, Share, Users, Filter, Cog, Chevron, Wallet, Cal, Globe, Camera,
  Image, Send, Card, Verified, Message, Mic, Apple,
} from '../lib/icons'
