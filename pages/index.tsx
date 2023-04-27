import Layout from '@/components/template/Layout';
import ClassRoom from '@/components/organisms/ClassRoom';

import { desks, calls } from '@/seeder/data';

const Home = () => {
  return (
    <Layout>
      <ClassRoom desks={desks} calls={calls} />
    </Layout>
  );
};

export default Home;
