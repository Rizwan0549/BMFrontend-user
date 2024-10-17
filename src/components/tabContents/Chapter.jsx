import React, { useState, useEffect } from "react";
import { ReactComponent as QuizIcon } from "../../assets/quiz.svg";
import quizzesData from "../../assets/data/quizzes.json"; // Import the JSON file

import { getMyQuizzes } from "../../Services/QuizServices";
import { useNavigate } from "react-router-dom";

function Chapter() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuizzes();
  }, []);

  const getAllQuizzes = async () => {
    try {
      const response = await getMyQuizzes();
      if (response.data.status) {
        setQuizzes(response.data.myQuizzes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCourseClick = (courseSlug) => {
    // Navigate to the chapters of the selected course
    navigate(`/quizzes/${courseSlug}`);
  };

  return (
    <div className="bm-courses tab-content">
      <h1 className="heading">
        Quizzes <QuizIcon />
      </h1>
      {quizzes.length > 0 ? (
        <ul className="bm-courses-lists">
          {quizzes.map((quiz, index) => (
            <li key={index} onClick={() => handleCourseClick(quiz._id)}>
              <span>
                <p className="quizNo">Quiz #{index + 1}</p>
                <p className="chaptersNo">Chapters: {quiz.chapterCount}</p>
              </span>
              <p className="quizName">{quiz.Title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="test-center">
          <div className="alert alert-info">
            No Quiz Added In Your Selected Category
          </div>
        </div>
      )}
    </div>
  );
}

export default Chapter;
