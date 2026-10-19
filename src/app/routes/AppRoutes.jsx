import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import HealthCheck from "../../features/health/pages/HealthCheck";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<HealthCheck />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Route>
    </Routes>
  );
}