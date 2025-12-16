import React from "react";
import { Link } from "react-router";
import loginImg from "../../assets/images/login.png";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Login");

  return (
    <section className="py-24 flex items-center justify-center px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:flex justify-center">
          <img
            src={loginImg}
            alt="Login illustration"
            className="w-full max-w-lg rounded-3xl"
          />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl bg-white shadow-lg p-8 md:p-10">
            <h2 className="text-center text-5xl font-extrabold mb-6">
              Sign In
            </h2>

            <form className="space-y-5">
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="py-3 px-8 bg-lime-600 text-white hover:bg-lime-700 font-semibold transition"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-center md:text-left mt-6 text-gray-600">
              New to LocalChefBazaar?{" "}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
