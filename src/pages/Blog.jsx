// src/pages/Blog.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogData";


import { FaSearch } from "react-icons/fa";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // ✅ Extract categories dynamically (fallback to "General" if undefined)
  const categories = ["All", ...new Set(blogPosts.map((b) => b.category || "General"))];

  // ✅ Filter logic
  const filteredArticles = blogPosts.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || (article.category || "General") === selectedCategory;
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ Handle Newsletter Subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("subscribers", JSON.stringify(subscribers));
    }

    setEmail("");
    setShowPopup(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-900 relative">
      {/* 🌄 Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-24 text-center shadow-lg">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4 tracking-tight"
        >
          Discover Stories Worth Reading
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-blue-100 text-lg max-w-2xl mx-auto"
        >
          Explore ideas, reviews, and insights that inspire readers every day.
        </motion.p>
      </div>

      {/* 🔍 Search & Filters */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
       <div
  className="flex items-center bg-white shadow-md rounded-full overflow-hidden mb-10 px-4 py-2 border border-gray-200"
  role="search"
  aria-label="Search articles"
>
  {/* Hidden label for accessibility */}
  <label htmlFor="articleSearch" className="sr-only">
    Search articles
  </label>

  {/* Accessible search button (icon) */}
  <button
    type="button"
    aria-label="Search"
    title="Search"
    className="text-blue-600 mr-3 focus:outline-none"
  >
    <FaSearch />
  </button>

  {/* Input field */}
  <input
    id="articleSearch"
    name="search"
    type="text"
    placeholder="Search articles..."
    className="w-full outline-none text-gray-700"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    aria-label="Search articles"
  />
</div>


        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📰 Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl cursor-pointer transition"
              onClick={() => navigate(`/blog/${article.id}`)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <span className="text-xs font-semibold text-blue-600 uppercase">
                  {article.category || "General"}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.content.replace(/[`~]/g, "").slice(0, 120)}...
                </p>
                <p className="text-blue-600 mt-2 text-sm font-medium hover:underline">
                  Read More →
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 💌 Newsletter Section */}
      <section className="bg-white text-gray-900 py-20 mt-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Subscribe for Weekly Book Insights
          </motion.h2>

          <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
            Get the latest reading tips, author stories, and exclusive book
            recommendations delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row justify-center items-center gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 w-full sm:w-80 rounded-full border border-gray-300 focus:border-blue-600 outline-none text-gray-700 transition"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ✅ Subscription Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">
                  ✓
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Subscription Successful!
              </h3>
              <p className="text-gray-600 text-sm">
                You’ll now receive weekly book updates 🎉
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
