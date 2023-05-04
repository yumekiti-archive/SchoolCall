import { useRouter } from 'next/router'

import Layout from '@/components/template/Layout';
import { useState } from 'react';

import { usePostClassroom } from '@/hooks/useClassroom';

const ClassroomRegister = () => {
  const [name, setName] = useState('3601');
  const [breadth, setBreadth] = useState(48);
  const [gap, setGap] = useState('1,8,9,16,17,24,25,32,33,40,48');

  const handleClick = () => {
    const body = {
      name: name,
      breadth: breadth,
      gap: gap.split(',').map((g) => Number(g)),
    };

    usePostClassroom(body);
  }

  return (
    <Layout Title='クラス作成'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-1/2 h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>教室の名前</span>
            <input type="text" className='w-1/2 rounded-lg p-1' defaultValue={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>広さ</span>
            <input type="number" className='w-1/2 rounded-lg p-1' min="1" max="100" defaultValue={breadth} onChange={(e) => setBreadth(Number(e.target.value))} />
          </div>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>間隔</span>
            <input type="text" className='w-1/2 rounded-lg p-1' defaultValue={gap} onChange={(e) => setGap(e.target.value)} />
          </div>
          <div className='flex justify-end items-center w-8/12 rounded-lg'>
            <button className='w-1/2 rounded-lg p-2 bg-blue-400 text-white' onClick={handleClick}>
              作成
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClassroomRegister;
