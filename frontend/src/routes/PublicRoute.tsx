import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../auth/AuthContext";

export default function PublicRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { token, role } = useAuth();

  if (token) {
    return role === "ADMIN"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/dashboard" replace />;
  }

  return children;
}
