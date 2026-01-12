import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaGithub, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-lime-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 pt-15 pb-3">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
                LocalChefBazaar
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Fresh food delivered fast.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <FaMapMarkerAlt className="text-green-400 flex-shrink-0" />
                  <span>Block-3, lalmatia, Dhaka</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <FaPhone className="text-green-400 flex-shrink-0" />
                  <span>+880 123456789</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <FaEnvelope className="text-green-400 flex-shrink-0" />
                  <span>info@localChefBazaar.com</span>
                </div>
              </div>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <NavLink 
                    to="/" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/meals" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/about" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/contact" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Follow Us</h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/Tanvi183"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-green-600 transition-all duration-300 hover:scale-110"
                >
                  <FaGithub className="text-lg" />
                </a>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-500 transition-all duration-300 hover:scale-110"
                >
                  <FaTwitter className="text-lg" />
                </a>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                >
                  <FaFacebook className="text-lg" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>
            </motion.div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaClock className="text-green-400" />
                Working Hours
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center text-gray-300">
                  <span>Sat - Wed:</span>
                  <span className="text-green-400 font-medium">9:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-gray-300">
                  <span>Thu - Sun:</span>
                  <span className="text-green-400 font-medium">10:00 AM - 11:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-gray-300">
                  <span>Holidays:</span>
                  <span className="text-red-400 font-medium">Closed</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700/50 pt-8">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-400 text-sm">
                © 2025 <span className="text-green-400 font-medium">FoodBox</span>. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
