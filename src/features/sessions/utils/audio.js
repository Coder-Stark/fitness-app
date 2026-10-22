let audioContext = null;

function getContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ??= new AudioContextClass();
  return audioContext;
}

// Browsers only allow sound after the user has clicked something on the page, so this is
// called from the Start button and from the first click after a refresh.
export function unlockAudio() {
  const context = getContext();
  if (context?.state === "suspended") context.resume();
}

function scheduleTone(context, { frequency, start, duration }) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const begin = context.currentTime + start;

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, begin);
  gain.gain.exponentialRampToValueAtTime(0.4, begin + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, begin + duration);

  oscillator.connect(gain).connect(context.destination);
  oscillator.start(begin);
  oscillator.stop(begin + duration + 0.05);
}

function play(tones, vibration) {
  const context = getContext();
  if (context) {
    unlockAudio();
    tones.forEach((tone) => scheduleTone(context, tone));
  }
  navigator.vibrate?.(vibration);
}

// Two short beeps: five minutes left
export function playWarningBeep() {
  play(
    [
      { frequency: 880, start: 0, duration: 0.25 },
      { frequency: 880, start: 0.4, duration: 0.25 },
    ],
    [200, 100, 200]
  );
}

// Three longer, lower beeps: the session is over
export function playCompleteBeep() {
  play(
    [
      { frequency: 660, start: 0, duration: 0.6 },
      { frequency: 660, start: 0.8, duration: 0.6 },
      { frequency: 660, start: 1.6, duration: 0.6 },
    ],
    [500, 200, 500, 200, 500]
  );
}