import { formatPaise } from "../../../shared/utils/formatters";
import Button from "../../../shared/components/ui/Button";

export default function PlanCard({ plan, buying, disabled, onBuy }) {
  const perSession = Math.round(plan.price / plan.sessions);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="font-medium">{plan.name}</h3>
      <p className="mt-1 text-2xl font-semibold">{formatPaise(plan.price)}</p>
      <p className="text-sm text-gray-500">
        {plan.sessions} sessions · about {formatPaise(perSession)} each
      </p>
      <Button className="mt-3 w-full" loading={buying} disabled={disabled} onClick={() => onBuy(plan)}>
        Buy (sandbox payment)
      </Button>
    </div>
  );
}