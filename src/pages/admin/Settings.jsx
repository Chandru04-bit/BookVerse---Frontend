//src/pages/admin/Settings.jsx

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Sun,
  Moon,
  CheckCircle,
  Save,
} from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@elibrary.com",
  });
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    orders: true,
    users: false,
    reports: true,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSuccessMessage("Settings saved successfully ✅");
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-500">Manage your profile and system preferences.</p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 bg-green-100 text-green-700 border border-green-200 px-4 py-3 rounded-lg shadow-sm">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <User size={18} /> Profile Settings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>
      </div>


      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Bell size={18} /> Notifications
        </h2>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center justify-between border-b pb-2"
            >
              <span className="capitalize text-gray-700">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                className="w-5 h-5 accent-blue-600"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Lock size={18} /> Change Password
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Current Password
            </label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              name="newPass"
              value={passwords.newPass}
              onChange={handlePasswordChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;


