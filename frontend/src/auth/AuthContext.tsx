import { createContext, useContext, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role?: "ADMIN" | "USER";
};

type AuthContextType = {
  token: string | null;
  role: "ADMIN" | "USER" | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState<string | null>(storedToken);
  const [role, setRole] = useState<"ADMIN" | "USER" | null>(() => {
    if (!storedToken) return null;
    try {
      return (jwtDecode<JwtPayload>(storedToken).role ?? null);
    } catch {
      return null;
    }
  });

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
      const decoded = jwtDecode<JwtPayload>(newToken);
      setRole(decoded.role ?? null);
    } catch {
      setRole(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
