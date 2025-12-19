import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import loginImg from "../../assets/images/login.png";
import useTitle from "../../hooks/useTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Shared/Loading";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";

const Login = () => {
  useTitle("Login");
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    // console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        toast.success(`Welcome, ${user.displayName || "User"}!`);
        navigate(`${location.state ? location.state : "/dashboard"}`);
      })
      .catch((error) => handleAuthError(error));
  };

  // Common Error
  const handleAuthError = (error) => {
    if (error.code === "auth/invalid-email") {
      toast.error("Invalid email format. Please check your email.");
    } else if (error.code === "auth/user-not-found") {
      toast.error("No account found with this email. Please sign up first.");
    } else if (error.code === "auth/wrong-password") {
      toast.error("Incorrect password. Please try again.");
    } else if (error.code === "auth/user-disabled") {
      toast.error("This account has been disabled. Contact support.");
    } else if (error.code === "auth/too-many-requests") {
      toast.error("Too many failed attempts. Try again later, Bhai 😅");
    } else if (error.code === "auth/network-request-failed") {
      toast.error("Network error. Please check your internet connection.");
    } else if (error.code === "auth/invalid-credential") {
      toast.error("Invalid credentials. Please check your email and password.");
    } else {
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  };

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

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>

                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-[42px] cursor-pointer text-gray-600"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="py-3 px-8 bg-lime-600 text-white disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
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
