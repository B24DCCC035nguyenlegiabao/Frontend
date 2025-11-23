import React from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireAdminOrStaff?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  requireAdminOrStaff = false,
}) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && role !== "ROLE_ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireAdminOrStaff && role !== "ROLE_ADMIN" && role !== "ROLE_STAFF") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
