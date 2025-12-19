import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const ManageUsers = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  // Make Fraud handler
  const handleMakeFraud = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.displayName} will be marked as fraud!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make fraud",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosInstance.patch(`/users/fraud/${user._id}`);

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "User marked as fraud.",
          timer: 1500,
          showConfirmButton: false,
        });

        queryClient.invalidateQueries(["users"]);
      }
    });
  };

  if (isLoading) {
    return <div className="p-10">Loading users...</div>;
  }

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">Manage Users</h1>

      <div className="overflow-x-auto bg-base-200 rounded-lg shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.displayName || "N/A"}</td>
                <td>{user.email}</td>

                <td>
                  <span className="badge badge-info capitalize">
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "fraud" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td>
                  {/* RULES IMPLEMENTED HERE */}
                  {user.role !== "admin" && user.status !== "fraud" ? (
                    <button
                      onClick={() => handleMakeFraud(user)}
                      className="btn btn-sm btn-error"
                    >
                      Make Fraud
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
