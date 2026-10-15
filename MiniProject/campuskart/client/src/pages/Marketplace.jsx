import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard.jsx";
import { categories } from "../constants.js";
import { sendRequest } from "../api.js";

function Marketplace({ user }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [error, setError] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const result = await sendRequest("/api/items", "GET");
      if (!result.ok) {
        setError(result.data.message);
        return;
      }
      setItems(result.data);
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  const filteredItems = items.filter((item) => {
    const searchText = search.toLowerCase();
    const itemText = (item.title + " " + item.description).toLowerCase();

    const matchesSearch = itemText.includes(searchText);
    const matchesCategory = category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems];
  if (sortOption === "low") {
    sortedItems.sort((a, b) => a.price - b.price);
  }
  if (sortOption === "high") {
    sortedItems.sort((a, b) => b.price - a.price);
  }

  const soldItems = items.filter((item) => item.sold);
  const availableItems = items.filter((item) => !item.sold);

  const stats = [
    { label: "Total Listings", value: items.length },
    { label: "Available", value: availableItems.length },
    { label: "Sold", value: soldItems.length },
  ];

  const categoryList = ["All", ...categories];

  function getChipClass(name) {
    const baseStyle = "rounded-full px-4 py-1.5 text-sm font-medium transition active:scale-95 ";
    if (category === name) {
      return baseStyle + "bg-indigo-600 text-white";
    }
    return baseStyle + "border border-gray-300 bg-white text-gray-600 hover:bg-indigo-50";
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-linear-to-r from-indigo-600 to-violet-500 p-8 text-white shadow-md">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="mt-2 max-w-xl text-indigo-50">
          Find calculators, drawing tools, books and notes from your seniors at a much lower price.
        </p>
        <Link to="/sell" className="btn mt-5 bg-amber-400 text-gray-900 hover:bg-amber-300">
          Sell an Item
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5 text-center transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800">Marketplace</h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <input
            className="input min-w-60 flex-1"
            placeholder="Search items"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="input w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categoryList.map((name) => (
            <button key={name} onClick={() => setCategory(name)} className={getChipClass(name)}>
              {name}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-500">{sortedItems.length} item(s) found</p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        {sortedItems.length === 0 ? (
          <p className="mt-10 text-center text-gray-500">No items found. Try a different search or category.</p>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
