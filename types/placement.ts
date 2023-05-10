import Classroom from './classroom';

type Placement = {
  id: number;
  name: string;
  positionNumber: number;
  classroomId: number;
  createdAt: string;
  updatedAt: string;
  Classroom: Classroom;
};

export default Placement;
