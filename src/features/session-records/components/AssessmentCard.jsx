import {
  EQUIPMENT,
  GOALS,
  INTENSITIES,
  LEVELS,
  WORKOUT_TYPES,
  labelOf,
  labelsOf,
} from "../../../shared/constants/fitness";

export default function AssessmentCard({ profile }) {
  if (!profile) {
    return (
      <p className="rounded-md border border-dashed border-gray-300 bg-white p-3 text-sm text-gray-500">
        This customer hasn't completed their fitness assessment yet.
      </p>
    );
  }

  const rows = [
    ["Age", `${profile.age} years`],
    ["Weight", `${profile.weightKg} kg`],
    ["Goals", labelsOf(GOALS, profile.goals).join(", ")],
    ["Level", labelOf(LEVELS, profile.level)],
    ["Workout types", labelsOf(WORKOUT_TYPES, profile.preferences.workoutTypes).join(", ")],
    ["Intensity", labelOf(INTENSITIES, profile.preferences.intensity)],
    ["Equipment", labelOf(EQUIPMENT, profile.preferences.equipment)],
  ];

  return (
    <div className="space-y-2 rounded-md border border-gray-200 bg-white p-3">
      <h4 className="text-sm font-medium">Customer's fitness assessment</h4>
      <dl className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="inline text-gray-500">{label}: </dt>
            <dd className="inline">{value}</dd>
          </div>
        ))}
      </dl>
      {profile.preferences.healthNotes && (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <span className="font-medium">Health notes: </span>
          {profile.preferences.healthNotes}
        </p>
      )}
    </div>
  );
}