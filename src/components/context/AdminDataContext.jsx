// ✅ src/components/context/AdminDataContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// 🧠 Create Context
const AdminDataContext = createContext();

// 🧩 Provider
export const AdminDataProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://book-verse-amber.vercel.appapi/orders");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];
        setOrders(data);
      } catch (err) {
        console.warn("⚠️ Backend /api/orders not found — using mock data.");
        // 🧩 Mock fallback data (prevents 404 crash)
        setOrders([
          { _id: 1, user: "John Doe", total: 299, status: "Pending" },
          { _id: 2, user: "Jane Smith", total: 499, status: "Delivered" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <AdminDataContext.Provider
      value={{
        orders,
        setOrders,
        books,
        setBooks,
        users,
        setUsers,
        loading,
        error,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

// 🪄 Custom Hook for easy access
export const useAdminData = () => useContext(AdminDataContext);
