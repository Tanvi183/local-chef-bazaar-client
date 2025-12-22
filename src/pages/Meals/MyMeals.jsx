import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UpdateMealModal from "./UpdateMealModal";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Meals = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedMeal, setSelectedMeal] = useState(null);

  // Fetch meals for chef
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/meals?userEmail=${user.email}`);
      return res.data;
    },
  });

  // Delete meal
  const handleDelete = (mealId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/meals/${mealId}`);
          Swal.fire("Deleted!", "Meal has been deleted.", "success");
          queryClient.invalidateQueries(["meals"]);
        } catch {
          Swal.fire("Error!", "Failed to delete meal.", "error");
        }
      }
    });
  };

  // Open Update Modal
  const handleUpdate = (meal) => {
    setSelectedMeal(meal);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">My Meals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="card bg-base-200 shadow-md">
            <figure>
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="h-48 w-full object-cover rounded-t-md"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{meal.foodName}</h2>
              <p>Price: ${meal.price}</p>
              <p>Rating: {meal.rating}</p>
              <p>Ingredients: {meal.ingredients.join(", ")}</p>
              <p>Estimated Delivery: {meal.estimatedDeliveryTime} mins</p>
              <p>Chef: {meal.chefName}</p>
              <p>Chef ID: {meal.chefId}</p>

              <div className="card-actions justify-end mt-2">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(meal._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleUpdate(meal)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {selectedMeal && (
        <UpdateMealModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          onUpdated={() => {
            setSelectedMeal(null);
            queryClient.invalidateQueries(["meals"]);
          }}
        />
      )}
    </div>
  );
};

export default Meals;
