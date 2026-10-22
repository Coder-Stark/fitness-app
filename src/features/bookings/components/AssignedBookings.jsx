import { useMemo, useState } from "react";
import Spinner from "../../../shared/components/ui/Spinner";
import { useAssignedBookings } from "../hooks/useAssignedBookings";
import { groupBookings, TABS } from "../utils/bookingStatus";
import AssignedBookingCard from "./AssignedBookingCard";
import BookingTabs from "./BookingTabs";

const EMPTY_TEXT = {
  upcoming: "No upcoming sessions assigned to you.",
  completed: "No completed sessions yet.",
  cancelled: "No cancelled sessions.",
};

export default function AssignedBookings() {
  const { bookings, error, reload } = useAssignedBookings();
  const [tab, setTab] = useState("upcoming");

  const groups = useMemo(() => (bookings ? groupBookings(bookings) : null), [bookings]);
  const tabs = TABS.map((item) => ({ ...item, count: groups ? groups[item.key].length : 0 }));

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">My sessions</h2>
        <p className="text-xs text-gray-500">Updates automatically</p>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!bookings && !error && <Spinner />}

      {groups && (
        <>
          <BookingTabs tabs={tabs} active={tab} onChange={setTab} />

          {groups[tab].length === 0 ? (
            <p className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
              {EMPTY_TEXT[tab]}
            </p>
          ) : (
            <ul className="space-y-3">
              {groups[tab].map((booking) => (
                <AssignedBookingCard key={booking.id} booking={booking} onChanged={reload} />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}