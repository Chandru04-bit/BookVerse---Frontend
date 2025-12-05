import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        if (data.success) setBooks(data.books);
        else setBooks([]);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-24">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        📚 Explore Our Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-600">Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <motion.div
              key={book._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
              onClick={() => navigate(`/books/${book._id}`)}
            >
              {/* Book Cover */}
              <div className="w-full h-64 flex justify-center items-center overflow-hidden rounded-t-2xl bg-gray-100">
                <img
                  src={
                    book.cover?.startsWith("http")
                      ? book.cover
                      : book.cover
                      ? `http://localhost:5000/uploads/${book.cover}`
                      : "/assets/images/fallback.jpg"
                  }
                  alt={book.title}
                  className="w-full h-full object-contain"
                  onError={(e) =>
                    (e.target.src = "/assets/images/fallback.jpg")
                  }
                />
              </div>

              {/* Book Info */}
              <div className="flex flex-col p-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 break-words">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 break-words">
                  {book.author}
                </p>
                <p className="text-green-600 font-medium mt-auto">
                  ₹{book.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BookList;
