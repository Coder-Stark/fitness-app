import { useEffect, useRef } from "react";

// Calls `callback` every `intervalMs` while the browser tab is visible, and once more
// when the tab becomes visible again. It does not call it on mount.
export function usePolling(callback, intervalMs, enabled = true) {
  const latest = useRef(callback);

  useEffect(() => {
    latest.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      if (document.visibilityState === "visible") latest.current();
    };

    const id = setInterval(tick, intervalMs);
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [intervalMs, enabled]);
}