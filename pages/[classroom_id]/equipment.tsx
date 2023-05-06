import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';

const Equipment = () => {
  const router = useRouter();
  const { classroom_id } = router.query;

  return (
    <Layout title="Equipment">
      <main>
        <h1>Equipment</h1>
        <p>Classroom ID: {classroom_id}</p>
      </main>
    </Layout>
  );
};

export default Equipment;