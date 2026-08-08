import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());

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
app.post("/students",(req,res) =>{

    const {name,age}=req.body;
    const newStudent = {
        id: students.length +1,
        name,
        age 
    }
    students.push(newStudent);
    res.json(newStudent);
});

app.put("/students/:id",(req,res)=>{
    const id = Number(req.params.id);
    const {name,age }= req.body;
    const student = students.find( (student)=>student.id ===id);
    if (!student){
        return res.status(404).json({
            message :"stundent not found"
        });

    }
    student.name = name;
    student.age =age;
    console.log(student);

    res.json(student);

});
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json(deletedStudent[0]);
});

app.listen(3000, () => {

    console.log("🚀 Backend running on port 3000");

});