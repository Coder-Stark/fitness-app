import { useCallback, useEffect, useRef, useState } from "react";
import { usePolling } from "../../../shared/hooks/usePolling";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchAdminBookings } from "../api/admin.api";

const POLL_INTERVAL_MS = 15_000;
const PAGE_SIZE = 10;

export function useAdminBookings({ phase, from, to, page }) {
  const key = `${phase}|${from}|${to}|${page}`;

  // The result is stored with the filters it belongs to, so a slow answer for old filters
  // can never be shown for the current ones.
  const [state, setState] = useState({ key: null, result: null });
  const [error, setError] = useState("");
  const latestKey = useRef(key);

  useEffect(() => {
    latestKey.current = key;
  });

  const load = useCallback(async () => {
    try {
      const result = await fetchAdminBookings({
        page,
        limit: PAGE_SIZE,
        ...(phase && { phase }),
        ...(from && { from }),
        ...(to && { to }),
      });
      if (latestKey.current !== key) return;
      setState({ key, result });
      setError("");
    } catch (err) {
      if (latestKey.current === key) setError(getErrorMessage(err));
    }
  }, [key, phase, from, to, page]);

  useEffect(() => {
    load();
  }, [load]);

  usePolling(load, POLL_INTERVAL_MS);

  const current = state.key === key;
  return { data: current ? state.result : null, loading: !current && !error, error };
}