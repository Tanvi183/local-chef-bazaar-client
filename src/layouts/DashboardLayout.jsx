import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaUserAlt } from "react-icons/fa";
import logoImg from "../assets/images/logo.png";
import { MdDashboardCustomize } from "react-icons/md";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 flex-1">LocalChef Bazaar Dashboard</div>
        </nav>

        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <img src={logoImg} alt="" />
              </Link>
            </li>

            {/* our dashboard links */}
            <li>
              <NavLink
                to="/dashboard"
                end
                data-tip="MyDashboard"
                className={({ isActive }) =>
                  `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                }
              >
                <MdDashboardCustomize />
                <span className="is-drawer-close:hidden">My Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-profile"
                end
                data-tip="MyProfile"
                className={({ isActive }) =>
                  `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                }
              >
                <FaUserAlt />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
