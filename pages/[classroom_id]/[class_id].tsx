import Layout from '@/components/template/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

import Desk from '@/types/desk';
import CallOrder from '@/types/callorder';
import Classroom from '@/types/classroom';
import Placement from '@/types/placement';

import ClassroomTable from '@/components/organisms/ClassroomTable';

import { useReadClassroomById } from '@/hooks/useClassroom';

import { useReadDeskByClassroomIdandClassId } from '@/hooks/useDesk';

import { useReadCallorderByClassroomId } from '@/hooks/useCallOrder';

const ClassroomRegister = () => {
  const router = useRouter();
  const { classroom_id, class_id } = router.query;
  const [classroom, setClassroom] = useState<Classroom>();
  const [desks, setDesks] = useState<Desk[]>();
  const [call_orders, setCallOrders] = useState<CallOrder[]>();

  const { readDeskByClassroomIdandClassId } = useReadDeskByClassroomIdandClassId();
  const { readCallorderByClassroomId } = useReadCallorderByClassroomId();

  const { readClassroomById } = useReadClassroomById();

  if (classroom_id && !classroom) {
    readClassroomById(classroom_id).then((res) => {
      setClassroom(res);
    });
  }

  if (classroom_id && class_id && !desks) {
    readDeskByClassroomIdandClassId(classroom_id, class_id).then((res) => {
      setDesks(res);
    });
  }

  if (classroom_id && !call_orders) {
    readCallorderByClassroomId(classroom_id).then((res) => {
      setCallOrders(res);
    });
  }

  return (
    classroom &&
    <Layout title='座席表'>
      {/* <Classroom desks={desks} call_orders={call_orders} classroom={classroom} placements={placements} /> */}
      <ClassroomTable desks={desks} classroom={classroom} placements={classroom.placement} call_orders={call_orders} />
    </Layout>
  );
};

export default ClassroomRegister;
