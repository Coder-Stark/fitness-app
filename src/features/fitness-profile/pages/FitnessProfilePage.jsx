import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../shared/components/ui/Spinner";
import { getErrorMessage } from "../../../shared/utils/errors";
import { useAuth } from "../../auth/hooks/useAuth";
import { saveMyProfile } from "../api/fitnessProfile.api";
import ProfileForm from "../components/ProfileForm";
import { useFitnessProfile } from "../hooks/useFitnessProfile";
import { skipProfilePrompt } from "../utils/profilePrompt";

export default function FitnessProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { profile, error, setProfile } = useFitnessProfile();

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [notice, setNotice] = useState("");
  const inFlight = useRef(false);

  const isNew = profile === null;

  async function handleSubmit(payload) {
    if (inFlight.current) return;
    inFlight.current = true;
    setSaving(true);
    setSaveError("");
    setNotice("");

    try {
      const saved = await saveMyProfile(payload);
      setProfile(saved);

      // First time: carry on to booking. Otherwise stay and confirm the change.
      if (isNew) navigate("/customer/book", { replace: true });
      else setNotice("Your profile was saved.");
    } catch (err) {
      setSaveError(getErrorMessage(err));
    } finally {
      inFlight.current = false;
      setSaving(false);
    }
  }

  function handleSkip() {
    skipProfilePrompt(user.id);
    navigate("/customer", { replace: true });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {isNew ? "Welcome! Tell us about yourself" : "My fitness profile"}
        </h1>
        {isNew ? (
          <button type="button" onClick={handleSkip} className="text-sm text-gray-500 underline">
            Skip for now
          </button>
        ) : (
          <Link to="/customer" className="text-sm text-gray-500 underline">
            Back to dashboard
          </Link>
        )}
      </div>

      {isNew && (
        <p className="text-sm text-gray-500">
          A short assessment helps your trainer plan workouts that suit your goals and fitness
          level. You can change it any time.
        </p>
      )}

      {notice && (
        <p role="status" className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          {notice}
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {profile === undefined && !error && <Spinner />}

      {profile !== undefined && (
        <ProfileForm
          initialProfile={profile}
          submitting={saving}
          error={saveError}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}