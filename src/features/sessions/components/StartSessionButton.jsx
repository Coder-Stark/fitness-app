import { useRef, useState } from "react";
import Button from "../../../shared/components/ui/Button";
import { getErrorMessage } from "../../../shared/utils/errors";
import { formatSlotTime } from "../../../shared/utils/formatters";
import { useServerNow } from "../../time/hooks/useServerNow";
import { startSession } from "../api/session.api";
import { unlockAudio } from "../utils/audio";
import { getStartWindow } from "../utils/sessionTime";

export default function StartSessionButton({ booking, onStarted }) {
  const now = useServerNow(5000);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  const { opensAt, closesAt } = getStartWindow(booking.startTime);
  const tooEarly = now < opensAt;
  const tooLate = now > closesAt;

  let hint = null;
  if (tooEarly) hint = `You can start this session from ${formatSlotTime(opensAt)}.`;
  if (tooLate) hint = "The start window for this session has closed.";

  async function handleStart() {
    if (inFlight.current) return;
    inFlight.current = true;
    setSubmitting(true);
    setError("");

    // This click is the user gesture browsers need before they allow the buzzer to play
    unlockAudio();

    try {
      await startSession(booking.id);
      onStarted();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button loading={submitting} disabled={tooEarly || tooLate} onClick={handleStart}>
        Start session
      </Button>

      {hint && <p className="text-xs text-gray-500">{hint}</p>}

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}