require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let items;

const categories = ["ID Card", "Electronics", "Keys", "Bag", "Bottle", "Other"];

app.get("/api/items", async (req, res) => {
  try {
    const result = await items.find().sort({ createdAt: -1 }).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch items" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const { name, category, status, location, description, contact } = req.body;

    if (!name || !category || !status || !location || !description || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!categories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (status !== "Lost" && status !== "Found") {
      return res.status(400).json({ message: "Status must be Lost or Found" });
    }

    const item = {
      name: name.trim(),
      category,
      status,
      location: location.trim(),
      description: description.trim(),
      contact: contact.trim(),
      createdAt: new Date(),
    };

    const result = await items.insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Could not save item" });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const result = await items.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete item" });
  }
});

async function start() {
  try {
    await client.connect();
    items = client.db("foundit").collection("items");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server running on port " + port));
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
}

start();
