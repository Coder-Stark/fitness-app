import { MAX_RANGES_PER_DAY, newRange } from "../utils/availabilityForm";

const timeClass =
  "rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-gray-900 focus:outline-none";

export default function DayScheduleRow({ dayName, ranges, error, disabled, onChange, onCopy }) {
  const isOff = ranges.length === 0;

  const update = (rowId, field, value) =>
    onChange(ranges.map((range) => (range.rowId === rowId ? { ...range, [field]: value } : range)));

  const remove = (rowId) => onChange(ranges.filter((range) => range.rowId !== rowId));

  return (
    <li className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="flex flex-wrap items-start gap-3">
        <p className="w-28 font-medium">{dayName}</p>

        <div className="flex-1 space-y-2">
          {isOff && <p className="text-sm text-gray-500">Day off</p>}

          {ranges.map((range) => (
            <div key={range.rowId} className="flex flex-wrap items-center gap-2">
              <input
                type="time"
                aria-label={`${dayName} start time`}
                value={range.start}
                disabled={disabled}
                onChange={(event) => update(range.rowId, "start", event.target.value)}
                className={timeClass}
              />
              <span className="text-sm text-gray-500">to</span>
              <input
                type="time"
                aria-label={`${dayName} end time`}
                value={range.end}
                disabled={disabled}
                onChange={(event) => update(range.rowId, "end", event.target.value)}
                className={timeClass}
              />
              <button
                type="button"
                disabled={disabled}
                onClick={() => remove(range.rowId)}
                className="text-sm text-gray-500 underline"
              >
                Remove
              </button>
            </div>
          ))}

          {error && (
            <p role="alert" className="text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-4 text-sm">
        {ranges.length < MAX_RANGES_PER_DAY && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange([...ranges, newRange()])}
            className="underline"
          >
            {isOff ? "Add working hours" : "Add another range"}
          </button>
        )}
        {!isOff && (
          <button type="button" disabled={disabled} onClick={onCopy} className="text-gray-500 underline">
            Copy to all days
          </button>
        )}
      </div>
    </li>
  );
}