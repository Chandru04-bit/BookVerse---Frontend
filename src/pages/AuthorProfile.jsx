// ✅ src/pages/AuthorProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import booksData from "../data/booksData";      // default export
import authorsData from "../data/authorsData";  // default export

const AuthorProfile = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    const decodedName = decodeURIComponent(name).trim().toLowerCase();

    const foundAuthor = authorsData.find(
      (a) => a.name.trim().toLowerCase() === decodedName
    );
    setAuthor(foundAuthor);

    if (foundAuthor) {
      const booksByAuthor = booksData.filter(
        (book) =>
          book.author &&
          book.author.trim().toLowerCase() === foundAuthor.name.trim().toLowerCase()
      );
      setAuthorBooks(booksByAuthor);
    }
  }, [name]);

  if (!author)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Author not found.
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16 px-6 md:px-20">
      {/* Author Info */}
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.img
            src={author.image || "/assets/images/fallback.jpg"}
            alt={author.name}
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-100 shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{author.name}</h1>
            <p className="text-blue-600 text-lg font-semibold mb-4">{author.title}</p>
            <p className="text-gray-700 leading-relaxed max-w-2xl">{author.bio}</p>
          </div>
        </div>
      </motion.div>

      {/* Author's Books */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Books by {author.name}
        </h2>

        {authorBooks.length === 0 ? (
          <p className="text-center text-gray-500">No books found for this author.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
            {authorBooks.map((book, index) => {
              const offer = Math.floor(Math.random() * 20) + 10; // 10% to 30%
              const originalPrice = book.price
                ? Math.floor(book.price / (1 - offer / 100))
                : 0;
              const bookImage = book.img || book.image || "/assets/images/fallback.jpg";

              return (
                <motion.div
                  key={book._id || `${book.title}-${index}`} // ✅ unique key fallback
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden w-full max-w-[270px] cursor-pointer"
                  onClick={() => navigate(`/book/${book._id || index}`, { state: { book } })}
                >
                  <img
                    src={bookImage}
                    alt={book.title}
                    className="h-60 w-full object-contain p-4"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-blue-600 mb-2">By {book.author}</p>
                    <div className="flex justify-center gap-2">
                      <span className="text-gray-900 font-bold">₹{book.price}</span>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{originalPrice}
                      </span>
                      <span className="text-green-600 text-sm">{offer}% Off</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
