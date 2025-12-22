import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUtensils,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaMoneyBillWave,
} from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ChefDashboardHome = () => {
  useTitle("Chef Dashboard");
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const { data: profileData = {}, isLoading: isProfileLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const chefId = profileData?.chefId;

  const { data, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["chef-dashboard", chefId],
    enabled: !!chefId,
    queryFn: async () => {
      const [mealsRes, ordersRes] = await Promise.all([
        axiosInstance.get(`/meals?userEmail=${user.email}`),
        axiosInstance.get(`/chef/orders?chefId=${chefId}`),
      ]);

      return {
        meals: mealsRes.data || [],
        orders: ordersRes.data || [],
      };
    },
  });

  if (isProfileLoading || isOrdersLoading) return <Loading />;

  const { meals = [], orders = [] } = data || {};

  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "pending"
  ).length;

  const acceptedOrders = orders.filter(
    (o) => o.orderStatus === "accepted"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.orderStatus === "delivered"
  ).length;

  const totalIncome = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + Number(o.price) * Number(o.quantity), 0);

  const stats = [
    {
      title: "Total Meals",
      value: meals.length,
      icon: <FaUtensils />,
      color: "bg-indigo-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Accepted Orders",
      value: acceptedOrders,
      icon: <FaCheckCircle />,
      color: "bg-blue-500",
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders,
      icon: <FaTruck />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">Chef Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md hover:shadow-lg transition"
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

      {/* Income Card */}
      <div className="mt-10">
        <div className="card bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-3xl" />
              <p className="text-lg">Total Income</p>
            </div>
            <h2 className="text-4xl font-bold mt-2">
              ৳{totalIncome.toFixed(2)}
            </h2>
            <p className="text-sm opacity-90 mt-1">
              Income from delivered & paid orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboardHome;
