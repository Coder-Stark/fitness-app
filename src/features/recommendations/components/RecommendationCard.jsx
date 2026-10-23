import { Link } from "react-router-dom";
import Spinner from "../../../shared/components/ui/Spinner";
import { INTENSITIES, WORKOUT_TYPES, labelOf } from "../../../shared/constants/fitness";
import { formatSlotTime } from "../../../shared/utils/formatters";
import { useRecommendation } from "../hooks/useRecommendation";

export default function RecommendationCard() {
  const { data, error, refreshing, reload } = useRecommendation();
  const recommendation = data?.recommendation;

  return (
    <section className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Your next workout plan</h2>
        {recommendation && (
          <button
            type="button"
            onClick={reload}
            disabled={refreshing}
            className="text-sm text-gray-500 underline disabled:no-underline"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {data === undefined && !error && (
        <div className="mt-3">
          <Spinner />
        </div>
      )}

      {data && !recommendation && (
        <p className="mt-1 text-sm text-gray-500">
          Complete your fitness profile to get a workout plan that suits your goals.{" "}
          <Link to="/customer/profile" className="underline">
            Complete profile
          </Link>
        </p>
      )}

      {recommendation && (
        <div className="mt-2 space-y-4">
          <p className="text-sm text-gray-600">{recommendation.focus}</p>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-gray-100 px-2.5 py-1">
              {recommendation.sessionsPerWeek} sessions per week
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-1">
              {labelOf(INTENSITIES, recommendation.intensity)} intensity
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-1">
              {recommendation.setsPerExercise} sets per exercise
            </span>
          </div>

          <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
            {recommendation.exercises.map((item) => (
              <li
                key={item.name}
                className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm"
              >
                <span>
                  {item.name}
                  <span className="ml-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                    {labelOf(WORKOUT_TYPES, item.type)}
                  </span>
                </span>
                <span className="text-gray-500">{item.prescription}</span>
              </li>
            ))}
          </ul>

          {recommendation.trainerSuggestion && (
            <p className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-900">
              <span className="font-medium">Your trainer suggested: </span>
              {recommendation.trainerSuggestion.text}
              <span className="block text-xs text-blue-700">
                From your session on {formatSlotTime(recommendation.trainerSuggestion.fromSession)}
              </span>
            </p>
          )}

          {recommendation.cautions.length > 0 && (
            <ul className="space-y-1 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
              {recommendation.cautions.map((caution) => (
                <li key={caution}>{caution}</li>
              ))}
            </ul>
          )}

          <details className="text-sm">
            <summary className="cursor-pointer font-medium">Why this plan?</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
              {recommendation.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </details>

          <p className="text-xs text-gray-500">
            Based on your assessment and {recommendation.basedOn.completedSessions} completed{" "}
            {recommendation.basedOn.completedSessions === 1 ? "session" : "sessions"}. Timed
            exercises can be done in short intervals. This is a rules-based suggestion, not medical
            advice.
          </p>
        </div>
      )}
    </section>
  );
}