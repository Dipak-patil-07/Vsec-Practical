const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(express.json());

const mongoUrl = "mongodb://127.0.0.1:27017";

const client = new MongoClient(mongoUrl);

let employeeCollection;

async function startServer() {

    try {

        await client.connect();

        console.log("Connected to MongoDB");

        const database = client.db("companyDB");

        employeeCollection = database.collection("employees");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });

    } catch (err) {

        console.log("MongoDB connection failed");
    }
}


// CREATE
app.post("/employees", async (req, res) => {

    try {

        const employee = req.body;

        const result = await employeeCollection.insertOne(employee);

        res.status(201).json({
            message: "Employee created",
            employeeId: result.insertedId
        });

    } catch (err) {

        res.status(500).json({
            error: "Unable to add employee"
        });
    }
});


// READ ALL
app.get("/employees", async (req, res) => {

    try {

        const employees = await employeeCollection
            .find({})
            .toArray();

        res.json(employees);

    } catch (err) {

        res.status(500).json({
            error: "Unable to fetch employees"
        });
    }
});


// READ ONE
app.get("/employees/:id", async (req, res) => {

    try {

        const employeeId = new ObjectId(req.params.id);

        const employee = await employeeCollection.findOne({
            _id: employeeId
        });

        if (employee === null) {
            return res.status(404).json({
                message: "Employee does not exist"
            });
        }

        res.json(employee);

    } catch (err) {

        res.status(400).json({
            message: "Invalid employee ID"
        });
    }
});


// UPDATE
app.put("/employees/:id", async (req, res) => {

    try {

        const employeeId = new ObjectId(req.params.id);

        const updatedData = {
            $set: {
                name: req.body.name,
                age: req.body.age,
                salary: req.body.salary
            }
        };

        const result = await employeeCollection.updateOne(
            { _id: employeeId },
            updatedData
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json({
            message: "Employee information updated"
        });

    } catch (err) {

        res.status(400).json({
            message: "Invalid employee ID"
        });
    }
});


// DELETE
app.delete("/employees/:id", async (req, res) => {

    try {

        const employeeId = new ObjectId(req.params.id);

        const result = await employeeCollection.deleteOne({
            _id: employeeId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json({
            message: "Employee removed successfully"
        });

    } catch (err) {

        res.status(400).json({
            message: "Invalid employee ID"
        });
    }
});


startServer();