import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';
import Alert from '@/components/atoms/Alert';
import UpDownButton from '@/components/organisms/UpDownButton';

import { useReadCallOrder, useReadCallOrderBySeatNumber, useCreateCallOrder } from '@/hooks/useCallOrder';

type Props = {
  socket: any;
};

const StudentRegister: FC<Props> = ({ socket }) => {
  const router = useRouter();
  const { createCallOrder } = useCreateCallOrder();
  const { readCallOrderBySeatNumber } = useReadCallOrderBySeatNumber();
  const { readCallOrder } = useReadCallOrder();
  const [waitingNumber, setWaitingNumber] = useState<number>(0);
  const [alert, setAlert] = useState<any>({ flag: false, message: '', type: '' });

  if (typeof window !== 'undefined') {
    const studentNumber = localStorage.getItem('studentNumber');

    if (!studentNumber) router.push('/student/signin');
  }

  const alertSet = (message: string, type: string = 'error') => {
    setAlert({ flag: true, message: message, type: type });
    setTimeout(() => setAlert({ flag: false }), 3000);
  };

  const fetchData = () => {
    readCallOrder().then((data) => {
      const waitingNumber = data.filter((call_order: any) => call_order.status === false).length;
      setWaitingNumber(waitingNumber);
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('refetch', () => fetchData());

    fetchData();
  }, [socket]);

  const handleColl = () => {
    const seatNumber = localStorage.getItem('seatNumber');
    const classroomId = localStorage.getItem('classroomId');
    const studentId = localStorage.getItem('studentId');

    if (seatNumber && classroomId && studentId) {
      const body = {
        seatNumber: Number(seatNumber),
        classroomId: Number(classroomId),
        studentId: Number(studentId),
      };

      createCallOrder(body).then((res) => {
        if (res.status == 'noStudent') alertSet('座席を登録してください');
        else if (res.status == 'already') alertSet('すでに順番を取得しています');
        else alertSet('順番を取得しました', 'success');
        socket.emit('refetch');
      });
    } else alertSet('座席を登録してください');
  };

  return (
    <Layout title='認証画面へ' href='/student/signin'>
      {alert.flag && <Alert message={alert.message} type={alert.type} />}
      <UpDownButton
        upText='呼び出し'
        downText='座席登録'
        downHref={'/student/seat'}
        handleClick={handleColl}
        waitingDisplay={true}
        waitingNumber={waitingNumber}
      />
    </Layout>
  );
};

export default StudentRegister;
