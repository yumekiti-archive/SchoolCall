type Classroom = {
  id: number;
  name: string;
  breadth: number;
  gap: number[];
  placement: { gap: number; name: string }[];
  created_at: string;
  updated_at: string;
};

export default Classroom;
