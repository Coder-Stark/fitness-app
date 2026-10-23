export function describeExercise(exercise) {
  const parts = [];

  if (exercise.sets && exercise.reps) parts.push(`${exercise.sets} × ${exercise.reps}`);
  else if (exercise.sets) parts.push(`${exercise.sets} sets`);
  else if (exercise.reps) parts.push(`${exercise.reps} reps`);

  if (exercise.durationMinutes) parts.push(`${exercise.durationMinutes} min`);

  return parts.join(" · ");
}