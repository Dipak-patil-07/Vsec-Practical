const express = require("express");

const app = express();

app.use(express.json());

let employees = [
    { id: 101, name: "Dipak", age: 21, salary: 25000 },
    { id: 102, name: "Rahul", age: 22, salary: 28000 }
];

// Get all employees
app.get("/employees", (req, res) => {
    res.json(employees);
});

// Add employee
app.post("/employees", (req, res) => {

    const newEmployee = req.body;

    employees.push(newEmployee);

    res.json({
        message: "Employee added successfully",
        data: newEmployee
    });
});

// Delete employee
app.delete("/employees/:id", (req, res) => {

    const employeeId = Number(req.params.id);

    const oldLength = employees.length;

    employees = employees.filter(employee => employee.id !== employeeId);

    if (employees.length === oldLength) {
        return res.status(404).send("Employee not found");
    }

    res.send("Employee deleted successfully");
});

// Update employee
app.put("/employees/:id", (req, res) => {

    const employeeId = Number(req.params.id);

    const employee = employees.find(
        item => item.id === employeeId
    );

    if (!employee) {
        return res.status(404).send("Employee not found");
    }

    employee.name = req.body.name;
    employee.age = req.body.age;
    employee.salary = req.body.salary;

    res.send("Employee updated successfully");
});

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});