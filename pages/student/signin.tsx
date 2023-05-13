import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';
import Alert from '@/components/atoms/Alert';
import SigninForm from '@/components/organisms/SigninForm';

import { useReadStudentByStudentNumber } from '@/hooks/useStudent';

const StudentRegister = () => {
  const router = useRouter();
  const { readStudentByStudentNumber } = useReadStudentByStudentNumber();

  const [alertFlag, setAlertFlag] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [studentNumber, setStudentNumber] = useState<number>(2200000);

  const alertSet = (message: string) => {
    setAlertFlag(true);
    setAlertMessage(message);

    setTimeout(() => {
      setAlertFlag(false);
    }, 3000);
  };

  const handleClick = () => {
    localStorage.removeItem('studentNumber');
    localStorage.removeItem('seatNumber');
    localStorage.removeItem('classroomId');
    localStorage.removeItem('studentId');

    readStudentByStudentNumber(studentNumber).then((data) => {
      if (data == null) alertSet('学籍番号が存在しません');
      else {
        localStorage.setItem('studentNumber', data.studentNumber);
        router.push('/student');
      }
    });
  };

  return (
    <Layout title='順番管理' href='/student'>
      {alertFlag && <Alert message={alertMessage} />}
      <SigninForm studentNumber={studentNumber} setStudentNumber={setStudentNumber} handleClick={handleClick} />
    </Layout>
  );
};

export default StudentRegister;
