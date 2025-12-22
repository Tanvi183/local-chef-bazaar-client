import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      Swal.fire("Error", "No session found", "error");
      return navigate("/dashboard/my-orders");
    }

    axiosInstance
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data.success) {
          Swal.fire(
            "Payment Successful",
            "Your order has been paid",
            "success"
          ).then(() => {
            navigate("/dashboard/my-orders");
          });
        } else {
          Swal.fire(
            "Payment Error",
            res.data.message || "Something went wrong",
            "error"
          );
        }
      })
      .catch(() => {
        // console.error(err);
        Swal.fire("Payment Error", "Server error", "error");
      });
  }, [sessionId, axiosInstance, navigate]);

  return <div className="text-center py-24">Processing payment...</div>;
};

export default PaymentSuccess;
