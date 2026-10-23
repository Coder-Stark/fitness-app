import { Link } from "react-router-dom";
import {
  GOALS,
  LEVELS,
  WORKOUT_TYPES,
  labelOf,
  labelsOf,
} from "../../../shared/constants/fitness";

export default function ProfileSummaryCard({ profile }) {
  if (profile === undefined) return null;

  return (
    <section className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">My fitness profile</h2>
        <Link to="/customer/profile" className="text-sm text-gray-500 underline">
          {profile ? "Edit" : "Complete now"}
        </Link>
      </div>

      {profile ? (
        <dl className="mt-2 space-y-1 text-sm">
          <div>
            <dt className="inline text-gray-500">Goals: </dt>
            <dd className="inline">{labelsOf(GOALS, profile.goals).join(", ")}</dd>
          </div>
          <div>
            <dt className="inline text-gray-500">Level: </dt>
            <dd className="inline">{labelOf(LEVELS, profile.level)}</dd>
          </div>
          <div>
            <dt className="inline text-gray-500">Workouts: </dt>
            <dd className="inline">
              {labelsOf(WORKOUT_TYPES, profile.preferences.workoutTypes).join(", ")}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-1 text-sm text-gray-500">
          Complete your fitness assessment so your trainer can plan workouts that suit you.
        </p>
      )}
    </section>
  );
}