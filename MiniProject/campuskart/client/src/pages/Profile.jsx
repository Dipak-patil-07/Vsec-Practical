import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sendRequest } from "../api.js";

function Profile({ user }) {
  const [items, setItems] = useState([]);
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
      const myItems = result.data.filter((item) => item.sellerRollNo === user.rollNo);
      setItems(myItems);
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  async function handleMarkSold(id) {
    try {
      const result = await sendRequest("/api/items/" + id + "/sold", "PUT", {
        rollNo: user.rollNo,
      });
      if (!result.ok) {
        setError(result.data.message);
        return;
      }
      loadItems();
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this item?");
    if (!confirmed) {
      return;
    }

    try {
      const result = await sendRequest("/api/items/" + id + "?rollNo=" + user.rollNo, "DELETE");
      if (!result.ok) {
        setError(result.data.message);
        return;
      }
      loadItems();
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  const firstLetter = user.name.charAt(0).toUpperCase();
  const soldCount = items.filter((item) => item.sold).length;

  const details = [
    { label: "Branch", value: user.branch },
    { label: "Year", value: user.year },
    { label: "Phone", value: user.phone },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
            {firstLetter}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-sm text-gray-500">Roll No: {user.rollNo}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.label} className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-gray-500">{detail.label}</p>
              <p className="font-medium text-gray-800">{detail.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-6 text-sm text-gray-600">
          <p>Items listed: <span className="font-semibold text-gray-800">{items.length}</span></p>
          <p>Items sold: <span className="font-semibold text-gray-800">{soldCount}</span></p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">My Listings</h2>
          <Link to="/sell" className="btn btn-primary">Sell an Item</Link>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        {items.length === 0 ? (
          <p className="mt-6 text-gray-500">You have not listed anything yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((item) => {
              let statusText = "Available";
              let statusStyle = "bg-emerald-100 text-emerald-700";
              if (item.sold) {
                statusText = "Sold";
                statusStyle = "bg-red-100 text-red-700";
              }

              return (
                <div key={item._id} className="card flex flex-wrap items-center gap-4 p-4">
                  <img src={item.image} alt={item.title} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <Link to={"/item/" + item._id} className="font-semibold text-gray-800 hover:text-indigo-600">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                    <span className={"badge mt-1 " + statusStyle}>{statusText}</span>
                  </div>
                  <div className="flex gap-2">
                    {!item.sold && (
                      <button onClick={() => handleMarkSold(item._id)} className="btn btn-success">
                        Mark Sold
                      </button>
                    )}
                    <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
