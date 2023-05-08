import Layout from '@/components/templates/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

import Desk from '@/types/desk';
import CallOrder from '@/types/callOrder';
import Classroom from '@/types/classroom';
import Placement from '@/types/placement';

import ClassroomTable from '@/components/organisms/ClassroomTable';

import { useReadClassroomById } from '@/hooks/useClassroom';

import { useReadDeskByClassroomIdandClassId } from '@/hooks/useDesk';

import { useReadCallorderByClassroomId } from '@/hooks/useCallOrder';

const socket = io();

const ClassroomRegister = () => {
  const router = useRouter();
  const { classroom_id, class_id } = router.query;
  const [classroom, setClassroom] = useState<Classroom>();
  const [desks, setDesks] = useState<Desk[]>();
  const [call_orders, setCallOrders] = useState<CallOrder[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const { readDeskByClassroomIdandClassId } =
    useReadDeskByClassroomIdandClassId();
  const { readCallorderByClassroomId } = useReadCallorderByClassroomId();

  const { readClassroomById } = useReadClassroomById();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });

    socket.on('reload', () => {
      setLoading(true);
      readClassroomById(classroom_id).then((res) => {
        setClassroom(res);
      }).finally(() => {
        readDeskByClassroomIdandClassId(classroom_id, class_id).then((res) => {
          setDesks(res);
        });
        readCallorderByClassroomId(classroom_id).then((res) => {
          setCallOrders(res);
        });
        setLoading(false);
      });
    });
  }, []);

  if (loading && classroom_id && class_id) {
    readClassroomById(classroom_id).then((res) => {
      setClassroom(res);
    }).finally(() => {
      readDeskByClassroomIdandClassId(classroom_id, class_id).then((res) => {
        setDesks(res);
      });
      readCallorderByClassroomId(classroom_id).then((res) => {
        setCallOrders(res);
      });
      setLoading(false);
    });
  }

  if(loading) return <Layout title="座席表">Loading...</Layout>;

  return (
    classroom && (
      <Layout title={`${classroom.name} 座席表`}>
        {/* <Classroom desks={desks} call_orders={call_orders} classroom={classroom} placements={placements} /> */}
        <ClassroomTable
          desks={desks}
          classroom={classroom}
          placements={classroom.placement}
          call_orders={call_orders}
        />
      </Layout>
    )
  );
};

export default ClassroomRegister;
