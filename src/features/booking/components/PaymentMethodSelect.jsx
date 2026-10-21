import { Link } from "react-router-dom";
import { PAYMENT_METHODS } from "../../../shared/constants/payments";
import { formatPaise } from "../../../shared/utils/formatters";

function packageText(sessionsRemaining) {
  if (sessionsRemaining === null) return "Balance not available right now.";
  if (sessionsRemaining === 0) return "No sessions left in your packages.";
  const plural = sessionsRemaining === 1 ? "" : "s";
  return `${sessionsRemaining} session${plural} left. Nothing to pay now.`;
}

export default function PaymentMethodSelect({
  value,
  onChange,
  sessionsRemaining,
  total,
  disabled,
}) {
  const options = [
    {
      method: PAYMENT_METHODS.PACKAGE,
      title: "Use a package session",
      text: packageText(sessionsRemaining),
      unavailable: !(sessionsRemaining > 0),
    },
    {
      method: PAYMENT_METHODS.SANDBOX_CARD,
      title: "Pay by card (sandbox)",
      text: `Pay ${formatPaise(total)} now. No real money moves.`,
      unavailable: false,
    },
  ];

  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="mb-1 text-sm font-medium">Payment method</legend>

      {options.map((option) => (
        <label
          key={option.method}
          className={`flex items-start gap-3 rounded-lg border bg-white p-3 text-sm ${
            value === option.method ? "border-gray-900" : "border-gray-200"
          } ${option.unavailable ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={option.method}
            checked={value === option.method}
            disabled={option.unavailable}
            onChange={() => onChange(option.method)}
            className="mt-1"
          />
          <span>
            <span className="block font-medium">{option.title}</span>
            <span className="block text-gray-500">{option.text}</span>
          </span>
        </label>
      ))}

      {sessionsRemaining === 0 && (
        <Link
          to="/customer/packages"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-500 underline"
        >
          Buy a package (opens in a new tab)
        </Link>
      )}
    </fieldset>
  );
}