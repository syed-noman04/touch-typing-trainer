import "./index.css";
import { formatTime } from "../../utils/formatTime";

function Stats({ timeLeft, totalKeys, correctKeys, accuracy }) {
  return (
    <div className="stats">
      <div className="stat">
        <span className={timeLeft <= 10 ? "stat-value low" : "stat-value"}>
          {formatTime(timeLeft)}
        </span>
        <span className="stat-label">Time left</span>
      </div>
      <div className="stat">
        <span className="stat-value">{totalKeys}</span>
        <span className="stat-label">Keys pressed</span>
      </div>
      <div className="stat">
        <span className="stat-value">{correctKeys}</span>
        <span className="stat-label">Correct</span>
      </div>
      <div className="stat">
        <span className="stat-value">
          {accuracy === null ? "-" : accuracy + "%"}
        </span>
        <span className="stat-label">Accuracy</span>
      </div>
    </div>
  );
}

export default Stats;