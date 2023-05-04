import Layout from '@/components/template/Layout';
import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

import Classroom from '@/types/classroom';
import { useGetClassroomById } from '@/hooks/useClassroom';

const ClassroomRegister = () => {
  const router = useRouter();
  const { classroom_id } = router.query;
  const [classroom, setClassroom] = useState<Classroom>();

  if (classroom_id && !classroom) {
    useGetClassroomById(classroom_id).then((res) => {
      setClassroom(res);
    });
  }

  return (
    classroom &&
    <Layout Title='クラス一覧'>
      {classroom.class.map((classroom) => (
        <Link href={`/${classroom_id}/${classroom.id}`} key={classroom.id}>
          <div className="bg-white shadow-md rounded-md p-4 m-4">
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold">{classroom.name}</div>
              <div className="text-sm">{classroom.createdAt}</div>
            </div>
          </div>
        </Link>
      ))}
    </Layout>
  );
};

export default ClassroomRegister;
