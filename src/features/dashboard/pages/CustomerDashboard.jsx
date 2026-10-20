import { useAuth } from "../../auth/hooks/useAuth";
import PricePreview from "../../pricing/components/PricePreview";

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
      <p className="mt-1 text-sm text-gray-500">Zone: {user.zone?.name ?? "Not set"}</p>
      <div className="mt-6">
        <PricePreview />
      </div>
      <p className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-500">
        Booking, packages and history will appear here.
      </p>
    </div>
  );
}