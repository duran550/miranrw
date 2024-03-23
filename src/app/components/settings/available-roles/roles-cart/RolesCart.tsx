'use client';

import React, { useEffect, useState } from 'react';
import { PersonSubtract, PersonAvailable, Glasses, PersonStar } from './icons';
import { getAllUsers } from '@/services/userService';
interface clientInfoProps {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  role: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const roleData = [
  {
    id: 1,
    role: 'Super Admin',
    icon: PersonSubtract,
  },
  {
    id: 2,
    role: 'Viewer',
    icon: Glasses,
  },
  {
    id: 3,
    role: 'Cleaner',
    icon: PersonAvailable,
  },
  {
    id: 4,
    role: 'Risk Manager',
    icon: PersonSubtract,
  },
];

const RolesCart = () => {
  const [getUsers, setGetUsers] = useState<clientInfoProps[] | any>([]);

  // get All Clients
  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getAllUsers();
        setGetUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  // filter array based on roles.
  const roles: number[] = getUsers.map((user: any) => user.role);
  // get superAdmin role
  const superAdmin: number[] = roles.filter((role) => role === 1);
  // get Viewers role
  const viewers: number[] = roles.filter((role) => role === 2);
  // get clearners role
  const cleaners: number[] = roles.filter((role) => role === 3);
  // get riskManager role
  const riskManager: number[] = roles.filter((role) => role === 4);

  // new roles array based on role type
  const roleAmount = [
    superAdmin.length,
    viewers.length,
    cleaners.length,
    riskManager.length,
  ];

  // adding roleAmount to role data
  const updatedArray = roleData.map((item, index) => {
    return {
      ...item,
      acc: roleAmount[index],
    };
  });

  return (
    <div>
      <div className="sm:flex sm:flex-row flex-col  mb-10 sm:gap-x-4 space-y-4 sm:space-y-0">
        {updatedArray.map((data) => (
          <div
            key={data.id}
            className="border border-[#C9D2D3] flex items-center p-4 rounded-lg w-[250px] justify-between"
          >
            <div className="">
              <small className="text-sm lg:text-base ">
                {data.acc} Accounts
              </small>
              <h1 className="text-sm lg:text-base ">{data.role}</h1>
            </div>
            <div>
              <data.icon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesCart;
