// model Placement {
//   id           Int        @id @default(autoincrement())
//   potionNumber Int
//   name         String
//   classroomId  Int?
//   createdAt    DateTime   @default(now())
//   updatedAt    DateTime   @updatedAt
//   Classroom    Classroom? @relation(fields: [classroomId], references: [id])
// }

import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';
import Alert from '@/components/atoms/Alert';

import { useState } from 'react';

import Classroom from '@/types/classroom';

import { useReadClassroomById } from '@/hooks/useClassroom';

import { useCreatePlacement } from '@/hooks/usePlacement';

const Equipment = () => {
  const router = useRouter();
  const { classroom_id } = router.query;
  const [classroom, setClassroom] = useState<Classroom>();
  const { readClassroomById } = useReadClassroomById();
  const [loading, setLoading] = useState<boolean>(true);
  const { createPlacement } = useCreatePlacement();

  const [alertFlag, setAlertFlag] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('error');

  const [name, setName] = useState<string>('');
  const [potionNumber, setPotionNumber] = useState<number>(0);

  if (loading && classroom_id) {
    readClassroomById(Number(classroom_id)).then((res) => {
      setClassroom(res);
    });
    setLoading(false);
  }

  const alertSet = (message: string, type: string = 'error') => {
    setAlertFlag(true);
    setAlertMessage(message);
    setAlertType(type);

    setTimeout(() => {
      setAlertFlag(false);
    }, 3000);
  };

  const handleClick = () => {
    const body = {
      name: name,
      potionNumber: Number(potionNumber),
      classroomId: Number(classroom_id),
    };

    createPlacement(body).then((res) => {
      alertSet('備品を追加しました', 'success');
    });
  };

  return (
    <Layout title='備品追加'>
      {alertFlag && <Alert message={alertMessage} type={alertType} />}
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-1/2 h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>備品の名前</span>
            <input
              type='text'
              className='w-1/2 rounded-lg p-1'
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
            <span>配置場所</span>
            <select
              className='w-1/2 rounded-lg p-1'
              onChange={(e) => setPotionNumber(Number(e.target.value))}
            >
              {classroom?.gaps.map((gap) => {
                return (
                  <option key={gap} value={gap}>
                    {gap}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='flex justify-end items-center w-8/12 rounded-lg'>
            <button
              className='w-1/2 rounded-lg p-2 bg-blue-400 text-white'
              onClick={handleClick}
            >
              作成
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Equipment;
