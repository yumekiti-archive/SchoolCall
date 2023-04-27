import Layout from '@/components/template/Layout';
import ClassRoom from '@/components/organisms/ClassRoom';

import { classwork } from '@/seeder/data';

const Home = () => {
  return (
    <Layout>
      <ClassRoom classwork={classwork} />
    </Layout>
  );
};

export default Home;
