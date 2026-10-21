import { BOOKING_STATUS } from "../../../shared/constants/bookings";
import { formatSlotTime } from "../../../shared/utils/formatters";
import StatusBadge from "../../../shared/components/ui/StatusBadge";

export default function AssignedBookingCard({ booking }) {
  const history = booking.rescheduleHistory ?? [];
  const lastMove = history[history.length - 1];
  const isCancelled = booking.status === BOOKING_STATUS.CANCELLED;

  return (
    <li className="space-y-2 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium">{booking.customer?.name ?? "Customer"}</p>
          <p className="text-sm text-gray-500">
            {formatSlotTime(booking.startTime)} · 60 minutes · {booking.mode}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {lastMove && (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Rescheduled {booking.rescheduleCount} {booking.rescheduleCount === 1 ? "time" : "times"}.
          Latest change: moved from {formatSlotTime(lastMove.previousStartTime)}.
        </p>
      )}

      {isCancelled && booking.cancellation && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-800">
          Cancelled by the customer on {formatSlotTime(booking.cancellation.cancelledAt)}.
          {booking.cancellation.reason ? ` Reason: ${booking.cancellation.reason}` : ""}
        </p>
      )}
    </li>
  );
}