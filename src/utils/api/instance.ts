import axios from 'axios';

export type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig };

export const instance = axios.create({
  baseURL: 'http://176.109.108.98:8077/',
  withCredentials: true
});
