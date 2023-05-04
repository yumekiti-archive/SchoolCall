import Student from './student';

type CallOrder = {
  id: number;
  classroomId: number;
  studentId: number;
  seatNumber: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  student: Student;
};

export default CallOrder;