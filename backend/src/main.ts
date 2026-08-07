import express from "express";
import cors from "cors";


const app = express();

app.use(cors());

const students = [
    {
        id: 1,
        name: "Bharath",
        age: 25,
    },
    {
        id: 2,
        name: "Rahul",
        age: 22,
    },
    {
        id: 3,
        name: "Alex",
        age: 24,
    },
];

app.get("/students", (req, res) => {

    console.log("➡ GET /students received");

    res.json(students);

});

app.listen(3000, () => {

    console.log("🚀 Backend running on port 3000");

});