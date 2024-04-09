import CustomModal from '@/app/components/modal/Modal';
import React from 'react';
import Image from 'next/image';
import Fail from '../../../../../../../../public/icons/fail.svg';
import { Button } from '@/app/components/button/Button';
import Link from 'next/link';

interface ResetModalFailedProps {
  setOpenModal: () => void;
  openModal: boolean;
}

const ResetModalFailed: React.FC<ResetModalFailedProps> = ({
  setOpenModal,
  openModal,
}) => {
  return (
    <div>
      <div>
        <CustomModal
          onClose={setOpenModal}
          isOpen={openModal}
          classStyle="text-black"
          showFooter={false}
          positon="center"
        >
          <Image src={Fail} alt="tick" className="m-auto" />
          <h1 className="text-center font-bold text-2xl">Link was not sent</h1>
          <p className="text-center">
            Either your email does not exist in the system or an error occured
          </p>
          <Button className="bg-primary mb-5" onClick={setOpenModal}>
            Retry
          </Button>
        </CustomModal>
      </div>
    </div>
  );
};

export default ResetModalFailed;
