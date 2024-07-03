import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type PostSignUpParams = SignUpDto;
export type PostSignUpConfig = AxiosRequestConfig<PostSignUpParams>;

export const postSignUp = async ({ params, config }: PostSignUpConfig) =>
  instance.post<SignUpResponseDto>(`auth/signup`, params, config);
