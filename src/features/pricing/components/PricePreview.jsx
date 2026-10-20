import { useRef, useState } from "react";
import { fetchQuote } from "../api/pricing.api";
import { getErrorMessage } from "../../../shared/utils/errors";
import { formatSlotTime } from "../../../shared/utils/formatters";
import Spinner from "../../../shared/components/ui/Spinner";
import PriceBreakdown from "./PriceBreakdown";

export default function PricePreview() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const latestRequest = useRef(0);

  async function handleChange(event) {
    const value = event.target.value;
    setError("");

    if (!value) {
      latestRequest.current += 1;
      setQuote(null);
      setLoading(false);
      return;
    }

    const requestId = ++latestRequest.current;
    setLoading(true);

    try {
      const result = await fetchQuote(new Date(value).toISOString());
      if (requestId === latestRequest.current) setQuote(result);
    } catch (err) {
      if (requestId === latestRequest.current) {
        setQuote(null);
        setError(getErrorMessage(err));
      }
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="font-medium">Price preview (temporary)</h2>
      <p className="mt-1 text-sm text-gray-500">
        Pick a date and time to see the server-calculated price. Peak hours are decided in IST.
      </p>

      <input
        type="datetime-local"
        onChange={handleChange}
        className="mt-3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />

      <div className="mt-4">
        {loading && <Spinner />}

        {error && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {quote && !loading && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Slot: {formatSlotTime(quote.slotStart)}</p>
            <PriceBreakdown quote={quote} />
          </div>
        )}
      </div>
    </section>
  );
}