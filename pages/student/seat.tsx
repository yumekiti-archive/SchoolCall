import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';
import Alert from '@/components/atoms/Alert';
import DeskForm from '@/components/organisms/DeskForm';

import { useReadStudentByStudentNumber } from '@/hooks/useStudent';
import { useReadClassroomByName } from '@/hooks/useClassroom';
import { useCreateDesk } from '@/hooks/useDesk';

type Props = {
  socket: any;
};

const StudentRegister: FC<Props> = ({ socket }) => {
  const router = useRouter();
  const { readStudentByStudentNumber } = useReadStudentByStudentNumber();
  const { readClassroomByName } = useReadClassroomByName();
  const { createDesk } = useCreateDesk();

  const [alertFlag, setAlertFlag] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [seatNumber, setSeatNumber] = useState<number>(1);
  const [classroomName, setClassroomName] = useState<string>('3601');

  const alertSet = (message: string) => {
    setAlertFlag(true);
    setAlertMessage(message);

    setTimeout(() => {
      setAlertFlag(false);
    }, 3000);
  };

  const handleClick = () => {
    const studentNumber = localStorage.getItem('studentNumber');

    if (!studentNumber) router.push('/student');
    else {
      readClassroomByName(classroomName).then((classroom) => {
        if (!classroom) alertSet('教室名が間違っています');
        else {
          readStudentByStudentNumber(studentNumber).then((student) => {
            if (student) {
              const body = {
                seatNumber,
                classroomId: classroom.id,
                studentId: student.id,
              };

              createDesk(body).then((data) => {
                if (data) {
                  localStorage.setItem('seatNumber', data.seatNumber);
                  localStorage.setItem('classroomId', data.classroomId);
                  localStorage.setItem('studentId', data.studentId);

                  socket.emit('refetch');

                  router.push('/student');
                } else {
                  alertSet('登録に失敗しました');
                }
              });
            }
          });
        }
      });
    }
  };

  return (
    <Layout title='順番管理' href='/student'>
      {alertFlag && <Alert message={alertMessage} />}
      <DeskForm
        classroomName={classroomName}
        setClassroomName={setClassroomName}
        seatNumber={seatNumber}
        setSeatNumber={setSeatNumber}
        handleClick={handleClick}
      />
    </Layout>
  );
};

export default StudentRegister;
