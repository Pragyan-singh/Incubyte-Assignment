import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const isLandingPage = pathname === "/";
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 h-16 border-b bg-white">
      <h1 className="text-xl font-semibold">
        <Link to="/">Sweet Shop</Link>
      </h1>

      {/* Hide all auth buttons on landing page */}
      {!isLandingPage && (
        <div className="flex gap-4 items-center">
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>

              <button
                onClick={handleLogout}
                className="text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* On login page → show Register only */}
              {isLoginPage && (
                <Link
                  to="/register"
                  className="font-medium"
                >
                  Register
                </Link>
              )}

              {/* On register page → show Login only */}
              {isRegisterPage && (
                <Link
                  to="/login"
                  className="font-medium"
                >
                  Login
                </Link>
              )}

              {/* On other public pages (if any) → show both */}
              {!isLoginPage && !isRegisterPage && (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
