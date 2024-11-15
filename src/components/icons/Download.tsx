import type { ComponentPropsWithoutRef } from 'react';

export const DownloadIcon: React.FC<ComponentPropsWithoutRef<'svg'>> = (props) => {
  return (
    <svg fill='#000000' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M512 666.5L367.2 521.7l36.2-36.2 83 83V256h51.2v312.5l83-83 36.2 36.2L512 666.5zm-204.8 50.3V768h409.6v-51.2H307.2z' />
    </svg>
  );
};
