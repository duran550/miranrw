'use client';

import React, { FC, useEffect, useState } from 'react';
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
import Password from 'antd/es/input/Password';
import { getAllUsers } from '@/services/userService';
import { useAuth } from '@/app/hooks/useAuth';

interface ClientDataProps {
  onClose: () => void;
  isOpen: boolean;
  data?: string | any;
  refresh?: any;
  addUser?: any;
}

interface IFormInput {
  fullname: string;
  password: string;
  email: string;
  role: any;
}

interface ClientInfoProps {
  createdAt: string;
  email: string;
  fullname: string;
  password: string;
  role: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

const AddUser: FC<ClientDataProps> = ({
  onClose,
  isOpen,
  data,
  refresh,
  addUser,
}) => {
  const {
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
    register,
  } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });
  const [getUsers, setGetUsers] = useState<ClientInfoProps[] | any>([]);
  const { user } = useAuth();

  const validatePassword = (value: any) => {
    if (!value) {
      return 'Password is required';
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        value
      )
    ) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long';
    }
    if (value.length < 5) {
      return 'Password must be at least 8 characters long';
    }
    return true;
  };

  // Function to replace role with numeric values
  function replaceRoleWithValue(user: IFormInput) {
    switch (user.role) {
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

  useEffect(() => {
    async function fetchUsers(token: string) {
      try {
        const usersData = await getAllUsers(token);
        setGetUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    if (refresh || getUsers.length < 1) {
      fetchUsers(user?.token!);
      //  setRefresh(false);
    }
    // setClientInfo(selectedCell);
  }, [getUsers]);

  console.log(getUsers, 'this is my allUsers');

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const updatedUserObject = replaceRoleWithValue(data);
    const response = new AuthService()
      .register(updatedUserObject)
      .then((result) => {
        if (result.status === 201) {
          // refresh();
          // console.log(result?.data.result, 'this is my response');
          toast.success(`This user was Succesfully Added`);
          addUser(result?.data.result);
          // setGetUsers([...result?.data.result]);
        }
      })
      .catch((error) => {
        console.log(error, 'this is an error');
        toast.error(`This user was Could not be added`);
      });
    // console.log(data, 'this is my submit data');
    // try {
    //   const result = await response;
    //   if (result.status === 201) {
    //     // refresh();
    //     console.log(response, 'this is my response');
    //     toast.success(`This user was Succesfully Added`);
    //   }
    // } catch (error) {
    //   console.log(error, 'this is an error');
    //   toast.error(`This user was Could not be added`);
    // }
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
                props={register('password', {
                  required: true,
                  validate: validatePassword,
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div>
              <h1 className="font-bold">Role</h1>
              <InputField
                name="role"
                type="text"
                props={register('role', {
                  required: true,
                  pattern: /^(Admin|Cleaner|Viewer|Risk-Manager)$/i, // Regex pattern for allowed values
                })}
              />
              {errors.role && errors.role.type === 'pattern' && (
                <span className="text-red-500">
                  Please enter a valid role (Admin, Cleaner, Viewer,
                  Risk-Manager).
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-x-4 mb-4">
            <Button
              type="button"
              className="bg-primary"
              onClick={() => {
                onClose(), reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary"
              onClick={() => {
                onClose();
              }}
              disabled={!isValid}
              style={{ opacity: isValid ? 1 : 0.5 }}
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
