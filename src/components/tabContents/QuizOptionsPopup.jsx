import React, { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuizOptionsPopup = ({ isOpen, onClose, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("revision"); // Track selected option

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Set selected option
  };

  const handleConfirmClick = () => {
    if (selectedOption) {
      onSelect(selectedOption); // Pass selected option to onSelect when confirmed
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="bgOverlay"></div>
          <div className="quizOptionModal">
            <div className="modalHeader">
              <h3>Select an option</h3>
              <FontAwesomeIcon icon={faXmark} onClick={onClose} />
            </div>

            <div className="modalBody">
              <button
                className={selectedOption === "revision" ? "revision active" : "revision"}
                onClick={() => handleOptionClick("revision")}
              >
                Revision
              </button>
              <button
                className={selectedOption === "practice" ? "practice active" : "practice"}
                onClick={() => handleOptionClick("practice")}
              >
                Practice
              </button>
              <button
                className={selectedOption === "test" ? "test active" : "test"}
                onClick={() => handleOptionClick("test")}
              >
                Test
              </button>
            </div>

            <div className="modalFooter">
              <button onClick={onClose} className="cancelButton">
                Cancel
              </button>
              <button
                onClick={handleConfirmClick}
                className="confirmButton"
                disabled={!selectedOption} // Disable if no option is selected
              >
                Start {selectedOption}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuizOptionsPopup;
