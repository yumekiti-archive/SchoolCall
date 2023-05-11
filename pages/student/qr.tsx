import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';
import Alert from '@/components/atoms/Alert';

import { useReadStudentByStudentNumber } from '@/hooks/useStudent';
import { useReadClassroomByName } from '@/hooks/useClassroom';
import { useCreateDesk } from '@/hooks/useDesk';

type Props = {
  socket: any;
};

// http://localhost/student/qr?classroomName=3601&seatNumber=6
const StudentRegister: FC<Props> = ({ socket }) => {
  const router = useRouter();
  const { seatNumber, classroomName } = router.query;
  const { readStudentByStudentNumber } = useReadStudentByStudentNumber();
  const { readClassroomByName } = useReadClassroomByName();
  const { createDesk } = useCreateDesk();

  if (!seatNumber && !classroomName) return <></>;

  const studentNumber = localStorage.getItem('studentNumber');
  if (!studentNumber) router.push('/student');

  readClassroomByName(classroomName).then((classroom) => {
    if (!classroom) router.push('/student');
    readStudentByStudentNumber(studentNumber).then((student) => {
      if (!student) router.push('/student');
      const castedSeatNumber = Number(seatNumber);
      const body = {
        seatNumber: castedSeatNumber,
        classroomId: classroom.id,
        studentId: student.id,
      };

      createDesk(body).then((data) => {
        if (!data) return;
        localStorage.setItem('seatNumber', data.seatNumber);
        localStorage.setItem('classroomId', data.classroomId);
        localStorage.setItem('studentId', data.studentId);

        socket.emit('refetch');

        router.push('/student');
      });
    });
  });

  return <></>;
};

export default StudentRegister;
