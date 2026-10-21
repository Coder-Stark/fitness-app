import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchMyPackages } from "../api/package.api";

export function usePackageSummary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setData(await fetchMyPackages());
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}