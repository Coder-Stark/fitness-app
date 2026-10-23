// Monday first, because that is how people read a week. The server uses 0 for Sunday.
export const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const MAX_RANGES_PER_DAY = 3;

let nextRowId = 0;

export const newRange = (start = "09:00", end = "17:00") => ({ rowId: ++nextRowId, start, end });

const sortedRanges = (ranges) => [...ranges].sort((a, b) => a.start.localeCompare(b.start));

// The server sends a flat list. The form works with one list of ranges per day.
export function scheduleToForm(weeklySchedule) {
  const days = Object.fromEntries(DAY_ORDER.map((day) => [day, []]));

  for (const item of weeklySchedule) days[item.day].push(newRange(item.start, item.end));
  for (const day of DAY_ORDER) days[day] = sortedRanges(days[day]);

  return days;
}

// Used to tell whether anything changed since the last save (row ids are ignored)
export function serializeForm(days) {
  return JSON.stringify(
    DAY_ORDER.map((day) => sortedRanges(days[day]).map(({ start, end }) => [start, end]))
  );
}

// The same rules as the server: end after start, and no overlaps on one day
export function validateSchedule(days) {
  const errors = {};
  const weeklySchedule = [];

  for (const day of DAY_ORDER) {
    const ranges = sortedRanges(days[day]);

    for (const [index, range] of ranges.entries()) {
      if (!range.start || !range.end) {
        errors[day] = "Enter both a start and an end time.";
        break;
      }
      if (range.start >= range.end) {
        errors[day] = "Each range must end after it starts.";
        break;
      }
      if (index > 0 && range.start < ranges[index - 1].end) {
        errors[day] = "Time ranges on the same day must not overlap.";
        break;
      }
    }

    if (!errors[day]) {
      for (const range of ranges) weeklySchedule.push({ day, start: range.start, end: range.end });
    }
  }

  return { errors, weeklySchedule };
}