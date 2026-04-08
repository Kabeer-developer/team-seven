import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdminUser = (user?.role || "").toLowerCase() === "admin";

  return user && isAdminUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;