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
import { useAuth } from '@/app/hooks/useAuth';
import TableSelect from './TableSelect';

interface IFormInput {
  createdAt: string;
  email: string;
  fullname: string;
  password: string;
  role: number | any;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface EditUserPros {
  lang?: any;
  refresh?: any;
  editUser?: any;
  users?: any[];
}

function EditUser({ lang, refresh, editUser, users }: EditUserPros) {
  const { state } = useContext(AdminContext);
  const { clientInfo } = state;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [getClientInfo, setGetClientInfo] = useState<IFormInput | any>();
  const { user } = useAuth();

  const {
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
    register,
    setValue,
  } = useForm<IFormInput>();

  // const watchedRole = watch('role');
  const email = watch('email');
  const fullname = watch('fullname');
  const role = watch('role');

  function replaceRoleWithValue(user: IFormInput | any) {
    switch (user?.role) {
      case 1:
        user.role = 'Admin';
        break;
      case 2:
        user.role = 'Viewer';
        break;
      case 3:
        user.role = 'Cleaner';
        break;
      case 4:
        user.role = 'Risk-manager';
        break;
      default:
        // Do nothing if role doesn't match any of the specified roles
        break;
    }
    return user;
  }

  const updatedUserObject = replaceRoleWithValue(clientInfo);
  // This is to handle my selected option
  const [selectedOption, setSelectedOption] = useState<string>('');
  // const [selectedOption, setSelectedOption] = useState('jamesro');

  useEffect(() => {
    setValue('fullname', clientInfo?.fullname!);
    setValue('email', clientInfo?.email!);
    setValue('role', clientInfo?.role!);
  }, [clientInfo]);

  function replaceRoleWithXtr(user: IFormInput | any) {
    switch (user?.role) {
      case 'Admin':
        user.role = 1;
        break;
      case 'Viewer':
        user.role = 2;
        break;
      case 'Cleaner':
        user.role = 3;
        break;
      case 'Risk-manager':
        user.role = 4;
        break;
      default:
        // Do nothing if role doesn't match any of the specified roles
        break;
    }
    return user;
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const updatedData = replaceRoleWithXtr(data);
    console.log(updatedData, 'this is my data');
    try {
      const response = await fetch(`/api/user/${clientInfo?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: user?.token!,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const newUser = {
          createdAt: clientInfo?.createdAt,
          email: email,
          fullname: fullname,
          password: clientInfo?.password,
          role: role,
          updatedAt: clientInfo?.updatedAt,
          __v: clientInfo?.__v,
          _id: clientInfo?._id,
        };
        editUser();
        toast.success(`This user was Succesfully Updated`);
        // refresh();
      } else {
        throw new Error(`Failed to update ${clientInfo?.fullname}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`This user could not be Updated!`);
    }
  };

  const options = ['Admin', 'Viewer', 'Cleaner', 'Risk-manager'];

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
              <TableSelect
                options={options}
                name="role"
                // defaultValue={selectedOption}
                // val={selectedOption}
                // setSelectedOption={setSelectedOption}
                props={register('role', { required: true })}
              />
            </div>
            {/* <div>
              <h1 className="font-bold">Role</h1>
              <InputField
                name="role"
                type="text"
                props={register('role', { required: true })}
              />
            </div> */}
          </div>
          <div className="flex gap-x-4 mb-4">
            <Button
              className="bg-primary"
              type="button"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button className="bg-primary" onClick={() => setOpenModal(false)}>
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
