// ✅ src/pages/admin/DashboardHome.jsx
import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardHome = () => {
  // Static sample data
  const stats = {
    totalUsers: 120,
    totalOrders: 45,
    totalBooks: 80,
    totalRevenue: 15000,
  };

  const userStats = [
    { month: "Jan", count: 10 },
    { month: "Feb", count: 15 },
    { month: "Mar", count: 20 },
    { month: "Apr", count: 25 },
  ];

  const topBooks = [
    { title: "Book A", sold: 50 },
    { title: "Book B", sold: 30 },
    { title: "Book C", sold: 20 },
  ];

  const lineData = {
    labels: userStats.map((u) => u.month),
    datasets: [
      {
        label: "New Users",
        data: userStats.map((u) => u.count),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: topBooks.map((b) => b.title),
    datasets: [
      {
        data: topBooks.map((b) => b.sold),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">{key.replace("total", "").replace(/([A-Z])/g, " $1")}</h2>
            <p className="text-2xl font-bold">{key === "totalRevenue" ? `₹${value}` : value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <Line data={lineData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Top Selling Books</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
