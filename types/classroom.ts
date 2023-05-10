import Placement from './placement';
import Desk from './desk';
import CallOrder from './callOrder';

type Classroom = {
  id: number;
  name: string;
  breadth: number;
  gaps: number[];
  split: number;
  createdAt: string;
  updatedAt: string;
  placement: Placement[];
  Desk: Desk[];
  CallOrder: CallOrder[];
};

export default Classroom;
