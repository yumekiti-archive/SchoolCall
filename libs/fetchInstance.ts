import axios from 'axios';

export const fetchInstance = () => {
  return axios.create({
    baseURL: 'http://localhost/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
