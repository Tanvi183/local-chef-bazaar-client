import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import useTitle from "../../hooks/useTitle";

const Blogs = () => {
  useTitle("All Blogs");

  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogsPerPage = 12;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/data/blogs.json");
        const data = await response.json();
        setAllBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(allBlogs.map((blog) => blog.category))];

  // Filter blogs based on category
  useEffect(() => {
    let filtered = allBlogs;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [selectedCategory, allBlogs]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="bg-[rgb(254_255_203)] bg-opacity-80 py-18">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-primary capitalize text-4xl lg:text-6xl font-extrabold text-center">
              Blogs
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center lg:text-left">
            <p className="text-gray-600">
              Showing {currentBlogs.length} of {filteredBlogs.length} blogs
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {currentBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden group border border-white/20"
                >
                  {/* Blog Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FaUser />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <FaCalendarAlt />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                      {blog.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* See Details Link */}
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors duration-300"
                    >
                      See Details
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center gap-2 mt-12"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;

                // Show first page, last page, current page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                        isCurrentPage
                          ? "bg-green-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="px-2">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
