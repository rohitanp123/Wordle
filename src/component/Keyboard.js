import React from "react";
import { keyData } from "./constant";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

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
                        padding: "0 30px",
                      }
                    : {}
                }
              >
                {item === "Backspace" ? <KeyboardBackspaceIcon /> : item}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default Keyboard;
