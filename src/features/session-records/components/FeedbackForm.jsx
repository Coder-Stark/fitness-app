import { useRef, useState } from "react";
import Button from "../../../shared/components/ui/Button";
import { getErrorMessage } from "../../../shared/utils/errors";
import { saveFeedback } from "../api/sessionRecord.api";
import StarInput from "./StarInput";

const COMMENT_MAX = 500;

export default function FeedbackForm({ bookingId, initial, onSaved, onCancel }) {
  const [rating, setRating] = useState(initial?.rating ?? 0);
  const [comment, setComment] = useState(initial?.comment ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current) return;

    if (rating < 1) {
      setError("Choose a rating from 1 to 5 stars.");
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setError("");

    try {
      const record = await saveFeedback(bookingId, { rating, comment: comment.trim() });
      onSaved(record);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <StarInput value={rating} onChange={setRating} disabled={submitting} />

      <label className="block text-sm">
        <span className="sr-only">Comment</span>
        <textarea
          rows={3}
          value={comment}
          maxLength={COMMENT_MAX}
          placeholder="How was your session? (optional)"
          onChange={(event) => setComment(event.target.value)}
          disabled={submitting}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
        />
        <span className="block text-right text-xs text-gray-500">
          {comment.length}/{COMMENT_MAX}
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={submitting}>
          Save feedback
        </Button>
      </div>
    </form>
  );
}