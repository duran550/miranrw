'use client';
import React from 'react';
import UsersList from './components/UsersList';
import { Button } from '@/app/components/button/Button';
import Drawer from '../components/drawer/Drawer';
import { useDrawer } from '../hooks/useDrawer';
import { SHOW_DRAWER } from '../context/constants';
import AddUserForm from '../components/forms/AddUserForm';

const Users = () => {
  const { showDrawer, dispatch } = useDrawer();
  return (
    <div>
      <Button
        onClick={() => dispatch({ type: SHOW_DRAWER, payload: '' })}
        className="w-32 mb-4 ml-auto"
        variant="primary"
      >
        Add User
      </Button>

      <Drawer>{<AddUserForm />}</Drawer>

      <UsersList />
    </div>
  );
};

export default Users;
