import type { ComponentPropsWithoutRef } from 'react';

export const PlusIcon: React.FC<ComponentPropsWithoutRef<'svg'>> = (props) => {
  return (
    <svg fill='#000000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M11,17V13H7a1,1,0,0,1,0-2h4V7a1,1,0,0,1,2,0v4h4a1,1,0,0,1,0,2H13v4a1,1,0,0,1-2,0Z' />
    </svg>
  );
};
