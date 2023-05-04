import Placement from "./placement";

type Classroom = {
  id: number;
  name: string;
  breadth: number;
  gaps: number[];
  created_at: string;
  updated_at: string;
  placement: Placement[];
};

export default Classroom;
