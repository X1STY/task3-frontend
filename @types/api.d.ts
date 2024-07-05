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
interface GetFolderRequestDto {
  id: string;
}
interface GetFileRequestDto {
  id: string;
}
interface GetFolderResponseDto {
  folder: FolderDto;
  children: (ChildFileDto | ChildFolderDto)[];
}

interface ChildFolderDto {
  id: string;
  name: string;
  parent_folder_id: string;
  type: 'folder';
}
interface ChildFileDto {
  id: string;
  name: string;
  type: 'file';
  file_path: string;
}

interface AddFolderRequestDto {
  name: string;
  parent_folder_id: string;
}

interface AddFolderResponseDto {
  folder: FolderDto;
}

interface FolderDto {
  id: string;
  name: string;
  parent_folder_id: string;
}
