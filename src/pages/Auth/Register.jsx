import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import registerImg from "../../assets/images/register.png";
import useTitle from "../../hooks/useTitle";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Shared/Loading";

const Register = () => {
  useTitle("Registration");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const axiosInstance = useAxios();

  // Store selected image preview
  const [previewImg, setPreviewImg] = useState(null);
  const { registerUser, updateUserProfile, SignOut, loading } = useAuth();

  // Watch password match
  const password = watch("password", "");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      // Register User in Firebase
      await registerUser(data.email, data.password);

      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // Create user in DB
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
        address: data.address,
        status: "active",
      };

      let dbRes;
      try {
        dbRes = await axiosInstance.post("/users", userInfo);
      } catch (err) {
        if (err.response && err.response.status === 409) {
          Swal.fire({ icon: "warning", title: "User already exists" });
          return;
        } else {
          throw err;
        }
      }

      if (dbRes && dbRes.data.insertedId) {
        await Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created. Please login.",
          icon: "success",
        });
      }

      // Update Firebase profile (optional)
      await updateUserProfile({ displayName: data.name, photoURL });

      // Redirect to login page
      navigate("/login");
      await SignOut();
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

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

            {/* Profile Icon */}
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaUser className="text-gray-600" />
              )}
            </div>

            <form
              onSubmit={handleSubmit(handleRegistration)}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name cannot be longer than 20 characters",
                    },
                  })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

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

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: "image is required" })}
                  onChange={handleImageChange}
                  className="file-input file-input-accent w-full border border-gray-300 rounded-md"
                />
                {errors.photo && (
                  <span className="text-red-500">{errors.photo.message}</span>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
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
