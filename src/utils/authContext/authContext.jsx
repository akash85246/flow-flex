import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    return storedToken || null;
  });

  const updateAuthToken = (newAuthToken) => {
    setAuthToken(newAuthToken);
    localStorage.setItem("authToken", newAuthToken);
  };

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
