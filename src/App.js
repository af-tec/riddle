import React, { useState } from 'react';
import './App.css';
import { riddles } from './riddles';
var NOW_IN_MS = Date.now();
var GAME_EPOC_MS = 1656259406613;
var ONE_DAY_IN_MS = 86400000;
var riddle_day =  Object.keys(riddles)[Math.floor((NOW_IN_MS - GAME_EPOC_MS) / ONE_DAY_IN_MS)];
var noOfGuesses = 5
var guesses = []


function App() {
  const [guessesLeft, setGuessesLeft] = useState(true);
  const [showAnswer,setAnswer] = useState(false)
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
        alert("correct!!");
        setAnswer(true);
    } else {
        alert("Incorrect!");
        noOfGuesses -= 1;
        if (noOfGuesses === 0) {
          setGuessesLeft(false);
          setAnswer(true);
        }
        setText('')
    }

  }

  return (
    <div className="App">
        <div className="headings">
        <h1 alt="title"> Riddle </h1>
        <h2> # {parseInt(riddle_day) + 1} / {riddles.length}</h2>
        <h3>Guesses Left: {noOfGuesses}</h3>
        </div>

        <form onSubmit={handleSubmit}>
        {guessesLeft && <div id="Riddle">
         <h3> Riddle: </h3><p><Riddle/></p>
        </div>
        
        }
        {!guessesLeft && <p>
          Better luck next time ;)
          </p>}
          <input name="answer" type = "text" onChange={onInputChange}/>
          <br/>
      <button
        type='submit'
        disabled={!text} 
        >
          Submit
        </button>
        {showAnswer && <p> <h3> Answer: </h3> <Answer/> </p>}
        <div>
          <h3> Guesses</h3>

        <ol>
          {listItems}
        </ol>
        </div>


        </form>
    </div>
  );
}

function Riddle() {

  return riddles[riddle_day][0];
} 
function Answer() {
  return riddles[riddle_day][1];
}

export default App;
