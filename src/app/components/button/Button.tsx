'use client';

import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/utils';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: any;
  disabeld?: boolean;
  role?: string; // Add role attribute
  name?: string; // Add name attribute
}

const buttonVariants = cva(
  'w-full md:py-3 py-1 text-white font-medium  flex justify-center px-4 rounded items-center gap-2 focus:outline-none focus:shadow-outline',

  {
    variants: {
      variant: {
        default: 'bg-primaryColor w-full text-white hover:opacity-90',
        saveCategorizationDisabled: 'bg-greenDisable w-full text-white',
        primary: 'bg-primaryColor hover:opacity-90',
        outlinePrimary:
          'text-[#2B8049] border border-[#2B8049] hover:opacity-90',
        outlineWarning:
          'text-[#F36D38] border border-[#F36D38] hover:opacity-90',
        disabled: 'bg-primaryColor opacity-50',
        danger: 'bg-red-500 w-full text-white hover:bg-red-600',
        outline:
          'w-full text-white border border-slate-300 hover:bg-primaryColor hover:text-white hover:border-primaryColor',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  }
);

const Button: FC<ButtonProps> = ({
  variant,
  className,
  href,
  icon,
  children,
  role,
  name,
  ...props
}) => {
  if (href) {
    return (
      // <AnimateClick>
      <>
        {' '}
        {icon ? (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            <span className="">
              {icon ? <Image src={icon} alt={'Icon'} /> : ''}
            </span>
            {children}
          </Link>
        ) : (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            {children}
          </Link>
        )}
      </>

      //  </AnimateClick>
    );
  }
  return (
    // <AnimateClick>
    <button
      {...props}
      className={cn(buttonVariants({ variant, className }))}
      role={role}
      name={name}
    >
      <div className="flex items-center">
        <span className="">
          {icon ? <Image src={icon} alt={'Icon'} /> : ''}
        </span>
        {children}
      </div>
    </button>
    //</AnimateClick>
  );
};

export { Button, buttonVariants };
