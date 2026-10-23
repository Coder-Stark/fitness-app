import { useCallback, useEffect, useState } from "react";
import { usePolling } from "../../../shared/hooks/usePolling";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchMySessions } from "../api/sessionRecord.api";

const POLL_INTERVAL_MS = 20_000;

export function useMySessions() {
  const [sessions, setSessions] = useState(null);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setSessions(await fetchMySessions());
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // New trainer notes show up without a refresh
  usePolling(reload, POLL_INTERVAL_MS);

  return { sessions, error, reload };
}