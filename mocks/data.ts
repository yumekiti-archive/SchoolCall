import Classroom from '@/types/classroom';
import Desk from '@/types/desk';
import Student from '@/types/student';
import CallOrder from '@/types/callorder';
import Placement from '@/types/placement';

let classrooms: Classroom[] = [
  {
    id: 1,
    name: '3601',
    breadth: 48,
    gaps: [1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 48],
    created_at: '2021-10-14T20:36:05.821Z',
    updated_at: '2021-10-14T20:36:05.821Z',
  },
];

let placements: Placement[] = [
  { id: 1, seat_number: 16, name: '教卓', createdAt: '2021-10-14T20:36:05.821Z', updatedAt: '2021-10-14T20:36:05.821Z' },
  { id: 2, seat_number: 40, name: '柱', createdAt: '2021-10-14T20:36:05.821Z', updatedAt: '2021-10-14T20:36:05.821Z' },
  { id: 3, seat_number: 48, name: '3Dプリンター', createdAt: '2021-10-14T20:36:05.821Z', updatedAt: '2021-10-14T20:36:05.821Z' },
];

let students: Student[] = [];
for (let i = 0; i < 36; i++) {
  students.push({
    id: i + 1,
    name: String(i + 1),
    created_at: '2021-10-14T20:36:05.821Z',
    updated_at: '2021-10-14T20:36:05.821Z',
  });
}

let desks: Desk[] = [];
let seat_number = 1;
let student_number = 0;
for (let i = 0; i < classrooms[0].breadth; i++) {
  if (classrooms[0].gaps.includes(i)) {
    desks.push({
      id: i + 1,
      seat_number: 0,
      student: null,
      created_at: '2021-10-14T20:36:05.821Z',
      updated_at: '2021-10-14T20:36:05.821Z',
      class_room_id: 1,
      student_id: null,
    });
  } else {
    desks.push({
      id: i + 1,
      seat_number: seat_number++,
      student: students[student_number++],
      created_at: '2021-10-14T20:36:05.821Z',
      updated_at: '2021-10-14T20:36:05.821Z',
      class_room_id: 1,
      student_id: student_number + 1,
    });
  }
}

let call_orders: CallOrder[] = [];
call_orders.push({
  id: 1,
  status: false,
  student: students[0],
  seat_number: 1,
  created_at: '2021-10-14T20:36:05.821Z',
  updated_at: '2021-10-14T20:36:05.821Z',
  student_id: 1,
  classroom_id: 1,
});

call_orders.push({
  id: 2,
  status: true,
  student: students[0],
  seat_number: 9,
  created_at: '2021-10-14T20:40:05.821Z',
  updated_at: '2021-10-14T20:36:05.821Z',
  student_id: 1,
  classroom_id: 1,
});

call_orders.push({
  id: 3,
  status: false,
  student: students[0],
  seat_number: 9,
  created_at: '2021-10-14T20:40:05.821Z',
  updated_at: '2021-10-14T20:36:05.821Z',
  student_id: 1,
  classroom_id: 1,
});

export { classrooms, placements, students, desks, call_orders };
