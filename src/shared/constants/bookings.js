export const BOOKING_STATUS = Object.freeze({
  CONFIRMED: "confirmed",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

// Mirrors the server's booking.config.js. These only drive hints and button states:
// the server makes the final decision on every request.
export const BOOKING_RULES = Object.freeze({
  freeCancellationMinutes: 120,
  rescheduleNoticeMinutes: 120,
  maxReschedules: 2,
});