// src/pages/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sophia Turner",
    role: "Author of 'Beyond the Stars'",
    feedback:
      "This platform has completely transformed how I connect with readers. The interface is clean, intuitive, and engaging!",
    image: "/assets/images/user1.jpg",
  },
  {
    name: "Daniel Cooper",
    role: "Book Enthusiast",
    feedback:
      "I love discovering new authors here. The personalized recommendations are spot-on every time.",
    image: "/assets/images/user2.jpg",
  },
  {
    name: "Emily Johnson",
    role: "Writer & Editor",
    feedback:
      "A fantastic experience! The community is inspiring and supportive — perfect for book lovers and writers alike.",
    image: "/assets/images/user3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
        What Our Readers Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-6 object-cover"
              />
              <p className="text-gray-700 italic mb-4">
                “{testimonial.feedback}”
              </p>
              <h4 className="text-lg font-semibold text-gray-900">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

