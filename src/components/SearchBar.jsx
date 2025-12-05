// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced Search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") fetchSuggestions(query);
      else setSuggestions([]);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchSuggestions = async (searchTerm) => {
    setLoading(true);
    try {
      // Replace with your backend API endpoint
      const res = await axios.get(`/api/books/search?q=${searchTerm}`);
      setSuggestions(res.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div
  className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500"
  role="search"
  aria-label="Search books"
>
  {/* Hidden label for screen readers */}
  <label htmlFor="searchInput" className="sr-only">
    Search books, authors, or genres
  </label>

  {/* Search input */}
  <input
    id="searchInput"
    name="search"
    type="text"
    value={query}
    placeholder="Search books, authors, genres..."
    onChange={(e) => setQuery(e.target.value)}
    className="flex-1 outline-none text-gray-700"
    aria-label="Search books, authors, or genres"
  />

  {/* Accessible search button */}
  <button
    type="button"
    aria-label="Search"
    title="Search"
    className="text-gray-500 text-lg focus:outline-none"
  >
    <FaSearch />
  </button>
</div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute bg-white w-full mt-2 rounded-lg border shadow-lg z-50 max-h-64 overflow-auto"
          >
            {suggestions.map((book, index) => (
              <li
                key={index}
                onClick={() => onSelect(book)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              >
                <FaSearch className="text-gray-400 text-sm" />
                {book.title}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Loader */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-6 top-2 text-sm text-gray-400"
        >
          Searching...
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
