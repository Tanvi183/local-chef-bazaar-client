import React from "react";
import useAuth from "../../../hooks/useAuth";
import { FaUserAlt, FaEnvelope, FaRegAddressCard } from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const Profile = () => {
  useTitle("Profile");
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: profileData = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      // console.log(res);
      return res.data;
    },
  });

  const {
    email,
    displayName,
    photoURL,
    address,
    role = "user",
    status = "active",
    chefId,
  } = profileData;

  // Handle Role
  const handleRoleRequest = async (requestType) => {
    const requestData = {
      userName: displayName,
      userEmail: email,
      requestType,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      const res = await axiosInstance.post("/role-requests", requestData);

      if (res.data.insertedId) {
        refetch();
        await Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "We will reach out to you in 1-4 days.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  const { data: roleRequest, refetch } = useQuery({
    queryKey: ["role-request", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/role-requests?email=${user.email}`);
      return res.data;
    },
  });
  const isPending = roleRequest?.requestStatus === "pending";

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">My Profile</h1>

      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={photoURL || "https://i.ibb.co/2d4VYkN/user.png"}
                  alt="User Avatar"
                />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold mb-2">
                Name: {displayName || "Anonymous User"}
              </h2>
              <p className="text-gray-500 flex items-center gap-2 justify-center sm:justify-start mb-4">
                <FaEnvelope />
                Email : {email || "No email provided"}
              </p>
              <p className="text-gray-500 flex items-center gap-2 justify-center sm:justify-start">
                <FaRegAddressCard />
                Address : {address || "No address provided"}
              </p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <FaUserAlt className="text-primary" />
              <span className="font-medium">Account Type:</span>
              <span>{role || "User"}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-medium">Status:</span>
              <span
                className={`badge ${
                  status === "active" ? "badge-success" : "badge-error"
                }`}
              >
                {status}
              </span>
            </div>

            {/* Chef ID */}
            {role === "chef" && (
              <div className="flex items-center gap-3">
                <span className="font-medium">Chef ID:</span>
                <span>{chefId}</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="font-medium">Joined:</span>
              <span>
                {profileData.createdAt
                  ? new Date(profileData.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {role === "user" && (
              <button
                onClick={() => handleRoleRequest("chef")}
                className="btn btn-primary btn-sm"
                disabled={isPending}
              >
                {isPending ? "Request Pending..." : "Be a Chef"}
              </button>
            )}

            {role !== "admin" && (
              <button
                onClick={() => handleRoleRequest("admin")}
                className="btn btn-outline btn-sm"
                disabled={isPending}
              >
                {isPending ? "Request Pending..." : "Be an Admin"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
