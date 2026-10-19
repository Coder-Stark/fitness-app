import { useAuth } from "../../auth/hooks/useAuth";

export default function TrainerDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Trainer: {user.name}</h1>
      <p className="mt-1 text-sm text-gray-500">Zone: {user.zone?.name ?? "Not set"}</p>
      <p className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-500">
        Assigned sessions, availability and the session timer will appear here.
      </p>
    </div>
  );
}