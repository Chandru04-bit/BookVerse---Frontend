// ✅ src/pages/BlogDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogData"; // your blogPosts
import { motion } from "framer-motion";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = blogPosts.find((item) => item.id === parseInt(id));
    if (foundBlog) setBlog(foundBlog);
    else navigate("/blogs");
  }, [id, navigate]);

  if (!blog) return null;

  // Related blogs (excluding current)
  const relatedBlogs = blogPosts.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:underline"
      >
        &larr; Back to Blogs
      </button>

      {/* Blog Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center text-gray-500 mb-6 gap-4 flex-wrap">
          <span>By <span className="font-medium">{blog.author}</span></span>
          <span>{blog.date}</span>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{blog.category}</span>
        </div>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-lg mb-10 shadow-lg"
          />
        )}
      </motion.div>

      {/* Blog Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="prose prose-lg max-w-none mb-16"
      >
        {blog.content.split("\n").map((line, idx) => {
          // Render Markdown-style headings
          if (line.startsWith("### ")) return <h3 key={idx}>{line.replace("### ", "")}</h3>;
          if (line.startsWith("> ")) return <blockquote key={idx}>{line.replace("> ", "")}</blockquote>;
          if (line.startsWith("- ")) return <li key={idx}>{line.replace("- ", "")}</li>;
          return <p key={idx}>{line}</p>;
        })}
      </motion.div>

      {/* Related Blogs */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Related Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedBlogs.map((b) => (
            <div
              key={b.id}
              onClick={() => navigate(`/blog/${b.id}`)}
              className="cursor-pointer group border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              {b.image && (
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.date} • {b.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
