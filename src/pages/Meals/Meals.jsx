import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaDollarSign, FaSearch } from "react-icons/fa";

import useTitle from "../../hooks/useTitle";
import useAxios from "../../hooks/useAxios";
// import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Shared/Loading";

const Meals = () => {
  useTitle("Meals");

  // const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const MEAL_PER_PAGE = 8;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["meals-paginated", page, sortOrder, debouncedSearch],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/meals-paginated?page=${page}&limit=${MEAL_PER_PAGE}&sort=${sortOrder}&search=${debouncedSearch}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const { meals = [], totalPages = 1 } = data;

  const handleSeeDetails = (mealId) => {
    navigate(`/meals/${mealId}`);
    // user ? navigate(`/meals/${mealId}`) : navigate("/login");
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-semibold">Daily Meals</h2>

          <div className="flex gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search meals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 cursor-pointer"
            >
              {sortOrder === "asc" ? "Low → High" : "High → Low"}
            </button>
          </div>
        </div>

        {meals.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No meals found 🍽️</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{meal.chefName}</h3>

                  <p className="text-sm text-gray-500">
                    Chef ID: {meal.chefId}
                  </p>

                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <FaDollarSign /> {meal.price}
                    </span>
                    <span className="text-yellow-500">
                      ★ {meal.rating || 0}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Delivery Area: {meal.deliveryArea?.join(", ")}
                  </p>

                  <button
                    onClick={() => handleSeeDetails(meal._id)}
                    className="w-full mt-3 py-2 border border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white transition"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-2 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer hover:bg-lime-600"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-4 py-2 border rounded ${
                page === p + 1 && "bg-lime-600 text-white"
              }`}
            >
              {p + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer disabled:hover:bg-lime-600"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Meals;
