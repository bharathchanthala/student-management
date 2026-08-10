import express from "express";
import cors from "cors";
import { pool } from "./db.js";


const app = express();
app.use(express.json());

app.use(cors());


app.get("/students", async (req, res) => {

    const result = await pool.query("SELECT * FROM students");

    res.json(result.rows);

});
app.post("/students", async (req, res) => {
    const { name, age } = req.body;
    if (typeof name !== "string" || name.trim() === ""){
        return res.status(400).json({

            message : "name must be non-empty string"
        });
    }
    if ( typeof age !== "number" || age <=0 ){
        return res.status(400).json({
            message :"Age must be a positive number"
        
        });
    }
    // if (!name || !age){
    //     return res.status(400).json({
    //         message :"Name and Age are required"
    //     });
    // }
    try{
        
        const result = await pool.query(
            "INSERT INTO students (name, age) VALUES ($1, $2) RETURNING *",
            [name, age]
        );
        
        res.status(201).json(result.rows[0]);
    }catch (error){
        console.error(error);
        res.status(500).json({
            message :"something went wrong"
        });

    }
});
app.put("/students/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, age } = req.body;

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    // Validate name
    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            message: "Name must be a non-empty string"
        });
    }

    // Validate age
    if (typeof age !== "number" || age <= 0) {
        return res.status(400).json({
            message: "Age must be a positive number"
        });
    }

    try {
        const result = await pool.query(
            "UPDATE students SET name = $1, age = $2 WHERE id = $3 RETURNING *",
            [name, age, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});
app.delete("/students/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    try {
        const result = await pool.query(
            "DELETE FROM students WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
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