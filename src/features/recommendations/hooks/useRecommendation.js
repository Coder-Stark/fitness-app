import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errors";
import { fetchRecommendation } from "../api/recommendation.api";

export function useRecommendation() {
  // undefined = still loading. Otherwise { recommendation, requires? } from the server.
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      setData(await fetchRecommendation());
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, error, refreshing, reload: load };
}