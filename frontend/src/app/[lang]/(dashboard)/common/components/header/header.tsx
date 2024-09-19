'use client';
import React, { useContext } from 'react';
import Profile from './Profile';
import { AuthContext } from '@/app/context/AuthContext';
import menuBurger from '../../../../../../../public/burgerMenu.svg';
import Image from 'next/image';
const AdminHeader = () => {
  const { isShow, IshowHandler, setReports } = useContext(AuthContext);

  return (
    // <div className="rounded-md shadow bg-white mt-2 mx-16 px-16 py-2 flex justify-end ">
    //   {/* <Profile /> */}
    // </div>

    <div className="h-[70px] border pr-2 w-screen sm:hidden  flex justify-end items-center">
      <Image
        src={menuBurger}
        alt=""
        onClick={() => {
          IshowHandler();
        }}
        className="h-[58px] w-[58px] cursor-pointer"
      />
    </div>
  );
};

export default AdminHeader;
