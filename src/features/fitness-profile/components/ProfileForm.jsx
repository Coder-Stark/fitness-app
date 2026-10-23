import { useState } from "react";
import {
  EQUIPMENT,
  FITNESS_LIMITS,
  GOALS,
  INTENSITIES,
  LEVELS,
  WORKOUT_TYPES,
} from "../../../shared/constants/fitness";
import Button from "../../../shared/components/ui/Button";
import { toFormState, validateProfileForm } from "../utils/profileForm";

const inputClass =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none";

function FieldError({ message }) {
  return message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;
}

function OptionGroup({ legend, hint, type, name, options, selected, max, disabled, onChange, error }) {
  const isCheckbox = type === "checkbox";

  return (
    <fieldset disabled={disabled}>
      <legend className="text-sm font-medium">{legend}</legend>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = isCheckbox ? selected.includes(option.value) : selected === option.value;
          const blocked = isCheckbox && !checked && selected.length >= max;

          return (
            <label
              key={option.value}
              className={`flex items-center rounded-md border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-gray-400 ${
                checked ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white"
              } ${blocked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              <input
                type={type}
                name={name}
                className="sr-only"
                checked={checked}
                disabled={blocked}
                onChange={() => onChange(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      <FieldError message={error} />
    </fieldset>
  );
}

export default function ProfileForm({ initialProfile, submitting, error, onSubmit }) {
  const [form, setForm] = useState(() => toFormState(initialProfile));
  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggle = (field, value, max) =>
    setForm((prev) => {
      const list = prev[field];
      if (list.includes(value)) return { ...prev, [field]: list.filter((item) => item !== value) };
      if (list.length >= max) return prev;
      return { ...prev, [field]: [...list, value] };
    });

  function handleSubmit(event) {
    event.preventDefault();
    const result = validateProfileForm(form);
    setErrors(result.errors);
    if (result.payload) onSubmit(result.payload);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Age
          <input
            type="number"
            inputMode="numeric"
            value={form.age}
            onChange={(event) => update("age", event.target.value)}
            disabled={submitting}
            className={inputClass}
          />
          <FieldError message={errors.age} />
        </label>

        <label className="block text-sm font-medium">
          Weight (kg)
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            value={form.weightKg}
            onChange={(event) => update("weightKg", event.target.value)}
            disabled={submitting}
            className={inputClass}
          />
          <FieldError message={errors.weightKg} />
        </label>
      </div>

      <OptionGroup
        legend="Fitness goals"
        hint="Choose up to 3."
        type="checkbox"
        name="goals"
        options={GOALS}
        selected={form.goals}
        max={FITNESS_LIMITS.goals.max}
        disabled={submitting}
        onChange={(value) => toggle("goals", value, FITNESS_LIMITS.goals.max)}
        error={errors.goals}
      />

      <OptionGroup
        legend="Fitness level"
        type="radio"
        name="level"
        options={LEVELS}
        selected={form.level}
        disabled={submitting}
        onChange={(value) => update("level", value)}
        error={errors.level}
      />

      <OptionGroup
        legend="Workout types you enjoy"
        hint="Choose up to 4."
        type="checkbox"
        name="workoutTypes"
        options={WORKOUT_TYPES}
        selected={form.workoutTypes}
        max={FITNESS_LIMITS.workoutTypes.max}
        disabled={submitting}
        onChange={(value) => toggle("workoutTypes", value, FITNESS_LIMITS.workoutTypes.max)}
        error={errors.workoutTypes}
      />

      <OptionGroup
        legend="Preferred intensity"
        type="radio"
        name="intensity"
        options={INTENSITIES}
        selected={form.intensity}
        disabled={submitting}
        onChange={(value) => update("intensity", value)}
        error={errors.intensity}
      />

      <label className="block text-sm font-medium">
        Equipment you can use
        <select
          value={form.equipment}
          onChange={(event) => update("equipment", event.target.value)}
          disabled={submitting}
          className={`${inputClass} bg-white`}
        >
          <option value="">Select...</option>
          {EQUIPMENT.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError message={errors.equipment} />
      </label>

      <label className="block text-sm font-medium">
        Injuries or health notes (optional)
        <textarea
          rows={3}
          value={form.healthNotes}
          onChange={(event) => update("healthNotes", event.target.value)}
          disabled={submitting}
          className={inputClass}
        />
        <span className="mt-1 flex justify-between text-xs font-normal text-gray-500">
          <span>Your trainer sees this before your session.</span>
          <span>
            {form.healthNotes.length}/{FITNESS_LIMITS.healthNotesMax}
          </span>
        </span>
        <FieldError message={errors.healthNotes} />
      </label>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" loading={submitting}>
        Save profile
      </Button>
    </form>
  );
}