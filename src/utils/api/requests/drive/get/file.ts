import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type PostGetFileIdParams = GetFileRequestDto;
export type PostGetFileIdConfig = AxiosRequestConfig<PostGetFileIdParams>;

export const getFile = async ({ params, config }: PostGetFileIdConfig) =>
  instance.get<Blob>(`${params.id}`, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    responseType: 'blob'
  });
