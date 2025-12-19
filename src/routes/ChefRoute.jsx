import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Shared/Loading";
import Forbidden from "../components/Shared/Forbidden";

const ChefRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "chef") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default ChefRoute;
