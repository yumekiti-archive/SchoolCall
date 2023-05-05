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
      <div className='w-full h-40 p-4 grid grid-cols-2 gap-4'>
        <Link href={`/${classroom_id}/call`} className='col-span-1 w-full h-full bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
          <div className="w-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439.39 362.29c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71zM67.53 368c21.22-27.97 44.42-74.33 44.53-159.42 0-.2-.06-.38-.06-.58 0-61.86 50.14-112 112-112s112 50.14 112 112c0 .2-.06.38-.06.58.11 85.1 23.31 131.46 44.53 159.42H67.53zM224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64z"/></svg>
          </div>
          <span className="text-2xl font-bold">呼び出し確認</span>
        </Link>
        <div className='col-span-1 w-full h-full bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
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
