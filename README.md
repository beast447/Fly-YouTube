# Fly YouTube

An app for Microsoft Flight Simulator pilots to fly routes published by their favorite YouTube creators. Browse routes, load them straight into MSFS, and log your flights.

Built on the Fly YouTube Design System (midnight cockpit palette, amber instrument glow, Inter + Space Grotesk + JetBrains Mono).

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

## Scripts

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite dev server                |
| `npm run build`        | Produce a production build into `dist/`  |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Lint the codebase with ESLint            |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |
| `npm run type-check`   | Type-check with `tsc --noEmit`           |
| `npm run test`         | Run the Vitest test suite once           |
| `npm run test:watch`   | Run Vitest in watch mode                 |

## Project layout

```
index.html              Vite entrypoint (fonts + <div id="root" />)
public/
  fonts/                Inter variable fonts (brand body type)
  assets/               Logo SVGs + grain texture
src/
  main.tsx              React root
  App.tsx               Router, code-split screens, error boundary
  theme.ts              Brand tokens mirrored to JS
  types/                Shared TypeScript interfaces (Route, Creator, Flight, …)
  styles/
    tokens.css          CSS custom properties (colors, type, radii, shadows)
    global.css          Layout, skeleton shimmer, focus rings, skip link
  components/           Badge, Avatar, RouteCard, CreatorRow, StatTile, TopBar, Skeletons, …
  screens/              Dispatch, Browse, Logbook, Profile, RouteDetail, CreatorProfile, NotFound
  context/              Global app state (follow/load) with localStorage persistence
  hooks/                usePersistedState, useDebounce, usePageTitle
  services/             Async data-access layer (API-ready, wraps mock data)
  data/                 Mock routes, creators, logbook entries
```

## Screens

- **Dispatch** — Route of the week, feed from followed creators, suggested creators to monitor
- **Browse** — Search routes or creators, filter by type
- **Logbook** — Flight totals, rank progress, recent flights
- **Profile** — Your identity, followed creators, settings
- **Route Detail** — Full route briefing with "Load route in MSFS" CTA
- **Creator Profile** — Creator bio, stats, filed routes
