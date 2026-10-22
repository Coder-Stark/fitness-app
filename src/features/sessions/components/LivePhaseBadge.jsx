import StatusBadge from "../../../shared/components/ui/StatusBadge";
import { useServerNow } from "../../time/hooks/useServerNow";
import { deriveLivePhase } from "../utils/sessionTime";

export default function LivePhaseBadge({ booking }) {
  const now = useServerNow(1000);

  return <StatusBadge status={deriveLivePhase(booking, now)} />;
}