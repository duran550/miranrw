'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '../button/Button';
import CustomModal from '../modal/Modal';
import InputField from '../forms/text-field/InputField';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import SeeDetailsIcon from '../../../../public/icons/see.svg';
import { useContext } from 'react';
import { AdminContext } from '@/app/[lang]/(dashboard)/common/context/AdminContext';

interface IFormInput {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SeedetailsProps {
  lang?: any;
}

function SeeDetails({ lang }: SeedetailsProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  // console.log(data, 'this is my data');
  const { state } = useContext(AdminContext);
  const { clientInfo } = state;

  const {
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });

  return (
    <div>
      <CustomModal
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        classStyle="text-black"
        showFooter={false}
        positon="center"
      >
        <div>
          <h1>my name is {clientInfo?.fullname}</h1>
          <h1>Created At {clientInfo?.createdAt}</h1>
        </div>
      </CustomModal>

      <div>
        {/* <Button
          onClick={() => setOpenModal(true)}
          className="w-fit font-bold bg-green-400"
        >
          Add User
        </Button> */}
        <Image
          className="cursor-pointer"
          src={SeeDetailsIcon}
          alt="delete"
          onClick={() => setOpenModal(true)}
        />
      </div>
    </div>
  );
}

export default SeeDetails;
