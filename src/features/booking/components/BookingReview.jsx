import { formatSlotTime, formatTime } from "../../../shared/utils/formatters";
import Button from "../../../shared/components/ui/Button";
import PriceBreakdown from "../../pricing/components/PriceBreakdown";

export default function BookingReview({
  mode,
  selection,
  preferredTrainerId,
  submitting,
  error,
  onConfirm,
  onBack,
}) {
  const preferred = selection.trainers.find((trainer) => trainer.id === preferredTrainerId);

  return (
    <div className="space-y-4">
      <div className="space-y-1 rounded-lg border border-gray-200 bg-white p-4 text-sm">
        <p>
          <span className="text-gray-500">When: </span>
          {mode === "instant"
            ? `Around ${formatTime(selection.startTime)} IST (starts within the hour)`
            : formatSlotTime(selection.startTime)}
        </p>
        <p>
          <span className="text-gray-500">Duration: </span>60 minutes
        </p>
        <p>
          <span className="text-gray-500">Trainer: </span>
          {preferred ? `${preferred.name} (preferred)` : "Nearest available trainer (auto-assigned)"}
        </p>
      </div>

      <PriceBreakdown quote={selection.price} />

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button variant="secondary" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button loading={submitting} onClick={onConfirm}>
          Confirm booking
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        Payment is added in the next phase. For now, confirming reserves your slot.
      </p>
    </div>
  );
}