import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.set?.(
        'Authorization',
        `Bearer ${token}`,
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken =
      response.headers['authorization'];
    if (newAccessToken?.startsWith('Bearer ')) {
      const token = newAccessToken.replace('Bearer ', '');
      localStorage.setItem('access_token', token);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
