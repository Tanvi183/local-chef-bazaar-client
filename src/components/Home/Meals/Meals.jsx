import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const Meals = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  // meal data fetch
  const { data: meals = [] } = useQuery({
    queryKey: ["home-meals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/meals/home");
      return res.data;
    },
  });

  const handleSeeDetails = (mealId) => {
    // console.log(mealId);
    if (user) {
      navigate(`/meals/${mealId}`);
    } else {
      navigate("/login");
    }
  };

  // console.log(meals);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-semibold capitalize mb-8">Top Dishes</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="group bg-white rounded-md shadow-md overflow-hidden 
             transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image Wrapper */}
              <div className="overflow-hidden">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-48 object-cover 
                 transition-transform duration-500 ease-out
                 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {meal.foodName}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  <strong>Ingredients: </strong>
                  {meal.ingredients.join(", ")}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{meal.rating}</span>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-gray-800">
                    $ {meal.price}
                  </span>

                  <button
                    onClick={() => handleSeeDetails(meal._id)}
                    className="px-4 py-2 text-sm font-medium text-white 
                   bg-lime-600
                   transition hover:bg-lime-700 cursor-pointer"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Meals;
