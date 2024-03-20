'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '../button/Button';
import CustomModal from '../modal/Modal';
import InputField from '../forms/text-field/InputField';
import { useForm } from 'react-hook-form';
import EditUserIcon from '../../../../public/icons/edit.svg';
import Image from 'next/image';

interface IFormInput {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function EditUser({ lang }: any) {
  const [openModal, setOpenModal] = useState<boolean>(false);
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
      >
        <form>
          <div className="space-y-5 pb-5">
            <div className="">
              <h1 className="font-bold">Full Name</h1>
              <InputField name="username" />
            </div>
            <div>
              <h1 className="font-bold">Email</h1>
              <InputField name="username" />
            </div>
            <div>
              <h1 className="font-bold">Password</h1>
              <InputField name="username" />
            </div>
            <div>
              <h1 className="font-bold">Confirm Password</h1>
              <InputField name="username" />
            </div>
          </div>
          <div className="flex gap-x-4 mb-4">
            <Button className="bg-black">Save User</Button>
            <Button className="bg-black">Cancel</Button>
          </div>
        </form>
      </CustomModal>

      <div>
        <Image
          className="cursor-pointer w-5"
          src={EditUserIcon}
          alt="edit"
          onClick={() => setOpenModal(true)}
        />
      </div>
    </div>
  );
}

export default EditUser;
