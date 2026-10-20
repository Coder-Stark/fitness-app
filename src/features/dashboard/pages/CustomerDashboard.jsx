import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
      <p className="mt-1 text-sm text-gray-500">Zone: {user.zone?.name ?? "Not set"}</p>
      <Link
        to="/customer/book"
        className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Book a session
      </Link>
      <p className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-500">
        Packages and booking history will appear here.
      </p>
    </div>
  );
}