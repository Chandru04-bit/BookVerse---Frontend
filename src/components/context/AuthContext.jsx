// src/components/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Set Axios base URL
axios.defaults.baseURL = "http://localhost:5000";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Load user from localStorage
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userAuth");
    return stored ? JSON.parse(stored) : null;
  });

  // Load admin from localStorage
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("adminAuth");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);

  // Save user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("userAuth", JSON.stringify(user));
    else localStorage.removeItem("userAuth");
  }, [user]);

  // Save admin to localStorage
  useEffect(() => {
    if (admin) localStorage.setItem("adminAuth", JSON.stringify(admin));
    else localStorage.removeItem("adminAuth");
  }, [admin]);

  // ---------------------------
  // USER SIGNUP
  // ---------------------------
  const signup = async ({ name, email, password }) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
        role: "user",
      });

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

      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

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
  const logout = () => {
    setUser(null);
    setAdmin(null);
    toast.success("Logged out!");
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
