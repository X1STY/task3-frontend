import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type PostFolderParams = AddFolderRequestDto;
export type PostFolderConfig = AxiosRequestConfig<PostFolderParams>;

export const postFolder = async ({ params, config }: PostFolderConfig) =>
  instance.post<AddFolderResponseDto>(`drive/folder`, params, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
