import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaDollarSign } from "react-icons/fa";
import Loading from "../../components/Shared/Loading";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const MealDetails = () => {
  useTitle("Meal Details");
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // Fetch meal details
  // const { data } = useQuery(
  //   ["meal"],
  //   async () => {
  //     const res = await axiosInstance.get(`/meals/${id}`);
  //     return res.data.meal;
  //   },
  //   {
  //     staleTime: 5 * 60 * 1000, // 5 minutes cache
  //     onSuccess: (meal) => {
  //       setReviews(meal.reviews || []);
  //     },
  //   }
  // );

  const { data: meal = [], isLoading } = useQuery({
    queryKey: ["all-meals", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/meals/${id}`);
      return res.data.meal;
    },
  });

  // console.log(meal);

  if (isLoading) return <Loading />;

  // Submit review
  const handleAddReview = async () => {
    if (!reviewText) return;

    const newReview = {
      user: user.displayName || "Anonymous",
      comment: reviewText,
      rating: 5,
      date: new Date().toISOString(),
    };

    try {
      await axiosInstance.patch(`/meals/${meal._id}/review`, newReview);
      setReviews([newReview, ...reviews]);
      setReviewText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <section className="max-w-7xl mx-auto px-4">
        {/* Meal Header */}
        <div className="flex flex-col md:flex-row gap-10 mb-8">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full md:w-1/2 h-64 md:h-96 object-cover rounded-lg shadow"
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{meal.foodName}</h1>
            <p className="text-gray-600 font-medium">Chef: {meal.chefName}</p>
            <p className="text-gray-800 font-semibold text-xl flex items-center">
              Price: <FaDollarSign />
              {meal.price}
            </p>
            <p className="text-yellow-500 font-medium">
              Rating: ★ {meal.rating}
            </p>
            <p className="text-gray-600">
              Delivery Area: {meal.deliveryArea?.join(", ")}
            </p>
            <p className="text-gray-600">
              Estimated Delivery Time: {meal.estimatedDeliveryTime}
            </p>
            <p className="text-gray-600">
              Chef's Experience: {meal.chefExperience}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Ingredients: </span>
              {meal.ingredients?.join(", ")}
            </p>
            <p className="text-gray-600 font-medium">
              Chef Id: ( {meal.chefId} )
            </p>

            <button
              onClick={() => navigate(`/order/${meal._id}`)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

          {/* Add Review */}
          <div className="mb-6">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddReview}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Submit Review
            </button>
          </div>

          {/* List Reviews */}
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((rev, idx) => (
                <li key={idx} className="border-b border-gray-200 pb-2">
                  <p className="font-semibold">
                    {rev.user}{" "}
                    <span className="text-yellow-500">★ {rev.rating}</span>
                  </p>
                  <p className="text-gray-700">{rev.comment}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(rev.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default MealDetails;
