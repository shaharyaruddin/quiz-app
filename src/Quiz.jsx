import React, { useState, useEffect } from 'react';
import './Quiz.css';
import Button from 'react-bootstrap/Button';
import questions from './QuizData';
import Result from './Result';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(15); // Initial timer value

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0 && selectedAnswer === null) {
        setRemainingTime(remainingTime - 1);
      } else {
        handleTimeout();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, selectedAnswer]);

  const handleTimeout = () => {
    setSelectedAnswer(0); 
    HandleNextQuestion();
  };

  const handleAnswers = (isCorrect, answerIndex) => {
    if (isCorrect) {
      setScore(score + 5);
    }
    setSelectedAnswer(answerIndex);
    setRemainingTime(15); 
  };

  const HandleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setRemainingTime(15);
    } else {
      setShowResult(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setRemainingTime(15);
  };

  return (
    <>
      {!showResult ? (
        <div className="quiz-card">
          <div className="quiz-header">
            <div className="score fs-4">Score: {score}</div>
            <div className="QuestionsNo fs-1">
              {currentQuestion + 1} of {questions.length}
            </div>
            <div className="Timer fs-4">Time: {remainingTime} sec</div>
          </div>
          <div className="QuestionsData fs-5">{questions[currentQuestion].questionText}</div>
          <div className="quiz-content">
            <div className="answer-section fs-5">
              {questions[currentQuestion].answerOptions.map((ans, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswers(ans.isCorrect, i)}
                  className={
                    selectedAnswer === i
                      ? ans.isCorrect
                        ? 'bg-success'
                        : 'bg-danger'
                      : ''
                  }
                  disabled={selectedAnswer !== null}
                >
                  {ans.answerText}
                </button>
              ))}
            </div>
            <div className="quiz-footer">
              {selectedAnswer !== null && (
                <Button variant="primary" onClick={HandleNextQuestion}>
                  {currentQuestion + 1 < questions.length ? 'Next' : 'Finish'}
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Result score={score} correctAns={score / 5} handlePlayAgain={handlePlayAgain} />
      )}
    </>
  );
}

export default Quiz;
