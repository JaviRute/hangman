import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//this is the button to reset the game, so it needs the state 'resetGame'
const ResetButton = (props) => {
    const resetGame = props.resetGame;
  return (
      <Button className="btn-dark" onClick={resetGame}>Reset Game</Button>
  )
}

export default ResetButton;
