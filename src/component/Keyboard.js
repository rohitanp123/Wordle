import React from "react";
import { keyData } from "./constant";

const Keyboard = ({ onPress }) => {
  const handleKeyPress = (key) => {
    onPress({ key: key });
  };

  return (
    <div className="row key_container">
      <div className="submit" onClick={() => handleKeyPress("Enter")}>
        SUBMIT
      </div>
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
                        boxShadow: "2px 2px 2px rgb(234, 147, 147)",
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
    </div>
  );
};
export default Keyboard;
