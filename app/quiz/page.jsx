'use client'
import React, { useState } from 'react'
import { quiz } from '../data'

const Page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;

  // Function to handle answer selection
  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer);
  };

  // Function to move to the next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className="container">
      <h1>Quiz Page</h1>
      {questions.length > 0 && activeQuestion < questions.length && (
        <div>
          <h2>
            Question: {activeQuestion + 1}
            <span>/{questions.length}</span>
          </h2>
          {!showResult ? (
            <div className="quiz-container">
              <h3>{questions[activeQuestion].question}</h3>
              {questions[activeQuestion].answers.map((answer, idx) => (
                <li
                  key={idx}
                  onClick={() => onAnswerSelected(answer, idx)}
                  className={
                    selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                  }
                >
                  <span>{answer}</span>
                </li>
              ))}
              {checked ? (
                <button onClick={nextQuestion} className="btn">
                  {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              ) : (
                <button disabled className="btn-disabled">
                  {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-container">
              <h3>Here is your result</h3>
              <h3>Overall {(result.score / 25) * 100}%</h3>
              <p>
                Total questions: <span>{questions.length}</span>
              </p>
              <p>
                Total score: <span>{result.score}</span>
              </p>
              <p>
                Correct Answers: <span>{result.correctAnswers}</span>
              </p>
              <p>
                Wrong Answers: <span>{result.wrongAnswers}</span>
              </p>
              <button onClick={() => window.location.reload()}>Restart</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;

