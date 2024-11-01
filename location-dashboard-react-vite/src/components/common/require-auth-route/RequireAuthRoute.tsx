import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../../hooks/useAuth";

export const RequireAuthRoute = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
