import React, { useState } from 'react';
import './App.css';
import { riddles } from './riddles';
import 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';


const riddle_day = getRiddleDay();
var noOfGuesses = getNoOfGuesses();
var guesses = getGuesses();


function App() {
  const [guessesLeft, setGuessesLeft] = useState(true);
  const listItems = guesses.map((guess) =>
    <li>{guess}</li>

  );
  const onInputChange = (event) => {
    setText(event.target.value);
  }

  const [text, setText]  = useState('');
  const handleSubmit = event => {
    guesses.push(text);
    localStorage.setItem('guesses',JSON.stringify(guesses))
    event.preventDefault();
    if (Answer() === text) {
        setGuessesLeft(false);
        toast.success("correct!!");
        localStorage.setItem("playerWon", "true");
        localStorage.setItem("gameOver", "true");
    } else {
        toast.error("Incorrect!");
        noOfGuesses -= 1;
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
          <input name="answer" disabled={showAnswer()} placeholder="Guess" autoComplete="off" className="field" type = "text" onChange={onInputChange}/>
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
            {showAnswer() && <p> <br/> <h3> Answer: </h3> <Answer/> </p>}
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
  return localStorage.getItem('playerWon')
  ? "Well done!  You solved today's riddle"
  : "Better luck next time ;)"
}

function getRiddleDay() {
  const NOW_IN_MS = Date.now();
  const GAME_EPOC_MS = 1.656198e+12;
  const ONE_DAY_IN_MS = 8.64e+7;
  const riddle_day =  Object.keys(riddles)[Math.floor((NOW_IN_MS - GAME_EPOC_MS) / ONE_DAY_IN_MS)];
  const stored_day = parseInt(localStorage.getItem('day'));
  console.log(stored_day)
  if (riddle_day > stored_day) {
    localStorage.setItem('day',JSON.stringify(riddle_day))
    localStorage.removeItem('guesses')
    localStorage.setItem('noOfGuesses', 5)
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
  return (localStorage.getItem('gameOver') || localStorage.getItem('playerWon'))

}



export default App;
