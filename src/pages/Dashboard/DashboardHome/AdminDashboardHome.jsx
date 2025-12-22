import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Shared/Loading";
import useRole from "../../../hooks/useRole";

const AdminDashboardHome = () => {
  useTitle("Admin Dashboard");
  const { role } = useRole();
  const axiosInstance = useAxios();

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard-summary"],
    queryFn: async () => {
      const [usersRes, paymentsRes, ordersRes] = await Promise.all([
        axiosInstance.get("/users"),
        axiosInstance.get(`/payments?role=${role}`),
        axiosInstance.get(`/orders/all?role=${role}`),
      ]);

      const users = usersRes.data || [];
      const payments = paymentsRes.data || [];
      const orders = ordersRes.data || [];

      const totalPaymentAmount = payments.reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
      );

      const pendingOrders = orders.filter(
        (o) => o.orderStatus === "pending"
      ).length;

      const deliveredOrders = orders.filter(
        (o) => o.orderStatus === "delivered"
      ).length;

      const chartData = [
        { name: "Pending Orders", value: pendingOrders },
        { name: "Delivered Orders", value: deliveredOrders },
        { name: "Total Payments", value: payments.length },
        { name: "Total Users", value: users.length },
      ];

      return {
        totalUsers: users.length,
        totalPayments: payments.length,
        totalPaymentAmount,
        pendingOrders,
        deliveredOrders,
        chartData,
      };
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-red-500">Failed to load dashboard data.</p>;

  const {
    totalUsers = 0,
    totalPayments = 0,
    totalPaymentAmount = 0,
    pendingOrders = 0,
    deliveredOrders = 0,
    chartData = [],
  } = data;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers />,
      color: "bg-indigo-500",
    },
    {
      title: "Total Payments",
      value: totalPayments,
      icon: <FaMoneyBillWave />,
      color: "bg-green-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders,
      icon: <FaCheckCircle />,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">Admin Dashboard Overview</h1>

      {/* Stats Cards */}
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

      {/* Total Payment Amount */}
      <div className="mt-10">
        <div className="card bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
          <div className="card-body">
            <p className="text-lg">Total Payment Amount</p>
            <h2 className="text-4xl font-bold">
              ${totalPaymentAmount.toFixed(2)}
            </h2>
            <p className="text-sm opacity-90 mt-1">Sum of all payments made</p>
          </div>
        </div>
      </div>

      {/* Orders / Payments Chart */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
