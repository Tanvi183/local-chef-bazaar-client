import React from "react";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Shared/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ChefOrders = () => {
  useTitle("Order Requests");

  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const { data: profileData = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  //   console.log(profileData);

  const chefId = profileData?.chefId;
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders-request", chefId],
    enabled: !!chefId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/chef/orders?chefId=${chefId}`);
      return res.data;
    },
  });

  const handleUpdateStatus = async (orderId, status) => {
    const actionText =
      status === "accepted" ? "accept this order" : "cancel this order";

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${actionText}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "accepted" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, confirm",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await axiosInstance.patch(`/orders/${orderId}/status`, {
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Order has been ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">Order Requests</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {orders.map((order) => {
            const isCancelled = order.orderStatus === "cancelled";
            const isAccepted = order.orderStatus === "accepted";
            const isDelivered = order.orderStatus === "delivered";

            return (
              <div key={order._id} className="card bg-base-100 shadow-md">
                <div className="card-body space-y-2">
                  <h2 className="font-bold text-lg">{order.mealName}</h2>

                  <p>Price: ৳{order.price}</p>
                  <p>Quantity: {order.quantity}</p>

                  <p>
                    Order Status:
                    <span className="badge ml-2">{order.orderStatus}</span>
                  </p>

                  <p>
                    Payment:
                    <span className="badge badge-outline ml-2">
                      {order.paymentStatus}
                    </span>
                  </p>

                  <p>User Email: {order.userEmail}</p>
                  <p>User Address: {order.userAddress}</p>

                  <p className="text-sm text-gray-500">
                    {order.orderTime
                      ? new Date(order.orderTime).toLocaleString()
                      : "N/A"}
                  </p>

                  <div className="flex gap-2 pt-3">
                    <button
                      onClick={() => handleUpdateStatus(order._id, "cancelled")}
                      disabled={isCancelled || isAccepted || isDelivered}
                      className="btn btn-error btn-sm"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(order._id, "accepted")}
                      disabled={isCancelled || isAccepted || isDelivered}
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(order._id, "delivered")}
                      disabled={!isAccepted}
                      className="btn btn-info btn-sm"
                    >
                      Deliver
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChefOrders;
