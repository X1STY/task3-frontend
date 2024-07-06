import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type PostImageParams = PostFileRequestDto;
export type PostImageConfig = AxiosRequestConfig<PostImageParams>;

export const postFile = ({ params, config }: PostImageConfig) => {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('parent_folder_id', params.parent_folder_id);
  return instance.post<PostFileResponseDto>(`drive/file`, formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};
