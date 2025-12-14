import api from "../api/axios";

export default function AdminPanel() {
  const createSweet = async (e: any) => {
    e.preventDefault();
    await api.post("/sweets", {
      name: e.target.name.value,
      category: e.target.category.value,
      price: Number(e.target.price.value),
      quantity: Number(e.target.quantity.value)
    });
  };

  return (
    <form onSubmit={createSweet}>
      <input name="name" placeholder="Name" />
      <input name="category" placeholder="Category" />
      <input name="price" type="number" />
      <input name="quantity" type="number" />
      <button>Add Sweet</button>
    </form>
  );
}
