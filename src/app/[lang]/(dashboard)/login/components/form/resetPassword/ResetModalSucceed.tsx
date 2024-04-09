import CustomModal from '@/app/components/modal/Modal';
import React from 'react';
import Image from 'next/image';
import Tick from '../../../../../../../../public/icons/tick.svg';

interface ResetModalSucceedProps {
  setOpenModal: () => void;
  openModal: boolean;
}

const ResetModalSucceed: React.FC<ResetModalSucceedProps> = ({
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
          <Image src={Tick} alt="tick" className="m-auto" />
          <h1 className="text-center font-bold text-2xl">Password Reseted</h1>
          <p className="text-center">
            Please Check your email and open Link sent to you
          </p>
        </CustomModal>
      </div>
    </div>
  );
};

export default ResetModalSucceed;
