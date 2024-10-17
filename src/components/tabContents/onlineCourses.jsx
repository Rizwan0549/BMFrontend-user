import React, { useState, useEffect } from "react";
import { getOnlineClasses } from "../../Services/onlineServices";

function OnlineCourses() {
  const [onlineData, setOnlineData] = useState([]);
  useEffect(() => {
    getOnlineClassesData();
  }, []);

  const getOnlineClassesData = async () => {
    try {
      const response = await getOnlineClasses();
      if (response.data.status) {
        setOnlineData(response.data.Onlineclasses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bm-videos tab-content">
      <h1 className="heading">Online Courses</h1>
      {onlineData.length > 0 ? (
        <ul className="bm-videos-lists">
          {onlineData.map((oneByone, index) => (
            <li key={index} className="bm-videos-list">
              <a href="#" target="_blank" rel="noreferrer">
                <img src={oneByone.Thumbnail} alt={oneByone.Title} />
                <p>{oneByone.Title}</p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="test-center">
          <div className="alert alert-info">
            No Online Classes Available Yet
          </div>
        </div>
      )}
    </div>
  );
}

export default OnlineCourses;
