import { useEffect, useState } from "react";
import { formatPaise, formatTime } from "../../../shared/utils/formatters";
import { getErrorMessage } from "../../../shared/utils/errors";
import Button from "../../../shared/components/ui/Button";
import Spinner from "../../../shared/components/ui/Spinner";
import { fetchInstantOffer } from "../api/booking.api";
import NoTrainerNotice from "./NoTrainerNotice";
import TrainerSelect from "./TrainerSelect";

export default function InstantPicker({ onContinue, onPickAlternative }) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preferred, setPreferred] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchInstantOffer()
      .then((data) => {
        if (!cancelled) setOffer(data);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (!offer.available) {
    return (
      <NoTrainerNotice
        message="No trainer is available right now."
        alternatives={offer.alternatives ?? []}
        onPick={onPickAlternative}
      />
    );
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <p className="text-sm text-gray-500">Your trainer can start around</p>
        <p className="text-2xl font-semibold">{formatTime(offer.startTime)} IST</p>
        <p className="text-sm text-gray-500">Total {formatPaise(offer.price.total)}</p>
      </div>

      <TrainerSelect trainers={offer.availableTrainers} value={preferred} onChange={setPreferred} />

      <Button
        onClick={() =>
          onContinue(
            {
              startTime: offer.startTime,
              endTime: offer.endTime,
              price: offer.price,
              trainers: offer.availableTrainers,
            },
            preferred
          )
        }
      >
        Continue to price
      </Button>
    </div>
  );
}