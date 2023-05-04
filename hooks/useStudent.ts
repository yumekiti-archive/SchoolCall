import { fetchInstance } from '../libs/fetchInstance';

const url = '/student';

export const useGetStudent = async () => {
  const fetch = fetchInstance();

  const { data } = await fetch.get(url);
  return data;
};

export const useGetStudentById = async (id: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.get(url, {
    params: { id }
  });
  return data;
}

export const usePostStudent = async (student: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.post(url, student);
  return data;
}

export const usePutStudent = async (student: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.put(url, student, {
    params: { id: student.id }
  });
  return data;
}

export const useDeleteStudent = async (id: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.delete(url, {
    params: { id }
  });
  return data;
}
