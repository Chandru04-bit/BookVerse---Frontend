

import React, { useState, useMemo } from "react";
import { useAdminData } from "../../components/context/AdminDataContext";
import {
  Search,
  Shield,
  User,
  Mail,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";

const UsersManager = () => {
  const { users, updateUserStatus } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // 🧠 Filter + Search + Sort Logic
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Role Filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Status Filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    // Sort
    if (sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "role") {
      filtered.sort((a, b) => a.role.localeCompare(b.role));
    } else if (sortOption === "date") {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return filtered;
  }, [users, searchQuery, sortOption, roleFilter, statusFilter]);

  // 📛 Status Toggle (Active/Blocked)
  const handleStatusToggle = (id) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      updateUserStatus(id, user.status === "active" ? "blocked" : "active");
    }
  };

  const RoleBadge = ({ role }) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        role === "admin"
          ? "bg-purple-100 text-purple-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      {role === "admin" ? "Admin" : "User"}
    </span>
  );

  const StatusBadge = ({ status }) => (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
        status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status === "active" ? (
        <>
          <CheckCircle size={14} /> Active
        </>
      ) : (
        <>
          <XCircle size={14} /> Blocked
        </>
      )}
    </span>
  );

  return (
    <div className="space-y-8">
      {/* 🧭 Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Users Manager</h1>
          <p className="text-gray-500">
            Manage all registered users, roles, and access.
          </p>
        </div>
      </div>

      {/* 🔍 Search + Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-md border">
        <div className="flex items-center gap-3 w-full lg:w-1/3">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none border-b border-gray-300 focus:border-blue-500 transition p-1"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
              <option value="date">Sort by Join Date</option>
            </select>
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* 🧾 Users Table */}
      <div className="bg-white rounded-xl shadow-md p-6 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="py-3">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id || index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 text-gray-500">{index + 1}</td>
                <td className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-800">{user.name}</span>
                </td>
                <td className="text-gray-600">{user.email}</td>
                <td>
                  <RoleBadge role={user.role} />
                </td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleStatusToggle(user.id)}
                    className={`px-3 py-1 text-xs rounded-lg font-semibold ${
                      user.status === "active"
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {user.status === "active" ? "Block" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManager;
