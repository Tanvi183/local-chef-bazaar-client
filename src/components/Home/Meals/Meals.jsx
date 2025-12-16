import React from "react";

const Meals = () => {
  const meals = [
    {
      id: 1,
      title: "Sloppy BBQ Cottage Cheese Burger",
      image: "https://source.unsplash.com/600x400/?burger,cheese",
      description:
        "Crumpled cottage cheese, caramelized onions, jalapeno, homemade mayonnaise",
      rating: 5,
      price: "৳360",
    },
    {
      id: 2,
      title: "Cheese and Bacon Burger",
      image: "https://source.unsplash.com/600x400/?bacon,burger",
      description:
        "Juicy beef patty, crispy bacon, cheddar cheese, lettuce, and special sauce",
      rating: 4.6,
      price: "৳420",
    },
    {
      id: 3,
      title: "Veggie Delight Burger",
      image: "https://source.unsplash.com/600x400/?veggie,burger",
      description: "Grilled vegetables, hummus, and fresh greens in a soft bun",
      rating: 4.3,
      price: "৳280",
    },
    {
      id: 4,
      title: "Chicken BBQ Burger",
      image: "https://source.unsplash.com/600x400/?chicken,burger",
      description:
        "Grilled chicken patty, BBQ sauce, crispy onions, and pickles",
      rating: 4.8,
      price: "৳390",
    },
    {
      id: 5,
      title: "Double Cheese Beef Burger",
      image: "https://source.unsplash.com/600x400/?double,cheeseburger",
      description:
        "Double beef patty, melted mozzarella, cheddar cheese, and house sauce",
      rating: 4.7,
      price: "৳480",
    },
    {
      id: 6,
      title: "Spicy Chicken Zinger Burger",
      image: "https://source.unsplash.com/600x400/?spicy,chicken,burger",
      description:
        "Crispy spicy chicken fillet, lettuce, jalapeno mayo, and soft bun",
      rating: 4.5,
      price: "৳350",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-semibold capitalize mb-8">Top Dishes</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden 
             transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image Wrapper */}
              <div className="overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-full h-48 object-cover 
                 transition-transform duration-500 ease-out
                 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {meal.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {meal.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{meal.rating}</span>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-gray-800">
                    {meal.price}
                  </span>

                  <button
                    className="px-4 py-2 text-sm font-medium text-white 
                   bg-green-500 rounded-lg 
                   transition hover:bg-green-600"
                  >
                    Add to cart
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
