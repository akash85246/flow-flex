import React, { useState } from "react";
import calendarIcon from "../../assets/calendarIcon.svg";
import leftIcon from "../../assets/leftArrowIcon.svg";
import rightIcon from "../../assets/rightArrowIcon.svg";
import memberIcon from "../../assets/memberIcon.svg";
import tableIcon from "../../assets/tableIcon.svg";
import settingIcon from "../../assets/settingIcon.svg";
import boardIcon from "../../assets/board.png";
import backlogIcon from "../../assets/backlogIcon.png";
import codeIcon from "../../assets/codeIcon.png";
import deploymentIcon from "../../assets/deploymentIcon.png";

import dashBoardIcon from "../../assets/dashboardIcon.png";
export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <aside
      className={`bg-purple-800 fixed left-0 text-white  p-1  top-20 h-screen ${
        expanded ? "w-64" : "w-20"
      } flex flex-col items-center justify-between z-50`}
    >
      <div className="mt-6 flex flex-col justify-between h-5/6">
        <ul className=" flex flex-col gap-3 w-full">
          <li className="mb-4 cursor-pointer  flex justify-between  items-center w-full">
            <img src={dashBoardIcon} className="w-8 h-8"></img>

            {expanded && (
              <span className="text-lg font-semibold">Dashboard</span>
            )}
          </li>
          <li className="mb-4 cursor-pointer  flex justify-between gap-1 items-center w-full">
            <img src={boardIcon} className="w-8 h-8"></img>

            {expanded && <span className="text-lg font-semibold">Boards</span>}
          </li>
          <li className="mb-4 cursor-pointer flex justify-between  gap-1 items-center w-full">
            <img src={memberIcon} className="w-8 h-8 object-contain"></img>

            {expanded && (
              <span className="text-lg font-semibold">Add members</span>
            )}
          </li>
          <li className="mb-4 cursor-pointer flex justify-between  gap-1 items-center w-full">
            <img src={tableIcon} className="w-8 h-8 object-contain"></img>

            {expanded && <span className="text-lg font-semibold">Table</span>}
          </li>
          <li className="mb-4 cursor-pointer flex justify-between  gap-1 items-center w-full">
            <img src={calendarIcon} className="w-8 h-8 object-contain"></img>

            {expanded && (
              <span className="text-lg font-semibold">Calendar</span>
            )}
          </li>

          <li className="mb-4 cursor-pointer flex justify-between  gap-1 items-center w-full">
            <img src={codeIcon} className="w-8 h-8 object-contain"></img>

            {expanded && <span className="text-lg font-semibold">Code</span>}
          </li>
          <li className="mb-4 cursor-pointer flex justify-between  gap-1 items-center w-full">
            <img src={deploymentIcon} className="w-8 h-8 object-contain"></img>

            {expanded && (
              <span className="text-lg font-semibold">Deployment</span>
            )}
          </li>
          <li className="mb-4 cursor-pointer flex justify-between  gap-1 items-center w-full">
            <img src={backlogIcon} className="w-8 h-8 object-contain"></img>

            {expanded && (
              <span className="text-lg font-semibold">Backlogs</span>
            )}
          </li>
          <li className="mb-4 cursor-pointer flex justify-between  gap-1 items-center w-full">
            <img src={settingIcon} className="w-8 h-8 object-contain"></img>

            {expanded && <span className="text-lg font-semibold">Setting</span>}
          </li>
        </ul>
        {expanded ? (
          <div
            onClick={toggleSidebar}
            className=" relative left-36 p-2 flex justify-center items-center rounded-full w-10 h-10 bg-purple-700  "
          >
            <img src={leftIcon} className=" "></img>
          </div>
        ) : (
          <div
            onClick={toggleSidebar}
            className="relative left-10 p-2 flex justify-center items-center rounded-full  bg-purple-700"
          >
            <img src={rightIcon}></img>
          </div>
        )}
      </div>
    </aside>
  );
}
