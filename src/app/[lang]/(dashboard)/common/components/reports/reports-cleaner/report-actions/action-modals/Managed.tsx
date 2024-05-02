import React, { FC, useState } from 'react';
import CustomModal from '@/app/components/modal/Modal';
import AnimateClick from '@/app/components/animate-click/AnimateClick';
import { useFindReport } from '@/app/hooks/useFindReport';
import ToastTick from '../../../../../../../../../../public/icons/tickToast.svg';
import modalCancel from '../../../../../../../../../../public/icons/modalCancel.svg';
import Image from 'next/image';

interface ClientDataProps {
  onClose: () => void;
  isOpen: boolean;
  data?: string | any;
  refresh?: any;
}

const Managed: FC<ClientDataProps> = ({ onClose, isOpen, data }) => {
  return (
    <CustomModal
      onClose={onClose}
      isOpen={isOpen}
      positon="top"
      hideCloseButton={true}
      modalClass="p-0 m-0"
    >
      <div className="flex h-20 border-l-[10px] border-green-500 justify-between px-4">
        <div className="flex items-center gap-x-4">
          <h1 className="font-bold text-xl text-gray-400">
            Mark as Managed
          </h1>
          <Image src={ToastTick} alt="tost click" className="w-6" />
        </div>
        <Image
          src={modalCancel}
          alt="cancelmodal"
          onClick={onClose}
          className="cursor-pointer"
        />
      </div>
    </CustomModal>
  );
};

export default Managed;
