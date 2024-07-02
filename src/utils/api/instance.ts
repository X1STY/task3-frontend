import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://176.109.108.98/'
});

export default instance;
