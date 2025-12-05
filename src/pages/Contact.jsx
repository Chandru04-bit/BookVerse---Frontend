import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Advanced Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-10 rounded-3xl shadow-2xl flex flex-col space-y-8 overflow-hidden"
        >
          {/* Decorative Circles */}
          <div className="absolute top-[-40px] right-[-40px] w-32 h-32 rounded-full bg-white/10 filter blur-3xl"></div>
          <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 rounded-full bg-white/20 filter blur-2xl"></div>

          <h2 className="text-3xl font-semibold text-white mb-2">Get in Touch</h2>
          <p className="text-white/90">
            Have questions, suggestions, or need support? Reach out to our friendly team anytime!
          </p>

          {/* Info Blocks */}
          <div className="space-y-4">
            <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-4 bg-white/10 p-3 rounded-xl backdrop-blur-md">
              <FaPhone className="text-white text-xl" />
              <span className="text-white font-medium">+91 123 456 7890</span>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-4 bg-white/10 p-3 rounded-xl backdrop-blur-md">
              <FaEnvelope className="text-white text-xl" />
              <span className="text-white font-medium">support@elibrary.com</span>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-4 bg-white/10 p-3 rounded-xl backdrop-blur-md">
              <FaMapMarkerAlt className="text-white text-xl" />
              <span className="text-white font-medium">123 Book Street, Knowledge City, India</span>
            </motion.div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 mt-6">
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
              <FaFacebookF className="text-white" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
              <FaTwitter className="text-white" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
              <FaInstagram className="text-white" />
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-2xl flex flex-col space-y-6"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Send a Message</h2>

          {submitted && (
            <p className="text-green-600 font-medium">
              Your message has been sent successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Google Map */}
          <div className="mt-8 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0191855861087!2d-122.41941548468116!3d37.77492977975973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d1f1a7ab%3A0x6e4fbbb7c0b0f9a!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1699988776655!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

