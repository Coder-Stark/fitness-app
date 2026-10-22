import { Link } from "react-router-dom";
import { BOOKING_STATUS } from "../../../shared/constants/bookings";
import { useMyBookings } from "../../bookings/hooks/useMyBookings";
import SessionTimer from "./SessionTimer";

export default function ActiveSessionBanner() {
  const { bookings, reload } = useMyBookings();

  const active = bookings?.find(
    (booking) => booking.status === BOOKING_STATUS.IN_PROGRESS && booking.timer
  );
  if (!active) return null;

  return (
    <section className="mt-4 space-y-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Your session is live</h2>
        <Link to="/customer/bookings" className="text-sm text-gray-600 underline">
          View booking
        </Link>
      </div>
      <p className="text-sm text-gray-600">Trainer: {active.trainer?.name ?? "Your trainer"}</p>
      <SessionTimer booking={active} role="customer" onFinished={reload} />
    </section>
  );
}