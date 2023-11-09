import React from "react";

const WORD_LENGTH = 5;

const Line = ({ uniqueKey, guess, isFinal, solution }) => {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    let className = "box";
    if (isFinal) {
      if (guess[i] === solution[i]) {
        className += " correct";
      } else if (solution.includes(guess[i])) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }

    tiles.push(
      <div className={className} key={i}>
        {guess[i]}
      </div>
    );
  }
  return (
    <div key={uniqueKey} className="line">
      {tiles}
    </div>
  );
};
export default Line;
