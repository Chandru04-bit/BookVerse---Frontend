

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAdminData } from "../../components/context/AdminDataContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ClipboardList, Filter, Trash2 } from "lucide-react";

const OrdersManager = () => {
  const { orders, setOrders } = useAdminData();
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // ✅ Always ensure orders is a proper array
  const safeOrders = useMemo(() => {
    if (Array.isArray(orders)) return orders;
    if (orders?.orders && Array.isArray(orders.orders)) return orders.orders;
    return [];
  }, [orders]);

  // ✅ Fetch all orders from backend (Admin)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        console.log("📦 Orders fetched:", res.data);

        // Match your backend: it sends { success, count, orders }
        const fetched = res.data?.orders || [];
        setOrders(fetched);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        toast.error("Failed to load orders");
        setOrders([]);
      }
    };

    // Load orders only if not already available
    if (!safeOrders.length) fetchOrders();
  }, []);

  // 🔍 Filter + Search Logic
  const filteredOrders = useMemo(() => {
    let filtered = safeOrders;

    if (statusFilter !== "All") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (o) =>
          o.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [safeOrders, searchTerm, statusFilter]);

  // 📊 Stats Summary
  const totalOrders = safeOrders.length;
  const delivered = safeOrders.filter((o) => o.status === "Delivered").length;
  const pending = safeOrders.filter((o) => o.status === "Pending").length;
  const cancelled = safeOrders.filter((o) => o.status === "Cancelled").length;
  const totalSales = safeOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  // 📈 Monthly Chart
  const salesByMonth = useMemo(() => {
    const months = {};
    safeOrders.forEach((o) => {
      const month = new Date(o.createdAt).toLocaleString("default", {
        month: "short",
      });
      months[month] = (months[month] || 0) + (o.total || 0);
    });
    return Object.entries(months).map(([month, total]) => ({ month, total }));
  }, [safeOrders]);

  // ✅ Update order status (Admin)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus }
      );

      if (res.data?.success) {
        toast.success("Order status updated!");
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? res.data.order : o))
        );
      } else {
        toast.error("Failed to update order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  // 🗑️ Delete order
  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      toast.success("Order deleted");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };

  return (
    <motion.div
      className="space-y-8 p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            <ClipboardList className="text-blue-600" /> Orders Manager
          </h1>
          <p className="text-gray-500">
            Monitor, filter, and manage all customer orders.
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold text-blue-700">{totalOrders}</h2>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Delivered</p>
          <h2 className="text-2xl font-bold text-green-600">{delivered}</h2>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">{pending}</h2>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-2xl font-bold text-purple-600">₹{totalSales}</h2>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Sales Overview</h2>
        {salesByMonth.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No order data available
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white shadow p-4 rounded-xl">
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <Filter className="text-gray-500" />
          <select
            className="border rounded-lg px-3 py-2 text-gray-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by Order ID or User..."
          className="border rounded-lg px-3 py-2 w-full sm:w-64 text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md p-6 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">All Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="py-3">#</th>
              <th>User</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="py-3">{index + 1}</td>
                  <td className="font-medium">
                    {order.userId?.name || "Unknown"} <br />
                    <span className="text-xs text-gray-500">
                      {order.userId?.email}
                    </span>
                  </td>
                  <td>
                    <ul className="text-sm list-disc ml-4">
                      {order.items?.map((item, i) => (
                        <li key={i}>
                          {item.title} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.total}</td>
                  <td>
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersManager;
