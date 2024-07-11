'use client'
import React, { useState } from 'react';
import ClientTable from './clientTable/ClientTable';
import RolesCart, { clientInfoProps } from './available-roles/roles-cart/RolesCart';

const Settings = () => {
  const [users, setUsers] = useState<clientInfoProps[]>([]);
  const getUserHandler = (users: clientInfoProps[]) => {
    setUsers(users);
  };
  return (
    <div>
      <RolesCart users={users} />
      <ClientTable getUserHandler={getUserHandler} />
    </div>
  );
};

export default Settings;
