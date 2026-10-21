# Zuryo Fitness Booking: Progress Tracker

> **How to use:** tick items by changing `[ ]` to `[x]`. In Obsidian, Typora, Notion (paste), GitHub issues/PRs and VS Code with a Markdown checkbox extension, the boxes are directly clickable. The links below jump to each section.

## Quick Navigation

| Phase | Focus |
|---|---|
| [Phase 0](#phase-0-setup) | Setup |
| [Phase 1](#phase-1-auth-roles-seed-data) | Auth, roles, seed data |
| [Phase 2](#phase-2-pricing-engine) | Pricing engine |
| [Phase 3](#phase-3-availability-and-assignment) | Availability and assignment |
| [Phase 4](#phase-4-checkout-payment-packages) | Checkout, payment, packages |
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


### Frontend
- [x] `AuthContext`, `AuthProvider`, `useAuth`
- [x] Login page and `LoginForm`
- [x] Demo account buttons (Customer / Trainer / Admin)
- [x] `ProtectedRoute` with role check
- [x] Role-based redirect after login
- [x] Empty Customer, Trainer and Admin dashboards
- [x] Logout, token persisted across refresh
- [x] Delete the temporary `health` feature
- [x] Commit

[Back to top](#zuryo-fitness-booking-progress-tracker)

---

## Phase 2: Pricing Engine

### Backend
- [x] `pricing.config.js` (normal, peak, commission %, peak windows)
- [x] `calculatePrice(slotStart)` returns `{ base, commission, total, isPeak }` in paise
- [x] `POST /api/pricing/quote` with validation
<!-- - [x] Vitest + Supertest installed, `test` script added -->
- [x] Test: normal slot = 43890 paise
- [x] Test: peak slot = 54890 paise
- [x] Test: rounding edge cases
- [x] Test: peak window boundaries (start and end times)
- [x] Commit

### Frontend
- [x] `pricing.api.js`
- [x] `PriceBreakdown` component (shows ₹ amounts)
- [x] Commit

[Back to top](#zuryo-fitness-booking-progress-tracker)

---

## Phase 3: Availability and Assignment

### Backend
- [x] `availability` model (trainer working days and hours)
- [x] `bookings` model (customer, trainer, start, end, status, price snapshot)
- [x] `GET /api/slots` (only slots with at least one free eligible trainer)
- [x] Assignment function: zone, then availability, then no overlap
- [x] Preferred trainer used only if eligible and free
- [x] Tie-breaker (nearest, then least busy)
- [x] Store the assignment reason on the booking
- [x] Double-booking protection (unique index or transaction)
- [x] Instant booking (starts within 60 min)
- [x] Scheduled booking
- [x] "No trainer available" response with alternative slots
- [x] Commit

### Frontend
- [x] Booking mode screen (instant / scheduled)
- [x] Slot picker
- [x] Preferred trainer dropdown
- [x] "No trainer available" state with alternatives
- [x] Commit

[Back to top](#zuryo-fitness-booking-progress-tracker)

---

## Phase 4: Checkout, Payment, Packages

### Backend
- [x] `packages` model (purchased, used, remaining)
- [x] `payments` model (idempotency key, status, amount)
- [x] Price computed on the server, client amount ignored
- [x] Simulated payment endpoint with idempotency key
- [x] Package deduction exactly once per booking
- [x] Cancel flow restores the session (documented refund rule)
- [x] Commit

### Frontend
- [x] Checkout page with price breakdown and Pay button
- [x] Booking confirmation page
- [x] Package page (purchased / used / remaining)
- [x] Commit

[Back to top](#zuryo-fitness-booking-progress-tracker)

---
