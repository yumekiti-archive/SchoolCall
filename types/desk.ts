import Student from './student';
import Classroom from './classroom';

type Desk = {
  id: number;
  name: string;
  seat_number: number;
  class_room: Classroom;
  student: Student | null;
  created_at: string;
  updated_at: string;
  class_room_id: number;
  student_id: number | null;
};

export default Desk;
