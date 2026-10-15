import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, conditions } from "../constants.js";
import { sendRequest } from "../api.js";

function Sell({ user }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [condition, setCondition] = useState(conditions[1]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const picture = new Image();

      picture.onload = () => {
        const maxWidth = 600;
        let width = picture.width;
        let height = picture.height;

        if (width > maxWidth) {
          height = height * (maxWidth / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        context.drawImage(picture, 0, 0, width, height);

        const smallImage = canvas.toDataURL("image/jpeg", 0.7);
        setImage(smallImage);
      };

      picture.src = reader.result;
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim() || !price) {
      setError("Please fill in the title, price and description");
      return;
    }
    if (Number(price) <= 0) {
      setError("Selling price must be more than 0");
      return;
    }
    if (!image) {
      setError("Please add a photo");
      return;
    }

    try {
      const result = await sendRequest("/api/items", "POST", {
        title: title,
        category: category,
        condition: condition,
        originalPrice: originalPrice,
        price: price,
        description: description,
        image: image,
        sellerRollNo: user.rollNo,
      });

      if (!result.ok) {
        setError(result.data.message);
        return;
      }
      navigate("/profile");
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  const labelStyle = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800">Sell an Item</h1>
      <p className="mt-1 text-gray-500">Add a photo and a price. Other students can then find your item.</p>

      <form onSubmit={handleSubmit} className="card mt-6 space-y-4 p-6">
        <div>
          <label className={labelStyle}>Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelStyle}>Category</label>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelStyle}>Condition</label>
            <select className="input" value={condition} onChange={(e) => setCondition(e.target.value)}>
              {conditions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelStyle}>Original Price (₹)</label>
            <input
              type="number"
              className="input"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
          <div>
            <label className={labelStyle}>Selling Price (₹)</label>
            <input type="number" className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelStyle}>Description</label>
          <textarea
            rows="3"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className={labelStyle}>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-600 hover:file:bg-indigo-100"
          />
          {image && (
            <img src={image} alt="Preview" className="mt-3 h-32 rounded-lg border border-gray-200 object-cover" />
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn btn-primary">Post Item</button>
      </form>
    </div>
  );
}

export default Sell;
