import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNow } from "../../../shared/hooks/useNow";
import Spinner from "../../../shared/components/ui/Spinner";
import BookingCard from "../components/BookingCard";
import BookingTabs from "../components/BookingTabs";
import { useMyBookings } from "../hooks/useMyBookings";
import { groupBookings, TABS } from "../utils/bookingStatus";

const EMPTY_TEXT = {
  upcoming: "No upcoming sessions.",
  completed: "No completed sessions yet.",
  cancelled: "No cancelled sessions.",
};

export default function MyBookings() {
  const { bookings, error, reload } = useMyBookings();
  const now = useNow();
  const [tab, setTab] = useState("upcoming");
  const [notice, setNotice] = useState(null); // { type: "success" | "error", text }

  const groups = useMemo(() => (bookings ? groupBookings(bookings) : null), [bookings]);
  const tabs = TABS.map((item) => ({ ...item, count: groups ? groups[item.key].length : 0 }));

  function handleChanged(nextNotice) {
    setNotice(nextNotice);
    reload();
  }

  function handleTabChange(key) {
    setTab(key);
    setNotice(null);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My bookings</h1>
        <div className="flex gap-4 text-sm">
          <Link to="/customer/book" className="underline">
            Book a session
          </Link>
          <Link to="/customer" className="text-gray-500 underline">
            Back to dashboard
          </Link>
        </div>
      </div>

      {notice && (
        <p
          role="status"
          className={`rounded-md px-3 py-2 text-sm ${
            notice.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
          }`}
        >
          {notice.text}
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!bookings && !error && <Spinner />}

      {groups && (
        <>
          <BookingTabs tabs={tabs} active={tab} onChange={handleTabChange} />

          {groups[tab].length === 0 ? (
            <p className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
              {EMPTY_TEXT[tab]}
            </p>
          ) : (
            <ul className="space-y-3">
              {groups[tab].map((booking) => (
                <BookingCard key={booking.id} booking={booking} now={now} onChanged={handleChanged} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}