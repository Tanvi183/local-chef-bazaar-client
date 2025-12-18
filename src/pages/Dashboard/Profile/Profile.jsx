import React from "react";
import useAuth from "../../../hooks/useAuth";
import { FaUserAlt, FaEnvelope } from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";

const Profile = () => {
  useTitle("Profile");
  const { user } = useAuth();

  return (
    <div className="mx-10">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold my-6">My Profile</h1>

      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/2d4VYkN/user.png"}
                  alt="User Avatar"
                />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold">
                {user?.displayName || "Anonymous User"}
              </h2>
              <p className="text-gray-500 flex items-center gap-2 justify-center sm:justify-start">
                <FaEnvelope />
                {user?.email || "No email provided"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <FaUserAlt className="text-primary" />
              <span className="font-medium">Account Type:</span>
              <span>User</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-medium">Joined:</span>
              <span>
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
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
