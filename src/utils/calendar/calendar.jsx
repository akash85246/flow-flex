import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";

export default function UserCalendar() {
  const [dateGoals, setDateGoals] =
    //   useState({});
    useState({
      "Tue Mar 29 2024": ["Goal A", "Goal B"],
      "Thu Mar 31 2024": ["Goal C"],
      "Sat Apr 01 2024": ["Goal D"],
    });
  const [isShown, setIsShown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const onChange = (date) => {
    if (date && date.getTime() === (selectedDate && selectedDate.getTime())) {
      // If the clicked date is the same as the currently selected date
      setIsShown(false); // Close the motion div
      setSelectedDate(null); // Reset selectedDate to null
    } else {
      setSelectedDate(date); // Set the selected date
      setIsShown(true); // Show the motion div
    }
  };

  // Function to determine the content to display in each date cell
  const tileContent = ({ date, view }) => {
    if (
      dateGoals[date.toDateString()] &&
      date.toDateString() !== selectedDate?.toDateString()
    ) {
      return <div style={{ backgroundColor: "green" }}></div>; // Add green background for dates with goals
    }
    return null;
  };

  const goalsForSelectedDate = dateGoals[selectedDate?.toDateString()] || [];

  return (
    <div className="App sm:w-1/3 shadow-lg flex gap-2 justify-center items-center">
      <Calendar
        onChange={onChange}
        value={new Date()}
        tileContent={tileContent}
        className="w-full h-full "
      />
      {isShown && (
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: selectedDate ? 0 : -1000 }}
          transition={{ duration: 0.5 }}
          className="h-full sm:w-96 w-full top-0 shadow-lg -z-50  p-5 text-purple-800 "
        >
          <h2 className="text-lg ">Selected Date Goals:</h2>
          <ul>
            {selectedDate && (
              <li>
                <strong>{selectedDate.toDateString()}:</strong>
                <ul className="h-40 overflow-auto">
                  {goalsForSelectedDate.map((goal, idx) => (
                    <li key={idx}>{goal}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
