import { useRef, useState } from 'react';
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
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';

import { NewFileIcon, NewFolderIcon, PlusIcon } from '../../icons';

export interface SideBarProps {
  handleAddNewFolder: (name: string) => Promise<void>;
}

export const SideBar: React.FC<SideBarProps> = ({ handleAddNewFolder }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState('');
  return (
    <>
      <div className='flex size-full flex-col items-center justify-start'>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered' color='secondary' startContent={<PlusIcon width={48} />}>
              Create
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Static Actions'>
            <DropdownItem
              onPress={onOpen}
              key='new_folder'
              startContent={<NewFolderIcon width={40} />}
            >
              <span className='text-xl'>New folder</span>
            </DropdownItem>
            <DropdownItem
              onClick={() => ref.current?.click()}
              key='new_file'
              startContent={<NewFileIcon width={40} />}
            >
              <input type='file' className='hidden' ref={ref} />
              <span className='text-xl'>New file</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Add new folder</ModalHeader>
              <ModalBody>
                <Input isClearable placeholder='Folder name' value={name} onValueChange={setName} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={() => {
                    onClose();
                    setName('');
                  }}
                >
                  Close
                </Button>
                <Button
                  color='secondary'
                  onPress={() => {
                    handleAddNewFolder(name).catch((err) => console.error(err));
                    onClose();
                    setName('');
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
