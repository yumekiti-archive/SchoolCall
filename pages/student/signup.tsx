import { useState } from 'react';
import { useRouter } from 'next/router';

import { useCreateStudent } from '@/hooks/useStudent';

import Layout from '@/components/templates/Layout';
import SignupForm from '@/components/organisms/SignupForm';

const StudentRegister = () => {
  const router = useRouter();
  const { createStudent } = useCreateStudent();

  const [name, setName] = useState<string>('山田 太郎');
  const [studentNumber, setStudentNumber] = useState<number>(2200000);
  const [attendanceNumber, setAttendanceNumber] = useState<number>(1);
  const [className, setClassName] = useState<string>('IE3A');

  const handleClick = () => {
    const body = {
      name,
      studentNumber,
      attendanceNumber,
      className,
    };

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
