import express from "express";
import cors from "cors";
import { pool } from "./db.js";


const app = express();
app.use(express.json());

app.use(cors());

// const students = [
   
// ];

app.get("/students", async (req, res) => {

    const result = await pool.query("SELECT * FROM students");

    res.json(result.rows);

});
app.post("/students", async (req, res) => {
    const { name, age } = req.body;

    const result = await pool.query(
        "INSERT INTO students (name, age) VALUES ($1, $2) RETURNING *",
        [name, age]
    );

    res.json(result.rows[0]);
});
app.put("/students/:id",async(req,res)=>{
    const id = Number(req.params.id);
    const {name,age }= req.body;

     const result = await pool.query(
        "UPDATE students SET name = $1, age = $2 WHERE id = $3 RETURNING *",
        [name, age, id]
    );

    
    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(result.rows[0]);
});
app.delete("/students/:id", async (req, res) => {
    const id = Number(req.params.id);

    const result = await pool.query(
        "DELETE FROM students WHERE id = $1 RETURNING *",
        [id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(result.rows[0]);
});

pool.query("SELECT NOW()")
    .then((result) => {
        console.log("✅ PostgreSQL connected:", result.rows[0]);
    })
    .catch((error) => {
        console.error("❌ PostgreSQL connection failed:", error);
    });

app.listen(3000, () => {

    console.log("🚀 Backend running on port 3000");

});