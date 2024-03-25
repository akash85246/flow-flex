import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [resetPass, setResetPass] = useState("");

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
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyProvider;
