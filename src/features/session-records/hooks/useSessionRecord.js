import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchSessionRecord } from "../api/sessionRecord.api";

export function useSessionRecord(bookingId) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchSessionRecord(bookingId)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err));
      });

    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  // Keeps the panel in step with what was just saved, without another request
  const setRecord = useCallback(
    (record) => setData((previous) => (previous ? { ...previous, record } : previous)),
    []
  );

  return { data, error, setRecord };
}