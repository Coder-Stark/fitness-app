import { useCallback, useEffect, useMemo, useState } from "react";
import { usePolling } from "../../../shared/hooks/usePolling";
import { useAuth } from "../../auth/hooks/useAuth";
import { fetchServerTime } from "../api/time.api";
import { ServerTimeContext } from "./ServerTimeContext";

const SYNC_INTERVAL_MS = 5 * 60_000;
const SAMPLES = 3;

// Asks the server for its time a few times and keeps the sample with the shortest round
// trip, because that one has the least network delay mixed into it.
async function measureOffset() {
  let best = null;

  for (let i = 0; i < SAMPLES; i += 1) {
    const sentAt = Date.now();
    const { epochMs } = await fetchServerTime();
    const roundTripMs = Date.now() - sentAt;

    // The server read its clock about halfway through the round trip
    const offsetMs = epochMs - (sentAt + roundTripMs / 2);
    if (!best || roundTripMs < best.roundTripMs) best = { offsetMs, roundTripMs };
  }

  return best;
}

export default function ServerTimeProvider({ children }) {
  const { user } = useAuth();
  const enabled = Boolean(user);

  // offsetMs = server time minus device time. Positive means the device clock is behind.
  const [offsetMs, setOffsetMs] = useState(0);
  const [synced, setSynced] = useState(false);

  const sync = useCallback(async () => {
    try {
      const best = await measureOffset();
      setOffsetMs(Math.round(best.offsetMs));
      setSynced(true);
    } catch {
      // keep the last known offset, the next sync tries again
    }
  }, []);

  useEffect(() => {
    if (enabled) sync();
  }, [enabled, sync]);

  // Re-syncs every 5 minutes, and again whenever the tab becomes visible
  usePolling(sync, SYNC_INTERVAL_MS, enabled);

  const value = useMemo(() => ({ offsetMs, synced }), [offsetMs, synced]);

  return <ServerTimeContext.Provider value={value}>{children}</ServerTimeContext.Provider>;
}