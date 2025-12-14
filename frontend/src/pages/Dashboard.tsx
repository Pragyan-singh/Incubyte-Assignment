import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [sweets, setSweets] = useState<any[]>([]);

  useEffect(() => {
    api.get("/sweets").then(res => setSweets(res.data));
  }, []);

  const purchase = async (id: string) => {
    await api.post(`/sweets/${id}/purchase`);
    setSweets(prev =>
      prev.map(s =>
        s.id === id ? { ...s, quantity: s.quantity - 1 } : s
      )
    );
  };

  return (
    <div>
      {sweets.map(s => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>₹{s.price}</p>
          <p>Stock: {s.quantity}</p>
          <button
            disabled={s.quantity === 0}
            onClick={() => purchase(s.id)}
          >
            Purchase
          </button>
        </div>
      ))}
    </div>
  );
}
