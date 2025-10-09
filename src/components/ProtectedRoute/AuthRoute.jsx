import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import axios from "axios";

const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/check`,
          {
            withCredentials: true,
          }
        );
        console.log("Auth check response:", res.data);
        const userData = res.data.user;
        if (userData) {
          dispatch(setUser(userData));
        } else {
          dispatch(clearUser());
        }
        setAuthenticated(res.data.authenticated);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return authenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default AuthRoute;
