export const GOALS = [
  { value: "weight_loss", label: "Weight loss" },
  { value: "muscle_gain", label: "Muscle gain" },
  { value: "endurance", label: "Endurance" },
  { value: "flexibility", label: "Flexibility" },
  { value: "general_fitness", label: "General fitness" },
  { value: "stress_relief", label: "Stress relief" },
];

export const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const WORKOUT_TYPES = [
  { value: "strength", label: "Strength" },
  { value: "cardio", label: "Cardio" },
  { value: "yoga", label: "Yoga" },
  { value: "hiit", label: "HIIT" },
  { value: "pilates", label: "Pilates" },
  { value: "functional", label: "Functional" },
  { value: "stretching", label: "Stretching" },
];

export const INTENSITIES = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
];

export const EQUIPMENT = [
  { value: "none", label: "No equipment" },
  { value: "basic", label: "Basic (dumbbells, bands)" },
  { value: "full_gym", label: "Full gym" },
];

// Mirrors the server's validation. These only give friendly messages before sending:
// the server checks every request again.
export const FITNESS_LIMITS = Object.freeze({
  age: { min: 16, max: 90 },
  weightKg: { min: 30, max: 300 },
  goals: { min: 1, max: 3 },
  workoutTypes: { min: 1, max: 4 },
  healthNotesMax: 300,
});

export const labelOf = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value;

export const labelsOf = (options, values) => values.map((value) => labelOf(options, value));