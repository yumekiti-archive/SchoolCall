import Layout from '@/components/template/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Desk from '@/types/desk';
import CallOrder from '@/types/callOrder';
import Classroom from '@/types/classroom';
import Placement from '@/types/placement';

import ClassroomTable from '@/components/organisms/ClassroomTable';

import { useReadClassroomById } from '@/hooks/useClassroom';

import { useReadDeskByClassroomIdandClassId } from '@/hooks/useDesk';

import {
  useReadCallorderByClassroomId,
  useUpdateCallOrder,
} from '@/hooks/useCallOrder';

const ClassroomRegister = () => {
  const router = useRouter();
  const { classroom_id, class_id } = router.query;
  const [classroom, setClassroom] = useState<Classroom>();
  const [desks, setDesks] = useState<Desk[]>();
  const [call_orders, setCallOrders] = useState<CallOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { readDeskByClassroomIdandClassId } =
    useReadDeskByClassroomIdandClassId();
  const { readCallorderByClassroomId } = useReadCallorderByClassroomId();
  const { updateCallOrder } = useUpdateCallOrder();

  const { readClassroomById } = useReadClassroomById();

  // 一定時間ごとに更新
  useEffect(() => {
    const interval = setInterval(() => {
      readCallorderByClassroomId(classroom_id).then((res) => {
        setCallOrders(res);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [classroom_id]);

  if (classroom_id && loading) {
    readCallorderByClassroomId(classroom_id).then((res) => {
      setCallOrders(res);
    });
    setLoading(false);
  }

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
  };

  const filterCallOrders = call_orders.filter(
    (call_order) => !call_order.status,
  );

  return (
    <Layout title='座席表'>
      {filterCallOrders.length !== 0 ? (
        filterCallOrders.map((call_order) => (
          <div
            key={call_order.id}
            className='bg-white shadow-md rounded-md p-4 m-4'
          >
            <div className='flex justify-between items-center'>
              <div className='text-lg font-bold'>
                <span>{call_order.student.attendanceNumber}</span>
                <span className='ml-4 border-l-2 pl-4'>
                  {call_order.student.name} さん
                </span>
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
