import "./index.css";

function PromptDisplay({ text, cursor, hasError }) {
  return (
    <div className="prompt" aria-label="Text to type">
      {text.split("").map((char, index) => {
        let className = "char";

        if (char === " ") {
          className += " space";
        }

        if (index < cursor) {
          className += " correct";
        } else if (index === cursor) {
          className += " current";
          if (hasError) {
            className += " wrong";
          }
        }

        return (
          <span key={index} className={className}>
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
}

export default PromptDisplay;

