import React from "react";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router";
import Subscription from "../components/Shared/Subscription";

const MainLayout = () => {
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
