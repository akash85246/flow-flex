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
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyProvider;
