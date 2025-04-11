import React, { useState } from "react";
import "./Quiz.css";
import QuizQuestion from "../core/QuizQuestion";
import quizData from "../data/quizData";

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  score: number;
}

const Quiz: React.FC = () => {
  const initialQuestions: QuizQuestion[] = quizData;
  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0, // Initialize the current question index.
    selectedAnswer: null, // Initialize the selected answer.
    score: 0, // Initialize the score.
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  };

  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    setState((prevState) => {
      const isCorrect =
        prevState.selectedAnswer ===
        prevState.questions[prevState.currentQuestionIndex].correctAnswer;
      const newScore = isCorrect ? prevState.score + 1 : prevState.score;
      const nextQuestionIndex = prevState.currentQuestionIndex + 1;

      return {
        ...prevState,
        score: newScore,
        currentQuestionIndex: nextQuestionIndex,
        selectedAnswer: null, // reset for the next question
      };
    });
  };

  const handleButtonBack = (): void => {
    setState((prevState) => {
      const isCorrect =
        prevState.selectedAnswer ===
        prevState.questions[prevState.currentQuestionIndex].correctAnswer;
      const newScore = isCorrect ? prevState.score + 1 : prevState.score;
      const nextQuestionIndex = prevState.currentQuestionIndex - 1;

      return {
        ...prevState,
        score: newScore,
        currentQuestionIndex: nextQuestionIndex,
        selectedAnswer: null, // reset for the next question
      };
    });
  };

  const { questions, currentQuestionIndex, selectedAnswer, score } = state;
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>
          Final Score: {score} out of {questions.length}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Quiz Question: {currentQuestionIndex + 1}/{quizData.length}{" "}
      </h2>
      <p>{currentQuestion.question}</p>

      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            style={
              selectedAnswer === option
                ? { border: "2px solid #4a4847", backgroundColor: "#d9d4d1" }
                : { border: "1px solid rgb(191, 190, 189)" }
            }
          >
            {option}
          </li>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
          width: "100%",
        }}
      >
        {currentQuestionIndex === 0 ? (
          <button onClick={handleButtonClick}>Next Question</button>
        ) : currentQuestionIndex + 1 === quizData.length ? (
          <>
            <button
              onClick={handleButtonBack}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #3498db",
                color: "black",
              }}
            >
              Back
            </button>
            <button
              onClick={handleButtonClick}
              style={{ border: "1px solid #3498db" }}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleButtonBack}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #3498db",
                color: "black",
              }}
            >
              Back
            </button>
            <button
              onClick={handleButtonClick}
              style={{ border: "1px solid #3498db" }}
            >
              Next Question
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
