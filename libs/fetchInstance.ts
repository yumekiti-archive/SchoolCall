import axios from 'axios';

export const fetchInstance = () => {
  return axios.create({
    baseURL: location.origin + '/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};