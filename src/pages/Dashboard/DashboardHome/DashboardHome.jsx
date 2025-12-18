import React from "react";
import useRole from "../../../hooks/useRole";
import UserDashboardHome from "./UserDashboardHome";
import AdminDashboardHome from "./AdminDashboardHome";
import ChefDashboardHome from "./ChefDashboardHome";
import Loading from "../../../components/Shared/Loading";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    
    else if (role === 'chef') {
        return <ChefDashboardHome></ChefDashboardHome>
    }
    
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;
