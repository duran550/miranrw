import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Modal,
} from '@nextui-org/react';
import React from 'react';
import { ModalPropsType } from './modal';
import { Button } from '../button/Button';

const CustomModal: React.FC<ModalPropsType & ModalProps> = ({
  children,
  title,
  isOpen,
  closeButtonTitle,
  validateButtonTitle,
  onClose,
  classStyle,
  iconTitle,
  onValidateButton,
  showFooter,
  positon,
  hideCloseButton,
  modalClass,
  isDismissable,
  size
}) => {
  return (
    <Modal
      className={classStyle}
      isOpen={isOpen}
      onClose={onClose}
      placement={positon}
      backdrop="blur"
      size={size}
      hideCloseButton={hideCloseButton}
      isKeyboardDismissDisabled={false}
      isDismissable={isDismissable}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1 ml-[2%] font-[900] text-2xl">
                {title}
              </ModalHeader>
            )}
            <ModalBody className={modalClass}>{children}</ModalBody>

            {showFooter ? (
              <ModalFooter>
                <Button
                  // disabled={  }
                  // variant={'mainColor'}
                  // icon={ bulk_messageIcon }
                  // rightIcon={ true }
                  // leftIcon={ true }
                  // iconSize={30}
                  onClick={onClose}
                >
                  {validateButtonTitle}
                </Button>
              </ModalFooter>
            ) : (
              ''
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
