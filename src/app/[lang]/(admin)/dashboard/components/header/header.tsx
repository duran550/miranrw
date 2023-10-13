import React from 'react';
import Profile from './Profile';

const AdminHeader = () => {
  return (
    <div className="rounded-md shadow bg-white mt-2 mx-16 px-16 py-2 flex justify-end bg-primary">
      <Profile />
    </div>
  );
};

export default AdminHeader;
