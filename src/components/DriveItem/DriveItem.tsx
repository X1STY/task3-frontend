import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { getFile } from '../../utils/api/requests/drive/get/fileId';
import { DownloadIcon, FileIcon, FolderIcon, OptionsIcon } from '../icons';

import { useDeleteModal } from './useDeleteMoldal';
import { useEditModal } from './useEditModal';

export type ChildDataType = ChildFileDto | ChildFolderDto;
export interface DriveItemProps {
  children: ChildDataType;
  handleRenameFolder: (id: string, name: string) => Promise<void>;
  handleDeleteFolder: (id: string) => Promise<void>;
  handleDeleteFile: (id: string) => Promise<void>;
}

export const DriveItem: React.FC<DriveItemProps> = ({
  children,
  handleRenameFolder,
  handleDeleteFile,
  handleDeleteFolder
}) => {
  const { isOpenEditModal, onOpenChangeEditModal, onOpenEditModal } = useEditModal();
  const { isOpenDeleteModal, onOpenChangeDeleteModal, onOpenDeleteModal } = useDeleteModal();

  const [newFolderName, setNewFolderName] = useState('');
  const navigate = useNavigate();
  return (
    <>
      <div
        id={children.type === 'folder' ? 'drive-item-card' : ''}
        onDoubleClick={() => {
          if (children.type === 'folder') navigate(`/drive?folder_id=${children.id}`);
        }}
        className='relative flex h-72 w-64 flex-col items-center gap-2 rounded-3xl bg-white p-2 shadow-lg hover:bg-gray-200'
      >
        <div>
          {children.type === 'file' && <FileIcon width={200} />}
          {children.type === 'folder' && <FolderIcon width={200} />}
        </div>
        <h3 className='text-center text-xl'>{children.name}</h3>
        {children.name !== '..' && (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant='bordered' className='absolute right-1 top-0 border-none'>
                <OptionsIcon width={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions'>
              {children.type === 'folder' ? (
                <DropdownItem
                  onPress={() => {
                    onOpenEditModal();
                    setNewFolderName(children.name);
                  }}
                  key='edit'
                >
                  Edit folder
                </DropdownItem>
              ) : (
                <DropdownItem key='edit' className='hidden'>
                  Edit file
                </DropdownItem>
              )}
              <DropdownItem
                key='delete'
                className='text-danger'
                color='danger'
                onPress={onOpenDeleteModal}
              >
                Delete {children.type === 'file' ? 'file' : 'folder'}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
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
                  if (error instanceof AxiosError) {
                    toast.error("File couldn't be downloaded", {
                      style: { fontSize: '1rem' }
                    });
                  }
                });
            }}
          >
            <DownloadIcon width={40} />
          </Button>
        )}
      </div>
      <Modal isOpen={isOpenEditModal} onOpenChange={onOpenChangeEditModal} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Change folder name</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).select();
                  }}
                  isClearable
                  placeholder='Enter folder name'
                  value={newFolderName}
                  onValueChange={setNewFolderName}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={() => {
                    onClose();
                    setNewFolderName('');
                  }}
                >
                  Close
                </Button>
                <Button
                  onPress={() => {
                    handleRenameFolder(children.id, newFolderName).catch(
                      (error: AxiosError<ErrorDto>) => {
                        error.response?.data.message.map((error) => {
                          return toast.error(error, {
                            style: { fontSize: '1rem' }
                          });
                        });
                      }
                    );
                    onClose();
                  }}
                  color='secondary'
                >
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenDeleteModal} onOpenChange={onOpenChangeDeleteModal} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confrim deletion</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete {children.name}{' '}
                  {children.type === 'file' ? 'file' : 'folder'}?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='default'
                  variant='light'
                  onPress={() => {
                    onClose();
                    setNewFolderName('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    if (children.type === 'file') {
                      handleDeleteFile(children.id).catch((error: AxiosError<ErrorDto>) => {
                        error.response?.data.message.map((error) => {
                          return toast.error(error, {
                            style: { fontSize: '1rem' }
                          });
                        });
                      });
                    }
                    if (children.type === 'folder') {
                      handleDeleteFolder(children.id).catch((error: AxiosError<ErrorDto>) => {
                        error.response?.data.message.map((error) => {
                          return toast.error(error, {
                            style: { fontSize: '1rem' }
                          });
                        });
                      });
                    }
                    onClose();
                  }}
                  color='danger'
                >
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
