import React from "react";


//this is the display of the word, with some or all of its characters swapped by an underscore
const Word = ({ word, guessedLetters }) => {
  return (
    <p>
      Word:{" "}
      {word
        .split("")
        .map((char) => (guessedLetters.includes(char) ? char : "_"))
        .join(" ")}
    </p>
  );
};

export default Word;