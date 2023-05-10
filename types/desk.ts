import Student from './student';

type Desk = {
  id: number;
  seatNumber: number;
  classroomId: number;
  studentId: number;
  classId: number;
  createdAt: string;
  updatedAt: string;
  student: Student;
};

export default Desk;
