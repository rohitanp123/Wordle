import React from "react";
import { keyData } from "./constant";

const Keyboard = ({ onPress }) => {
  const handleKeyPress = (key) => {
    let keycode = key;
    if (key === "<--") {
      keycode = "Backspace";
    }
    onPress({ key: keycode });
  };

  return (
    <div className="row key_container">
      {keyData.map((el, idx) => {
        return (
          <div key={idx} className="line">
            {el.map((item, index) => (
              <div
                className={`keyBox ${item === "<--" ? "delete" : ""}`}
                key={index}
                onClick={() => handleKeyPress(item)}
              >
                {item}
              </div>
            ))}
          </div>
        );
      })}
      <div className="submit" onClick={() => handleKeyPress("Enter")}>
        Submit
      </div>
    </div>
  );
};
export default Keyboard;
