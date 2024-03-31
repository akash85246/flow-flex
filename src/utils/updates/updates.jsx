import { useEffect, useState, useContext } from "react";
import MyContext from "../../utils/context/MyContext";
import { useAuth } from "../../utils/authContext/authContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateCard from "../../components/cards/updateCard";
import photo from "../../assets/defaultProfilePhoto.jpg";

export default function Updates() {
  const { authToken, updateAuthToken } = useAuth();
  const { updates, setUpdates } = useContext(MyContext);

  // Set sample data for updates state
  useEffect(() => {
    setUpdates([
      {
        photo: photo,
        heading: "Sample Update 1",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        photo: photo,
        heading: "Sample Update 2",
        info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        photo: photo,
        heading: "Sample Update 2",
        info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        photo: photo,
        heading: "Sample Update 2",
        info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        photo: photo,
        heading: "Sample Update 2",
        info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        photo: photo,
        heading: "Sample Update 2",
        info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        photo: photo,
        heading: "Sample Update 2",
        info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ]);
  }, []);

  return (
    <div className="p-5 shadow-lg w-full h-full ">
      <h1 className="text-lg text-purple-800 p-2 font-semibold border-0 border-b-2 border-purple-800">
        Updates
      </h1>
      <ul className="h-52 overflow-auto flex flex-col gap-2">
        {updates.map((update, index) => (
          <UpdateCard
            key={index}
            photo={update.photo}
            heading={update.heading}
            info={update.info}
          />
        ))}
      </ul>
    </div>
  );
}
