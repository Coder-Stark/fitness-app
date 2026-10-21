import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PAYMENT_METHODS } from "../../../shared/constants/payments";
import { getErrorMessage } from "../../../shared/utils/errors";
import { newIdempotencyKey } from "../../../shared/utils/idempotency";
import Button from "../../../shared/components/ui/Button";
import { usePackageSummary } from "../../packages/hooks/usePackageSummary";
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
  const [replayed, setReplayed] = useState(false);
  const [paymentChoice, setPaymentChoice] = useState(null);
  const [simulateDecline, setSimulateDecline] = useState(false);

  const { data: packageData, reload: reloadPackages } = usePackageSummary();
  const sessionsRemaining = packageData ? packageData.summary.sessionsRemaining : null;
  const packageUsable = sessionsRemaining > 0;
  // The package is the default when it has balance. Only an explicit card choice overrides it.
  const paymentMethod =
    paymentChoice === PAYMENT_METHODS.SANDBOX_CARD || !packageUsable
      ? PAYMENT_METHODS.SANDBOX_CARD
      : PAYMENT_METHODS.PACKAGE;

  // One key per checkout attempt. Retries of the same attempt reuse it, so the server can
  // spot duplicates. It is replaced whenever the request itself changes.
  const idempotencyKey = useRef(null);
  const inFlight = useRef(false);

  function reset() {
    setStep("mode");
    setMode(null);
    setSelection(null);
    setPreferredTrainerId("");
    setBooking(null);
    setNoTrainer(null);
    setError("");
    setReplayed(false);
    setPaymentChoice(null);
    setSimulateDecline(false);
    idempotencyKey.current = null;
  }

  function handleContinue(nextSelection, preferred) {
    setSelection(nextSelection);
    setPreferredTrainerId(preferred);
    setError("");
    idempotencyKey.current = null;
    reloadPackages();
    setStep("review");
  }

  function handlePaymentChange(method) {
    setPaymentChoice(method);
    idempotencyKey.current = null;
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
    if (inFlight.current) return;
    inFlight.current = true;
    setSubmitting(true);
    setError("");

    idempotencyKey.current ??= newIdempotencyKey();

    const payload = { mode, paymentMethod };
    if (mode === "scheduled") payload.startTime = selection.startTime;
    if (preferredTrainerId) payload.preferredTrainerId = preferredTrainerId;
    if (paymentMethod === PAYMENT_METHODS.SANDBOX_CARD && simulateDecline) {
      payload.sandboxOutcome = "decline";
    }

    try {
      const result = await createBooking(payload, idempotencyKey.current);
      setBooking(result.booking);
      setReplayed(result.replayed);
      setStep("done");
      reloadPackages();
    } catch (err) {
      const data = err.response?.data;
      if (data?.details?.code === "NO_TRAINER_AVAILABLE") {
        setNoTrainer({ message: data.message, alternatives: data.details.alternatives ?? [] });
        setStep("noTrainer");
      } else {
        if (data?.details?.code === "NO_PACKAGE_BALANCE") reloadPackages();
        setError(getErrorMessage(err));
      }
    } finally {
      inFlight.current = false;
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
          paymentMethod={paymentMethod}
          onPaymentChange={handlePaymentChange}
          sessionsRemaining={sessionsRemaining}
          simulateDecline={simulateDecline}
          onSimulateDeclineChange={setSimulateDecline}
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

      {step === "done" && (
        <BookingConfirmation booking={booking} replayed={replayed} onBookAnother={reset} />
      )}
    </div>
  );
}