import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { ReactComponent as LangIcon } from "../../../assets/language.svg";
import { getQuizByQuizChapter } from "../../../Services/QuizServices";
const RevisionPage = ({ datas }) => {
  const { chapterSlug } = useParams();
  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: false,
  });
  const navigate = useNavigate();

  const [quizArray, setquizArray] = useState([]);
  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    console.log("quizArray:=", quizArray);
  }, [quizArray]);

  const getAllQuestions = async () => {
    try {
      const response = await getQuizByQuizChapter(chapterSlug);
      if (response.data.status) {
        console.log(response.data.questionsWithOptions);
        setquizArray(response.data.questionsWithOptions);
      }
    } catch (error) {
      console.log("error:=", error);
    }
  };

  useEffect(() => {
    start(); // Start the timer when the page is loaded

    return () => {
      reset(); // Reset the timer when the user leaves the page
    };
  }, [start, reset]);

  return (
    <section className="quizPageContent revisionPageContent">
      <div className="header">
        {quizArray.length > 0 && (
          <h1 className="heading">{quizArray[0].chapterTitle} - Revision</h1>
        )}

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
      {quizArray.map((quiz, index) => {
        // Find the correct option where isCorrect is true
        const correctOption = quiz.options.find(
          (option) => option.isCorrect === true
        );
        return (
          <div key={index} className="bm-question">
            <h4>
              Q#{index + 1}: {quiz.Question}
            </h4>
            <p>
              <b>Ans:</b>
              {correctOption ? correctOption.Option : "No correct answer found"}
            </p>
          </div>
        );
      })}

      {/* Navigate back to the quizzes for the current course */}
      <button
        className="submitBtn"
        onClick={() => navigate(`/quizzes/${quizArray[0].QuizID}`)}
      >
        Revision Completed
      </button>
    </section>
  );
};

export default RevisionPage;
