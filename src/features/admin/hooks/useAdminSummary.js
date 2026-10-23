import { useCallback, useEffect, useState } from "react";
import { usePolling } from "../../../shared/hooks/usePolling";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchAdminSummary } from "../api/admin.api";

const POLL_INTERVAL_MS = 15_000;

export function useAdminSummary() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setData(await fetchAdminSummary());
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  usePolling(load, POLL_INTERVAL_MS);

  return { data, error };
}