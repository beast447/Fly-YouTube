# Fly YouTube API (Express + PostgreSQL)

## Overview
This API provides production-focused foundations for:
- JWT authentication (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- Creator catalog (`/api/creators`)
- Route catalog (`/api/routes`)
- Flight log storage (`/api/flights`, authenticated)
- Follow graph (`/api/follows`, authenticated)

## Quick start
1. Create a PostgreSQL database.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` + `JWT_SECRET`.
3. Run database setup and seed:
   - `npm run db:migrate`
   - `npm run db:seed`
4. Start both frontend + backend:
   - `npm run dev:full`

Demo account after seeding:
- `pilot@example.com`
- `pilotdemo123`

## Security / production defaults
- `helmet` for secure HTTP headers
- `cors` restricted to configured frontend origin
- `express-rate-limit` over `/api/*`
- Request validation via `zod`
- Password hashing via `bcryptjs`
- JWT bearer auth for protected routes

## Tests
- `npm run test:backend`
