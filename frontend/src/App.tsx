import { useState } from "react";

type Student = {
  id: number;
  name: string;
  age: number;
};

function App() {
  const [students, setStudents] = useState<Student[]>([]);


  async function loadStudents() {

    const response = await fetch("http://localhost:3000/students");

    const data = await response.json();

    setStudents(data);

}

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Management App</h1>

      <button onClick={loadStudents}>
        Load Students
      </button>

      <hr />

      {students.map((student) => (
        <div key={student.id}>
          {student.id}. {student.name} ({student.age})
        </div>
      ))}
    </div>
  );
}

export default App;