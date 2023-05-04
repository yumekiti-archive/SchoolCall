import { fetchInstance } from '../libs/fetchInstance';

const url = '/classroom';

export const useGetClassroom = async () => {
  const fetch = fetchInstance();

  const { data } = await fetch.get(url);
  return data;
};

export const useGetClassroomById = async (id: any) => {
  const fetch = fetchInstance();

  console.log(id)

  const { data } = await fetch.get(url, {
    params: { id }
  });
  return data;
}

export const usePostClassroom = async (classroom: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.post(url, classroom);
  return data;
}

export const usePutClassroom = async (classroom: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.put(url, classroom, {
    params: { id: classroom.id }
  });
  return data;
}

export const useDeleteClassroom = async (id: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.delete(url, {
    params: { id }
  });
  return data;
}
