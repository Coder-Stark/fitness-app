const keyFor = (userId) => `profilePromptSkipped:${userId}`;

export function isProfilePromptSkipped(userId) {
  try {
    return sessionStorage.getItem(keyFor(userId)) === "1";
  } catch {
    return false;
  }
}

export function skipProfilePrompt(userId) {
  try {
    sessionStorage.setItem(keyFor(userId), "1");
  } catch {
    // storage is unavailable, the prompt simply shows again next time
  }
}