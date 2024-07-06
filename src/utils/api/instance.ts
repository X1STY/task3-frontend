/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://176.109.108.98:8077/';

export type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig };

export const instance = axios.create({
  baseURL: BASE_URL
});

const refreshToken = async (error): Promise<AxiosError | AxiosResponse> => {
  if (error.response?.status === 401 && !error.config._retry) {
    error.config._retry = true;
    try {
      const res = await axios<RefreshResponseDto>(`${BASE_URL}auth/refresh`, {
        method: 'post',
        withCredentials: true
      });
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return await instance(error.config);
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        localStorage.clear();
        window.location.href = '/';
      }
    }
  }
  return Promise.reject(error);
};

instance.interceptors.response.use((response) => {
  return response;
}, refreshToken);
