import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-green-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h4 className="font-bold mb-3 text-lg">LocalChefBazaar</h4>
          <p className="text-sm text-gray-600">Fresh food delivered fast.</p>
          <p className="text-sm text-gray-600 mt-2">Block-3, lalmatia, Dhaka</p>
          <p className="text-sm text-gray-600">Phone: +880 123456789</p>
          <p className="text-sm text-gray-600">
            Email: info@localChefBazaar.com
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="nav-link hover:text-green-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/meals" className="nav-link hover:text-green-600">
                Meals
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link hover:text-green-600">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link hover:text-green-600">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Follow Us</h4>
          <ul className="flex space-x-4 text-sm">
            <li>
              <a
                href="https://github.com/Tanvi183"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-700"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-700"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-700"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-700"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* 4️⃣ Working Hours */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Working Hours</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Sat - Wed: 9:00 AM - 10:00 PM</li>
            <li>Thu - Sun: 10:00 AM - 11:00 PM</li>
            <li>Holidays: Closed</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-500 mt-10">
        © 2025 FoodBox. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
