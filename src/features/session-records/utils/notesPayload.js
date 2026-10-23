const LIMITS = {
  sets: { min: 1, max: 20, label: "Sets" },
  reps: { min: 1, max: 200, label: "Reps" },
  durationMinutes: { min: 1, max: 120, label: "Minutes" },
};

export const MAX_EXERCISES = 20;

// Turns the form into the request body, or explains what to fix. Blank rows are ignored.
export function buildNotesPayload({ rows, notes, suggestedNextWorkout }) {
  const exercises = [];

  for (const [index, row] of rows.entries()) {
    const name = row.name.trim();
    const hasNumbers = Object.keys(LIMITS).some((field) => row[field] !== "");
    if (!name && !hasNumbers) continue;

    if (name.length < 2) {
      return { error: `Exercise ${index + 1}: enter a name (at least 2 characters).` };
    }

    const exercise = { name };
    for (const [field, { min, max, label }] of Object.entries(LIMITS)) {
      if (row[field] === "") continue;

      const value = Number(row[field]);
      if (!Number.isInteger(value) || value < min || value > max) {
        return {
          error: `Exercise ${index + 1}: ${label} must be a whole number between ${min} and ${max}.`,
        };
      }
      exercise[field] = value;
    }
    exercises.push(exercise);
  }

  if (exercises.length === 0) return { error: "Add at least one exercise or activity." };

  const next = suggestedNextWorkout.trim();
  if (next.length < 3) return { error: "Suggest what the next workout should be." };

  return { payload: { exercises, notes: notes.trim(), suggestedNextWorkout: next } };
}