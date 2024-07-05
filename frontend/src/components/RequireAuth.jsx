import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = (props) => {
  const { auth } = useAuth();
  const location = useLocation();

  return props.allowedRole.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
