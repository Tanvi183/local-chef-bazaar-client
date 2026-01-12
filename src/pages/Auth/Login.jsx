import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import loginImg from "../../assets/images/login.png";
import useTitle from "../../hooks/useTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Shared/Loading";
import {
  FaEye,
  FaGoogle,
  FaUser,
  FaUserTie,
  FaUserShield,
} from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";

const Login = () => {
  useTitle("Login");
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { signInUser, loading, signInWithGoogle } = useAuth();
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

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // Create user in the mongodb databse
        fetch("https://local-chef-bazaar-server-flax.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(`Welcome, ${data.displayName || "User"}!`);
            navigate(`${location.state ? location.state : "/dashboard"}`);
            console.log("data after user save", data);
          });
      })
      .catch((error) => handleAuthError(error));
  };

  // Demo login credentials
  const demoCredentials = {
    user: {
      email: "user@gmail.com",
      password: "123456",
      role: "User",
    },
    chef: {
      email: "chef@gmail.com",
      password: "123456",
      role: "Chef",
    },
    admin: {
      email: "admin@gmail.com",
      password: "123456",
      role: "Admin",
    },
  };

  // Handle demo login
  const handleDemoLogin = (role) => {
    const credentials = demoCredentials[role.toLowerCase()];

    setValue("email", credentials.email);
    setValue("password", credentials.password);

    toast.success(
      `Demo ${credentials.role} credentials filled. Click Sign In to continue.`
    );
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
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
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
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
                className="w-full py-3 px-8 bg-lime-600 text-white font-semibold rounded-lg hover:bg-lime-700 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-8 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-red-500 text-lg" />
              {loading ? "Signing in..." : "Continue with Google"}
            </button>

            {/* Demo Login Section */}
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">
                  Demo Login
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <p className="text-center text-xs text-gray-500 mb-4">
                Click to fill form with demo credentials, then click Sign In
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Demo User Login */}
                <button
                  type="button"
                  onClick={() => handleDemoLogin("user")}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 border-2 border-blue-200 text-blue-700 font-medium rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaUser className="text-sm" />
                  <span className="text-sm">Fill User</span>
                </button>

                {/* Demo Chef Login */}
                <button
                  type="button"
                  onClick={() => handleDemoLogin("chef")}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-orange-50 border-2 border-orange-200 text-orange-700 font-medium rounded-lg hover:bg-orange-100 hover:border-orange-300 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaUserTie className="text-sm" />
                  <span className="text-sm">Fill Chef</span>
                </button>

                {/* Demo Admin Login */}
                <button
                  type="button"
                  onClick={() => handleDemoLogin("admin")}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-purple-50 border-2 border-purple-200 text-purple-700 font-medium rounded-lg hover:bg-purple-100 hover:border-purple-300 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaUserShield className="text-sm" />
                  <span className="text-sm">Fill Admin</span>
                </button>
              </div>
            </div>

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
