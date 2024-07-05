import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

import { getFile } from '../../utils/api/requests/drive/get/file';
import { DownloadIcon, FileIcon, FolderIcon } from '../icons';

type ChildDataType = ChildFileDto | ChildFolderDto;
export interface DriveItemProps {
  children: ChildDataType;
}

export const DriveItem: React.FC<DriveItemProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div
      onDoubleClick={() => {
        if (children.type === 'folder') navigate(`/drive?folder_id=${children.id}`);
      }}
      className='relative flex h-72 w-64 flex-col items-center justify-between gap-2 self-center justify-self-center rounded-3xl bg-white p-2 shadow-lg hover:bg-gray-300'
    >
      <div>
        {children.type === 'file' && <FileIcon width={200} />}
        {children.type === 'folder' && <FolderIcon width={200} />}
      </div>
      <h3 className='text-center text-xl'>{children.name}</h3>
      {children.type === 'file' && (
        <Button
          isIconOnly
          variant='ghost'
          className='absolute bottom-0 right-1 border-none'
          onPress={() => {
            getFile({ params: { id: children.file_path } })
              .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${children.name}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return 0;
              })
              .catch((error) => {
                console.error('Error downloading the file', error);
              });
          }}
        >
          <DownloadIcon width={40} />
        </Button>
      )}
    </div>
  );
};
