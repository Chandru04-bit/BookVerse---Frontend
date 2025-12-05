// src/components/AdminTopbar.jsx
import React from "react";
import { useAuth } from "../components/context/AuthContext"; // adjust path if needed
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminTopbar = ({ onSearch }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold">Admin Dashboard</h3>
        <input
          onChange={(e) => onSearch && onSearch(e.target.value)}
          placeholder="Search anything..."
          className="px-3 py-2 border rounded-md text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <FaBell />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded-md text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;


