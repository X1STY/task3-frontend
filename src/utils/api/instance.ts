import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://176.109.108.98:8077/';

export type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig };

export const instance = axios.create({
  baseURL: BASE_URL
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: boolean;
}

const refreshToken = async (error: AxiosError): Promise<AxiosError | AxiosResponse> => {
  const config = error.config as CustomAxiosRequestConfig;

  if (error.response?.status === 401 && !config?.retry) {
    config.retry = true;
    try {
      const res = await axios<RefreshResponseDto>(`${BASE_URL}auth/refresh`, {
        method: 'post',
        withCredentials: true
      });
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);
        config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return await instance(config);
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
