import { Spinner } from '@nextui-org/react';

import { DriveItem } from '../DriveItem/DriveItem';

export interface DriveObserverProps {
  folder: GetFolderResponseDto | null;
}

export const DriveObserver: React.FC<DriveObserverProps> = ({ folder }) => {
  if (!folder)
    return (
      <div className='flex size-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  return (
    <>
      <div className='text-3xl capitalize'>{folder.folder.name}</div>
      <div className='grid h-[95%] w-full auto-cols-auto justify-around gap-4 overflow-y-auto p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <DriveItem
          children={{
            type: 'folder',
            id: folder.folder.parent_folder_id,
            name: '..',
            parent_folder_id: ''
          }}
        />
        {folder?.children.map((child) => <DriveItem key={child.id} children={child} />)}
      </div>
    </>
  );
};
