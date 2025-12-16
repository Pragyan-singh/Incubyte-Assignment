import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import Button from "../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await api.post("/auth/login", { email, password });

      login(res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      {error && (
        <p className="mb-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <input
        name="email"
        type="email"
        required
        className="w-full mb-3 p-2 border rounded"
        placeholder="Email"
        disabled={loading}
      />

      <input
        name="password"
        type="password"
        required
        className="w-full mb-4 p-2 border rounded"
        placeholder="Password"
        disabled={loading}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
