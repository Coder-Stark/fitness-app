import { Fragment, useState } from "react";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { formatPaise, formatSlotTime, formatTime } from "../../../shared/utils/formatters";
import { describePayment } from "../../bookings/utils/bookingStatus";

const STRATEGY_LABELS = {
  nearest_available: "Nearest available trainer",
  preferred_trainer: "Customer's preferred trainer",
  kept_current_trainer: "Kept the current trainer (reschedule)",
};

const TIE_LABELS = { least_busy: "least busy trainer", trainer_id: "trainer id" };

const PAYMENT_STATUS_LABELS = {
  paid: "Paid",
  refunded: "Refunded",
  not_refunded: "Not refunded",
};

const OUTCOME_LABELS = {
  session_restored: "Session returned to the package",
  amount_refunded: "Amount refunded",
  no_refund: "No refund (late cancellation)",
};

export default function AdminBookingRow({ booking }) {
  const [open, setOpen] = useState(false);
  const { assignment, price, payment, cancellation, timer } = booking;

  return (
    <Fragment>
      <tr className="border-b border-gray-100 align-top">
        <td className="px-4 py-3">
          {formatSlotTime(booking.startTime)}
          <span className="block text-xs text-gray-500">{booking.mode}</span>
        </td>
        <td className="px-4 py-3">{booking.customer?.name ?? "Unknown"}</td>
        <td className="px-4 py-3">{booking.trainer?.name ?? "Unassigned"}</td>
        <td className="px-4 py-3">{booking.zone?.name ?? "Unknown"}</td>
        <td className="px-4 py-3">
          <StatusBadge status={booking.phase} />
          {booking.rescheduleCount > 0 && (
            <span className="mt-1 block text-xs text-amber-700">
              Rescheduled {booking.rescheduleCount}×
            </span>
          )}
        </td>
        <td className="px-4 py-3">
          {formatPaise(price.total)}
          {price.isPeak && (
            <span className="ml-1 rounded bg-orange-100 px-1.5 text-xs text-orange-700">Peak</span>
          )}
        </td>
        <td className="px-4 py-3">{describePayment(booking)}</td>
        <td className="px-4 py-3">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="text-sm underline"
          >
            {open ? "Hide" : "Details"}
          </button>
        </td>
      </tr>

      {open && (
        <tr className="border-b border-gray-100 bg-gray-50">
          <td colSpan={COLUMN_COUNT} className="px-4 py-3">
            <div className="grid gap-4 text-sm sm:grid-cols-3">
              <div className="space-y-1">
                <h4 className="font-medium">Why this trainer</h4>
                <p>{STRATEGY_LABELS[assignment.strategy] ?? assignment.strategy}</p>
                <p className="text-gray-600">{assignment.summary}</p>
                <p className="text-gray-500">
                  Eligible trainers: {assignment.eligibleCount} · Distance: {assignment.distanceKm} km
                  · Trainer's other sessions that day: {assignment.dailyLoad}
                </p>
                {assignment.tieBreaker && (
                  <p className="text-gray-500">
                    Tie broken by {TIE_LABELS[assignment.tieBreaker] ?? assignment.tieBreaker}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="font-medium">Price applied</h4>
                <p>
                  {price.isPeak ? `Peak slot (${price.peakWindow} IST)` : "Normal slot"}
                </p>
                <p className="text-gray-600">Session price: {formatPaise(price.base)}</p>
                <p className="text-gray-600">
                  Society commission ({price.commissionPercent}%): {formatPaise(price.commission)}
                </p>
                <p className="font-medium">Total: {formatPaise(price.total)}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-medium">Payment and status</h4>
                <p>{describePayment(booking)}</p>
                <p className="text-gray-600">
                  Payment status: {PAYMENT_STATUS_LABELS[payment?.status] ?? "Unknown"}
                </p>
                {timer && (
                  <p className="text-gray-600">
                    Session ran {formatTime(timer.startedAt)} to {formatTime(timer.endsAt)} IST
                  </p>
                )}
                {cancellation && (
                  <p className="text-red-700">
                    Cancelled: {OUTCOME_LABELS[cancellation.outcome] ?? cancellation.outcome}
                    {cancellation.reason ? ` (reason: ${cancellation.reason})` : ""}
                  </p>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </Fragment>
  );
}

const COLUMN_COUNT = 8;