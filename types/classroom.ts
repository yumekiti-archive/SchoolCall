type ClassRoom = {
  id: number;
  name: string;
  capacity: number;
  gap: number[];
  placement: { gap: number; name: string }[];
  created_at: string;
  updated_at: string;
};

export default ClassRoom;
