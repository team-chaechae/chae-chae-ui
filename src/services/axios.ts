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
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  async (response) => {
    const authHeader = response.headers?.['authorization'];
    // typeof 조건을 안넣어주면 에러가 발함
    const hasBearer =
      typeof authHeader === 'string' &&
      authHeader.startsWith('Bearer ');
    if (!hasBearer) return response;

    const newToken = authHeader.replace('Bearer ', '');
    const prevToken = localStorage.getItem('access_token');

    // 처음 받는 토큰(로그인 직후) or 기존과 다른 토큰이면 저장 + defaults 갱신
    if (
      !prevToken ||
      (newToken && newToken !== prevToken)
    ) {
      localStorage.setItem('access_token', newToken);
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${newToken}`;

      const haveToRetry =
        newToken && prevToken !== newToken;

      if (haveToRetry) {
        const newConfig = {
          ...response.config,
          headers: {
            ...(response.config.headers || {}),
            Authorization: `Bearer ${newToken}`,
          },
        };
        return axiosInstance(newConfig);
      }
    }
    return response;
  },
  (error) => Promise.reject(error),
);
