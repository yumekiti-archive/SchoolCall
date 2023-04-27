import ClassRoom from "@/types/classroom"
import Desk from "@/types/desk"
import Student from "@/types/student"
import Call from "@/types/call"

let class_rooms: ClassRoom[] = [
  {
    id: 1,
    name: "3601",
    capacity: 48,
    gap: [0, 7, 8, 15, 16, 23, 24, 31, 32, 39, 47],
    placement: [
      { gap: 15, name: '教卓' },
      { gap: 39, name: '柱' },
      { gap: 47, name: '3Dプリンター' },
    ],
    created_at: "2021-10-14T20:36:05.821Z",
    updated_at: "2021-10-14T20:36:05.821Z"
  }
]

let students: Student[] = []
for (let i = 0; i < 36; i++) {
  students.push({
    id: i + 1,
    name: String(i + 1),
    created_at: "2021-10-14T20:36:05.821Z",
    updated_at: "2021-10-14T20:36:05.821Z"
  })
}

let desks: Desk[] = []
let seat_number = 1
for (let i = 0; i < class_rooms[0].capacity; i++) {
  if (class_rooms[0].gap.includes(i)) {
    // オブジェクトがある場合はここで処理
    const obj = class_rooms[0].placement.find((obj) => obj.gap === i)
    desks.push({
      id: i + 1,
      name: obj ? obj.name : '',
      seat_number: 0,
      class_room: class_rooms[0],
      student: null,
      created_at: "2021-10-14T20:36:05.821Z",
      updated_at: "2021-10-14T20:36:05.821Z",
      class_room_id: 1,
      student_id: null
    })
  } else {
    desks.push({
      id: i + 1,
      name: '',
      seat_number: seat_number++,
      class_room: class_rooms[0],
      student: students[i],
      created_at: "2021-10-14T20:36:05.821Z",
      updated_at: "2021-10-14T20:36:05.821Z",
      class_room_id: 1,
      student_id: i + 1
    })
  }
}

let calls: Call[] = []
calls.push({
  id: 1,
  status: false,
  student: students[0],
  class_room: class_rooms[0],
  seat_number: 1,
  created_at: "2021-10-14T20:36:05.821Z",
  updated_at: "2021-10-14T20:36:05.821Z",
  student_id: 1,
  classroom_id: 1
})

export { class_rooms, students, desks, calls }
