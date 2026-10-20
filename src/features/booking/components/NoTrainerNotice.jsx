import { formatPaise, formatSlotTime } from "../../../shared/utils/formatters";

export default function NoTrainerNotice({ message, alternatives, onPick }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <p className="font-medium text-amber-900">{message}</p>

      {alternatives.length > 0 ? (
        <>
          <p className="mt-2 text-sm text-amber-800">Next available slots:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {alternatives.map((slot) => (
              <button
                key={slot.startTime}
                type="button"
                onClick={() => onPick(slot)}
                className="rounded-md border border-amber-300 bg-white px-3 py-2 text-sm hover:border-amber-600"
              >
                {formatSlotTime(slot.startTime)} · {formatPaise(slot.price.total)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-2 text-sm text-amber-800">No other slots are open in the next 7 days.</p>
      )}
    </div>
  );
}