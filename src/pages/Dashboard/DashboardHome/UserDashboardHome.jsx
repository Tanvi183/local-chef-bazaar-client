import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaShoppingCart,
  FaHeart,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDashboardHome = () => {
  useTitle("Dashboard");
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-summary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const [orders, favorites, payments, reviews] = await Promise.all([
        axiosInstance.get(`/orders?email=${user.email}`),
        axiosInstance.get(`/favorites?email=${user.email}`),
        axiosInstance.get(`/payments?email=${user.email}`),
        axiosInstance.get(`/my-reviews?email=${user.email}`),
      ]);

      return {
        orders: orders.data,
        favorites: favorites.data,
        payments: payments.data,
        reviews: reviews.data,
      };
    },
  });
  if (isLoading) return <Loading />;

  const totalPaymentAmount = data.payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  console.log(totalPaymentAmount);

  const stats = [
    {
      title: "Total Orders",
      value: data.orders.length,
      icon: <FaShoppingCart />,
      color: "bg-indigo-500",
    },
    {
      title: "Total Favorites",
      value: data.favorites.length,
      icon: <FaHeart />,
      color: "bg-pink-500",
    },
    {
      title: "Total Payments",
      value: data.payments.length,
      icon: <FaMoneyBillWave />,
      color: "bg-green-500",
    },
    {
      title: "Total Reviews",
      value: data.reviews.length,
      icon: <FaStar />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="card shadow-md bg-base-100 hover:shadow-lg transition"
          >
            <div className="card-body flex flex-row items-center gap-4">
              <div
                className={`p-4 rounded-full text-white text-2xl ${item.color}`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Payment Amount */}
      <div className="mt-10">
        <div className="card bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
          <div className="card-body">
            <p className="text-lg">Total Payment Amount</p>
            <h2 className="text-4xl font-bold">
              ${totalPaymentAmount.toFixed(2)}
            </h2>
            <p className="text-sm opacity-90 mt-1">
              Total money you have spent so far
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
