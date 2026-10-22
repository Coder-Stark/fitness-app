import { useEffect, useRef } from "react";
import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { formatTime } from "../../../shared/utils/formatters";
import { useServerNow } from "../../time/hooks/useServerNow";
import { useServerTime } from "../../time/hooks/useServerTime";
import { usePhaseBuzzer } from "../hooks/usePhaseBuzzer";
import { playWarningBeep, unlockAudio } from "../utils/audio";
import {
  deriveLivePhase,
  formatClock,
  getProgress,
  getRemainingSeconds,
} from "../utils/sessionTime";

const FINISH_REFRESH_DELAY_MS = 1500;

function describeOffset(offsetMs) {
  const seconds = Math.round(Math.abs(offsetMs) / 1000);
  const amount = seconds >= 120 ? `${Math.round(seconds / 60)} minutes` : `${seconds} seconds`;
  return `${amount} ${offsetMs > 0 ? "behind" : "ahead of"} the server`;
}

export default function SessionTimer({ booking, role, onFinished }) {
  const now = useServerNow(1000);
  const { offsetMs } = useServerTime();
  const isTrainer = role === "trainer";
  const { startedAt, endsAt } = booking.timer;

  const phase = deriveLivePhase(booking, now);
  const remaining = getRemainingSeconds(endsAt, now);
  const progress = getProgress(startedAt, endsAt, now);
  const minutesLeft = Math.ceil(remaining / 60);

  usePhaseBuzzer(phase, isTrainer);

  // Once the end is reached, refresh the list shortly after (once) so the booking moves to
  // Completed. The ref keeps the latest callback without restarting the timeout.
  const onFinishedRef = useRef(onFinished);
  const finishedRef = useRef(false);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  });

  useEffect(() => {
    if (phase !== "completed" || finishedRef.current) return;

    const id = setTimeout(() => {
      finishedRef.current = true;
      onFinishedRef.current?.();
    }, FINISH_REFRESH_DELAY_MS);

    return () => clearTimeout(id);
  }, [phase]);

  function handleTestSound() {
    unlockAudio();
    playWarningBeep();
  }

  const barColor =
    phase === "completed"
      ? "bg-green-600"
      : phase === "ending_soon"
        ? "bg-orange-500"
        : "bg-gray-900";

  let label = isTrainer ? "Time remaining" : "Time left in your session";
  if (phase === "completed") label = "Session complete";

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        <StatusBadge status={phase} />
      </div>

      <p className="text-center font-mono text-5xl font-semibold tabular-nums">
        {formatClock(remaining)}
      </p>

      <div
        className="h-2 rounded-full bg-gray-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className={`h-2 rounded-full transition-all ${barColor}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <p className="text-center text-xs text-gray-500">
        Started {formatTime(startedAt)} · ends {formatTime(endsAt)} IST
      </p>

      {phase === "ending_soon" && (
        <p
          role="alert"
          className="rounded-md bg-orange-100 px-3 py-2 text-sm font-medium text-orange-800"
        >
          {minutesLeft} {minutesLeft === 1 ? "minute" : "minutes"} left.{" "}
          {isTrainer ? "Start wrapping up the workout." : "Your session is almost over."}
        </p>
      )}

      {phase === "completed" && (
        <p
          role="status"
          className="rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-800"
        >
          Session complete. Great work!
        </p>
      )}

      {isTrainer && (
        <button
          type="button"
          onClick={handleTestSound}
          className="text-xs text-gray-500 underline"
        >
          Test buzzer sound
        </button>
      )}

      {Math.abs(offsetMs) > 2000 && (
        <p className="text-xs text-gray-500">
          Your device clock is {describeOffset(offsetMs)}. This timer follows the server's clock.
        </p>
      )}
    </div>
  );
}