// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProvider from "../utils/context/MyProvider";
import { AuthProvider } from "../utils/authContext/authContext";
import SignIn from "../pages/signin/signin";
import Home from "../pages/home/homePage";
import SignUp from "../pages/signup/signup";
import SignUpOtp from "../components/authentication/forgotPassword/otp";
import ForgetPassword from "../components/authentication/forgotPassword/forgot";
import ForgetPasswordOtp from "../components/authentication/forgotPassword/otp";

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
            <Route path="/signupVerification" element={<SignUpOtp />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route
              path="/passwordverification"
              element={<ForgetPasswordOtp />}
            />
          </Routes>
        </Router>
      </MyProvider>
    </AuthProvider>
  );
}
