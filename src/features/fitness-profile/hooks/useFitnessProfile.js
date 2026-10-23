import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchMyProfile } from "../api/fitnessProfile.api";

export function useFitnessProfile() {
  // undefined = still loading, null = nothing saved yet, object = the saved profile
  const [profile, setProfile] = useState(undefined);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setProfile(await fetchMyProfile());
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { profile, error, reload, setProfile };
}