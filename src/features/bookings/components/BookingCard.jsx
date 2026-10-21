import { useState } from "react";
import { BOOKING_STATUS } from "../../../shared/constants/bookings";
import { formatSlotTime } from "../../../shared/utils/formatters";
import Button from "../../../shared/components/ui/Button";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { canCancel, describeOutcome, describePayment, rescheduleState } from "../utils/bookingStatus";
import CancelPanel from "./CancelPanel";
import ReschedulePanel from "./ReschedulePanel";

export default function BookingCard({ booking, now, onChanged }) {
  const [panel, setPanel] = useState(null); // null | "cancel" | "reschedule"

  const isConfirmed = booking.status === BOOKING_STATUS.CONFIRMED;
  const isCancelled = booking.status === BOOKING_STATUS.CANCELLED;
  const timePassed = isConfirmed && new Date(booking.startTime).getTime() <= now;
  const cancellable = canCancel(booking, now);
  const reschedule = rescheduleState(booking, now);

  function handleCancelled(result) {
    setPanel(null);
    onChanged({
      type: "success",
      text: result.alreadyCancelled
        ? "This session was already cancelled."
        : `Session cancelled. ${describeOutcome(result.booking)}`,
    });
  }

  function handleRescheduled(result) {
    setPanel(null);

    if (result.unchanged) {
      onChanged({ type: "success", text: "Your session was already at that time, so nothing changed." });
      return;
    }

    const name = result.booking.trainer?.name ?? "Your trainer";
    const trainerChanged = result.booking.trainer?.id !== booking.trainer?.id;
    onChanged({
      type: "success",
      text: `Session moved to ${formatSlotTime(result.booking.startTime)}. ${
        trainerChanged ? `Your trainer is now ${name}.` : `${name} is still your trainer.`
      }`,
    });
  }

  return (
    <li className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium">{formatSlotTime(booking.startTime)}</p>
          <p className="text-sm text-gray-500">60 minutes · {booking.mode} session</p>
        </div>
        <div className="flex items-center gap-2">
          {booking.price.isPeak && (
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
              Peak
            </span>
          )}
          {timePassed && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              Time passed
            </span>
          )}
          <StatusBadge status={booking.status} />
        </div>
      </div>

      <dl className="grid gap-1 text-sm sm:grid-cols-2">
        <div>
          <dt className="inline text-gray-500">Trainer: </dt>
          <dd className="inline">{booking.trainer?.name ?? "Unassigned"}</dd>
        </div>
        <div>
          <dt className="inline text-gray-500">Payment: </dt>
          <dd className="inline">{describePayment(booking)}</dd>
        </div>
      </dl>

      {booking.rescheduleCount > 0 && (
        <div className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
          <p className="font-medium">
            Rescheduled {booking.rescheduleCount} {booking.rescheduleCount === 1 ? "time" : "times"}
          </p>
          {booking.rescheduleHistory.map((entry) => (
            <p key={entry.rescheduledAt}>Moved from {formatSlotTime(entry.previousStartTime)}</p>
          ))}
        </div>
      )}

      {isCancelled && booking.cancellation && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-800">
          <p>
            Cancelled on {formatSlotTime(booking.cancellation.cancelledAt)}. {describeOutcome(booking)}
          </p>
          {booking.cancellation.reason && <p>Reason: {booking.cancellation.reason}</p>}
        </div>
      )}

      {isConfirmed && !timePassed && panel === null && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              disabled={!reschedule.allowed}
              onClick={() => setPanel("reschedule")}
            >
              Reschedule
            </Button>
            <Button variant="secondary" disabled={!cancellable} onClick={() => setPanel("cancel")}>
              Cancel session
            </Button>
          </div>
          {reschedule.reason && <p className="text-xs text-gray-500">{reschedule.reason}</p>}
        </div>
      )}

      {panel === "cancel" && (
        <CancelPanel
          booking={booking}
          now={now}
          onClose={() => setPanel(null)}
          onDone={handleCancelled}
        />
      )}

      {panel === "reschedule" && (
        <ReschedulePanel
          booking={booking}
          onClose={() => setPanel(null)}
          onDone={handleRescheduled}
        />
      )}
    </li>
  );
}