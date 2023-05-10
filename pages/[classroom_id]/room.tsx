import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Desk from '@/types/desk';
import CallOrder from '@/types/callOrder';
import Classroom from '@/types/classroom';

import Layout from '@/components/templates/Layout';
import Loading from '@/components/atoms/Loading';
import ClassroomTable from '@/components/organisms/ClassroomTable';

import { useReadClassroomById } from '@/hooks/useClassroom';
import { useReadCallorderByClassroomId } from '@/hooks/useCallOrder';
import { useReadDeskByClassroomId } from '@/hooks/useDesk';

type Props = {
  socket: any;
};

const ClassroomRegister: FC<Props> = ({ socket }) => {
  const router = useRouter();
  const { reverse } = router.query;
  const { readDeskByClassroomId } = useReadDeskByClassroomId();
  const { readCallorderByClassroomId } = useReadCallorderByClassroomId();
  const { readClassroomById } = useReadClassroomById();

  const { classroom_id } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [classroom, setClassroom] = useState<Classroom>();
  const [desks, setDesks] = useState<Desk[]>();
  const [call_orders, setCallOrders] = useState<CallOrder[]>();

  const fetchData = () => {
    if (!classroom_id) return;
    readClassroomById(classroom_id)
      .then((res) => {
        setClassroom(res);
      })
      .finally(() => {
        readDeskByClassroomId(classroom_id).then((res) => {
          setDesks(res);
        });
        readCallorderByClassroomId(classroom_id).then((res) => {
          setCallOrders(res);
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('refetch', () => fetchData());

    fetchData();
  }, [classroom_id]);

  if (loading) return <Loading />;

  return (
    <>
      {classroom && (
        <Layout title={`${classroom.name} 座席表`}>
          <ClassroomTable
            desks={desks}
            classroom={classroom}
            placements={classroom.placement}
            call_orders={call_orders}
            reverse={reverse == 'true'}
          />
        </Layout>
      )}
    </>
  );
};

export default ClassroomRegister;
