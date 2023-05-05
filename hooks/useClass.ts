import { fetchInstance } from '../libs/fetchInstance';

const url = '/class';

export const useReadClass = () => {
  const fetch = fetchInstance();

  const readClass = async () => {
    const { data } = await fetch.get(url);
    return data;
  }

  return { readClass }
}

export const useReadClassById = () => {
  const fetch = fetchInstance();

  const readClassById = async (id: any) => {
    const { data } = await fetch.get(url, {
      params: { id }
    });
    return data;
  }
  
  return { readClassById }
}

export const useCreateClass = () => {
  const fetch = fetchInstance();

  const createClass = async (body: any) => {
    const { data } = await fetch.post(url, body);
    return data;
  }

  return { createClass }
}

export const useUpdateClass = () => {
  const fetch = fetchInstance();

  const updateClass = async (body: any) => {
    const { data } = await fetch.put(url, body, {
      params: { id: body.id }
    });
    return data;
  }

  return { updateClass }
}

export const useDeleteClass = () => {
  const fetch = fetchInstance();

  const deleteClass = async (id: any) => {
    const { data } = await fetch.delete(url, {
      params: { id }
    });
    return data;
  }

  return { deleteClass }
}

export const useReadClassByName = () => {
  const fetch = fetchInstance();

  const readClassByName = async (className: any) => {
    const { data } = await fetch.get(url, {
      params: { className }
    });
    return data;
  }
  
  return { readClassByName }
}