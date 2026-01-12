import { Link, NavLink } from "react-router";
import { useState, useEffect, useRef } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUser, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, SignOut } = useAuth();
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    `nav-link transition ${
      isActive
        ? "text-green-600 font-semibold border-b-2 border-green-600"
        : "text-gray-700 hover:text-green-600"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/meals" className={navLinkClass}>
        Meals
      </NavLink>
      <NavLink to="/blogs" className={navLinkClass}>
        Blogs
      </NavLink>
      <NavLink to="/about" className={navLinkClass}>
        About Us
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        Contact Us
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        SignOut()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Logout Error:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong during logout. Please try again.",
            });
          });
      }
    });
  };

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center text-sm py-2">
          Get free delivery on orders over $1000
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="LocalChefBazaar Logo"
                className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14object-contain"
              />

              <h1 className="font-bold text-xl sm:text-xl md:text-xl lg:text-3xlleading-none">
                LocalChef
                <span className="text-primary">Bazaar</span>
              </h1>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks}
            </nav>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-5">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="font-medium text-gray-700 hover:text-primary"
                  >
                    Sign in
                  </Link>
                  <span
                    className="h-6 w-px bg-gray-200"
                    aria-hidden="true"
                  ></span>
                  <Link
                    to="/register"
                    className="font-medium text-gray-700 hover:text-primary"
                  >
                    Create account
                  </Link>
                </>
              ) : (
                <>
                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-green-400 transition-all duration-300"
                    >
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <FaUser className="text-gray-600" />
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 z-50">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100">
                              {user?.photoURL ? (
                                <img
                                  src={user.photoURL}
                                  alt="profile"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-green-400 to-lime-500 rounded-full flex items-center justify-center">
                                  <FaUser className="text-white text-sm" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">
                                {user?.displayName || "User"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {/* Profile Link */}
                          <Link
                            to="/dashboard/my-profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors duration-300 group"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                              <FaUserAlt className="text-blue-600 text-sm" />
                            </div>
                            <span className="text-gray-700 font-medium">My Profile</span>
                          </Link>

                          {/* Dashboard Link */}
                          <Link
                            to="/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors duration-300 group"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium">Dashboard</span>
                          </Link>

                          {/* Divider */}
                          <div className="border-t border-gray-100 my-2"></div>

                          {/* Logout Button */}
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              handleLogOut();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors duration-300 group text-red-600 hover:text-red-700"
                          >
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                              <FaSignOutAlt className="text-red-600 text-sm" />
                            </div>
                            <span className="font-medium">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col px-4 py-4 gap-4">
              {navLinks}
              <hr />
              {!user ? (
                <>
                  <Link to="/login" className="nav-link">
                    Sign in
                  </Link>
                  <Link to="/register" className="nav-link">
                    Create account
                  </Link>
                </>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/dashboard/my-profile" 
                    className="block text-left text-gray-700 hover:text-green-600 transition-colors duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="block text-left text-gray-700 hover:text-green-600 transition-colors duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogOut();
                    }}
                    className="block text-left text-red-500 hover:text-red-600 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
