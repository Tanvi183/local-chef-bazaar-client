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
      <h1 className="text-2xl font-semibold my-6">Manage request</h1>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500">
          No pending role requests
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <div className="card-body space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUser />
                  <span className="font-medium">{req.userName}</span>
                </div>

                <div className="space-x-2">
                  <span className="text-sm text-gray-500">
                    Requested Role :
                  </span>
                  <div className="badge badge-info">{req.requestType}</div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaClock />
                  <span>
                    {req.requestTime
                      ? new Date(req.requestTime).toLocaleString()
                      : "N/A"}
                  </span>
                </div>

                <div className="card-actions justify-end pt-3">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(req._id)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleRequests;
