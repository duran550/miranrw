'use client';
import { Button } from '@/app/components/button/Button';
import EmailField from '@/app/components/forms/email-field/EmailField';
import PasswordField from '@/app/components/forms/password-field/PasswordField';
import RadioGroup from '@/app/components/forms/radio/RadioGroup';
import InputField from '@/app/components/forms/text-field/InputField';
import React from 'react';

const AddUserForm = () => {
  return (
    <form className="p-8 max-w-md mx-auto bg-white  shadow-lg ">
      <h1 className="font-medium text-2xl text-center py-0 text-primaryColor">
        Add User
      </h1>
      <InputField name={'name'} title='Full Name' placeholder='John Doe' />
      <InputField name={'username'} title='Username' placeholder='johndoe'/>
      <EmailField />
      <InputField name={'role'} title='Role' placeholder='editor'/>
      <Button variant={'primary'}>Create</Button>
    </form>
  )
};

export default AddUserForm;
