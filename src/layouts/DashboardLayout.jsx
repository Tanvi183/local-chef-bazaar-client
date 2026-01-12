import { Link, NavLink, Outlet } from "react-router";
import {
  FaUserAlt,
  FaUsersCog,
  FaStar,
  FaShoppingCart,
  FaMoneyBillWave,
  FaTruck,
  FaSignOutAlt,
} from "react-icons/fa";
import logoImg from "../assets/images/logo.png";
import {
  MdDashboardCustomize,
  MdGroups,
  MdFoodBank,
  MdFavorite,
} from "react-icons/md";
import useRole from "../hooks/useRole";
import { GiMeal } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { role, status } = useRole();
  const { SignOut } = useAuth();
  // console.log(status);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        SignOut()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Logout Error:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong during logout. Please try again.",
            });
          });
      }
    });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 shadow-sm">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden"
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
            <div className="px-4 text-lg font-semibold">
              LocalChef Bazaar Dashboard
            </div>
          </div>

          <div className="navbar-end lg:pr-10">
            {/* Modern Logout Button */}
            <button
              onClick={handleLogOut}
              className="group relative flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-101 active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <FaSignOutAlt className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <span className="hidden sm:inline-block">Sign Out</span>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
            </button>
          </div>
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

            {/* admin only links */}

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/role-requests"
                    end
                    data-tip="Manage request"
                    className={({ isActive }) =>
                      `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                    }
                  >
                    <MdGroups />
                    <span className="is-drawer-close:hidden">
                      Manage request
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    end
                    data-tip="Manage Users"
                    className={({ isActive }) =>
                      `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                    }
                  >
                    <FaUsersCog />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* chef only links */}

            {role === "chef" && (
              <>
                {status !== "fraud" && (
                  <li>
                    <NavLink
                      to="/dashboard/meal-add"
                      end
                      data-tip="Create meal "
                      className={({ isActive }) =>
                        `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                      }
                    >
                      <GiMeal />
                      <span className="is-drawer-close:hidden">
                        Create meal
                      </span>
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink
                    to="/dashboard/my-meals"
                    end
                    data-tip="My Meals"
                    className={({ isActive }) =>
                      `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                    }
                  >
                    <MdFoodBank />
                    <span className="is-drawer-close:hidden"> My Meals</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/order-requests"
                    end
                    data-tip="Order requests"
                    className={({ isActive }) =>
                      `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                    }
                  >
                    <FaTruck />
                    <span className="is-drawer-close:hidden">
                      Order requests
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* user links */}
            {role === "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-reviews"
                    end
                    data-tip="My Reviews"
                    className={({ isActive }) =>
                      `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                    }
                  >
                    <FaStar />
                    <span className="is-drawer-close:hidden">My Reviews</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-favorites"
                    end
                    data-tip="My Favorites"
                    className={({ isActive }) =>
                      `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                    }
                  >
                    <MdFavorite />
                    <span className="is-drawer-close:hidden">My Favorites</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-orders"
                    end
                    data-tip="My Orders"
                    className={({ isActive }) =>
                      `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                    }
                  >
                    <FaShoppingCart />
                    <span className="is-drawer-close:hidden">My Orders</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/payment-history"
                    end
                    data-tip="Payment History"
                    className={({ isActive }) =>
                      `
      is-drawer-close:tooltip 
      is-drawer-close:tooltip-right
      flex items-center gap-3
      ${isActive ? "bg-primary text-white" : ""}
      `
                    }
                  >
                    <FaMoneyBillWave />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
