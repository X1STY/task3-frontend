import { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';

import { DriveObserver } from '../components/DriveObserver/DriveObserver';
import { Header } from '../components/layout/Header/Header';
import { SideBar } from '../components/layout/SideBar/SideBar';
import { getFolderId } from '../utils/api/requests/drive/get/folderId';
import { postFolder } from '../utils/api/requests/drive/post/folder';
import { useQuery } from '../utils/hook/useQuery';

export interface DrivePageProps {}

const DrivePage: React.FC<DrivePageProps> = () => {
  const [currentFolder, setCurrentFolder] = useState<GetFolderResponseDto | null>(null);
  const query = useQuery();

  useEffect(() => {
    const id = query.get('folder_id') ?? 'root';
    async function getFolder() {
      await getFolderId({ params: { id } }).then((res) => setCurrentFolder(res.data));
    }
    getFolder().catch((error: AxiosError<ErrorDto>) => {
      console.error(error);
    });
  }, [query]);

  const handleAddNewFolder = async (name: string) => {
    const response = await postFolder({
      params: { parent_folder_id: currentFolder!.folder.id, name }
    });
    if (response) {
      setCurrentFolder((prev) => {
        return {
          ...prev!,
          children: [
            ...prev!.children,
            {
              ...response.data.folder,
              type: 'folder'
            }
          ]
        };
      });
    }
  };

  return (
    <div className='flex size-full h-screen flex-col overflow-hidden bg-sky-100'>
      <Header />
      <div className='flex h-full flex-row justify-between p-4'>
        <div className='flex w-2/12 items-start justify-center'>
          <SideBar handleAddNewFolder={handleAddNewFolder} />
        </div>
        <div className='h-[90%] w-10/12 rounded-3xl bg-white p-4'>
          <DriveObserver folder={currentFolder} />
        </div>
      </div>
    </div>
  );
};

export default DrivePage;
