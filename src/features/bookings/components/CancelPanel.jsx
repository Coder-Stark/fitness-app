import { useRef, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errors";
import Button from "../../../shared/components/ui/Button";
import { cancelBooking } from "../api/bookings.api";
import { cancelPreview } from "../utils/bookingStatus";

export default function CancelPanel({ booking, now, onClose, onDone }) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  async function handleConfirm() {
    if (inFlight.current) return;
    inFlight.current = true;
    setSubmitting(true);
    setError("");

    try {
      const result = await cancelBooking(booking.id, reason.trim());
      onDone(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-medium text-red-900">Cancel this session?</p>
      <p className="text-sm text-red-800">{cancelPreview(booking, now)}</p>

      <label className="block text-sm text-red-900">
        Reason (optional)
        <input
          type="text"
          value={reason}
          maxLength={200}
          onChange={(event) => setReason(event.target.value)}
          disabled={submitting}
          className="mt-1 w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
        />
      </label>

      {error && (
        <p role="alert" className="rounded-md bg-white px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button variant="secondary" onClick={onClose} disabled={submitting}>
          Keep session
        </Button>
        <Button loading={submitting} onClick={handleConfirm}>
          Yes, cancel session
        </Button>
      </div>
    </div>
  );
}