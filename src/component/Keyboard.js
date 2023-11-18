import React from "react";
import { keyData } from "./constant";

const Keyboard = ({ onPress }) => {
  const handleKeyPress = (key) => {
    onPress({ key: key });
  };

  return (
    <div className="row key_container">
      {keyData.map((el, idx) => {
        return (
          <div key={idx} className="line">
            {el.map((item, index) => (
              <div
                className={`keyBox ${item === "Backspace" ? "delete" : ""}`}
                key={index}
                onClick={() => handleKeyPress(item)}
                style={
                  item === "Backspace"
                    ? {
                        width: "fit-content",
                        padding: "0 10px",
                        textTransform: "capitalize",
                      }
                    : {}
                }
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
