import { fetchInstance } from '../libs/fetchInstance';

const url = '/desk';

export const useGetDesk = async () => {
  const fetch = fetchInstance();

  const { data } = await fetch.get(url);
  return data;
};

export const useGetDeskById = async (id: any) => {
  const fetch = fetchInstance();

  console.log(id)

  const { data } = await fetch.get(url, {
    params: { id }
  });
  return data;
}

export const usePostDesk = async (desk: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.post(url, desk);
  return data;
}

export const usePutDesk = async (desk: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.put(url, desk, {
    params: { id: desk.id }
  });
  return data;
}

export const useDeleteDesk = async (id: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.delete(url, {
    params: { id }
  });
  return data;
}
