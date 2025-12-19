import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CreateMeal = () => {
  useTitle("Add Meal");
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: profileData = {} } = useQuery({
    queryKey: ["chef", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const { email, displayName, chefId } = profileData;

  // image preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Form submit
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const imageData = new FormData();
      imageData.append("image", data.foodImage[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        imageData
      );

      const foodImage = imgRes.data.data.url;

      const mealData = {
        foodName: data.foodName,
        chefName: displayName,
        foodImage,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        ingredients: data.ingredients.split(",").map((item) => item.trim()),
        estimatedDeliveryTime: data.deliveryTime,
        chefExperience: data.chefExperience,
        chefId,
        userEmail: user.email,
        createdAt: new Date(),
      };

      await axiosInstance.post("/meals", mealData);

      toast.success("Meal created successfully");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8 md:p-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center">
          Create New Meal
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="label">Food Name</label>
            <input
              {...register("foodName", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name cannot be longer than 5 characters",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Grilled Chicken Salad"
            />
            {errors.foodName && (
              <span className="text-red-500">{errors.foodName.message}</span>
            )}
          </div>

          {/* Chef Name */}
          <div>
            <label className="label">Chef Name</label>
            <input
              value={displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label">Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "price is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="label">Rating</label>
            <input
              type="number"
              step="0.1"
              defaultValue={1}
              {...register("rating", {
                required: "Rating is required",
                min: {
                  value: 1,
                  message: "Rating must be at least 1",
                },
                max: {
                  value: 5,
                  message: "Rating cannot be more than 5",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.rating && (
              <span className="text-red-500">{errors.rating.message}</span>
            )}
          </div>

          {/* Ingredients */}
          <div className="md:col-span-2">
            <label className="label">Ingredients (comma separated)</label>
            <textarea
              {...register("ingredients", {
                required: "price is required",
              })}
              className="textarea textarea-bordered w-full"
              placeholder="Chicken, Lettuce, Tomato, Olive oil"
            />
            {errors.ingredients && (
              <span className="text-red-500">{errors.ingredients.message}</span>
            )}
          </div>

          {/* Delivery Time */}
          <div>
            <label className="label">Estimated Delivery Time</label>
            <input
              {...register("deliveryTime", {
                required: "price is required",
              })}
              type="number"
              className="input input-bordered w-full"
              placeholder="30 minutes"
            />
            {errors.deliveryTime && (
              <span className="text-red-500">
                {errors.deliveryTime.message}
              </span>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="label">Chef Experience</label>
            <input
              {...register("chefExperience", {
                required: "price is required",
              })}
              className="input input-bordered w-full"
              placeholder="5 years experience"
            />
            {errors.chefExperience && (
              <span className="text-red-500">
                {errors.chefExperience.message}
              </span>
            )}
          </div>

          {/* Chef ID */}
          <div>
            <label className="label">Chef ID</label>
            <input
              value={chefId || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">User Email</label>
            <input
              value={email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/*Image */}
          <div className="md:col-span-2">
            <label className="label">Food Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("foodImage", { required: true })}
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="mt-4 h-40 rounded-lg object-cover"
              />
            )}
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success px-10"
            >
              {loading ? "Creating..." : "Create Meal"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateMeal;
