import { useState } from "react";
import LoaderButton from "../../components/buttons/button";
import Navbar from "../../components/navbar/userNavbar";
import Footer from "../../components/footer/footer";
import searchIcon from "../../assets/searchIcon.png";
import UserCalendar from "../../utils/calendar/calendar";
import UserNotification from "../../utils/notification/notification";
import Tasks from "../../utils/userTasks/tasks";
import Updates from "../../utils/updates/updates";
import TeamMembers from "../../utils/team/teamMember";
import UserTools from "../../utils/userTools/tools";
import Sidebar from "../../components/sidebar/sidebar";
export default function HelloUser() {
  const [loading1, setLoading1] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className=" flex">
      <div className="px-10 py-2  flex justify-between items-center fixed w-full bg-white z-50">
        <div>
          <h1 className="text-3xl text-purple-950 font-extrabold">
            Welcome Back , User
          </h1>
          <p className="text-lg text-purple-800 font-bold">
            Manage your projects with FlowFlex
          </p>
        </div>
        <div className="search-bar w-1/3 relative">
          {/* Search input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
            maxLength={50}
            className="border border-purple-800 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-900 w-full"
          />

          {/* Search icon */}
          <img
            src={searchIcon}
            alt="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6"
          />
        </div>
        <div>
          {" "}
          <Navbar></Navbar>
        </div>
      </div>
      <Sidebar></Sidebar>

      <div className="ml-8 p-5">
        <div className=" pl-10 pt-20 flex flex-col gap-5 w-full">
          <div className="sm:flex w-full justify-between gap-5">
            <UserCalendar></UserCalendar>
            <UserNotification></UserNotification>
          </div>

          <div className="sm:flex justify-between lg:gap-5 gap-2">
            <Tasks></Tasks>
            <div className="flex flex-col lg:gap-5 gap-2">
              <Updates></Updates>
              <UserTools></UserTools>
            </div>
            <TeamMembers></TeamMembers>
          </div>
        </div>
      </div>
    </div>
  );
}
