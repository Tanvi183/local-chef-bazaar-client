import React from "react";

const reviews = [
  {
    id: 1,
    name: "Rahim Uddin",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "Amazing food quality! The burgers were super juicy and fresh. Will definitely order again.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 4.8,
    review:
      "Fast delivery and great taste. The BBQ chicken burger was my favorite!",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 4.6,
    review: "Loved the presentation and flavors. Worth every taka!",
  },
  {
    id: 4,
    name: "Sadia Islam",
    image: "https://i.pravatar.cc/150?img=28",
    rating: 5,
    review:
      "Best burgers in town. Super fresh ingredients and excellent service.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h3 className="text-3xl font-semibold mb-3 text-center">
          What Our Customers Say
        </h3>
        <p className="text-gray-500 text-center mb-10">
          Real reviews from real food lovers 🍔
        </p>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group bg-white rounded-xl p-6 shadow-md 
                         transition-all duration-300 
                         hover:-translate-y-2 hover:shadow-xl"
            >
              {/* User */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    ★ {review.rating}
                  </div>
                </div>
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed">
                “{review.review}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
