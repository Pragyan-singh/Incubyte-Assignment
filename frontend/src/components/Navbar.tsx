import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Button from "./ui/Button";


export default function Navbar() {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
  <h1 className="text-xl font-bold text-primary">
    <Link to="/">Sweet Shop</Link>
  </h1>

  <div className="flex gap-4 items-center">
    <Link className="hover:text-primary" to="/">Dashboard</Link>

    {role === "ADMIN" && (
      <Link className="hover:text-primary" to="/admin">
        Admin
      </Link>
    )}

    <Button onClick={handleLogout}>Logout</Button>
  </div>
</nav>
  );
}
