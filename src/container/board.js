import React, { useEffect, useState } from "react";
import Line from "component/Line";
import { constant, detailedData } from "component/constant";
import Keyboard from "component/Keyboard";
import DialogBox from "component/Dialog";

const ROW_LENGTH = 5;

const Board = () => {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [solution, setSolution] = useState("");
  const [word, setWord] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [successOpen, setSuccessOpen] = useState("");
  const [keyColor, setKeyColor] = useState({});

  useEffect(() => {
    if (constant.length) {
      setSolution(
        constant[Math.floor(Math.random() * constant.length)].toLowerCase()
      );
    }
  }, []);
  console.log(solution, isGameOver);
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
      for (let i = 0; i < word.length; i++) {
        if (word[i] === solution[i]) {
          setKeyColor((prev) => {
            let obj = prev;
            obj[word[i]] = "correct";
            return obj;
          });
        } else if (
          solution.includes(word[i]) &&
          keyColor[word[i]] !== "correct"
        ) {
          setKeyColor((prev) => {
            let obj = prev;
            obj[word[i]] = "close";
            return obj;
          });
        } else if (!keyColor[word[i]]) {
          setKeyColor((prev) => {
            let obj = prev;
            obj[word[i]] = "incorrect";
            return obj;
          });
        }
      }
      setWord("");
      const isCorrect = solution === word;
      if (isCorrect) {
        setIsGameOver(true);
        setSuccessOpen("success");
      }
      if (!isCorrect && newGuesses[newGuesses.length - 1]) {
        setSuccessOpen("fail");
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

  const handleCloseSuccess = () => {
    setSuccessOpen("");
  };

  const handleNextGame = () => {
    setGuesses(Array(6).fill(null));
    setWord("");
    setIsGameOver(false);
    setSolution(
      constant[Math.floor(Math.random() * constant.length)].toLowerCase()
    );
    setSuccessOpen(false);
    setKeyColor({});
  };
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
      </div>
      <Keyboard onPress={handleType} keyColor={keyColor} />
      {successOpen && (
        <DialogBox
          open={!!successOpen}
          handleClose={handleCloseSuccess}
          dialogTitle={
            successOpen === "fail"
              ? `The word was: ${solution.toUpperCase()}`
              : `You are GREAT!`
          }
          titleStyle={{
            titleAlign: "center",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            color: "var(--green--)",
            fontWeight: "bold",
          }}
          dialogContent={
            <div>
              {`${solution.toUpperCase()}: `}
              <ol style={{ marginLeft: "30px" }}>
                {detailedData[solution.toUpperCase()]?.map((el) => (
                  <li>{el}</li>
                ))}
              </ol>
            </div>
          }
          DialogAction={[
            {
              id: 1,
              label: "Next",
              onClick: handleNextGame,
              variant: "contained",
            },
          ]}
        />
      )}
    </>
  );
};
export default Board;
