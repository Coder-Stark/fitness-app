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
 ┃ ┃ ┃ ┣ ScheduledPicker.jsx
 ┃ ┃ ┃ ┣ SlotGrid.jsx
 ┃ ┃ ┃ ┗ TrainerSelect.jsx
 ┃ ┃ ┗ pages
 ┃ ┃ ┃ ┗ NewBooking.jsx
 ┃ ┣ dashboard
 ┃ ┃ ┗ pages
 ┃ ┃ ┃ ┣ AdminDashboard.jsx
 ┃ ┃ ┃ ┣ CustomerDashboard.jsx
 ┃ ┃ ┃ ┗ TrainerDashboard.jsx
 ┃ ┗ pricing
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ pricing.api.js
 ┃ ┃ ┗ components
 ┃ ┃ ┃ ┗ PriceBreakdown.jsx
 ┣ shared
 ┃ ┣ api
 ┃ ┃ ┗ axios.js
 ┃ ┣ components
 ┃ ┃ ┣ layout
 ┃ ┃ ┃ ┗ Navbar.jsx
 ┃ ┃ ┗ ui
 ┃ ┃ ┃ ┣ Button.jsx
 ┃ ┃ ┃ ┗ Spinner.jsx
 ┃ ┣ constants
 ┃ ┃ ┗ roles.js
 ┃ ┣ styles
 ┃ ┃ ┗ globals.css
 ┃ ┗ utils
 ┃ ┃ ┣ dates.js
 ┃ ┃ ┣ errors.js
 ┃ ┃ ┗ formatters.js
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