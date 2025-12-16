import React from "react";
import { Link } from "react-router";
import registerImg from "../../assets/images/register.png";
import useTitle from "../../hooks/useTitle";

const Register = () => {
  useTitle("Registration");

  return (
    <section className="py-24 flex items-center justify-center px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:flex justify-center">
          <img
            src={registerImg}
            alt="Register illustration"
            className="w-full max-w-lg rounded-3xl"
          />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl bg-white shadow-lg p-8 md:p-10">
            <h2 className="text-center text-5xl font-extrabold mb-6">
              Create Account
            </h2>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  placeholder="Paste image URL"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/*User Status */}
              <input type="hidden" value="active" />

              <button
                type="submit"
                className="py-3 px-8 bg-lime-600 text-white hover:bg-lime-700 font-semibold transition"
              >
                Register
              </button>
            </form>

            <p className="text-sm text-center md:text-left mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
