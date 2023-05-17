import { FC } from 'react';
import Link from 'next/link';

import Classroom from '@/types/classroom';

type Props = {
  classrooms: Classroom[];
  handleUpdate: (classroom: Classroom) => void;
  handleDelete: (id: number) => void;
  handleReset: (id: number) => void;
};

const Component: FC<Props> = ({ classrooms, handleUpdate, handleDelete, handleReset }) => {
  return (
    <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 p-4 text-sm md:text-xl'>
      {classrooms.map((classroom: Classroom) => (
        <div
          key={classroom.id}
          className='col-span-1 row-span-1 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center py-2'
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
              defaultValue={String(classroom.gaps)}
              onChange={(e) => {
                classroom.gaps = e.target.value.split(',').map((gap) => parseInt(gap));
              }}
            />
          </div>
          <div className='flex justify-end items-center w-8/12 rounded-lg grid grid-cols-2 md:grid-cols-5 gap-2 py-2'>
            <Link href={`/${classroom.id}`} className='col-span-1 rounded-lg p-2 bg-yellow-400 text-white text-center whitespace-pre'>
              詳細
            </Link>
            <button
              className='col-span-1 rounded-lg p-2 bg-orange-400 text-white text-center whitespace-pre'
              onClick={() => handleReset(classroom.id)}
            >
              リセット
            </button>
            <Link
              href={`/${classroom.id}/placement`}
              className='col-span-1 rounded-lg p-2 bg-green-400 text-white text-center whitespace-pre'
            >
              備品
            </Link>
            <button
              className='col-span-1 rounded-lg p-2 bg-blue-400 text-white text-center whitespace-pre'
              onClick={() => handleUpdate(classroom)}
            >
              更新
            </button>
            <button
              className='col-span-1 rounded-lg p-2 bg-red-400 text-white text-center whitespace-pre'
              onClick={() => handleDelete(classroom.id)}
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Component;
