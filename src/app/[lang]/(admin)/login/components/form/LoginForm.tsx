'use client';
import { Button } from '@/app/components/button/Button';
import EmailField from '@/app/components/forms/email-field/EmailField';
import PasswordField from '@/app/components/forms/password-field/PasswordField';
import InputField from '@/app/components/forms/text-field/InputField';
import React from 'react';

const LoginForm = () => {
  return (
    <form className="p-8 max-w-md mx-auto bg-white border-t-8 border-primary mt-10 shadow-lg rounded-md">
      <h1 className="font-medium text-2xl text-center py-4 text-primaryColor">
        Sign in to Dashboard
      </h1>
      <EmailField />
      <PasswordField />
      <Button variant={'primary'}>Sign in</Button>
    </form>
  );
};

export default LoginForm;
