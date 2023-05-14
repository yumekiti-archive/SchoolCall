import { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';
import ClassroomForm from '@/components/organisms/ClassroomForm';

import { useCreateClassroom } from '@/hooks/useClassroom';

const ClassroomRegister = () => {
  const router = useRouter();
  const { createClassroom } = useCreateClassroom();

  const [name, setName] = useState('3601');
  const [breadth, setBreadth] = useState(48);
  const [gaps, setGaps] = useState('1,8,9,16,17,24,25,32,33,40,48');
  const [split, setSplit] = useState(8);

  const handleClick = () => {
    const body = {
      name: name,
      breadth: breadth,
      split: split,
      gaps: gaps.split(',').map((g) => Number(g)),
    };

    createClassroom(body).then((res) => {
      router.push('/');
    });
  };

  return (
    <Layout title='戻る'>
      <ClassroomForm
        name={name}
        setName={setName}
        breadth={breadth}
        setBreadth={setBreadth}
        split={split}
        setSplit={setSplit}
        gaps={gaps}
        setGaps={setGaps}
        handleClick={handleClick}
      />
    </Layout>
  );
};

export default ClassroomRegister;
