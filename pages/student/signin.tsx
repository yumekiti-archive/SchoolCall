import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';
import Alert from '@/components/atoms/Alert';

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
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-11/12 h-3/6 md:w-1/2 md:h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-2/6 rounded-lg'>
            <span>学籍番号</span>
            <input
              type='number'
              className='w-1/2 rounded-lg p-1'
              min='1'
              max='100'
              defaultValue={studentNumber}
              onChange={(e) => setStudentNumber(Number(e.target.value))}
            />
          </div>
          <div className='flex justify-end items-center w-8/12 rounded-lg'>
            <Link href={'/student/signup'} className='w-1/4 rounded-lg p-2 bg-green-400 text-white text-center'>
              作成
            </Link>
            <button className='w-1/4 rounded-lg p-2 bg-blue-400 text-white ml-2' onClick={handleClick}>
              認証
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentRegister;
