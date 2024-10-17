import React, { useState, useEffect } from "react";
import { getSchedule } from "../../Services/Schedule";

function ScheduleClasses() {
  const [schedule, setSchedule] = useState([]); // Variable name convention: lowercase for state

  useEffect(() => {
    getScheduleData();
  }, []);

  const getScheduleData = async () => {
    try {
      const response = await getSchedule();
      if (response.data.status) {
        setSchedule(response.data.Schedule); // Fixed state update to match the state variable
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bm-schedule-classes tab-content">
      <h1>Scheduled Classes</h1>
      <div className="test-center">
        {/* Render the schedule in a table if there is data */}
        {schedule.length > 0 ? (
          <table
            className="schedule-table"
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th style={{ padding: "5px", border: "1px solid black" }}>
                  Day
                </th>
                <th style={{ padding: "5px", border: "1px solid black" }}>
                  Timing
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((classItem, index) => (
                <tr key={index}>
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {classItem.Day}
                  </td>{" "}
                  {/* Display the day */}
                  <td style={{ padding: "5px", border: "1px solid black" }}>
                    {classItem.Time}
                  </td>{" "}
                  {/* Display the timing */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="test-center">
            <div className="alert alert-info">No scheduled available Yet</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleClasses;
