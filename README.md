# Fly YouTube

An app for Microsoft Flight Simulator pilots to fly routes published by their favorite YouTube creators. Browse routes, load them straight into MSFS, and log your flights.

Built on the Fly YouTube Design System (midnight cockpit palette, amber instrument glow, Inter + Space Grotesk + JetBrains Mono).

## Getting started

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev:full   # Frontend: http://localhost:5173, API: http://localhost:4000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run server:dev` | Start Express API with watch mode |
| `npm run dev:full` | Run frontend + backend together |
| `npm run db:migrate` | Apply PostgreSQL schema |
| `npm run db:seed` | Seed demo creators/routes/user |
| `npm run build` | Produce a production build into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project layout

```
index.html
src/                    React frontend
server/
  src/
    app.js              Express app setup + middleware
    routes/             Auth, creators, routes, flights, follows endpoints
    db/                 SQL schema, migration, seed scripts
```

## Demo credentials

- Email: `pilot@example.com`
- Password: `pilotdemo123`


## Testing

```bash
npm run test:backend
```

See `TESTING.md` for full setup and troubleshooting.
