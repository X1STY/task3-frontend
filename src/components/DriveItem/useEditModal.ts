import { useDisclosure } from '@nextui-org/react';

export const useEditModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return {
    isOpenEditModal: isOpen,
    onOpenEditModal: onOpen,
    onOpenChangeEditModal: onOpenChange
  };
};
