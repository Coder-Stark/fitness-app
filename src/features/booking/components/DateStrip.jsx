import { formatDateKey } from "../../../shared/utils/dates";

export default function DateStrip({ dateKeys, value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {dateKeys.map((dateKey) => (
        <button
          key={dateKey}
          type="button"
          onClick={() => onChange(dateKey)}
          className={`shrink-0 rounded-md border px-3 py-2 text-sm transition ${
            dateKey === value
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-300 bg-white hover:border-gray-900"
          }`}
        >
          {formatDateKey(dateKey)}
        </button>
      ))}
    </div>
  );
}