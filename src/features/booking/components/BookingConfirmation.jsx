import { Link } from "react-router-dom";
import { formatSlotTime } from "../../../shared/utils/formatters";
import Button from "../../../shared/components/ui/Button";
import PriceBreakdown from "../../pricing/components/PriceBreakdown";

export default function BookingConfirmation({ booking, onBookAnother }) {
  const { trainer, assignment, price, startTime, mode } = booking;
  const preferredMissed = assignment.preferredTrainer && !assignment.preferredHonoured;

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-green-50 p-4">
        <h2 className="font-semibold text-green-800">Booking confirmed</h2>
        <p className="text-sm text-green-700">
          {formatSlotTime(startTime)} · {mode} session
        </p>
      </div>

      <div className="space-y-1 rounded-lg border border-gray-200 bg-white p-4 text-sm">
        <p>
          <span className="text-gray-500">Trainer: </span>
          <strong>{trainer?.name}</strong>
        </p>
        <p className="text-gray-500">{assignment.summary}</p>
        {preferredMissed && (
          <p className="rounded-md bg-amber-50 px-3 py-2 text-amber-800">
            Your preferred trainer wasn't available, so the nearest trainer was assigned.
          </p>
        )}
      </div>

      <PriceBreakdown quote={price} />

      <div className="flex gap-2">
        <Button variant="secondary" onClick={onBookAnother}>
          Book another
        </Button>
        <Link
          to="/customer"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}