import Layout from '@/components/template/Layout';
import Classroom from '@/components/organisms/Classroom';

import { desks, call_orders } from '@/mocks/data';

const Home = () => {
  return (
    <Layout>
      <Classroom desks={desks} call_orders={call_orders} />
    </Layout>
  );
};

export default Home;
