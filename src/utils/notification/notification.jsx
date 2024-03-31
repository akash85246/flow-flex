import { useEffect, useState, useContext } from "react";
import MyContext from "../../utils/context/MyContext";
import { useAuth } from "../../utils/authContext/authContext";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import notificationPoint from "../../assets/notificationImage.png";

export default function UserNotification() {
  const { authToken, updateAuthToken } = useAuth();
  const { notifications, setNotifications, updates, setUpdates } =
    useContext(MyContext);

  useEffect(() => {
    setNotifications([
      { message: "Notification 1", time: "10:00 AM" },
      { message: "Notification 2", time: "11:30 AM" },
      { message: "Notification 3", time: "01:45 PM" },
      { message: "Notification 1", time: "10:00 AM" },
      { message: "Notification 2", time: "11:30 AM" },
      { message: "Notification 3", time: "01:45 PM" },
      { message: "Notification 1", time: "10:00 AM" },
      { message: "Notification 2", time: "11:30 AM" },
      { message: "Notification 3", time: "01:45 PM" },
      { message: "Notification 1", time: "10:00 AM" },
      { message: "Notification 2", time: "11:30 AM" },
      { message: "Notification 3", time: "01:45 PM" },
      { message: "Notification 1", time: "10:00 AM" },
      { message: "Notification 2", time: "11:30 AM" },
      { message: "Notification 3", time: "01:45 PM" },
    ]);
  }, []);
  return (
    <div className="h-full p-5 shadow-lg lg:w-full w-full">
      <h2 className="flex justify-between text-xl font-semibold p-2 border-0 border-b-2 border-purple-800 text-purple-950">
        <span>Notification</span>
        <span>Time</span>
      </h2>
      <ul className=" flex flex-col gap-2 p-2 scroll-smooth overflow-x-hidden overflow-y-auto h-52">
        {notifications.map((notification, index) => (
          <li key={index} className="flex justify-between">
            <span className="flex gap-2 justify-center items-center">
              <img src={notificationPoint} className="h-5 w-5"></img>
              <span>{notification.message}</span>
            </span>

            <span>{notification.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
