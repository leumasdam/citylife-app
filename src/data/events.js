// CITYLIFE — living event database (concept data)
export const CATS = {
  techno:  { label: 'Techno',     color: 'blue' },
  live:    { label: 'Live',       color: 'pink' },
  art:     { label: 'Art',        color: 'yellow' },
  market:  { label: 'Market',     color: 'paper' },
  film:    { label: 'Film',       color: 'blue' },
  talk:    { label: 'Talk',       color: 'pink' },
  party:   { label: 'Party',      color: 'yellow' },
  community:{ label: 'Community',  color: 'paper' },
}

// NOTE: the "Society Is Healing / FOMO Alert / …" posters are the platform's brand
// campaign — NOT events. Events have their own names, art and event posters.
export const EVENTS = [
  {
    id: 'soc-heal', title: 'Existential Crisis', cat: 'techno', img: 'techno',
    poster: 'crisist', bg: '#44321a',
    venue: 'Nová Cvernovka', area: 'Nové Mesto', date: 'Fri 12 Jun', day: '12', mon: 'JUN',
    time: '22:00 – 06:00', price: '12€', priceNum: 12, going: 412, friends: 3, dist: '1.4 km',
    about: 'A pitch-black room, a glitching strobe and four hours of mind-bending techno in the old chemistry hall. Stare into the void — it stares back in 4/4.',
    lineup: ['I Hate Models', 'b2b residents'], rating: 4.8, hot: true,
  },
  {
    id: 'fomo', title: 'Roller Disco', cat: 'party', img: 'rooftop',
    poster: 'roller', bg: '#7d7f1e',
    venue: 'Rooftop Manderlák', area: 'Old Town', date: 'Sat 13 Jun', day: '13', mon: 'JUN',
    time: '18:00 – 02:00', price: '8€', priceNum: 8, going: 268, friends: 5, dist: '0.6 km',
    about: 'Eight wheels, disco lights and a rooftop that never sits down. Skates on, ego off — sunset to last song.',
    lineup: ['Disco DJs', 'skate rental'], rating: 4.6, hot: true,
  },
  {
    id: 'complain', title: 'Open Mic', cat: 'talk', img: 'poetry',
    venue: 'KC Dunaj', area: 'Centrum', date: 'Wed 10 Jun', day: '10', mon: 'JUN',
    time: '19:00 – 22:00', price: 'Free', priceNum: 0, going: 96, friends: 1, dist: '0.9 km',
    about: 'Five minutes, one mic, zero filter. Poetry, stand-up and confessions — the city says it out loud.',
    lineup: ['Open mic', 'spoken word'], rating: 4.5,
  },
  {
    id: 'ufo', title: 'What Is Life?', cat: 'film', img: 'cinema',
    poster: 'whatislife', bg: '#ece9df',
    venue: 'Magio Pláž', area: 'Petržalka', date: 'Thu 11 Jun', day: '11', mon: 'JUN',
    time: '21:30 – 23:30', price: '6€', priceNum: 6, going: 154, friends: 2, dist: '2.1 km',
    about: 'An open-air night of cult short films and slow conversations on the riverbank. Bring a blanket and a question.',
    lineup: ['Shorts programme', 'Q&A'], rating: 4.7,
  },
  {
    id: 'petrzalka', title: 'Petržalka Aesthetic', cat: 'art', img: 'photo',
    poster: 'petrzalka', bg: '#fcfcfc',
    venue: 'Photoport Gallery', area: 'Petržalka', date: 'Fri 12 Jun', day: '12', mon: 'JUN',
    time: '17:00 – 21:00', price: 'Free', priceNum: 0, going: 73, friends: 0, dist: '3.0 km',
    about: 'A photo exhibition celebrating the concrete poetry of the panelák skyline. Brutalism never looked so soft.',
    lineup: ['Vernissage', '14 artists'], rating: 4.4,
  },
  {
    id: 'mountains', title: 'Makers Sunday', cat: 'community', img: 'design',
    venue: 'Design Factory', area: 'Nivy', date: 'Sun 14 Jun', day: '14', mon: 'JUN',
    time: '11:00 – 16:00', price: 'Free', priceNum: 0, going: 210, friends: 4, dist: '1.8 km',
    about: 'A slow Sunday for makers, mappers and tinkerers. Talks, workshops, good coffee and better company.',
    lineup: ['6 talks', 'workshops'], rating: 4.6,
  },
  {
    id: 'vinyl', title: 'Crate Diggers', cat: 'market', img: 'vinyl',
    venue: 'Stará Tržnica', area: 'Old Town', date: 'Sat 13 Jun', day: '13', mon: 'JUN',
    time: '09:00 – 15:00', price: 'Free', priceNum: 0, going: 340, friends: 2, dist: '0.7 km',
    about: 'Forty sellers, slow coffee and a Saturday elbow-deep in records. Leave with something warm and analog.',
    lineup: ['40 sellers'], rating: 4.7,
  },
  {
    id: 'dnb', title: 'After Dark', cat: 'techno', img: 'dnb',
    poster: 'afterdark', bg: '#281d1c',
    venue: 'Subclub', area: 'Hrad', date: 'Sat 13 Jun', day: '13', mon: 'JUN',
    time: '23:00 – 07:00', price: '15€', priceNum: 15, going: 520, friends: 6, dist: '1.1 km',
    about: 'Bass under the castle in the city’s oldest bunker. The night doesn’t really start until the lights go out.',
    lineup: ['Sub Focus', 'local crews'], rating: 4.9, hot: true,
  },
  {
    id: 'jazz', title: 'Blue Hour', cat: 'live', img: 'jazz',
    venue: 'Nu Spirit', area: 'Centrum', date: 'Tue 9 Jun', day: '09', mon: 'JUN',
    time: '20:00 – 23:00', price: '10€', priceNum: 10, going: 88, friends: 1, dist: '0.8 km',
    about: 'Smoky, intimate, improvised — the trio never plays the same set twice. Last orders at sunrise.',
    lineup: ['BJO trio'], rating: 4.8,
  },
  {
    id: 'gallery', title: 'After Hours', cat: 'art', img: 'gallery2',
    venue: 'Kunsthalle', area: 'Centrum', date: 'Thu 11 Jun', day: '11', mon: 'JUN',
    time: '19:00 – 23:00', price: '7€', priceNum: 7, going: 142, friends: 2, dist: '0.9 km',
    about: 'The museum after dark — curator-led and scored by a live ambient set. Art without the daytime crowd.',
    lineup: ['Curator tour', 'ambient set'], rating: 4.5,
  },
  {
    id: 'steal-font', title: 'Who Owns A Letter?', cat: 'talk', img: 'design',
    poster: 'stealfont', bg: '#0a0b12',
    venue: 'Satelit – SCD', area: 'Hviezdoslavovo', date: 'Thu 11 Jun', day: '11', mon: 'JUN',
    time: '18:30 – 21:00', price: 'Free', priceNum: 0, going: 134, friends: 2, dist: '0.8 km',
    about: 'You wouldn’t steal a car. You wouldn’t steal a font — except the famous anti-piracy ad did, with an unlicensed typeface. A panel + open debate on authorship, fair use and credit in the age of generative AI.',
    lineup: ['Panel', 'open debate'], rating: 4.6,
  },
  {
    id: 'skate', title: 'Curb Culture', cat: 'community', img: 'skate',
    venue: 'Sad Janka Kráľa', area: 'Petržalka', date: 'Sun 14 Jun', day: '14', mon: 'JUN',
    time: '14:00 – 20:00', price: 'Free', priceNum: 0, going: 188, friends: 3, dist: '2.4 km',
    about: 'Open skate session, best-trick jam and a grill that never stops. All boards, all levels.',
    lineup: ['Best trick', 'DJ + grill'], rating: 4.6,
  },
  {
    id: 'festival', title: 'Gonzi: Open Air', cat: 'live', img: 'festival',
    poster: 'gonzi', bg: '#420e23',
    venue: 'Tyršovo nábrežie', area: 'Petržalka', date: 'Sat 20 Jun', day: '20', mon: 'JUN',
    time: '15:00 – 02:00', price: '29€', priceNum: 29, going: 1840, friends: 8, dist: '1.6 km',
    about: 'Three stages on the Danube headlined by Gonzi. Twelve hours of music, one very long sunset.',
    lineup: ['Gonzi', 'Berlin acts', '+18'], rating: 4.9, hot: true,
  },
  {
    id: 'market2', title: 'Smoke & Wine', cat: 'market', img: 'market',
    venue: 'Jurkovičova Tepláreň', area: 'Nivy', date: 'Fri 12 Jun', day: '12', mon: 'JUN',
    time: '17:00 – 00:00', price: 'Free', priceNum: 0, going: 460, friends: 4, dist: '1.9 km',
    about: 'Thirty kitchens, natural wine and woodsmoke in the old power plant. Come hungry, stay late.',
    lineup: ['30 kitchens'], rating: 4.7,
  },
  {
    id: 'art-live', title: 'Amumu — Changing The Lands', cat: 'live', img: 'art',
    poster: 'amumu', bg: '#a5a6a2',
    venue: 'A4 Space', area: 'Centrum', date: 'Wed 10 Jun', day: '10', mon: 'JUN',
    time: '20:00 – 01:00', price: '5€', priceNum: 5, going: 120, friends: 1, dist: '1.0 km',
    about: 'An audiovisual live set where one artist rebuilds the room in sound and light. Equal parts gig and exhibition.',
    lineup: ['Amumu live AV'], rating: 4.5,
  },
]

// your crew (connections) — used for social proof + community matching
export const CREW = [
  { n: 'Mia', l: 'M', c: 'var(--pink)' },
  { n: 'Jakub', l: 'J', c: 'var(--green)' },
  { n: 'Klára', l: 'K', c: 'var(--yellow)' },
  { n: 'Leo', l: 'L', c: 'var(--blue)' },
  { n: 'Aďa', l: 'A', c: 'var(--elev)' },
  { n: 'Tomáš', l: 'T', c: 'var(--blue-2)' },
  { n: 'Sára', l: 'S', c: 'var(--pink)' },
  { n: 'Niko', l: 'N', c: 'var(--green)' },
]

// deterministic: which crew members are going / interested in an event (social proof)
export function crewFor(ev) {
  let s = [...ev.id].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 100000, 7)
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
  const n = Math.min(ev.friends || 0, 3)
  const pool = [...CREW]
  const picked = []
  for (let i = 0; i < n; i++) picked.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0])
  const fof = n > 0 && rnd() > 0.6 // friend-of-friend reach
  return picked.map((p, i) => ({ ...p, status: ev.hot || i === 0 ? 'going' : 'interested' })).concat(fof ? [{ fof: true }] : [])
}

export const byId = (id) => EVENTS.find((e) => e.id === id)
export const img = (key) => `./events/${key}.jpg`
export const posterImg = (key) => `./posters/${key}.jpg`

// primary visual for an event: real CITYLIFE poster if it has one, else stock photo.
// all art is 4:5, so a 4:5 box shows it fully with no crop.
export const cover = (ev) =>
  ev.poster
    ? { src: posterImg(ev.poster), bg: ev.bg || '#0c0c0e', isPoster: true }
    : { src: img(ev.img), bg: '#0c0c0e', isPoster: false }
