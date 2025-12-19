import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../components/Shared/Loading";
import Forbidden from "../components/Shared/Forbidden";

const FraudRoute = ({ children }) => {
  const { status, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  if (status === "fraud") {
    return <Forbidden />;
  }

  return children;
};

export default FraudRoute;
