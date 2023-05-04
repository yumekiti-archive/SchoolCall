import Placement from "./placement";
import Class from "./class";

type Classroom = {
  id: number;
  name: string;
  breadth: number;
  gaps: number[];
  created_at: string;
  updated_at: string;
  placement: Placement[];
  class: Class[];
};

export default Classroom;
