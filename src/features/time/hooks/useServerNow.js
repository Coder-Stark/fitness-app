import { useEffect, useState } from "react";
import { useServerTime } from "./useServerTime";

// The current server time in ms (device clock plus the measured offset), refreshed on an interval
export function useServerNow(intervalMs = 1000) {
  const { offsetMs } = useServerTime();
  const [now, setNow] = useState(() => Date.now() + offsetMs);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now() + offsetMs), intervalMs);
    return () => clearInterval(id);
  }, [offsetMs, intervalMs]);

  return now;
}