import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../pages/Dashboard/Profile/Profile";
import AdminRoute from "./AdminRoute";
import RoleRequests from "../pages/Dashboard/RoleRequest/RoleRequests";
import CreateMeal from "../pages/Meals/CreateMeal";
import ChefRoute from "./ChefRoute";
import MyMeals from "../pages/Meals/MyMeals";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import FraudRoute from "./FraudRoute";
import MealDetails from "../pages/Meals/MealDetails";
import MyReviews from "../pages/Dashboard/My Reviews/MyReviews";
import FavoritesPage from "../pages/Dashboard/FavoritesPage/FavoritesPage";
import OrderPage from "../pages/Dashboard/OrderPage/OrderPage";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import ChefOrders from "../pages/Dashboard/OrderRequests/OrderRequests";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import ErrorPage from "../components/Shared/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "meals",
        element: <Meals />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "meals/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "my-favorites",
        element: <FavoritesPage />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },

      {
        path: "payment-history",
        element: <PaymentHistory />,
      },

      // Admin Only Access
      {
        path: "role-requests",
        element: (
          <AdminRoute>
            <RoleRequests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },

      // Chef Only Access
      {
        path: "meal-add",
        element: (
          <ChefRoute>
            <FraudRoute>
              <CreateMeal />
            </FraudRoute>
          </ChefRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <ChefRoute>
            <MyMeals />
          </ChefRoute>
        ),
      },
      {
        path: "order-requests",
        element: (
          <ChefRoute>
            <ChefOrders />
          </ChefRoute>
        ),
      },
    ],
  },
]);

export default router;
