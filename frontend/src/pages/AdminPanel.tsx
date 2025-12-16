import { useEffect, useState } from "react";
import api from "../api/axios";
import Button from "../components/ui/Button";

type Sweet = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type SweetForm = Omit<Sweet, "id">;

const EMPTY_FORM: SweetForm = {
  name: "",
  category: "",
  price: 0,
  quantity: 0,
};

export default function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [form, setForm] = useState<SweetForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* ---------------- FETCH ---------------- */
  const fetchSweets = async () => {
    try {
      const res = await api.get<Sweet[]>("/sweets");
      setSweets(res.data);
    } catch {
      setError("Failed to load sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  /* ---------------- FORM ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity"
          ? Number(value)
          : value,
    }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/sweets/${editingId}`, form);
        setSuccess("Sweet updated successfully");
      } else {
        await api.post("/sweets", form);
        setSuccess("Sweet added successfully");
      }

      resetForm();
      fetchSweets();
    } catch {
      setError("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this sweet permanently?")) return;

    try {
      await api.delete(`/sweets/${id}`);
      setSuccess("Sweet deleted successfully");
      fetchSweets();
    } catch {
      setError("Delete failed");
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (sweet: Sweet) => {
    const { id, ...rest } = sweet;
    setForm(rest);
    setEditingId(id);
    setError(null);
    setSuccess(null);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          Admin Panel
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage sweets inventory and stock
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handleSubmit}
            className="sticky top-6 bg-white border rounded-xl p-6"
          >
            <h2 className="text-lg font-medium mb-5">
              {editingId ? "Edit Sweet" : "Add New Sweet"}
            </h2>

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Sweet name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-black/10"
                required
              />

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-black/10"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="price"
                  type="number"
                  min="0"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-lg"
                  required
                />
                <input
                  name="quantity"
                  type="number"
                  min="0"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button type="submit" loading={loading}>
                {editingId ? "Update Sweet" : "Add Sweet"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Sweet List */}
        <div className="lg:col-span-2">
          {sweets.length === 0 ? (
            <div className="text-center text-gray-500 py-20 border rounded-xl">
              No sweets available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sweets.map(sweet => (
                <div
                  key={sweet.id}
                  className="bg-white border rounded-xl p-5 hover:shadow-sm transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {sweet.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {sweet.category}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      ₹{sweet.price}
                    </span>
                  </div>

                  <p className="text-sm mt-3">
                    Stock:{" "}
                    <span className="font-medium">
                      {sweet.quantity}
                    </span>
                  </p>

                  <div className="flex gap-2 mt-5">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(sweet)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(sweet.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
