import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Shared/Loading";

const OrderPage = () => {
  useTitle("Confirm Order");

  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      userAddress: "",
    },
  });

  // Fetch meal
  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/meals/${id}`);
      return res.data.meal;
    },
  });

  // Fetch user status
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  //   console.log(userData);

  if (isLoading || userLoading) return <Loading />;

  const quantity = watch("quantity");
  const totalPrice = meal.price * quantity;

  // order submit
  const onSubmit = async (data) => {
    if (userData?.status !== "active") {
      Swal.fire({
        icon: "error",
        title: "Account Inactive",
        text: "Your account is not active. You cannot place an order.",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Do you want to confirm the order",
      text: `Your total price is $${totalPrice}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    const orderData = {
      foodId: meal._id,
      mealName: meal.foodName,
      price: meal.price,
      quantity: data.quantity,
      chefId: meal.chefId,
      userEmail: user.email,
      userAddress: data.userAddress,
    };

    // console.log(orderData);

    const res = await axiosInstance.post("/orders", orderData);

    if (res.data.success) {
      Swal.fire("Success", "Order placed successfully!", "success");
      navigate("/dashboard/my-orders");
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl text-center font-bold mb-10">
          Confirm Your Order
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow rounded-lg p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3">
              <label className="label">Meal Name</label>
              <input
                className="input input-bordered w-full"
                value={meal.foodName}
                disabled
              />
            </div>

            <div className="md:col-span-1">
              <label className="label">Price</label>
              <input
                className="input input-bordered w-full"
                value={meal.price}
                disabled
              />
            </div>

            <div className="md:col-span-1">
              <label className="label">Quantity</label>
              <input
                type="number"
                min={1}
                className="input input-bordered w-full"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Minimum quantity is 1" },
                })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Chef ID</label>
              <input
                className="input input-bordered w-full"
                value={meal.chefId}
                disabled
              />
            </div>

            <div>
              <label className="label">User Email</label>
              <input
                className="input input-bordered w-full"
                value={user.email}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="label">Delivery Address</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter your delivery address"
              {...register("userAddress", {
                required: "Delivery address is required",
              })}
            />
            {errors.userAddress && (
              <p className="text-red-500 text-sm">
                {errors.userAddress.message}
              </p>
            )}
          </div>

          <p className="text-lg font-semibold">
            Total Price: <span className="text-green-600">${totalPrice}</span>
          </p>

          {userData?.status !== "active" && (
            <p className="text-red-500 text-center text-sm">
              Your account is not active. Ordering is disabled.
            </p>
          )}

          <button
            type="submit"
            disabled={userData?.status !== "active"}
            className="py-3 px-8 bg-lime-600 text-white hover:bg-lime-700 font-semibold transition w-full cursor-pointer"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
