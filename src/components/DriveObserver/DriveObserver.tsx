import { Spinner } from '@nextui-org/react';

import type { ChildDataType } from '../DriveItem/DriveItem';
import { DriveItem } from '../DriveItem/DriveItem';

export interface DriveObserverProps {
  folder: GetFolderResponseDto | null;
  handleMoveFolder: (id: string, newParent: string) => void;
}

export const DriveObserver: React.FC<DriveObserverProps> = ({ folder, handleMoveFolder }) => {
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
    if (draggedFolder.parent_folder_id !== child.id) {
      handleMoveFolder(draggedFolder.id, child.id);
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
  return (
    <>
      <div className='text-3xl capitalize'>{folder.folder.name}</div>
      <div className='grid h-[95%] w-full auto-cols-auto place-items-center gap-4 overflow-y-auto p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div
          onDrop={(e) =>
            handleDrop(e, {
              type: 'folder',
              id: folder.folder.parent_folder_id,
              name: '..',
              parent_folder_id: ''
            })
          }
          onDragOver={handleDragOver}
          onDragEnd={handleDragLeave}
          onDragLeave={handleDragLeave}
        >
          <DriveItem
            children={{
              type: 'folder',
              id: folder.folder.parent_folder_id,
              name: '..',
              parent_folder_id: ''
            }}
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
            <DriveItem children={child} key={child.id} />
          </div>
        ))}
      </div>
    </>
  );
};
