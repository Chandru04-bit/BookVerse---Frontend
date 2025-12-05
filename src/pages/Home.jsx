// ✅ src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { featuredBooks } from "../data/booksData";
import { blogPosts } from "../data/blogData";
import { useCart } from "../components/context/CartContext"; // Import CartContext

// ===================== Carousel Images =====================
const carouselImages = [
  { id: 1, src: "/assets/images/carouse-1.jpg", caption: "Discover Your Next Great Read" },
  { id: 2, src: "/assets/images/carouse-2.jpg", caption: "Bestsellers You Can’t Miss" },
  { id: 3, src: "/assets/images/carouse-3.jpg", caption: "New Arrivals Every Week!" },
];

// ===================== Category Images =====================
const categories = [
  { name: "Fiction", image: "/assets/images/categories/category1.jpg" },
  { name: "History", image: "/assets/images/categories/category2.jpg" },
  { name: "Fantasy", image: "/assets/images/categories/category3.jpg" },
  { name: "Drama", image: "/assets/images/categories/category4.jpg" },
];

// ===================== Authors =====================
const authors = [
  { id: 1, name: "Colleen Hoover", title: "Romance & Drama Novelist", image: "/assets/images/authors/colleen-hoover.jpg" },
  { id: 2, name: "James Clear", title: "Author of Atomic Habits", image: "/assets/images/authors/james-clear.jpg" },
  { id: 3, name: "Haruki Murakami", title: "Magical Realism & Contemporary Fiction Master", image: "/assets/images/authors/haruki-murakami.jpg" },
  { id: 4, name: "J.K. Rowling", title: "Fantasy Fiction Icon", image: "/assets/images/authors/jk-rowling.jpg" },
];

// ===================== Home Component =====================
const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Get addToCart from context
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top function
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    navigate(`/explore/${categoryName.toLowerCase().replace(/ /g, "-")}`);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===================== Hero Carousel ===================== */}
      <motion.section
        className="relative w-full h-[90vh] overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        {carouselImages.map((image, index) => (
          <motion.img
            key={image.id}
            src={image.src}
            alt={image.caption}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIndex === index ? 1 : 0 }}
            transition={{ duration: 1.2 }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.h2
            key={carouselImages[currentIndex].caption}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl"
          >
            {carouselImages[currentIndex].caption}
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/explore");
              scrollToTop();
            }}
            className="mt-4 px-10 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold shadow-xl transition-all duration-300"
          >
            Explore Now →
          </motion.button>
        </div>
      </motion.section>

      {/* ===================== Featured Books ===================== */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white via-gray-50 to-slate-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">Featured Books</h2>
          <p className="text-gray-600">Discover books readers are loving right now!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
          {featuredBooks.map((book) => {
            const offer = Math.floor(Math.random() * 20) + 10;
            const originalPrice = Math.floor(book.price / (1 - offer / 100));

            return (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden w-full max-w-[270px]"
              >
                <div
                  onClick={() => {
                    scrollToTop();
                    setTimeout(() => navigate(`/book/${book.id}`, { state: { book } }), 300);
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src={book.img || "/assets/images/fallback.jpg"}
                    alt={book.title}
                    className="h-60 w-full object-contain p-4"
                    onError={(e) => (e.currentTarget.src = "/assets/images/fallback.jpg")}
                  />
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-sm text-blue-600 mb-2">By {book.author || "Unknown Author"}</p>
                  <div className="flex justify-center gap-2">
                    <span className="text-gray-900 font-bold">₹{book.price}</span>
                    <span className="text-gray-400 line-through text-sm">₹{originalPrice}</span>
                    <span className="text-green-600 text-sm">{offer}% Off</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(book);
                      scrollToTop();
                      setTimeout(() => navigate("/cart"), 200);
                    }}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===================== Browse by Category ===================== */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-white via-slate-50 to-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">Browse by Category</h2>
          <p className="text-gray-600 text-lg">Explore your favorite genres — from romance to biographies.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-6 left-0 right-0 text-white text-2xl font-bold text-center">
                {cat.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== Authors ===================== */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">Meet Our Top Authors ✍️</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
          {authors.map((author) => (
            <motion.div
              key={author.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[260px] cursor-pointer"
              onClick={() => {
                navigate(`/author/${encodeURIComponent(author.name)}`);
                scrollToTop();
              }}
            >
              <img src={author.image} alt={author.name} className="h-64 w-full object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{author.name}</h3>
                <p className="text-sm text-gray-500">{author.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== Blog Section ===================== */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">Latest from Our Blog</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {blogPosts.slice(0, 3).map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                navigate(`/blog/${blog.id}`);
                scrollToTop();
              }}
              className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[360px] cursor-pointer"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{blog.author}</p>
                <span className="text-gray-400 text-xs">{blog.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
