import Desk from './desk';
import CallOrder from './callOrder';

type Student = {
  id: number;
  name: string;
  studentNumber: number;
  attendanceNumber: number;
  className: string;
  createdAt: Date;
  updatedAt: Date;
  Desk: Desk[];
  CallOrder: CallOrder[];
};

export default Student;

// curl -X POST -H "Content-Type: application/json" -d '{"name":"John"}' http://localhost:3000/api/student
