// src/components/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// ---------------------------
// Axios setup
// ---------------------------
axios.defaults.baseURL = "https://book-verse-backend-azya.vercel.app"; // Live backend
axios.defaults.withCredentials = true; // Send HTTP-only cookies

// ---------------------------
// Create Context
// ---------------------------
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ---------------------------
// Auth Provider
// ---------------------------
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // Check if user is logged in on mount
  // ---------------------------
  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoading(true);
        // ✅ Relative path
        const { data } = await axios.get("/api/users/me");
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
  // Signup
  // ---------------------------
  const signup = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/signup", { name, email, password });
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
  // Login
  // ---------------------------
  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", { email, password });
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
  // Admin Login (Demo)
  // ---------------------------
  const adminLogin = (adminData) => {
    setAdmin(adminData);
    setUser(null);
    toast.success("Admin logged in!");
  };

  // ---------------------------
  // Logout
  // ---------------------------
  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
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
