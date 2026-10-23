import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../shared/components/ui/Button";
import Spinner from "../../../shared/components/ui/Spinner";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchMyAvailability, saveMyAvailability } from "../api/availability.api";
import DayScheduleRow from "../components/DayScheduleRow";
import {
  DAY_NAMES,
  DAY_ORDER,
  newRange,
  scheduleToForm,
  serializeForm,
  validateSchedule,
} from "../utils/availabilityForm";

export default function MyAvailability() {
  const [savedSchedule, setSavedSchedule] = useState(null); // what the server has
  const [days, setDays] = useState(null); // what is on screen
  const [loadError, setLoadError] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [notice, setNotice] = useState("");
  const inFlight = useRef(false);

  useEffect(() => {
    let cancelled = false;

    fetchMyAvailability()
      .then((schedule) => {
        if (cancelled) return;
        setSavedSchedule(schedule);
        setDays(scheduleToForm(schedule));
      })
      .catch((err) => {
        if (!cancelled) setLoadError(getErrorMessage(err));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const dirty =
    days !== null &&
    savedSchedule !== null &&
    serializeForm(days) !== serializeForm(scheduleToForm(savedSchedule));
  const hasHours = days !== null && DAY_ORDER.some((day) => days[day].length > 0);

  function changeDay(day, ranges) {
    setDays((prev) => ({ ...prev, [day]: ranges }));
    setErrors((prev) => ({ ...prev, [day]: "" }));
    setSaveError("");
    setNotice("");
  }

  function copyDay(sourceDay) {
    setDays((prev) => {
      const next = { ...prev };
      for (const day of DAY_ORDER) {
        next[day] = prev[sourceDay].map((range) => newRange(range.start, range.end));
      }
      return next;
    });
    setErrors({});
    setSaveError("");
    setNotice("");
  }

  function handleReset() {
    setDays(scheduleToForm(savedSchedule));
    setErrors({});
    setSaveError("");
    setNotice("");
  }

  async function handleSave() {
    if (inFlight.current) return;

    const result = validateSchedule(days);
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) {
      setSaveError("Fix the highlighted days before saving.");
      return;
    }

    inFlight.current = true;
    setSaving(true);
    setSaveError("");
    setNotice("");

    try {
      const schedule = await saveMyAvailability(result.weeklySchedule);
      setSavedSchedule(schedule);
      setDays(scheduleToForm(schedule));
      setNotice(
        "Working hours saved. New bookings will use this schedule. Sessions that are already booked are not changed."
      );
    } catch (err) {
      setSaveError(getErrorMessage(err));
    } finally {
      inFlight.current = false;
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My availability</h1>
        <Link to="/trainer" className="text-sm text-gray-500 underline">
          Back to dashboard
        </Link>
      </div>

      <p className="text-sm text-gray-500">
        Set the hours you can take sessions. Customers can only book you inside these hours. All
        times are India Standard Time (IST). You can add up to 3 ranges per day, for example a
        morning and an evening shift.
      </p>

      {loadError && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {loadError}
        </p>
      )}

      {!days && !loadError && <Spinner />}

      {days && (
        <>
          <ul className="space-y-2">
            {DAY_ORDER.map((day) => (
              <DayScheduleRow
                key={day}
                dayName={DAY_NAMES[day]}
                ranges={days[day]}
                error={errors[day]}
                disabled={saving}
                onChange={(ranges) => changeDay(day, ranges)}
                onCopy={() => copyDay(day)}
              />
            ))}
          </ul>

          {!hasHours && (
            <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
              With no working hours, you won't be assigned any new sessions.
            </p>
          )}

          {saveError && (
            <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {saveError}
            </p>
          )}

          {notice && (
            <p role="status" className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
              {notice}
            </p>
          )}

          <div className="flex gap-2">
            <Button loading={saving} disabled={!dirty} onClick={handleSave}>
              Save working hours
            </Button>
            <Button variant="secondary" disabled={!dirty || saving} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </>
      )}
    </div>
  );
}