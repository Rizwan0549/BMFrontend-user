import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook'; // Use react-timer-hook

const TestPage = ({ data }) => {
  const { chapterSlug } = useParams();
  const { seconds, minutes, hours, start, reset } = useStopwatch({ autoStart: false });

  useEffect(() => {
    start(); // Start the timer when the page is loaded

    return () => {
      reset(); // Reset the timer when the user leaves the page
    };
  }, [start, reset]);

  let chapterName;
  const findChapter = () => {
    for (let course of data) {
      for (let chapter of course.chapters) {
        if (chapter.slug === chapterSlug) {
          chapterName = chapter.chapter;
          return chapter.quiz;
        }
      }
    }
    return null;
  };

  const quizArray = findChapter();
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    reset(); // Stop the timer when the quiz is submitted
    alert("Quiz submitted!!");
  };

  return (
    <section className='testPageContent'>
      <div>
        <h3>Time Elapsed: {hours}:{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
      </div>

      <h1>{chapterName} - Test</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {quizArray.map((quiz, index) => (
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
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </section>
  );
};

export default TestPage;
