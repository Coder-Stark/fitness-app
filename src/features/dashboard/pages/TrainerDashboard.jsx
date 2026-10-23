import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import AssignedBookings from "../../bookings/components/AssignedBookings";

export default function TrainerDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Trainer: {user.name}</h1>
      <p className="mt-1 text-sm text-gray-500">Zone: {user.zone?.name ?? "Not set"}</p>
      <Link
        to="/trainer/availability"
        className="mt-4 inline-block rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
      >
        Manage availability
      </Link>
      <div className="mt-6">
        <AssignedBookings />
      </div>
    </div>
  );
}