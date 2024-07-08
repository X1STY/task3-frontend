import { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { toast, Toaster } from 'sonner';

import { DriveObserver } from '../components/DriveObserver/DriveObserver';
import { Header } from '../components/layout/Header/Header';
import { SideBar } from '../components/layout/SideBar/SideBar';
import { deleteFileId } from '../utils/api/requests/drive/delete/fileId';
import { deleteFolderId } from '../utils/api/requests/drive/delete/folderId';
import { getFolderId } from '../utils/api/requests/drive/get/folderId';
import { patchFolderId } from '../utils/api/requests/drive/patch/folderId';
import { postFile } from '../utils/api/requests/drive/post/file';
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
      error.response?.data.message.map((error) =>
        toast.error(error, {
          closeButton: true,
          style: { fontSize: '1rem' }
        })
      );
    });
  }, [query]);

  const handleAddNewFolder = async (name: string) => {
    await postFolder({
      params: { parent_folder_id: currentFolder!.folder.id, name }
    })
      .then((response) => {
        return setCurrentFolder((prev) => {
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
      })
      .catch((error: AxiosError<ErrorDto>) => {
        error.response?.data.message.map((error) =>
          toast.error(error, {
            closeButton: true,
            style: { fontSize: '1rem' }
          })
        );
      });
  };

  const handleAddNewFile = async (file: File) => {
    const response = await postFile({
      params: { parent_folder_id: currentFolder!.folder.id, file }
    });
    if (response) {
      setCurrentFolder((prev) => {
        return {
          ...prev!,
          children: [
            ...prev!.children,
            {
              ...response.data.file,
              type: 'file'
            }
          ]
        };
      });
    }
  };

  const handleMoveFolder = async (id: string, newParent: string) => {
    const res = await patchFolderId({ params: { id, new_parent_folder_id: newParent } });
    if (res.status === 200) {
      setCurrentFolder((prev) => ({
        ...prev!,
        children: prev!.children.filter((item) => item.id !== id)
      }));
    }
  };

  const handleRenameFolder = async (id: string, name: string) => {
    const res = await patchFolderId({ params: { id, new_name: name } });
    if (res.status === 200) {
      setCurrentFolder((prev) => ({
        ...prev!,
        children: prev!.children.map((item) => (item.id === id ? { ...item, name } : item))
      }));
    }
  };

  const handleDeleteFolder = async (id: string) => {
    const res = await deleteFolderId({ params: { id } });
    if (res.status === 200) {
      setCurrentFolder((prev) => ({
        ...prev!,
        children: prev!.children.filter((item) => item.id !== id)
      }));
    }
  };
  const handleDeleteFile = async (id: string) => {
    const res = await deleteFileId({ params: { id } });
    if (res.status === 200) {
      setCurrentFolder((prev) => ({
        ...prev!,
        children: prev!.children.filter((item) => item.id !== id)
      }));
    }
  };

  return (
    <>
      <div className='flex size-full h-screen flex-col overflow-hidden bg-sky-100'>
        <Header />
        <div className='flex h-full flex-row justify-between p-4'>
          <div className='flex w-2/12 items-start justify-center'>
            <SideBar handleAddNewFolder={handleAddNewFolder} handleAddNewFile={handleAddNewFile} />
          </div>
          <div className='h-[90%] w-10/12 rounded-3xl bg-white p-4'>
            <DriveObserver
              folder={currentFolder}
              handleMoveFolder={handleMoveFolder}
              handleRenameFolder={handleRenameFolder}
              handleDeleteFile={handleDeleteFile}
              handleDeleteFolder={handleDeleteFolder}
            />
          </div>
        </div>
      </div>
      <Toaster theme='light' richColors />
    </>
  );
};

export default DrivePage;
