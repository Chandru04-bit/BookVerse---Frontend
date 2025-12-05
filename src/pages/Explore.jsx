// ✅ src/pages/Explore.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../components/context/CartContext";

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

const Explore = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { category } = useParams();

  const selectedCategory = category
    ? category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data.books || res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Unable to fetch books. Please check your backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Filter, search, and sort books
  useEffect(() => {
    let filtered = [...books];

    if (selectedCategory) {
      filtered = filtered.filter(
        (b) =>
          b.category &&
          b.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((b) =>
        b.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "low") filtered.sort((a, b) => a.price - b.price);
    else if (sortOrder === "high") filtered.sort((a, b) => b.price - a.price);

    setFilteredBooks(filtered);
  }, [books, selectedCategory, searchTerm, sortOrder]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCartAndGo = (book) => {
    if (!book || (!book._id && !book.bookId)) {
      toast.error("Invalid book data!");
      return;
    }
    toast.dismiss(); // dismiss any previous toast
    addToCart(book);
    toast.success(`"${book.title}" added to cart!`);
    scrollToTop();
    navigate("/cart"); // Navigate to cart page immediately
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading books...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white via-gray-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
          {selectedCategory || "Explore Books"}
        </h2>
        <p className="text-gray-600">
          {selectedCategory
            ? `Showing books in "${selectedCategory}" category.`
            : "Browse and discover books. Filter by category, search, or sort by price."}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                navigate(`/explore/${cat.toLowerCase().replace(/ /g, "-")}`)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-64 outline-none shadow-sm"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 outline-none shadow-sm"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center text-gray-500">No books found.</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredBooks.map((book, index) => {
            const offer = Math.floor(Math.random() * 20) + 10;
            const originalPrice = book.price
              ? Math.floor(book.price / (1 - offer / 100))
              : 0;

            const imageSrc =
              book.image && book.image.startsWith("http")
                ? book.image
                : book.image
                ? `http://localhost:5000/${book.image}`
                : "/assets/images/fallback.jpg";

            return (
              <motion.div
                key={book._id || `${book.title}-${index}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-[270px] text-center relative"
              >
                {/* Click to view book details */}
                <motion.div
                  onClick={() => {
                    scrollToTop();
                    setTimeout(
                      () => navigate(`/book/${book._id}`, { state: { book } }),
                      300
                    );
                  }}
                  className="relative overflow-hidden cursor-pointer"
                >
                  <motion.img
                    src={imageSrc}
                    alt={book.title || "Book"}
                    className="h-64 w-full object-contain p-5 transition-all duration-500 hover:scale-110"
                    onError={(e) =>
                      (e.currentTarget.src = "/assets/images/fallback.jpg")
                    }
                  />
                </motion.div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
                    {book.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-blue-600 mb-2">
                    By {book.author || "Unknown"}
                  </p>

                  {book.price && (
                    <div className="flex justify-center items-center gap-2 mb-3">
                      <span className="text-gray-900 font-bold">₹{book.price}</span>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{originalPrice}
                      </span>
                      <span className="text-green-600 text-sm font-medium">
                        {offer}% Off
                      </span>
                    </div>
                  )}

                  {/* ✅ Add to Cart Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent click bubbling
                      toast.dismiss(); // dismiss previous toast
                      addToCart(book);
                      toast.success(`"${book.title}" added to cart!`);
                      scrollToTop();
                      navigate("/cart");
                    }}
                    className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
};

export default Explore;
