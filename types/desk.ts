import Student from './student';
import ClassRoom from './classroom';

type Desk = {
  id: number;
  name: string;
  seat_number: number;
  class_room: ClassRoom;
  student: Student | null;
  created_at: string;
  updated_at: string;
  class_room_id: number;
  student_id: number | null;
};

export default Desk;
