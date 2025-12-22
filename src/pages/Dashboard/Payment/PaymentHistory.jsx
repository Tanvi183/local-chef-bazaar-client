import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const { role } = useRole();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", role, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/payments?email=${user.email}&role=${role}`
      );
      return res.data;
    },
  });

  //   console.log(payments);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="mx-10 mb-10">
      <h2 className="text-2xl font-semibold my-6">
        Payment History: {payments.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Paid Time</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.mealName}</td>
                <td>${payment.amount}</td>
                <td>{payment.paidAt}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
