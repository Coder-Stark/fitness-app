import { formatPaise } from "../../../shared/utils/formatters";

export default function PriceBreakdown({ quote }) {
  const { isPeak, peakWindow, base, commissionPercent, commission, total } = quote;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Price breakdown</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            isPeak ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
          }`}
        >
          {isPeak ? "Peak slot" : "Normal slot"}
        </span>
      </div>

      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>Session price</dt>
          <dd>{formatPaise(base)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Society commission ({commissionPercent}%)</dt>
          <dd>{formatPaise(commission)}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold">
          <dt>Total payable</dt>
          <dd>{formatPaise(total)}</dd>
        </div>
      </dl>

      {isPeak && peakWindow && (
        <p className="mt-3 text-xs text-gray-500">Peak pricing applies from {peakWindow} IST.</p>
      )}
    </div>
  );
}