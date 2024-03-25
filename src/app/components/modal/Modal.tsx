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
}) => {
  return (
    <Modal
      className={classStyle}
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      placement={positon}
      hideCloseButton={hideCloseButton}
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
                {/* {closeButtonTitle && (
                    <Button variant="secondary" onClick={onClose}>
                      {closeButtonTitle}
                    </Button>
                  )}
                  {validateButtonTitle && (
                    <Button onClick={onValidateButton}>
                      {validateButtonTitle}
                    </Button>
                  )} */}
                <Button
                  // disabled={  }
                  // variant={'mainColor'}
                  // icon={ bulk_messageIcon }
                  // rightIcon={ true }
                  // leftIcon={ true }
                  // iconSize={30}
                  onClick={onClose}
                  className="w-[15%]"
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
