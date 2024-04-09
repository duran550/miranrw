'use client';
import { Button } from '@/app/components/button/Button';
import EmailField from '@/app/components/forms/email-field/EmailField';
import PasswordField from '@/app/components/forms/password-field/PasswordField';

import React, { FC, useEffect } from 'react';

import { useState, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import key from '../../../../../../../../public/icons/Key.svg';
import personne from '../../../../../../../../public/icons/Person.svg';
import eye from '../../../../../../../../public/icons/Eye.svg';
import Image from 'next/image';

import AuthService from '@/services/authService';
import { usePathname, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { Result } from 'postcss';
import {
  removeRefreshToken,
  setRefreshToken,
  setUserCookies,
} from '@/cookies/cookies';
import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';
import InputField from '../InputField';
import ResetModalSucceed from './ResetModalSucceed';
import ResetModalFailed from './ResetModalFail';

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

type LoignProps = {
  lang: string;
  loginTranslation: {
    paragraph: string;
    login: string;
    signIn: string;
    email: string;
    password: string;
  };
};

const EmailCheck = () => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });
  const { loginUser, user } = useAuth();
  removeRefreshToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModalSucceed, setOpenModalSucceed] = useState<boolean>(false);
  const [openModalFailed, setOpenModalFailed] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Watching fields
  let email: string = watch('email');
  let password: string = watch('password');
  let confirmPassword: string = watch('confirmPassword');

  const pathname = usePathname();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    const newData = { email, password };
    console.log(newData, 'this is my newData');
    setIsLoading(true);
    try {
      const response = await fetch(`/api/password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: user?.token!,
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        setIsLoading(false);
        setOpenModalSucceed(true);
        reset();
        console.log(response, 'this is my response');
        // toast.success(`This user password successfully updated`);
      } else {
        throw new Error(`Failed to update ${email}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      // toast.error(`This user does not Exist`);
      setIsLoading(false);
      setOpenModalFailed(true);
    }
  };

  return (
    <div>
      <ResetModalSucceed
        openModal={openModalSucceed}
        setOpenModal={() => setOpenModalSucceed(false)}
      />
      <ResetModalFailed
        openModal={openModalFailed}
        setOpenModal={() => setOpenModalFailed(false)}
      />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex xl:items-center justify-center h-[100vh] mt-16 sm:mt-40 xl:mt-0">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="w-full sm:w-[70%] xl:w-2/5 flex flex-col gap-y-10 h-1/2 px-8 xl:px-32">
          <div>
            <h1 className="font-bold text-[42px]">Reset Password</h1>
            <p className="mt-5">
              Enter your email and we will send you a link to reset your
              password
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl sm:text-4xl mb-4"></h1>
              <div className="w-full ">
                <InputField
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  img={personne}
                  title=""
                  props={register('email', {
                    required: true,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                  isValid={errors.email ? true : false}
                />
              </div>
              <div className="w-full my-4">
                <div className="relative">
                  <InputField
                    name="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter new password"
                    img={key}
                    // isValid={errors.password ? true : false}
                    props={{
                      ...register('password', {
                        required: 'Password is required',
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                          message:
                            'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long',
                        },
                      }),
                    }}
                  />
                  <Image
                    src={eye}
                    alt="eye toggle"
                    className="absolute top-0 right-6 cursor-pointer w-7 h-full"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                </div>

                {errors.password && (
                  <p className="text-[red] mt-2 pl-2 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full my-4 relative">
                <InputField
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Confirm new password"
                  img={key}
                  // isValid={errors.password ? true : false}
                  props={{
                    ...register('confirmPassword', {
                      required: 'size password is min 4 Length',
                      validate: (value) =>
                        value === password || 'The passwords do not match',
                      minLength: 4,
                    }),
                  }}
                />
                <Image
                  src={eye}
                  alt="eye toggle"
                  className="absolute top-1/4 right-6 cursor-pointer w-7"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />

                {errors.confirmPassword && (
                  <p className="text-[red] mt-2 pl-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button
                className="mt-7 rounded-lg text-sm sm:text-xl bg-primary"
                variant={!isValid || isLoading ? 'disabled' : 'primary'}
                type="submit"
                disabled={!isValid || isLoading ? true : false}
              >
                {isLoading ? (
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                ) : (
                  <h2>Reset Password</h2>
                )}
              </Button>
            </form>
          </div>
        </div>
        {/* <div className="w-3/5 h-full  items-center justify-center bg-primary hidden xl:flex"></div> */}
      </div>
    </div>
  );
};

export default EmailCheck;
