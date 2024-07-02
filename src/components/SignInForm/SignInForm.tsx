import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';

import { EyeIcon, EyeSlashIcon } from '../icons';

export interface SignInFormProps {
  onChange: () => void;
}

type SignInFormInputs = {
  email: string;
  password: string;
};
export const SignInForm: React.FC<SignInFormProps> = ({ onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormInputs>();
  const onSubmit: SubmitHandler<SignInFormInputs> = (data) => console.log(data);

  return (
    <form
      className='flex w-full flex-col items-center justify-center gap-2 p-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='mb-4 text-2xl font-bold'>Sign In</h1>

      <Input
        isInvalid={!!errors.email}
        errorMessage='Please enter a valid email'
        isRequired
        type='email'
        label='Email'
        {...register('email', { required: true })}
      />

      <Input
        isInvalid={!!errors.password}
        errorMessage='Please enter a valid password'
        isRequired
        label='Password'
        {...register('password', { required: true })}
        endContent={
          <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
            {isVisible ? <EyeSlashIcon width='24px' /> : <EyeIcon width='24px' />}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
      />

      <button type='button' className='-mt-3' onClick={onChange}>
        I do not have an account
      </button>

      <Button type='submit' color='secondary' variant='bordered' className='self-end'>
        Sign Up
      </Button>
    </form>
  );
};
