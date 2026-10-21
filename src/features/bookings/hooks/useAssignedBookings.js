import { useCallback, useEffect, useState } from "react";
import { usePolling } from "../../../shared/hooks/usePolling";
import { getErrorMessage } from "../../../shared/utils/errors";
import { useNotifications } from "../../notifications/hooks/useNotifications";
import { fetchAssignedBookings } from "../api/bookings.api";

const POLL_INTERVAL_MS = 10_000;

export function useAssignedBookings() {
  const { unreadCount } = useNotifications();
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setBookings(await fetchAssignedBookings());
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  // Loads on mount, and again right away whenever the unread count changes (a new notification)
  useEffect(() => {
    reload();
  }, [reload, unreadCount]);

  usePolling(reload, POLL_INTERVAL_MS);

  return { bookings, error };
}