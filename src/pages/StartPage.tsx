import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { SignInForm, SignUpForm } from '../components';

export interface StartPageProps {}

const StartPage: React.FC<StartPageProps> = () => {
  const [showAuthorizationForm, setShowAuthorizationForm] = React.useState(true);
  const handleChangeForm = () => setShowAuthorizationForm(!showAuthorizationForm);

  const variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <>
      <div className='relative h-screen bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 blur-sm' />
      <section className='absolute inset-0 z-10 flex items-center justify-center'>
        <div className='flex w-full flex-col items-center justify-around gap-5 rounded-large border-y-2 border-solid border-gray-700 md:w-2/3 md:flex-row md:gap-0'>
          <div className='flex h-auto w-2/5 flex-col items-center justify-center p-4'>
            <h1 className='text-center text-5xl font-bold text-gray-800'>IPST Drive</h1>
            <p className='mt-4 text-center text-lg text-gray-600'>
              Drive is a cloud storage service for all your files and folders.
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
                  <SignInForm onChange={handleChangeForm} />
                </motion.div>
              ) : (
                <motion.div
                  key='signUp'
                  variants={variants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                >
                  <SignUpForm onChange={handleChangeForm} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartPage;
