import { fetchInstance } from '../libs/fetchInstance';

const url = '/callorder';

export const useGetCallorder = async () => {
  const fetch = fetchInstance();

  const { data } = await fetch.get(url);
  return data;
};

export const useGetCallorderById = async (id: any) => {
  const fetch = fetchInstance();

  console.log(id)

  const { data } = await fetch.get(url, {
    params: { id }
  });
  return data;
}

export const usePostCallorder = async (callorder: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.post(url, callorder);
  return data;
}

export const usePutCallorder = async (callorder: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.put(url, callorder, {
    params: { id: callorder.id }
  });
  return data;
}

export const useDeleteCallorder = async (id: any) => {
  const fetch = fetchInstance();

  const { data } = await fetch.delete(url, {
    params: { id }
  });
  return data;
}
