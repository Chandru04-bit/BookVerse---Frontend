// src/components/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Set Axios base URL
axios.defaults.baseURL = "https://your-backend.vercel.app"; // replace with your deployed backend URL
axios.defaults.withCredentials = true; // Important to send cookies

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // No localStorage
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // Start as loading

  // ---------------------------
  // Check if user is logged in on mount
  // ---------------------------
  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/users/me"); // backend should return user if cookie valid
        setUser(data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // ---------------------------
  // USER SIGNUP
  // ---------------------------
  const signup = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/signup",
        { name, email, password },
        { withCredentials: true }
      );

      setUser(data.user);
      setAdmin(null);
      toast.success("Signup successful!");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // USER LOGIN
  // ---------------------------
  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      setUser(data.user);
      setAdmin(null);
      toast.success("Login successful!");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // ADMIN LOGIN (DEMO)
  // ---------------------------
  const adminLogin = (adminData) => {
    setAdmin(adminData);
    setUser(null);
    toast.success("Admin logged in!");
  };

  // ---------------------------
  // LOGOUT
  // ---------------------------
  const logout = async () => {
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      setAdmin(null);
      toast.success("Logged out!");
    }
  };

  const isAdmin = !!admin || user?.role === "admin";
  const isAuthenticated = !!user || !!admin;

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isAdmin,
        isAuthenticated,
        signup,
        login,
        adminLogin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
