/* Minimal stroke icon set. size via props, currentColor. */
const I = (p) => ({ width: p.s || 22, height: p.s || 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: p.w || 2, strokeLinecap: 'round', strokeLinejoin: 'round', style: p.style, className: p.className })

export const Home = (p) => <svg {...I(p)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
export const Compass = (p) => <svg {...I(p)}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>
export const Scan = (p) => <svg {...I(p)}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><path d="M4 12h16" /></svg>
export const Heart = (p) => <svg {...I(p)} fill={p.fill || 'none'}><path d="M12 20s-7-4.3-9.3-8.3C1 8.5 2.6 5.5 5.7 5.5c2 0 3.2 1.3 3.8 2.3.6-1 1.8-2.3 3.8-2.3 3.1 0 4.7 3 3 6.2C19 15.7 12 20 12 20Z" /></svg>
export const User = (p) => <svg {...I(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></svg>
export const Pin = (p) => <svg {...I(p)}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
export const Clock = (p) => <svg {...I(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
export const Ticket = (p) => <svg {...I(p)}><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 6 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-6Z" /><path d="M14 7v10" strokeDasharray="2 2" /></svg>
export const Search = (p) => <svg {...I(p)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></svg>
export const Bell = (p) => <svg {...I(p)}><path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
export const Arrow = (p) => <svg {...I(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
export const ArrowL = (p) => <svg {...I(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
export const Plus = (p) => <svg {...I(p)}><path d="M12 5v14M5 12h14" /></svg>
export const Check = (p) => <svg {...I(p)}><path d="M5 12.5 10 17l9-10" /></svg>
export const Share = (p) => <svg {...I(p)}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>
export const Star = (p) => <svg {...I(p)} fill={p.fill||'none'}><path d="m12 3 2.6 5.6L20 9.4l-4 4 1 6-5-2.9L7 19.4l1-6-4-4 5.4-.8Z"/></svg>
export const Users = (p) => <svg {...I(p)}><circle cx="9" cy="8" r="3.4"/><path d="M3 20c0-3 2.7-4.6 6-4.6S15 17 15 20"/><path d="M16 5.2A3.4 3.4 0 0 1 16 12M21 20c0-2.4-1.5-3.9-3.8-4.4"/></svg>
export const Flash = (p) => <svg {...I(p)}><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>
export const Filter = (p) => <svg {...I(p)}><path d="M3 5h18M6 12h12M10 19h4"/></svg>
export const Cog = (p) => <svg {...I(p)}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>
export const Chevron = (p) => <svg {...I(p)}><path d="m9 6 6 6-6 6"/></svg>
export const Wallet = (p) => <svg {...I(p)}><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 12h2"/><path d="M3 9h18"/></svg>
export const Cal = (p) => <svg {...I(p)}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
export const Globe = (p) => <svg {...I(p)}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>
export const Camera = (p) => <svg {...I(p)}><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/></svg>
export const Image = (p) => <svg {...I(p)}><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m4 19 5-5 4 3 3-3 4 4"/></svg>
export const X = (p) => <svg {...I(p)}><path d="M6 6l12 12M18 6 6 18"/></svg>
export const Send = (p) => <svg {...I(p)}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>
export const Card = (p) => <svg {...I(p)}><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>
export const Verified = (p) => <svg {...I(p)} fill={p.fill||'none'}><path d="m9 12 2 2 4-4"/><path d="M12 3l2.3 1.7 2.8-.3 1.2 2.6 2.5 1.3-.6 2.8.6 2.8-2.5 1.3-1.2 2.6-2.8-.3L12 21l-2.3-1.7-2.8.3-1.2-2.6L3.2 15.7l.6-2.8-.6-2.8 2.5-1.3 1.2-2.6 2.8.3z" stroke="currentColor"/></svg>
export const Message = (p) => <svg {...I(p)}><path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z"/></svg>
export const Mic = (p) => <svg {...I(p)}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
export const Apple = (p) => <svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="currentColor"><path d="M16 2c0 1.4-.5 2.6-1.4 3.5-1 1-2.2 1.6-3.3 1.5-.1-1.3.5-2.6 1.3-3.4C13.5 2.6 14.9 2 16 2Zm3.5 16.4c-.6 1.4-.9 2-1.7 3.2-1.1 1.7-2.6 3.7-4.5 3.7-1.7 0-2.1-1.1-4.4-1.1-2.2 0-2.7 1.1-4.4 1.1-1.9 0-3.3-1.8-4.4-3.4C-.6 18 .5 12 3.9 10.5c1.3-.6 2.5-.4 3.7-.4 1.3 0 2 .6 3.4.6 1.3 0 2-.6 3.4-.6 1.1 0 2.3.1 3.4.9-3 1.6-2.5 5.9.7 7.4Z"/></svg>
