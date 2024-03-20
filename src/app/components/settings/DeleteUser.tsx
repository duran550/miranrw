'use client';

import React from 'react';
import { useState } from 'react';
import CustomModal from '../modal/Modal';
import { Button } from '../button/Button';
import DeleteIcon from '../../../../public/icons/del.svg';
import Image from 'next/image';

function DeleteUser({ lang }: any) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div>
      <CustomModal
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        classStyle="text-black"
        showFooter={false}
      >
        <div className="flex justify-around p-10">
          <Button
            onClick={() => setOpenModal(true)}
            className="w-fit font-bold bg-green-400"
          >
            Delete User
          </Button>
          <Button
            onClick={() => setOpenModal(false)}
            className="w-fit font-bold bg-green-400"
          >
            cancel
          </Button>
        </div>
      </CustomModal>

      <div>
        {/* <Button
          onClick={() => setOpenModal(true)}
          className="w-fit font-bold bg-green-400"
        >
          Delete User
        </Button> */}
        <Image
          className="cursor-pointer"
          src={DeleteIcon}
          alt="del"
          onClick={() => setOpenModal(true)}
        />
      </div>
    </div>
  );
}

export default DeleteUser;
