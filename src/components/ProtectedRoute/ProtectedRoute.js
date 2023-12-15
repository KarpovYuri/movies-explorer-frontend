import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isLogged }) {
  return isLogged ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
