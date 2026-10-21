import { useCallback, useEffect, useState } from "react";
import { usePolling } from "../../../shared/hooks/usePolling";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchMyBookings } from "../api/bookings.api";

const POLL_INTERVAL_MS = 20_000;

export function useMyBookings() {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setBookings(await fetchMyBookings());
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  usePolling(reload, POLL_INTERVAL_MS);

  return { bookings, error, reload };
}