import axios from 'axios';

export const fetchInstance = () => {
  if (typeof window === 'undefined') return;
  return axios.create({
    // baseURL: 'http://localhost/api',
    baseURL: `${location.origin}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
