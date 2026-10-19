import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/layout/Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
}