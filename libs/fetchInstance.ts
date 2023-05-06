import axios from 'axios';

export const fetchInstance = () => {
  return axios.create({
    baseURL: 'http://192.168.11.3:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
