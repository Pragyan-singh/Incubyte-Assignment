import { AuthProvider } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar />
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}
