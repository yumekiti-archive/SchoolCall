import Student from './student';
import Classroom from './classroom';

type CallOrder = {
  id: number;
  seat_number: number;
  status: boolean;
  student: Student;
  class_room: Classroom;
  created_at: string;
  updated_at: string;
  student_id: number;
  classroom_id: number;
};

export default CallOrder;
