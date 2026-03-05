# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend
```bash
cd backend
npm run dev      # Start dev server with nodemon (port 3000)
npm run build    # Compile TypeScript to dist/
npm start        # Run compiled output

# Prisma
npx prisma migrate dev   # Apply migrations
npx prisma generate      # Regenerate Prisma client after schema changes
npx prisma studio        # Open Prisma Studio GUI
```

### Frontend
```bash
cd frontend
npm run dev      # Start Vite dev server
npm run build    # Type-check + build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

This is a monorepo with separate `backend/` and `frontend/` directories — no root-level scripts tie them together.

### Backend (`backend/src/`)
Express.js + TypeScript using a strict MVC separation:
- **routes/** — URL mapping only, delegates to controllers
- **controllers/** — validates requests (Zod), calls services, returns responses
- **services/** — business logic; `footballApi.service.ts` wraps the API-Football RapidAPI endpoint and owns all rate limiting (100 req/day) and in-memory caching with TTL; `cache.service.ts` is a singleton in-memory cache
- **middleware/** — centralized error handler; all errors funnel here for consistent `{ success, error: { code, message } }` responses

All API responses use the envelope: `{ success: boolean, data: T, error?: { code, message } }`.

### Frontend (`frontend/src/`)
React 19 + Vite + TypeScript:
- **services/api.ts** — Axios instance pointed at `http://localhost:3000/api/v1`; typed API methods
- **hooks/** — React Query hooks (`usePlayerSearch`, `usePlayer`, `usePlayerStats`) that wrap the API client
- **types/player.ts** — shared TypeScript interfaces for API responses
- **App.tsx** — wraps the app in `QueryClientProvider` then `BrowserRouter`; current routes: `/` (HomePage), `/player/:id` (PlayerPage)

### Database
PostgreSQL 18 via Prisma ORM. Schema in `backend/prisma/schema.prisma`. Key models: `League`, `Team`, `Player`, `PlayerStats` (per-season aggregate), `Match`, `MatchPerformance` (per-match), `User`, `UserFavorite`.

Database: `stattrack` at `postgresql://postgres:password@localhost:5432/stattrack` (see `backend/.env`).

### External API
API-Football via RapidAPI (`v3.football.api-sports.io`). The API key is in `backend/.env` as `FOOTBALL_API_KEY`. Cache TTLs: player search 1h, player profile 6h, stats 12h, team data 24h.

## Key Conventions
- Backend uses CommonJS (`"type": "commonjs"`); frontend uses ESM (`"type": "module"`)
- Backend TypeScript targets ES2020/CommonJS; frontend targets ES2022/ESNext (Vite bundles)
- Zod is used for request validation in controllers
- JWT auth and Redis caching are planned but not yet implemented
