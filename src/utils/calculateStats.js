// Returns accuracy as a whole number (0-100), or null if nothing was typed yet
export function calculateAccuracy(correctKeys, totalKeys) {
  if (totalKeys === 0) return null;
  return Math.round((correctKeys / totalKeys) * 100);
}

// Standard typing convention: 1 word = 5 characters.
// Uses correct keys only, so mistakes don't inflate your speed.
export function calculateWpm(correctKeys, secondsElapsed) {
  if (secondsElapsed === 0) return 0;
  const minutes = secondsElapsed / 60;
  return Math.round(correctKeys / 5 / minutes);
}