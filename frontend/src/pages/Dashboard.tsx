import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import SweetCard from "../components/SweetCard";
import SearchBar from "../components/SearchBar";

type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- FETCH SWEETS ---------- */
  const fetchSweets = useCallback(async (params?: {
    name?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const url = params
        ? `/sweets/search?${new URLSearchParams(params)}`
        : "/sweets";

      const res = await api.get<Sweet[]>(url);
      setSweets(res.data);
    } catch {
      setError("Failed to load sweets. Please try again.");
      setSweets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  /* ---------- PURCHASE HANDLER ---------- */
  const handlePurchase = useCallback(async (id: string) => {
    try {
      setLoadingId(id);
      await api.post(`/sweets/${id}/purchase`);

      setSweets(prev =>
        prev.map(s =>
          s.id === id
            ? { ...s, quantity: Math.max(0, s.quantity - 1) }
            : s
        )
      );
    } catch {
      setError("Purchase failed. Please try again.");
    } finally {
      setLoadingId(null);
    }
  }, []);

  /* ---------- UI STATES ---------- */

  if (loading) {
    return (
      <div className="text-center mt-12 text-gray-500">
        Loading sweets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-12 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  /* ---------- MAIN UI ---------- */

  return (
    <div>
      <h2 className="text-2xl font-semibold m-4 text-center">
        Available Sweets
      </h2>

      {/* Search & Filter */}
      <SearchBar onSearch={fetchSweets} />

      {sweets.length === 0 ? (
        <div className="text-center mt-12 text-gray-500">
          No sweets match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sweets.map(sweet => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              loading={loadingId === sweet.id}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      )}
    </div>
  );
}
