import axios from 'axios';
import { TOKEN } from '../utils/constants/intex';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_HOST_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    TOKEN,
  )}`;
  return config;
});

export default api;
