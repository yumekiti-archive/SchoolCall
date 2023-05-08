import Layout from '@/components/templates/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { FC, useState } from 'react';

import { useCreateCallOrder } from '@/hooks/useCallOrder';

import Alert from '@/components/atoms/Alert';

type Props = {
  socket: any;
};

const StudentRegister: FC<Props> = ({ socket }) => {
  const router = useRouter();
  const { createCallOrder } = useCreateCallOrder();
  const [alertFlag, setAlertFlag] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('error');

  if (typeof window !== 'undefined') {
    const studentNumber = localStorage.getItem('studentNumber');

    if (!studentNumber) {
      router.push('/student/signin');
    }
  }

  const alertSet = (message: string, type: string = 'error') => {
    setAlertFlag(true);
    setAlertMessage(message);
    setAlertType(type);

    socket.emit('reload');

    setTimeout(() => {
      setAlertFlag(false);
    }, 3000);
  };

  const handleColl = () => {
    const seatNumber = localStorage.getItem('seatNumber');
    const classroomId = localStorage.getItem('classroomId');
    const studentId = localStorage.getItem('studentId');

    if (seatNumber && classroomId && studentId) {
      const body = {
        seatNumber: Number(seatNumber),
        status: false,
        classroomId: Number(classroomId),
        studentId: Number(studentId),
      };

      createCallOrder(body).then((data) => {
        alertSet('順番を取得しました', 'success');
      });
    } else {
      alertSet('座席番号が取得できませんでした');
    }
  };

  return (
    <Layout title='順番管理' href='/student/signin'>
      {alertFlag && <Alert message={alertMessage} type={alertType} />}
      <div className='flex justify-center items-center grid grid-row-2 grid-cols-1 gap-4 h-full'>
        <div className='row-span-1 col-span-1 h-full p-4 m-4'>
          <button
            className='bg-white shadow-md rounded-md w-full h-full flex justify-center items-center hover:bg-gray-200'
            onClick={handleColl}
          >
            <div className='flex flex-wrap justify-center items-center'>
              <div className='w-6/12 mb-4'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                  <path d='M439.39 362.29c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71zM67.53 368c21.22-27.97 44.42-74.33 44.53-159.42 0-.2-.06-.38-.06-.58 0-61.86 50.14-112 112-112s112 50.14 112 112c0 .2-.06.38-.06.58.11 85.1 23.31 131.46 44.53 159.42H67.53zM224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64z' />
                </svg>
              </div>
              <span className='text-4xl font-bold'>呼び出し</span>
            </div>
          </button>
        </div>
        <div className='row-span-1 col-span-1 h-full p-4 m-4'>
          <Link
            href='/student/seat'
            className='bg-white shadow-md rounded-md w-full h-full flex justify-center items-center hover:bg-gray-200'
          >
            <div className='flex flex-wrap justify-center items-center'>
              <div className='w-6/12 mb-4'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                  <path d='M112 128c0-29.5 16.2-55 40-68.9V256h48V48h48v208h48V59.1c23.8 13.9 40 39.4 40 68.9v128h48V128C384 57.3 326.7 0 256 0h-64C121.3 0 64 57.3 64 128v128h48zm334.3 213.9l-10.7-32c-4.4-13.1-16.6-21.9-30.4-21.9H42.7c-13.8 0-26 8.8-30.4 21.9l-10.7 32C-5.2 362.6 10.2 384 32 384v112c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V384h256v112c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V384c21.8 0 37.2-21.4 30.3-42.1z' />
                </svg>
              </div>
              <div className='text-4xl font-bold'>座席登録</div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default StudentRegister;
