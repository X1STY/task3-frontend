import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type DeleteFileParams = DeleteEntityRequestDto;
export type DeleteFileConfig = AxiosRequestConfig<DeleteFileParams>;

export const deleteFileId = async ({ params, config }: DeleteFileConfig) =>
  instance.delete(`drive/file/${params.id}`, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
