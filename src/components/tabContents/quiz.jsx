import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Quiz({ courses }) {
  const { courseSlug, chapterSlug } = useParams(); // Get slugs from the URL
  // Convert chapterIndex from 1-based to 0-based (URL gives chapter-1, we need 0-based for array indexing)
  //   const chapterNum = parseInt(chapterIndex, 10) - 1;
  const selectedCourse = courses.find((course) => course.slug === courseSlug);
  const selectedChapter = selectedCourse.chapters.find(
    (chapter) => chapter.slug === chapterSlug
  );

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="bm-quiz tab-content">
      <h1>{selectedChapter.chapter} - Quiz xzcxzc</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {selectedChapter.quiz.map((quiz, index) => (
          <div key={index} className="bm-question">
            <p>{quiz.question}</p>
            {quiz.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleOptionChange(index, option)}
                />
                {option}
              </label>
            ))}
            {submitted && (
              <p className="bm-feedback">
                {selectedAnswers[index] === quiz.answer
                  ? "Correct!"
                  : `Wrong! The correct answer is ${quiz.answer}`}
              </p>
            )}
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
}

export default Quiz;
