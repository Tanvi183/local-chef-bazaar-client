import React from "react";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <Navbar></Navbar>

      <Outlet></Outlet>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
