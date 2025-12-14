type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({ message, type = "success" }: ToastProps) {
  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow text-white
      ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  );
}
