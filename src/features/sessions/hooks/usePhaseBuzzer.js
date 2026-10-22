import { useEffect, useRef } from "react";
import { playCompleteBeep, playWarningBeep, unlockAudio } from "../utils/audio";

// Plays the buzzer when the phase changes while the page is open. The on-screen banner is
// worked out from the phase itself, so it also shows after a refresh. Sound cannot be
// replayed for a change the page did not see.
export function usePhaseBuzzer(phase, enabled) {
  const previous = useRef(phase);

  useEffect(() => {
    const before = previous.current;
    previous.current = phase;

    if (!enabled || before === phase) return;

    if (phase === "ending_soon" && before === "in_progress") playWarningBeep();
    if (phase === "completed" && (before === "in_progress" || before === "ending_soon")) {
      playCompleteBeep();
    }
  }, [phase, enabled]);

  // After a refresh the browser blocks sound until the first click, so unlock it then
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    return () => window.removeEventListener("pointerdown", unlockAudio);
  }, [enabled]);
}