// ✅ src/pages/admin/BookManager.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Search, Edit, Trash2, PlusCircle, BookOpen, XCircle, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000/api/books";

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "", author: "", category: "", price: "", stock: "", image: "", description: ""
  });
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setBooks(data.books || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books");
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook?._id) {
        await axios.put(`${API_URL}/${editingBook._id}`, formData);
        toast.success("Book updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Book added successfully!");
      }
      fetchBooks();
      setEditingBook(null);
      setFormData({ title: "", author: "", category: "", price: "", stock: "", image: "", description: "" });
    } catch (err) {
      console.error(err);
      toast.error("Error saving book");
    }
  };

  const handleEdit = (book) => { setEditingBook(book); setFormData(book); };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    }
  };

  // Filter & sort
  const filteredBooks = useMemo(() => {
    let result = books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter !== "all") result = result.filter((b) => b.category.toLowerCase() === categoryFilter.toLowerCase());
    return result.sort((a, b) => sort === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
  }, [books, search, categoryFilter, sort]);

  // Chart data
  const stockData = useMemo(() => {
    const grouped = books.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + Number(book.stock || 0);
      return acc;
    }, {});
    return Object.entries(grouped).map(([category, stock]) => ({ category, stock }));
  }, [books]);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="mb-6 w-full max-w-[1200px] flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
            <BookOpen size={30} /> Books Manager
          </h1>
          <p className="text-gray-500">Manage all books and inventory.</p>
        </div>
        <button
          onClick={() => setEditingBook({})}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg mt-3 sm:mt-0 hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} /> Add Book
        </button>
      </div>

      {/* Stock Chart */}
      <motion.div whileHover={{ scale: 1.01 }} className="bg-white p-5 rounded-xl shadow-sm border mb-6 w-full max-w-[1200px]">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-700">
          <BarChart3 className="text-blue-500" /> Stock Overview by Category
        </h2>
        {stockData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#3B82F6" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-10">No stock data available</p>
        )}
      </motion.div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row md:items-center gap-4 justify-between max-w-[1200px] w-full mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="asc">Sort A–Z</option>
            <option value="desc">Sort Z–A</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="all">All Categories</option>
            {[...new Set(books.map((b) => b.category))].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-auto max-h-[65vh] w-full max-w-[1200px]">
        <table className="min-w-[800px] text-left text-gray-700 text-base border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wide sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 border-b sticky left-0 bg-gray-100 z-20">#</th>
              <th className="px-6 py-4 border-b">Title</th>
              <th className="px-6 py-4 border-b">Author</th>
              <th className="px-6 py-4 border-b">Category</th>
              <th className="px-6 py-4 border-b text-right">Price</th>
              <th className="px-6 py-4 border-b text-center">Stock</th>
              <th className="px-6 py-4 border-b text-center">Added</th>
              <th className="px-6 py-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-10 text-lg italic">No books found 📖</td>
              </tr>
            ) : (
              filteredBooks.map((book, i) => (
                <tr key={book._id} className="hover:bg-blue-50 transition-all border-b last:border-b-0">
                  <td className="px-6 py-4 text-gray-500 font-medium sticky left-0 bg-white z-10">{i + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4 text-gray-700">{book.category}</td>
                  <td className="px-6 py-4 text-blue-700 font-semibold text-right">₹{book.price}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      book.stock > 10
                        ? "bg-green-100 text-green-700"
                        : book.stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>{book.stock > 0 ? `${book.stock} left` : "Out of Stock"}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">{new Date(book.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button onClick={() => handleEdit(book)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition" title="Edit Book">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(book._id)} className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition" title="Delete Book">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {editingBook && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-[95%] sm:w-[700px] md:w-[850px] lg:w-[950px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200 p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-700">{editingBook._id ? "Edit Book" : "Add New Book"}</h2>
                <button onClick={() => setEditingBook(null)} className="text-gray-500 hover:text-gray-700">
                  <XCircle size={26} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {["title","author","category","price","stock","image"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                    <input
                      type={["price","stock"].includes(field) ? "number" : "text"}
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                      required
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                ))}
                <div className="col-span-1 md:col-span-2">
                  <label className="text-sm text-gray-600 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Enter book description"
                    rows="5"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                    required
                  />
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
                  <button type="button" onClick={() => setEditingBook(null)} className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">{editingBook._id ? "Update" : "Add"}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookManager;
