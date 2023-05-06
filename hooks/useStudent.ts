import { fetchInstance } from '../libs/fetchInstance';

const url = '/student';

export const useReadStudent = () => {
  const fetch = fetchInstance();

  const readStudent = async () => {
    const { data } = await fetch.get(url);
    return data;
  };

  return { readStudent };
};

export const useReadStudentById = () => {
  const fetch = fetchInstance();

  const readStudentById = async (id: any) => {
    const { data } = await fetch.get(url, {
      params: { id },
    });
    return data;
  };

  return { readStudentById };
};

export const useCreateStudent = () => {
  const fetch = fetchInstance();

  const createStudent = async (body: any) => {
    const { data } = await fetch.post(url, body);
    return data;
  };

  return { createStudent };
};

export const useUpdateStudent = () => {
  const fetch = fetchInstance();

  const updateStudent = async (body: any) => {
    const { data } = await fetch.put(url, body, {
      params: { id: body.id },
    });
    return data;
  };

  return { updateStudent };
};

export const useDeleteStudent = () => {
  const fetch = fetchInstance();

  const deleteStudent = async (id: any) => {
    const { data } = await fetch.delete(url, {
      params: { id },
    });
    return data;
  };

  return { deleteStudent };
};

export const useReadStudentByStudentNumber = () => {
  const fetch = fetchInstance();

  const readStudentByStudentNumber = async (studentNumber: any) => {
    const { data } = await fetch.get(url, {
      params: { studentNumber },
    });
    return data;
  };

  return { readStudentByStudentNumber };
};
