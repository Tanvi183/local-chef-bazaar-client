import React from "react";
import useTitle from "../../../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { FaUser, FaClock } from "react-icons/fa";
import Loading from "../../../components/Shared/Loading";

const RoleRequests = () => {
  useTitle("Role Requests");
  const axiosInstance = useAxios();

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["role-requests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/role-requests/all");
      return res.data;
    },
  });

  // Approve request
  const handleApprove = async (requestId) => {
    try {
      await axiosInstance.patch(`/role-requests/${requestId}`, {
        requestStatus: "approved",
      });

      toast.success("Role request approved");
      refetch();
    } catch {
      toast.error("Failed to approve request");
    }
  };

  // Reject request
  const handleReject = async (requestId) => {
    try {
      await axiosInstance.patch(`/role-requests/${requestId}`, {
        requestStatus: "rejected",
      });

      toast.success("Role request rejected");
      refetch();
    } catch {
      toast.error("Failed to reject request");
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">Manage Role Requests</h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No role requests found</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Request Type</th>
                <th>Status</th>
                <th>Request Time</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req, index) => {
                const isDisabled = req.requestStatus !== "pending";

                return (
                  <tr key={req._id}>
                    <td>{index + 1}</td>

                    <td className="font-medium">{req.userName}</td>

                    <td className="text-gray-600">{req.userEmail}</td>

                    <td>
                      <span
                        className={`badge ${
                          req.requestType === "admin"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {req.requestType}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          req.requestStatus === "approved"
                            ? "badge-success"
                            : req.requestStatus === "rejected"
                            ? "badge-error"
                            : "badge-ghost"
                        }`}
                      >
                        {req.requestStatus}
                      </span>
                    </td>

                    <td className="text-sm">
                      {new Date(req.requestTime).toLocaleString()}
                    </td>

                    <td className="text-center space-x-2">
                      <button
                        onClick={() => handleApprove(req._id)}
                        disabled={isDisabled}
                        className="btn btn-success btn-xs"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(req._id)}
                        disabled={isDisabled}
                        className="btn btn-error btn-xs"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoleRequests;
