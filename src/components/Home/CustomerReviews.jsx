import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const CustomerReviews = () => {
  const axiosInstance = useAxios();

  const { data: reviews = [] } = useQuery({
    queryKey: ["home-reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews/home");
      return res.data;
    },
  });

  // console.log(reviews);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        {/* <h3 className="text-3xl font-semibold capitalize mb-8">Top Dishes</h3> */}
        <h3 className="text-3xl font-semibold capitalize mb-10">
          What Our Customers Say
        </h3>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="group bg-white rounded-xl p-6 shadow-md 
                         transition-all duration-300 
                         hover:-translate-y-2 hover:shadow-xl"
            >
              {/* User */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {review.reviewerName}
                  </h4>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    ★ {review.rating}
                  </div>
                </div>
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed">
                “{review.comment}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
