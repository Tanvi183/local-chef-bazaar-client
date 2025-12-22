import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateMealModal = ({ meal, onClose, onUpdated }) => {
  const axiosInstance = useAxiosSecure();

  // console.log(meal);

  const [formData, setFormData] = useState({
    foodName: meal.foodName,
    price: meal.price,
    rating: meal.rating,
    ingredients: meal.ingredients.join(", "),
    estimatedDeliveryTime: meal.estimatedDeliveryTime,
    foodImage: meal.foodImage,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/meals/${meal._id}`, {
        ...formData,
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      });
      Swal.fire("Updated!", "Meal has been updated.", "success");
      onUpdated();
    } catch (err) {
      Swal.fire("Error!", "Failed to update meal.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Meal</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="Meal Name"
            className="input input-bordered w-full"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma separated)"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="estimatedDeliveryTime"
            value={formData.estimatedDeliveryTime}
            onChange={handleChange}
            placeholder="Estimated Delivery Time"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            placeholder="Image URL"
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2 mt-3">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMealModal;
