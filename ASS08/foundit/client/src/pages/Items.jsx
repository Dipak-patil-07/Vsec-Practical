import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard.jsx";

function Items() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItems() {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Could not load items");
          return;
        }
        setItems(data);
      } catch (err) {
        setError("Could not connect to the server");
      }
    }
    loadItems();
  }, []);

  async function handleDelete(id) {
    try {
      const res = await fetch("/api/items/" + id, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter((item) => item._id !== id));
      } else {
        setError("Could not delete the item");
      }
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  const visibleItems = items.filter((item) => filter === "All" || item.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Browse Items</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="All">All Items</option>
          <option value="Lost">Lost Items</option>
          <option value="Found">Found Items</option>
        </select>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {visibleItems.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No items found here yet. Try another filter or report a new item.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <ItemCard key={item._id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Items;
