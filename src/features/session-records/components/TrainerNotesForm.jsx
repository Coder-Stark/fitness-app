import { useRef, useState } from "react";
import Button from "../../../shared/components/ui/Button";
import { getErrorMessage } from "../../../shared/utils/errors";
import { formatSlotTime } from "../../../shared/utils/formatters";
import { saveTrainerNotes } from "../api/sessionRecord.api";
import { buildNotesPayload, MAX_EXERCISES } from "../utils/notesPayload";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none";

let nextRowId = 0;

const newRow = (exercise = {}) => ({
  rowId: ++nextRowId,
  name: exercise.name ?? "",
  sets: exercise.sets ?? "",
  reps: exercise.reps ?? "",
  durationMinutes: exercise.durationMinutes ?? "",
});

export default function TrainerNotesForm({ bookingId, notes, onSaved }) {
  const [rows, setRows] = useState(() =>
    notes?.exercises?.length ? notes.exercises.map((exercise) => newRow(exercise)) : [newRow()]
  );
  const [noteText, setNoteText] = useState(notes?.notes ?? "");
  const [nextWorkout, setNextWorkout] = useState(notes?.suggestedNextWorkout ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const inFlight = useRef(false);

  const updateRow = (rowId, field, value) => {
    setSaved(false);
    setRows((prev) => prev.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row)));
  };

  const addRow = () => setRows((prev) => [...prev, newRow()]);
  const removeRow = (rowId) => setRows((prev) => prev.filter((row) => row.rowId !== rowId));

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current) return;

    const result = buildNotesPayload({
      rows,
      notes: noteText,
      suggestedNextWorkout: nextWorkout,
    });
    if (result.error) {
      setError(result.error);
      setSaved(false);
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setError("");

    try {
      const record = await saveTrainerNotes(bookingId, result.payload);
      onSaved(record);
      setSaved(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <h4 className="text-sm font-medium">Exercises completed</h4>
        <p className="text-xs text-gray-500">Sets, reps and minutes are optional.</p>

        <div className="mt-2 space-y-2">
          {rows.map((row, index) => (
            <div
              key={row.rowId}
              className="grid grid-cols-3 gap-2 sm:grid-cols-[1fr_5rem_5rem_5rem_auto] sm:items-center"
            >
              <input
                type="text"
                aria-label={`Exercise ${index + 1} name`}
                placeholder="Exercise or activity"
                maxLength={80}
                value={row.name}
                disabled={submitting}
                onChange={(event) => updateRow(row.rowId, "name", event.target.value)}
                className={`${inputClass} col-span-3 sm:col-span-1`}
              />
              <input
                type="number"
                aria-label={`Exercise ${index + 1} sets`}
                placeholder="Sets"
                min={1}
                max={20}
                value={row.sets}
                disabled={submitting}
                onChange={(event) => updateRow(row.rowId, "sets", event.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                aria-label={`Exercise ${index + 1} reps`}
                placeholder="Reps"
                min={1}
                max={200}
                value={row.reps}
                disabled={submitting}
                onChange={(event) => updateRow(row.rowId, "reps", event.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                aria-label={`Exercise ${index + 1} minutes`}
                placeholder="Min"
                min={1}
                max={120}
                value={row.durationMinutes}
                disabled={submitting}
                onChange={(event) => updateRow(row.rowId, "durationMinutes", event.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                disabled={rows.length === 1 || submitting}
                onClick={() => removeRow(row.rowId)}
                className="col-span-3 text-sm text-gray-500 underline disabled:no-underline disabled:opacity-40 sm:col-span-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          className="mt-2"
          disabled={rows.length >= MAX_EXERCISES || submitting}
          onClick={addRow}
        >
          Add exercise
        </Button>
      </div>

      <label className="block text-sm font-medium">
        Trainer notes (optional)
        <textarea
          rows={3}
          maxLength={1000}
          value={noteText}
          disabled={submitting}
          onChange={(event) => setNoteText(event.target.value)}
          className={`mt-1 ${inputClass}`}
        />
      </label>

      <label className="block text-sm font-medium">
        Suggested next workout
        <textarea
          rows={2}
          maxLength={500}
          value={nextWorkout}
          disabled={submitting}
          onChange={(event) => setNextWorkout(event.target.value)}
          className={`mt-1 ${inputClass}`}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {saved && (
        <p role="status" className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          Notes saved. The customer can now see them.
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={submitting}>
          {notes ? "Update notes" : "Save notes"}
        </Button>
        {notes?.submittedAt && (
          <span className="text-xs text-gray-500">Last saved {formatSlotTime(notes.submittedAt)}</span>
        )}
      </div>
    </form>
  );
}