import { useAuth } from "../../auth/hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Admin: {user.name}</h1>
      <p className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-500">
        Bookings, assignments, pricing and session status will appear here.
      </p>
    </div>
  );
}