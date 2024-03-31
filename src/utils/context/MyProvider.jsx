import { useState } from "react";
import MyContext from "./MyContext";
import defaultProfilePhoto from "../../assets/defaultProfilePhoto.jpg";
const MyProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [resetPass, setResetPass] = useState("");
  const [userPhoto, setUserPhoto] = useState(defaultProfilePhoto);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [cards, setCards] = useState([]);
  const [team, setTeam] = useState([]);
  const [tools, setTools] = useState([]);

  const contextValue = {
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    name,
    setName,
    pass,
    setPass,
    resetPass,
    setResetPass,
    isSignedIn,
    setIsSignedIn,
    userPhoto,
    setUserPhoto,
    cards,
    setCards,
    notifications,
    setNotifications,
    updates,
    setUpdates,
    team,
    setTeam,
    tools,
    setTools,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyProvider;
