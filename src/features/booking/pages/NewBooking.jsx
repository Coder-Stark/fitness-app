import { useState } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../../shared/utils/errors";
import Button from "../../../shared/components/ui/Button";
import { createBooking } from "../api/booking.api";
import BookingConfirmation from "../components/BookingConfirmation";
import BookingReview from "../components/BookingReview";
import InstantPicker from "../components/InstantPicker";
import ModeSelector from "../components/ModeSelector";
import NoTrainerNotice from "../components/NoTrainerNotice";
import ScheduledPicker from "../components/ScheduledPicker";

export default function NewBooking() {
  const [step, setStep] = useState("mode"); // mode | pick | review | noTrainer | done
  const [mode, setMode] = useState(null);
  const [selection, setSelection] = useState(null);
  const [preferredTrainerId, setPreferredTrainerId] = useState("");
  const [booking, setBooking] = useState(null);
  const [noTrainer, setNoTrainer] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setStep("mode");
    setMode(null);
    setSelection(null);
    setPreferredTrainerId("");
    setBooking(null);
    setNoTrainer(null);
    setError("");
  }

  function handleContinue(nextSelection, preferred) {
    setSelection(nextSelection);
    setPreferredTrainerId(preferred);
    setError("");
    setStep("review");
  }

  function handleAlternative(slot) {
    setMode("scheduled");
    handleContinue(
      {
        startTime: slot.startTime,
        endTime: slot.endTime,
        price: slot.price,
        trainers: slot.availableTrainers,
      },
      ""
    );
  }

  async function handleConfirm() {
    setSubmitting(true);
    setError("");

    const payload = mode === "instant" ? { mode } : { mode, startTime: selection.startTime };
    if (preferredTrainerId) payload.preferredTrainerId = preferredTrainerId;

    try {
      setBooking(await createBooking(payload));
      setStep("done");
    } catch (err) {
      const data = err.response?.data;
      if (data?.details?.code === "NO_TRAINER_AVAILABLE") {
        setNoTrainer({ message: data.message, alternatives: data.details.alternatives ?? [] });
        setStep("noTrainer");
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Book a session</h1>
        {step !== "done" && (
          <Link to="/customer" className="text-sm text-gray-500 underline">
            Back to dashboard
          </Link>
        )}
      </div>

      {step === "mode" && (
        <ModeSelector
          onSelect={(nextMode) => {
            setMode(nextMode);
            setStep("pick");
          }}
        />
      )}

      {step === "pick" && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setStep("mode")}
            className="text-sm text-gray-500 underline"
          >
            Change booking type
          </button>
          {mode === "instant" ? (
            <InstantPicker onContinue={handleContinue} onPickAlternative={handleAlternative} />
          ) : (
            <ScheduledPicker onContinue={handleContinue} />
          )}
        </div>
      )}

      {step === "review" && (
        <BookingReview
          mode={mode}
          selection={selection}
          preferredTrainerId={preferredTrainerId}
          submitting={submitting}
          error={error}
          onConfirm={handleConfirm}
          onBack={() => setStep("pick")}
        />
      )}

      {step === "noTrainer" && (
        <div className="space-y-4">
          <NoTrainerNotice
            message={noTrainer.message}
            alternatives={noTrainer.alternatives}
            onPick={handleAlternative}
          />
          <Button variant="secondary" onClick={() => setStep("pick")}>
            Choose another time
          </Button>
        </div>
      )}

      {step === "done" && <BookingConfirmation booking={booking} onBookAnother={reset} />}
    </div>
  );
}