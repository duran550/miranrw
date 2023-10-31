'use client';
import { useFormContext } from '@/app/hooks/useFormContext';
import React from 'react';

type StepperProps = {
  progress: number;
};

const Stepper: React.FC<StepperProps> = ({ progress }) => {
  const { step } = useFormContext();
  return (
    <div className="w-full pb-12 mb-0 md:mb-0 rounded-full h-2.5 ">
      <div
        className="bg-primaryColor h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Stepper;
