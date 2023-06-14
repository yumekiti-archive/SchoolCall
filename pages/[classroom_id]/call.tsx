import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Loading from '@/components/atoms/Loading';
import Layout from '@/components/templates/Layout';
import CallOrderList from '@/components/organisms/CallOrderList';

import CallOrder from '@/types/callOrder';

import { useReadCallorderByClassroomId, useUpdateCallOrder } from '@/hooks/useCallOrder';

import Push from 'push.js';

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
  const [calling, setCalling] = useState<number>(0);

  const fetchData = () => {
    if (!classroom_id) return;
    setLoading(true);
    readCallorderByClassroomId(classroom_id).then((res) => {
      const new_call_orders = res.filter((call_order: any) => call_order.status === false);
      if (new_call_orders.length > calling) {
        setCalling(new_call_orders.length);
        Push.create('新しい呼び出しがあります', { timeout: 4000 });
      }
      localStorage.setItem('calling', new_call_orders.length.toString());
      setCallOrders(new_call_orders.reverse());
      setLoading(false);
    });
  };

  useEffect(() => {
    if (localStorage.getItem('calling')) {
      setCalling(Number(localStorage.getItem('calling')));
    }

    if (!socket) return;
    socket.on('refetch', () => fetchData());

    fetchData();
    Push.Permission.request();
  }, [socket, classroom_id]);

  const handleCheck = (call_order_id: number, check: boolean) => {
    const body = {
      id: call_order_id,
      check: !check,
    };

    updateCallOrder(body).then(() => {
      fetchData();
      socket.emit('refetch');
    });
  };

  const handleComplete = (call_order_id: number) => {
    const body = {
      id: call_order_id,
      status: true,
    };

    updateCallOrder(body).then(() => {
      fetchData();
      socket.emit('refetch');
    });
  };

  const handleToday = (call_order_id: number, today: boolean) => {
    const body = {
      id: call_order_id,
      today: !today,
    };

    updateCallOrder(body).then(() => {
      fetchData();
      socket.emit('refetch');
    });
  };

  if (loading) return <Loading />;

  return (
    <Layout title='座席表'>
      <CallOrderList
        call_orders={call_orders}
        handleCheck={handleCheck}
        handleComplete={handleComplete}
        handleToday={handleToday}
      />
    </Layout>
  );
};

export default ClassroomRegister;
