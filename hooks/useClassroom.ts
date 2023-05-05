import { fetchInstance } from '../libs/fetchInstance';

const url = '/classroom';

export const useReadClassroom = () => {
  const fetch = fetchInstance();

  const readClassroom = async () => {
    const { data } = await fetch.get(url);
    return data;
  }

  return { readClassroom }
}

export const useReadClassroomById = () => {
  const fetch = fetchInstance();

  const readClassroomById = async (id: any) => {
    const { data } = await fetch.get(url, {
      params: { id }
    });
    return data;
  }
  
  return { readClassroomById }
}

export const useCreateClassroom = () => {
  const fetch = fetchInstance();

  const createClassroom = async (body: any) => {
    const { data } = await fetch.post(url, body);
    return data;
  }

  return { createClassroom }
}

export const useUpdateClassroom = () => {
  const fetch = fetchInstance();

  const updateClassroom = async (body: any) => {
    const { data } = await fetch.put(url, body);
    return data;
  }

  return { updateClassroom }
}

export const useDeleteClassroom = () => {
  const fetch = fetchInstance();

  const deleteClassroom = async (id: any) => {
    const { data } = await fetch.delete(url, {
      params: { id }
    });
    return data;
  }

  return { deleteClassroom }
}