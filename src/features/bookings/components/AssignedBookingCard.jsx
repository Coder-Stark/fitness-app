import { useState } from "react";
import { BOOKING_STATUS } from "../../../shared/constants/bookings";
import { formatSlotTime, formatTime } from "../../../shared/utils/formatters";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import LivePhaseBadge from "../../sessions/components/LivePhaseBadge";
import SessionTimer from "../../sessions/components/SessionTimer";
import StartSessionButton from "../../sessions/components/StartSessionButton";
import TrainerSessionPanel from "../../session-records/components/TrainerSessionPanel";

export default function AssignedBookingCard({ booking, onChanged }) {
  const history = booking.rescheduleHistory ?? [];
  const lastMove = history[history.length - 1];
  const isCancelled = booking.status === BOOKING_STATUS.CANCELLED;
  const isConfirmed = booking.status === BOOKING_STATUS.CONFIRMED;
  const isRunning = booking.status === BOOKING_STATUS.IN_PROGRESS;
  const [panelOpen, setPanelOpen] = useState(false);
  // The server works out the phase from the timer, so a session that has just ended counts as complete
  const isFinished = booking.phase === "completed";

  return (
    <li className="space-y-2 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium">{booking.customer?.name ?? "Customer"}</p>
          <p className="text-sm text-gray-500">
            {formatSlotTime(booking.startTime)} · 60 minutes · {booking.mode}
          </p>
        </div>
        {isRunning ? <LivePhaseBadge booking={booking} /> : <StatusBadge status={booking.phase} />}
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

      {isConfirmed && <StartSessionButton booking={booking} onStarted={onChanged} />}

      {isRunning && booking.timer && (
        <SessionTimer booking={booking} role="trainer" onFinished={onChanged} />
      )}

      {isFinished && booking.timer && (
        <p className="rounded-md bg-green-50 px-3 py-2 text-xs text-green-800">
          Session ran from {formatTime(booking.timer.startedAt)} to{" "}
          {formatTime(booking.timer.endsAt)} IST.
        </p>
      )}

      {!isCancelled && (
        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          className="text-sm text-gray-600 underline"
        >
          {panelOpen ? "Hide details" : isFinished ? "Session notes" : "Customer's assessment"}
        </button>
      )}

      {panelOpen && <TrainerSessionPanel bookingId={booking.id} />}
    </li>
  );
}