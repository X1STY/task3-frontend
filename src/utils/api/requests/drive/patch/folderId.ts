import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type PatchFolderParams = PatchFolderRequestDto;
export type PatchFolderConfig = AxiosRequestConfig<PatchFolderParams>;

export const patchFolderId = async ({ params, config }: PatchFolderConfig) =>
  instance.patch<PatchFolderResponseDto>(
    `drive/folder/${params.id}`,
    { name: params.new_name, parent_folder_id: params.new_parent_folder_id },
    {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
  );
