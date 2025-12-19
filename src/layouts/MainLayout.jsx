import React from "react";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet, useNavigate } from "react-router";
import Subscription from "../components/Shared/Subscription";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Shared/Loading";

const MainLayout = () => {
  const { loading } = useAuth();
  const navigation = useNavigate();

  if (loading || navigation.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <Navbar></Navbar>

      <Outlet></Outlet>

      {/* Bottom Subscription Section */}
      <Subscription></Subscription>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
