type Student = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export default Student;

// curl -X POST -H "Content-Type: application/json" -d '{"name":"John"}' http://localhost:3000/api/student