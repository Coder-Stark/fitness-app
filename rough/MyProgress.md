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
| [Phase 5](#phase-5-booking-management-and-notifications) | Booking management, notifications |
| [Phase 6](#phase-6-session-timer) | Session timer |
| [Phase 7](#phase-7-fitness-profile-session-records-admin-dashboard) | Fitness profile, session records, admin dashboard |
| [Phase 8](#phase-8-trainer-availability-and-workout-recommendations) | Trainer availability, workout recommendations |
| [Phase 9](#phase-9-deployment) | Deployment |

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

## Phase 5: Booking Management and Notifications

### Backend
- [x] Cancel endpoint
- [x] Reschedule endpoint (re-runs assignment and overlap checks)
- [x] `notifications` model, service, routes
- [x] Notification created on assigned, cancelled and rescheduled
- [x] `GET /api/notifications`, mark as read
- [x] reschedule overlap rejected
- [x] notification created on each event
- [x] Commit

### Frontend
- [x] My Bookings tabs (upcoming / completed / cancelled-rescheduled)
- [x] Cancel and reschedule buttons
- [x] Trainer dashboard: assigned sessions list
- [x] Notification bell with polling (5-10 s)
- [x] Customer and trainer views update after a change
- [x] Commit

[Back to top](#zuryo-fitness-booking-progress-tracker)

---

## Phase 6: Session Timer

### Backend
- [x] Fields: `startedAt`, `warningAt`, `endsAt`, `status`
- [x] `POST /api/sessions/:id/start` (trainer only, server timestamps)
- [x] Background worker for the 55(2)-min warning and 60(4)-min completion
- [x] Worker is idempotent and recovers after a server restart
- [x] `GET /api/time` for clock offset
- [x] Commit

### Frontend
- [x] `useServerTime` hook (clock offset)
- [x] Trainer: Start button, countdown from server `endsAt`
- [x] Buzzer/alert at 55(2) and 60(4) min
- [x] Customer: live status badge
- [x] Timer survives page refresh
- [x] Commit

[Back to top](#zuryo-fitness-booking-progress-tracker)

---

## Phase 7: Fitness Profile, Session Records, Admin Dashboard

### Backend
- [x] Fitness profile model (age, weight, goals, level, preferences) with validation
- [x] `GET/PUT /api/fitness-profile/me`
- [x] Session record model (exercises, duration, trainer notes, feedback, suggested next workout)
- [x] `PUT /api/session-records/:id/trainer-notes` (completed sessions only)
- [x] `PUT /api/session-records/:id/feedback`
- [x] `GET /api/session-records/:id`, `/mine`, `/assigned`
- [x] Trainer reads the customer's assessment only for own, non-cancelled bookings
- [x] `GET /api/admin/summary`
- [x] `GET /api/admin/bookings` (trainer, assignment reason, price, payment, status)
- [x] Admin filters: status, date range, paging
- [x] Admin-only access verified
- [x] Seed: sample profiles (Nisha and Isha have none)
- [x] Postman folders tested: fitnessProfiles, sessionRecords, admin
- [x] Test timings restored (60 (4) min session, 55 (2) min warning)
- [x] Commit

### Frontend
- [x] Profile form with first-login prompt (skip allowed)
- [x] Profile summary card on the customer dashboard
- [x] Session history page with feedback form
- [x] Trainer panel: customer assessment and session notes form
- [x] Admin dashboard: summary cards, bookings table, filters, details row
- [x] Commit

[Back to top](#zuryo-fitness-booking-progress-tracker)

---

## Phase 8: Trainer Availability and Workout Recommendations

### Backend
- [x] `GET /api/recommendations/me` (rules-based, no LLM)
- [x] `recommendation.config.js` (limits, progression and ease thresholds)
- [x] `recommendation.catalog.js` (exercise library, labels, health keywords)
- [x] `recommendation.rules.js` pure function: filters (equipment, level, health notes, age) and scores (goals, preferred types, intensity, recent exercises)
- [x] History used: completed sessions, trainer's suggested next workout, ratings (progress and ease)
- [x] Response includes reasons and cautions
- [x] Customer-only access verified
- [x] Postman folders tested: availability, recommendations
- [x] Postman test timings and config test values restored
- [x] Commit

### Frontend
- [x] `/trainer/availability` page (per-day ranges, day off, copy to all days, validation, reset)
- [x] "Manage availability" link on the trainer dashboard
- [x] Slots follow the trainer's saved hours (verified as a customer)
- [x] "Your next workout plan" card on the customer dashboard (plan, reasons, cautions, trainer suggestion)
- [x] Missing-profile state links to the profile form
- [x] Commit

[Back to top](#zuryo-fitness-booking-progress-tracker)

---

## Phase 9: Deployment

### Before deploying
- [x] Real timings live (for testing): `sessionMinutes: 60 (4)` in `booking.config.js`, `warningAfterMinutes: 55 (2)` in `session.config.js`
- [x] `recommendation.config.js` back to `minCompletedSessions: 3` and `minRatings: 2`
- [x] No test leftovers (temporary availability, debug logs)
- [x] `npm run build` passes in the client, and `npm start` runs the backend
- [x] `.env` is not committed, and `.env.sample` is current in both repos

### MongoDB Atlas
- [x] Cluster is running (Atlas is a replica set, which booking transactions need)
- [x] Database user created with a strong password
- [x] Network Access allows Render (`0.0.0.0/0` on the free tier)
- [x] Connection string has the correct database name

### Backend on Render
- [x] Web service created from the backend repo (build `npm install`, start `npm start`)
- [x] Env vars: `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL` (the Netlify URL, no trailing slash). Render sets `PORT`.
- [x] `/api/health` returns `{ "status": "ok" }` on the live URL
- [x] Startup log shows MongoDB connected, and the session worker starts with the server
- [x] Free tier sleeps after inactivity handeled by betterstack uptime 

### Frontend on Netlify
- [x] Build command `npm run build`, publish directory `dist`
- [x] Env var `VITE_API_URL=https://rajbhar-fitness-app-backend.onrender.com/api`
- [x] `public/_redirects` contains `/* /index.html 200` so a refresh works
- [x] Browser Network tab shows requests going to Render, not localhost
- [x] No CORS errors (`CLIENT_URL` on Render matches the Netlify URL exactly)

### Live data
- [x] Seed the live database once (`npm run seed` with the production `MONGODB_URI`; it wipes the database)
- [x] Demo logins work on the live URL (customer, trainer, admin)

### Smoke test on the live URL
- [x] Customer: login, profile, book scheduled and instant, pay by package and card, cancel, reschedule, history, workout plan
- [x] Trainer: sessions, bell, start session, timer and buzzer, session notes, availability
- [x] Admin: summary, bookings table, filters, details
- [x] Deep link refresh works, and mobile width looks fine
- [x] Commit (deploy config)

[Back to top](#zuryo-fitness-booking-progress-tracker)

---