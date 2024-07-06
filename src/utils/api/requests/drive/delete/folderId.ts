import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type DeleteFolderParams = DeleteEntityRequestDto;
export type DeleteFolderConfig = AxiosRequestConfig<DeleteFolderParams>;

export const deleteFolderId = async ({ params, config }: DeleteFolderConfig) =>
  instance.delete(`drive/folder/${params.id}`, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
