import Layout from '@/components/template/Layout';
import Classroom from '@/components/organisms/Classroom';

import { classrooms, placements, desks, call_orders } from '@/mocks/data';

const Home = () => {
  return (
    <Layout>
      <Classroom desks={desks} call_orders={call_orders} classroom={classrooms[0]} placements={placements} />
    </Layout>
  );
};

export default Home;
