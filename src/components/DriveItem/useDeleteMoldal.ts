import { useDisclosure } from '@nextui-org/react';

export const useDeleteModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return {
    isOpenDeleteModal: isOpen,
    onOpenDeleteModal: onOpen,
    onOpenChangeDeleteModal: onOpenChange
  };
};
