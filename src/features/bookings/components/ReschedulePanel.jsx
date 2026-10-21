import { useEffect, useMemo, useRef, useState } from "react";
import { BOOKING_RULES } from "../../../shared/constants/bookings";
import { PAYMENT_METHODS } from "../../../shared/constants/payments";
import { getUpcomingDateKeys } from "../../../shared/utils/dates";
import { getErrorMessage } from "../../../shared/utils/errors";
import { formatSlotTime } from "../../../shared/utils/formatters";
import Button from "../../../shared/components/ui/Button";
import Spinner from "../../../shared/components/ui/Spinner";
import { fetchSlots } from "../../booking/api/booking.api";
import DateStrip from "../../booking/components/DateStrip";
import NoTrainerNotice from "../../booking/components/NoTrainerNotice";
import SlotGrid from "../../booking/components/SlotGrid";
import TrainerSelect from "../../booking/components/TrainerSelect";
import { rescheduleBooking } from "../api/bookings.api";

export default function ReschedulePanel({ booking, onClose, onDone }) {
  const dateKeys = useMemo(() => getUpcomingDateKeys(7), []);
  const [dateKey, setDateKey] = useState(dateKeys[0]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selected, setSelected] = useState(null);
  const [preferred, setPreferred] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [noTrainer, setNoTrainer] = useState(null);
  const inFlight = useRef(false);

  const isCard = booking.payment?.method !== PAYMENT_METHODS.PACKAGE;
  const currentStart = new Date(booking.startTime).getTime();
  const priceType = booking.price.slotType;
  const reschedulesLeft = BOOKING_RULES.maxReschedules - booking.rescheduleCount;

  // Card sessions keep the price they paid, so only slots of the same price type are offered
  const isOffered = (slot) =>
    new Date(slot.startTime).getTime() !== currentStart &&
    (!isCard || slot.price.slotType === priceType);

  const visibleSlots = slots.filter(isOffered);

  useEffect(() => {
    let cancelled = false;

    fetchSlots(dateKey)
      .then((data) => {
        if (!cancelled) setSlots(data.slots);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(getErrorMessage(err));
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
    setNoTrainer(null);
    setSubmitError("");
    setLoadError("");
    setLoading(true);
  }

  function handleSelectSlot(slot) {
    setSelected(slot);
    setPreferred("");
    setNoTrainer(null);
    setSubmitError("");
  }

  async function handleConfirm() {
    if (inFlight.current || !selected) return;
    inFlight.current = true;
    setSubmitting(true);
    setSubmitError("");
    setNoTrainer(null);

    try {
      const result = await rescheduleBooking(booking.id, selected.startTime, preferred);
      onDone(result);
    } catch (err) {
      const data = err.response?.data;
      if (data?.details?.code === "NO_TRAINER_AVAILABLE") {
        setNoTrainer({
          message: data.message,
          alternatives: (data.details.alternatives ?? []).filter(isOffered),
        });
        setSelected(null);
      } else {
        setSubmitError(getErrorMessage(err));
      }
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Choose a new time</h3>
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="text-sm text-gray-500 underline"
        >
          Close
        </button>
      </div>

      <p className="text-xs text-gray-500">
        {isCard
          ? `Paid by card: you can move to a ${priceType} slot (same price). `
          : "Package session: you can move to any slot. "}
        Moving a session costs nothing extra. You can reschedule it {reschedulesLeft} more{" "}
        {reschedulesLeft === 1 ? "time" : "times"}.
      </p>

      <DateStrip dateKeys={dateKeys} value={dateKey} onChange={handleDateChange} />

      {loading && <Spinner />}

      {loadError && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {loadError}
        </p>
      )}

      {!loading && !loadError && visibleSlots.length === 0 && (
        <p className="rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
          No matching free slots on this day. Try another date.
        </p>
      )}

      {!loading && visibleSlots.length > 0 && (
        <SlotGrid
          slots={visibleSlots}
          selectedStart={selected?.startTime}
          onSelect={handleSelectSlot}
        />
      )}

      {noTrainer && (
        <NoTrainerNotice
          message={noTrainer.message}
          alternatives={noTrainer.alternatives}
          onPick={handleSelectSlot}
        />
      )}

      {selected && (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm">
            <span className="text-gray-500">New time: </span>
            <strong>{formatSlotTime(selected.startTime)}</strong>
          </p>

          <TrainerSelect
            trainers={selected.availableTrainers}
            value={preferred}
            onChange={setPreferred}
            autoLabel="Keep my current trainer if available"
            help="Your current trainer is kept when free. Otherwise the nearest available trainer is assigned."
          />

          {submitError && (
            <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <Button loading={submitting} onClick={handleConfirm}>
            Confirm new time
          </Button>
        </div>
      )}
    </div>
  );
}