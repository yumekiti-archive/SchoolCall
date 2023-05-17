import { fetchInstance } from '../libs/fetchInstance';

const url = '/desk';

export const useReadDesk = () => {
  const fetch = fetchInstance();

  const readDesk = async () => {
    const { data } = await fetch.get(url);
    return data;
  };

  return { readDesk };
};

export const useReadDeskByClassroomId = () => {
  const fetch = fetchInstance();

  const readDeskByClassroomId = async (classroomId: any) => {
    const { data } = await fetch.get(url, {
      params: { classroomId },
    });
    return data;
  };

  return { readDeskByClassroomId };
};

export const useReadDeskById = () => {
  const fetch = fetchInstance();

  const readDeskById = async (id: any) => {
    const { data } = await fetch.get(url, {
      params: { id },
    });
    return data;
  };

  return { readDeskById };
};

export const useCreateDesk = () => {
  const fetch = fetchInstance();

  const createDesk = async (body: any) => {
    const { data } = await fetch.post(url, body);
    return data;
  };

  return { createDesk };
};

export const useUpdateDesk = () => {
  const fetch = fetchInstance();

  const updateDesk = async (body: any) => {
    const { data } = await fetch.put(url, body, {
      params: { id: body.id },
    });
    return data;
  };

  return { updateDesk };
};

export const useDeleteDesk = () => {
  const fetch = fetchInstance();

  const deleteDesk = async (id: any) => {
    const { data } = await fetch.delete(url, {
      params: { id },
    });
    return data;
  };

  return { deleteDesk };
};

export const useDeleteDeskByClassroomId = () => {
  const fetch = fetchInstance();

  const deleteDeskByClassroomId = async (classroomId: any) => {
    const { data } = await fetch.delete(url, {
      params: { classroomId },
    });
    return data;
  };

  return { deleteDeskByClassroomId };
}
