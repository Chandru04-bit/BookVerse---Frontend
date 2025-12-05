// src/components/AuthorsSpotlight.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const authors = [
  {
    name: "Emily Carter",
    genre: "Romance",
    books: 12,
    bio: "Emily Carter is a best-selling romance novelist known for emotional storytelling.",
    img: "/assets/authors/author1.jpg",
  },
  {
    name: "James Parker",
    genre: "Thriller",
    books: 8,
    bio: "James Parker writes gripping thrillers full of twists and suspense.",
    img: "/assets/authors/author2.jpg",
  },
  {
    name: "Sophia Reed",
    genre: "Fantasy",
    books: 10,
    bio: "Sophia Reed brings magical worlds to life through her fantasy novels.",
    img: "/assets/authors/author3.jpg",
  },
];

function AuthorsSpotlight() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
        Authors Spotlight
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {authors.map((author, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md text-center transition-all duration-300"
          >
            <motion.img
              src={author.img}
              alt={author.name}
              whileHover={{ rotate: 1 }}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-6 ring-2 ring-gray-100 hover:ring-indigo-300 transition-all duration-300"
            />
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">
              {author.name}
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              {author.books} Published Books
            </p>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
              {author.bio}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/author/${encodeURIComponent(author.name)}`)}
              className="px-5 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all"
            >
              View Profile
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default AuthorsSpotlight; 
