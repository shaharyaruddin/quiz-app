import React from 'react';
import './Result.css' // Import your CSS file for Result component
import questions from './QuizData';

function Result(props) {
  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">Quiz Completed!</div>
        <div className="result-score">Total Points: <span className="score">{props.score}/20</span></div>
        <div className="result-feedback">
          <h4>Your Correct Answers: <span className="correct-answers fw-bold fs-4">{props.correctAns}</span> out of {questions.length}</h4>
        </div>
        <button className='play-again-button' onClick={props.handlePlayAgain}>Play Again</button>
      </div>
    </div>
  );
}

export default Result;
