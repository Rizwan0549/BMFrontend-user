import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizOptionsPopup from "./QuizOptionsPopup";
import { TimerContext } from "../../Context/TimerContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as ChapterIcon } from "../../assets/chapter.svg";
import { getChapterByQuizID } from "../../Services/QuizServices";

function Quizes({ courses }) {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState([]);
  // State to handle the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedChapterSlug, setSelectedChapterSlug] = useState(null);

  useEffect(() => {
    getAllChapters();
  }, []);

  const getAllChapters = async () => {
    try {
      const response = await getChapterByQuizID(courseSlug);
      if (response.data.status) {
        setSelectedCourse(response.data.myChapters);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChapterClick = (chapterSlug) => {
    // Store the selected chapter and open the popup
    setSelectedChapterSlug(chapterSlug);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleOptionSelect = (option) => {
    // Close the popup and navigate to the selected screen
    setIsPopupOpen(false);
    navigate(`/quizzes/${selectedChapterSlug}/${option}`);
  };

  return (
    <div className="bm-chapters tab-content">
      <h1 className="heading">
        <button className="backButton" onClick={() => navigate("/quizzes")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        Chapters - {selectedCourse.length}
      </h1>
      {selectedCourse.length > 0 && (
        <div>
          <h4>{selectedCourse[0].quizTitle}</h4>
        </div>
      )}
      {selectedCourse.length > 0 ? (
        <ul className="bm-chapters-list">
          {selectedCourse.map((chapter, index) => (
            <li key={index} onClick={() => handleChapterClick(chapter._id)}>
              <span>
                <ChapterIcon /> Quiz #{index + 1}
              </span>
              <p>{chapter.Title}</p>
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

      {/* Popup for selecting options */}
      <QuizOptionsPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onSelect={handleOptionSelect}
      />
    </div>
  );
}

export default Quizes;
