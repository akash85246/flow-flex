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
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          {/* Auth routes  */}
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <Signin />
              </AuthRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route
            path="/welcome"
            element={
              <AuthRoute>
                <Welcome />
              </AuthRoute>
            }
          />
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/board/:boardId"
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
