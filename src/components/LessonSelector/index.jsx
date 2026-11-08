import "./index.css";

function LessonSelector({ lessons, selectedId, onSelect }) {
  return (
    <div className="lesson-selector">
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          className={
            lesson.id === selectedId ? "lesson-btn selected" : "lesson-btn"
          } 
          onClick={() => onSelect(lesson.id)}
        >
          <span className="lesson-name">{lesson.name}</span>
          <span className="lesson-keys">{lesson.keys.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export default LessonSelector;