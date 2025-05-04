import axios, { CreateAxiosDefaults } from 'axios';
import { getAccessToken } from './token-helpers';

const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message;
};

const options: CreateAxiosDefaults = {
  baseURL: process.env.SERVER_URL || 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
};

const optionsAuth: CreateAxiosDefaults = {
  baseURL: process.env.AUTH_URL || 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosAuth = axios.create(optionsAuth);
const axiosWithToken = axios.create(options);

axiosWithToken.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosWithToken.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        return axiosWithToken.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
        }
      }
    }

    throw error;
  }
);

export { axiosAuth, axiosClassic, axiosWithToken };
