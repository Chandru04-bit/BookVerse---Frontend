// ✅ src/pages/BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useCart } from "../components/context/CartContext";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!book);
  const [error, setError] = useState("");

  useEffect(() => {
    if (book) return;

    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://book-verse-amber.vercel.appapi/books/${id}`);
        const data = res.data?.book || res.data;

        if (!data) setError("Book not found.");
        else setBook(data);
      } catch (err) {
        console.error("❌ Error fetching book:", err);
        setError("Unable to fetch book. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, book]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg animate-pulse">
        Loading book details...
      </div>
    );

  if (error || !book)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-700 px-6">
        <h2 className="text-3xl font-bold mb-3">{error || "Book Not Found"}</h2>
        <button
          onClick={() => navigate("/explore")}
          className="px-6 py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
        >
          Back to Explore
        </button>
      </div>
    );

  const offer = Math.floor(Math.random() * 20) + 10;
  const originalPrice = Math.floor(book.price / (1 - offer / 100));
  const rating = Math.floor(Math.random() * 2) + 4;

  let bookImage = "/assets/images/fallback.jpg";
  if (book.img) bookImage = book.img;
  else if (book.image)
    bookImage = book.image.startsWith("http")
      ? book.image
      : `https://book-verse-frontend-gold.vercel.app/${book.image}`;

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white via-gray-50 to-slate-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-8"
      >
        {/* Book Image */}
        <div className="p-8 flex justify-center items-center bg-gray-50">
          <img
            src={bookImage}
            alt={book.title || "Book Image"}
            className="h-96 object-contain rounded-xl"
            onError={(e) => (e.currentTarget.src = "/assets/images/fallback.jpg")}
          />
        </div>

        {/* Book Info */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h2>
          <p className="text-blue-600 font-semibold mb-4 text-lg">By {book.author || "Unknown Author"}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
            <span className="text-gray-500 ml-2">({Math.floor(Math.random() * 200) + 50} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">₹{book.price}</span>
            <span className="text-gray-400 line-through text-lg">₹{originalPrice}</span>
            <span className="text-green-600 font-semibold">{offer}% Off</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">{book.description || "No description available."}</p>

          {/* Additional Info */}
          <div className="text-sm text-gray-600 space-y-2 mb-6">
            <p><strong>Category:</strong> {book.category || "N/A"}</p>
            <p><strong>Stock:</strong> {book.stock || 10} copies available</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast.dismiss(); // dismiss any previous toast
                addToCart(book);
                toast.success(`${book.title} added to cart!`);
                scrollToTop();
                setTimeout(() => navigate("/cart"), 500);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
            >
              Add to Cart
            </motion.button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BookDetails;
