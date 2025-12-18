import React from "react";
import useAuth from "../../../hooks/useAuth";
import { FaUserAlt, FaEnvelope, FaRegAddressCard } from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const Profile = () => {
  useTitle("Profile");
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: profileData = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      console.log(res);

      return res.data;
    },
  });

  return (
    <div className="mx-10">
      <h1 className="text-2xl font-semibold my-6">My Profile</h1>

      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    profileData.photoURL || "https://i.ibb.co/2d4VYkN/user.png"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold mb-2">
                Name: {profileData.displayName || "Anonymous User"}
              </h2>
              <p className="text-gray-500 flex items-center gap-2 justify-center sm:justify-start mb-4">
                <FaEnvelope />
                Email : {profileData.email || "No email provided"}
              </p>
              <p className="text-gray-500 flex items-center gap-2 justify-center sm:justify-start">
                <FaRegAddressCard />
                Address : {profileData.address || "No address provided"}
              </p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <FaUserAlt className="text-primary" />
              <span className="font-medium">Account Type:</span>
              <span>{profileData.role || "User"}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-medium">Joined:</span>
              <span>
                {profileData.createdAt
                  ? new Date(profileData.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
