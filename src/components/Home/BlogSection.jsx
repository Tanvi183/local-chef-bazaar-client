import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/data/blogs.json");
        const data = await response.json();
        setBlogs(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-semibold capitalize">
            {" "}
            Latest Food Stories
          </h2>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <FaUser />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                  {blog.title}
                </h4>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/blogs/${blog.id}`}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors duration-300"
                >
                  Read More
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Blogs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-3 bg-lime-600 text-white px-8 py-4 font-semibold hover:bg-lime-700 transition-all duration-200 hover:scale-101 shadow-lg hover:shadow-xl"
          >
            View All Blogs
            <FaArrowRight className="text-sm" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
