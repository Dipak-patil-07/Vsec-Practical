const express = require("express");
const app = express();
app.use(express.json());


let students = [
    { id: 1, name: "Mayur", marks: 94 },
    { id: 2, name: "Shree", marks: 88 },
    { id: 3, name: "Anju", marks: 96 },
    { id: 4, name : "Dipak", marks: 97}
];

// Insert new
app.post("/students", (req, res) => {
    let student = {
        id: students.length + 1,
        name: req.body.name,
        marks: req.body.marks
    };
    students.push(student);
    res.send(student);
});

// Get all students

app.get("/students", (req, res) => {
    res.json(students);
});

// Find one student using id
app.get("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            res.json(students[i]);
            found = true;
        }
    }
    if (found == false) {
        res.send("Student not found");
    } else {
        console.log("Student found");
    }
});

// update user using id 

app.put("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            students[i].name = req.body.name;
            students[i].marks = req.body.marks;
            found = true;
        }
    }
    if (found == true) {
        res.send("Student updated successfully");
    } else {
        res.send("Student not found");
    }
});

// Delete the student from array
app.delete("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            students.splice(i, 1);
            found = true;
        }
    }
    if (found == true) {
        res.send("Student deleted successfully");
    } else {
        res.send("Student not found");
    }
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});