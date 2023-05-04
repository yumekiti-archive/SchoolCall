import Layout from '@/components/template/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

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
      {classroom.id}
    </Layout>
  );
};

export default ClassroomRegister;
