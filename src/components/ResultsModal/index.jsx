import "./index.css";

function ResultsModal({ totalKeys, correctKeys, accuracy, wpm, onRestart }) {
  return (
    <div className="modal-overlay">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-title"
      >
        <h2 id="results-title">Time's up!</h2>

        <div className="results-grid">
          <div className="result">
            <span className="result-value">{totalKeys}</span>
            <span className="result-label">Keys pressed</span>
          </div>
          <div className="result">
            <span className="result-value">{correctKeys}</span>
            <span className="result-label">Correct keys</span>
          </div>
          <div className="result">
            <span className="result-value">
              {accuracy === null ? "-" : accuracy + "%"}
            </span>
            <span className="result-label">Accuracy</span>
          </div>
          <div className="result">
            <span className="result-value">{wpm}</span>
            <span className="result-label">WPM</span>
          </div>
        </div>

        <button className="restart-btn" onClick={onRestart} autoFocus>
          Restart
        </button>
      </div>
    </div>
  );
}

export default ResultsModal;