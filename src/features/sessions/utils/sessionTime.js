import { BOOKING_STATUS } from "../../../shared/constants/bookings";
import { SESSION_RULES } from "../../../shared/constants/sessions";

const MINUTE_MS = 60_000;

// Same rule as the server: the phase comes from the saved timestamps and the current
// server time, so it stays right between polls.
export function deriveLivePhase(booking, nowMs) {
  if (booking.status === BOOKING_STATUS.CANCELLED) return "cancelled";
  if (booking.status === BOOKING_STATUS.COMPLETED) return "completed";

  if (booking.status === BOOKING_STATUS.IN_PROGRESS && booking.timer) {
    if (nowMs >= Date.parse(booking.timer.endsAt)) return "completed";
    if (nowMs >= Date.parse(booking.timer.warningAt)) return "ending_soon";
    return "in_progress";
  }

  return "scheduled";
}

export const getRemainingSeconds = (endsAtIso, nowMs) =>
  Math.max(0, Math.ceil((Date.parse(endsAtIso) - nowMs) / 1000));

export function getProgress(startedAtIso, endsAtIso, nowMs) {
  const start = Date.parse(startedAtIso);
  const end = Date.parse(endsAtIso);
  return Math.min(1, Math.max(0, (nowMs - start) / (end - start)));
}

export function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getStartWindow(startTimeIso) {
  const start = Date.parse(startTimeIso);
  return {
    opensAt: start - SESSION_RULES.startWindowBeforeMinutes * MINUTE_MS,
    closesAt: start + SESSION_RULES.startWindowAfterMinutes * MINUTE_MS,
  };
}