import { formatPaise, formatTime } from "../../../shared/utils/formatters";

export default function SlotGrid({ slots, selectedStart, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {slots.map((slot) => {
        const selected = slot.startTime === selectedStart;
        return (
          <button
            key={slot.startTime}
            type="button"
            onClick={() => onSelect(slot)}
            className={`rounded-md border p-3 text-left text-sm transition ${
              selected
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white hover:border-gray-900"
            }`}
          >
            <span className="block font-medium">{formatTime(slot.startTime)}</span>
            <span className="block text-xs opacity-80">{formatPaise(slot.price.total)}</span>
            {slot.price.isPeak && (
              <span className="mt-1 inline-block rounded bg-orange-100 px-1.5 text-xs text-orange-700">
                Peak
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}