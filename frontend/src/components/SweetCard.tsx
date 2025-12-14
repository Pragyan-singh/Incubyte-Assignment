import Button from "./ui/Button";

type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type Props = {
  sweet: Sweet;
  onPurchase: (id: string) => void;
  loading: boolean;
};

export default function SweetCard({ sweet, onPurchase, loading }: Props) {
  const outOfStock = sweet.quantity === 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
      {/* Sweet info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {sweet.name}
        </h3>

        <p className="text-sm text-gray-500 capitalize">
          {sweet.category}
        </p>

        <p className="mt-3 text-2xl font-bold text-purple-600">
          ₹{sweet.price}
        </p>

        <p
          className={`mt-1 text-sm font-medium ${
            outOfStock ? "text-red-500" : "text-green-600"
          }`}
        >
          {outOfStock ? "Out of stock" : `Stock available: ${sweet.quantity}`}
        </p>
      </div>

      {/* Action */}
      <div className="mt-4">
        <Button
          className="w-full"
          disabled={outOfStock || loading}
          loading={loading}
          onClick={() => onPurchase(sweet.id)}
        >
          {outOfStock ? "Out of Stock" : "Purchase"}
        </Button>
      </div>
    </div>
  );
}
