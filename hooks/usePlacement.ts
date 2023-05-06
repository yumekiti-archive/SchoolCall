import { fetchInstance } from '../libs/fetchInstance';

const url = '/placement';

export const useReadPlacement = () => {
  const fetch = fetchInstance();

  const readPlacement = async () => {
    const { data } = await fetch.get(url);
    return data;
  };

  return { readPlacement };
};

export const useReadPlacementById = () => {
  const fetch = fetchInstance();

  const readPlacementById = async (id: any) => {
    const { data } = await fetch.get(url, {
      params: { id },
    });
    return data;
  };

  return { readPlacementById };
};

export const useCreatePlacement = () => {
  const fetch = fetchInstance();

  const createPlacement = async (body: any) => {
    const { data } = await fetch.post(url, body);
    return data;
  };

  return { createPlacement };
};

export const useUpdatePlacement = () => {
  const fetch = fetchInstance();

  const updatePlacement = async (body: any) => {
    const { data } = await fetch.put(url, body, {
      params: { id: body.id },
    });
    return data;
  };

  return { updatePlacement };
};

export const useDeletePlacement = () => {
  const fetch = fetchInstance();

  const deletePlacement = async (id: any) => {
    const { data } = await fetch.delete(url, {
      params: { id },
    });
    return data;
  };

  return { deletePlacement };
};
