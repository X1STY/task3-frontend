import type { AxiosRequestConfig } from '../../../instance';
import { instance } from '../../../instance';

export type PostSignInParams = SignInDto;
export type PostSignInConfig = AxiosRequestConfig<PostSignInParams>;

export const postSignIn = async ({ params, config }: PostSignInConfig) =>
  instance.post<SignInResponseDto>(`auth/signin`, params, config);
