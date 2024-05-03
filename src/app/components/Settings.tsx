import React from 'react';
import ClientTable from './clientTable/ClientTable';
import RolesCart from './available-roles/roles-cart/RolesCart';

const Settings = () => {
  return (
    <div>
      <RolesCart />
      <ClientTable />
    </div>
  );
};

export default Settings;
