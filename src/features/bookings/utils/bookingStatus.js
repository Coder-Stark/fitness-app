import { BOOKING_RULES, BOOKING_STATUS } from "../../../shared/constants/bookings";
import { PAYMENT_METHODS } from "../../../shared/constants/payments";
import { formatPaise } from "../../../shared/utils/formatters";

const MINUTE_MS = 60_000;

export const TABS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

// The server works out the phase from the saved timer, so a session that has just ended
// moves to Completed even before the background worker updates its status
function tabOf(booking) {
  const phase = booking.phase ?? booking.status;
  if (phase === "cancelled") return "cancelled";
  if (phase === "completed") return "completed";
  return "upcoming";
}

export function groupBookings(bookings) {
  const groups = { upcoming: [], completed: [], cancelled: [] };
  for (const booking of bookings) groups[tabOf(booking)].push(booking);

  const soonestFirst = (a, b) => new Date(a.startTime) - new Date(b.startTime);
  const latestFirst = (a, b) => new Date(b.startTime) - new Date(a.startTime);
  groups.upcoming.sort(soonestFirst);
  groups.completed.sort(latestFirst);
  groups.cancelled.sort(latestFirst);

  return groups;
}

const minutesUntilStart = (booking, now) =>
  (new Date(booking.startTime).getTime() - now) / MINUTE_MS;

const hoursText = (minutes) => `${minutes / 60} hours`;

export function describePayment(booking) {
  if (!booking.payment) return "Not available";
  if (booking.payment.method === PAYMENT_METHODS.PACKAGE) return "1 package session";
  return `${formatPaise(booking.payment.amountPaid)} paid by card (sandbox)`;
}

export const canCancel = (booking, now) =>
  booking.status === BOOKING_STATUS.CONFIRMED && minutesUntilStart(booking, now) > 0;

// What would happen if the customer cancelled right now (the server makes the final call)
export function cancelPreview(booking, now) {
  const refundable = minutesUntilStart(booking, now) >= BOOKING_RULES.freeCancellationMinutes;

  if (!refundable) {
    return `This session starts in under ${hoursText(BOOKING_RULES.freeCancellationMinutes)}, so cancelling now gives no refund or package credit.`;
  }
  if (booking.payment?.method === PAYMENT_METHODS.PACKAGE) {
    return "1 session will be returned to your package.";
  }
  return `${formatPaise(booking.payment?.amountPaid ?? 0)} will be refunded (sandbox).`;
}

// What did happen when the booking was cancelled
export function describeOutcome(booking) {
  const outcome = booking.cancellation?.outcome;

  if (outcome === "session_restored") return "1 session was returned to your package.";
  if (outcome === "amount_refunded") {
    return `${formatPaise(booking.payment?.amountPaid ?? 0)} was refunded (sandbox).`;
  }
  return `No refund or package credit (cancelled less than ${hoursText(BOOKING_RULES.freeCancellationMinutes)} before the start).`;
}

export function rescheduleState(booking, now) {
  if (booking.status !== BOOKING_STATUS.CONFIRMED) return { allowed: false, reason: null };

  if (booking.rescheduleCount >= BOOKING_RULES.maxReschedules) {
    return {
      allowed: false,
      reason: `Reschedule limit reached (${BOOKING_RULES.maxReschedules} of ${BOOKING_RULES.maxReschedules} used).`,
    };
  }
  if (minutesUntilStart(booking, now) < BOOKING_RULES.rescheduleNoticeMinutes) {
    return {
      allowed: false,
      reason: `Rescheduling closes ${hoursText(BOOKING_RULES.rescheduleNoticeMinutes)} before the session.`,
    };
  }
  return { allowed: true, reason: null };
}