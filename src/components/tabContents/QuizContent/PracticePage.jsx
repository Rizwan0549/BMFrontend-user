import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { ReactComponent as LangIcon } from "../../../assets/language.svg";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PracticePage = ({ data }) => {
  const { chapterSlug } = useParams();
  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    start();
    return () => {
      reset();
    };
  }, [start, reset]);

  let chapterName;
  let courseSlug; // Add courseSlug to store the course information

  const findChapter = () => {
    for (let course of data) {
      for (let chapter of course.chapters) {
        if (chapter.slug === chapterSlug) {
          chapterName = chapter.chapter;
          courseSlug = course.slug; // Save the courseSlug to navigate back
          return chapter.quiz;
        }
      }
    }
    return null;
  };

  const quizArray = findChapter();

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0); // To track the current slide (question)
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0); // To track missed questions
  const [answerHistory, setAnswerHistory] = useState({}); // Track history of answers

  // Function to evaluate the current answer and update the correct or wrong count
  const evaluateAnswer = (questionIndex) => {
    const currentAnswer = selectedAnswers[questionIndex];
    const correctAnswer = quizArray[questionIndex].answer;
    const previousState = answerHistory[questionIndex];

    if (currentAnswer) {
      // Handle correct and wrong answer updates
      if (previousState === "correct" && currentAnswer !== correctAnswer) {
        setCorrectCount((prev) => prev - 1);
        setWrongCount((prev) => prev + 1);
        setAnswerHistory((prev) => ({ ...prev, [questionIndex]: "wrong" }));
      } else if (previousState === "wrong" && currentAnswer === correctAnswer) {
        setWrongCount((prev) => prev - 1);
        setCorrectCount((prev) => prev + 1);
        setAnswerHistory((prev) => ({ ...prev, [questionIndex]: "correct" }));
      } else if (!previousState || previousState === "missed") {
        // If it's a previously missed question or no history, evaluate it based on the current answer
        if (currentAnswer === correctAnswer) {
          setCorrectCount((prev) => prev + 1);
          setAnswerHistory((prev) => ({ ...prev, [questionIndex]: "correct" }));
        } else {
          setWrongCount((prev) => prev + 1);
          setAnswerHistory((prev) => ({ ...prev, [questionIndex]: "wrong" }));
        }

        if (previousState === "missed") {
          setMissedCount((prev) => prev - 1); // Decrease missed count when answered
        }
      }
    }
  };

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    // Evaluate all unanswered questions as missed
    quizArray.forEach((_, index) => {
      if (!selectedAnswers[index]) {
        setMissedCount((prev) => prev + 1); // Increase missed count for unanswered questions
      }
    });

    setSubmitted(true); // Proceed with submission
    navigate(`/quizzes/${courseSlug}`);
  };

  // Handle Next button logic (includes missed questions handling)
  const handleNextQuestion = () => {
    const currentAnswer = selectedAnswers[currentQuestion];

    // If no answer is selected, count it as missed
    if (!currentAnswer && !answerHistory[currentQuestion]) {
      setMissedCount((prev) => prev + 1);
      setAnswerHistory((prev) => ({ ...prev, [currentQuestion]: "missed" }));
    } else {
      evaluateAnswer(currentQuestion); // Evaluate the current question before moving to the next one
    }

    // Move to the next question
    if (currentQuestion < quizArray.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    // Move to the previous question
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="quizPageContent practicePageContent">
      <div className="header">
        <h1 className="heading">{chapterName} - Practice</h1>
        <div className="timerLang">
          <h1 className="timer">
            Time: {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>

          <div className="langBtn">
            <LangIcon />
          </div>
        </div>
      </div>
      <div className="bm-question">
        <h4>
          Q#{currentQuestion + 1}: {quizArray[currentQuestion].question}
        </h4>
        <img src={quizArray[currentQuestion].image} alt="Question related" />
        <div className="questionMcqs">
          {quizArray[currentQuestion].options.map((option) => (
            <label
              key={option}
              className={
                selectedAnswers[currentQuestion] === option ? "active" : ""
              }
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={selectedAnswers[currentQuestion] === option}
                onChange={() => handleOptionChange(currentQuestion, option)}
              />
              <span className="checkmark">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="questions-status">
          <div className="counts missed-questions">
            <span>Missed</span>
            <p>
              {missedCount}/{quizArray.length}
            </p>
          </div>

          <div className="counts wrong-answers">
            <span>Wrong</span>
            <p>
              {wrongCount}/{quizArray.length}
            </p>
          </div>

          <div className="counts correct-answers">
            <span>Correct</span>
            <p>
              {correctCount}/{quizArray.length}
            </p>
          </div>
        </div>
        <div className="navigation-buttons">
          {currentQuestion > 0 && (
            <button
              type="button"
              className="prevBtn"
              onClick={handlePreviousQuestion}
            >
              Previous
            </button>
          )}

          {currentQuestion < quizArray.length - 1 ? (
            <button
              type="button"
              className="nextBtn"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          ) : (
            <button className="submitBtn" type="button" onClick={handleSubmit}>
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PracticePage;
