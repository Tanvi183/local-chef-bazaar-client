import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaUser, FaArrowLeft, FaShare, FaTag } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useTitle(blog ? blog.title : "Blog Details");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch('/data/blogs.json');
        const data = await response.json();
        
        const foundBlog = data.find(blog => blog.id === parseInt(id));
        
        if (!foundBlog) {
          setError("Blog not found");
          return;
        }
        
        setBlog(foundBlog);
        
        // Get related blogs from same category (excluding current blog)
        const related = data
          .filter(b => b.category === foundBlog.category && b.id !== foundBlog.id)
          .slice(0, 3);
        setRelatedBlogs(related);
        
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/blogs"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-white transition-colors duration-300"
          >
            <FaArrowLeft />
            Back to Blogs
          </Link>
        </div>

        {/* Share Button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-colors duration-300"
          >
            <FaShare />
          </button>
        </div>

        {/* Blog Title and Meta */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {blog.category}
              </span>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
            >
              {blog.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-white/90"
            >
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{blog.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 lg:p-12 border border-white/20"
          >
            {/* Excerpt */}
            <div className="mb-8 p-6 bg-green-50/50 rounded-xl border-l-4 border-green-600">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {blog.excerpt}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <FaTag className="text-green-600" />
                <span className="font-semibold text-gray-800">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Related Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog, index) => (
                  <motion.article
                    key={relatedBlog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group border border-white/20"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {relatedBlog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <FaUser />
                          <span>{relatedBlog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock />
                          <span>{relatedBlog.readTime}</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                        {relatedBlog.title}
                      </h4>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>

                      <Link
                        to={`/blogs/${relatedBlog.id}`}
                        className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors duration-300"
                      >
                        Read More
                        <FaArrowLeft className="text-xs rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;