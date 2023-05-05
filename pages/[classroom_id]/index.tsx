import Layout from '@/components/template/Layout';
import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

import Classroom from '@/types/classroom';
import { useReadClassroomById } from '@/hooks/useClassroom';
import { useAddClass } from '@/hooks/useClassroom';

const ClassroomRegister = () => {
  const router = useRouter();
  const { classroom_id } = router.query;
  const [classroom, setClassroom] = useState<Classroom>();
  const [loading, setLoading] = useState<boolean>(true);
  const { readClassroomById } = useReadClassroomById();
  const { addClass } = useAddClass();

  const [className, setClassName] = useState<string>('IE3A');

  if (loading && classroom_id) {
    readClassroomById(classroom_id).then((res) => {
      setClassroom(res);
    });
    setLoading(false);
  }

  const handleAddClass = () => {
    if (!classroom) return;
    const newClassroom = {
      id: classroom.id,
      name: classroom.name,
    }
    addClass(newClassroom, className);
    router.reload();
  };

  return (
    <Layout title='クラス一覧'>
      <div className='w-full h-40 p-4'>
        <div className='w-full h-full bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-2/6 rounded-lg'>
            <span>クラスの名前</span>
            <input type="text" className='w-1/2 rounded-lg p-1' defaultValue={className} onChange={(e) => {setClassName(e.target.value)}} />
          </div>
          <div className='flex justify-end items-center w-8/12 rounded-lg'>
            <button className='w-1/2 rounded-lg p-2 bg-blue-400 text-white' onClick={handleAddClass}>
              作成
            </button>
          </div>
        </div>
      </div>
      {classroom && classroom.class?.map((classroom) => (
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
