import { Splash, Onb1, Onb2, Onb3Photo, Interests, Location, Auth } from './screens2/onboarding2'
import { Home, Explore, MapView, Search, Detail } from './screens2/discovery2'
import { AIPlanner } from './screens2/ai2'
import { Scanner, ScanResult } from './screens2/scanner2'
import { Saved, Tickets, TicketPass, Checkin, Notifications } from './screens2/attendance2'
import { Curated, Profile, Friends, Settings } from './screens2/profile2'
import { CreateEvent, Organizer, Messages, Chat, Wallet, Checkout, ARScan } from './screens2/extra2'
import { Swipe } from './screens2/swipe2'

export const SCREENS2 = {
  splash:        { C: Splash,       t: 'Splash',           d: 'Brand load — "the city, scannable".' },
  onb1:          { C: Onb1,         t: 'Onboarding · 01',  d: 'Discover what’s on right now.' },
  onb2:          { C: Onb2,         t: 'Onboarding · 02',  d: 'Scan any poster to unlock it.' },
  onb3:          { C: Onb3Photo,    t: 'Onboarding · 03',  d: 'From mood to action in 3 taps.' },
  interests:     { C: Interests,    t: 'Pick interests',   d: 'Tune the feed to your taste.' },
  location:      { C: Location,     t: 'Location',         d: 'Find events around you.' },
  auth:          { C: Auth,         t: 'Sign up',          d: 'Join the city, or stay a guest.' },
  home:          { C: Home,         t: 'Dashboard',        d: 'Tonight, crowd levels, AI lead.', tab: 'home' },
  aiplanner:     { C: AIPlanner,    t: 'AI Night Lead',    d: 'Your concierge plans the night.' },
  swipe:         { C: Swipe,        t: 'Swipe deck',       d: 'Find tonight with your crew.' },
  explore:       { C: Explore,      t: 'Explore',          d: 'Categories as living art tiles.', tab: 'explore' },
  map:           { C: MapView,      t: 'Map',              d: 'Events around you, on a map.', tab: 'explore' },
  search:        { C: Search,       t: 'Search & filter',  d: 'Find events, venues, artists.' },
  detail:        { C: Detail,       t: 'Event detail',     d: 'Crowd forecast, lineup, route.', p: { id: 'dnb' } },
  scanner:       { C: Scanner,      t: 'QR scanner',       d: 'Point at a street poster.' },
  scanResult:    { C: ScanResult,   t: 'Scan → unlocked',  d: 'Poster recognised, list opens.' },
  saved:         { C: Saved,        t: 'Your list',        d: 'Interested vs going.', tab: 'saved' },
  tickets:       { C: Tickets,      t: 'My passes',        d: 'Upcoming entry passes.' },
  ticketPass:    { C: TicketPass,   t: 'Entry pass',       d: 'Scannable QR ticket.', p: { id: 'soc-heal' } },
  checkin:       { C: Checkin,      t: 'Checked in',       d: 'Welcome — you’re in.' },
  notifications: { C: Notifications,t: 'Signals',          d: 'FOMO alerts as alert cards.' },
  curated:       { C: Curated,      t: 'Editor’s collection', d: '"Society is healing" picks.' },
  checkout:      { C: Checkout,     t: 'Checkout',         d: 'Tickets, fees, Apple Pay.', p: { id: 'dnb' } },
  wallet:        { C: Wallet,       t: 'Wallet',           d: 'Credits, passes, payment.' },
  arscan:        { C: ARScan,       t: 'AR view',          d: 'Events floating over the street.' },
  organizer:     { C: Organizer,    t: 'Organizer',        d: 'Venue profile + stat block.' },
  createEvent:   { C: CreateEvent,  t: 'Create event',     d: 'Publish + auto poster & QR.' },
  messages:      { C: Messages,     t: 'Messages',         d: 'Chats with venues & friends.' },
  chat:          { C: Chat,         t: 'Chat',             d: 'Talk to the organizer.' },
  profile:       { C: Profile,      t: 'Profile',          d: 'Stats, AI lead, crew.', tab: 'profile' },
  friends:       { C: Friends,      t: 'Crew',             d: 'Who’s out tonight.' },
  settings:      { C: Settings,     t: 'Settings',         d: 'Account + about art cards.' },
}

export const GALLERY_ORDER2 = [
  'splash', 'onb1', 'onb2', 'onb3', 'interests', 'location', 'auth',
  'home', 'aiplanner', 'swipe', 'explore', 'map', 'arscan', 'search', 'detail',
  'scanner', 'scanResult',
  'checkout', 'ticketPass', 'wallet', 'saved', 'tickets', 'checkin', 'notifications',
  'organizer', 'createEvent', 'messages', 'chat',
  'curated', 'profile', 'friends', 'settings',
]
