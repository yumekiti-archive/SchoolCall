import Student from './student';
import ClassRoom from './classroom';

type CallOrder = {
  id: number;
  seat_number: number;
  status: boolean;
  student: Student;
  class_room: ClassRoom;
  created_at: string;
  updated_at: string;
  student_id: number;
  classroom_id: number;
};

export default CallOrder;
