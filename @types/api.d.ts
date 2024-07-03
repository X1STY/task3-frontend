interface SignUpDto {
  name: string;
  surname: string;
  middlename?: string;
  email: string;
  username?: string;
  password: string;
}
interface SignInDto {
  email: string;
  password: string;
}
interface UserDto {
  name: string;
  surname: string;
  middlename?: string;
  email: string;
  username?: string;
  is_confirmed?: boolean;
}

interface ErrorDto {
  message: string[];
  error: string;
  statusCode: number;
}

interface SignInResponseDto {
  user: UserDto;
  accessToken: string;
}
interface SignUpResponseDto {
  user: UserDto;
}
