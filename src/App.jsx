import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/auth/SignIn";
import Signup from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import Board from "./pages/Board";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthRoute from "./components/ProtectedRoute/AuthRoute";
import MainLayout from "./components/layout/Main.layout";
import AuthLayout from "./components/layout/Auth.layout";
import DashboardLayout from "./components/layout/Dashboard.layout";
import ResetPassword from "./pages/auth/ResetPassword";

import signinImage from "./assets/auth/illustrations/signin.svg";
import signupImage from "./assets/auth/illustrations/signup.svg";
import verificationImage from "./assets/auth/illustrations/verification.svg";
import "./styles/App.css";
import axios from "axios";

axios.defaults.withCredentials = true;
function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route
          path="/"
          element={
            <AuthLayout
              image={signinImage}
              title="Welcome Back!"
              description="Log in to your account to continue your journey with Flow Flex."
            />
          }
        >
          <Route
            path="signin"
            element={
              <AuthRoute>
                <Signin />
              </AuthRoute>
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <AuthLayout
              image={signupImage}
              title="Join Us!"
              description="Create a new account and start your journey with Flow Flex."
            />
          }
        >
          <Route
            path="signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <AuthLayout
              image={verificationImage}
               title="Reset Your Password"
              description="Secure your account by following the steps to reset your password and continue your journey with Flow Flex."
            />
          }
        >
          <Route
            path="resetpassword"
            element={
              <AuthRoute>
                <ResetPassword />
              </AuthRoute>
            }
          />
        </Route>

        {/* Main layout routes */}
        <Route element={<MainLayout />}>
          <Route
            path="welcome"
            element={
              <AuthRoute>
                <Welcome />
              </AuthRoute>
            }
          />
      
          <Route
            path="board/:boardId"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
        </Route>

        {/*Dash Board layout routes */}
        <Route element={<DashboardLayout />}>
          
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
       
          <Route
            path="board/:boardId"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
