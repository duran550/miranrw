'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '../button/Button';
import CustomModal from '../modal/Modal';
import InputField from '../forms/text-field/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import EditUserIcon from '../../../../public/icons/edit.svg';
import Image from 'next/image';
import { useContext } from 'react';
import { AdminContext } from '@/app/[lang]/(dashboard)/common/context/AdminContext';
import toast, { Toaster } from 'react-hot-toast';

interface IFormInput {
  createdAt: string;
  email: string;
  fullname: string;
  password: string;
  role: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface EditUserPros {
  lang?: any;
  refresh?: any;
}

function EditUser({ lang, refresh }: EditUserPros) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [getClientInfo, setGetClientInfo] = useState<IFormInput | any>();
  const {
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
    register,
    setValue,
  } = useForm<IFormInput>();

  const { state } = useContext(AdminContext);
  const { clientInfo } = state;
  useEffect(() => {
    setValue('fullname', clientInfo?.fullname!);
    setValue('email', clientInfo?.email!);
    setValue('role', clientInfo?.role!);
  }, [clientInfo]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch(`/api/user/${clientInfo?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success(`This user was Succesfully Updated`);
        refresh();
      } else {
        throw new Error(`Failed to update ${clientInfo?.fullname}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`This user could not be Updated!`);
    }
  };

  console.log(clientInfo, 'this is my client info');

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <CustomModal
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        classStyle="text-black"
        showFooter={false}
        positon="center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 pb-5">
            <div className="">
              <h1 className="font-bold">Full Name</h1>
              <InputField
                name="fullname"
                type="text"
                props={register('fullname', { required: true })}
              />
            </div>
            <div>
              <h1 className="font-bold">Email</h1>
              <InputField
                name="email"
                type="email"
                props={register('email', { required: true })}
              />
            </div>
            <div>
              <h1 className="font-bold">Role</h1>
              <InputField
                name="role"
                type="number"
                props={register('role', { required: true })}
              />
            </div>
          </div>
          <div className="flex gap-x-4 mb-4">
            <Button className="bg-black" type="button">
              Cancel
            </Button>
            <Button className="bg-black" onClick={() => setOpenModal(false)}>
              Update User
            </Button>
          </div>
        </form>
      </CustomModal>

      <div>
        <Image
          className="cursor-pointer"
          src={EditUserIcon}
          alt="edit"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
    </div>
  );
}

export default EditUser;
