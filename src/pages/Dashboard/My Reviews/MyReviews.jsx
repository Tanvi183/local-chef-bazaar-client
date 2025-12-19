import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [editingReview, setEditingReview] = useState(null);

  // user wise review fetch
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-reviews?email=${user.email}`);
      return res.data;
    },
  });
  //   console.log(reviews);

  // UPDATE
  const handleUpdate = async () => {
    const { _id, rating, comment } = editingReview;

    const res = await axiosInstance.patch(`/reviews/${_id}`, {
      rating,
      comment,
    });

    if (res.data.success) {
      toast.success("Review updated successfully");
      setEditingReview(null);
      refetch();
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/reviews/${id}`);
          if (res.data.success) {
            Swal.fire({
              icon: "success",
              title: "Review deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            toast.success("Review deleted successfully!");
            refetch();
          }
        } catch (error) {
          console.error("Review delete error:", error);
          Swal.fire({
            icon: "error",
            title: "Oops... Failed to delete review",
          });
        }
      }
    });
  };

  return (
    <div className="mx-10">
      <h2 className="text-2xl font-semibold my-6">My Reviews</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Meal Name</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((rev) => (
              <tr key={rev._id}>
                <td className="font-medium">{rev.mealName}</td>
                <td className="text-yellow-500">★ {rev.rating}</td>
                <td className="max-w-xs truncate">{rev.comment}</td>
                <td>{new Date(rev.date).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setEditingReview(rev)}
                    className="btn btn-xs btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* update model */}
      {editingReview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Update Review</h3>

            <label className="label">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editingReview.rating}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
                  rating: e.target.value,
                })
              }
              className="input input-bordered w-full"
            />

            <label className="label mt-3">Comment</label>
            <textarea
              value={editingReview.comment}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
                  comment: e.target.value,
                })
              }
              className="textarea textarea-bordered w-full"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingReview(null)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="btn btn-sm btn-success">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
