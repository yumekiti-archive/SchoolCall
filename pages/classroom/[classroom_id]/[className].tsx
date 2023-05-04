import { useRouter } from 'next/router'

import Layout from '@/components/template/Layout';
import { useState } from 'react';

const ClassroomRegister = () => {
  const router = useRouter();
  const { classroom, className } = router.query;

  return (
    <Layout Title='クラス作成'>
      <p>{classroom}</p>
    </Layout>
  );
};

export default ClassroomRegister;
