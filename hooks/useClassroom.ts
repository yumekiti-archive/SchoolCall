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
    const { data } = await fetch.put(url, body, {
      params: { id: body.id }
    });
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

export const useAddClass = () => {
  const fetch = fetchInstance();

  const addClass = async (body: any, className: any) => {
    const { data } = await fetch.put(url, body, {
      params: { id: body.id, className: className }
    });
    return data;
  }

  return { addClass }
}

export const useReadClassroomByName = () => {
  const fetch = fetchInstance();

  const readClassroomByName = async (className: any) => {
    const { data } = await fetch.get(url, {
      params: { className }
    });
    return data;
  }
  
  return { readClassroomByName }
}