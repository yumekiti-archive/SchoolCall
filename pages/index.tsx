import Layout from '@/components/templates/Layout';
import Loading from '@/components/atoms/Loading';
import { FC, useState, useEffect } from 'react';

import ClassroomList from '@/components/organisms/ClassroomList';

import { useReadClassroom, useUpdateClassroom, useDeleteClassroom } from '@/hooks/useClassroom';

type Props = {
  socket: any;
};

const ClassroomRegister: FC<Props> = ({ socket }) => {
  const { readClassroom } = useReadClassroom();
  const { updateClassroom } = useUpdateClassroom();
  const { deleteClassroom } = useDeleteClassroom();

  const [classrooms, setClassrooms] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    readClassroom().then((res) => {
      setClassrooms(res);
      setLoading(false);
    });
  }, []);

  const handleDelete = (body: any) => {
    deleteClassroom(body).then((res) => {
      setClassrooms(classrooms.filter((classroom: any) => classroom.id !== res.id));
    });
  };

  const handleUpdate = (updatedClassroom: any) => {
    updateClassroom(updatedClassroom).then(() => {
      socket.emit('refetch');
    });
  };

  if (loading) return <Loading />;

  return (
    <Layout title='教室作成' href='/register'>
      <ClassroomList classrooms={classrooms} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </Layout>
  );
};

export default ClassroomRegister;
