import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../auth/AuthContext";

export default function PublicRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}
