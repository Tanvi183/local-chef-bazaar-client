import { useState } from "react";
import useTitle from "../../hooks/useTitle";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { FaDollarSign } from "react-icons/fa";

const Meals = () => {
  useTitle("Meals");
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState("asc");

  const { data: mealsData = [] } = useQuery({
    queryKey: ["all-meals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/meals");
      return res.data;
    },
  });

  // console.log(mealsData);

  // Sort logic
  const sortedMeals = [...mealsData].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleSeeDetails = (mealId) => {
    // console.log(mealId);

    if (user) {
      navigate(`/meals/${mealId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-semibold">Daily Meals</h2>

          {/* Sort Button */}

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="mt-4 md:mt-0 px-4 py-2 bg-lime-600 text-white font-medium hover:bg-lime-700 transition cursor-pointer"
          >
            Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
          </button>
        </div>

        {/* Meals */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedMeals.map((meal) => (
            <div
              key={meal._id}
              className="group bg-white rounded-xl shadow-md overflow-hidden
                         transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={meal.foodImage}
                  alt={meal.chefName}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{meal.chefName}</h3>

                <p className="text-sm text-gray-500">Chef ID: {meal.chefId}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-800 flex items-center">
                    <FaDollarSign />
                    {meal.price}
                  </span>
                  <span className="text-yellow-500">★ {meal.rating}</span>
                </div>

                <p className="text-sm text-gray-600">
                  Delivery Area: {meal.deliveryArea?.join(", ")}
                </p>

                <button
                  onClick={() => handleSeeDetails(meal._id)}
                  className="w-full mt-3 px-4 py-2 text-sm font-medium
                             border border-lime-600 text-lime-600
                             hover:bg-lime-600 hover:text-white transition cursor-pointer"
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Meals;
