import { phrases } from "./phrases";

export function pickPhrase(lessonId, previousPhrase) {
  const options = phrases[lessonId].filter((p) => p !== previousPhrase);
  return options[Math.floor(Math.random() * options.length)];
}