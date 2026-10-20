import { useEffect, useMemo, useState } from "react";
import { getUpcomingDateKeys } from "../../../shared/utils/dates";
import { getErrorMessage } from "../../../shared/utils/errors";
import Button from "../../../shared/components/ui/Button";
import Spinner from "../../../shared/components/ui/Spinner";
import { fetchSlots } from "../api/booking.api";
import DateStrip from "./DateStrip";
import SlotGrid from "./SlotGrid";
import TrainerSelect from "./TrainerSelect";

export default function ScheduledPicker({ onContinue }) {
  const dateKeys = useMemo(() => getUpcomingDateKeys(7), []);
  const [dateKey, setDateKey] = useState(dateKeys[0]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [preferred, setPreferred] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchSlots(dateKey)
      .then((data) => {
        if (!cancelled) setSlots(data.slots);
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
  }, [dateKey]);

  function handleDateChange(nextKey) {
    setDateKey(nextKey);
    setSlots([]);
    setSelected(null);
    setPreferred("");
    setError("");
    setLoading(true);
  }

  function handleContinue() {
    onContinue(
      {
        startTime: selected.startTime,
        endTime: selected.endTime,
        price: selected.price,
        trainers: selected.availableTrainers,
      },
      preferred
    );
  }

  return (
    <div className="space-y-4">
      <DateStrip dateKeys={dateKeys} value={dateKey} onChange={handleDateChange} />

      {loading && <Spinner />}

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && slots.length === 0 && (
        <p className="rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
          No trainers are free on this day. Try another date.
        </p>
      )}

      {!loading && slots.length > 0 && (
        <SlotGrid
          slots={slots}
          selectedStart={selected?.startTime}
          onSelect={(slot) => {
            setSelected(slot);
            setPreferred("");
          }}
        />
      )}

      {selected && (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
          <TrainerSelect
            trainers={selected.availableTrainers}
            value={preferred}
            onChange={setPreferred}
          />
          <Button onClick={handleContinue}>Continue to price</Button>
        </div>
      )}
    </div>
  );
}