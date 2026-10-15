require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json({ limit: "5mb" }));

const client = new MongoClient(process.env.MONGO_URI);
let users;
let items;
let reports;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return salt + ":" + hash;
}

function passwordMatches(password, savedPassword) {
  const parts = savedPassword.split(":");
  const salt = parts[0];
  const savedHash = parts[1];
  const newHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return newHash === savedHash;
}

function withoutPassword(user) {
  const safeUser = { ...user };
  delete safeUser.passwordHash;
  return safeUser;
}

async function findUser(rollNo) {
  const cleanRollNo = String(rollNo).trim().toUpperCase();
  const user = await users.findOne({ rollNo: cleanRollNo });
  return user;
}

app.post("/api/signup", async (req, res) => {
  try {
    const { name, rollNo, branch, year, phone, password } = req.body;

    if (!name || !rollNo || !branch || !year || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const phoneIsValid = /^[0-9]{10}$/.test(phone.trim());
    if (!phoneIsValid) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const oldUser = await findUser(rollNo);
    if (oldUser) {
      return res.status(409).json({ message: "This roll no is already registered" });
    }

    const newUser = {
      name: name.trim(),
      rollNo: rollNo.trim().toUpperCase(),
      branch: branch,
      year: year,
      phone: phone.trim(),
      passwordHash: hashPassword(password),
      banned: false,
      createdAt: new Date(),
    };

    await users.insertOne(newUser);
    res.status(201).json(withoutPassword(newUser));
  } catch (error) {
    res.status(500).json({ message: "Could not create account" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    if (!rollNo || !password) {
      return res.status(400).json({ message: "Roll no and password are required" });
    }

    const user = await findUser(rollNo);
    if (!user) {
      return res.status(401).json({ message: "Wrong roll no or password" });
    }

    const passwordIsCorrect = passwordMatches(password, user.passwordHash);
    if (!passwordIsCorrect) {
      return res.status(401).json({ message: "Wrong roll no or password" });
    }

    if (user.banned) {
      return res.status(403).json({ message: "Your account is banned" });
    }

    res.json(withoutPassword(user));
  } catch (error) {
    res.status(500).json({ message: "Could not log in" });
  }
});

app.get("/api/items", async (req, res) => {
  try {
    const bannedUsers = await users.find({ banned: true }).toArray();
    const bannedRollNos = bannedUsers.map((user) => user.rollNo);

    const allItems = await items
      .find({ sellerRollNo: { $nin: bannedRollNos } })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(allItems);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch items" });
  }
});

app.get("/api/items/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await items.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch item" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const { title, category, condition, originalPrice, price, description, image, sellerRollNo } = req.body;

    if (!title || !category || !condition || !price || !description || !image || !sellerRollNo) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({ message: "Enter a valid selling price" });
    }

    if (!image.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid photo" });
    }

    const seller = await findUser(sellerRollNo);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    if (seller.banned) {
      return res.status(403).json({ message: "Your account is banned" });
    }

    const newItem = {
      title: title.trim(),
      category: category,
      condition: condition,
      originalPrice: Number(originalPrice) || 0,
      price: Number(price),
      description: description.trim(),
      image: image,
      sellerRollNo: seller.rollNo,
      sellerName: seller.name,
      sellerPhone: seller.phone,
      sellerBranch: seller.branch,
      sellerYear: seller.year,
      sold: false,
      createdAt: new Date(),
    };

    const result = await items.insertOne(newItem);
    res.status(201).json({ ...newItem, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Could not save item" });
  }
});

app.put("/api/items/:id/sold", async (req, res) => {
  try {
    const id = req.params.id;
    const rollNo = req.body.rollNo;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await items.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.sellerRollNo !== rollNo) {
      return res.status(403).json({ message: "You can only change your own items" });
    }

    await items.updateOne({ _id: item._id }, { $set: { sold: true } });
    res.json({ message: "Item marked as sold" });
  } catch (error) {
    res.status(500).json({ message: "Could not update item" });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rollNo = req.query.rollNo;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await items.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.sellerRollNo !== rollNo) {
      return res.status(403).json({ message: "You can only delete your own items" });
    }

    await items.deleteOne({ _id: item._id });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete item" });
  }
});

app.post("/api/reports", async (req, res) => {
  try {
    const { reporterRollNo, sellerRollNo, reason, note } = req.body;

    if (!reporterRollNo || !sellerRollNo || !reason) {
      return res.status(400).json({ message: "Please choose a reason" });
    }

    const reporter = await findUser(reporterRollNo);
    const seller = await findUser(sellerRollNo);
    if (!reporter || !seller) {
      return res.status(404).json({ message: "User not found" });
    }

    if (reporter.rollNo === seller.rollNo) {
      return res.status(400).json({ message: "You cannot report yourself" });
    }

    const oldReport = await reports.findOne({
      reporterRollNo: reporter.rollNo,
      sellerRollNo: seller.rollNo,
    });
    if (oldReport) {
      return res.status(409).json({ message: "You have already reported this seller" });
    }

    const newReport = {
      reporterRollNo: reporter.rollNo,
      reporterName: reporter.name,
      sellerRollNo: seller.rollNo,
      reason: reason,
      note: (note || "").trim(),
      createdAt: new Date(),
    };
    await reports.insertOne(newReport);

    const reporterList = await reports.distinct("reporterRollNo", { sellerRollNo: seller.rollNo });
    if (reporterList.length >= 3) {
      await users.updateOne({ rollNo: seller.rollNo }, { $set: { banned: true } });
    }

    res.status(201).json({ message: "Report submitted. Thank you for keeping CampusKart safe." });
  } catch (error) {
    res.status(500).json({ message: "Could not submit report" });
  }
});

async function startServer() {
  try {
    await client.connect();
    const db = client.db("campuskart");
    users = db.collection("users");
    items = db.collection("items");
    reports = db.collection("reports");

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server running on port " + port));
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
}

startServer();
