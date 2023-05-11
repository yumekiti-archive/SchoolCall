import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Loading from '@/components/atoms/Loading';
import Layout from '@/components/templates/Layout';

import CallOrder from '@/types/callOrder';

import { useReadCallorderByClassroomId, useUpdateCallOrder } from '@/hooks/useCallOrder';

type Props = {
  socket: any;
};

const ClassroomRegister: FC<Props> = ({ socket }) => {
  const { readCallorderByClassroomId } = useReadCallorderByClassroomId();
  const { updateCallOrder } = useUpdateCallOrder();
  const router = useRouter();

  const { classroom_id } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [call_orders, setCallOrders] = useState<CallOrder[]>([]);

  const fetchData = () => {
    if (!classroom_id) return;
    setLoading(true);
    readCallorderByClassroomId(classroom_id).then((res) => {
      setCallOrders(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('refetch', () => fetchData());

    fetchData();
  }, [socket, classroom_id]);

  const handleCheck = (call_order_id: number, check: boolean) => {
    const body = {
      id: call_order_id,
      check: !check,
    };

    updateCallOrder(body).then((res) => {
      readCallorderByClassroomId(classroom_id).then((res) => {
        setCallOrders(res);
      });
    });
  };

  const handleComplete = (call_order_id: number) => {
    const body = {
      id: call_order_id,
      status: true,
    };

    updateCallOrder(body).then((res) => {
      readCallorderByClassroomId(classroom_id).then((res) => {
        setCallOrders(res);
      });
    });

    socket.emit('refetch');
  };

  const handleToday = (call_order_id: number, today: boolean) => {
    const body = {
      id: call_order_id,
      today: !today,
    };

    updateCallOrder(body).then((res) => {
      readCallorderByClassroomId(classroom_id).then((res) => {
        setCallOrders(res);
      });
    });
  }

  if (loading) return <Loading />;

  return (
    <Layout title='座席表'>
      {call_orders && call_orders.length !== 0 ? (
        call_orders.map((call_order) => (
          <div
            key={call_order.id}
            className={`bg-white shadow-md rounded-md p-4 m-4
            ${call_order.check ? 'bg-yellow-100' : ''}
            ${call_order.today ? 'bg-gray-500' : ''}
            `}
          >
            <div className='flex justify-between items-center grid grid-row-2 grid-cols-1 sm:flex'>
              <div className='text-lg font-bold row-span-1 flex items-center justify-center mb-2 sm:mb-0'>
                <span>{call_order.student?.className}</span>
                <span className='ml-2 border-l-2 pl-2'>{call_order.student?.name} さん</span>
                <span className='ml-2 border-l-2 pl-2'>出席番号 {call_order.student?.attendanceNumber}</span>
              </div>
              <div className='flex justify-end items-center row-span-1'>
                <button
                  className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-4'
                  onClick={() => handleCheck(call_order.id, call_order.check)}
                >
                  確認中
                </button>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'
                  onClick={() => handleComplete(call_order.id)}
                >
                  確認完了
                </button>
                <button
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => handleToday(call_order.id, call_order.today)}
                >
                  課題完了
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>現在呼び出し中の生徒はいません</div>
      )}
    </Layout>
  );
};

export default ClassroomRegister;
