import Button from "./ui/Button";

type Props = {
  onSearch: (params: {
    name?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const minPrice = (form.elements.namedItem("minPrice") as HTMLInputElement).value;
    const maxPrice = (form.elements.namedItem("maxPrice") as HTMLInputElement).value;

    onSearch({
      name: name || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm"
    >
      <input
        name="name"
        placeholder="Search by name"
        className="border p-2 rounded w-full sm:w-48"
      />

      <input
        name="minPrice"
        type="number"
        placeholder="Min price"
        className="border p-2 rounded w-full sm:w-32"
      />

      <input
        name="maxPrice"
        type="number"
        placeholder="Max price"
        className="border p-2 rounded w-full sm:w-32"
      />

      <Button>Search</Button>
    </form>
  );
}
