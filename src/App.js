import React, { useState } from 'react';
import './App.css';
import { riddles } from './riddles';
import 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import Modal from './modal.js';


const riddle_day = getRiddleDay();
var noOfGuesses = getNoOfGuesses();
var guesses = getGuesses();



function App() {
  const [guessesLeft, setGuessesLeft] = useState(true);
  const listItems = guesses.map((guess) =>
    <li key={guess.id}>{guess}</li>

  );


  const onInputChange = (event) => {
    setText(event.target.value);
  }

  const [text, setText]  = useState('');
  const handleSubmit = event => {
    guesses.push(text);
    localStorage.setItem('guesses',JSON.stringify(guesses));
    event.preventDefault();
    noOfGuesses -= 1;
    if (Answer() === text) {
        setGuessesLeft(false);
        toast.success("correct!!");
        localStorage.setItem("playerWon", "true");
        localStorage.setItem("gameOver", "true");
    } else {
        toast.error("Incorrect!");
        if (noOfGuesses === 0) {
          setGuessesLeft(false);
          localStorage.setItem("gameOver", "true");
        }
        setText('')
        localStorage.setItem("noOfGuesses", noOfGuesses)
    }

  }

  return (
    <div className="App">
        <Toaster/>
        <div className="headings">
        <h1 alt="title"> Riddle </h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='sub-headings'>
         <h3> Riddle # {parseInt(riddle_day) + 1} / {riddles.length}: </h3>
         <p><Riddle/></p>
        </div>
          <div className='user-input'>
          <input name="answer" disabled={showAnswer()? 1 : 0} placeholder="Guess" autoComplete="off" className="field" type = "text" onChange={onInputChange}/>
          <br/>
            <button
            id="check-answer"
        variant="success"
        type='submit'
        disabled={!text}
        >
          Submit
          </button>
          <div id="answer">
            {showAnswer() && <div> <br/> <h3> Answer: </h3> <Answer/> </div>}
          </div>
          </div>
        </form>
        {showAnswer() && <p>
          <EndOfGameMsg/>
        </p>}
          <h3 className='sub-headings'>Guesses Left: {noOfGuesses}</h3>
          <div>
            
         {listItems && <h3> Previous Guesses</h3>}

        <ol>
          {listItems}
        </ol>
        </div>
    </div>
  );
}

function Riddle() {

  return riddles[riddle_day][0];
} 
function Answer() {
  return riddles[riddle_day][1];
}
function EndOfGameMsg() {
  return JSON.parse(localStorage.getItem('playerWon')) === true
  ? "Well done!  You solved today's riddle"
  : "Better luck next time ;)"
}

function getRiddleDay() {
  const NOW_IN_MS = Date.now();
  const GAME_EPOC_MS = 1.656198e+12;
  const ONE_DAY_IN_MS = 8.64e+7;
  const riddle_day =  Object.keys(riddles)[Math.floor((NOW_IN_MS - GAME_EPOC_MS) / ONE_DAY_IN_MS)];
  var stored_day_str = localStorage.getItem('day');
  var stored_day = parseInt(stored_day_str)

  if (stored_day === null) {
    localStorage.setItem('day',riddle_day);
    stored_day = riddle_day;
  }
  if (riddle_day > stored_day) {
    localStorage.setItem('day',riddle_day);
    localStorage.removeItem('guesses');
    localStorage.setItem('noOfGuesses', 5);
    localStorage.setItem("playerWon", "false");    
    localStorage.setItem("gameOver", "false");
    stored_day = riddle_day;
  } 

  return riddle_day;
}

function getGuesses() {
  var guesses =  localStorage.getItem('guesses')
  return guesses == null ? []: JSON.parse(guesses);  
}

function getNoOfGuesses() {
  var noOfGuesses = localStorage.getItem('noOfGuesses');
  return noOfGuesses == null ? 5: parseInt(localStorage.getItem("noOfGuesses"));
}


function showAnswer() {
  return JSON.parse(localStorage.getItem('gameOver')) === true || JSON.parse(localStorage.getItem('playerWon')) === true

}



export default App;
