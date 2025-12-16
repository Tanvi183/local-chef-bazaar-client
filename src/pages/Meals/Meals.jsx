import { useState } from "react";
import useTitle from "../../hooks/useTitle";

const Meals = () => {
  useTitle("Meals");

  const [sortOrder, setSortOrder] = useState("asc");

  // Fake Data
  const mealsData = [
    {
      id: 1,
      chefName: "Chef Rahim",
      chefId: "CH-101",
      image: "https://source.unsplash.com/600x400/?burger",
      price: 360,
      rating: 4.9,
      area: "Dhanmondi",
    },
    {
      id: 2,
      chefName: "Chef Nusrat",
      chefId: "CH-102",
      image: "https://source.unsplash.com/600x400/?chicken,burger",
      price: 420,
      rating: 4.6,
      area: "Mirpur",
    },
    {
      id: 3,
      chefName: "Chef Tanvir",
      chefId: "CH-103",
      image: "https://source.unsplash.com/600x400/?veggie,burger",
      price: 280,
      rating: 4.4,
      area: "Uttara",
    },
    {
      id: 4,
      chefName: "Chef Sadia",
      chefId: "CH-104",
      image: "https://source.unsplash.com/600x400/?bbq,burger",
      price: 390,
      rating: 4.8,
      area: "Gulshan",
    },
    {
      id: 5,
      chefName: "Chef Tanisha",
      chefId: "CH-105",
      image: "https://source.unsplash.com/600x400/?cheeseburger",
      price: 450,
      rating: 4.7,
      area: "Banani",
    },
    {
      id: 6,
      chefName: "Chef Rafiq",
      chefId: "CH-106",
      image: "https://source.unsplash.com/600x400/?spicy,burger",
      price: 310,
      rating: 4.5,
      area: "Mohakhali",
    },
    {
      id: 7,
      chefName: "Chef Farhana",
      chefId: "CH-107",
      image: "https://source.unsplash.com/600x400/?vegan,burger",
      price: 295,
      rating: 4.3,
      area: "Uttara",
    },
    {
      id: 8,
      chefName: "Chef Imran",
      chefId: "CH-108",
      image: "https://source.unsplash.com/600x400/?chicken,sandwich",
      price: 400,
      rating: 4.6,
      area: "Mirpur",
    },
    {
      id: 9,
      chefName: "Chef Laila",
      chefId: "CH-109",
      image: "https://source.unsplash.com/600x400/?burger,fastfood",
      price: 370,
      rating: 4.8,
      area: "Dhanmondi",
    },
    {
      id: 10,
      chefName: "Chef Arif",
      chefId: "CH-110",
      image: "https://source.unsplash.com/600x400/?grilled,burger",
      price: 385,
      rating: 4.7,
      area: "Gulshan",
    },
    {
      id: 11,
      chefName: "Chef Shabnam",
      chefId: "CH-111",
      image: "https://source.unsplash.com/600x400/?burger,cheese",
      price: 320,
      rating: 4.5,
      area: "Banani",
    },
    {
      id: 12,
      chefName: "Chef Nabil",
      chefId: "CH-112",
      image: "https://source.unsplash.com/600x400/?bbq,chicken",
      price: 410,
      rating: 4.9,
      area: "Mohakhali",
    },
  ];

  // Sort logic
  const sortedMeals = [...mealsData].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-semibold">Daily Meals</h2>

          {/* Sort Button */}
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="mt-4 md:mt-0 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
          </button>
        </div>

        {/* Meals */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedMeals.map((meal) => (
            <div
              key={meal.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden
                         transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.chefName}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{meal.chefName}</h3>

                <p className="text-sm text-gray-500">Chef ID: {meal.chefId}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-800">
                    ৳{meal.price}
                  </span>
                  <span className="text-yellow-500">★ {meal.rating}</span>
                </div>

                <p className="text-sm text-gray-600">
                  Delivery Area: {meal.area}
                </p>

                <button
                  className="w-full mt-3 px-4 py-2 text-sm font-medium
                             rounded-lg border border-green-500 text-green-600
                             hover:bg-green-500 hover:text-white transition"
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
