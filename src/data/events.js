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

export const EVENTS = [
  {
    id: 'soc-heal', title: 'Society Is Healing', cat: 'techno', img: 'techno',
    poster: 'society', bg: '#0d359b',
    venue: 'Nová Cvernovka', area: 'Nové Mesto', date: 'Fri 12 Jun', day: '12', mon: 'JUN',
    time: '22:00 – 06:00', price: '12€', priceNum: 12, going: 412, friends: 3, dist: '1.4 km',
    about: 'A curiosity-driven night of hypnotic techno in the old chemistry hall. Two rooms, one signal — come find out where the city is healing.',
    lineup: ['VTSS', 'Lobster', 'b2b residents'], rating: 4.8, hot: true,
  },
  {
    id: 'fomo', title: 'This Is Not A FOMO Alert', cat: 'party', img: 'rooftop',
    poster: 'fomo', bg: '#fefefc',
    venue: 'Rooftop Manderlák', area: 'Old Town', date: 'Sat 13 Jun', day: '13', mon: 'JUN',
    time: '18:00 – 02:00', price: '8€', priceNum: 8, going: 268, friends: 5, dist: '0.6 km',
    about: 'Sunset to moonrise on the highest roof in town. But you still might wanna check it.',
    lineup: ['Sundowner DJs', 'live sax'], rating: 4.6, hot: true,
  },
  {
    id: 'complain', title: 'Complaining Is Bonding', cat: 'talk', img: 'poetry',
    poster: 'complain', bg: '#0c0c0e',
    venue: 'KC Dunaj', area: 'Centrum', date: 'Wed 10 Jun', day: '10', mon: 'JUN',
    time: '19:00 – 22:00', price: 'Free', priceNum: 0, going: 96, friends: 1, dist: '0.9 km',
    about: 'An open-mic night where the city complains together — and somehow leaves lighter.',
    lineup: ['Open mic', 'spoken word'], rating: 4.5,
  },
  {
    id: 'ufo', title: 'UFO Watching Since 1972', cat: 'film', img: 'cinema',
    poster: 'ufo', bg: '#0c0c0e',
    venue: 'Magio Pláž', area: 'Petržalka', date: 'Thu 11 Jun', day: '11', mon: 'JUN',
    time: '21:30 – 23:30', price: '6€', priceNum: 6, going: 154, friends: 2, dist: '2.1 km',
    about: 'Open-air screening of cult sci-fi on the riverbank. Bring a blanket, watch the skies.',
    lineup: ['Outdoor cinema'], rating: 4.7,
  },
  {
    id: 'petrzalka', title: 'Petržalka Aesthetic', cat: 'art', img: 'photo',
    poster: 'petrzalka', bg: '#fcfcfc',
    venue: 'Photoport Gallery', area: 'Petržalka', date: 'Fri 12 Jun', day: '12', mon: 'JUN',
    time: '17:00 – 21:00', price: 'Free', priceNum: 0, going: 73, friends: 0, dist: '3.0 km',
    about: 'A photo exhibition celebrating the concrete poetry of the panelák skyline.',
    lineup: ['Vernissage', '14 artists'], rating: 4.4,
  },
  {
    id: 'mountains', title: 'Small Country, Big Mountains', cat: 'community', img: 'design',
    poster: 'mountains', bg: '#4bae5f',
    venue: 'Design Factory', area: 'Nivy', date: 'Sun 14 Jun', day: '14', mon: 'JUN',
    time: '11:00 – 16:00', price: 'Free', priceNum: 0, going: 210, friends: 4, dist: '1.8 km',
    about: 'A Sunday meetup for makers, mappers and mountain people. Talks, coffee, good company.',
    lineup: ['6 talks', 'workshops'], rating: 4.6,
  },
  {
    id: 'vinyl', title: 'Vinyl Flea & Coffee', cat: 'market', img: 'vinyl',
    poster: 'life', bg: '#0f0f0f',
    venue: 'Stará Tržnica', area: 'Old Town', date: 'Sat 13 Jun', day: '13', mon: 'JUN',
    time: '09:00 – 15:00', price: 'Free', priceNum: 0, going: 340, friends: 2, dist: '0.7 km',
    about: 'Crate-dig through 40 sellers, sip slow coffee, leave with something warm and analog.',
    lineup: ['40 sellers'], rating: 4.7,
  },
  {
    id: 'dnb', title: 'Warehouse: Liquid', cat: 'techno', img: 'dnb',
    poster: 'afterdark', bg: '#281d1c',
    venue: 'Subclub', area: 'Hrad', date: 'Sat 13 Jun', day: '13', mon: 'JUN',
    time: '23:00 – 07:00', price: '15€', priceNum: 15, going: 520, friends: 6, dist: '1.1 km',
    about: 'Drum & bass under the castle in the city’s oldest bunker club. Bass you feel in your teeth.',
    lineup: ['Goldie', 'local crews'], rating: 4.9, hot: true,
  },
  {
    id: 'jazz', title: 'Cellar Jazz Sessions', cat: 'live', img: 'jazz',
    venue: 'Nu Spirit', area: 'Centrum', date: 'Tue 9 Jun', day: '09', mon: 'JUN',
    time: '20:00 – 23:00', price: '10€', priceNum: 10, going: 88, friends: 1, dist: '0.8 km',
    about: 'Smoky, intimate, improvised. The trio never plays the same set twice.',
    lineup: ['BJO trio'], rating: 4.8,
  },
  {
    id: 'gallery', title: 'After Hours: Modern', cat: 'art', img: 'gallery2',
    venue: 'Kunsthalle', area: 'Centrum', date: 'Thu 11 Jun', day: '11', mon: 'JUN',
    time: '19:00 – 23:00', price: '7€', priceNum: 7, going: 142, friends: 2, dist: '0.9 km',
    about: 'The museum after dark — guided by curators, scored by a live ambient set.',
    lineup: ['Curator tour', 'ambient set'], rating: 4.5,
  },
  {
    id: 'skate', title: 'Street Jam & BBQ', cat: 'community', img: 'skate',
    poster: 'roller', bg: '#7d702f',
    venue: 'Sad Janka Kráľa', area: 'Petržalka', date: 'Sun 14 Jun', day: '14', mon: 'JUN',
    time: '14:00 – 20:00', price: 'Free', priceNum: 0, going: 188, friends: 3, dist: '2.4 km',
    about: 'Open skate session, best-trick contest and a grill that never stops.',
    lineup: ['Best trick', 'DJ + grill'], rating: 4.6,
  },
  {
    id: 'festival', title: 'Riverside Festival', cat: 'live', img: 'festival',
    poster: 'gonzi', bg: '#5e873b',
    venue: 'Tyršovo nábrežie', area: 'Petržalka', date: 'Sat 20 Jun', day: '20', mon: 'JUN',
    time: '15:00 – 02:00', price: '29€', priceNum: 29, going: 1840, friends: 8, dist: '1.6 km',
    about: 'Three stages on the Danube, twelve hours of music, one very long sunset.',
    lineup: ['Modat', 'Berlin acts', '+18'], rating: 4.9, hot: true,
  },
  {
    id: 'market2', title: 'Night Food Market', cat: 'market', img: 'market',
    venue: 'Jurkovičova Tepláreň', area: 'Nivy', date: 'Fri 12 Jun', day: '12', mon: 'JUN',
    time: '17:00 – 00:00', price: 'Free', priceNum: 0, going: 460, friends: 4, dist: '1.9 km',
    about: '30 kitchens, natural wine, neon and woodsmoke in the old power plant.',
    lineup: ['30 kitchens'], rating: 4.7,
  },
  {
    id: 'art-live', title: 'Live Painting × Bass', cat: 'art', img: 'art',
    venue: 'A4 Space', area: 'Centrum', date: 'Wed 10 Jun', day: '10', mon: 'JUN',
    time: '20:00 – 01:00', price: '5€', priceNum: 5, going: 120, friends: 1, dist: '1.0 km',
    about: 'Four painters, one wall, a slow-building bass set. Watch a canvas become a city.',
    lineup: ['4 painters', 'bass set'], rating: 4.5,
  },
]

export const byId = (id) => EVENTS.find((e) => e.id === id)
export const img = (key) => `./events/${key}.jpg`
export const posterImg = (key) => `./posters/${key}.jpg`

// primary visual for an event: real CITYLIFE poster if it has one, else stock photo.
// all art is 4:5, so a 4:5 box shows it fully with no crop.
export const cover = (ev) =>
  ev.poster
    ? { src: posterImg(ev.poster), bg: ev.bg || '#0c0c0e', isPoster: true }
    : { src: img(ev.img), bg: '#0c0c0e', isPoster: false }
