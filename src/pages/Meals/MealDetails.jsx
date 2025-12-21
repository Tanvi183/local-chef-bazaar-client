import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaDollarSign } from "react-icons/fa";
import Loading from "../../components/Shared/Loading";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { IoMdStar } from "react-icons/io";
import { MdFavorite } from "react-icons/md";

const MealDetails = () => {
  useTitle("Meal Details");

  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState();

  // Fetch Meal Details
  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/meals/${id}`);
      return res.data.meal;
    },
  });

  // Add Review
  const handleAddReview = async () => {
    if (!comment || rating === 0) {
      toast.error("Please give rating and comment");
      return;
    }
    // console.log(comment, rating);

    try {
      const res = await axiosInstance.post(`/meals/${id}/review`, {
        userEmail: user.email,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        rating,
        comment,
      });

      if (res.data.success) {
        toast.success("Review submitted successfully!");
        setComment("");
        refetchReviews();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Review failed");
    }
  };

  // Fetch Reviews
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/meals/${id}/reviews`);
      return res.data.reviews;
    },
  });

  // Add Favorite
  const handleAddFavorite = async () => {
    try {
      const res = await axiosInstance.post("/favorites", {
        userEmail: user.email,
        mealId: meal._id,
        mealName: meal.foodName,
        chefId: meal.chefId,
        chefName: meal.chefName,
        price: meal.price,
      });

      if (res.data.success) {
        toast.success("Added to favorites!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Already in favorites");
    }
  };

  // order button handle
  const handleOrder = () => {
    if (!user) {
      toast.error("Please login to place an order");
      return;
    }

    navigate(`/order/${meal._id}`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-gray-50 py-16">
      <section className="max-w-7xl mx-auto px-4">
        {/* Meal Details */}
        <div className="flex flex-col md:flex-row gap-10 mb-8">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full md:w-1/2 h-64 md:h-96 object-cover rounded-lg shadow"
          />

          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold">{meal.foodName}</h2>

            <p className="text-gray-600">
              Chef: {meal.chefName} ({meal.chefId})
            </p>

            <p className="text-gray-800 font-semibold text-xl flex items-center">
              Price: <FaDollarSign />
              {meal.price}
            </p>

            <p className="text-yellow-500 font-medium flex items-center space-x-1">
              <span>Rating :</span> <IoMdStar /> {meal.rating}
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

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddFavorite}
                className="btn btn-outline btn-success"
              >
                <MdFavorite /> Add to Favorite
              </button>

              <button onClick={handleOrder} className="btn btn-primary">
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-4xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Selected Rating: {rating || "None"}
          </p>

          {/* Add Review */}
          <div className="my-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="textarea textarea-bordered w-full"
            />
            <button onClick={handleAddReview} className="btn btn-success mt-2">
              Give Review
            </button>
          </div>

          {/* Review List */}
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((rev) => (
                <li key={rev._id} className="border-b pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.reviewerImage}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{rev.reviewerName}</p>
                      <p className="text-yellow-500">★ {rev.rating}</p>
                    </div>
                  </div>
                  <p className="mt-2">{rev.comment}</p>
                  <p className="text-xs text-gray-400">
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

// in this page add order button that clicked than go to order page.
