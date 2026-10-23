import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import PackageSummaryCard from "../../packages/components/PackageSummaryCard";
import ActiveSessionBanner from "../../sessions/components/ActiveSessionBanner";
import ProfileSummaryCard from "../../fitness-profile/components/ProfileSummaryCard";
import RecommendationCard from "../../recommendations/components/RecommendationCard";
import { useFitnessProfile } from "../../fitness-profile/hooks/useFitnessProfile";
import { isProfilePromptSkipped } from "../../fitness-profile/utils/profilePrompt";
import { usePackageSummary } from "../../packages/hooks/usePackageSummary";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { data: packageData } = usePackageSummary();
  const { profile } = useFitnessProfile();

  // First login: send the customer to the assessment, unless they skipped it this session
  if (profile === null && !isProfilePromptSkipped(user.id)) {
    return <Navigate to="/customer/profile" replace />;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
      <p className="mt-1 text-sm text-gray-500">Zone: {user.zone?.name ?? "Not set"}</p>
      <ActiveSessionBanner />
      <Link
        to="/customer/book"
        className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Book a session
      </Link>
      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium">My package</h2>
          <Link to="/customer/packages" className="text-sm text-gray-500 underline">
            Manage packages
          </Link>
        </div>
        {packageData && <PackageSummaryCard summary={packageData.summary} />}
      </section>
      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">My bookings</h2>
          <Link to="/customer/bookings" className="text-sm text-gray-500 underline">
            View all
          </Link>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          See upcoming, completed and cancelled sessions, or reschedule and cancel them.
        </p>
      </section>
      <ProfileSummaryCard profile={profile} />
      <RecommendationCard />
      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Session history</h2>
          <Link to="/customer/history" className="text-sm text-gray-500 underline">
            View history
          </Link>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          See your trainer's notes after each session and leave feedback.
        </p>
      </section>
    </div>
  );
}