// ✅ src/pages/admin/AdminDashboard.jsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Search } from "lucide-react";
import { AdminDataProvider } from "../../components/context/AdminDataContext";

// ✅ Create global context for admin search
const AdminSearchContext = createContext();
export const useAdminSearch = () => useContext(AdminSearchContext);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ✅ Hide toast automatically if navigating away from /admin
  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      setShowToast(false);
    }
  }, [location]);

  // ✅ Handle logout cleanly
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate("/login", { replace: true });
    }, 700);
  };

  // ✅ Active sidebar link style
  const navLinkStyle = ({ isActive }) =>
    `px-3 py-2 rounded transition font-medium ${
      isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700 text-blue-100"
    }`;

  return (
    <AdminDataProvider>
      <AdminSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        <div className="flex min-h-screen bg-gray-100">
          {/* ✅ Sidebar */}
          <aside className="w-64 bg-blue-800 text-white flex flex-col p-4 shadow-lg">
            <div className="mb-6 text-center border-b border-blue-700 pb-4">
              <h2 className="text-2xl font-bold tracking-wide">BookVerse</h2>
              <p className="text-sm text-blue-200">Admin Panel</p>
            </div>

            {/* ✅ Navigation Links */}
            <nav className="flex flex-col gap-1 flex-grow">
              <NavLink to="/admin/home" className={navLinkStyle}>
                Dashboard Home
              </NavLink>
              <NavLink to="/admin/books" className={navLinkStyle}>
                Books Manager
              </NavLink>
              <NavLink to="/admin/users" className={navLinkStyle}>
                Users Manager
              </NavLink>
              <NavLink to="/admin/orders" className={navLinkStyle}>
                Orders Manager
              </NavLink>
              <NavLink to="/admin/settings" className={navLinkStyle}>
                Settings
              </NavLink>
            </nav>

            {/* ✅ Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
            >
              <LogOut size={18} /> Logout
            </button>

            <div className="text-xs text-blue-300 text-center mt-4">
              © {new Date().getFullYear()} BookVerse Admin
            </div>
          </aside>

          {/* ✅ Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* ✅ Topbar */}
            <header className="flex items-center justify-between bg-white shadow p-4">
              <h1 className="text-xl font-semibold text-gray-800">
                Admin Dashboard
              </h1>

              {/* 🔍 Global Search */}
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-500"
                  size={18}
                />
              </div>
            </header>

            {/* ✅ Toast */}
            {showToast && location.pathname.startsWith("/admin") && (
              <div className="fixed top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out">
                Logging out...
              </div>
            )}

            {/* ✅ Page Outlet */}
            <main className="p-6 flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </AdminSearchContext.Provider>
    </AdminDataProvider>
  );
};

export default AdminDashboard;
