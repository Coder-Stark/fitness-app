import { formatPaise, formatSlotTime, formatTime } from "../../../shared/utils/formatters";
import { PAYMENT_METHODS } from "../../../shared/constants/payments";
import Button from "../../../shared/components/ui/Button";
import PriceBreakdown from "../../pricing/components/PriceBreakdown";
import PaymentMethodSelect from "./PaymentMethodSelect";

export default function BookingReview({
  mode,
  selection,
  preferredTrainerId,
  paymentMethod,
  onPaymentChange,
  sessionsRemaining,
  simulateDecline,
  onSimulateDeclineChange,
  submitting,
  error,
  onConfirm,
  onBack,
}) {
  const preferred = selection.trainers.find((trainer) => trainer.id === preferredTrainerId);
  const isPackage = paymentMethod === PAYMENT_METHODS.PACKAGE;

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

      <PaymentMethodSelect
        value={paymentMethod}
        onChange={onPaymentChange}
        sessionsRemaining={sessionsRemaining}
        total={selection.price.total}
        disabled={submitting}
      />

      {!isPackage && (
        <label className="flex items-center gap-2 text-xs text-gray-500">
          <input
            type="checkbox"
            checked={simulateDecline}
            onChange={(event) => onSimulateDeclineChange(event.target.checked)}
            disabled={submitting}
          />
          Simulate a declined card (sandbox testing only)
        </label>
      )}

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
          {isPackage
            ? "Confirm with 1 package session"
            : `Pay ${formatPaise(selection.price.total)}`}
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        Sandbox payment: no real money is charged. The amount is calculated by the server.
      </p>
    </div>
  );
}