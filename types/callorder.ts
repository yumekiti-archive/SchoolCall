import Student from './student';

type CallOrder = {
  id: number;
  seat_number: number;
  status: boolean;
  student: Student;
  created_at: string;
  updated_at: string;
  student_id: number;
  classroom_id: number;
};

export default CallOrder;
