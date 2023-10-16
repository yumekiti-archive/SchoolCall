import { useState } from 'react';
import { useRouter } from 'next/router';

import { useCreateStudent } from '@/hooks/useStudent';

import Layout from '@/components/templates/Layout';
import SignupForm from '@/components/organisms/SignupForm';

const StudentRegister = () => {
  const router = useRouter();
  const { createStudent } = useCreateStudent();

  const [name, setName] = useState<string>('');
  const [studentNumber, setStudentNumber] = useState<number>(0);
  const [attendanceNumber, setAttendanceNumber] = useState<number>(0);
  const [className, setClassName] = useState<string>('IE3A');

  const handleClick = () => {
    const body = {
      name,
      studentNumber,
      attendanceNumber,
      className,
    };

    if (name === '') {
      alert('名前を入力してください');
      return;
    }

    if (className === '') {
      alert('クラス名を入力してください');
      return;
    }

    if (studentNumber === 0) {
      alert('学籍番号を入力してください');
      return;
    }

    if (attendanceNumber === 0) {
      alert('出席番号を入力してください');
      return;
    }

    if (!studentNumber.toString().match(/^[0-9]{7}$/)) {
      alert('学籍番号は7桁の数字で入力してください');
      return;
    }

    createStudent(body).then((data) => {
      localStorage.setItem('studentNumber', data.studentNumber);
      router.push('/student');
    });
  };

  return (
    <Layout title='順番管理' href='/student'>
      <SignupForm
        name={name}
        setName={setName}
        className={className}
        setClassName={setClassName}
        studentNumber={studentNumber}
        setStudentNumber={setStudentNumber}
        attendanceNumber={attendanceNumber}
        setAttendanceNumber={setAttendanceNumber}
        handleClick={handleClick}
      />
    </Layout>
  );
};

export default StudentRegister;
