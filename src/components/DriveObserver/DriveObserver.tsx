import { Spinner } from '@nextui-org/react';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import type { ChildDataType } from '../DriveItem/DriveItem';
import { DriveItem } from '../DriveItem/DriveItem';

export interface DriveObserverProps {
  folder: GetFolderResponseDto | null;
  handleMoveFolder: (id: string, newParent: string) => Promise<void>;
  handleRenameFolder: (id: string, name: string) => Promise<void>;
  handleDeleteFolder: (id: string) => Promise<void>;
  handleDeleteFile: (id: string) => Promise<void>;
}

export const DriveObserver: React.FC<DriveObserverProps> = ({
  folder,
  handleMoveFolder,
  handleRenameFolder,
  handleDeleteFile,
  handleDeleteFolder
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, child: ChildDataType) => {
    e.dataTransfer?.setData('draggedFolder', JSON.stringify(child));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.id === 'drive-item-card') {
      target.style.border = 'solid 2px blue';
    } else {
      const closestCard = target.closest('#drive-item-card');
      if (closestCard) {
        (closestCard as HTMLDivElement).style.border = 'solid 2px blue';
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.id === 'drive-item-card') {
      target.style.border = 'none';
    } else {
      const closestCard = target.closest('#drive-item-card');
      if (closestCard) {
        (closestCard as HTMLDivElement).style.border = 'none';
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, child: ChildDataType) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    const draggedFolder = JSON.parse(e.dataTransfer.getData('draggedFolder')) as ChildFolderDto;
    if (
      draggedFolder.parent_folder_id !== child.id &&
      draggedFolder.id !== child.id &&
      child.type !== 'file'
    ) {
      handleMoveFolder(draggedFolder.id, child.id).catch((error: AxiosError<ErrorDto>) =>
        error.response?.data.message.map((error) => {
          return toast.error(error, {
            style: { fontSize: '1rem' }
          });
        })
      );
    }
    if (target.id === 'drive-item-card') {
      target.style.border = 'none';
    } else {
      const closestCard = target.closest('#drive-item-card');
      if (closestCard) {
        (closestCard as HTMLDivElement).style.border = 'none';
      }
    }
  };

  if (!folder)
    return (
      <div className='flex size-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  const backFolder = {
    type: 'folder',
    id: folder.folder.parent_folder_id,
    name: '..',
    parent_folder_id: ''
  } as ChildFolderDto;
  return (
    <>
      <div className='text-3xl capitalize'>{folder.folder.name}</div>
      <div className='grid h-[95%] w-full auto-cols-auto place-items-center gap-4 overflow-y-auto p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div
          onDrop={(e) => handleDrop(e, backFolder)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragLeave}
          onDragLeave={handleDragLeave}
        >
          <DriveItem
            children={backFolder}
            handleRenameFolder={handleRenameFolder}
            handleDeleteFile={handleDeleteFile}
            handleDeleteFolder={handleDeleteFolder}
          />
        </div>

        {folder?.children.map((child) => (
          <div
            key={child.id}
            draggable={child.type === 'folder'}
            onDragStart={(e) => handleDragStart(e, child)}
            onDrop={(e) => handleDrop(e, child)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragLeave}
          >
            <DriveItem
              children={child}
              key={child.id}
              handleRenameFolder={handleRenameFolder}
              handleDeleteFile={handleDeleteFile}
              handleDeleteFolder={handleDeleteFolder}
            />
          </div>
        ))}
      </div>
    </>
  );
};
