const express = require("express");

const app = express();

let numbers = [10, 20, 30, 40, 50];


app.get("/array", (req, res) => {
    res.json(numbers);
});


app.get("/array/map", (req, res) => {
    let result = numbers.map(num => num * 2);

    res.json(result);
});


app.get("/array/filter", (req, res) => {
    let result = numbers.filter(num => num > 25);

    res.json(result);
});

// 4. reduce() - find sum
app.get("/array/reduce", (req, res) => {
    let sum = numbers.reduce((total, num) => total + num, 0);

    res.json({ sum: sum });
});


app.get("/array/find", (req, res) => {
    let result = numbers.find(num => num > 25);

    res.json({ result: result });
});


app.get("/array/findIndex", (req, res) => {
    let index = numbers.findIndex(num => num === 30);

    res.json({ index: index });
});

app.get("/array/some", (req, res) => {
    let result = numbers.some(num => num > 40);

    res.json({ result: result });
});


app.get("/array/every", (req, res) => {
    let result = numbers.every(num => num > 0);

    res.json({ result: result });
});

app.get("/array/sort", (req, res) => {
    let result = [...numbers].sort((a, b) => a - b);

    res.json(result);
});

app.get("/array/reverse", (req, res) => {
    let result = [...numbers].reverse();

    res.json(result);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});