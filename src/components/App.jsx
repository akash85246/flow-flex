// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProvider from "../utils/context/MyProvider";
import { AuthProvider } from "../utils/authContext/authContext";
import SignIn from "../pages/signin/signin";
import Home from "../pages/home/homePage";
import SignUp from "../pages/signup/signup";
import ForgetPassword from "../pages/forgotCredentials/forgot";

export default function App() {
  return (
    <AuthProvider>
      <MyProvider>
        <Router>
          {/* Place ToastContainer outside the Routes */}
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
          </Routes>
        </Router>
      </MyProvider>
    </AuthProvider>
  );
}
