import { useState, useRef, useEffect } from "react";
import "./index.css";
import PromptDisplay from "../PromptDisplay";
import VirtualKeyboard from "../VirtualKeyboard";
import Stats from "../Stats";
import ResultsModal from "../ResultsModal";
import { calculateAccuracy, calculateWpm } from "../../utils/calculateStats";
import { pickPhrase } from "../../data/pickPhrase";

const SESSION_SECONDS = 300; 
const IGNORED_KEYS = ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab", "Escape"];

function TypingSession({ lesson }) {
  const [phrase, setPhrase] = useState(() => pickPhrase(lesson.id));
  const [cursor, setCursor] = useState(0);
  const [totalKeys, setTotalKeys] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(SESSION_SECONDS);

  const boxRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      boxRef.current.focus();
    }
  }, [status]);

  useEffect(() => {
    if (status !== "running") return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status]);

  useEffect(() => {
    if (timeLeft === 0) {
      setStatus("finished");
    }
  }, [timeLeft]);

  function handleRestart() {
    setPhrase(pickPhrase(lesson.id));
    setCursor(0);
    setTotalKeys(0);
    setCorrectKeys(0);
    setHasError(false);
    setTimeLeft(SESSION_SECONDS);
    setStatus("idle");
  }

  function handleKeyDown(event) {
    if (IGNORED_KEYS.includes(event.key)) return;
    if (event.key.length > 1) return;
    if (event.repeat) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    event.preventDefault();

    if (status === "finished") return;

    if (status === "idle") {
      setStatus("running");
    }

    setTotalKeys(totalKeys + 1);

    if (event.key === phrase[cursor]) {
      setCorrectKeys(correctKeys + 1);
      setHasError(false);

      if (cursor + 1 === phrase.length) {
        setPhrase(pickPhrase(lesson.id, phrase));
        setCursor(0);
      } else {
        setCursor(cursor + 1);
      }
    } else {
      setHasError(true);
    }
  }

  const nextKey = status === "finished" ? undefined : phrase[cursor];
  const accuracy = calculateAccuracy(correctKeys, totalKeys);
  const secondsElapsed = SESSION_SECONDS - timeLeft;
  const wpm = calculateWpm(correctKeys, secondsElapsed);

  return (
    <div
      className="typing-box"
      tabIndex={0}
      ref={boxRef}
      onKeyDown={handleKeyDown}
      aria-label="Typing area. Start typing the highlighted characters."
    >
      <Stats
        timeLeft={timeLeft}
        totalKeys={totalKeys}
        correctKeys={correctKeys}
        accuracy={accuracy}
      />

      {status === "idle" && (
        <p className="hint">Press the highlighted key to start the timer.</p>
      )}

      <PromptDisplay text={phrase} cursor={cursor} hasError={hasError} />
      <VirtualKeyboard nextKey={nextKey} lessonKeys={lesson.keys} />

      {status === "finished" && (
        <ResultsModal
          totalKeys={totalKeys}
          correctKeys={correctKeys}
          accuracy={accuracy}
          wpm={wpm}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default TypingSession;