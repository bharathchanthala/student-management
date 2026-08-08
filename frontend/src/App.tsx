import { useState } from "react";

type Student = {
  id: number;
  name: string;
  age: number;
};

function App() {

  
const [name , setName] = useState("");
const [age , setAge] = useState("");
const [editId, setEditId] = useState<number | null>(null);
const [editName, setEditName] = useState("");
const [editAge, setEditAge] = useState("");


  const [students, setStudents] = useState<Student[]>([]);


  async function loadStudents() {

    const response = await fetch("http://localhost:3000/students");

    const data = await response.json();

    setStudents(data);

}
async function addStudent(){
   const response = await fetch ("http://localhost:3000/students",{
    method:"POST",
    headers:{
      "content-type" :"application/json"
    },
    body:JSON.stringify({
      name,
      age:Number(age)
    })
   });
  console.log(response.status);

console.log(response.ok);

console.log(response.headers);
const message = await response.text();

console.log(message);
  console.log(name);
  console.log(age);
  await loadStudents();
  setName("");
  setAge("");

}
async function updateStudent() {
    if (editId === null) return;

    await fetch(`http://localhost:3000/students/${editId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: editName,
            age: Number(editAge)
        })
    });

    await loadStudents();

    setEditId(null);
}
async function deleteStudent(id: number) {
    await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE"
    });

    await loadStudents();
}

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Management App</h1>

      <button onClick={loadStudents}>
        Load Students
      </button>
      <br/>
      <br/>
      <br/><br/>  
      

      <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} /><br/>
      <input type="number" placeholder="age" value={age} onChange={(e)=> setAge(e.target.value)} /><br/><br/>
      <button onClick={addStudent}>Add Student</button>

      <hr />

      {students.map((student) => (
        <div key={student.id}>
          {student.id}. {student.name} ({student.age})
          <button
            onClick={() => {
                setEditId(student.id);
                setEditName(student.name);
                setEditAge(String(student.age));
            }}
        >
            Edit
        </button>
        <button onClick={() => deleteStudent(student.id)}>
    Delete
</button>
        </div>
      ))}
      {editId !== null && (
    <div>
        <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
        />

        <input
            type="number"
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
        />

        <button onClick={updateStudent}>
            Update
        </button>
    </div>
)}
    </div>
  );
}

export default App;