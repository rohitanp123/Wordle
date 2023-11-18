import React, { useEffect, useState } from "react";
import Line from "component/Line";
import { constant } from "component/constant";
import Keyboard from "component/Keyboard";

const ROW_LENGTH = 5;

const Board = () => {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [solution, setSolution] = useState("");
  const [word, setWord] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (constant.length) {
      setSolution(
        constant[Math.floor(Math.random() * constant.length)].toLowerCase()
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [isGameOver, word, solution, guesses]);

  const handleType = (e) => {
    if (isGameOver) {
      return;
    }
    if (/^[a-z]+$/.test(e.key)) {
      if (
        word.length < ROW_LENGTH &&
        guesses.findIndex((el) => el === null) !== -1
      ) {
        setWord((prev) => prev + e.key);
      }
    }
    if (e.key === "Backspace") {
      setWord((prev) => prev.slice(0, -1));
    }
    if (e.key === "Enter") {
      if (word.length !== 5) {
        return;
      }
      if (!constant.includes(word.toUpperCase())) {
        alert("Not valid word!");
        return;
      }
      const newGuesses = [...guesses];
      newGuesses[guesses.findIndex((el) => el === null)] = word;
      setGuesses(newGuesses);
      setWord("");
      const isCorrect = solution === word;
      if (isCorrect) {
        setIsGameOver(true);
      }
      if (word.length >= 5) {
        return;
      }
    }
  };

  // const handleHint = () => {
  //   const newGuess = [...guesses];
  //   const hintLength = newGuess[newGuess.length - 1]?.length;
  //   console.log(newGuess, hintLength, "hintLength");
  //   newGuess[newGuess.length - 1] = solution.substring(0, hintLength + 1 || 1);
  //   setGuesses(newGuess);
  // };

  return (
    <>
      <div className="row">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((el) => el === null);
          return (
            <Line
              uniqueKey={i}
              guess={isCurrentGuess ? word : guess || ""}
              isFinal={!isCurrentGuess && guess !== null}
              solution={solution}
            />
          );
        })}
        {/* <button type="button" className="button" onClick={handleHint}>
        Hint
      </button> */}
      </div>
      <Keyboard onPress={handleType} />
    </>
  );
};
export default Board;
