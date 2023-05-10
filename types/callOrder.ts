import Student from './student';
import Classroom from './classroom';

type CallOrder = {
  id: number;
  seatNumber: number;
  status: boolean;
  check: boolean;
  classroomId: number;
  studentId: number;
  createdAt: string;
  updatedAt: string;
  Classroom: Classroom;
  student: Student;
};

export default CallOrder;
