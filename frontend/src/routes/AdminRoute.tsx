import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../auth/AuthContext";

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
