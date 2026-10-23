import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/Authlayout"; 
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import HomeRedirect from "./HomeRedirect";
import { ROLES } from "../../shared/constants/roles";
import Login from "../../features/auth/pages/Login";
import CustomerDashboard from "../../features/dashboard/pages/CustomerDashboard";
import NewBooking from "../../features/booking/pages/NewBooking";
import MyPackages from "../../features/packages/pages/MyPackages";
import MyBookings from "../../features/bookings/pages/MyBookings";
import FitnessProfilePage from "../../features/fitness-profile/pages/FitnessProfilePage";
import SessionHistory from "../../features/session-records/pages/SessionHistory";
import TrainerDashboard from "../../features/dashboard/pages/TrainerDashboard";
import MyAvailability from "../../features/availability/pages/MyAvailability";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/book" element={<NewBooking />} />
          <Route path="/customer/packages" element={<MyPackages />} />
          <Route path="/customer/bookings" element={<MyBookings />} />
          <Route path="/customer/profile" element={<FitnessProfilePage />} />
          <Route path="/customer/history" element={<SessionHistory />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.TRAINER]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/trainer/availability" element={<MyAvailability />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<p className="p-6">Page not found</p>} />
    </Routes>
  );
}