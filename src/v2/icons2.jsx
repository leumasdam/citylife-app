/* CITYLIFE v2 — antidesign icon set.
   Quirky but consistent: one stroke weight, one rounded tone across the whole
   set. Characterful shapes (panelák=home, eye=explore, smiley=profile,
   ✦ sparkle=brand glyph) — no stray thin accents that break the rhythm.
   Same names as lib/icons so screens swap imports 1:1. */

const I = (p) => ({ width: p.s || 22, height: p.s || 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: p.w || 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', style: p.style, className: p.className })

/* ✦ four-point sparkle — the brand glyph (filled) */
const sparklePath = (cx, cy, r) => `M${cx} ${cy - r} L${cx + r * 0.28} ${cy - r * 0.28} L${cx + r} ${cy} L${cx + r * 0.28} ${cy + r * 0.28} L${cx} ${cy + r} L${cx - r * 0.28} ${cy + r * 0.28} L${cx - r} ${cy} L${cx - r * 0.28} ${cy - r * 0.28} Z`

export const Star = (p) => <svg {...I(p)}><path d={sparklePath(12, 12, 9)} fill={p.fill || 'currentColor'} stroke="none" /></svg>

/* home = panelák (block of flats with lit windows) */
export const Home = (p) => (
  <svg {...I(p)}>
    <rect x="5" y="3.8" width="14" height="16.4" rx="1.4" />
    <path d="M9.7 20.2v-3h4.6v3" />
    {[7.3, 11.1].map((y) => [8.5, 13] .map((x) => <rect key={x + '-' + y} x={x} y={y} width="2.5" height="2.5" rx="0.5" fill="currentColor" stroke="none" />))}
  </svg>
)

/* explore = the city watches back (eye) */
export const Compass = (p) => (
  <svg {...I(p)}>
    <path d="M2.8 12C5.4 7.8 8.5 5.7 12 5.7s6.6 2.1 9.2 6.3c-2.6 4.2-5.7 6.3-9.2 6.3S5.4 16.2 2.8 12Z" />
    <circle cx="12" cy="12" r="3.1" />
    <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
  </svg>
)

/* scan = corners + sparkle */
export const Scan = (p) => (
  <svg {...I(p)}>
    <path d="M4 8V5.2A1.2 1.2 0 0 1 5.2 4H8M16 4h2.8A1.2 1.2 0 0 1 20 5.2V8M20 16v2.8a1.2 1.2 0 0 1-1.2 1.2H16M8 20H5.2A1.2 1.2 0 0 1 4 18.8V16" />
    <path d={sparklePath(12, 12, 4.4)} fill="currentColor" stroke="none" />
  </svg>
)

/* heart — clean, symmetric (no shine accents) */
export const Heart = (p) => (
  <svg {...I(p)} fill={p.fill || 'none'}>
    <path d="M12 20.3c-.4 0-.8-.15-1.1-.42C6.3 15.9 3 12.9 3 9.2 3 6.9 4.8 5.1 7 5.1c1.4 0 2.7.66 3.5 1.7l1.5 1.9 1.5-1.9c.8-1.04 2.1-1.7 3.5-1.7 2.2 0 4 1.8 4 4.1 0 3.7-3.3 6.7-7.9 10.68-.3.27-.7.42-1.1.42Z" />
  </svg>
)

/* profile = smiley */
export const User = (p) => (
  <svg {...I(p)}>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="9.1" cy="10.3" r="1.15" fill="currentColor" stroke="none" />
    <circle cx="14.9" cy="10.3" r="1.15" fill="currentColor" stroke="none" />
    <path d="M8.6 14.2c.95 1.5 2.1 2.25 3.4 2.25s2.45-.75 3.4-2.25" />
  </svg>
)

/* pin with a sparkle */
export const Pin = (p) => (
  <svg {...I(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <path d={sparklePath(12, 10, 3)} fill="currentColor" stroke="none" />
  </svg>
)

export const Search = (p) => <svg {...I(p)}><circle cx="11" cy="11" r="6.6" /><path d="m20.5 20.5-3.7-3.7" /></svg>
export const Bell = (p) => <svg {...I(p)}><path d="M6.4 9.4a5.6 5.6 0 0 1 11.2 0c0 5 1.8 6 1.8 6H4.6s1.8-1 1.8-6Z" /><path d="M10 19.4a2 2 0 0 0 4 0" /></svg>
export const Flash = (p) => <svg {...I(p)}><path d="M13.2 2.4 4.5 13.6h6.1l-1.1 8 8.8-11.6h-6.2z" fill={p.fill ?? 'none'} /></svg>
export const Clock = (p) => <svg {...I(p)}><circle cx="12" cy="12" r="8.6" /><path d="M12 7.4v4.8l3.1 1.9" /></svg>

export const Arrow = (p) => <svg {...I(p)}><path d="M4.5 12h15M13.5 5.8l6 6.2-6 6.2" /></svg>
export const ArrowL = (p) => <svg {...I(p)}><path d="M19.5 12h-15M10.5 5.8l-6 6.2 6 6.2" /></svg>
export const X = (p) => <svg {...I(p)}><path d="M5.6 5.6 18.4 18.4M18.4 5.6 5.6 18.4" /></svg>
export const Check = (p) => <svg {...I(p)}><path d="M4.8 12.6 9.8 17.6 19.2 6.6" /></svg>
export const Plus = (p) => <svg {...I(p)}><path d="M12 4.8v14.4M4.8 12h14.4" /></svg>

/* the rest stays from the base set (already consistent stroke icons) */
export {
  Ticket, Share, Users, Filter, Cog, Chevron, Wallet, Cal, Globe, Camera,
  Image, Send, Card, Verified, Message, Mic, Apple,
} from '../lib/icons'
