import { FITNESS_LIMITS } from "../../../shared/constants/fitness";

export const EMPTY_FORM = {
  age: "",
  weightKg: "",
  goals: [],
  level: "",
  workoutTypes: [],
  intensity: "",
  equipment: "",
  healthNotes: "",
};

export function toFormState(profile) {
  if (!profile) return EMPTY_FORM;

  return {
    age: String(profile.age),
    weightKg: String(profile.weightKg),
    goals: profile.goals,
    level: profile.level,
    workoutTypes: profile.preferences.workoutTypes,
    intensity: profile.preferences.intensity,
    equipment: profile.preferences.equipment,
    healthNotes: profile.preferences.healthNotes ?? "",
  };
}

export function validateProfileForm(form) {
  const errors = {};
  const { age: ageLimit, weightKg: weightLimit, goals: goalLimit } = FITNESS_LIMITS;
  const { workoutTypes: typeLimit, healthNotesMax } = FITNESS_LIMITS;

  const age = Number(form.age);
  if (form.age === "" || !Number.isInteger(age) || age < ageLimit.min || age > ageLimit.max) {
    errors.age = `Enter a whole number between ${ageLimit.min} and ${ageLimit.max}.`;
  }

  const weightKg = Number(form.weightKg);
  if (
    form.weightKg === "" ||
    !Number.isFinite(weightKg) ||
    weightKg < weightLimit.min ||
    weightKg > weightLimit.max
  ) {
    errors.weightKg = `Enter a weight between ${weightLimit.min} and ${weightLimit.max} kg.`;
  }

  if (form.goals.length < goalLimit.min || form.goals.length > goalLimit.max) {
    errors.goals = `Choose ${goalLimit.min} to ${goalLimit.max} goals.`;
  }
  if (!form.level) errors.level = "Choose your fitness level.";

  if (form.workoutTypes.length < typeLimit.min || form.workoutTypes.length > typeLimit.max) {
    errors.workoutTypes = `Choose ${typeLimit.min} to ${typeLimit.max} workout types.`;
  }
  if (!form.intensity) errors.intensity = "Choose how hard you like to train.";
  if (!form.equipment) errors.equipment = "Choose the equipment you have access to.";

  if (form.healthNotes.trim().length > healthNotesMax) {
    errors.healthNotes = `Keep this under ${healthNotesMax} characters.`;
  }

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    payload: {
      age,
      weightKg,
      goals: form.goals,
      level: form.level,
      preferences: {
        workoutTypes: form.workoutTypes,
        intensity: form.intensity,
        equipment: form.equipment,
        healthNotes: form.healthNotes.trim(),
      },
    },
  };
}