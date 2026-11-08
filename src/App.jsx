import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LessonSelector from "./components/LessonSelector";
import TypingSession from "./components/TypingSession";
import { lessons } from "./data/lessons";

function App() {
  const [selectedLessonId, setSelectedLessonId] = useState("both");

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId);

  return (
    <div className="app">
      <Header />
      <LessonSelector
        lessons={lessons}
        selectedId={selectedLessonId}
        onSelect={setSelectedLessonId}
      />
      <TypingSession key={selectedLesson.id} lesson={selectedLesson} />
    </div>
  );
}

export default App;