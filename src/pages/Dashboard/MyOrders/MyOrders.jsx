import React from "react";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Shared/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrders = () => {
  useTitle("My Orders");
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  // Payment handler
  const handlePayment = async (order) => {
    const { isConfirmed } = await Swal.fire({
      title: "Proceed to Payment?",
      text: `You are paying for ${order.mealName}, Price: $${
        order.price * order.quantity
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay Now",
    });

    if (!isConfirmed) return;

    try {
      const paymentInfo = {
        price: order.price,
        quantity: order.quantity,
        orderId: order._id,
        customerEmail: order.userEmail,
        mealName: order.mealName,
      };

      const res = await axiosInstance.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = res.data.url;
      }
    } catch {
      // console.error(error);
      Swal.fire("Error", "Failed to initiate payment", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mx-10 mb-10">
      <h1 className="text-2xl font-semibold my-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const showPayButton =
              order.orderStatus === "accepted" &&
              order.paymentStatus === "Pending";

            return (
              <div
                key={order._id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition"
              >
                <div className="card-body space-y-2">
                  <h2 className="text-lg font-bold">{order.mealName}</h2>
                  <p>
                    <span className="font-medium">Price:</span> ৳{order.price}
                  </p>
                  <p>
                    <span className="font-medium">Quantity:</span>{" "}
                    {order.quantity}
                  </p>
                  <p>
                    <span className="font-medium">Order Status:</span>{" "}
                    <span className="badge badge-info">
                      {order.orderStatus}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Payment Status:</span>{" "}
                    <span
                      className={`badge ${
                        order.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Delivery Time:</span>{" "}
                    {order.deliveryTime}
                  </p>
                  <p>
                    <span className="font-medium">Chef Name:</span>{" "}
                    {order.chefName}
                  </p>
                  <p>
                    <span className="font-medium">Chef ID:</span> {order.chefId}
                  </p>

                  {showPayButton && (
                    <button
                      onClick={() => handlePayment(order)}
                      className="btn btn-success btn-sm mt-3"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
