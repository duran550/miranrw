'use client';

import { motion } from 'framer-motion';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/utils';
import AnimateClick from '../animate-click/AnimateClick';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: any;
}

const buttonVariants = cva(
  'w-full py-4 text-white font-medium  flex justify-center px-4 mt-10 rounded focus:outline-none focus:shadow-outline',

  {
    variants: {
      variant: {
        default: 'bg-blue-600 w-full text-white hover:opacity-90',
        primary: 'bg-blue-600 hover:opacity-90',
        danger: 'bg-red-500 w-full text-white hover:bg-red-600',
        outline:
          'w-full text-white border border-slate-300 hover:bg-primaryColor hover:text-white hover:border-primaryColor',
        disabled: 'bg-green-300 w-full text-white',
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
  ...props
}) => {
  if (href) {
    return (
      <AnimateClick>
        {icon ? (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            <span className="mr-2">
              {icon ? <Image src={icon} alt={'Icon'} /> : ''}
            </span>
            {children}
          </Link>
        ) : (
          <Link
            href={href}
            target="_blank"
            className={cn(buttonVariants({ variant, className }))}
          >
            {children}
          </Link>
        )}
      </AnimateClick>
    );
  }
  return (
    <AnimateClick>
      <button {...props} className={cn(buttonVariants({ variant, className }))}>
        <div className="flex items-center">
          <span className="mr-2">
            {icon ? <Image src={icon} alt={'Icon'} /> : ''}
          </span>
          {children}
        </div>
      </button>
    </AnimateClick>
  );
};

export { Button, buttonVariants };
