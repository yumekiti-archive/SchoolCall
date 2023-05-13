import Layout from '@/components/templates/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UpDownButton from '@/components/organisms/UpDownButton';

const ClassroomRegister = () => {
  const router = useRouter();
  const { classroom_id } = router.query;

  const handleColl = () => {
    router.push(`/${classroom_id}/call`);
  };

  return (
    <Layout title='順番管理' href='/student/signin'>
      <UpDownButton
        upText='呼び出し確認'
        downText='座席表'
        downHref={`/${classroom_id}/room?reverse=false`}
        handleClick={handleColl}
        waitingDisplay={false}
      />
    </Layout>
  );
};

export default ClassroomRegister;
