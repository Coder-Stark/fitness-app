import { formatPaise, formatSlotTime } from "../../../shared/utils/formatters";

export default function PackageList({ packages }) {
  if (packages.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        You haven't bought a package yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {packages.map((pkg) => {
        const percentUsed = Math.round((pkg.sessionsUsed / pkg.sessionsTotal) * 100);

        return (
          <li key={pkg.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{pkg.planName}</span>
              <span className="text-gray-500">
                {pkg.sessionsRemaining} of {pkg.sessionsTotal} sessions left
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-gray-900" style={{ width: `${percentUsed}%` }} />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Bought {formatSlotTime(pkg.purchasedAt)} · {formatPaise(pkg.pricePaid)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}