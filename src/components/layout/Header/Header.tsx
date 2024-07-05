import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const user = JSON.parse(localStorage.getItem('user')!) as UserDto;
  const navigate = useNavigate();
  return (
    <div className='flex h-16 w-full flex-row items-center justify-between p-4'>
      <div>
        <button className='text-3xl text-gray-800' onClick={() => navigate('/drive')}>
          IPST Drive
        </button>
      </div>
      <div className='flex flex-row items-center justify-center gap-2'>
        <div className='text-xl text-gray-800'>
          Welcome back, {user.name} {user.surname}
        </div>
        <Button
          variant='ghost'
          size='lg'
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
          className='border-none'
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
