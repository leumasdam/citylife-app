# CITYLIFE — the city, scannable

**Live:** https://leumasdam.github.io/citylife-app/

Mobile app concept for **CITYLIFE**: a living database of city events you discover, scan and attend.
See a poster on the street → scan its QR → the full event opens (time, place, price, lineup) → grab your pass.

Built from the CITYLIFE brand system (cobalt blue · acid yellow · hot pink, anti-design poster
typography, the bubbly sticker logo). React + Vite + Framer Motion.

## What's in it
- **23 screens** across the full product: onboarding, discovery feed, map, search, event detail,
  QR scanner, scan-to-unlock, saved/going, tickets, entry pass, check-in, notifications (FOMO alerts),
  curated collection, profile, crew, settings.
- **Two modes** (toggle top-right):
  - **All screens** — every screen laid out in phone frames (the design deliverable).
  - **Try it live** — an interactive prototype: tap around, scan a poster, open an event, get a pass.
    Saved/going state is real and persists across the flow.
- Real event photography (stock) in `public/events/`, brand logos in `public/brand/`.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/  (static, base './')
npm run deploy   # build + publish dist to the gh-pages branch
```

## Structure
```
src/
  App.jsx                 # mode toggle + navigation state machine + screen registry
  index.css               # brand design system (tokens, phone frame, UI kit)
  data/events.js          # the event "database"
  ui.jsx                  # EventCard, EventRow, QR, headers, poster motifs
  lib/icons.jsx           # stroke icon set
  phone/Phone.jsx         # phone chrome, status bar, bottom tab bar
  screens/
    onboarding.jsx        # splash · 3 intro · interests · location · sign up
    discovery.jsx         # home feed · explore · map · search · event detail
    scanner.jsx           # QR scanner · scan → unlocked
    attendance.jsx        # saved · passes · entry pass · check-in · notifications
    profile.jsx           # curated · profile · crew · settings
```
The 23-screen order and captions live in `SCREENS` / `GALLERY_ORDER` in `App.jsx`.
