// Mirrors the server's session.config.js. These only drive the Start button hint:
// the server decides every timestamp and enforces every rule.
export const SESSION_RULES = Object.freeze({
  startWindowBeforeMinutes: 20,
  startWindowAfterMinutes: 30,
});