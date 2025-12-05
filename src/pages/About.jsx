import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      {/* 🌟 Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Our Bookstore</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            Inspiring readers, one book at a time — where stories meet discovery.
          </p>
        </motion.div>
      </section>

      {/* 💡 Our Mission */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-10"
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          We believe that every book has the power to transform lives. Our goal is to make reading accessible, enjoyable, and inspiring for everyone. Whether you're seeking knowledge, adventure, or emotion — our curated collection of books connects readers with stories that matter.
        </motion.p>
      </section>

      {/* 📚 What We Offer */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center"
          >
            What We Offer
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Wide Book Collection",
                desc: "Explore thousands of titles across fiction, romance, biographies, thrillers, and more.",
                icon: "📖",
              },
              {
                title: "Author Highlights",
                desc: "We feature inspiring authors and bring you closer to the stories behind their words.",
                icon: "✍️",
              },
              {
                title: "Reader Community",
                desc: "Join readers who share reviews, discussions, and book recommendations.",
                icon: "🌍",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏢 Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop"
            alt="Our Story"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
          />
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Founded in 2021, our online bookstore started with a passion for connecting people with books they love.
              What began as a small collection soon turned into a vast library for readers across India.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we continue to grow with one mission — to make every reading experience meaningful, enjoyable, and affordable for everyone.
            </p>
          </motion.div>
        </div>
      </section>


      {/* 💬 Join Us */}
      <section className="bg-gray-100 py-20 text-center text-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Join Our Reading Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg mb-10 text-gray-600"
        >
          Become a part of our growing community of readers, authors, and dreamers.
          Sign up, explore, and start your reading journey today!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => (window.location.href = "/explore")}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
        >
          Get Started
        </motion.button>
      </section>


    </div>
  );
};

export default About;

