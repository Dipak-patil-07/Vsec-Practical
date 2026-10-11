import { useState } from "react";

const categories = ["ID Card", "Electronics", "Keys", "Bag", "Bottle", "Other"];

const emptyForm = {
  name: "",
  category: "ID Card",
  status: "Lost",
  location: "",
  description: "",
  contact: "",
};

function Home({ user }) {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.name.trim() || !form.location.trim() || !form.description.trim() || !form.contact.trim()) {
      setError("Please fill in all the fields");
      return;
    }

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }
      setMessage("Item submitted successfully!");
      setForm(emptyForm);
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  const inputStyle =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none";
  const labelStyle = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user}</h1>
      <p className="mt-2 text-gray-600">
        FoundIt helps students return lost belongings. Report an item you lost or found, or browse
        the listings to see if someone has found yours.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-gray-800">Report an Item</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelStyle}>Item Name</label>
            <input name="name" value={form.name} onChange={handleChange} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputStyle}>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelStyle}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputStyle}>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Location</label>
            <input name="location" value={form.location} onChange={handleChange} className={inputStyle} />
          </div>
        </div>

        <div>
          <label className={labelStyle}>Description</label>
          <textarea
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Contact Information</label>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Phone number or email"
            className={inputStyle}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm font-medium text-green-600">{message}</p>}

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Submit Item
        </button>
      </form>
    </div>
  );
}

export default Home;
