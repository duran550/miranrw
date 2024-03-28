import React, { FC, useState } from 'react';
import CustomModal from '@/app/components/modal/Modal';
import AnimateClick from '@/app/components/animate-click/AnimateClick';
import { useFindReport } from '@/app/hooks/useFindReport';
import ToastTick from '../../../../../public/icons/tickToast.svg';
import modalCancel from '../../../../../public/icons/modalCancel.svg';
import Image from 'next/image';
import InputField from '../../forms/text-field/InputField';
import { Button } from '../../button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthService from '@/services/authService';
import toast, { Toaster } from 'react-hot-toast';

interface ClientDataProps {
  onClose: () => void;
  isOpen: boolean;
  data?: string | any;
  refresh?: any;
}

interface IFormInput {
  fullname: string;
  password: string;
  email: string;
  role: number;
}

const AddUser: FC<ClientDataProps> = ({ onClose, isOpen, data, refresh }) => {
  const {
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
    register,
  } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = new AuthService().register(data);
    try {
      const result = await response;
      if (result.status === 201) {
        refresh();
        console.log(result, 'this is my result');
        toast.success(`This user was Succesfully Added`);
      }
    } catch (error) {
      console.log(error, 'this is an error');
      toast.error(`This user was Could not be added`);
    }
    reset();
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <CustomModal
        onClose={onClose}
        isOpen={isOpen}
        positon="center"
        hideCloseButton={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 pb-5 mt-10">
            <div className="">
              <h1 className="font-bold">Full Name</h1>
              <InputField
                name="username"
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
              <h1 className="font-bold">Password</h1>
              <InputField
                name="password"
                type="password"
                props={register('password', { required: true })}
              />
            </div>
            <div>
              <h1 className="font-bold">Role</h1>
              <InputField
                name="role"
                type="text"
                props={register('role', { required: true })}
              />
            </div>
          </div>
          <div className="flex gap-x-4 mb-4">
            <Button
              type="button"
              className="bg-black"
              onClick={() => {
                onClose(), reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black"
              onClick={() => {
                onClose();
              }}
            >
              Save User
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default AddUser;
