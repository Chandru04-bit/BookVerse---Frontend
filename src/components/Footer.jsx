// ✅ src/components/Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* --- Main Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 📘 Brand Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4">BookVerse</h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-5">
              Discover stories, explore knowledge, and read anywhere, anytime
              with your trusted digital library.
            </p>

            {/* 🌐 Social Links */}
            <div className="flex gap-4 mt-4">
              {[
                { icon: <FaFacebookF />, link: "#" },
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
                { icon: <FaYoutube />, link: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-300 hover:bg-white hover:text-blue-700 transition duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 🔗 Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Explore", path: "/explore" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="hover:text-white transition duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 💌 Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-blue-100 text-sm mb-4">
              Subscribe to get the latest updates, book recommendations, and
              author insights.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for subscribing!");
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="px-4 py-2 rounded-md border border-blue-300 text-gray-800 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-md hover:bg-blue-100 transition text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-blue-400 mt-10 pt-6 text-center text-sm text-blue-100">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">BookVerse</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
