import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white px-6">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Sweet Shop 🍬
      </h1>

      <p className="text-lg mb-8 text-center max-w-xl">
        Buy delicious sweets online, manage inventory, and track stock in real time.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-purple-700 rounded-md font-semibold hover:bg-gray-100"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-3 border border-white rounded-md font-semibold hover:bg-white hover:text-purple-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
