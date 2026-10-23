import { describeExercise } from "../utils/exercise";

export default function TrainerNotesView({ notes }) {
  return (
    <div className="space-y-2 text-sm">
      <ul className="space-y-1">
        {notes.exercises.map((exercise, index) => (
          <li key={`${exercise.name}-${index}`} className="flex justify-between gap-3">
            <span>{exercise.name}</span>
            <span className="text-gray-500">{describeExercise(exercise)}</span>
          </li>
        ))}
      </ul>

      {notes.notes && (
        <p>
          <span className="text-gray-500">Trainer notes: </span>
          {notes.notes}
        </p>
      )}

      <p className="rounded-md bg-blue-50 px-3 py-2 text-blue-900">
        <span className="font-medium">Suggested next workout: </span>
        {notes.suggestedNextWorkout}
      </p>
    </div>
  );
}