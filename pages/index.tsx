import Layout from '@/components/templates/Layout';
import Loading from '@/components/atoms/Loading';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useReadClassroom, useUpdateClassroom, useDeleteClassroom } from '@/hooks/useClassroom';

const ClassroomRegister = () => {
  const { readClassroom } = useReadClassroom();
  const { updateClassroom } = useUpdateClassroom();
  const { deleteClassroom } = useDeleteClassroom();

  const [classrooms, setClassrooms] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    readClassroom().then((res) => {
      setClassrooms(res);
      setLoading(false);
    });
  }, []);

  const handleDelete = (body: any) => {
    deleteClassroom(body).then((res) => {
      setClassrooms(classrooms.filter((classroom: any) => classroom.id !== res.id));
    });
  };

  const handleUpdate = (updatedClassroom: any) => {
    updateClassroom(updatedClassroom);
  };

  if (loading) return <Loading />;

  return (
    <Layout title='教室作成' href='/register'>
      <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 p-4'>
        {classrooms.map((classroom: any) => (
          <div
            key={classroom.id}
            className='col-span-1 row-span-1 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'
          >
            <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
              <span>教室の名前</span>
              <input
                type='text'
                className='w-1/2 rounded-lg p-1'
                defaultValue={classroom.name}
                onChange={(e) => {
                  classroom.name = e.target.value;
                }}
              />
            </div>
            <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
              <span>広さ</span>
              <input
                type='number'
                className='w-1/2 rounded-lg p-1'
                min='1'
                max='100'
                defaultValue={classroom.breadth}
                onChange={(e) => {
                  classroom.breadth = parseInt(e.target.value);
                }}
              />
            </div>
            <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
              <span>分割</span>
              <input
                type='number'
                className='w-1/2 rounded-lg p-1'
                min='1'
                max='30'
                defaultValue={classroom.split}
                onChange={(e) => {
                  classroom.split = parseInt(e.target.value);
                }}
              />
            </div>
            <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
              <span>間隔</span>
              <input
                type='text'
                className='w-1/2 rounded-lg p-1'
                defaultValue={classroom.gaps}
                onChange={(e) => {
                  classroom.gaps = e.target.value;
                }}
              />
            </div>
            <div className='flex justify-end items-center w-8/12 rounded-lg grid grid-cols-4 gap-2'>
              <Link
                href={`/${classroom.id}`}
                className='col-span-1 rounded-lg p-2 bg-yellow-400 text-white text-center'
              >
                詳細
              </Link>
              <Link
                href={`/${classroom.id}/placement`}
                className='col-span-1 rounded-lg p-2 bg-green-400 text-white text-center'
              >
                備品
              </Link>
              <button
                className='col-span-1 rounded-lg p-2 bg-blue-400 text-white text-center'
                onClick={() => handleUpdate(classroom)}
              >
                更新
              </button>
              <button
                className='col-span-1 rounded-lg p-2 bg-red-400 text-white text-center'
                onClick={() => handleDelete(classroom.id)}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ClassroomRegister;
