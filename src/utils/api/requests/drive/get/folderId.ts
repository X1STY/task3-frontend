import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type PostGetFolderIdParams = GetFolderRequestDto;
export type PostGetFolderIdConfig = AxiosRequestConfig<PostGetFolderIdParams>;

export const getFolderId = async ({ params, config }: PostGetFolderIdConfig) =>
  instance.get<GetFolderResponseDto>(`drive/folder/${params.id}`, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
