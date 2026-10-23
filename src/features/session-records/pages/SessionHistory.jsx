import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../shared/components/ui/Spinner";
import SessionHistoryCard from "../components/SessionHistoryCard";
import { useMySessions } from "../hooks/useMySessions";

export default function SessionHistory() {
  const { sessions, error, reload } = useMySessions();
  const [notice, setNotice] = useState("");

  function handleSaved(message) {
    setNotice(message);
    reload();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Session history</h1>
        <Link to="/customer" className="text-sm text-gray-500 underline">
          Back to dashboard
        </Link>
      </div>

      {notice && (
        <p role="status" className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          {notice}
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!sessions && !error && <Spinner />}

      {sessions && sessions.length === 0 && (
        <p className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
          No completed sessions yet. After your first session, your trainer's notes and your
          feedback will appear here.
        </p>
      )}

      {sessions && sessions.length > 0 && (
        <ul className="space-y-3">
          {sessions.map((session) => (
            <SessionHistoryCard key={session.bookingId} session={session} onSaved={handleSaved} />
          ))}
        </ul>
      )}
    </div>
  );
}