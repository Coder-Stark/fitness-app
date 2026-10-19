# Zuryo Fitness Booking: Progress Tracker

> **How to use:** tick items by changing `[ ]` to `[x]`. In Obsidian, Typora, Notion (paste), GitHub issues/PRs and VS Code with a Markdown checkbox extension, the boxes are directly clickable. The links below jump to each section.

## Quick Navigation

| Phase | Focus |
|---|---|
| [Phase 0](#phase-0-setup) | Setup |
| [Phase 1](#phase-1-auth-roles-seed-data) | Auth, roles, seed data |

---

## Phase 0: Setup

- [x] Backend: Express + MongoDB Atlas connection
- [x] Backend: env validation (Zod), `.env.sample`
- [x] Backend: error middleware, 404 handler, `/api/health`
- [x] Backend: feature-based structure (`app/`, `features/`, `shared/`)
- [x] Frontend: Vite + React + Tailwind
- [x] Frontend: Router, Axios client, layout, health check page
- [x] Frontend: feature-based structure
- [x] Health check shows "ok"
- [x] Commits done (backend + frontend)

[Back to top](#zuryo-fitness-booking-progress-tracker)

---

## Phase 1: Auth, Roles, Seed Data

### Backend
- [x] Add `JWT_SECRET`, `JWT_EXPIRES_IN` to `env.js` and `.env.sample`
- [x] `zones` feature: model (name, center coordinates, radius)
- [x] `users` feature: model (name, email, passwordHash, role), constants
- [x] `trainers` feature: model (user ref, zone, location, status)
- [x] `auth` feature: validation, service, controller, routes
- [x] Register and login endpoints (bcrypt, JWT)
- [x] `GET /api/auth/me`
- [x] `jwt.middleware.js`, `role.middleware.js`, `validate.middleware.js`
- [x] `scripts/seed.js`: 1 admin, 3-4 trainers, 3-4 customers, 2-3 zones
- [x] Tested in Postman/Thunder Client: wrong password, wrong role, no token
- [x] Commit