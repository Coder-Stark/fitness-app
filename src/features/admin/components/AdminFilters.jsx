const PHASES = [
  { value: "", label: "All statuses" },
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In progress" },
  { value: "ending_soon", label: "Ending soon" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const inputClass =
  "mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-900 focus:outline-none";

export default function AdminFilters({ filters, onChange }) {
  const hasFilters = Boolean(filters.phase || filters.from || filters.to);

  // The two dates always stay in order, so the server never receives from > to
  function handleFrom(event) {
    const from = event.target.value;
    onChange({ ...filters, from, to: filters.to && from > filters.to ? from : filters.to });
  }

  function handleTo(event) {
    const to = event.target.value;
    onChange({ ...filters, to, from: to && filters.from > to ? to : filters.from });
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="block text-sm font-medium">
        Status
        <select
          value={filters.phase}
          onChange={(event) => onChange({ ...filters, phase: event.target.value })}
          className={`block ${inputClass}`}
        >
          {PHASES.map((phase) => (
            <option key={phase.value} value={phase.value}>
              {phase.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium">
        From
        <input
          type="date"
          value={filters.from}
          max={filters.to || undefined}
          onChange={handleFrom}
          className={`block ${inputClass}`}
        />
      </label>

      <label className="block text-sm font-medium">
        To
        <input
          type="date"
          value={filters.to}
          min={filters.from || undefined}
          onChange={handleTo}
          className={`block ${inputClass}`}
        />
      </label>

      {hasFilters && (
        <button
          type="button"
          onClick={() => onChange({ phase: "", from: "", to: "" })}
          className="pb-2 text-sm text-gray-500 underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}