import { fetchInstance } from '../libs/fetchInstance';

const url = '/callorder';

export const useReadCallOrder = () => {
  const fetch = fetchInstance();

  const readCallOrder = async () => {
    const { data } = await fetch.get(url);
    return data;
  };

  return { readCallOrder };
};

export const useReadCallorderByClassroomId = () => {
  const fetch = fetchInstance();

  const readCallorderByClassroomId = async (classroomId: any) => {
    const { data } = await fetch.get(url, {
      params: { classroomId },
    });
    return data;
  };

  return { readCallorderByClassroomId };
};

export const useReadCallOrderById = () => {
  const fetch = fetchInstance();

  const readCallOrderById = async (id: any) => {
    const { data } = await fetch.get(url, {
      params: { id },
    });
    return data;
  };

  return { readCallOrderById };
};

export const useCreateCallOrder = () => {
  const fetch = fetchInstance();

  const createCallOrder = async (body: any) => {
    const { data } = await fetch.post(url, body);
    return data;
  };

  return { createCallOrder };
};

export const useUpdateCallOrder = () => {
  const fetch = fetchInstance();

  const updateCallOrder = async (body: any) => {
    const { data } = await fetch.put(url, body, {
      params: { id: body.id },
    });
    return data;
  };

  return { updateCallOrder };
};

export const useDeleteCallOrder = () => {
  const fetch = fetchInstance();

  const deleteCallOrder = async (id: any) => {
    const { data } = await fetch.delete(url, {
      params: { id },
    });
    return data;
  };

  return { deleteCallOrder };
};

export const useReadCallOrderByStudentId = () => {
  const fetch = fetchInstance();

  const readCallOrderByStudentId = async (studentId: any) => {
    const { data } = await fetch.get(url, {
      params: { studentId },
    });
    return data;
  };

  return { readCallOrderByStudentId };
}