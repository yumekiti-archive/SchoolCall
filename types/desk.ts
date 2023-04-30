import Student from './student';

type Desk = {
  id: number;
  seat_number: number;
  student: Student | null;
  created_at: string;
  updated_at: string;
  class_room_id: number;
  student_id: number | null;
};

export default Desk;
