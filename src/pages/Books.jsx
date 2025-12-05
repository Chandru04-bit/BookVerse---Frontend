import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("❌ Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-lg text-gray-700 animate-pulse">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <motion.section
      className="bg-gradient-to-br from-white to-blue-50 min-h-screen py-20 px-8"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex justify-center items-center gap-3">
          <BookOpen className="text-blue-600" size={40} />
          Available Books
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our latest collection of books curated for every reader — from
          fiction to technology, and everything in between.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {books.map((book, i) => (
          <motion.div
            key={book._id || i}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer border border-blue-100"
          >
            <img
              src={book.img || "/assets/images/default-book.jpg"}
              alt={book.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 italic">
                by {book.author || "Unknown Author"}
              </p>
              <p className="text-blue-700 font-bold text-lg mb-3">
                ₹{book.price || "N/A"}
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Books;
