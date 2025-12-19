import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const FavoritesPage = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  // Fetch favorites
  const { data: favorites = [], refetch } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  // Delete favorite
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Remove this meal from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/favorites/${id}`);
          if (res.data.success) {
            toast.success(res.data.message);
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to remove favorite.");
        }
      }
    });
  };

  return (
    <section className="mx-10">
      <h2 className="text-2xl font-semibold my-6">My Favorite Meals</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium">Meal Name</th>
              <th className="px-6 py-3 font-medium">Chef Name</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Date Added</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav) => (
              <tr key={fav._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{fav.mealName}</td>
                <td className="px-6 py-4">{fav.chefName}</td>
                <td className="px-6 py-4">${fav.price || "-"}</td>
                <td className="px-6 py-4">
                  {new Date(fav.addedTime).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(fav._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {favorites.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  You have no favorite meals yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FavoritesPage;
