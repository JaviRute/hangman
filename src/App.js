import React, { useEffect, useState } from "react";
import Image from "./components/Image";
import ResetButton from "./components/ResetButtons";
import { Button, Container, Row, Col } from 'react-bootstrap';
import randomWords from "./components/wordList";
import 'bootstrap/dist/css/bootstrap.min.css'

// List of possible words for the game, I took a list of 100 words
const words = randomWords;

const gameRules = "Guess the word by typing some letters. You have 6 incorrect guesses before the game is over!";

// Main component for the hangman game
function App() {
  const newArray = []


  //The two next blocks of code are here in order to avoid the message 'You Win' from appearing late
  //Initially, after the user guessed the last letter, he was asked for another letter, and then he was told he won
  //To avoid this I made a function that updates the state of guessedLetters by adding the last letter added by the user
  //These are stored temporarily in an array called 'newArray'
  const updateState = (lett) => {
    let newArray = [...guessedLetters];
    newArray.push(lett);
    setGuessedLetters(newArray)
  }
  //Then, with useEffect we make sure each time there is a change in newArray, we run the function checkWin()
  useEffect(() => {
    checkWin();
  }, [newArray])


   // State to store the randomly selected word
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  // State to store the letters guessed by the user
  const [guessedLetters, setGuessedLetters] = useState([]);
  // State to store the number of incorrect guesses by the user
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  // State to store whether the game is over or not
  const [gameOver, setGameOver] = useState(false);
  // State to store whether the user has won
  const [win, setWin] = useState(false);
  // State and function to store whether to show the rules or not
  const [showRules, setShowRules] = useState(false);
  function toggleSetShowRules() {
    setShowRules(!showRules)
  }

  // Function to reset the game
  const resetGame = () => {
    //We pick a random word and set some of the state to their default values
    let randomWord = words[Math.floor(Math.random() * words.length)]
    setWord(randomWord);
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setWin(false);
  };

  // Function to check whether the user has won, using a for lopp
  const checkWin = () => {
    const wordArray = word.split("");
    for (let i = 0; i < wordArray.length; i++) {
      if (!guessedLetters.includes(wordArray[i])) {
        return;
      }
    }
    setWin(true);
    setGameOver(true); // We this line to end the game when the user wins
    };

  // Function to handle a guess by the user
  const handleGuess = (event) => {
    // Prevent the form from reloading the page
    event.preventDefault();
    // Get the letter guessed by the user from the form
    const letter = event.target.letter.value;

    // Check if the letter has not been guessed already and the game is not over
    if (!guessedLetters.includes(letter) && !gameOver) {
      // If the word includes the letter, add it to the guessed letters
      if (word.includes(letter)) {

        //here we run the function to update the state of guessedLetters, which will also fire checkWin()
        updateState(letter)

        // setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, letter]);
        // console.log(guessedLetters) //THIS PROVES THEY ARE LOGGED LATE!
        //  // otherwise, increment the incorrect guesses
      } else {
        setIncorrectGuesses((prevIncorrectGuesses) => prevIncorrectGuesses + 1);
      }
      // if the number of incorrect guesses is 5 we set the game over to true
      if (incorrectGuesses === 5) {
        setGameOver(true);
      }
      // Check if the player has won the game
      checkWin();
    }

    event.target.letter.value = "";
  };

  return (
    <Container className="card mt-5">
      <Row className="justify-content-center card-header">
        <Col md="auto" sm="auto">
          <h1>Hangman</h1>
        </Col>
      </Row>
      
      {/* Render the hangman image based on the number of incorrect guesses */}

      <Row className="justify-content-center">
        <Col md="auto" sm="auto" className="m-2">
          <Image incorrectGuesses={incorrectGuesses} setIncorrectGuesses={setIncorrectGuesses} />
        </Col>
      </Row>

      
        <Row className="justify-content-center">
          <Col md="auto" sm="auto" className="m-2">
            <h3>
              Word:{" "}
              {word
                .split("")
                .map((char) => (guessedLetters.includes(char) ? char : "_"))
                .join(" ")}
            </h3>
          </Col>
        </Row>
      
      <Row className="justify-content-center">
        <Col md="auto" sm="auto" className="m-2">
          {/* Show the number of incorrect guesses */}
          <h5>Incorrect Guesses: {incorrectGuesses}</h5>
        </Col>
      </Row>


      <Row className="justify-content-center">
        <Col md="auto" sm="auto" className="m-2">
          {/* Show the number of incorrect guesses */}
          {/* If the game is over or user has won, show a message */}
          {gameOver || win ? (
            <p>{win ? "You Win!" : `Game Over! The word was ${word}`}</p>
          ) : (
            <form className="form-label" onSubmit={handleGuess}>
              <div  className="input-group">
                <input className="form-control" type="text" name="letter" placeholder="Enter a letter" />
                <Button className="input-group-text’" type="submit">Enter</Button>
              </div>

            </form>
          )}
        </Col>
      </Row>
      
      
      {/* Lower buttons */}
      <Row className="card-footer">
        <Col className="d-flex justify-content-between m-2">
          <Button className="btn-warning" onClick={toggleSetShowRules}>
            {showRules ? "Hide Rules" : "Show Rules"}
          </Button>
          {showRules && <p>{gameRules}</p>}
          <ResetButton resetGame={resetGame} />
        </Col>
      </Row>

    </Container>
  );
}

export default App;