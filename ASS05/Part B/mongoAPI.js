const express = require("express");
const { MongoClient , ObjectId} = require("mongodb");

const app = express();

app.use(express.json());

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

let students;

async function connectDB() {
    await client.connect();

    console.log("MongoDB connected");

    const db = client.db("college");

    students = db.collection("students");
}

connectDB();

app.get("/students", async (req, res) => {

    const data = await students.find().toArray();

    res.send(data);
    console.log(data);
});

app.get("/students/sort", async (req,res)=>{
    const data = await students.find().toArray();
    const topper = data.sort((a,b) => b.marks - a.marks);
    res.send(topper);
    console.log(topper);
})

app.post("/students", async (req, res) => {

    await students.insertOne(req.body);

    res.send("Student added successfully");
});


app.put("/students/:id", async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }

    const result = await students.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                name: req.body.name,
                marks: Number(req.body.marks)
            }
        }
    );
    
  if (result.matchedCount === 0) {
        return res.status(404).send("Student not found");
    }

    res.send("Student updated successfully");
});

app.delete("/students/:id", async (req, res) => {

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }

    const result = await students.deleteOne({
        _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
        return res.status(404).send("Student not found");
    }

    res.send("Student deleted successfully");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});