import "./index.css";
import { homeRowKeys, spaceKey } from "../../data/fingerMap";

function VirtualKeyboard({ nextKey, lessonKeys }) {
  const leftHand = homeRowKeys.slice(0, 4);
  const rightHand = homeRowKeys.slice(4);

  function renderKey(item) {
    let className = "key-cap " + item.fingerClass;

    if (item.key === nextKey) {
      className += " next";
    }
    if (!lessonKeys.includes(item.key)) {
      className += " dimmed";
    }

    return (
      <div key={item.key} className={className}>
        <span className="key-letter">{item.key}</span>
        <span className="key-finger">{item.finger}</span>
      </div>
    );
  }

  const spaceClass = nextKey === spaceKey.key ? "space-bar next" : "space-bar";

  return (
    <div className="keyboard" aria-label="On-screen keyboard guide">
      <div className="keyboard-row">
        <div className="keyboard-half">{leftHand.map(renderKey)}</div>
        <div className="keyboard-half">{rightHand.map(renderKey)}</div>
      </div>
      <div className={spaceClass}>
        <span className="key-letter">Space</span>
        <span className="key-finger">{spaceKey.finger}</span>
      </div>
    </div>
  );
}

export default VirtualKeyboard;