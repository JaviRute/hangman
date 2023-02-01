import React from 'react'

//this will return an <h5> with the number of incorrect guesses, so it needs some state
const IncorrectGuesses = (props) => {
    const incorrectGuesses = props.incorrectGuesses;
  return (

      <h5>Incorrect Guesses: {incorrectGuesses}</h5>

  )
}

export default IncorrectGuesses
