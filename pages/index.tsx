import Layout from '@/components/template/Layout';
import Classroom from '@/components/organisms/Classroom';

import { desks, calls } from '@/seeder/data';

const Home = () => {
  return (
    <Layout>
      <Classroom desks={desks} calls={calls} />
    </Layout>
  );
};

export default Home;
