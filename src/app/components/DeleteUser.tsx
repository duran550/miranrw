'use client';

import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
// import CustomModal from '../modal/Modal';
// import { Button } from '../button/Button';
import DeleteIcon from '../../../../public/icons/del.svg';
import Image from 'next/image';
import { getAllUsers } from '@/services/userService';
import { AdminContext } from '@/app/[lang]/(dashboard)/common/context/AdminContext';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/app/hooks/useAuth';
import { Button } from './button/Button';
import CustomModal from './modal/Modal';

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

interface DelUserPros {
  lang?: any;
  refresh?: any;
}

function DeleteUser({ lang, refresh }: DelUserPros) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [getUsers, setGetUsers] = useState<ClientInfoProps[] | any>([]);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const { user }=useAuth()

  // get unique user id
  const { state } = useContext(AdminContext);
  const { clientInfo } = state;



  // get All Clients
  useEffect(() => {
    
    async function fetchUsers(token:string) {
      try {
        const usersData = await getAllUsers(token);
        setGetUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers(user?.token!);
  }, [deletedUserId]);

  // code to delete user
  const deleteUser = async (userId: any) => {
   
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
          authorization: user?.token!,
        },
      });

      if (response.ok) {
        toast.success(`This user was Succesfully Deleted!`);
        setGetUsers(
          getUsers.filter((user: ClientInfoProps) => user._id !== userId)
        );
        refresh();
      } else {
        throw (
          (new Error('Failed to delete user'),
          toast.error(
            'This user could not be deleted, please Check your connection and try again!'
          ))
        );
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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
        <div className="flex justify-around p-10">
          <Button
            onClick={() => {
              setOpenModal(false), deleteUser(clientInfo?._id);
            }}
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
