import { Link, NavLink } from "react-router";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import logo from "../../assets/images/logo.png";
import { ShoppingCart } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, SignOut } = useAuth();

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
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 bg-red-500 text-white cursor-pointer"
                  >
                    Logout
                  </button>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                    {user?.photoURL ? (
                      <Link to="/dashboard/my-profile">
                        <img
                          src={user.photoURL}
                          alt="profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </Link>
                    ) : (
                      <FaUser className="text-gray-600" />
                    )}
                  </div>
                </>
              )}
              {/* <Link
                // to="/cart"
                className="relative"
              >
                <ShoppingCart className="text-xl text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-1">
                  0
                </span>
              </Link> */}
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
                <button className="text-left text-red-500">Logout</button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
