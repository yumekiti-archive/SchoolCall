import Layout from '@/components/template/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

import Classroom from '@/components/organisms/Classroom';

import { useGetClassroomById } from '@/hooks/useClassroom';

const ClassroomRegister = () => {
  const router = useRouter();
  const { classroom_id } = router.query;
  const [classroom, setClassroom] = useState<any>();

  if (classroom_id && !classroom) {
    useGetClassroomById(classroom_id).then((res) => {
      setClassroom(res);
    });
  }

  return (
    classroom &&
    <Layout Title='クラス作成'>
      {/* <Classroom desks={desks} call_orders={call_orders} classroom={classroom} placements={placements} /> */}
      <Classroom classroom={classroom} />
    </Layout>
  );
};

export default ClassroomRegister;
