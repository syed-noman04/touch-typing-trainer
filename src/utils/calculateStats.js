export function calculateAccuracy(correctKeys, totalKeys) {
  if (totalKeys === 0) return null;
  return Math.round((correctKeys / totalKeys) * 100);
}

export function calculateWpm(correctKeys, secondsElapsed) {
  if (secondsElapsed === 0) return 0;
  const minutes = secondsElapsed / 60;
  return Math.round(correctKeys / 5 / minutes);
}