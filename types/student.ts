import Desk from './desk';
import CallOrder from './callOrder';
import Class from './class';

type Student = {
  id: number;
  name: string;
  studentNumber: number;
  attendanceNumber: number;
  classId: number;
  createdAt: Date;
  updatedAt: Date;
  Desk: Desk[];
  CallOrder: CallOrder[];
  Class: Class;
};

export default Student;

// curl -X POST -H "Content-Type: application/json" -d '{"name":"John"}' http://localhost:3000/api/student
