import Student from './student';

type Desk = {
  id: number;
  seatNumber: number;
  studentId: number;
  classroomId: number;
  classId: number;
  createdAt: string;
  updatedAt: string;
  student: Student;
};

export default Desk;
