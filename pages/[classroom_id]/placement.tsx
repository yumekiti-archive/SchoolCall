import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/templates/Layout';
import Alert from '@/components/atoms/Alert';
import Loading from '@/components/atoms/Loading';
import PlacementForm from '@/components/organisms/PlacementForm';

import Classroom from '@/types/classroom';

import { useReadClassroomById } from '@/hooks/useClassroom';
import { useCreatePlacement } from '@/hooks/usePlacement';

type Props = {
  socket: any;
};

const Equipment: FC<Props> = ({ socket }) => {
  const router = useRouter();
  const { readClassroomById } = useReadClassroomById();
  const { createPlacement } = useCreatePlacement();

  const { classroom_id } = router.query;
  const [classroom, setClassroom] = useState<Classroom>();
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<any>({ flag: false, message: '', type: '' });
  const [name, setName] = useState<string>('');
  const [positionNumber, setpositionNumber] = useState<number>(0);

  if (loading && classroom_id) {
    readClassroomById(Number(classroom_id)).then((res) => {
      setClassroom(res);
      setLoading(false);
    });
  }

  const alertSet = (message: string, type: string = 'error') => {
    setAlert({ flag: true, message: message, type: type });
    setTimeout(() => setAlert({ flag: false }), 3000);
  };

  const handleClick = () => {
    const body = {
      name: name,
      positionNumber: Number(positionNumber),
      classroomId: Number(classroom_id),
    };

    createPlacement(body).then(() => {
      alertSet('備品を追加しました', 'success');
      socket.emit('refetch');
    });
  };

  if (loading) return <Loading />;

  return (
    <Layout title='備品追加'>
      {alert.flag && <Alert message={alert.message} type={alert.type} />}
      {classroom && (
        <PlacementForm
          name={name}
          setName={setName}
          positionNumber={classroom.gaps}
          setpositionNumber={setpositionNumber}
          handleClick={handleClick}
        />
      )}
    </Layout>
  );
};

export default Equipment;
