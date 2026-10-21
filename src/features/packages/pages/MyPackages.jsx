import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../../shared/utils/errors";
import { newIdempotencyKey } from "../../../shared/utils/idempotency";
import Spinner from "../../../shared/components/ui/Spinner";
import { fetchPlans, purchasePackage } from "../api/package.api";
import PackageList from "../components/PackageList";
import PackageSummaryCard from "../components/PackageSummaryCard";
import PlanCard from "../components/PlanCard";
import { usePackageSummary } from "../hooks/usePackageSummary";

export default function MyPackages() {
  const { data, loading, error, reload } = usePackageSummary();
  const [plans, setPlans] = useState([]);
  const [plansError, setPlansError] = useState("");
  const [buyingCode, setBuyingCode] = useState(null);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text }

  // One key per plan being bought. A retry of a failed purchase reuses it, and it is
  // dropped after a success so the next purchase gets a fresh key.
  const keys = useRef({});
  const inFlight = useRef(false);

  useEffect(() => {
    let cancelled = false;

    fetchPlans()
      .then((list) => {
        if (!cancelled) setPlans(list);
      })
      .catch((err) => {
        if (!cancelled) setPlansError(getErrorMessage(err));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleBuy(plan) {
    if (inFlight.current) return;
    inFlight.current = true;
    setBuyingCode(plan.code);
    setMessage(null);

    keys.current[plan.code] ??= newIdempotencyKey();

    try {
      const result = await purchasePackage(plan.code, keys.current[plan.code]);
      delete keys.current[plan.code];
      setMessage({
        type: "success",
        text: result.replayed
          ? `${plan.name} was already purchased by an earlier request. You were not charged again.`
          : `${plan.name} purchased. ${plan.sessions} sessions added to your balance.`,
      });
      await reload();
    } catch (err) {
      setMessage({ type: "error", text: getErrorMessage(err) });
    } finally {
      inFlight.current = false;
      setBuyingCode(null);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My packages</h1>
        <Link to="/customer" className="text-sm text-gray-500 underline">
          Back to dashboard
        </Link>
      </div>

      {loading && <Spinner />}

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {data && (
        <>
          <PackageSummaryCard summary={data.summary} />
          <section>
            <h2 className="mb-2 font-medium">Your packages</h2>
            <PackageList packages={data.packages} />
          </section>
        </>
      )}

      <section>
        <h2 className="mb-1 font-medium">Buy a package</h2>
        <p className="mb-3 text-sm text-gray-500">
          Prices include the society commission. Sandbox payment: no real money is charged.
        </p>

        {message && (
          <p
            role={message.type === "error" ? "alert" : "status"}
            className={`mb-3 rounded-md px-3 py-2 text-sm ${
              message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </p>
        )}

        {plansError && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {plansError}
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard
              key={plan.code}
              plan={plan}
              buying={buyingCode === plan.code}
              disabled={buyingCode !== null}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </section>
    </div>
  );
}