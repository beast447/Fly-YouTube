# Fly YouTube

An app for Microsoft Flight Simulator pilots to fly routes published by their favorite YouTube creators. Browse routes, load them straight into MSFS, and log your flights.

Built on the Fly YouTube Design System (midnight cockpit palette, amber instrument glow, Inter + Space Grotesk + JetBrains Mono).

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Produce a production build into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project layout

```
index.html              Vite entrypoint (fonts + <div id="root" />)
public/
  fonts/                Inter variable fonts (brand body type)
  assets/               Logo SVGs + grain texture
src/
  main.jsx              React root
  App.jsx               Tab + push-screen navigation
  theme.js              Brand tokens mirrored to JS
  styles/
    tokens.css          CSS custom properties (colors, type, radii, shadows)
    global.css          Phone shell, status bar, tab bar, screen transitions
  components/           Badge, Avatar, RouteCard, CreatorRow, StatTile, TopBar, …
  screens/              Dispatch, Browse, Logbook, Profile, RouteDetail, CreatorProfile
  data/                 Mock routes, creators, logbook entries
```

## Screens

- **Dispatch** — Route of the week, feed from followed creators, suggested creators to monitor
- **Browse** — Search routes or creators, filter by type
- **Logbook** — Flight totals, rank progress, recent flights
- **Profile** — Your identity, followed creators, settings
- **Route Detail** — Full route briefing with "Load route in MSFS" CTA
- **Creator Profile** — Creator bio, stats, filed routes
