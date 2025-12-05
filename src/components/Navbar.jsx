// ✅ src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaBookOpen,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import { useMessage } from "./context/MessageContext";

const categories = [
  "Fiction",
  "Non Fiction",
  "Science",
  "History",
  "Children",
  "Thriller",
  "Fantasy",
  "Health",
];

const Navbar = () => {
  const { cartItems = [] } = useCart();
  const { isAuthenticated, logout, userRole } = useAuth();
  const { showMessage } = useMessage();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Detect scroll for shrinking header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const handleLogoClick = () => {
    if (userRole === "admin") navigate("/admin/home");
    else navigate("/home");
  };

  const handleLogout = () => {
    logout();
    showMessage("You have logged out successfully.", "info");
    navigate("/login");
  };

  const currentCategory = location.pathname.includes("/explore/")
    ? location.pathname.split("/explore/")[1].replace(/-/g, " ")
    : "";

  return (
    <motion.nav
      animate={{ height: scrolled ? 60 : 80 }}
      transition={{ duration: 0.25 }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 relative">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 cursor-pointer"
        >
          <FaBookOpen />
          <span>BookVerse</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          {/* Explore Dropdown */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <span className="hover:text-blue-600">Explore</span>
            <AnimatePresence>
              {exploreOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-6 left-0 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-50"
                >
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      onClick={() =>
                        navigate(`/explore/${cat.toLowerCase().replace(/ /g, "-")}`)
                      }
                      className={`px-4 py-2 cursor-pointer ${
                        currentCategory.toLowerCase() === cat.toLowerCase()
                          ? "bg-blue-100 font-semibold"
                          : "hover:bg-blue-50"
                      }`}
                    >
                      {cat}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/blog" className="hover:text-blue-600">
            Blog
          </NavLink>
          <NavLink to="/about" className="hover:text-blue-600">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:text-blue-600">
            Contact
          </NavLink>
        </div>

        {/* Cart + Auth */}
        <div className="hidden md:flex items-center gap-5">
          <div
            className="relative cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-gray-700 text-2xl" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: [1.3, 1] }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </div>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <FaUserCircle
              size={24}
              className="cursor-pointer hover:text-blue-600 transition"
              onClick={() => navigate("/login")}
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md px-6 py-4 space-y-4"
          >
            <NavLink to="/home" className="block text-gray-700 hover:text-blue-600">
              Home
            </NavLink>

            {/* Mobile Explore */}
            <div className="block">
              <span className="block text-gray-700 hover:text-blue-600 mb-2">
                Explore
              </span>
              <div className="pl-4 space-y-1">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() =>
                      navigate(`/explore/${cat.toLowerCase().replace(/ /g, "-")}`)
                    }
                    className={`cursor-pointer ${
                      currentCategory.toLowerCase() === cat.toLowerCase()
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            <NavLink to="/blog" className="block text-gray-700 hover:text-blue-600">
              Blog
            </NavLink>
            <NavLink to="/about" className="block text-gray-700 hover:text-blue-600">
              About
            </NavLink>
            <NavLink to="/contact" className="block text-gray-700 hover:text-blue-600">
              Contact
            </NavLink>

            <div className="border-t pt-3 flex items-center justify-between">
              <div
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer"
              >
                <FaShoppingCart className="text-gray-700 hover:text-blue-600 text-xl" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1.3, 1] }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
