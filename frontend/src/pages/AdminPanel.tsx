import { useEffect, useState } from "react";
import api from "../api/axios";
import Button from "../components/ui/Button";

type Sweet = {
  id: string;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* ---------- FETCH ---------- */
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

  /* ---------- FORM ---------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this sweet permanently?")) return;

    try {
      await api.delete(`/sweets/${id}`);
      setSuccess("Sweet deleted successfully");
      fetchSweets();
    } catch {
      setError("Delete failed");
    }
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (sweet: Sweet) => {
    const { id, ...rest } = sweet;
    setForm(rest);
    setEditingId(id);
    setError(null);
    setSuccess(null);
  };

  /* ---------- UI ---------- */

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Admin Panel
      </h2>

      {/* Alerts */}
      {error && (
        <p className="text-red-600 mb-3">{error}</p>
      )}
      {success && (
        <p className="text-green-600 mb-3">{success}</p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10 max-w-lg"
      >
        <h3 className="text-lg font-medium mb-4">
          {editingId ? "Edit Sweet" : "Add New Sweet"}
        </h3>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Sweet name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="price"
            type="number"
            min="0"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="quantity"
            type="number"
            min="0"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex gap-3 mt-5">
          <Button
            type="submit"
            loading={loading}
          >
            {editingId ? "Update" : "Add"}
          </Button>

          {editingId && (
            <Button
              variant="secondary"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* Sweet List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map(sweet => (
          <div
            key={sweet.id}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h4 className="font-semibold text-lg">
              {sweet.name}
            </h4>
            <p className="text-sm text-gray-500">
              {sweet.category}
            </p>
            <p className="mt-1 font-medium">
              ₹{sweet.price}
            </p>
            <p className="text-sm">
              Stock: {sweet.quantity}
            </p>

            <div className="flex gap-3 mt-4">
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
    </div>
  );
}
