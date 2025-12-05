// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Context Providers
import { CartProvider } from "./components/context/CartContext";
import { MessageProvider } from "./components/context/MessageContext";
import { useAuth } from "./components/context/AuthContext";

// Pages
import LoginSignup from "./pages/LoginSignup"; // <--- fixed import
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Explore from "./pages/Explore";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AuthorProfile from "./pages/AuthorProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import BooksManager from "./pages/admin/BooksManager";
import UsersManager from "./pages/admin/UsersManager";
import OrdersManager from "./pages/admin/OrdersManager";
import Settings from "./pages/admin/Settings";

// =================== Protected Routes ===================

// Admin Route
const AdminRoute = ({ children }) => {
  const { admin, user } = useAuth() || {};
  const localAdmin = JSON.parse(localStorage.getItem("adminAuth"));
  const isAdmin = Boolean(admin || localAdmin) || (user && user.role === "admin");

  if (!isAdmin) return <Navigate to="/login" replace />;
  return children;
};

// User Protected Route
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth() || {};
  const localUser = JSON.parse(localStorage.getItem("userAuth"));
  const isLoggedIn = Boolean(user || localUser);

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

// Redirect logged-in user from /login to /home
const LoginRoute = ({ children }) => {
  const { user } = useAuth() || {};
  const localUser = JSON.parse(localStorage.getItem("userAuth"));
  const isLoggedIn = Boolean(user || localUser);

  if (isLoggedIn) return <Navigate to="/home" replace />;
  return children;
};

function App() {
  return (
    <CartProvider>
      <MessageProvider>
        <Toaster position="top-right" />

        <Routes>
          {/* =================== DEFAULT REDIRECT =================== */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* =================== LOGIN / SIGNUP =================== */}
          <Route
            path="/login"
            element={
              <LoginRoute>
                <>
                  <Navbar />
                  <LoginSignup />
                  <Footer />
                </>
              </LoginRoute>
            }
          />

          {/* =================== USER ROUTES =================== */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <About />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Blog />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BlogDetails />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Books />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BookDetails />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/:category?"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Explore />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Cart />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Checkout />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          {/* =================== AUTHOR PROFILE =================== */}
          <Route
            path="/author/:name"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <AuthorProfile />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          {/* =================== ADMIN ROUTES =================== */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<DashboardHome />} />
            <Route path="books" element={<BooksManager />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="orders" element={<OrdersManager />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* =================== FALLBACK =================== */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </MessageProvider>
    </CartProvider>
  );
}

export default App;
