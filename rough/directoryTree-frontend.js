/*
node_modules
public
rough
┣ directoryTree-frontend.js
┣ HowIDoIt-frontend.txt

src
 ┣ app
 ┃ ┣ layouts
 ┃ ┃ ┣ Authlayout.jsx
 ┃ ┃ ┗ DashboardLayout.jsx
 ┃ ┣ providers
 ┃ ┃ ┗ AppProviders.jsx
 ┃ ┗ routes
 ┃ ┃ ┣ AppRoutes.jsx
 ┃ ┃ ┣ HomeRedirect.jsx
 ┃ ┃ ┗ ProtectedRoute.jsx
 ┣ features
 ┃ ┣ admin
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ admin.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ AdminBookingRow.jsx
 ┃ ┃ ┃ ┣ AdminBookingsTable.jsx
 ┃ ┃ ┃ ┣ AdminFilters.jsx
 ┃ ┃ ┃ ┗ AdminSummary.jsx
 ┃ ┃ ┗ hooks
 ┃ ┃ ┃ ┣ useAdminBookings.js
 ┃ ┃ ┃ ┗ useAdminSummary.js
 ┃ ┣ auth
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ auth.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ DemoAccountButtons.jsx
 ┃ ┃ ┃ ┗ LoginForm.jsx
 ┃ ┃ ┣ context
 ┃ ┃ ┃ ┣ AuthContext.js
 ┃ ┃ ┃ ┗ AuthProvider.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ useAuth.js
 ┃ ┃ ┗ pages
 ┃ ┃ ┃ ┗ Login.jsx
 ┃ ┣ booking
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ booking.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ BookingConfirmation.jsx
 ┃ ┃ ┃ ┣ BookingReview.jsx
 ┃ ┃ ┃ ┣ DateStrip.jsx
 ┃ ┃ ┃ ┣ InstantPicker.jsx
 ┃ ┃ ┃ ┣ ModeSelector.jsx
 ┃ ┃ ┃ ┣ NoTrainerNotice.jsx
 ┃ ┃ ┃ ┣ PaymentMethodSelect.jsx
 ┃ ┃ ┃ ┣ ScheduledPicker.jsx
 ┃ ┃ ┃ ┣ SlotGrid.jsx
 ┃ ┃ ┃ ┗ TrainerSelect.jsx
 ┃ ┃ ┗ pages
 ┃ ┃ ┃ ┗ NewBooking.jsx
 ┃ ┣ bookings
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ bookings.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ AssignedBookingCard.jsx
 ┃ ┃ ┃ ┣ AssignedBookings.jsx
 ┃ ┃ ┃ ┣ BookingCard.jsx
 ┃ ┃ ┃ ┣ BookingTabs.jsx
 ┃ ┃ ┃ ┣ CancelPanel.jsx
 ┃ ┃ ┃ ┗ ReschedulePanel.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┣ useAssignedBookings.js
 ┃ ┃ ┃ ┗ useMyBookings.js
 ┃ ┃ ┣ pages
 ┃ ┃ ┃ ┗ MyBookings.jsx
 ┃ ┃ ┗ utils
 ┃ ┃ ┃ ┗ bookingStatus.js
 ┃ ┣ dashboard
 ┃ ┃ ┗ pages
 ┃ ┃ ┃ ┣ AdminDashboard.jsx
 ┃ ┃ ┃ ┣ CustomerDashboard.jsx
 ┃ ┃ ┃ ┗ TrainerDashboard.jsx
 ┃ ┣ fitness-profile
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ fitnessProfile.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ ProfileForm.jsx
 ┃ ┃ ┃ ┗ ProfileSummaryCard.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ useFitnessProfile.js
 ┃ ┃ ┣ pages
 ┃ ┃ ┃ ┗ FitnessProfilePage.jsx
 ┃ ┃ ┗ utils
 ┃ ┃ ┃ ┣ profileForm.js
 ┃ ┃ ┃ ┗ profilePrompt.js
 ┃ ┣ notifications
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ notification.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┗ NotificationBell.jsx
 ┃ ┃ ┣ context
 ┃ ┃ ┃ ┣ NotificationsContext.js
 ┃ ┃ ┃ ┗ NotificationsProvider.jsx
 ┃ ┃ ┗ hooks
 ┃ ┃ ┃ ┗ useNotifications.js
 ┃ ┣ packages
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ package.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ PackageList.jsx
 ┃ ┃ ┃ ┣ PackageSummaryCard.jsx
 ┃ ┃ ┃ ┗ PlanCard.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ usePackageSummary.js
 ┃ ┃ ┗ pages
 ┃ ┃ ┃ ┗ MyPackages.jsx
 ┃ ┣ pricing
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ pricing.api.js
 ┃ ┃ ┗ components
 ┃ ┃ ┃ ┗ PriceBreakdown.jsx
 ┃ ┣ session-records
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ sessionRecord.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ AssessmentCard.jsx
 ┃ ┃ ┃ ┣ FeedbackForm.jsx
 ┃ ┃ ┃ ┣ FeedbackView.jsx
 ┃ ┃ ┃ ┣ SessionHistoryCard.jsx
 ┃ ┃ ┃ ┣ StarInput.jsx
 ┃ ┃ ┃ ┣ Stars.jsx
 ┃ ┃ ┃ ┣ TrainerNotesForm.jsx
 ┃ ┃ ┃ ┣ TrainerNotesView.jsx
 ┃ ┃ ┃ ┗ TrainerSessionPanel.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┣ useMySessions.js
 ┃ ┃ ┃ ┗ useSessionRecord.js
 ┃ ┃ ┣ pages
 ┃ ┃ ┃ ┗ SessionHistory.jsx
 ┃ ┃ ┗ utils
 ┃ ┃ ┃ ┣ exercise.js
 ┃ ┃ ┃ ┗ notesPayload.js
 ┃ ┣ sessions
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ session.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ ActiveSessionBanner.jsx
 ┃ ┃ ┃ ┣ LivePhaseBadge.jsx
 ┃ ┃ ┃ ┣ SessionTimer.jsx
 ┃ ┃ ┃ ┗ StartSessionButton.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ usePhaseBuzzer.js
 ┃ ┃ ┗ utils
 ┃ ┃ ┃ ┣ audio.js
 ┃ ┃ ┃ ┗ sessionTime.js
 ┃ ┗ time
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ time.api.js
 ┃ ┃ ┣ context
 ┃ ┃ ┃ ┣ ServerTimeContext.js
 ┃ ┃ ┃ ┗ ServerTimeProvider.jsx
 ┃ ┃ ┗ hooks
 ┃ ┃ ┃ ┣ useServerNow.js
 ┃ ┃ ┃ ┗ useServerTime.js
 ┣ shared
 ┃ ┣ api
 ┃ ┃ ┗ axios.js
 ┃ ┣ components
 ┃ ┃ ┣ layout
 ┃ ┃ ┃ ┗ Navbar.jsx
 ┃ ┃ ┗ ui
 ┃ ┃ ┃ ┣ Button.jsx
 ┃ ┃ ┃ ┣ Spinner.jsx
 ┃ ┃ ┃ ┗ StatusBadge.jsx
 ┃ ┣ constants
 ┃ ┃ ┣ bookings.js
 ┃ ┃ ┣ fitness.js
 ┃ ┃ ┣ payments.js
 ┃ ┃ ┣ roles.js
 ┃ ┃ ┗ sessions.js
 ┃ ┣ hooks
 ┃ ┃ ┣ useNow.js
 ┃ ┃ ┗ usePolling.js
 ┃ ┣ styles
 ┃ ┃ ┗ globals.css
 ┃ ┗ utils
 ┃ ┃ ┣ dates.js
 ┃ ┃ ┣ errors.js
 ┃ ┃ ┣ formatters.js
 ┃ ┃ ┗ idempotency.js
 ┣ App.jsx
 ┗ main.jsx

.env
.env.sample
.gitignore
eslint.config.js
index.html
package-lock.json
package.json
READEME.md
vite.config.js
*/