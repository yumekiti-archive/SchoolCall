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
    readCallorderByClassroomId(classroom_id).then((res) => {
      setCallOrders(res.filter((call_order: any) => call_order.status === false));
      setLoading(false);
    });
  };

  useEffect(() => {
    socket.on('refetch', () => fetchData());

    fetchData();
  }, [classroom_id]);

  const handleComplete = (call_order_id: number) => {
    const body = {
      id: call_order_id,
      status: true,
    };

    updateCallOrder(body).then((res) => {
      readCallorderByClassroomId(classroom_id).then((res) => {
        setCallOrders(res.filter((call_order: any) => call_order.status === false));
      });
    });

    socket.emit('refetch');
  };

  if (loading) return <Loading />;

  return (
    <Layout title='座席表'>
      {call_orders && call_orders.length !== 0 ? (
        call_orders.map((call_order) => (
          <div key={call_order.id} className='bg-white shadow-md rounded-md p-4 m-4'>
            <div className='flex justify-between items-center'>
              <div className='text-lg font-bold'>
                <span>{call_order.student?.attendanceNumber}</span>
                <span className='ml-4 border-l-2 pl-4'>{call_order.student?.name} さん</span>
              </div>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => handleComplete(call_order.id)}
              >
                完了
              </button>
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
