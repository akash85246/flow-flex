import { useEffect, useState, useContext } from "react";
import MyContext from "../../utils/context/MyContext";
import { useAuth } from "../../utils/authContext/authContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeamMembersCard from "../../components/cards/teamMembersCard";

import photo from "../../assets/defaultProfilePhoto.jpg";

export default function TeamMembers() {
  const { authToken, updateAuthToken } = useAuth();
  const { team, setTeam } = useContext(MyContext);
  useEffect(() => {
    setTeam([
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
      { name: "akash", image: photo, position: "sde", company: "flowFlex" },
    ]);
  }, []);
  return (
    <div className="p-5 shadow-lg sm:w-1/3 w-full">
      <h3 className="text-lg text-purple-800 p-2 font-semibold border-0 border-b-2 border-purple-800">
        Team Members
      </h3>
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:h-96 grid-cols-4 m-auto overflow-auto  sm:gap-5 gap-6 p-2">
        {team.map((member, index) => (
          <li key={index}>
            <TeamMembersCard
              name={member.name}
              image={member.image}
              position={member.position}
              company={member.company}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
