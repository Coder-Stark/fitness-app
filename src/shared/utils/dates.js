const IST_OFFSET_MS = 330 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const dateLabel = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Asia/Kolkata",
});

// Today and the following days as IST date keys (YYYY-MM-DD)
export function getUpcomingDateKeys(count = 7) {
  const now = Date.now();
  return Array.from({ length: count }, (_, index) =>
    new Date(now + index * DAY_MS + IST_OFFSET_MS).toISOString().slice(0, 10)
  );
}

export const formatDateKey = (dateKey) => dateLabel.format(new Date(`${dateKey}T00:00:00+05:30`));