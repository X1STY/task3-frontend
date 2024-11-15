import React, { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

import { SignInForm, SignUpForm } from '../components';
import type { SignInFormInputs } from '../components/SignInForm/SignInForm';
import type { SignUpFormInputs } from '../components/SignUpForm/SignUpForm';
import { postSignIn } from '../utils/api/requests/auth/post/signin';
import { postSignUp } from '../utils/api/requests/auth/post/signup';

export interface StartPageProps {}

const StartPage: React.FC<StartPageProps> = () => {
  const [showAuthorizationForm, setShowAuthorizationForm] = React.useState(true);
  const [error, setError] = useState<ErrorDto | undefined>();
  const handleChangeForm = () => setShowAuthorizationForm(!showAuthorizationForm);
  const navigate = useNavigate();

  const signIn: SubmitHandler<SignInFormInputs> = async (params) => {
    setError(undefined);
    await postSignIn({ params })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/drive');
        return response;
      })
      .catch((error: AxiosError<ErrorDto>) => {
        setError(error.response?.data);
      });
  };

  const signUp: SubmitHandler<SignUpFormInputs> = async (params) => {
    setError(undefined);
    await postSignUp({ params })
      .then(() => {
        return signIn({ email: params.email, password: params.password });
      })
      .catch((error: AxiosError<ErrorDto>) => {
        setError(error.response?.data);
      });
  };

  const variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <section className='inset-0 z-10 flex min-h-screen items-start justify-center bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 sm:h-[130svh] md:h-screen md:items-center'>
      <div className='flex w-full flex-col items-center justify-around gap-5 rounded-large transition-all md:w-2/3 md:flex-row md:gap-0'>
        <div className='flex h-auto w-2/5 flex-col items-center justify-center p-4'>
          <h1 className='text-center text-3xl font-bold text-gray-800 lg:text-4xl xl:text-5xl'>
            IPST Drive
          </h1>
          <p className='mt-4 text-center text-sm text-gray-600 lg:text-medium xl:text-lg'>
            Drive is a cloud storage service for all your needs.
          </p>
        </div>
        <div className='w-4/5 md:w-2/5'>
          <AnimatePresence mode='popLayout'>
            {showAuthorizationForm ? (
              <motion.div
                key='signIn'
                variants={variants}
                initial='initial'
                animate='animate'
                exit='exit'
              >
                <SignInForm onChange={handleChangeForm} onSubmit={signIn} />
              </motion.div>
            ) : (
              <motion.div
                key='signUp'
                variants={variants}
                initial='initial'
                animate='animate'
                exit='exit'
              >
                <SignUpForm onChange={handleChangeForm} onSubmit={signUp} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!!error && (
          <div className='text-center text-lg text-red-500'>
            {error?.message.map((message) => {
              return (
                <div key={message}>
                  {message} <br />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default StartPage;
